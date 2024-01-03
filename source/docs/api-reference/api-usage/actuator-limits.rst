Actuator Limits
===============

CTR Electronics actuators, such as the TalonFX, support various kinds of hardware and software limits.

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
