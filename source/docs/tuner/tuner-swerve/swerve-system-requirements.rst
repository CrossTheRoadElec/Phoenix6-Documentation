Swerve Requirements
===================

The swerve project creator and :doc:`swerve API </docs/tuner/tuner-swerve/index>` have several limitations. These limitations are in-place to improve maintainability and debugging.

* Only Phoenix 6 supported hardware (e.g. TalonFX, CANcoder, Pigeon 2.0).

  * 8 TalonFX (4 steer, 4 drive)
  * 4 CANcoder (4 steer)
  * 1 Pigeon 2.0

* Requires Phoenix 6 software released for year 2024 or newer.

  * Firmware version should begin with 24.X
  * Ensure Tuner shows server version as "2024" or newer

* Temporary diagnostic server (or an existing 2024 robot project) must be running and Tuner should be connected to the robot.

  * This allows the generator to perform it's setup and auto-calibration routines

Some of these requirements are inforced via a mechanism called "precheck". You can see and refresh the precheck status by clicking the :guilabel:`Refresh` button in the top right.

.. image:: images/swerve-precheck.png
   :alt: Box surrounding the pre-check section of the swerve creation wizard

.. note:: While the Swerve API and project generator can be utilized without Pro or FD, both of these enhance robot control. When utilizing Pro & FD, sensor data is acquired synchronously. :ref:`FusedCANcoder <docs/migration/new-to-phoenix:fused cancoder>` improves the accuracy of module positions.

Requirement Checklist
---------------------

Users can utilize the below checklist to ensure their robot is ready for project generation.

.. list-table::
   :align: left
   :header-rows: 1
   :width: 100%
   :widths: 75 20

   * - Requirement
     - Done?
   * - **REQUIRED:** Is there the minimum number of devices?

       (8 TalonFX, 4 CANcoder, 1 Pigeon 2.0)
     - .. raw:: html

           <input type="checkbox"/>
   * - **REQUIRED:** Do all devices appear in Tuner?
     - .. raw:: html

          <input type="checkbox"/>
   * - **REQUIRED:** Is all firmware up-to-date? (24.X)
     - .. raw:: html

          <input type="checkbox"/>
   * - **REQUIRED:** Is 2024 (or newer) diagnostics running?
     - .. raw:: html

          <input type="checkbox"/>
   * - **RECOMMENDED:** Have devices been renamed?

       (e.g. "TalonFX ID 1 -> FL Steer Motor")

     - .. raw:: html

          <input type="checkbox"/>

   * - **RECOMMENDED:** Have devices been renamed?

       (e.g. "TalonFX ID 1 -> FL Steer Motor")

     - .. raw:: html

          <input type="checkbox"/>

Once the user has reviewed the requirements, continue to :doc:`/docs/tuner/tuner-swerve/creating-your-project` to get started.
