Introduction to Control Types
=============================

Phoenix 6 motor controllers support a variety of :doc:`open-loop </docs/api-reference/device-specific/talonfx/open-loop-requests>` and :doc:`closed-loop </docs/api-reference/device-specific/talonfx/closed-loop-requests>` control requests. Additionally, the TalonFX supports :ref:`Field Oriented Control (FOC) <docs/api-reference/device-specific/talonfx/talonfx-control-intro:field oriented control>`.

Control Output Types
--------------------

The TalonFXS currently supports two base control output types: DutyCycle and Voltage. The TalonFX additionally supports TorqueCurrentFOC.

.. note:: There are various configuration options available that influence the onboard control. For example, see :doc:`/docs/hardware-reference/talonfx/improving-performance-with-current-limits`.

DutyCycle
^^^^^^^^^

A DutyCycle control request outputs a proportion of the supply voltage, which typically ranges from -1.0 to 1.0, inclusive. This control output type is typically used in systems where it is important to be capable of running at the maximum speed possible, such as in a typical robot drivetrain.

Voltage
^^^^^^^

A Voltage control request directly controls the output voltage of the motor. The output voltage is capped by the supply voltage to the device. Since the output of a Voltage control request is typically unaffected by the supply voltage, this control output type results in more stable and reproducible behavior than a DutyCycle control request.

TorqueCurrentFOC
^^^^^^^^^^^^^^^^

.. important:: This feature requires the device to be :doc:`Pro licensed </docs/licensing/licensing>`. Additionally, the Talon FXS does not support TorqueCurrentFOC at this time.

A TorqueCurrentFOC control request uses Field Oriented Control to directly control the output torque current of the motor. Unlike the other control output types, where output roughly controls the velocity of the motor, a TorqueCurrentFOC request **directly controls the acceleration** of the motor.

Field Oriented Control
----------------------

.. important:: This feature requires the device to be :doc:`Pro licensed </docs/licensing/licensing>`. Additionally, the Talon FXS does not support FOC at this time.

Field Oriented Control (FOC) is a commutation mode that increases peak power by ~15%. All control modes that optionally support FOC have an ``EnableFOC`` field (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/controls/DutyCycleOut.html#EnableFOC>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html#aeef226602dc68cf690681c98001a5f94>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/controls/duty_cycle_out/index.html#phoenix6.controls.duty_cycle_out.DutyCycleOut.enable_foc>`__). There are also control types that require FOC, such as TorqueCurrentFOC.

Behavior While Unlicensed
^^^^^^^^^^^^^^^^^^^^^^^^^

When controlling an unlicensed device, the device will automatically fall back to non-FOC commutation for control requests that support the ``EnableFOC`` field.

For control requests that require FOC, such as TorqueCurrentFOC, the unlicensed device will:

- Disable control output
- :doc:`Set the UnlicensedFeatureInUse fault </docs/api-reference/api-usage/faults>`
- :ref:`Blink unlicensed <docs/hardware-reference/talonfx/index:status light reference>`
