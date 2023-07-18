Latency and Frequency
=====================
*Authored by Cory*

A common discussion with CAN-based sensors and actuators is how latency and update frequency affect robot performance. This devblog is meant to expand what these aspects are and how users can mitigate or eliminate them with Phoenix 6/Pro.

Frequency
---------
Signal frequency largely affects two aspects for robots:

1. Closed loop control
2. Odometry

Closed loop control is pretty clear, the slower the frequency, the greater the time gaps and the more you have to dampen a closed loop controller to keep it smooth. This becomes more important the less inertia your system has, such as with a swerve drive azimuth. At the inertia of a full robot, this becomes less important, as the robot can't change its own heading fast enough for the lower frequency to have much of an impact.

Odometry is a little less clear, but the gist is that odometry itself is generally an integration problem. If your data is coming in at a lower frequency, the integration isn't as accurate, and so you accrue drift and error. This gets worse over time, which is why absolute odometry solutions such as april tag pose are so important at the high level to correct for it.

Latency
-------
Latency itself isn't so much an issue, but nondeterministic latency can be. If you aren't getting data at a steady rate, it can negatively affect the odometry, as the time aspect of the integration problem is no longer constant. You can correct for this with latency compensation if you have the option to, but even that's not a perfect solution as the latency corrected value may not be exactly correct to the real value at that point in time (although it's certainly better than nothing).

Solutions
---------
We (CTR Electronics) recognized these problems in general and wanted to solve them, which is why each of these problems are solved in the new Phoenix 6/Pro library and with CANivore.

- :ref:`Fused CANcoder <fusedcancoder>` (**Pro**): By fusing in the CANcoder's position into the Talon FX's internal position, users ensure the position is always absolute while maintaining 1000hz update frequency and 0 latency for closed loop operations. This feature is improved when used with CANivore, as the CANcoder's position can be latency-compensated and fused even when the mechanism is moving.
- :ref:`Time Synchronization <docs/api-reference/api-usage/status-signals:canivore timesync>` (**Pro & CANivore**): The CANivore provides the ability for Pro devices to synchronize to a common clock, which allows all the devices to sample data at the same time and publish data at the same time. This makes latency of data between devices minimal, and when used with our synchronize API keeps total latency low.
- :ref:`Synchronous API <docs/api-reference/api-usage/status-signals:waiting for signal updates>` (**v6**): The synchronous API allows users to wait for data to arrive. By waiting for all the key data to arrive, the overall latency is reduced and users can update their robot's data as soon as new data is available.
- :ref:`Time Stamps <docs/api-reference/api-usage/status-signals:timestamps>` (**v6**): Every data is timestamped so users can perform latency compensation. The timestamp information is improved if used with a CANivore, as the CANivore timestamps the data once it arrives over the wire, providing a more accurate timestamp compared to when the RIO does the timestamping.
- :ref:`Improved bus utilization <docs/migration/canbus-utilization:can bus utilization>` (**v6**): The improved bus utilization with v6 and further improvement with CANivore allow you to pretty easily increase the frequency of your key signals. We think it's pretty achievable to get 200hz update frequencies (5ms periods) under a full robot.

Every component outlined here is used in our `SwerveDriveExample <https://github.com/CrossTheRoadElec/SwerveDriveExample>`_. If you're interested in how to do it for yourself, I'd recommend looking at it and doing something similar.
