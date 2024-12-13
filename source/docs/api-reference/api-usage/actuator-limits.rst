Actuator Limits
===============

CTR Electronics actuators, such as the TalonFX, support various kinds of hardware and software limits.

.. note:: The TalonFX + Kraken X60 does not support hardware limit switches. Instead, :ref:`control request limit <docs/api-reference/api-usage/actuator-limits:control request limits>` overrides can be used, or a CANcoder can be used a :ref:`remote limit switch <docs/api-reference/api-usage/actuator-limits:remote limit switches>`.

Documentation on wiring limit switches can be found :ref:`here <docs/hardware-reference/talonfx/index:actuator limits>`.

Retrieving Limit Switch State
-----------------------------

The state of the forward or reverse limit switch can be retrieved from the API via ``getForwardLimit()`` and ``getReverseLimit()``. Additionally, the state of the forward or reverse soft limit can be retrieved from the API via ``getFault_ForwardSoftLimit()`` and ``getFault_ReverseSoftLimit()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var forwardLimit = m_motor.getForwardLimit();
         if (forwardLimit.getValue() == ForwardLimitValue.ClosedToGround) {
            // do action when forward limit is closed
         }

         var forwardSoftLimit = m_motor.getFault_ForwardSoftLimit();
         if (forwardSoftLimit.getValue()) {
            // do action when forward soft limit is reached
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& forwardLimit = m_motor.GetForwardLimit();
         if (forwardLimit.GetValue() == signals::ForwardLimitValue::ClosedToGround) {
            // do action when forward limit is closed
         }

         auto& forwardSoftLimit = m_motor.GetFault_ForwardSoftLimit();
         if (forwardSoftLimit.GetValue()) {
            // do action when forward soft limit is reached
         }

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         forward_limit = self.motor.get_forward_limit()
         if forward_limit.value is signals.ForwardLimitValue.CLOSED_TO_GROUND:
            # do action when forward limit is closed

         forward_soft_limit = self.motor.get_fault_forward_soft_limit()
         if forward_soft_limit.value:
            # do action when forward soft limit is reached

Control Request Limits
----------------------

Many :doc:`control requests </docs/api-reference/api-usage/control-requests>` support overriding the limit switch values using ``LimitForwardMotion`` and ``LimitReverseMotion`` parameters (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/controls/DutyCycleOut.html#LimitForwardMotion>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html#a2696bd6c0631110656541208a3f40dac>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/controls/duty_cycle_out/index.html#phoenix6.controls.duty_cycle_out.DutyCycleOut.limit_forward_motion>`__). These allow users to use other limit switch sensors connected to the robot controller.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         final DigitalInput m_forwardLimit = new DigitalInput(0);
         final DigitalInput m_reverseLimit = new DigitalInput(1);

         final DutyCycleOut m_dutyCycle = new DutyCycleOut(0.0);

         m_motor.setControl(m_dutyCycle.withOutput(0.5)
               .withLimitForwardMotion(m_forwardLimit.get())
               .withLimitReverseMotion(m_reverseLimit.get()));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         frc::DigitalInput m_forwardLimit{0};
         frc::DigitalInput m_reverseLimit{1};

         controls::DutyCycleOut m_dutyCycle{0.0};

         m_motor.SetControl(m_dutyCycle.WithOutput(0.5)
               .WithLimitForwardMotion(m_forwardLimit.Get())
               .WithLimitReverseMotion(m_reverseLimit.Get()));

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         self.forward_limit = wpilib.DigitalInput(0)
         self.reverse_limit = wpilib.DigitalInput(1)

         self.duty_cycle = controls.DutyCycleOut(0.0)

         self.motor.set_control(self.duty_cycle.with_output(0.5)
               .with_limit_forward_motion(self.forward_limit.get())
               .with_limit_reverse_motion(self.reverse_limit.get()))

Remote Limit Switches
---------------------

Supported devices (TalonFX, CANcoder, CANrange) can be utilized as a remote limit switch, disabling actuator outputs when triggers.

- When utilizing a CANcoder as a remote limit, the limit will trigger when the magnet strength changes from BAD (red) to ADEQUATE (orange) or GOOD (green).
- When utilizing a CANrange as a remote limit, the limit will trigger when the detected distance is shorter than the configured distance threshold.

The remote limit switch can be selected using the ``LimitSource`` and ``LimitRemoteSensorID`` configs.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         var limitConfigs = new HardwareLimitSwitchConfigs();
         limitConfigs.ForwardLimitSource = ForwardLimitSourceValue.RemoteCANcoder;
         limitConfigs.ForwardLimitRemoteSensorID = m_cancoder.getDeviceID();

         m_motor.getConfigurator().apply(limitConfigs);

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         configs::HardwareLimitSwitchConfigs limitConfigs{};
         limitConfigs.ForwardLimitSource = signals::ForwardLimitSourceValue::RemoteCANcoder;
         limitConfigs.ForwardLimitRemoteSensorID = m_cancoder.GetDeviceID();

         m_motor.GetConfigurator().Apply(limitConfigs);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         limit_configs = configs.HardwareLimitSwitchConfigs()
         limit_configs.forward_limit_source = signals.ForwardLimitSourceValue.REMOTE_CANCODER
         limit_configs.forward_limit_remote_sensor_id = self.cancoder.device_id

         self.motor.configurator.apply(limit_configs)
