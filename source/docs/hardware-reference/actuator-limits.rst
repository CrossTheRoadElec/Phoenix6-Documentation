Actuator Limits
===============

Actuators, such as the CTR-Electronics TalonFX, support various kinds of hardware and software limits. These include limit switches (wired and soft) and supply/stator current limits.

Limit Switches
--------------

CTR-Electronics supported actuators (TalonFX) have limit features that will automatically neutral the actuator output (set voltage to 0) if a limit switch is activated. By default, limits are set to "normally open". This means that the switch needs to be explicitly closed (or grounded) for the actuator output to be set to neutral.

When the limit switch is closed (connected to ground), the actuator will disable and blink both LEDs red in the direction of the fault (red blink pattern will move towards the M+/white wire for positive limit fault, and towards M-/green wire for negative limit fault).

Documentation on retrieving the state of a limit switch can be found :ref:`here <docs/api-reference/api-usage/actuator-limits:retrieving limit switch state>`.

.. tip:: For more information on limit switch wiring, consult the `TalonFX User's Guide <https://store.ctr-electronics.com/content/user-manual/Falcon%20500%20User%20Guide.pdf>`__.
