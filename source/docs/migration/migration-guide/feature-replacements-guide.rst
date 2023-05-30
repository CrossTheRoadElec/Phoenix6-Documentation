Feature Replacements
====================

In addition to the changes shown in the other sections, several other Phoenix 5 features have been replaced or improved upon in Phoenix 6.

Motor Invert
------------

In Phoenix 6, motor invert is now a persistent config (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/MotorOutputConfigs.html#Inverted>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_motor_output_configs.html#a951ba4e8badf1e0a49a99f0d6f753f0c>`__) instead of a control signal.

.. warning:: Since invert is a persistent config, getting and setting motor inverts are now blocking API calls. We recommend that users only set the invert once at program startup.

Neutral Mode
------------

In Phoenix 6, Neutral mode is now available in API as a config (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/MotorOutputConfigs.html#NeutralMode>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_motor_output_configs.html#a3beb831d87012f7876b96ddc96653aa3>`__). Many control requests also have the ability to override the neutral mode to either force braking (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/controls/DutyCycleOut.html#OverrideBrakeDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html#a30794c201047ddb51d448e0d8da65293>`__) or force coasting (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/controls/TorqueCurrentFOC.html#OverrideCoastDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1controls_1_1_torque_current_f_o_c.html#a5ce85ec2c717b66273ccb51db30ab0b7>`__).

Nominal Output
--------------

The Talon FX forward and reverse Nominal Output configs have been removed in Phoenix 6.

The typical use case of the nominal output configs is to overcome friction in closed-loop control modes, which can now be achieved using the ``kS`` feedforward parameter (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/Slot0Configs.html#kS>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_slot0_configs.html#af9aff78b5fafed0bf20c096b11718d80>`__).

Sensor Phase
------------

The Talon FX ``setSensorPhase()`` method has been removed in Phoenix 6.

- The Talon FX integrated sensor is always in phase, so the method does nothing in Phoenix 5.

- When using a remote sensor, you can invert the remote sensor to bring it in phase with the Talon FX.

Sensor Initialization Strategy
------------------------------

The Talon FX and CANcoder sensors are always initialized to their absolute position in Phoenix 6.

Velocity Measurement Period/Window
----------------------------------

In Phoenix 6, the velocity rolling average window in Talon FX and CANcoder has been replaced with a Kalman filter, resulting in a less noisy velocity signal with a minimal impact on latency. As a result, the velocity measurement period/window configs are no longer necessary in Phoenix 6 and have been removed.

Integral Zone
-------------

Phoenix 6 automatically prevents integral windup in closed-loop controls. As a result, the Integral Zone config is no longer necessary and has been removed.
