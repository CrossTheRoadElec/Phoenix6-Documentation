Feature Replacements
====================

Several Phoenix 5 features have been replaced or improved upon in Phoenix Pro.

Motion Magic S-Curve
--------------------

The Motion Magic S-Curve Strength has been replaced with the ability to set the target jerk (acceleration derivative) of the profile (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/MotionMagicConfigs.html#MotionMagicJerk>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_motion_magic_configs.html#a5b7a8aa5146588639168506802abd61a>`__).

Motor Invert
------------

In Phoenix Pro, motor invert is now a persistent config (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/MotorOutputConfigs.html#Inverted>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_motor_output_configs.html#a2816a895ab62ec5c4411dc2a1606e3de>`__) instead of a control parameter.

Neutral Mode
------------

In Phoenix Pro, Neutral mode is now available in API as a config (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/MotorOutputConfigs.html#NeutralMode>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_motor_output_configs.html#af908bb8c312a55149f054ec95405c3e0>`__). Many control requests also have the ability to override the neutral mode to either force braking (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/DutyCycleOut.html#OverrideBrakeDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1controls_1_1_duty_cycle_out.html#a7aee78ef5456c909c6ada62f7378c90b>`__) or force coasting (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/TorqueCurrentFOC.html#OverrideCoastDurNeutral>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1controls_1_1_torque_current_f_o_c.html>`__).

Nominal Output
--------------

The Talon FX forward and reverse Nominal Output configs have been removed in Phoenix Pro.

The typical use case of the nominal output configs is to overcome friction in closed-loop control modes, which can now be achieved using the ``kS`` feedforward parameter (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/configs/Slot0Configs.html#kS>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1configs_1_1_slot0_configs.html#adfb56621e174939d621c93de80d433b7>`__).

Sensor Phase
------------

The Talon FX ``setSensorPhase()`` method has been removed in Phoenix Pro.

- The Talon FX integrated sensor is always in phase, so the method does nothing in Phoenix 5.

- When using a remote sensor, you can invert the remote sensor to bring it in phase with the Talon FX.

Sensor Initialization Strategy
------------------------------

The Talon FX and CANcoder sensors are always initialized to the absolute position in Phoenix Pro.

Velocity Measurement Period/Window
----------------------------------

In Phoenix Pro, the velocity rolling average window in Talon FX and CANcoder has been replaced with a Kalman filter to produce velocity measurements, resulting in a less noisy signal with a minimal impact on latency. As a result, the velocity measurement period/window configs are no longer necessary in Phoenix Pro and have been removed.
