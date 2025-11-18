Tuning a Differential Mechanism
===============================

.. important:: This article assumes that you are familiar with tuning PID on a single-axis mechanism. For more information, see :doc:`/docs/api-reference/device-specific/talonfx/closed-loop-requests`.

Because a differential mechanism has :ref:`two axes of motion <docs/api-reference/mechanisms/differential/differential-overview:what is a differential mechanism?>`, it also needs separate sets of PID gains for the Average axis (typically Slot 0) and the Difference axis (typically Slot 1). These gains are applied to the :ref:`differential leader <docs/api-reference/mechanisms/differential/differential-overview:differential leader and follower>`.

.. warning:: Tuner X only supports the ``SimpleDifferentialMechanism`` control requests. For full functionality while tuning, use the ``DifferentialMechanism`` API for control and Tuner X for plotting and configs. See :doc:`/docs/api-reference/mechanisms/differential/using-differential-mech` for more information.

Tuning a differential mechanism typically involves three steps:

Step 1: Weak kP on the Difference Axis
--------------------------------------

When tuning closed-loop control on a differential mechanism, it is important that the axis not being tuned is roughly held in place. Failing to do so can result in damage to the mechanism at stronger gains. To accomplish this, a relatively weak kP can be applied to the Difference axis prior to tuning the average axis.

In Tuner X, select the differential leader motor controller. The ``DifferentialPosition`` signal can be plotted to determine a reasonable setpoint.

From there, apply an open-loop request to the average axis and a position closed-loop request to the Difference axis (for ``SimpleDifferentialMechanism``, use the ``Differential{OutputType}`` requests). Adjust the kP on the Difference axis until there is a reasonable amount of resistance to motion without oscillation.

.. important:: Do not try to optimize the feedforward and PID gains on the Difference axis at this point.

Step 2: Feedforwards and PID on the Average Axis
------------------------------------------------

With the Difference axis now roughly held in place, the focus shifts to tuning the feedforwards and PID on the Average axis. The tuning process on the average axis is roughly the same as with a single-axis mechanism (such as a single gearbox elevator) with two changes:

- Use the ``DifferentialAveragePosition`` and ``DifferentialAverageVelocity`` signals instead of the ``Position`` and ``Velocity`` signals.
- Use the differential mechanism or control requests (such as ``DifferentialMotionMagicVoltage``) when tuning, keeping the Difference axis held in place.

As is the case with a single-axis mechanism, many gains on the Average axis scale with the ``RotorToSensorRatio`` and ``SensorToMechanismRatio``. For example, a Kraken X60 differential mechanism with 3:1 gearing on the average axis would have a kV of around 0.36 V/rps (:math:`K_{v\_avg} = 3.0 * 0.12` V/rps) on the Average axis.

Step 3: Feedforwards and PID on the Difference Axis
---------------------------------------------------

Finally, the feedforwards and PID gains on the Difference axis can be fully tuned:

- Use the ``DifferentialDifferencePosition`` and ``DifferentialDifferenceVelocity`` signals instead of the ``Position`` and ``Velocity`` signals.
- Use the ``Differential`` closed-loop signals (such as ``DifferentialClosedLoopReference``) instead of the regular closed-loop signals.
- Use the differential mechanism or control requests (such as ``DifferentialMotionMagicVoltage``) when tuning, keeping the Average axis held in place.

.. note:: For some mechanisms like a two-gearbox elevator, these gains may be left on the weaker side, as the focus is on the Average axis.

At a ``SensorToDifferentialRatio`` of 1.0, the scale of the gains on the Difference axis will be similar to those on the Average axis. For example, a Kraken X60 differential mechanism with 1:1 gearing on all axes will have a kV of around 0.12 V/rps on both the Average axis and the Differential axis. However, note that **kG is often 0** on the Difference axis.

Otherwise, the gains on the Difference axis scale with the ``SensorToDifferentialRatio`` **relative to the Average axis**. For example, a 3:1 gearing on the Average axis and an *additional* 2:1 gearing on the Difference axis would result in a kV of around 0.72 V/rps (:math:`K_{v\_diff} = 2.0 * K_{v\_avg}`) on the Difference axis.
