TalonFX
=======

.. tab-set::

   .. tab-item:: Kraken X60

      The Kraken X60 powered by Talon FX is a brushless motor developed by `WestCoast Products <https://wcproducts.com/products/kraken>`__ that uses the latest BLDC motor control technology from CTR Electronics. The integrated Talon FX unlocks the full performance of the Kraken X60 BLDC motor while providing best-in-class motion control.

      .. grid:: 2

         .. grid-item-card:: Store Page
            :link: https://store.ctr-electronics.com/kraken-x60/
            :link-type: url

            CAD, Firmware and purchase instructions.

         .. grid-item-card:: Hardware User Manual
            :link: https://docs.wcproducts.com/kraken-x60/kraken-x60-motor/overview-and-features
            :link-type: url

            Wiring and mount instructions available on the WestCoast Products documentation site.

   .. tab-item:: Falcon 500

      The Falcon 500 powered by Talon FX is a brushless motor with an integrated motor controller and high-resolution encoder, custom designed specifically for the FIRST Robotics Competition, through a collaboration between Cross the Road Electronics and `VEX Robotics <https://www.vexrobotics.com/217-6515.html>`__.

      .. grid:: 2

         .. grid-item-card:: Store Page
            :link: https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/
            :link-type: url

            CAD, Firmware and purchase instructions.

         .. grid-item-card:: Hardware User Manual
            :link: https://store.ctr-electronics.com/content/user-manual/Falcon%20500%20User%20Guide.pdf
            :link-type: url

            Wiring and mount instructions in PDF format.

Actuator Limits
---------------

CTR Electronics actuators, such as the TalonFX, support various kinds of hardware and software limits.

.. note:: The TalonFX + Kraken X60 does not support hardware limit switches. Instead, :ref:`control request limit <docs/api-reference/api-usage/actuator-limits:control request limits>` overrides can be used, or a CANcoder can be used a :ref:`remote limit switch <docs/api-reference/api-usage/actuator-limits:remote limit switches>`.

Documentation on retrieving and configuring limits can be found :doc:`here </docs/api-reference/api-usage/actuator-limits>`.

Limit Switches
^^^^^^^^^^^^^^

CTR Electronics supported actuators have limit features that will automatically neutral the actuator output (set voltage to 0) if a limit switch is activated. By default, limits are set to "normally open". This means that the switch needs to be explicitly closed (or grounded) for the actuator output to be set to neutral.

When the limit switch is closed (connected to ground), the actuator will disable and the pattern will move toward the forward/reverse limit pin (red blink pattern will move toward the forward limit pin when the forward limit is closed, and vice-versa).

.. tip:: For more information on limit switch wiring in the Falcon 500, consult the `Falcon 500 User's Guide <https://store.ctr-electronics.com/content/user-manual/Falcon%20500%20User%20Guide.pdf>`__.

Status Light Reference
----------------------

.. image:: images/talonfx-status-led-location.png
   :width: 60%
   :alt: Status LEDs located in central part of the motor

+-------------------------+----------------------------------------------------------------------------------------------------------+
| LED State               | Description                                                                                              |
+=========================+==========================================================================================================+
| Alternating Off/Orange  | Talon FX is disabled. Robot controller is missing on the bus or the diagnostic server is not installed.  |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Simultaneous Off/Orange | Talon FX is disabled. Phoenix is running in Robot Controller.                                            |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Alternating Red/Green   | Talon FX is not licensed. Please license device in Phoenix Tuner.                                        |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Off/Slow Red            | CAN/PWM is not detected.                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Red/Orange              | Damaged Hardware                                                                                         |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Off/Red                 | Limit Switch or Soft Limit triggered.                                                                    |
+-------------------------+----------------------------------------------------------------------------------------------------------+
| Green/Orange            | Device is in bootloader.                                                                                 |
+-------------------------+----------------------------------------------------------------------------------------------------------+
