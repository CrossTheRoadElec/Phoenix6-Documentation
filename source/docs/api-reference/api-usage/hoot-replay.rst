Hoot Replay
===========

.. note:: Information on logging to ``hoot`` files can be found in :doc:`/docs/api-reference/api-usage/signal-logging`.

Hoot Replay allows users to playback hoot logs in their robot program. This allows for testing changes to robot code in simulation using measurements recorded from the real robot.

.. important:: Hoot Replay requires the hoot log to have a Pro-licensed device. Currently, only one hoot log may be replayed at a time.

Compared to other replay frameworks, Hoot Replay offers **automatic** status signal playback without any code changes. However, replaying custom logged signals still requires modifications to the robot's subsystems.

Hoot Replay is controlled using the ``HootReplay`` class (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootReplay.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_hoot_replay.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html>`__) and supports playing back device status signals and custom user signals. Configs and control requests are ignored during replay.

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

During Hoot Replay, the simulated robot will automatically enable and run through all the maneuvers recorded in the hoot log. There are also several APIs that can be used to manage playback.

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

Users can also fetch custom signals written to the loaded hoot log by utilizing the ``get*()`` functions. An example application of this is replaying vision data to test changes in the drivetrain pose estimator.

All custom signal getters return a ``HootReplay.SignalData`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootReplay.SignalData.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1_hoot_replay_1_1_signal_data.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html#phoenix6.hoot_replay.HootReplay.SignalData>`__) object containing information about the signal, including its timestamp and any logged units. The success of fetching the custom signal can be validated by checking the ``status`` field.

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

Adjusting Robot Code Architecture
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Replaying custom signals typically requires changes to the architecture of the robot's subsystems or other hardware classes. As an example, consider changes to a ``Vision`` class.

When working with vision, a robot program will typically fetch raw/unfiltered camera/pose data (the "inputs") from the vision library (such as a list of targets). Then, it will perform some additional processing and filtering on that data to get the final vision pose estimate (the "output").

The goal is to **replay the "inputs"** so the replayed program can test changes to the subsequent data processing and filtering. This means the robot program should only replay data that is **unaffected by code logic**, letting the program determine all the new outputs.

The simplest way to make the code easily replayed is to consolidate all input fetches into a single ``fetchInputs()`` function, save the results to class member variables, and log the data using ``SignalLogger``. From there, a single periodic function would be responsible for calling that function and performing all data processing to get the outputs.

For example, if the only data pulled from the vision library is the raw vision pose estimate and its timestamp:

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public class Vision {
            private final Camera camera = new Camera(...);
            /* vision inputs */
            private PoseEstimate cameraPoseEst = new PoseEstimate();

            // ...

            private void fetchInputs() {
               // fetch and log inputs
               cameraPoseEst = camera.getPoseEstimate();

               final var poseArr = new double[3] {
                  cameraPoseEst.pose.getX(),
                  cameraPoseEst.pose.getY(),
                  cameraPoseEst.pose.getRotation().getDegrees()
               };
               SignalLogger.writeDoubleArray("CameraPoseEst/pose", poseArr);
               SignalLogger.writeDouble("CameraPoseEst/timestamp", cameraPoseEst.timestamp);
            }

            public void periodic() {
               fetchInputs();

               // process inputs here...
            }
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         class Vision {
         private:
            Camera camera{...};
            /* vision inputs */
            PoseEstimate cameraPoseEst{};

            // ...

            void FetchInputs()
            {
               // fetch and log inputs
               cameraPoseEst = camera.GetPoseEstimate();

               std::array<double, 3> const poseArr{
                  cameraPoseEst.pose.X().value(),
                  cameraPoseEst.pose.Y().value(),
                  cameraPoseEst.pose.Rotation().Degrees().value()
               };
               SignalLogger::WriteDoubleArray("CameraPoseEst/pose", poseArr);
               SignalLogger::WriteValue("CameraPoseEst/timestamp", cameraPoseEst.timestamp);
            }

         public:
            void Periodic()
            {
               FetchInputs();

               // process inputs here...
            }
         };

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         class Vision:
            def __init__(self):
               self._camera = Camera(...)
               # vision inputs
               self._camera_pose_est = PoseEstimate()

               # ...

            def _fetch_inputs(self):
               # fetch and log inputs
               self._camera_pose_est = camera.getPoseEstimate()

               pose_arr = [
                  self._camera_pose_est.pose.x,
                  self._camera_pose_est.pose.y,
                  self._camera_pose_est.pose.rotation().degrees()
               ]
               SignalLogger.write_double_array("CameraPoseEst/pose", pose_arr)
               SignalLogger.write_double("CameraPoseEst/timestamp", self._camera_pose_est.timestamp)

            def periodic(self):
               self._fetch_inputs()

               # process inputs here...

This makes it easy to implement a ``fetchInputsReplay()`` function, which can be called when ``Utils.isReplay()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/Utils.html#isReplay()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/namespacectre_1_1phoenix6_1_1utils.html#a58f5bd75a0588e8fcd671edc0bbab816>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/utils/index.html#phoenix6.utils.is_replay>`__) returns true. This function would do the reverse of the regular ``fetchInputs()``, pulling out the data from ``HootReplay`` and saving it to the class member variables.

For example, the previous ``Vision`` example would now have:

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private void fetchInputsReplay() {
            // pull out inputs from the log
            final var cameraPoseEst_pose = HootReplay.getDoubleArray("CameraPoseEst/pose");
            final var cameraPoseEst_timestamp = HootReplay.getDouble("CameraPoseEst/timestamp");

            if (
               cameraPoseEst_pose.status.isOK() &&
               cameraPoseEst_timestamp.status.isOK()
            ) {
               cameraPoseEst = new PoseEstimate();
               cameraPoseEst.pose = new Pose2d(
                  cameraPoseEst_pose.value[0],
                  cameraPoseEst_pose.value[1],
                  Rotation2d.fromDegrees(cameraPoseEst_pose.value[2])
               );
               cameraPoseEst.timestamp = cameraPoseEst_timestamp.value;
            }
         }

         public void periodic() {
            if (Utils.isReplay()) {
               fetchInputsReplay();
            } else {
               fetchInputs();
            }

            // process inputs here...
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         private:
            void FetchInputsReplay()
            {
               // pull out inputs from the log
               auto const cameraPoseEst_pose = HootReplay::GetDoubleArray("CameraPoseEst/pose");
               auto const cameraPoseEst_timestamp =
                  HootReplay::GetValue<units::second_t>("CameraPoseEst/timestamp");

               if (
                  cameraPoseEst_pose.status.IsOK() &&
                  cameraPoseEst_timestamp.status.IsOK()
               ) {
                  cameraPoseEst = PoseEstimate{};
                  cameraPoseEst.pose = frc::Pose2d{
                     cameraPoseEst_pose.value[0] * 1_m,
                     cameraPoseEst_pose.value[1] * 1_m,
                     frc::Rotation2d{cameraPoseEst_pose.value[2] * 1_deg}
                  };
                  cameraPoseEst.timestamp = cameraPoseEst_timestamp.value;
               }
            }

         public:
            void Periodic()
            {
               if (utils::IsReplay()) {
                  FetchInputsReplay();
               } else {
                  FetchInputs();
               }

               // process inputs here...
            }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         def _fetch_inputs_replay(self):
            # pull out inputs from the log
            self._camera_pose_est_pose = HootReplay.get_double_array("CameraPoseEst/pose")
            self._camera_pose_est_timestamp = HootReplay.get_double("CameraPoseEst/timestamp")

            if (
               self._camera_pose_est_pose.status.is_ok()
               and self._camera_pose_est_timestamp.status.is_ok()
            ):
               self._camera_pose_est = PoseEstimate()
               self._camera_pose_est.pose = [
                  self._camera_pose_est_pose.value[0],
                  self._camera_pose_est_pose.value[1],
                  Rotation2d.fromDegrees(self._camera_pose_est_pose.value[2])
               ]
               self._camera_pose_est.timestamp = self._camera_pose_est_timestamp.value

         def periodic(self):
            if Utils.is_replay():
               self._fetch_inputs_replay()
            else:
               self._fetch_inputs()

            # process inputs here...
