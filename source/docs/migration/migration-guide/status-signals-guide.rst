Status Signals
==============

Phoenix 6 expands the functionality of status signals with the introduction of the ``StatusSignal`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/StatusSignal.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1_status_signal.html>`__).

.. note:: For more information about status signals in Phoenix 6, see :doc:`/docs/api-reference/api-usage/status-signals`.

Using Status Signals
--------------------

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // get latest TalonFX selected sensor position
               // units are encoder ticks
               int sensorPos = m_talonFX.getSelectedSensorPosition();

               // latency is unknown
               // cannot synchronously wait for new data

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // get latest TalonFX selected sensor position
               // units are encoder ticks
               int sensorPos = m_talonFX.GetSelectedSensorPosition();

               // latency is unknown
               // cannot synchronously wait for new data

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // acquire a refreshed TalonFX rotor position signal
               var rotorPosSignal = m_talonFX.getRotorPosition();

               // because we are calling getRotorPosition() every loop,
               // we do not need to call refresh()
               //rotorPosSignal.refresh();

               // retrieve position value that we just refreshed
               // units are rotations, uses the units library
               var rotorPos = rotorPosSignal.getValue();
               // the units library can be bypassed using getValueAsDouble()
               double rotorPosRotations = rotorPosSignal.getValueAsDouble();

               // get latency of the signal
               var rotorPosLatency = rotorPosSignal.getTimestamp().getLatency();

               // synchronously wait 20 ms for new data
               rotorPosSignal.waitForUpdate(0.020);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // acquire a refreshed TalonFX rotor position signal
               auto& rotorPosSignal = m_talonFX.GetRotorPosition();

               // because we are calling GetRotorPosition() every loop,
               // we do not need to call Refresh()
               //rotorPosSignal.Refresh();

               // retrieve position value that we just refreshed
               // units are rotations, uses the units library
               auto rotorPos = rotorPosSignal.GetValue();

               // get latency of the signal
               auto rotorPosLatency = rotorPosSignal.GetTimestamp().GetLatency();

               // synchronously wait 20 ms for new data
               rotorPosSignal.WaitForUpdate(20_ms);

Changing Update Frequency (Status Frame Period)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // slow down the Status 2 frame (selected sensor data) to 5 Hz (200ms)
               m_talonFX.setStatusFramePeriod(StatusFrameEnhanced.Status_2_Feedback0, 200);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // slow down the Status 2 frame (selected sensor data) to 5 Hz (200ms)
               m_talonFX.SetStatusFramePeriod(StatusFrameEnhanced::Status_2_Feedback0, 200);

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // slow down the position signal to 5 Hz
               m_talonFX.getPosition().setUpdateFrequency(5);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // slow down the position signal to 5 Hz
               m_talonFX.GetPosition().SetUpdateFrequency(5_Hz);

.. note:: When different update frequencies are specified for signals that share a status frame, the highest update frequency of all the relevant signals will be applied to the entire frame. Users can get a signal's applied update frequency using the ``getAppliedUpdateFrequency()`` method.

Common Signals
--------------

Several status signals have changed name or form in Phoenix 6.

General Signals
^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Phoenix 5
     - Phoenix 6

   * - ``BusVoltage``
     - ``SupplyVoltage``

   * - ``Faults`` |~| / ``StickyFaults`` (fills an object)
     - ``Fault_*`` |~| / ``StickyFault_*`` (individual faults)

   * - ``FirmwareVersion``
     - ``Version``

Talon FX Signals
^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Phoenix 5
     - Phoenix 6

   * - ``MotorOutputPercent``
     - ``DutyCycle``

   * - ``StatorCurrent``
     - | ``StatorCurrent`` (motoring |~| +, braking |~| -),
       | ``TorqueCurrent`` (forward |~| +, reverse |~| -)

   * - ``Inverted`` (true/false; matches ``setInverted``)
     - ``AppliedRotorPolarity`` (CCW+/CW+; typically matches ``Inverted`` config, affected by follower features)

   * - ``SelectedSensorPosition`` |~| / ``SelectedSensorVelocity``
     - ``Position`` |~| / ``Velocity``

   * - ``IntegratedSensor*`` (in |~| ``SensorCollection``)
     - ``Rotor*``

   * - ``ActiveTrajectory*`` (only Motion Magic® and the Motion Profile Executor)
     - ``ClosedLoopReference*`` (all closed-loop control requests)

   * - ``IsFwdLimitSwitchClosed`` |~| / ``IsRevLimitSwitchClosed`` (true/false)
     - ``GetForwardLimit`` |~| / ``GetReverseLimit`` (Open/Closed)

CANcoder Signals
^^^^^^^^^^^^^^^^

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Phoenix 5
     - Phoenix 6

   * - ``MagnetFieldStrength``
     - ``MagnetHealth``

Pigeon 2 Signals
^^^^^^^^^^^^^^^^

.. note:: Many Pigeon 2 signal getters in Phoenix 5 fill an array, such as ``YawPitchRoll``. In Phoenix 6, these signals have been broken up into their individual components, such as ``Yaw``, ``Pitch``, and ``Roll``.

.. list-table::
   :header-rows: 1
   :width: 100%

   * - Phoenix 5
     - Phoenix 6

   * - ``RawGyro``
     - ``AngularVelocity*``

   * - ``6dQuaternion``
     - ``Quat*``

   * - ``BiasedAccelerometer``
     - ``Acceleration*``

   * - ``BiasedMagnetometer``
     - ``MagneticField*``

   * - ``RawMagnetometer``
     - ``RawMagneticField*``

.. This is a non-breaking space; ~ comes from LaTeX syntax
.. |~| unicode:: 0xA0
   :trim:
