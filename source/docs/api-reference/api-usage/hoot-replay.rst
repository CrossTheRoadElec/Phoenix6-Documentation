Hoot Replay
===========

.. note:: Information on logging to ``hoot`` files can be found in :doc:`/docs/api-reference/api-usage/signal-logging`.

Hoot Replay allows users to playback hoot logs in their robot program. This allows for testing changes to robot code in simulation using measurements recorded from the real robot.

.. important:: Hoot Replay requires the hoot log to have a Pro-licensed device. Currently, only one hoot log may be replayed at a time.

Hoot Replay, controlled using the ``HootReplay`` class (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootReplay.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_hoot_replay.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html>`__), supports playing back device status signals and custom user signals. Configs and control requests are ignored during replay.

During Hoot Replay, the simulated robot will automatically enable and run through all the maneuvers recorded in the hoot log. Additionally, Hoot Replay supports step timing and changing the speed of the playback.

Hoot Replay uses a different vendordep (see :doc:`Installing Phoenix 6 </docs/installation/installation-frc>`) that replaces :doc:`/docs/canivore/canivore-hardware-attached` with Hoot Replay. Note that only one Phoenix 6 vendordep may be used in the ``vendordeps`` folder at a time.

Starting Hoot Replay
--------------------

At the start of the robot program, the desired hoot log can be loaded using ``HootReplay.loadFile(fileName)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootReplay.html#loadFile(java.lang.String)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_hoot_replay.html#aac1bd9893a003e04886b41a2d33d5d4e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html#phoenix6.hoot_replay.HootReplay.load_file>`__). Hoot Replay will start automatically after the log has been loaded.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         HootReplay.loadFile("./logs/example.hoot");

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         HootReplay::LoadFile{"./logs/example.hoot"};

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         HootReplay.load_file("./logs/example.hoot")

It is important that the hoot log is loaded before any devices are constructed or configured. To make this process easier, the ``CANBus(canbus, fileName)`` constructor (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/CANBus.html#%3Cinit%3E(java.lang.String,java.lang.String)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_c_a_n_bus.html#a01fe881b60a1e7137380188960e133fa>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/canbus/index.html#phoenix6.canbus.CANBus>`__) can instead be used to load the hoot log.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // construct the CANBus with the hoot log
         final CANBus canbus = new CANBus("canivore", "./logs/example.hoot");
         // now the log is guaranteed to be loaded before devices are constructed
         final TalonFX talonFX = new TalonFX(0, canbus);

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // construct the CANBus with the hoot log
         CANBus canbus{"canivore", "./logs/example.hoot"};
         // now the log is guaranteed to be loaded before devices are constructed
         hardware::TalonFX talonFX{0, canbus};

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # construct the CANBus with the hoot log
         self._canbus = CANBus("canivore", "./logs/example.hoot")
         # now the log is guaranteed to be loaded before devices are constructed
         self._talon_fx = hardware.TalonFX(0, canbus)

Controlling Replay
------------------

After Hoot Replay has started, there are several APIs that can be used to manage playback.

- ``HootReplay.pause()`` temporarily pauses playback
- ``HootReplay.play()`` resumes playback from the current point in the file
- ``HootReplay.stop()`` pauses playback and returns to the start of the file
- ``HootReplay.restart()`` restarts playback from the start of the file
- ``HootReplay.setSpeed(speed)`` changes the speed of playback by a scalar

The status of Hoot Replay can be checked using ``HootReplay.isFileLoaded()`` and ``HootReplay.isPlaying()``. Threads can also wait for Hoot Replay to start using ``HootReplay.waitForPlaying(timeout)``.

.. tip:: ``HootReplay.isPlaying()`` and ``HootReplay.waitForPlaying(timeout)`` immediately return true when running on the robot or in regular simulation.

Additionally, after pausing or stopping Hoot Replay, playback can advance by a fixed timestep using ``HootReplay.stepTiming(timeDelta)``, updating all signals accordingly.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // stop and return to start of log
         HootReplay.stop();
         var startPos = talonFX.getPosition().getValue();
         // advance by 1 second and compare positions
         HootReplay.stepTiming(1.0);
         var endPos = talonFX.getPosition().getValue();

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // stop and return to start of log
         HootReplay::Stop();
         auto const startPos = talonFX.GetPosition().GetValue();
         // advance by 1 second and compare positions
         HootReplay::StepTiming(1_s);
         auto const endPos = talonFX.GetPosition().GetValue();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # stop and return to start of log
         HootReplay.stop()
         start_pos = self._talon_fx.get_position().value
         # advance by 1 second and compare positions
         HootReplay.step_timing(1.0)
         end_pos = self._talon_fx.get_position().value

Replaying Custom Signals
------------------------

Users can also fetch custom signals written to the loaded hoot log by utilizing the ``get*()`` functions. An example application of this is replaying your vision data to test changes in the drivetrain pose estimator.

All custom signal getters return a ``HootReplay.SignalData<T>`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootReplay.SignalData.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1_hoot_replay_1_1_signal_data.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html#phoenix6.hoot_replay.HootReplay.SignalData>`__) containing information about the signal, including its timestamp and any logged units. The success of fetching the custom signal can be validated by checking the ``status`` field.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // Fetch the logged raw vision measurements
         var visionData = HootReplay.getDoubleArray("camera pose");
         if (visionData.status.isOK()) {
            var camPose = new Pose2d(
               visionData.value[0],
               visionData.value[1],
               Rotation2d.fromDegrees(visionData.value[2])
            );
            // now run regular vision processing on the vision data
            if (isCameraPoseValid(camPose)) {
               drivetrain.addVisionMeasurement(camPose, visionData.timestampSeconds);
            }
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // Fetch the logged raw vision measurements
         auto const visionData = HootReplay::GetDoubleArray("camera pose");
         if (visionData.status.IsOK()) {
            frc::Pose2d const camPose{
               visionData.value[0] * 1_m,
               visionData.value[1] * 1_m,
               frc::Rotation2d{visionData.value[2] * 1_deg}
            };
            // now run regular vision processing on the vision data
            if (IsCameraPoseValid(camPose)) {
               drivetrain.AddVisionMeasurement(camPose, visionData.timestamp);
            }
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Fetch the logged raw vision measurements
         vision_data = HootReplay.get_double_array("camera pose")
         if visionData.status.is_ok():
            cam_pose = Pose2d(
               vision_data.value[0],
               vision_data.value[1],
               Rotation2d.fromDegrees(vision_data.value[2])
            )
            # now run regular vision processing on the vision data
            if is_camera_pose_valid(cam_pose):
               drivetrain.add_vision_measurement(cam_pose, vision_data.timestamp)
