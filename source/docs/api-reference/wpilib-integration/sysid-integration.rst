SysID Integration
=================

System Identification, or commonly referred to as SysID, is the process of identifying the characteristics of a given `system <https://en.wikipedia.org/wiki/System>`__.

This identification usually consists of:

1. Mechanism testing
  
   * In FRC, two tests are performed: Quasistatic and Dynamic.

2. Data collection

   * ``Voltage``, ``Current``, and ``MotorOutput`` samples are collected while the tests are running.

3. Data analysis

   * Collected data is analyzed to calculate constants such as :ref:`PID <docs/api-reference/device-specific/talonfx/closed-loop-requests:gain slots>` gains, slip current (maximum stator current), maximum robot velocity, etc.

Advantages of Hoot Logger vs DataLogging
----------------------------------------

When collecting data for analysis, it's important to minimize factors such as:

- CAN latency
- Signal timestamps coming in out-of-order
- Language data collection issues (such as Java garbage collection causing data to be lost).

When users utilize the :doc:`signal logging API </docs/api-reference/api-usage/signal-logging>`, these issues are mitigated or even eliminated.

* Signals timestamps are device timestamps when Pro-licensed.

  * Removes CAN latency being part of the collected data timestamps.set

* Signals are :ref:`Time Synced <docs/api-reference/api-usage/status-signals:canivore timesync>` when on a CANivore bus and :doc:`Pro-licensed </docs/licensing/licensing>`

  * SysID important signals; such as ``Voltage``, ``MotorOutput``, and ``Current`` will all be synchronized.

* Signal logging is unaffected by language issues such as garbage collection.

Motor Characterization Example
------------------------------

This example guides the user through characterizing a motor, converting to a WPILib ``WPILog`` for data analysis and integrating gains for control. This article can also be used for characterizing other mechanisms such as a :doc:`Swerve </docs/tuner/tuner-swerve/index>` azimuth or drive motors.

Plumbing SysID
^^^^^^^^^^^^^^

