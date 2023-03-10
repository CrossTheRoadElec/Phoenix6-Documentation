TalonFX Remote Sensors
======================

The TalonFX supports various remote sensor types. Remote sensors allow onboard closed-loop functionality at rates faster than a traditional robot processor (~1Khz) by reading the remote sensor directly from the CAN bus. This allows supported motor controllers to execute closed-loop modes with sensor values sourced by supported sensors.

A list of supported remote sensors can be found in the `API docs <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/signals/FeedbackSensorSourceValue.html#RotorSensor>`__. The link provided is for Java, but is applicable to C++ as well.

Remote sensors can be configured in :ref:`Tuner configs <docs/tuner/configs:tuner configs>` or via code. This document highlights how to configure a remote sensor via a robot program.

``RemoteCANcoder``
------------------

Supported motor controllers will update its position and velocity whenever the CANcoder publishes its information on the CAN bus.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         TalonFXConfiguration m_talonConfig = new TalonFXConfiguration();
         m_talonConfig.FeedbackRemoteSensorID = m_cancoder.getDeviceID();
         m_talonConfig.Feedback.FeedbackSensorSource = FeedbackSensorSourceValue.FusedCANcoder;

         m_talonFX.getConfigurator().apply(m_talonConfig);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         TalonFXConfiguration m_talonConfig{};
         m_talonConfig.FeedbackRemoteSensorID = m_cancoder.GetDeviceID();
         m_talonConfig.Feedback.FeedbackSensorSource = FeedbackSensorSourceValue.FusedCANcoder;

         m_talonFX.GetConfigurator().Apply(m_talonConfig);

``FusedCANcoder``
-----------------

New in Phoenix Pro is a supported feedback sensor type called ``FusedCANcoder``. ``FusedCANcoder`` will fuse another CANcoder's information with the internal rotor, which provides the best possible position and velocity for accuracy and bandwidth. This is useful in applications such as a swerve azimuth.

``FusedCANcoder`` requires that various ``Feedback`` config group items be configured. See the below example for reference.

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

         System.out.println("FX Position: " + fx_pos.getValue());
         System.out.println("CANcoder Position: " + cc_pos.getValue());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         fx_pos.Refresh();
         cc_pos.Refresh();

         std::cout << "FX Position: " << fx_pos << std::endl;
         std::cout << "CANcoder Position: " << cc_pos << std::endl;
