Phoenix 6 Features
==================

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

- Uses the popular `C++ units library <https://github.com/nholthaus/units>`__ and standardizes on SI units.
- Provides overloads using the `Java units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/java-units.html>`__.
- Signals are documented with the unit type and the minimum and maximum values.

Improved Device Control
^^^^^^^^^^^^^^^^^^^^^^^

- New and improved :doc:`control output types </docs/api-reference/device-specific/talonfx/talonfx-control-intro>` and :doc:`closed-loop </docs/api-reference/device-specific/talonfx/closed-loop-requests>` configuration.
- Improved :ref:`Motion Magic® <docs/api-reference/device-specific/talonfx/motion-magic:motion magic®>` with jerk control and support for modifying the profile on the fly.
- New :ref:`Motion Magic® Expo <docs/api-reference/device-specific/talonfx/motion-magic:motion magic® expo>` control to use an exponential profile following system dynamics, reducing both overshoot and time to target.
- Kalman-based algorithms to reduce latency while maintaining smooth data.

:doc:`Swerve API </docs/api-reference/mechanisms/swerve/swerve-overview>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- High-performance Swerve API using synchronous, latency-compensated odometry.
- Eliminate the boilerplate from copying swerve template code.
- Supported in Java, C++, and Python.
- Minimized GC impact in Java and Python using native C++ implementation.
- Improved :doc:`odometry performance </docs/application-notes/update-frequency-impact>` with CANivore and Phoenix Pro.
- Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` gets swerve drive up and running quickly.
- Built-in high-fidelity :doc:`simulation </docs/api-reference/mechanisms/swerve/swerve-simulation>` support.

Enhanced Support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Improved CAN FD framing further reduces any :doc:`CAN bus utilization </docs/migration/canbus-utilization>` issues.
- Larger CAN frames allow for the addition of more advanced features.

New Tuner X :doc:`Self Tests </docs/tuner/self-test>` and :doc:`Plotting </docs/tuner/plotting>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Detailed and resolute self tests to improve debugging.
- Plot signals at the configured signal update frequency.
- Combine multiple signal axes together and customize display of signal plots.

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
- Device timestamps captured when the signal is sampled provides best possible latency compensation.

Fused CANcoder
^^^^^^^^^^^^^^

- :ref:`Fuse a CANcoder <fusedcancoder>` with the motor's internal rotor, getting absolute data all the time while using the fast internal sensor for closed looping.

Real-Time High-Fidelity :doc:`Signal Logger </docs/api-reference/api-usage/signal-logging>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Log all status signals from every device with timestamps from CAN.
- Data captured as it arrives at the full update rate of the status signals.
- Improved sensitivity and accuracy of system identification with `WPILib SysId <https://docs.wpilib.org/en/stable/docs/software/pathplanning/system-identification/introduction.html>`__.
- Automatically starts logging during an FRC match.
- Support for :ref:`custom user signals <docs/api-reference/api-usage/signal-logging:writing custom signals>` alongside auto-captured data.
- Efficient ``hoot`` logging format minimizes disk space and CPU usage.
- :doc:`Export to multiple formats </docs/tuner/tools/log-extractor>` including WPILOG and MCAP.
- Free users can export a :ref:`limited set of signals <docs/api-reference/api-usage/signal-logging:free signals>`.

:doc:`Replay Hoot Logs </docs/api-reference/api-usage/hoot-replay>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Rerun your robot program in simulation using status signals and custom signals from a ``hoot`` log generated by the robot.
- No architecture changes necessary for automatic replay of device status signals.
- Robot automatically enables in the correct mode and runs through all maneuvers in the hoot log.
- Test code changes such as odometry improvements or failure condition detection and handling.
- Support for step timing and changing the speed of playback.

Feature Breakdown
------------------

A full comparison of features between the free Phoenix 6 API and Phoenix Pro is shown below.

+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| Feature                                                                                                                       | Phoenix 6 (rio) | Phoenix 6 + Pro (rio) | Phoenix 6 (CANivore) | Phoenix 6 + Pro (CANivore) |
+===============================================================================================================================+=================+=======================+======================+============================+
| Canonical Units                                                                                                               | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Improved Bus Utilization </docs/migration/canbus-utilization>`                                                          | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`CANcoder Always Absolute <docs/migration/migration-guide/feature-replacements-guide:sensor initialization strategy>`    | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| Kalman-based Velocity                                                                                                         | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Synchronous Wait for Data <docs/api-reference/api-usage/status-signals:waiting for signal updates>`                     | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| System Timestamps                                                                                                             | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Limited Signal Logger Export <docs/api-reference/api-usage/signal-logging:free signals>`                                | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Explicit Control Requests </docs/api-reference/api-usage/control-requests>`                                             | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Motion Magic® <docs/api-reference/device-specific/talonfx/motion-magic:motion magic®>`                                  | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Motion Magic® Velocity <docs/api-reference/device-specific/talonfx/motion-magic:motion magic® velocity>`                | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Motion Magic® Expo <docs/api-reference/device-specific/talonfx/motion-magic:motion magic® expo>`                        | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Continuous Wrap Mode <docs/api-reference/device-specific/talonfx/closed-loop-requests:continuous mechanism wrap>`       | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| Simple Differential Control                                                                                                   | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Improved Self-Test Snapshot </docs/tuner/self-test>`                                                                    | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Improved Tuner X Plotting </docs/tuner/plotting>`                                                                       | .. centered:: x | .. centered:: x       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| CANivore Timestamps                                                                                                           |                 |                       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| `CAN FD <https://store.ctr-electronics.com/pages/can-fd/>`__                                                                  |                 |                       | .. centered:: x      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Field Oriented Control (FOC) <docs/api-reference/device-specific/talonfx/talonfx-control-intro:field oriented control>` |                 | .. centered:: x       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Fused CANcoder + TalonFX <fusedcancoder>`                                                                               |                 | .. centered:: x       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Sync CANcoder + Talon FX <synccancoder>`                                                                                |                 | .. centered:: x       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Full Signal Logger Export </docs/tuner/tools/log-extractor>`                                                            |                 | .. centered:: x       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Hoot Log Replay </docs/api-reference/api-usage/hoot-replay>`                                                            |                 | .. centered:: x       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Time-Synced Signal Publishing <docs/api-reference/api-usage/status-signals:canivore timesync>`                          |                 |                       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| Device Timestamps                                                                                                             |                 |                       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :ref:`Dynamic Motion Magic® <docs/api-reference/device-specific/talonfx/motion-magic:dynamic motion magic®>`                  |                 |                       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| Full Differential Control                                                                                                     |                 |                       |                      | .. centered:: x            |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+
| :doc:`Swerve API </docs/api-reference/mechanisms/swerve/swerve-overview>`                                                     | .. centered:: + | .. centered:: ++      | .. centered:: ++     | .. centered:: +++          |
+-------------------------------------------------------------------------------------------------------------------------------+-----------------+-----------------------+----------------------+----------------------------+

.. note:: :sup:`+` The Swerve API is freely available; however, performance improves when used on a CANivore bus and further improves when used with Pro devices. For more information, see :doc:`/docs/application-notes/update-frequency-impact`.
