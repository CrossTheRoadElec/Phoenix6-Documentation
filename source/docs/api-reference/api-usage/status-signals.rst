Status Signals
==============

Signals represent live data reported by a device; these can be yaw, position, etc.
To make use of the live data, users need to know the value, timestamp, latency, units, and error condition of the data.
Additionally, users may need to synchronize with fresh data to minimize latency.

``StatusSignalValue``
---------------------

The ``StatusSignalValue`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/StatusSignalValue.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1_status_signal_value.html>`__) is a signal object that provides APIs to address all of the requirements listed above.

The device object provides getters for all available signals. Each getter returns a ``StatusSignalValue`` that is typed appropriately for the signal.

.. note:: The device getters return a cached ``StatusSignalValue``. As a result, frequently calling the getter does not influence RAM performance.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var supplyVoltageSignal = m_device.getSupplyVoltage();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& supplyVoltageSignal = m_device.GetSupplyVoltage();

The value of the signal can be retrieved from the ``StatusSignalValue`` by calling ``getValue()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var supplyVoltage = supplyVoltageSignal.getValue();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto supplyVoltage = supplyVoltageSignal.GetValue();

.. note:: Phoenix Pro utilizes the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ when applicable.

The ``StatusCode`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/StatusCode.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/_status_codes_8h.html#a1edbab973bc8d4d5097a6bcc17c88c19>`__) of the signal can be retrieved by calling ``getError()``.
This can be used to determine if the device is not present on the CAN bus.

.. note:: If a status signal is not available on the CAN bus, an error will be reported to the Driver Station.

Refreshing the Signal Value
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The device ``StatusSignalValue`` getters implicitly refresh the cached signal values. However, if the user application caches the ``StatusSignalValue`` object, the ``refresh()`` method must be called to fetch fresh data.

.. tip:: The ``refresh()`` method can be method-chained. As a result, you can call ``refresh()`` and ``getValue()`` on one line.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         supplyVoltageSignal.refresh();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         supplyVoltageSignal.Refresh();

Waiting for Signal Updates
^^^^^^^^^^^^^^^^^^^^^^^^^^

Instead of using the latest value, the user can instead opt to synchronously wait for a signal update. ``StatusSignalValue`` provides a ``waitForUpdate(timeoutSec)`` method that will block the current robot loop until the signal is retrieved or the timeout has been exceeded. This replaces the need to call ``refresh()`` on cached ``StatusSignalValue`` objects.

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

Changing Update Frequency
^^^^^^^^^^^^^^^^^^^^^^^^^

All signals can have their update frequency configured via the ``setUpdateFrequency()`` method.

.. warning:: Increasing signal frequency will also increase CAN bus utilization, which can cause indeterminate behavior at high utilization rates (>90%). This is less of a concern when using CANivore, which uses the higher-bandwidth `CAN FD <https://store.ctr-electronics.com/can-fd/>`__ bus.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // slow down supply voltage reporting to 10 Hz
         supplyVoltageSignal.setUpdateFrequency(10);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // slow down supply voltage reporting to 10 Hz
         supplyVoltageSignal.SetUpdateFrequency(10_Hz);

Timestamps
^^^^^^^^^^

The timestamps of a ``StatusSignalValue`` can be retrieved by calling ``getAllTimestamps()``, which returns a collection of ``Timestamp`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/Timestamp.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1_timestamp.html>`__) objects. The ``Timestamp`` objects can be used to perform latency compensation math.

CANivore Timesync
-----------------

When using `CANivore <https://store.ctr-electronics.com/canivore/>`__, the attached CAN devices will automatically synchronize their time bases. This allows devices to publish their signals in a synchronized manner.

Users can synchronously wait for these signals to update using ``BaseStatusSignalValue.waitForAll()`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/BaseStatusSignalValue.html#waitForAll(double,com.ctre.phoenixpro.BaseStatusSignalValue...)>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1_base_status_signal_value.html#a4a550332ec838b82947a7374ecd4234f>`__).

Because the devices are synchronized, time-critical signals are published on the same schedule. This combined with the ``waitForAll()`` routine means applications can considerably reduce the latency of the timesync signals. This is particularly useful for multi-device mechanisms, such as swerve odometry.

The following signals are time-synchronized:

- TalonFX Signals (all voltages, currents, positions, and velocities)
- CANcoder Position and Velocity
- Pigeon 2.0 Yaw, Pitch, & Roll

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var talonFXPositionSignal = m_talonFX.getPosition();
         var cancoderPositionSignal = m_cancoder.getPosition();
         var pigeon2YawSignal = m_pigeon2.getYaw();

         BaseStatusSignalValue.waitForAll(0.020, talonFXPositionSignal, cancoderPositionSignal, pigeon2YawSignal);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& talonFXPositionSignal = m_talonFX.GetPosition();
         auto& cancoderPositionSignal = m_cancoder.GetPosition();
         auto& pigeon2YawSignal = m_pigeon2.GetYaw();

         BaseStatusSignalValue::WaitForAll(20_ms, {talonFXPositionSignal, cancoderPositionSignal, pigeon2YawSignal});

.. note:: The signals passed into ``waitForAll()`` must have the same update frequency. This can be done by calling ``setUpdateFrequency()`` or by referring to the API documentation.

``SignalMeasurement``
---------------------

All ``StatusSignalValue`` objects have a ``getDataCopy()`` method that returns a new ``SignalMeasurement`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/StatusSignalValue.SignalMeasurement.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/structctre_1_1phoenixpro_1_1_signal_measurement.html>`__) object. ``SignalMeasurement`` is a `Passive Data Structure <https://en.wikipedia.org/wiki/Passive_data_structure>`__ that provides all the information about a signal at the time of the ``getDataCopy()`` call, which can be useful for data logging.

.. warning:: ``getDataCopy()`` returns a **new** ``SignalMeasurement`` object every call. **Java** users should **avoid** using this API in RAM-constrained applications.

Latency Compensation
--------------------

Users can perform latency compensation using ``BaseStatusSignalValue.getLatencyCompensation()`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/BaseStatusSignalValue.html#getLatencyCompensatedValue(com.ctre.phoenixpro.StatusSignalValue,com.ctre.phoenixpro.StatusSignalValue)>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1_base_status_signal_value.html#a22f020db5abbf556ac7605024309bb26>`__).

.. important:: ``getLatencyCompensatedValue()`` does not automatically refresh the signals. As a result, the user must ensure the ``signal`` and ``signalSlope`` parameters are refreshed before retrieving a compensated value.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         double compensatedTurns = BaseStatusSignalValue.getLatencyCompensatedValue(m_motor.getPosition(), m_motor.getVelocity());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto compensatedTurns = BaseStatusSignalValue::GetLatencyCompensatedValue(m_motor.GetPosition(), m_motor.GetVelocity());
