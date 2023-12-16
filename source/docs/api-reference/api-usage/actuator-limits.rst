Actuator Limits
===============

CTR Electronics actuators, such as the TalonFX, support various kinds of hardware and software limits.

.. note:: The TalonFX + Kraken x60 does not support hardware limit switches. Instead, a CANcoder can be used a remote limit switch.

Documentation on wiring limit switches can be found :ref:`here <docs/hardware-reference/talonfx/index:actuator limits>`.

Retrieving Limit Switch State
-----------------------------

The state of the forward or reverse limit switch can be retrieved from the API via ``getForwardLimit()`` and ``getReverseLimit()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var forwardLimit = m_motor.getForwardLimit();

         if (forwardLimit.getValue() == ForwardLimitValue.ClosedToGround) {
            // do action when forward limit is closed
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& forwardLimit = m_motor.GetForwardLimit();

         if (forwardLimit.GetValue() == signals::ForwardLimitValue::ClosedToGround) {
            // do action when forward limit is closed
         }

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         forward_limit = self.motor.get_forward_limit()

         if forward_limit.value is signals.ForwardLimitValue.CLOSED_TO_GROUND:
            # do action when forward limit is closed

Remote Limit Switches
---------------------

Supported devices (TalonFX, CANcoder, CANifier) can be utilized as a remote limit switch, disabling actuator outputs when triggers. When utilizing a CANcoder as a remote sensor, the limit will trigger when the magnet strength changes from BAD (red) to ADEQUATE (orange) or GOOD (green).

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
