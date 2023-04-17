Why Phoenix Pro?
================

Phoenix Pro currently offers the following features and will further expand.

:doc:`Comprehensive API </docs/api-reference/api-usage/index>`
--------------------------------------------------------------

- Device signal getters return a :doc:`StatusSignalValue </docs/api-reference/api-usage/status-signals>` object, expanding the functionality of status signals.
- Control devices with an extensive list of flexible, strongly-typed :doc:`control request objects </docs/api-reference/api-usage/control-requests>`.

Canonical Units
---------------

- Uses the popular `Units <https://github.com/nholthaus/units>`__ library for C++ and standardizes on SI units.
- Signals are documented with the unit type and the minimum and maximum values.

Time Base Synchronization
-------------------------

- Using :ref:`CANivore Timesync <docs/api-reference/api-usage/status-signals:canivore timesync>`, signals from all devices are sampled and published to the CAN bus at the same time.
- API can synchronously wait for data from multiple devices on a CANivore to arrive.

`Field Oriented Control (FOC) <https://en.wikipedia.org/wiki/Vector_control_(motor)>`__
---------------------------------------------------------------------------------------

- ~15% increase in peak power.
- Increased torque output; faster acceleration and a higher max speed under load.
- Greater efficiency; the motor draws less current for the same output power, increasing battery life.
- Support for direct :ref:`torque control <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:torquecurrentfoc>`.

Improved Device Control
-----------------------

- New and improved :doc:`control output types </docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro>` and :doc:`closed-loop </docs/api-reference/api-usage/device-specific/talonfx/closed-loop-requests>` configuration.
- Improved :ref:`Motion Magic <docs/api-reference/api-usage/device-specific/talonfx/closed-loop-requests:motion magic>` with jerk control and support for modifying the profile on the fly.
- Kalman-based algorithms to reduce latency while maintaining smooth data.
- :ref:`Fuse a CANcoder <fusedcancoder>` with the motor's internal rotor, getting absolute data all the time while using the fast internal sensor for closed looping.

Enhanced Support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__
---------------------------------------------------------------------------

- Improved CAN FD framing further reduces any CAN bus utilization issues.
- Larger CAN frames allow for the addition of more advanced features.

New :doc:`Tuner X Self Tests </docs/tuner/self-test>`
-----------------------------------------------------

- Detailed and resolute self tests to improve debugging.

Free :doc:`High-Fidelity Simulation </docs/api-reference/simulation/simulation-intro>`
--------------------------------------------------------------------------------------

- Simulation closely follows the behavior of real hardware.
- Write unit-tests for your robot code, and make sure the robot works before deploying.
- *Try Phoenix Pro before you buy!*
