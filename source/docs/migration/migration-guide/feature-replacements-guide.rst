Feature Replacements
====================

In addition to the changes shown in the other sections, several other Phoenix 5 features have been replaced or improved upon in Phoenix 6.

Motor Invert
------------

In Phoenix 6, motor invert is now a persistent config (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/configs/MotorOutputConfigs.html#Inverted>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1configs_1_1_motor_output_configs.html#a951ba4e8badf1e0a49a99f0d6f753f0c>`__) instead of a control signal.

.. warning:: Since invert is a persistent config, getting and setting motor inverts are now blocking API calls. We recommend that users only set the invert once at program startup.

Neutral Mode
------------

In Phoenix 6, Neutral mode is now available in API as a config (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/configs/MotorOutputConfigs.html#NeutralMode>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1configs_1_1_motor_output_configs.html#a3beb831d87012f7876b96ddc96653aa3>`__). Many control requests also have the ability to override the neutral mode to either force braking (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/controls/DutyCycleOut.html#OverrideBrakeDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html#a30794c201047ddb51d448e0d8da65293>`__) or force coasting (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/controls/TorqueCurrentFOC.html#OverrideCoastDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1controls_1_1_torque_current_f_o_c.html#a5ce85ec2c717b66273ccb51db30ab0b7>`__).

Nominal Output
--------------

The Talon FX forward and reverse Nominal Output configs have been removed in Phoenix 6.

The typical use case of the nominal output configs is to overcome friction in closed-loop control modes, which can now be achieved using the ``kS`` feedforward parameter (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/configs/Slot0Configs.html#kS>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1configs_1_1_slot0_configs.html#a00d6ee0ad9827e7ab3ac086c4093c5b5>`__).

Sensor Phase
------------

The Talon FX ``setSensorPhase()`` method has been removed in Phoenix 6.

- The Talon FX integrated sensor is always in phase, so the method does nothing in Phoenix 5.

- When using a remote sensor, you can invert the remote sensor to bring it in phase with the Talon FX.

Sensor Initialization Strategy
------------------------------

The Talon FX and CANcoder sensors are always initialized to their absolute position in Phoenix 6.

Clear Position on Limit
-----------------------

In Phoenix 5, users could configure the TalonFX to clear its sensor position (i.e. set to 0) when a limit switch is triggered. In Phoenix 6, this feature has been improved to allow users to specify the applied sensor position when a limit switch is triggered. This can be configured using the ``*LimitAutosetPositionValue`` configs (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/configs/HardwareLimitSwitchConfigs.html#ForwardLimitAutosetPositionValue>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1configs_1_1_hardware_limit_switch_configs.html#a33f21915d1147448ea89cb96829476a1>`__).

Velocity Measurement Period/Window
----------------------------------

In Phoenix 6, the velocity rolling average window in Talon FX and CANcoder has been replaced with a Kalman filter, resulting in a less noisy velocity signal with a minimal impact on latency (~1 ms). As a result, the velocity measurement period/window configs are no longer necessary in Phoenix 6 and have been removed.

Integral Zone and Max Integral Accumulator
------------------------------------------

Phoenix 6 automatically prevents integral windup in closed-loop controls. As a result, the Integral Zone and Max Integral Accumulator configs are no longer necessary and have been removed.

CANcoder Sensor Coefficient and Units
-------------------------------------

In Phoenix 6, CANcoder does not support setting a custom sensor coefficient, unit string, and sensor time base. Instead, the CANcoder uses canonical units of rotations and rotations per second using the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__.

Features to Be Implemented
--------------------------

The following Phoenix 5 features are not implemented in the current release of Phoenix 6 but are planned to be implemented in the future.

.. list-table::
   :header-rows: 1

   * - Feature
     - Status

   * - CANdle Support
     - Normal priority

Features Omitted
----------------

The following Phoenix 5 features have been omitted from Phoenix 6. While there are no plans for these features to be added, if there is customer demand for these features, they may be considered for addition in the future.

Feedback is welcome at feedback@ctr-electronics.com.

- Motion Profile Executor

  - Control requests have been improved to cover many of the use cases of the Motion Profile Executor.

- Allowable Closed-Loop Error
