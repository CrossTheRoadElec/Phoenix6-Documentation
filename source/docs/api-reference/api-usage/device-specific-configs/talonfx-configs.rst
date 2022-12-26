TalonFX Configs
===============

This article highlights the configs exclusive to the TalonFX and how they are intended to be used.

The TalonFX has the following exclusive config groups:

- Slot 0 Configs

  - Contains configs for closed loop gains. This is the default slot.

- Slot 1 Configs

  - Contains configs for closed loop gains.

- Motor Output

  - Configs related to motor output regardless of control.

- Voltage

  - Configs that impact voltage features.

Slots
-----

The TalonFX can save up to different sets of gains (slots) that can be swapped at runtime by the user.

Motor Output
------------

This config group contains the :guilabel:`Inverted` toggle, which can be used to set whether this motor should be inverted.

Voltage
-------

This config group contains the :guilabel:`Supply Voltage Lowpass Time Constant` config. This config is used for configuring the low-pass voltage filter time window for the **supply voltage**. A high value will increase the size of the filter window (range of data). This has the affect of greater smoothing of voltage at the cost of precision. A lower value will increase precision but result in less smooth voltage data (and increase error). The time constant is in units of milliseconds.
