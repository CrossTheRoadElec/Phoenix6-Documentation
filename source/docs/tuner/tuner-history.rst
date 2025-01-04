Tuner History
==============

Tuner history provides insight on past connected devices and robot networks. **Device History** allows teams to view previously connected devices and license them without being directly connected to them. Users may wish to license previously connected devices due to a lack of internet connection while being connected to them. **Network History** indicates a list of past connected robot networks.

Users can access a list of past devices connected to Tuner X and license them via the :guilabel:`Device History` page. This is accessible from the left-hand sidebar. This list is not automatically refreshed, but users can refresh it by pressing the refresh icon in the top-right of the page.

.. image:: images/device-history-root.png
   :width: 600
   :alt: Device History robot

Licensing from Device History
-----------------------------

Users can activate a license for a disconnected device by clicking on the device in the Grid. Then, select the "PRO" icon at the bottom right of the device card.

.. image:: images/device-history-pro-location.png
   :width: 600
   :alt:

From there, the user can activate a license for the device like normal. Once the device license has been activated, the user still needs to connect Tuner X to the robot to transfer the activated license to the device.

The "PRO" icon may be replaced with a greyed "LIC" icon in the following situations:

- The device is on Phoenix 5 firmware and actively connected to Tuner X
- The device is not a Phoenix 6 compatible device

Users who license an eligible Phoenix 6 device running Phoenix 5 firmware must :ref:`update the device firmware <docs/tuner/device-details-page:field-upgrade firmware version>` to v6 compatible firmware to utilize licensed features.
