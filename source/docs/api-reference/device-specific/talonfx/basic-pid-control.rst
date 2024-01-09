Basic PID and Profiling
=======================

The Talon FX supports basic PID control and motion profiling for position and velocity.

Position Control
----------------

A Position closed loop can be used to target a specified motor position (in rotations).

Position closed loop is currently supported for all base :ref:`control output types <docs/api-reference/device-specific/talonfx/talonfx-control-intro:control output types>`. The units of the output are determined by the control output type.

In a Position closed loop, the gains should be configured as follows:

- :math:`K_s` - unused, as there is no target velocity
- :math:`K_v` - unused, as there is no target velocity
- :math:`K_a` - unused, as there is no target acceleration
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

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # in init function, set slot 0 gains
         slot0_configs = configs.Slot0Configs()
         slot0_configs.k_p = 24 # An error of 0.5 rotations results in 12 V output
         slot0_configs.k_i = 0 # no output for integrated error
         slot0_configs.k_d = 0.1 # A velocity of 1 rps results in 0.1 V output

         self.talonfx.configurator.apply(slot0_configs)

Once the gains are configured, the Position closed loop control request can be sent to the TalonFX. The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity or friction.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a position closed-loop request, voltage output, slot 0 configs
         final PositionVoltage m_request = new PositionVoltage(0).withSlot(0);

         // set position to 10 rotations
         m_talonFX.setControl(m_request.withPosition(10));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a position closed-loop request, voltage output, slot 0 configs
         controls::PositionVoltage m_request = controls::PositionVoltage{0_tr}.WithSlot(0);

         // set position to 10 rotations
         m_talonFX.SetControl(m_request.WithPosition(10_tr));

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # create a position closed-loop request, voltage output, slot 0 configs
         self.request = controls.PositionVoltage(0).with_slot(0)

         # set position to 10 rotations
         self.talonfx.set_control(self.request.with_position(10))

Velocity Control
----------------

A Velocity closed loop can be used to maintain a target velocity (in rotations per second). This can be useful for controlling flywheels, where a velocity needs to be maintained for accurate shooting.

Velocity closed loop is currently supported for all base :ref:`control output types <docs/api-reference/device-specific/talonfx/talonfx-control-intro:control output types>`. The units of the output are determined by the control output type.

In a Velocity closed loop, the gains should be configured as follows:

