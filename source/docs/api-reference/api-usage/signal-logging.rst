Signal Logging
==============

.. note:: Information on how to retrieve and convert ``hoots`` to compatible formats can be found in :doc:`/docs/tuner/tools/log-extractor`.

Signal Logging allows the user to capture all signals as received through compatible Phoenix 6 devices. The signal logging API is available through static functions on the ``SignalLogger`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger>`__) class.

Signal logging is **enabled by default** whenever it detects an FRC match is currently being played. Users can disable this behavior with ``SignalLogger.enableAutoLogging(false)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#enableAutoLogging(boolean)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#ae9261bb623fbc9cb4040fedeedc5c91e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.enable_auto_logging>`__).

Setting Log Path
----------------

On the roboRIO, logs are written to the first flash drive connected at ``/u/logs``. If no flash drive is detected, logs are written to ``/home/lvuser/logs``.

The logging directory can be set using ``SignalLogger.setPath()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#setPath(java.lang.String)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#a5178de40e2d9e4d49d646f8d5f54d0f7>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.set_path>`__). If the specified directory does not exist, ``SignalLogger.setPath()`` will return an error code. Setting the path during log operation will restart the log.

The below example sets the logging path to the first flash drive connected, in a ``logs`` directory.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         SignalLogger.setPath("/media/sda1/logs/");

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         SignalLogger.SetPath("/media/sda1/logs/");

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         SignalLogger.set_path("/media/sda1/logs/")

Start/Stop Logging
------------------

Logging can be started using the ``Start/Stop`` functions.

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

Writing Custom Data
-------------------

Users can write custom data to the currently opened log by utilizing the ``writeX()`` functions. An example application of this is writing the current loop times to the log file. This can be useful for correlating application lag to blocking operations in code.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         var currTime = System.currentTimeMillis();
         var timeDelta = currTime - oldTime;
         SignalLogger.writeDouble("Loop Time", timeDelta);

         // Update field for next delta calculation
         oldTime = currTime;

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         #include <chrono>
         #include <iostream>

         double currTime =
            std::chrono::system_clock::now().time_since_epoch() /
            std::chrono::milliseconds(1);

         double timeDelta = currTime - oldTime;
         SignalLogger::WriteDouble("Loop Time", timeDelta);

         // Update field for next delta calculation
         oldTime = currTime;

   .. tab-item:: Python

      .. code-block:: python

         import time

         curr_time_ms = time.time() * 1000
         time_delta = curr_time_ms - old_time_ms
         SignalLogger.write_double("Loop Time", self.time_delta)

         # Update field for next delta calculation
         old_time_ms = curr_time_ms

Low Storage Space Behavior
--------------------------

If the target drive (I.E. roboRIO or flash drive) reaches 50MB free space, old logs will be deleted and an error will be printed.

If the target drive reaches 5MB of free space, logging will be stopped and an error printed. Logging can not be resumed until space is made available.

An example error that may occur if the free space limit is reached is shown below.

.. code-block:: text

   [phoenix] Signal Logger: Available disk space (3 MB) below 5 MB, stopping log
