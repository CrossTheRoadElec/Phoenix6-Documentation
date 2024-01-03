Signal Logging
==============

.. note:: Information on how to retrieve and convert ``hoots`` to compatible formats can be found in :doc:`/docs/tuner/tools/log-extractor`.

Signal Logging allows the user to capture all signals as received through compatible Phoenix 6 devices. The signal logging API is available through static functions on the ``SignalLogger`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.htm>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger>`__) class.

Signal logging is **enabled by default** whenever it detects an FRC match is currently being played. Users can disable this behavior with ``SignalLogger.enableAutoLogging(false)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#enableAutoLogging(boolean)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#ae9261bb623fbc9cb4040fedeedc5c91e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.enable_auto_logging>`__).

Setting Log Path
----------------

The logging directory can be set using ``SignalLogger.setPath()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html#setPath(java.lang.String)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html#a5178de40e2d9e4d49d646f8d5f54d0f7>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html#phoenix6.signal_logger.SignalLogger.set_path>`__).

If the specified directory does not exist, ``SignalLogger.setPath()`` will return an error code. Setting the path during log operation will restart the log.

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

Low Storage Space behavior
^^^^^^^^^^^^^^^^^^^^^^^^^^

