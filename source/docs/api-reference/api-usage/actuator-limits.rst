Retrieving Limit Switch State
=============================

The state of the forward or reverse limit switch can be retrieved from the API via ``getForwardLimit()`` and ``getReverseLimit()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var forwardLimit = m_motor.getForwardLimit();

         if (forwardLimit.getValue() == ForwardLimitValue.Closed) {
            // do action when forward limit is closed
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& forwardLimit = m_motor.GetForwardLimit();

         if (forwardLimit.GetValue() == ForwardLimitValue.Closed) {
            // do action when forward limit is closed
         }
