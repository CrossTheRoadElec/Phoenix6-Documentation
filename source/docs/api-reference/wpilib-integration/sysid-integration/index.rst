SysId Integration
=================

System Identification, or commonly referred to as SysId, is the process of identifying the characteristics of a given `system <https://en.wikipedia.org/wiki/System>`__.

This identification usually consists of:

1. Mechanism testing

   * In FRC, two tests are performed: Quasistatic and Dynamic.

2. Data collection

   * ``Position``, ``Velocity``, and ``MotorOutput`` samples are collected while the tests are running.

3. Data analysis

   * Collected data is analyzed to calculate constants such as :ref:`PID <docs/api-reference/device-specific/talonfx/closed-loop-requests:gain slots>` gains, slip current (maximum stator current), maximum robot velocity, etc.

.. note:: This documentation assumes that the user is utilizing a `command-based robot program <https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html>`__.

Advantages of ``SignalLogger`` over ``DataLog``
-----------------------------------------------

When collecting data for analysis, it's important to take into account several factors, such as:

- Impact of CAN latency
- Signals sent faster than the 20ms main robot loop
- Language data collection issues (such as Java garbage collection causing pauses in the log)

When users utilize the :doc:`Phoenix 6 signal logging API </docs/api-reference/api-usage/signal-logging>`, these issues are eliminated.

This section guides the user through characterizing a motor, converting hoot logs to a WPILib ``WPILOG`` for data analysis, and integrating gains for control. This section can also be used as a characterizing other mechanisms such as a :doc:`swerve </docs/tuner/tuner-swerve/index>` azimuth and drive motors.

Characterization begins with a functioning robot program. Users should have basic code for the mechanism already put together, and all :ref:`configs <docs/api-reference/api-usage/configuration:applying configs>` in the ``FeedbackConfigs`` group should be applied. Any changes to the gear ratios and sensor source in ``FeedbackConfigs`` may require the user to recharacterize their mechanism.

Get started:

.. toctree::
   :maxdepth: 1

   plumbing-and-running-sysid
   analyzing-results
