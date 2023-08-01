Device Licensing
================

The following devices are eligible for single-device licensing:

- TalonFX (Falcon 500)
- Pigeon 2
- CANcoder

Additionally, CANivore is supported for licensing. When a CANivore is licensed, all devices on that bus are **Pro** enabled without additional activation.

.. important:: All license activation and verification features are only available in **Phoenix Tuner X**. Phoenix Tuner v1 does not support licensing actions.

Purchasing a License
--------------------

Licenses can be purchased in the licensing section on the CTR Electronics store. Click `here <https://store.ctr-electronics.com/licenses>`__ to purchase a license.

Once a license has been purchased, you will receive an email confirmation confirming your purchase. Once this email is received, the license should be visible in the list of licenses in Tuner X.

Activating a License
--------------------

Licenses are activated by first clicking on the **LIC** icon in the bottom right corner of the device card.

.. image:: images/pro-icon-location.png
   :width: 70%
   :alt: Pro icon is located on the bottom right of the device card

This will open up a screen which displays a list of currently attached licenses for that device. Click on the :guilabel:`Activate a new license` button on the bottom of the popup.

.. image:: images/canivore-license-activation.png
   :width: 70%
   :alt: List of purchased but inactive licenses

A list of purchased (but unattached) license seats are shown here. Click on the license you would like to redeem and press the :guilabel:`Activate Selected License` button to confirm redemption of that seat.

.. warning:: Users should be aware that license activation is permanent and irreversible

Once the activation is complete, the license will be downloaded to the device. In the event that Tuner X disconnects from the internet or from the robot before this completes, the license is still activated and available for download the next time Tuner X is connected to the internet/robot.

Activating a License without a Robot
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Devices that have been seen by Tuner X at least once will be available in :ref:`Device History <docs/tuner/device-history:licensing from device history>`. This can be useful for licensing a device when disconnected from the robot.

Verifying Activation State
--------------------------

An icon displaying the license state of your device is located in the bottom right of the device card.

.. image:: images/licensing-icon.png
   :width: 70%
   :alt: Showing the Pro license icon in the bottom right of the card in Tuner X

The below table can be used to determine your device license state for troubleshooting.

+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| State                | Image                                                               | Description                                                                 |
+======================+=====================================================================+=============================================================================+
| Licensed             | .. image:: images/license_states/pro_licensed_logo_small.png        | Device is licensed for the current version of Phoenix Pro API.              |
|                      |    :width: 40%                                                      |                                                                             |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| CANivore contains    | .. image:: images/license_states/license_logo_small_black.png       | CANivore contains at least one bus license, which it will use to            |
| Licenses             |    :width: 40%                                                      | remote-license all compliant CAN devices.                                   |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| Pro Licensing Error  | .. image:: images/license_states/pro_licensed_logo_small_error.png  | Device is licensed and there was an error communicating license state.      |
|                      |    :width: 40%                                                      |                                                                             |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| Licensing Error      | .. image:: images/license_states/license_logo_small_error.png       | Device is not licensed and there was an error communicating license state.  |
|                      |    :width: 40%                                                      |                                                                             |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| Not Licensed         | .. image:: images/license_states/license_logo_small.png             | Device is not licensed for this version of Phoenix Pro API.                 |
|                      |    :width: 40%                                                      |                                                                             |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+
| Licensing Not        |  Icon not present                                                   | Device does not support licensing or is using an incompatible firmware for  |
| Supported            |                                                                     | device licensing.                                                           |
+----------------------+---------------------------------------------------------------------+-----------------------------------------------------------------------------+

Additionally, users can perform a :ref:`Self Test <docs/tuner/self-test:self test snapshot>` to verify that the device has a valid license.

Troubleshooting
---------------

- Did you activate a license for this device?

  - Clicking on the icon will show licenses that are attached to this device

- Is the latest diagnostic server running?

  - Check the version at the bottom of Tuner X's devices page.

    - Latest version details can be found in the `changelog <https://api.ctr-electronics.com/changelog>`__ under the latest Phoenix-Pro version.

  - Confirm the **vendordep** in your robot project is the latest version.
  - Alternatively, you can deploy the **temporary diagnostic server**.

- Is the latest **Pro** firmware flashed onto the device?
