Status Signals
==============

Signals represent live data reported by a device; these can be yaw, position, etc. To make use of the live data, users need to know the value, timestamp, latency, units, and error condition of the data. Additionally, users may need to synchronize with fresh data to minimize latency.

.. tip:: A :doc:`/docs/api-reference/api-usage/signal-logging` API is available for logging received signals. This can be useful for any form of post analysis, including diagnosing issues after a match or using `WPILib SysID <https://docs.wpilib.org/en/stable/docs/software/pathplanning/system-identification/introduction.html>`__.

``StatusSignal``
----------------

The ``StatusSignal`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/StatusSignal.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_status_signal.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.StatusSignal>`__) is a signal object that provides APIs to address all of the requirements listed above.

The device object provides getters for all available signals. Each getter returns a ``StatusSignal`` that is typed appropriately for the signal.

.. note:: The device getters return a cached ``StatusSignal``. As a result, frequently calling the getter does not influence RAM performance.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var supplyVoltageSignal = m_device.getSupplyVoltage();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& supplyVoltageSignal = m_device.GetSupplyVoltage();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         supply_voltage_signal = self.device.get_supply_voltage()

The value of the signal can be retrieved from the ``StatusSignal`` by calling ``getValue()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var supplyVoltage = supplyVoltageSignal.getValue();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto supplyVoltage = supplyVoltageSignal.GetValue();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         supply_voltage = supply_voltage_signal.value

.. note:: Phoenix 6 utilizes the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ when applicable.

The ``StatusCode`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/StatusCode.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/_status_codes_8h.html#a1edbab973bc8d4d5097a6bcc17c88c19>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.StatusCode>`__) of the signal can be retrieved by calling ``getStatus()``. This can be used to determine if the device is not present on the CAN bus.

.. note:: If a status signal is not available on the CAN bus, an error will be reported to the Driver Station.

Refreshing the Signal Value
---------------------------

The device ``StatusSignal`` getters implicitly refresh the cached signal values. However, if the user application caches the ``StatusSignal`` object, the ``refresh()`` method must be called to fetch fresh data. Multiple signals can be refreshed in one call using ``BaseStatusSignal.refreshAll()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/BaseStatusSignal.html#refreshAll(com.ctre.phoenix6.BaseStatusSignal...)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_base_status_signal.html#a3fda545562d4d373238c21f674133bba>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.BaseStatusSignal>`__).

.. tip:: The ``refresh()`` method can be method-chained. As a result, you can call ``refresh()`` and ``getValue()`` on one line.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // refresh the supply voltage signal
         supplyVoltageSignal.refresh();
         // refresh the position and velocity signals
         BaseStatusSignal.refreshAll(positionSignal, velocitySignal);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // refresh the supply voltage signal
         supplyVoltageSignal.Refresh();
         // refresh the position and velocity signals
         BaseStatusSignal::RefreshAll(positionSignal, velocitySignal);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # refresh the supply voltage signal
         supply_voltage_signal.refresh()
         # refresh the position and velocity signals
         BaseStatusSignal.refresh_all(position_signal, velocity_signal)

Waiting for Signal Updates
--------------------------

Instead of using the latest value, the user can instead opt to synchronously wait for a signal update. ``StatusSignal`` provides a ``waitForUpdate(timeoutSec)`` method that will block the current robot loop until the signal is retrieved or the timeout has been exceeded. This replaces the need to call ``refresh()`` on cached ``StatusSignal`` objects.

.. tip:: If you want to zero your sensors, you can use this API to ensure the set operation has completed before continuing program flow.

.. tip:: The ``waitForUpdate()`` method can be method-chained. As a result, you can call ``waitForUpdate()`` and ``getValue()`` on one line.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // wait up to 1 robot loop iteration (20ms) for fresh data
         supplyVoltageSignal.waitForUpdate(0.020);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // wait up to 1 robot loop iteration (20ms) for fresh data
         supplyVoltageSignal.WaitForUpdate(20_ms);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # wait up to 1 robot loop iteration (20ms) for fresh data
         supply_voltage_signal.wait_for_update(0.020)

