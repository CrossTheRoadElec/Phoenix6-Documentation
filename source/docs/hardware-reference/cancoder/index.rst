CANcoder
========

.. important:: As of late August 2022, there are multiple hardware versions of CANcoder available. This is due to the ongoing worldwide chip shortage causing CTR Electronics to replace the original processor with a substitute. This new version of CANcoder requires a different firmware, but is otherwise functionally identical to the original. Details on checking the version can be found in the :ref:`device details section <docs/tuner/device-details-page:verifying device details>`.

The CANcoder is the next evolution in the line of CTRE magnetic encoder products. As its name implies, this product is a rotary magnetic encoder that communicates over the CAN bus. Supporting CAN FD and CAN 2.0, this product provides the same position and velocity with the same resolutions you've come to expect from the SRX Magnetic Encoder.

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/cancoder/
      :link-type: url

      CAD, Firmware and purchase instructions.

   .. grid-item-card:: Hardware User Manual
      :link: https://store.ctr-electronics.com/content/user-manual/CANCoder%20User's%20Guide.pdf
      :link-type: url

      Wiring and mount instructions in PDF format.

Status Light Reference
----------------------

.. note:: Users wishing to test magnet placement must wait 8 seconds after boot for the LEDs to blink the magnet placement status.

+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| LED Color           | Led Brightness  | CAN bus Detection                  | Magnet Field Strength  | Description                                                                                                                                                                                                                 |
+=====================+=================+====================================+========================+=============================================================================================================================================================================================================================+
| Off                 | -               | -                                  | -                      | CANcoder is not powered/plugged in. Check power cabling to the CANcoder.                                                                                                                                                    |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Yellow/Green        | Bright          | -                                  | -                      | Device is in boot-loader, most likely because firmware upgrading has failed. Inspect CAN bus wiring and retry firmware upgrading. If device has valid firmware, turn device off, wait 10 seconds, and turn device back on.  |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Slow Red Blink      | Bright          | CAN bus has been lost.             | -                      | Check CAN bus health and connection to the CANcoder.                                                                                                                                                                        |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Red/Green           | Bright          | -                                  | -                      | Device is not licensed. Please license device in Phoenix Tuner.                                                                                                                                                             |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                     |                 |                                    |                        |                                                                                                                                                                                                                             |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Red Blink     | Dim             | CAN bus never detected since boot  | <25mT or >135mT        | Magnet is out of range                                                                                                                                                                                                      |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Yellow Blink  | Dim             | CAN bus never detected since boot  | 25-45mT or 75-136mT    | Magnet in range with slightly reduced accuracy                                                                                                                                                                              |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Green Blink   | Dim             | CAN bus never detected since boot  | Magnet in range        | Magnet in range                                                                                                                                                                                                             |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|                     |                 |                                    |                        |                                                                                                                                                                                                                             |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Red Blink     | Bright          | CAN bus present                    | <25mT or >135mT        | Magnet is out of range                                                                                                                                                                                                      |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Yellow Blink  | Bright          | CAN bus present                    | 25-45mT or 75-136mT    | Magnet in range with slightly reduced accuracy                                                                                                                                                                              |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Rapid Green Blink   | Bright          | CAN bus present                    | Magnet in range        | Magnet in range                                                                                                                                                                                                             |
+---------------------+-----------------+------------------------------------+------------------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Magnet Placement
----------------

Using the `CANcoder User's Guide <https://store.ctr-electronics.com/content/user-manual/CANCoder%20User's%20Guide.pdf>`__, verify that magnet placement is correct for the CANcoder.

Verifying Sensor Direction
--------------------------

CANcoder sensor direction can be configured via the :guilabel:`Config` page in Phoenix Tuner X.

.. image:: images/verifying-sensor-direction.png
   :width: 70%
   :alt: Verifying sensor direction toggle in Phoenix Tuner X

Zeroing the CANcoder
--------------------

The zero offset for the CANcoder absolute position can be configured using the Magnet Offset config.

Additionally, CANcoders can be zeroed in Tuner X by pressing on the button shown below. This sets the Magnet Offset config and reports the applied offset to the user.

.. important:: The Tuner X CANcoder zeroing button requires 2024 diagnostics or newer.

.. image:: images/tunerx-zero-cancoder.png
   :alt: Picture with an arrow pointing at the zero cancoder icon
   :width: 50%
