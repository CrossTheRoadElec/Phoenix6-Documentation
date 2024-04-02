TalonFX Remote Sensors
======================

The TalonFX supports various remote sensors. Remote sensors allow onboard closed-loop functionality at rates faster than a traditional robot processor (~1Khz) by reading the remote sensor directly from the CAN bus. This allows supported motor controllers to execute closed-loop modes with sensor values sourced by supported sensors.

A list of supported remote sensors can be found in the API docs (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/signals/FeedbackSensorSourceValue.html#RotorSensor>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1signals_1_1_feedback_sensor_source_value.html#aa2fa5f6f6c182238413716b7e520df8b>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/configs/config_groups/index.html#phoenix6.configs.config_groups.FeedbackConfigs.feedback_sensor_source>`__).

Remote sensors can be configured using :ref:`Tuner X <docs/tuner/configs:tuner configs>` or via code. This document highlights how to configure a remote sensor in a robot program.

``RemoteCANcoder``
------------------

A supported motor controller will update its position and velocity whenever the CANcoder publishes its information on the CAN bus.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var fx_cfg = new TalonFXConfiguration();
         fx_cfg.Feedback.FeedbackRemoteSensorID = m_cancoder.getDeviceID();
         fx_cfg.Feedback.FeedbackSensorSource = FeedbackSensorSourceValue.RemoteCANcoder;

         m_talonFX.getConfigurator().apply(fx_cfg);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         configs::TalonFXConfiguration fx_cfg{};
         fx_cfg.Feedback.FeedbackRemoteSensorID = m_cancoder.GetDeviceID();
         fx_cfg.Feedback.FeedbackSensorSource = signals::FeedbackSensorSourceValue::RemoteCANcoder;

         m_talonFX.GetConfigurator().Apply(fx_cfg);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         fx_cfg = configs.TalonFXConfiguration()
         fx_cfg.feedback.feedback_remote_sensor_id = self.cancoder.device_id
         fx_cfg.feedback.feedback_sensor_source = signals.FeedbackSensorSourceValue.REMOTE_CANCODER

         self.talonfx.configurator.apply(fx_cfg)

.. _fusedcancoder:

``FusedCANcoder``
-----------------

.. important:: This feature requires the device to be :doc:`Pro licensed </docs/licensing/licensing>`. When unlicensed, the TalonFX will fall back to ``RemoteCANcoder`` and trip the UsingFusedCANcoderWhileUnlicensed fault.

New in Phoenix 6 is a feedback sensor type called ``FusedCANcoder``. ``FusedCANcoder`` will fuse another CANcoder's information with the motor's internal rotor, which provides the best possible position and velocity for accuracy and bandwidth. This is useful in applications such as swerve azimuth.

``FusedCANcoder`` requires the configuration of several ``Feedback`` config group items, shown below.

Full example: `Java <https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/java/FusedCANcoder/src/main/java/frc/robot/Robot.java>`__, `C++ <https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/cpp/FusedCANcoder/src/main/cpp/Robot.cpp>`__

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. rli:: https://github.com/CrossTheRoadElec/Phoenix6-Examples/raw/96a53e96227c8dbc102c04da198f28415da60af4/java/FusedCANcoder/src/main/java/frc/robot/Robot.java
         :language: java
         :lines: 51-64
         :linenos:
         :lineno-start: 51

   .. tab-item:: C++
      :sync: C++

      .. rli:: https://github.com/CrossTheRoadElec/Phoenix6-Examples/raw/96a53e96227c8dbc102c04da198f28415da60af4/cpp/FusedCANcoder/src/main/cpp/Robot.cpp
         :language: cpp
         :lines: 11-24
         :linenos:
         :lineno-start: 11

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         cc_cfg = configs.CANcoderConfiguration()
         cc_cfg.magnet_sensor.absolute_sensor_range = signals.AbsoluteSensorRangeValue.SIGNED_PLUS_MINUS_HALF
         cc_cfg.magnet_sensor.sensor_direction = signals.SensorDirectionValue.COUNTER_CLOCKWISE_POSITIVE
         cc_cfg.magnet_sensor.magnet_offset = 0.4
         self.cc.configurator.apply(cc_cfg)

         fx_cfg = configs.TalonFXConfiguration()
         fx_cfg.feedback.feedback_remote_sensor_id = self.cc.device_id
         fx_cfg.feedback.feedback_sensor_source = signals.FeedbackSensorSourceValue.FUSED_CANCODER
         fx_cfg.feedback.sensor_to_mechanism_ratio = 1.0
         fx_cfg.feedback.rotor_to_sensor_ratio = 12.8

         self.fx.configurator.apply(fx_cfg)

Usage is the same as any :ref:`status signal <docs/api-reference/api-usage/status-signals:refreshing the signal value>`:

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         fx_pos.refresh();
         cc_pos.refresh();

         System.out.println("FX Position: " + fx_pos.toString());
         System.out.println("CANcoder Position: " + cc_pos.toString());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         fx_pos.Refresh();
         cc_pos.Refresh();

         std::cout << "FX Position: " << fx_pos << std::endl;
         std::cout << "CANcoder Position: " << cc_pos << std::endl;

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         fx_pos.refresh()
         cc_pos.refresh()

         print("FX Position: " + fx_pos.value)
         print("CANcoder Position: " + cc_pos.value)

.. _synccancoder:

``SyncCANcoder``
-----------------

.. important:: This feature requires the device to be :doc:`Pro licensed </docs/licensing/licensing>`. When unlicensed, the TalonFX will fall back to ``RemoteCANcoder`` and trip the UsingFusedCANcoderWhileUnlicensed fault.

``SyncCANcoder`` allows users to synchronize the TalonFX's internal rotor sensor against the remote CANcoder, but continue to use the rotor sensor for all closed loop control. TalonFX will continue to monitor the remote CANcoder and report if its internal position differs significantly from the reported position or if the remote CANcoder disappears from the bus.

Users may want ``SyncCANcoder`` instead of ``FusedCANcoder`` if there is risk that the sensor can fail in a way that the sensor is still reporting "good" data, but the data does not match the mechanism, such as if the entire sensor mount assembly breaks off. Using ``SyncCANcoder`` over ``FusedCANcoder`` will not benefit from backlash compensation, as the CANcoder position is not continually fused in.

``SyncCANcoder`` requires the configuration of several ``Feedback`` config group items, shown below.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         /* Configure CANcoder to zero the magnet appropriately */
         CANcoderConfiguration cc_cfg = new CANcoderConfiguration();
         cc_cfg.MagnetSensor.AbsoluteSensorRange = AbsoluteSensorRangeValue.Signed_PlusMinusHalf;
         cc_cfg.MagnetSensor.SensorDirection = SensorDirectionValue.CounterClockwise_Positive;
         cc_cfg.MagnetSensor.MagnetOffset = 0.4;
         m_cc.getConfigurator().apply(cc_cfg);

         TalonFXConfiguration fx_cfg = new TalonFXConfiguration();
         fx_cfg.Feedback.FeedbackRemoteSensorID = m_cc.getDeviceID();
         fx_cfg.Feedback.FeedbackSensorSource = FeedbackSensorSourceValue.SyncCANcoder;
         fx_cfg.Feedback.SensorToMechanismRatio = 1.0;
         fx_cfg.Feedback.RotorToSensorRatio = 12.8;

         m_fx.getConfigurator().apply(fx_cfg);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         /* Configure CANcoder to zero the magnet appropriately */
         configs::CANcoderConfiguration cc_cfg{};
         cc_cfg.MagnetSensor.AbsoluteSensorRange = signals::AbsoluteSensorRangeValue::Signed_PlusMinusHalf;
         cc_cfg.MagnetSensor.SensorDirection = signals::SensorDirectionValue::CounterClockwise_Positive;
         cc_cfg.MagnetSensor.MagnetOffset = 0.4;
         m_cc.GetConfigurator().Apply(cc_cfg);

         configs::TalonFXConfiguration fx_cfg{};
         fx_cfg.Feedback.FeedbackRemoteSensorID = m_cc.GetDeviceID();
         fx_cfg.Feedback.FeedbackSensorSource = signals::FeedbackSensorSourceValue::SyncCANcoder;
         fx_cfg.Feedback.SensorToMechanismRatio = 1.0;
         fx_cfg.Feedback.RotorToSensorRatio = 12.8;

         m_fx.GetConfigurator().Apply(fx_cfg);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         cc_cfg = configs.CANcoderConfiguration()
         cc_cfg.magnet_sensor.absolute_sensor_range = signals.AbsoluteSensorRangeValue.SIGNED_PLUS_MINUS_HALF
         cc_cfg.magnet_sensor.sensor_direction = signals.SensorDirectionValue.COUNTER_CLOCKWISE_POSITIVE
         cc_cfg.magnet_sensor.magnet_offset = 0.4
         self.cc.configurator.apply(cc_cfg)

         fx_cfg = configs.TalonFXConfiguration()
         fx_cfg.feedback.feedback_remote_sensor_id = self.cc.device_id
         fx_cfg.feedback.feedback_sensor_source = signals.FeedbackSensorSourceValue.SYNC_CANCODER
         fx_cfg.feedback.sensor_to_mechanism_ratio = 1.0
         fx_cfg.feedback.rotor_to_sensor_ratio = 12.8

         self.fx.configurator.apply(fx_cfg)