Changing Update Frequency
-------------------------

All signals can have their update frequency configured via the ``setUpdateFrequency()`` method. Additionally, the update frequency of multiple signals can be specified at once using ``BaseStatusSignal.setUpdateFrequencyForAll()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/BaseStatusSignal.html#setUpdateFrequencyForAll(double,com.ctre.phoenix6.BaseStatusSignal...)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_base_status_signal.html#a30db5fe5fbf36e7271eb9d11c9e402d9>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.BaseStatusSignal.set_update_frequency_for_all>`__).

.. warning:: Increasing signal frequency will also increase CAN bus utilization, which can cause indeterminate behavior at high utilization rates (>90%). This is less of a concern when using CANivore, which uses the higher-bandwidth `CAN FD <https://store.ctr-electronics.com/can-fd/>`__ bus.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // disable supply voltage reporting (0 Hz)
         supplyVoltageSignal.setUpdateFrequency(0);
         // speed up position and velocity reporting to 200 Hz
         BaseStatusSignal.setUpdateFrequencyForAll(200, positionSignal, velocitySignal);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // disable supply voltage reporting (0 Hz)
         supplyVoltageSignal.SetUpdateFrequency(0_Hz);
         // speed up position and velocity reporting to 200 Hz
         BaseStatusSignal::SetUpdateFrequencyForAll(200_Hz, positionSignal, velocitySignal);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # disable supply voltage reporting (0 Hz)
         supply_voltage_signal.set_update_frequency(0)
         # speed up position and velocity reporting to 200 Hz
         BaseStatusSignal.set_update_frequency_for_all(200, position_signal, velocity_signal)

When different update frequencies are specified for signals that share a status frame, the highest update frequency of all the relevant signals will be applied to the entire frame. Users can get a signal's applied update frequency using the ``getAppliedUpdateFrequency()`` method.

Signal update frequencies are automatically reapplied by the robot program on device reset.

Optimizing Bus Utilization
^^^^^^^^^^^^^^^^^^^^^^^^^^

For users that wish to disable every unused status signal for their devices to reduce bus utilization, device objects have an ``optimizeBusUtilization()`` method (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/hardware/ParentDevice.html#optimizeBusUtilization()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_parent_device.html#a7bab4d01dc9ee0b1e1015bd95c6412d5>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.ParentDevice.optimize_bus_utilization>`__). Additionally, multiple devices can be optimized at once using ``ParentDevice.optimizeBusUtilizationForAll()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/hardware/ParentDevice.html#optimizeBusUtilizationForAll(com.ctre.phoenix6.hardware.ParentDevice...)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_parent_device.html#a8a7a1b29451dd1b45c18b986f79c51d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.ParentDevice.optimize_bus_utilization_for_all>`__).

When optimizing the bus utilization for devices, all status signals that have not been given an update frequency using ``setUpdateFrequency()`` will be disabled. This results in an opt-in model for status signals, maximizing the reduction in bus utilization.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         m_pigeon.optimizeBusUtilization();
         ParentDevice.optimizeBusUtilizationForAll(m_leftMotor, m_rightMotor, m_cancoder);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         m_pigeon.OptimizeBusUtilization();
         hardware::ParentDevice::OptimizeBusUtilizationForAll(m_leftMotor, m_rightMotor, m_cancoder);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self.pigeon.optimize_bus_utilization()
         hardware.ParentDevice.optimize_bus_utilization_for_all(self.left_motor, self.right_motor, self.cancoder)

Timestamps
----------

The timestamps of a ``StatusSignal`` can be retrieved by calling ``getAllTimestamps()``, which returns a collection of ``Timestamp`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/Timestamp.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_timestamp.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/timestamp/index.html#module-phoenix6.timestamp>`__) objects. The ``Timestamp`` objects can be used to perform latency compensation math.

CANivore Timesync
-----------------

.. important:: CANivore Timesync requires the devices or the CANivore to be :doc:`Pro licensed </docs/licensing/licensing>`.

