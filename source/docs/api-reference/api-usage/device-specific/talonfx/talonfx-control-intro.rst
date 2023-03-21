Introduction to TalonFX Control
===============================

The TalonFX has a variety of open-loop and closed-loop control requests and supports Field Oriented Control.

Control Output Types
--------------------

The TalonFX supports three base control output types: DutyCycle, Voltage, and TorqueCurrentFOC.

DutyCycle
^^^^^^^^^

A DutyCycle control request outputs a proportion of the supply voltage, which typically ranges from -1.0 to 1.0, inclusive. This control output type is typically used in systems where it is important to be capable of running at the maximum speed possible, such as in a typical robot drivetrain.

Voltage
^^^^^^^

A Voltage control request directly controls the output voltage of the motor. The output voltage is capped by the supply voltage to the device. Since the output of a Voltage control request is typically unaffected by the supply voltage, this control output type results in more stable and reproducible behavior than a DutyCycle control request.

TorqueCurrentFOC
^^^^^^^^^^^^^^^^

A TorqueCurrentFOC control request uses Field Oriented Control to directly control the output current of the motor. Unlike the other control output types, where output roughly controls the velocity of the motor, a TorqueCurrentFOC request controls the **acceleration** of the motor.

Field Oriented Control
----------------------

Field Oriented Control (FOC) is a commutation mode that increases peak power by ~15%. All control modes that optionally support FOC have an ``EnableFOC`` field (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/DutyCycleOut.html#EnableFOC>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1controls_1_1_duty_cycle_out.html#abfe71dea214ab5a262bc116d6292dd76>`__). There are also control types that require FOC, such as TorqueCurrentFOC.
