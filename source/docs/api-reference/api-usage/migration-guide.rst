Migration Guide
===============

This document serves as a "cheat sheet" of commonly accessed functions in Phoenix 5 and their equivalents in Phoenix Pro.

Status Signals
--------------

Phoenix v5

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // get latest TalonFX selected sensor position
         // units are encoder ticks
         int sensorPos = m_talonFX.getSelectedSensorPosition();

         // latency is unknown
         // cannot synchronously wait for new data

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // get latest TalonFX selected sensor position
         // units are encoder ticks
         int sensorPos = m_talonFX.GetSelectedSensorPosition();

         // latency is unknown
         // cannot synchronously wait for new data

Phoenix Pro

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // acquire a refreshed TalonFX rotor position signal
         var rotorPosSignal = m_talonFX.getRotorPosition();

         // because we are calling getRotorPosition() every loop,
         // we do not need to call refresh()
         //rotorPosSignal.refresh();

         // retrieve position value that we just refreshed
         // units are rotations
         var rotorPos = rotorPosSignal.getValue();

         // get latency of the signal
         var rotorPosLatency = rotorPosSignal.getTimestamp().getLatency();

         // synchronously wait 20 ms for new data
         rotorPosSignal.waitForUpdate(0.020);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // acquire a refreshed TalonFX rotor position signal
         auto& rotorPosSignal = m_talonFX.GetRotorPosition();

         // because we are calling GetRotorPosition() every loop,
         // we do not need to call Refresh()
         //rotorPosSignal.Refresh();

         // retrieve position value that we just refreshed
         // units are rotations, uses the units library
         auto rotorPos = rotorPosSignal.GetValue();

         // get latency of the signal
         auto rotorPosLatency = rotorPosSignal.GetTimestamp().GetLatency();

         // synchronously wait 20 ms for new data
         rotorPosSignal.WaitForUpdate(20_ms);

Control Requests
----------------

Phoenix v5

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // robot init, set voltage compensation to 12 V
         m_motor.configVoltageComSaturation(12);
         m_motor.enableVoltageCompensation(true);

         // main robot code, command 12 V output
         m_motor.set(ControlMode.PercentOutput, 1.0);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // robot init, set voltage compensation to 12 V
         m_motor.ConfigVoltageComSaturation(12);
         m_motor.EnableVoltageCompensation(true);

         // main robot code, command 12 V output
         m_motor.Set(ControlMode::PercentOutput, 1.0);

Phoenix Pro

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // class member variable
         VoltageOut m_request = new VoltageOut(0);

         // main robot code, command 12 V output
         m_motor.setControl(m_request.withOutput(12.0));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // class member variable
         controls::VoltageOut m_request{0_V};

         // main robot code, command 12 V output
         m_motor.SetControl(m_request.WithOutput(12_V));

Control Types
^^^^^^^^^^^^^

In Phoenix Pro, voltage compensation has been replaced with the ability to directly specify the :ref:`control output type <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>`.

All control output types are supported in open-loop and closed-loop control requests.

.. list-table:: Open-loop Control Requests
   :header-rows: 1

   * - Phoenix v5
     - Phoenix Pro

   * - PercentOutput
     - DutyCycleOut

   * - PercentOutput + Voltage Compensation
     - VoltageOut

   * - Current (closed-loop)
     - TorqueCurrentFOC (open-loop)


.. list-table:: Closed-loop Control Requests
   :header-rows: 1

   * - Phoenix v5
     - Phoenix Pro

   * - Position
     - PositionDutyCycle

   * - Velocity
     - VelocityDutyCycle

   * - MotionMagic
     - MotionMagicDutyCycle

   * - Closed-loop + Voltage Compensation
     - {ClosedLoop}Voltage

   * - External Closed-loop + Current closed-loop
     - {ClosedLoop}TorqueCurrentFOC

Applying Configs
----------------

Phoenix v5

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // set slot 0 gains
         // 50 ms timeout on each config call
         m_motor.config_kF(0, 0.05, 50);
         m_motor.config_kP(0, 0.046, 50);
         m_motor.config_kI(0, 0.0002, 50);
         m_motor.config_kD(0, 0.42, 50);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // set slot 0 gains
         // 50 ms timeout on each config call
         m_motor.Config_kF(0, 0.05, 50);
         m_motor.Config_kP(0, 0.046, 50);
         m_motor.Config_kI(0, 0.0002, 50);
         m_motor.Config_kD(0, 0.42, 50);

Phoenix Pro

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // set slot 0 gains
         var slot0Configs = new Slot0Configs();
         slot0Configs.kV = 0.12;
         slot0Configs.kP = 0.11;
         slot0Configs.kI = 0.5;
         slot0Configs.kD = 0.001;

         // apply gains, 50 ms total timeout
         m_talonFX.getConfigurator().apply(slot0Configs, 0.050);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kV = 0.12;
         slot0Configs.kP = 0.11;
         slot0Configs.kI = 0.5;
         slot0Configs.kD = 0.001;

         // apply gains, 50 ms total timeout
         m_talonFX.GetConfigurator().Apply(slot0Configs, 50_ms);

Factory Defaulting Configs
^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix v5

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // user must remember to factory default if they configure devices in code
         m_motor.configFactoryDefault();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // user must remember to factory default if they configure devices in code
         m_motor.ConfigFactoryDefault();