When using `CANivore <https://store.ctr-electronics.com/canivore/>`__, the attached CAN devices will automatically synchronize their time bases. This allows devices to sample and publish their signals in a synchronized manner.

Users can synchronously wait for these signals to update using ``BaseStatusSignal.waitForAll()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/BaseStatusSignal.html#waitForAll(double,com.ctre.phoenix6.BaseStatusSignal...)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_base_status_signal.html#a8cf8f0d56648b459e891df2cbbbaa3a0>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.BaseStatusSignal.wait_for_all>`__).

.. tip:: ``waitForAll()`` with a timeout of zero matches the behavior of ``refreshAll()``, performing a non-blocking refresh on all signals passed in.

Because the devices are synchronized, time-critical signals are sampled and published on the same schedule. This combined with the ``waitForAll()`` routine means applications can considerably reduce the latency of the timesync signals. This is particularly useful for multi-device mechanisms, such as swerve odometry.

.. note:: When using a non-zero timeout, the signals passed into ``waitForAll()`` should have the same update frequency for synchronous data acquisition. This can be done by calling ``setUpdateFrequency()`` or by referring to the API documentation.

The diagram below demonstrates the benefits of using timesync to synchronously acquire signals from multiple devices.

.. image:: images/timesync-diagram.png
   :alt: Diagram of timesync operation

Check the API documentation for information on whether a status signal supports CANivore Timesync.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var talonFXPositionSignal = m_talonFX.getPosition();
         var cancoderPositionSignal = m_cancoder.getPosition();
         var pigeon2YawSignal = m_pigeon2.getYaw();

         BaseStatusSignal.waitForAll(0.020, talonFXPositionSignal, cancoderPositionSignal, pigeon2YawSignal);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& talonFXPositionSignal = m_talonFX.GetPosition();
         auto& cancoderPositionSignal = m_cancoder.GetPosition();
         auto& pigeon2YawSignal = m_pigeon2.GetYaw();

         BaseStatusSignal::WaitForAll(20_ms, talonFXPositionSignal, cancoderPositionSignal, pigeon2YawSignal);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         talonfx_position_signal = self.talonfx.get_position()
         cancoder_position_signal = self.cancoder.get_position()
         pigeon2_yaw_signal = self.pigeon2.get_yaw()

         BaseStatusSignal.wait_for_all(0.020, talonfx_position_signal, cancoder_position_signal, pigeon2_yaw_signal)

Latency Compensation
--------------------

Users can perform latency compensation using ``BaseStatusSignal.getLatencyCompensatedValue()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/BaseStatusSignal.html#getLatencyCompensatedValue(com.ctre.phoenix6.StatusSignal,com.ctre.phoenix6.StatusSignal)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_base_status_signal.html#a96a39be023f05d7c72de85fc30e5dcaa>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/index.html#phoenix6.BaseStatusSignal.get_latency_compensated_value>`__).

.. important:: ``getLatencyCompensatedValue()`` does not automatically refresh the signals. As a result, the user must ensure the ``signal`` and ``signalSlope`` parameters are refreshed before retrieving a compensated value.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         double compensatedTurns = BaseStatusSignal.getLatencyCompensatedValue(m_motor.getPosition(), m_motor.getVelocity());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto compensatedTurns = BaseStatusSignal::GetLatencyCompensatedValue(m_motor.GetPosition(), m_motor.GetVelocity());

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         compensated_turns = BaseStatusSignal.get_latency_compensated_value(self.motor.get_position(), self.motor.get_velocity())

``SignalMeasurement``
---------------------

All ``StatusSignal`` objects have a ``getDataCopy()`` method that returns a new ``SignalMeasurement`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/StatusSignal.SignalMeasurement.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1_signal_measurement.html>`__) object. ``SignalMeasurement`` is a `Passive Data Structure <https://en.wikipedia.org/wiki/Passive_data_structure>`__ that provides all the information about a signal at the time of the ``getDataCopy()`` call, which can be useful for data logging.

.. warning:: ``getDataCopy()`` returns a **new** ``SignalMeasurement`` object every call. **Java** users should **avoid** using this API in RAM-constrained applications.