- :math:`K_s` - output to overcome static friction (output)
- :math:`K_v` - output per unit of requested velocity (output/rps)
- :math:`K_a` - unused, as there is no target acceleration
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
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0; // no output for error derivative

         m_talonFX.getConfigurator().apply(slot0Configs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // in init function, set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kS = 0.05; // Add 0.05 V output to overcome static friction
         slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
         slot0Configs.kP = 0.11; // An error of 1 rps results in 0.11 V output
         slot0Configs.kI = 0; // no output for integrated error
         slot0Configs.kD = 0; // no output for error derivative

         m_talonFX.GetConfigurator().Apply(slot0Configs);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         slot0_configs = configs.Slot0Configs()
         slot0_configs.k_s = 0.05 # Add 0.05V output to overcome static friction
         slot0_configs.k_v = 0.12 # A velocity target of 1 rps results in 0.12 V output
         slot0_configs.k_p = 0.11 # An error of 1 rps results in 0.11 V output
         slot0_configs.k_i = 0 # no output for integrated error
         slot0_configs.k_d = 0 # no output for error derivative

         self.talonfx.configurator.apply(slot0_configs)

Once the gains are configured, the Velocity closed loop control request can be sent to the TalonFX. The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // create a velocity closed-loop request, voltage output, slot 0 configs
         final VelocityVoltage m_request = new VelocityVoltage(0).withSlot(0);

         // set velocity to 8 rps, add 0.5 V to overcome gravity
         m_talonFX.setControl(m_request.withVelocity(8).withFeedForward(0.5));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a velocity closed-loop request, voltage output, slot 0 configs
         controls::VelocityVoltage m_request = controls::VelocityVoltage{0_tps}.WithSlot(0);

         // set velocity to 8 rps, add 0.5 V to overcome gravity
         m_talonFX.SetControl(m_request.WithVelocity(8_tps).WithFeedForward(0.5_V));

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # create a velocity closed-loop request, voltage output, slot 0 configs
         self.request = controls.VelocityVoltage(0).with_slot(0)

         # set velocity to 8 rps, add 0.5 V to overcome gravity
         self.talonfx.set_control(self.request.with_velocity(8).with_feed_forward(0.5))

Motion Profiling
----------------

The Position and Velocity closed-loop requests can be used to run a `motion profile <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/controllers/trapezoidal-profiles.html>`__ generated by the robot controller.

.. tip:: The Talon FX supports several onboard motion profiles using :doc:`Motion Magic® </docs/api-reference/device-specific/talonfx/motion-magic>`.

.. tab-set::

   .. tab-item:: Position

      In a Position motion profile, the gains should be configured as follows:

      - :math:`K_s` - output to overcome static friction (output)
      - :math:`K_v` - output per unit of requested velocity (output/rps)
      - :math:`K_a` - unused, as there is no target acceleration
      - :math:`K_p` - output per unit of error in position (output/rotation)
      - :math:`K_i` - output per unit of integrated error in position (output/(rotation*s))
      - :math:`K_d` - output per unit of error derivative in position (output/rps)

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // in init function, set slot 0 gains
               var slot0Configs = new Slot0Configs();
               slot0Configs.kS = 0.25; // Add 0.25 V output to overcome static friction
               slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
               slot0Configs.kP = 4.8; // A position error of 2.5 rotations results in 12 V output
               slot0Configs.kI = 0; // no output for integrated error
               slot0Configs.kD = 0.1; // A velocity error of 1 rps results in 0.1 V output

               m_talonFX.getConfigurator().apply(slot0Configs);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // in init function, set slot 0 gains
               configs::Slot0Configs slot0Configs{};
               slot0Configs.kS = 0.25; // Add 0.25 V output to overcome static friction
               slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
               slot0Configs.kP = 4.8; // A position error of 2.5 rotations results in 12 V output
               slot0Configs.kI = 0; // no output for integrated error
               slot0Configs.kD = 0.1; // A velocity error of 1 rps results in 0.1 V output

               m_talonFX.GetConfigurator().Apply(slot0Configs);

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # in init function, set slot 0 gains
               slot0_configs = configs.Slot0Configs()
               slot0_configs.k_s = 0.25 # Add 0.25 V output to overcome static friction
               slot0_configs.k_v = 0.12 # A velocity target of 1 rps results in 0.12 V output
               slot0_configs.k_p = 4.8 # A position error of 2.5 rotations results in 12 V output
               slot0_configs.k_i = 0 # no output for integrated error
               slot0_configs.k_d = 0.1 # A velocity error of 1 rps results in 0.1 V output

               self.talonfx.configurator.apply(slot0_configs)

      Once the gains are configured, the Position closed-loop control request can be sent to the TalonFX. The Velocity parameter is used to specify the current setpoint velocity of the motion profile.

      The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity or friction.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
               final TrapezoidProfile m_profile = new TrapezoidProfile(
                  new TrapezoidProfile.Constraints(80, 160)
               );
               // Final target of 200 rot, 0 rps
               TrapezoidProfile.State m_goal = new TrapezoidProfile.State(200, 0);
               TrapezoidProfile.State m_setpoint = new TrapezoidProfile.State();

               // create a position closed-loop request, voltage output, slot 0 configs
               final PositionVoltage m_request = new PositionVoltage(0).withSlot(0);

               // calculate the next profile setpoint
               m_setpoint = m_profile.calculate(0.020, m_setpoint, m_goal);

               // send the request to the device
               m_request.Position = m_setpoint.position;
               m_request.Velocity = m_setpoint.velocity;
               m_talonFX.setControl(m_request);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
               frc::TrapezoidProfile<units::turn_t> m_profile{{80_tps, 160_tr_per_s_sq}};
               // Final target of 200 rot, 0 rps
               frc::TrapezoidProfile<units::turn_t>::State m_goal{200_tr, 0_tps};
               frc::TrapezoidProfile<units::turn_t>::State m_setpoint{};

               // create a position closed-loop request, voltage output, slot 0 configs
               controls::PositionVoltage m_request = controls::PositionVoltage{0_tr}.WithSlot(0);

               // calculate the next profile setpoint
               m_setpoint = m_profile.Calculate(20_ms, m_setpoint, m_goal);

               // send the request to the device
               m_request.Position = m_setpoint.position;
               m_request.Velocity = m_setpoint.velocity;
               m_talonFX.SetControl(m_request);

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
               self.profile = TrapezoidProfile(
                  TrapezoidProfile.Constraints(80, 160)
               )
               # Final target of 200 rot, 0 rps
               self.goal = TrapezoidProfile.State(200, 0)
               self.setpoint = TrapezoidProfile.State()

               # create a position closed-loop request, voltage output, slot 0 configs
               self.request = controls.PositionVoltage(0).with_slot(0)

               # calculate the next profile setpoint
               self.setpoint = self.profile.calculate(0.020, self.setpoint, self.goal)

               # send the request to the device
               self.request.position = self.setpoint.position
               self.request.velocity = self.setpoint.velocity
               self.talonfx.set_control(self.request)

   .. tab-item:: Velocity

      In a Velocity motion profile, the gains should be configured as follows:

      - :math:`K_s` - output to overcome static friction (output)
      - :math:`K_v` - output per unit of requested velocity (output/rps)
      - :math:`K_a` - output per unit of requested acceleration (output/(rps/s))
      - :math:`K_p` - output per unit of error in velocity (output/rps)
      - :math:`K_i` - output per unit of integrated error in velocity (output/rotation)
      - :math:`K_d` - output per unit of error derivative in velocity (output/(rps/s))

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // in init function, set slot 0 gains
               var slot0Configs = new Slot0Configs();
               slot0Configs.kS = 0.25; // Add 0.25 V output to overcome static friction
               slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
               slot0Configs.kA = 0.01; // An acceleration of 1 rps/s requires 0.01 V output
               slot0Configs.kP = 0.11; // An error of 1 rps results in 0.11 V output
               slot0Configs.kI = 0; // no output for integrated error
               slot0Configs.kD = 0; // no output for error derivative

               m_talonFX.getConfigurator().apply(slot0Configs);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // in init function, set slot 0 gains
               configs::Slot0Configs slot0Configs{};
               slot0Configs.kS = 0.25; // Add 0.25 V output to overcome static friction
               slot0Configs.kV = 0.12; // A velocity target of 1 rps results in 0.12 V output
               slot0Configs.kA = 0.01; // An acceleration of 1 rps/s requires 0.01 V output
               slot0Configs.kP = 0.11; // An error of 1 rps results in 0.11 V output
               slot0Configs.kI = 0; // no output for integrated error
               slot0Configs.kD = 0; // no output for error derivative

               m_talonFX.GetConfigurator().Apply(slot0Configs);

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # in init function, set slot 0 gains
               slot0_configs = configs.Slot0Configs()
               slot0_configs.k_s = 0.25 # Add 0.25 V output to overcome static friction
               slot0_configs.k_v = 0.12 # A velocity target of 1 rps results in 0.12 V output
               slot0_configs.k_a = 0.01 # An acceleration of 1 rps/s requires 0.01 V output
               slot0_configs.k_p = 0.11 # An error of 1 rps results in 0.11 V output
               slot0_configs.k_i = 0 # no output for integrated error
               slot0_configs.k_d = 0 # no output for error derivative

               self.talonfx.configurator.apply(slot0_configs)

      Once the gains are configured, the Velocity closed-loop control request can be sent to the TalonFX. The Acceleration parameter is used to specify the current setpoint acceleration of the motion profile.

      The control request object has an optional feedforward term that can be used to add an arbitrary value to the output, which can be useful to account for the effects of gravity or friction.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Trapezoid profile with max acceleration 400 rot/s^2, max jerk 4000 rot/s^3
               final TrapezoidProfile m_profile = new TrapezoidProfile(
                  new TrapezoidProfile.Constraints(400, 4000)
               );
               // Final target of 80 rps, 0 rps/s
               TrapezoidProfile.State m_goal = new TrapezoidProfile.State(80, 0);
               TrapezoidProfile.State m_setpoint = new TrapezoidProfile.State();

               // create a velocity closed-loop request, voltage output, slot 0 configs
               final VelocityVoltage m_request = new VelocityVoltage(0).withSlot(0);

               // calculate the next profile setpoint
               m_setpoint = m_profile.calculate(0.020, m_setpoint, m_goal);

               // send the request to the device
               // note: "position" is velocity, and "velocity" is acceleration
               m_request.Velocity = m_setpoint.position;
               m_request.Acceleration = m_setpoint.velocity;
               m_talonFX.setControl(m_request);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Trapezoid profile with max acceleration 400 rot/s^2, max jerk 4000 rot/s^3
               frc::TrapezoidProfile<units::turns_per_second_t> m_profile{{400_tr_per_s_sq, 4000_tr_per_s_cu}};
               // Final target of 80 rps, 0 rot/s^2
               frc::TrapezoidProfile<units::turns_per_second_t>::State m_goal{80_tps, 0_tr_per_s_sq};
               frc::TrapezoidProfile<units::turns_per_second_t>::State m_setpoint{};

               // create a velocity closed-loop request, voltage output, slot 0 configs
               controls::VelocityVoltage m_request = controls::VelocityVoltage{0_tps}.WithSlot(0);

               // calculate the next profile setpoint
               m_setpoint = m_profile.Calculate(20_ms, m_setpoint, m_goal);

               // send the request to the device
               // note: "position" is velocity, and "velocity" is acceleration
               m_positionControl.Velocity = m_setpoint.position;
               m_positionControl.Acceleration = m_setpoint.velocity;
               m_talonFX.SetControl(m_request);

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Trapezoid profile with max acceleration 400 rot/s^2, max jerk 4000 rot/s^3
               self.profile = TrapezoidProfile(
                  TrapezoidProfile.Constraints(400, 4000)
               )
               # Final target of 80 rps, 0 rot/s^2
               self.goal = TrapezoidProfile.State(80, 0)
               self.setpoint = TrapezoidProfile.State()

               # create a velocity closed-loop request, voltage output, slot 0 configs
               self.request = controls.VelocityVoltage(0).with_slot(0)

               # calculate the next profile setpoint
               self.setpoint = self.profile.calculate(0.020, self.setpoint, self.goal)

               # send the request to the device
               # note: "position" is velocity, and "velocity" is acceleration
               self.request.velocity = self.setpoint.position
               self.request.acceleration = self.setpoint.velocity
               self.talonfx.set_control(self.request)
