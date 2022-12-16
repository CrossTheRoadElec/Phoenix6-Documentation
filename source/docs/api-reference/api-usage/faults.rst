Device Faults
=============

"Faults" are status indicators on CTR-Electronics CAN devices that indicate a certain behavior or event has occurred. Faults do not directly affect the behavior of a device; instead, they indicate the device's current status and highlight potential issues.

Faults are stored in two fashions. There are "live" faults, which are reported in real-time, and "sticky" faults, which assert persistently and stay asserted until they are manually cleared (like trouble codes in a vehicle).

Sticky Faults can be cleared in Phoenix Tuner X, while a regular fault can only be cleared when the offending problem has been resolved. Faults can be cleared via the :guilabel:`Blink/Clear Faults` button.

.. image:: images/self-test-clear-faults.png
   :width: 70%
   :alt: Blink/Clear faults button in tuner located in the bottom right.
