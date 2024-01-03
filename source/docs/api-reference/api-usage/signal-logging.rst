Signal Logging
==============

.. note:: Information on how to retrieve and convert ``hoot`` files to compatible formats can be found in :doc:`/docs/tuner/tools/log-extractor`.

Phoenix 6 comes with a real-time, high-fidelity signal logger. The signal logger captures timestamped data for all status signals as they are received at their configured update frequency. This can be useful for any form of post analysis, including diagnosing issues after a match or using `WPILib SysID <https://docs.wpilib.org/en/stable/docs/software/pathplanning/system-identification/introduction.html>`__.

The signal logging API is available through static functions in the ``SignalLogger`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger>`__) class. Signal logging is **enabled by default** whenever it detects an FRC match is currently being played. Users can disable this behavior with ``SignalLogger.enableAutoLogging(false)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#enableAutoLogging(boolean)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#ae9261bb623fbc9cb4040fedeedc5c91e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.enable_auto_logging>`__).

Setting Log Path
----------------

The logging directory can optionally be changed using ``SignalLogger.setPath()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#setPath(java.lang.String)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#a5178de40e2d9e4d49d646f8d5f54d0f7>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.set_path>`__). If the specified directory does not exist, ``SignalLogger.setPath()`` will return an error code. Setting the path while logging will restart the log.

The below example sets the logging path to a ``ctre-logs`` folder on the first USB drive found.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         SignalLogger.setPath("/media/sda1/ctre-logs/");

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         SignalLogger::SetPath("/media/sda1/ctre-logs/");

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         SignalLogger.set_path("/media/sda1/ctre-logs/")

Start/Stop Logging
------------------

The signal logger can be started and stopped using the ``Start/Stop`` functions.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         SignalLogger.start();
         SignalLogger.stop();

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         SignalLogger::Start();
         SignalLogger::Stop();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         SignalLogger.start()
         SignalLogger.stop()

Free Signals
------------

Any log that contains a :doc:`pro-licensed </docs/licensing/licensing>` device will export all signals. Otherwise, the following status signals and all :ref:`custom signals <docs/api-reference/api-usage/signal-logging:writing custom data>` can be exported for free.

.. dropdown:: Click here to view free signals

   **Common Signals:**

   - VersionMajor
   - VersionMinor
   - VersionBugfix
   - VersionBuild
   - IsProLicensed
   - Fault_UnlicensedFeatureInUse
   - Fault_BootDuringEnable

   **TalonFX:**

   - SupplyVoltage
   - SupplyCurrent
   - MotorVoltage
   - Position
   - Velocity
   - DeviceEnable
   - Fault_DeviceTemp
   - Fault_ProcTemp

   **CANcoder:**

   - SupplyVoltage
   - Position
   - Velocity

   **Pigeon 2.0:**

   - SupplyVoltage
   - Yaw
   - AngularVelocityZWorld

Writing Custom Data
-------------------

Users can write custom data to the currently opened logs by utilizing the ``write*()`` functions. An example application of this is logging your swerve odometry data.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         SignalLogger.writeDoubleArray("odometry", new double[] {pose.getX(), pose.getY(), pose.getRotation().getDegrees()});
         SignalLogger.writeDouble("odom period", state.OdometryPeriod, "seconds");

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         SignalLogger::WriteDoubleArray("odometry", std::array<double, 3>{pose.X().value(), pose.Y().value(), pose.Rotation().Degrees().value()});
         SignalLogger::WriteDouble("odom period", state.OdometryPeriod, "seconds");

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         SignalLogger.write_double_array("odometry", [pose.X(), pose.Y(), pose.rotation().degrees()])
         SignalLogger.write_double("odom period", state.odometry_period, "seconds")

Low Storage Space Behavior
--------------------------

If the target drive (i.e. flash drive or roboRIO internal storage) reaches 50 MB free space, old logs will be deleted and an error will be printed.

If the target drive reaches 5 MB of free space, logging will be stopped and an error printed. Logging can not be resumed until more space is made available.

An example error that may occur if the free space limit is reached is shown below.

.. code-block:: text

   [phoenix] Signal Logger: Available disk space (3 MB) below 5 MB, stopping log
