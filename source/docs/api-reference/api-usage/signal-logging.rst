Signal Logging
==============

.. note:: Information on how to retrieve and convert ``hoot`` files to compatible formats can be found in :doc:`/docs/tuner/tools/log-extractor`.

Phoenix 6 comes with a real-time, high-fidelity signal logger. This can be useful for any form of post analysis, including diagnosing issues after a match or using `WPILib SysID <https://docs.wpilib.org/en/stable/docs/software/pathplanning/system-identification/introduction.html>`__.

The Phoenix 6 signal logger provides the following advantages over alternatives:

- **All status signals** are captured **automatically** with their **timestamps from CAN**.
- Status signals are captured **as they arrive** at their configured update frequency.
- Logging is **not affected** by the timing of the main robot loop or Java GC, significantly improving the sensitivity and accuracy of system identification.
- Signal logging is **started automatically** during an **FRC match** by default.
- **Custom user signals** can be logged alongside the automatically captured status signals on the **same timebase**.
- The **highly efficient** ``hoot`` file format minimizes the **size** of the log files and the **CPU usage** of the logger.

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

.. note:: Each CAN bus gets its own dedicated log file.

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

Writing Custom Signals
----------------------

Users can write custom signals to the currently opened logs by utilizing the ``write*()`` functions. An example application of this is logging your swerve odometry data.

The integer and floating-point ``write*()`` functions can optionally be supplied a units string to log alongside the data. Additionally, all ``write*()`` functions support an optional latency parameter that is subtracted from the current time to get the latency-adjusted timestamp of the signal. This can be useful for logging high-latency data, such as vision measurements.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // Log the odometry pose as a double array
         SignalLogger.writeDoubleArray("odometry", new double[] {pose.getX(), pose.getY(), pose.getRotation().getDegrees()});
         // Log the odometry period with units of "seconds"
         SignalLogger.writeDouble("odom period", state.OdometryPeriod, "seconds");
         // Log the camera pose with calculated latency
         SignalLogger.writeDoubleArray("camera pose", new double[] {camPose.getX(), camPose.getY(), camPose.getRotation().getDegrees()},
            "", Timer.getFPGATimestamp() - camRes.getTimestampSeconds());

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // Log the odometry pose as a double array
         SignalLogger::WriteDoubleArray("odometry", std::array<double, 3>{pose.X().value(), pose.Y().value(), pose.Rotation().Degrees().value()});
         // Log the odometry period with units of "seconds"
         SignalLogger::WriteDouble("odom period", state.OdometryPeriod, "seconds");
         // Log the camera pose with calculated latency
         SignalLogger::WriteDoubleArray("camera pose", std::array<double, 3>{camPose.X().value(), camPose.Y().value(), camPose.Rotation().Degrees().value()},
            "", frc::Timer::GetFPGATimestamp() - camRes.GetTimestamp());

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Log the odometry pose as a double array
         SignalLogger.write_double_array("odometry", [pose.X(), pose.Y(), pose.rotation().degrees()])
         # Log the odometry period with units of "seconds"
         SignalLogger.write_double("odom period", state.odometry_period, "seconds")
         # Log the camera pose with calculated latency
         SignalLogger.write_double_array("camera pose", [cam_pose.X(), cam_pose.Y(), cam_pose.rotation().degrees()],
            "", wpilib.Timer.getFPGATimestamp() - cam_res.getTimestamp())

Free Signals
------------

Any log that contains a :doc:`pro-licensed </docs/licensing/licensing>` device will export all signals. Otherwise, the following status signals and all custom signals can be exported for free.

.. dropdown:: Click here to view free signals

   **Common Signals**

   - VersionMajor
   - VersionMinor
   - VersionBugfix
   - VersionBuild
   - IsProLicensed
   - SupplyVoltage
   - Fault_UnlicensedFeatureInUse
   - Fault_BootDuringEnable
   - Fault_Hardware
   - Fault_Undervoltage

   .. tab-set::

      .. tab-item:: Talon FX

         - SupplyCurrent
         - StatorCurrent
         - MotorVoltage
         - Position
         - Velocity
         - DeviceEnable
         - Fault_DeviceTemp
         - Fault_ProcTemp

      .. tab-item:: Talon FXS

         - SupplyCurrent
         - StatorCurrent
         - MotorVoltage
         - Position
         - Velocity
         - DeviceEnable
         - ConnectedMotor
         - Fault_DeviceTemp
         - Fault_ProcTemp
         - Fault_HallSensorMissing
         - Fault_DriveDisabledHallSensor
         - Fault_MotorTempSensorMissing

      .. tab-item:: CANcoder

         - Position
         - Velocity

      .. tab-item:: Pigeon 2.0

         - Yaw
         - AngularVelocityZWorld

      .. tab-item:: CANrange

         - DistanceMeters
         - ProximityDetected
         - SignalStrength

      .. tab-item:: CANdi

         - Pin1State
         - Pin2State
         - S1Closed
         - S2Closed
         - QuadPosition
         - QuadVelocity
         - Pwm1_Position
         - Pwm1_Velocity
         - Pwm2_Position
         - Pwm2_Velocity
         - Overcurrent

Low Storage Space Behavior
--------------------------

If the target drive (i.e. flash drive or roboRIO internal storage) reaches 50 MB free space, old logs will be deleted, and a warning will be printed.

If the target drive reaches 5 MB of free space, logging will be stopped, and an error will be printed. Logging cannot be resumed until more disk space is made available.

An example error that may occur if the free space limit is reached is shown below.

.. code-block:: text

   [phoenix] Signal Logger: Available disk space (3 MB) below 5 MB, stopping log

Converting Signal Logs
----------------------

Signal logs can be converted to other common file formats such as WPILOG or MCAP using the :doc:`Tuner X Log Extractor </docs/tuner/tools/log-extractor>`.

Additionally, the ``owlet`` CLI tool can be used from a terminal, including on platforms not supported by Tuner X. ``owlet`` can be downloaded from the `CLI Tools download page <https://docs.ctr-electronics.com/cli-tools>`__.

To view a list of available commands, run ``owlet`` either with no parameters or with ``--help``.

.. image:: images/owlet-cli.png
   :width: 70%
   :alt: Running the owlet CLI help message

As an example, to convert a ``hoot`` file to WPILOG, run:

.. code-block:: bash

   ./owlet -f wpilog input.hoot output.wpilog
