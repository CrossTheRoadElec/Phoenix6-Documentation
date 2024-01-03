Extracting Signal Logs
======================

.. tip:: Information on how to use the signal logger API can be found in the :ref:`corresponding API article <docs/api-reference/api-usage/signal-logging:signal logging>`. Tuner offers in-app functionality to retrieve, manage, and convert ``hoot`` logs to compatible formats.

.. image:: images/log-extractor-overview.png
   :width: 550
   :alt: Picture highlighting the hoot page in Tuner X

Logs can be retrieved utilizing the file explorer on the left of the application. The file explorer offers the functionality to download and delete logs on a remote target.

On the right side, in the :guilabel:`Convert` tab is where ``hoot`` logs can be imported and converted to available formats.

Once a log has been downloaded, it is automatically placed in the conversion queue to the right. Logs can also be manually imported or removed utilizing the two buttons at the top-right of the conversion queue.

.. image:: images/log-extractor-conversion-queue.png
   :width: 550
   :alt: Picture highlighting the conversion queue in Tuner X, and the import or remove all buttons

Users may want to perform a :guilabel:`Deep Scan` of the log if they believe it should contain pro-licensed devices. By default, Tuner will only scan the first couple of bytes of the log for pro-licensed devices, allowing export into locked formats.

Filtering for Signals
---------------------

Since signal filters can contain a massive amount of data, users may want to trim the exported log file. Tuner supports simple search and regex filtering of signals in a ``hoot``. Filters are configured on a per-log basis.

In the below picture, regex is used to select only the ``MotorVoltage``, ``Position``, and ``Velocity`` signals for ``TalonFX-11``.

.. image:: images/log-extractor-signal-filters.png
   :width: 550
   :alt: Picture highlighting the signal filters section of the log convert tab

Free Signals
------------

The following signals are available for free using the :guilabel:`AdvantageScope (wpilog)` option. Any log that contains a :doc:`pro-licensed </docs/licensing/licensing>` device will export with all signals. All :ref:`custom signals <docs/api-reference/api-usage/signal-logging:writing custom data>` will be exported regardless of license state.

.. dropdown:: Click here to view free signals

   **Common Signals:**

   - Version_Major
   - Version_Minor
   - Version_Bugfix
   - Version_Build
   - Version_IsProLicensed
   - UnlicensedFeatureInUse
   - BootDuringEnable

   **TalonFX:**

   - SupplyVoltage
   - SupplyCurrent
   - MotorVoltage
   - Position
   - Velocity
   - DeviceEnable
   - DeviceTemp
   - ProcTemp

   **CANcoder:**

   - SupplyVoltage
   - Position
   - Velocity

   **Pigeon 2.0:**

   - SupplyVoltage
   - Yaw
   - AngularVelocityZWorld

Converting
----------

Once any filters have been selected, simply click the :guilabel:`Convert` button to begin the conversion process. This may take some time depending on the output format and the size of the hoot file.

.. image:: images/log-extractor-convert-button.png
   :width: 550
   :alt: Picture of bottom bar of convert tab in Tuner

Common Issues
-------------

Problem: When converting, I get ``hoot log API version too old, cannot export its signals``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Solution:** This may happen if your hoot file was generated using an old version of Phoenix. Update your Phoenix installation (by updating your vendordep in :doc:`/docs/installation/installation`) and recreate your log file. If the log file recorded is critical, reach out to `support@ctr-electronics.com <mailto:support@ctr-electronics>`__.

Problem: When converting, I get ``Could not read to end of input file``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Solution:** This occurs when the converter encounters bad data. This typically occurs when the robot is turned off in the middle of writing to the log. Users can usually safely ignore this error message, and their converted log will be written as normal.
