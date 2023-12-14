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

Remote Limit Switches
---------------------

Supported devices (TalonFX, CANcoder, CANifier) can be utilized as a remote limit switch, disabling actuator outputs when triggers. Simply configure the ``Limit Source``, ``Limit ID`` and ``Limit Auto Set Pos`` configs.

For example, when utilizing a CANcoder as a remote sensor, the limit will trigger when the magnet strength changes from BAD (red) to GOOD (orange) or PERFECT (green).

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         HardwareLimitSwitchConfigs limitConfigs = new HardwareLimitSwitchConfigs();
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

         from phoenix6 import HardwareLimitSwitchConfigs, TalonFX
         from phoenix6 import signals.ForwardLimitSourceValue

         limit_configs = HardwareLimitSwitchConfigs()
         limit_configs.forward_limit_source = ForwardLimitSourceValue.REMOTE_CANCODER

         m_motor.configurator.apply(limit_configs)
