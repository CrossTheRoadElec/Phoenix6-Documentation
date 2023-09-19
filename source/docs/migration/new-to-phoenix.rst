New to Phoenix
==============

Phoenix 6 currently offers the following features and will further expand.

Phoenix 6
---------

The following features are available for free in the Phoenix 6 API.

:doc:`Comprehensive API </docs/api-reference/api-usage/index>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Device signal getters return a :doc:`StatusSignal </docs/api-reference/api-usage/status-signals>` object, expanding the functionality of status signals.
- Control devices with an extensive list of flexible, strongly-typed :doc:`control request objects </docs/api-reference/api-usage/control-requests>`.

Canonical Units
^^^^^^^^^^^^^^^

- Uses the popular `Units <https://github.com/nholthaus/units>`__ library for C++ and standardizes on SI units.
- Signals are documented with the unit type and the minimum and maximum values.

Improved Device Control
^^^^^^^^^^^^^^^^^^^^^^^

- New and improved :doc:`control output types </docs/api-reference/device-specific/talonfx/talonfx-control-intro>` and :doc:`closed-loop </docs/api-reference/device-specific/talonfx/closed-loop-requests>` configuration.
- Improved :ref:`Motion Magic® <docs/api-reference/device-specific/talonfx/closed-loop-requests:motion magic®>` with jerk control and support for modifying the profile on the fly.
- Kalman-based algorithms to reduce latency while maintaining smooth data.

Enhanced Support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Improved CAN FD framing further reduces any :doc:`CAN bus utilization </docs/migration/canbus-utilization>` issues.
- Larger CAN frames allow for the addition of more advanced features.

New :doc:`Tuner X Self Tests </docs/tuner/self-test>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Detailed and resolute self tests to improve debugging.

Free :doc:`High-Fidelity Simulation </docs/api-reference/simulation/simulation-intro>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Simulation closely follows the behavior of real hardware.
- Write unit-tests for your robot code, and make sure the robot works before deploying.

:ref:`Continuous Wrap Mode <docs/api-reference/device-specific/talonfx/closed-loop-requests:continuous mechanism wrap>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Takes the shortest path for continuous mechanisms.
- Ideal for mechanisms such as Swerve Drive Steer.

Phoenix Pro
-----------

Certain Phoenix 6 features require the device or CANivore to be :doc:`Pro licensed </docs/licensing/licensing>`. The list of features that require licensing is available below.

`Field Oriented Control (FOC) <https://en.wikipedia.org/wiki/Vector_control_(motor)>`__
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- ~15% increase in peak power.
- Increased torque output; faster acceleration and higher speeds under load.
- Greater efficiency; the motor draws less current for the same output power, increasing battery life.
- Support for direct :ref:`torque control <docs/api-reference/device-specific/talonfx/talonfx-control-intro:torquecurrentfoc>`.

Time Base Synchronization
^^^^^^^^^^^^^^^^^^^^^^^^^

- Using :ref:`CANivore Timesync <docs/api-reference/api-usage/status-signals:canivore timesync>`, signals from all devices are sampled and published to the CAN bus at the same time.
- API can synchronously wait for data from multiple devices on a CANivore to arrive.

Fused CANcoder
^^^^^^^^^^^^^^

- :ref:`Fuse a CANcoder <fusedcancoder>` with the motor's internal rotor, getting absolute data all the time while using the fast internal sensor for closed looping.

Feature Breakdown
------------------

A full comparison of features between the free Phoenix 6 API and Phoenix Pro is shown below.

+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Feature                       | Phoenix 6 (rio) | Phoenix Pro (rio) | Phoenix 6 (CANivore) | Phoenix Pro (CANivore) |
+===============================+=================+===================+======================+========================+
| Canonical Units               | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Improved Bus Utilization      | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| CANcoder Always Absolutely    | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Kalman-based Velocity         | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Synchronous Wait for Data     | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| System + CANivore Timestamps  | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Explicit Control Requests     | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Continuous Wrap Mode          | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Improved Self-Test Snapshot   | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Tuner X Improved Plotting     | .. centered:: x | .. centered:: x   | .. centered:: x      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Time-Synced Signal Publishing |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Field Oriented Control (FOC)  |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| CAN Device Timestamps         |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Fused CANcoder + TalonFX      |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Sync CANcoder + Talon FX      |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Signal Logger Export          |                 | .. centered:: x   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Dynamic Motion Magic          |                 |                   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Differential Control          |                 |                   |                      | .. centered:: x        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+
| Java Swerve API               | .. centered:: x | .. centered:: +   | .. centered:: +      | .. centered:: ++        |
+-------------------------------+-----------------+-------------------+----------------------+------------------------+

.. note:: The Java Swerve API is freely available, however performance improves when used on a CANivore bus and further improves when used with Pro devices.
