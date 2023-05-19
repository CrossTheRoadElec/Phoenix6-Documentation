TalonFX Remote Sensors
======================

The TalonFX supports various remote sensors. Remote sensors allow onboard closed-loop functionality at rates faster than a traditional robot processor (~1Khz) by reading the remote sensor directly from the CAN bus. This allows supported motor controllers to execute closed-loop modes with sensor values sourced by supported sensors.

A list of supported remote sensors can be found in the API docs (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/signals/FeedbackSensorSourceValue.html#RotorSensor>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1signals_1_1_feedback_sensor_source_value.html#aa2fa5f6f6c182238413716b7e520df8b>`__).

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
         fx_cfg.Feedback.FeedbackSensorSource = FeedbackSensorSourceValue.FusedCANcoder;

         m_talonFX.getConfigurator().apply(fx_cfg);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         configs::TalonFXConfiguration fx_cfg{};
         fx_cfg.Feedback.FeedbackRemoteSensorID = m_cancoder.GetDeviceID();
         fx_cfg.Feedback.FeedbackSensorSource = signals::FeedbackSensorSourceValue::FusedCANcoder;

         m_talonFX.GetConfigurator().Apply(fx_cfg);

.. _fusedcancoder:

``FusedCANcoder``
-----------------

.. important:: This feature requires the device to be :doc:`Pro licensed </docs/licensing/licensing>`.

New in Phoenix 6 is a feedback sensor type called ``FusedCANcoder``. ``FusedCANcoder`` will fuse another CANcoder's information with the motor's internal rotor, which provides the best possible position and velocity for accuracy and bandwidth. This is useful in applications such as swerve azimuth.

``FusedCANcoder`` requires the configuration of several ``Feedback`` config group items, shown below.

Full example: `Java <https://github.com/CrossTheRoadElec/PhoenixPro-Examples/blob/main/java/FusedCANcoder/src/main/java/frc/robot/Robot.java>`__, `C++ <https://github.com/CrossTheRoadElec/PhoenixPro-Examples/blob/main/cpp/FusedCANcoder/src/main/cpp/Robot.cpp>`__

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. rli:: https://github.com/CrossTheRoadElec/PhoenixPro-Examples/raw/96a53e96227c8dbc102c04da198f28415da60af4/java/FusedCANcoder/src/main/java/frc/robot/Robot.java
         :language: java
         :lines: 51-64
         :linenos:
         :lineno-start: 51

   .. tab-item:: C++
      :sync: C++

      .. rli:: https://github.com/CrossTheRoadElec/PhoenixPro-Examples/raw/96a53e96227c8dbc102c04da198f28415da60af4/cpp/FusedCANcoder/src/main/cpp/Robot.cpp
         :language: cpp
         :lines: 11-24
         :linenos:
         :lineno-start: 11

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