Phoenix Pro

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // any unmodified configs in a configuration object are *automatically* factory-defaulted;
         // user can perform a full factory default by passing a new configuration object
         m_motor.getConfigurator().apply(new TalonFXConfiguration());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // any unmodified configs in a configuration object are *automatically* factory-defaulted;
         // user can perform a full factory default by passing a new configuration object
         m_motor.GetConfigurator().Apply(TalonFXConfiguration{});

Closed Loop Gains
-----------------

These tables are for translating Phoenix v5 gains to Phoenix Pro DutyCycle gains.

.. note:: There are other :ref:`control output types <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>` in Phoenix Pro that will change the magnitude of the gains.

Position (DutyCycle)
^^^^^^^^^^^^^^^^^^^^

.. image:: images/position-gains-conversion.png
   :alt: Position gain conversion table from Phoenix 5 to Phoenix Pro

Velocity (DutyCycle)
^^^^^^^^^^^^^^^^^^^^

.. image:: images/velocity-gains-conversion.png
   :alt: Velocity gain conversion table from Phoenix 5 to Phoenix Pro

Closed Loop Control
-------------------

Phoenix v5

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         // robot init, set slot 0 gains
         m_motor.config_kF(0, 0.05, 50);
         m_motor.config_kP(0, 0.046, 50);
         m_motor.config_kI(0, 0.0002, 50);
         m_motor.config_kD(0, 0.42, 50);

         // enable voltage compensation
         m_motor.configVoltageComSaturation(12);
         m_motor.enableVoltageCompensation(true);

         // periodic, run velocity control with slot 0 configs,
         // target velocity of 50 rps (10240 ticks/100ms)
         m_motor.selectProfileSlot(0, 0);
         m_motor.set(ControlMode.Velocity, 10240);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // robot init, set slot 0 gains
         m_motor.Config_kF(0, 0.05, 50);
         m_motor.Config_kP(0, 0.046, 50);
         m_motor.Config_kI(0, 0.0002, 50);
         m_motor.Config_kD(0, 0.42, 50);

         // enable voltage compensation
         m_motor.ConfigVoltageComSaturation(12);
         m_motor.EnableVoltageCompensation(true);

         // periodic, run velocity control with slot 0 configs,
         // target velocity of 50 rps (10240 ticks/100ms)
         m_motor.SelectProfileSlot(0, 0);
         m_motor.Set(ControlMode::Velocity, 10240);

Phoenix Pro

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // class member variable
         VelocityVoltage m_velocity = new VelocityVoltage(0);

         // robot init, set slot 0 gains
         var slot0Configs = new Slot0Configs();
         slot0Configs.kV = 0.12;
         slot0Configs.kP = 0.11;
         slot0Configs.kI = 0.5;
         slot0Configs.kD = 0.001;
         m_talonFX.getConfigurator().apply(slot0Configs, 0.050);

         // periodic, run velocity control with slot 0 configs,
         // target velocity of 50 rps
         m_velocity.Slot = 0;
         m_motor.setControl(m_velocity.withVelocity(50));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // class member variable
         controls::VelocityVoltage m_velocity{0};

         // robot init, set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kV = 0.12;
         slot0Configs.kP = 0.11;
         slot0Configs.kI = 0.5;
         slot0Configs.kD = 0.001;
         m_talonFX.GetConfigurator().Apply(slot0Configs, 50_ms);

         // periodic, run velocity control with slot 0 configs,
         // target velocity of 50 rps
         m_velocity.Slot = 0;
         m_motor.SetControl(m_velocity.WithVelocity(50_tps));

Motion Profiling
----------------

The Motion Profile Executor is not supported in the current release of Phoenix Pro. Users can use :ref:`Motion Magic <docs/api-reference/api-usage/device-specific/talonfx/closed-loop-requests:motion magic>` or run a motion profile on the robot controller.

Feature Replacements
--------------------

Motion Magic S-Curve
^^^^^^^^^^^^^^^^^^^^

The Motion Magic S-Curve Strength has been replaced with the ability to set the target jerk (acceleration derivative) of the profile (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/MotionMagicConfigs.html#MotionMagicJerk>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_motion_magic_configs.html#a5b7a8aa5146588639168506802abd61a>`__).

Nominal Output
^^^^^^^^^^^^^^

The Talon FX forward and reverse Nominal Output configs have been removed in Phoenix Pro.

The typical use case of the nominal output configs is to overcome friction in closed-loop control modes, which can now be achieved using the ``kS`` feedforward parameter (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/Slot0Configs.html#kS>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_slot0_configs.html#adfb56621e174939d621c93de80d433b7>`__).

Sensor Phase
^^^^^^^^^^^^

The Talon FX ``setSensorPhase()`` method has been removed in Phoenix Pro.

- The Talon FX integrated sensor is always in phase, so the method does nothing in Phoenix 5.

- When using a remote sensor, you can invert the remote sensor to bring it in phase with the Talon FX.

Sensor Initialization Strategy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Talon FX and CANcoder sensors are always initialized to the absolute position in Phoenix Pro.

Velocity Measurement Period/Window
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In Phoenix Pro, the Talon FX and CANcoder both use a Kalman filter to produce velocity measurements, resulting in a less noisy signal with a minimal impact on latency. As a result, the velocity measurement period/window configs are no longer necessary in Phoenix Pro and have been removed.
