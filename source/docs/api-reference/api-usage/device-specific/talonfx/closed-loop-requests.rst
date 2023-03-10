Closed-Loop Control
===================

Closed-loop control typically refers to control of a motor that relies on sensor data to adjust based on error. Systems/mechanisms that rely on maintaining a certain position or velocity achieve this state using closed-loop control. This is achieved by `feedback <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/introduction-to-pid.html>`__ (PID) and `feedforward <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/introduction-to-feedforward.html>`__ control. Closed-loop control can be performed on the robot controller or on the individual motor controllers. The benefit of onboard closed-loop control is that there is no sensor latency and 1 kHz update frequency. This can result in a more responsive output compared to running the closed-loop on the robot controller.

Since closed-loop control changes based on the dynamics of the system (velocity, mass, CoG, etc.), closed-loop relies on PID and feedforward parameters. These parameters are configured either via :doc:`/docs/tuner/configs` or in :doc:`code </docs/api-reference/api-usage/configuration>`. The parameters can be determined using System Identification (such as with `WPILib SysID <https://docs.wpilib.org/en/stable/docs/software/pathplanning/system-identification/introduction.html>`__) or through `manual tuning <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/tutorial-intro.html>`__.

Manual tuning typically follows this process:

1. Set :math:`K_p`, :math:`K_i` and :math:`K_d` to zero.
2. Increase :math:`K_p` until the output starts to oscillate around the setpoint.
3. Increase :math:`K_d` as much as possible without introducing jittering to the response.

All closed-loop control requests follow the naming pattern ``{ClosedLoopMode}{ControlOutputType}``. For example, the ``VelocityVoltage`` control request performs a velocity closed-loop using voltage output.

Gain Slots
----------

It may be useful to switch between presets of gains in a motor controller, so the TalonFX supports multiple gain slots. All closed-loop control requests have a member variable ``Slot`` that can be assigned an integer ID to select the set of gains used by the closed-loop. The gain slots can be :doc:`configured in code </docs/api-reference/api-usage/configuration>` using ``Slot*Configs`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/Slot0Configs.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_slot0_configs.html>`__) objects.

Velocity Control
----------------

A Velocity closed loop can be used to maintain a target velocity (in rotations per second). This can be useful for controlling flywheels, where a velocity needs to be maintained for accurate shooting.

Velocity closed loop is currently supported for all base :ref:`control output types <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>`. The units of the output is determined by the control output type.

In a Velocity closed loop, the gains should be configured as follows:

