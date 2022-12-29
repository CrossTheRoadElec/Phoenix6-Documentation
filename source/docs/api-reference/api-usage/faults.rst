Device Faults
=============

"Faults" are status indicators on CTR-Electronics CAN devices that indicate a certain behavior or event has occurred. Faults do not directly affect the behavior of a device; instead, they indicate the device's current status and highlight potential issues.

Faults are stored in two fashions. There are "live" faults, which are reported in real-time, and "sticky" faults, which assert persistently and stay asserted until they are manually cleared (like trouble codes in a vehicle).

Sticky Faults can be cleared in Phoenix Tuner X or via the ``clearStickyFaults()`` function on the offending device, while a regular fault can only be cleared when the offending problem has been resolved. Faults can be cleared via the :guilabel:`Blink/Clear Faults` button.

.. image:: images/self-test-clear-faults.png
   :width: 70%
   :alt: Blink/Clear faults button in tuner located in the bottom right.

Retrieving Faults via API
-------------------------

Faults can also be retrieved via the API using the ``getFault_XXX()`` (regular) or ``getStickyFault_XXX()`` (sticky) functions on the offending device. ``XXX`` can be replaced with the name of the fault. This can be useful for diagnostics or error handling.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         var faulted = cancoder.getFault_BadMagnet().getValue();

         if (faulted) {
            // do action when bad magnet fault is set
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto faulted = cancoder.GetFault_BadMagnet().GetValue();

         if (faulted) {
            // do action when bad magnet fault is set
         }


A list of possible faults can be found in the API documentation for each device.