- :math:`K_s` - output to overcome static friction (output)
- :math:`K_v` - output per unit of requested velocity (output/rps)
- :math:`K_p` - output per unit of error in velocity (output/rps)
- :math:`K_i` - output per unit of integrated error in velocity (output/rotation)
- :math:`K_d` - output per unit of error derivative in velocity (output/(rps/s))

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // in init function, set slot 0 gains
         var slot0Configs = new Slot0Configs();
         slot0Configs.kS = 0.05; // Add 0.05 V output to overcome static friction
         slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
         slot0Configs.kP = 0.11; // An error of 1 rps results in 0.11 V output
         slot0Configs.kI = 0.5; // An error of 1 rps increases output by 0.5 V each second
         slot0Configs.kD = 0.001; // An acceleration of 1 rps/s results in 0.001 V output

         m_talonFX.getConfigurator().apply(slot0Configs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // in init function, set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kS = 0.05; // Add 0.05 V output to overcome static friction
         slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
         slot0Configs.kP = 0.11; // An error of 1 rps results in 0.11 V output
         slot0Configs.kI = 0.5; // An error of 1 rps increases output by 0.5 V each second
         slot0Configs.kD = 0.001; // An acceleration of 1 rps/s results in 0.001 V output

         m_talonFX.GetConfigurator().Apply(slot0Configs);

Once the gains are configured, the Velocity closed loop control request can be sent to the TalonFX. The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // create a velocity closed-loop request, voltage output, slot 0 configs
         var request = new VelocityVoltage(0).withSlot(0);

         // set velocity to 8 rps, add 0.5 V to overcome gravity
         m_talonFX.setControl(request.withVelocity(8).withFeedForward(0.5));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a velocity closed-loop request, voltage output, slot 0 configs
         auto request = controls::VelocityVoltage{0_tps}.WithSlot(0);

         // set velocity to 8 rps, add 0.5 V to overcome gravity
         m_talonFX.SetControl(request.WithVelocity(8_tps).WithFeedForward(0.5_V));

Converting from Meters
^^^^^^^^^^^^^^^^^^^^^^

In some applications, it may be useful to translate between meters and rotations. This can be done using the following equation:

.. math::

   rotations = \frac{meters}{\pi \cdot wheelDiameter} \cdot gearRatio

where ``meters`` is the target in meters, ``wheelDiameter`` is the diameter of the wheel in meters, and ``gearRatio`` is the gear ratio between the output shaft and the wheel.

This equation also works with converting velocity from m/s to rps.

Position Control
----------------

A Position closed loop can be used to target a specified motor position (in rotations).

Position closed loop is currently supported for all base :ref:`control output types <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>`. The units of the output is determined by the control output type.

In a Position closed loop, the gains should be configured as follows:

- :math:`K_s` - unused, as there is no target velocity
- :math:`K_v` - unused, as there is no target velocity
- :math:`K_p` - output per unit of error in position (output/rotation)
- :math:`K_i` - output per unit of integrated error in position (output/(rotation*s))
- :math:`K_d` - output per unit of error derivative in position (output/rps)

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // in init function, set slot 0 gains
         var slot0Configs = new Slot0Configs();
         slot0Configs.kP = 24; // An error of 0.5 rotations results in 12 V output
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0.1; // A velocity of 1 rps results in 0.1 V output

         m_talonFX.getConfigurator().apply(slot0Configs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // in init function, set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kP = 24; // An error of 0.5 rotations results in 12 V output
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0.1; // A velocity of 1 rps results in 0.1 V output

         m_talonFX.GetConfigurator().Apply(slot0Configs);

Once the gains are configured, the Position closed loop control request can be sent to the TalonFX. The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity or friction.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a position closed-loop request, voltage output, slot 0 configs
         var request = new PositionVoltage(0).withSlot(0);

         // set position to 10 rotations
         m_talonFX.setControl(request.withPosition(10));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a position closed-loop request, voltage output, slot 0 configs
         auto request = controls::PositionVoltage{0_tr}.WithSlot(0);

         // set position to 10 rotations
         m_talonFX.SetControl(request.WithPosition(10_tr));

Motion Magic
------------

Motion Magic is a control mode that provides the benefit of Motion Profiling without needing to generate motion profile trajectory points. When using Motion Magic, the motor will move to a target position using a motion profile, while honoring the user specified acceleration, maximum velocity (cruise velocity), and optional jerk.

The benefits of this control mode over "simple" PID position closed-looping are:

- Control of the mechanism throughout the entire motion (as opposed to racing to the end target position)
- Control of the mechanism's inertia to ensure smooth transitions between set points
- Improved repeatability despite changes in battery load
- Improved repeatability despite changes in motor load

After gain/settings are determined, the robot controller only needs to periodically set the target position.

There is no general requirement to "wait for the profile to finish". However, the robot application can poll the sensor position and determine when the motion is finished if need be.

Motion Magic functions be generating a trapezoidal/S-Curve velocity profile that does not exceed the specified cruise velocity, acceleration, or jerk. This is done automatically by the motor controller.

.. note:: If the remaining sensor distance to travel is small, the velocity may not reach cruise velocity as this would overshoot the target position. This is often referred to as a "triangle profile".

.. image:: images/trapezoidal-profile.png
   :alt: Trapezoidal graph that showcases target cruise velocity and current velocity

If the Motion Magic jerk is set to a nonzero value, the generated velocity profile is no longer trapezoidal, but instead is a continuous S-Curve (corner points are smoothed).

An S-Curve profile has the following advantaged over a trapezoidal profile:

- Reducing oscillation of the mechanism.
- Maneuver is more deliberate and reproducible.

.. note:: The jerk control feature, by its nature, will increase the amount of time a movement requires. This can be compensated for by increasing the configured acceleration value.

.. image:: images/s-curve-graph.png
   :alt: Graph showing velocity and position using s-curve profile

The following parameters must be set when controlling using Motion Magic

- Cruise Velocity - peak/cruising velocity of the motion
- Acceleration - controls acceleration and deceleration rates during the beginning and end of motion
- Jerk - controls jerk, which is the derivative of acceleration

Using Motion Magic in API
^^^^^^^^^^^^^^^^^^^^^^^^^

Motion Magic is currently supported for all base :ref:`control output types <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>`. The units of the output is determined by the control output type.

The Motion Magic jerk, acceleration, and cruise velocity can be :doc:`configured in code </docs/api-reference/api-usage/configuration>` using a ``MotionMagicConfigs`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/MotionMagicConfigs.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_motion_magic_configs.html>`__) object.

In Motion Magic, the gains should be configured as follows:

- :math:`K_s` - output to overcome static friction (output)
- :math:`K_v` - output per unit of target velocity (output/rps)
- :math:`K_p` - output per unit of error in position (output/rotation)
- :math:`K_i` - output per unit of integrated error in position (output/(rotation*s))
- :math:`K_d` - output per unit of error in velocity (output/rps)

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // in init function
         var talonFXConfigs = new TalonFXConfiguration();

         // set slot 0 gains
         var slot0Configs = talonFXConfigs.Slot0Configs;
         slot0Configs.kS = 0.05; // Add 0.05 V output to overcome static friction
         slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
         slot0Configs.kP = 24; // A position error of 0.5 rotations results in 12 V output
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0.1; // A velocity error of 1 rps results in 0.1 V output

         // set Motion Magic settings
         var motionMagicConfigs = talonFXConfigs.MotionMagicConfigs;
         motionMagicConfigs.MotionMagicCruiseVelocity = 8; // Target cruise velocity of 8 rps
         motionMagicConfigs.MotionMagicAcceleration = 40; // Target acceleration of 40 rps/s
         motionMagicConfigs.MotionMagicJerk = 800; // Target jerk of 800 rps/s/s

         m_talonFX.getConfigurator().apply(talonFXConfigs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // in init function
         configs::TalonFXConfiguration talonFXConfigs{};

         // set slot 0 gains
         auto& slot0Configs = talonFXConfigs.Slot0Configs;
         slot0Configs.kS = 0.05; // Add 0.05 V output to overcome static friction
         slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
         slot0Configs.kP = 24; // A position error of 0.5 rotations results in 12 V output
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0.1; // A velocity error of 1 rps results in 0.1 V output

         // set Motion Magic settings
         auto& motionMagicConfigs = talonFXConfigs.MotionMagicConfigs;
         motionMagicConfigs.MotionMagicCruiseVelocity = 8; // Target cruise velocity of 8 rps
         motionMagicConfigs.MotionMagicAcceleration = 40; // Target acceleration of 40 rps/s
         motionMagicConfigs.MotionMagicJerk = 800; // Target jerk of 800 rps/s/s

         m_talonFX.GetConfigurator().Apply(talonFXConfigs);

Once the gains are configured, the Motion Magic request can be sent to the TalonFX. The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity or friction.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a Motion Magic request, voltage output, slot 0 configs
         var request = new MotionMagicVoltage(0).withSlot(0);

         // set position to 10 rotations
         m_talonFX.setControl(request.withPosition(10));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a Motion Magic request, voltage output, slot 0 configs
         auto request = controls::MotionMagicVoltage{0_tr}.WithSlot(0);

         // set position to 10 rotations
         m_talonFX.SetControl(request.WithPosition(10_tr));
