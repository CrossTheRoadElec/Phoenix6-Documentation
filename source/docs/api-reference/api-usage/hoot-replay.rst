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

The status of Hoot Replay can be checked using ``HootReplay.isFileLoaded()``, ``HootReplay.isPlaying()``, and ``HootReplay.isFinished()``. Threads can also wait for Hoot Replay to start using ``HootReplay.waitForPlaying(timeout)``.

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
         var visionData = HootReplay.getStruct("camera pose", Pose2d.struct);
         if (visionData.status.isOK() && visionData.value.isPresent()) {
            // now run regular vision processing on the vision data
            var cameraPose = visionData.value.get();
            if (isCameraPoseValid(cameraPose)) {
               drivetrain.addVisionMeasurement(cameraPose, visionData.timestamp);
            }
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // Fetch the logged raw vision measurements
         auto const visionData = HootReplay::GetStruct<frc::Pose2d>("camera pose");
         if (visionData.status.IsOK() && visionData.value.has_value()) {
            // now run regular vision processing on the vision data
            auto const cameraPose = visionData.value.value();
            if (IsCameraPoseValid(cameraPose)) {
               drivetrain.AddVisionMeasurement(cameraPose, visionData.timestamp);
            }
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Fetch the logged raw vision measurements
         vision_data = HootReplay.get_struct("camera pose", Pose2d)
         if visionData.status.is_ok() and vision_data.value is not None:
            # now run regular vision processing on the vision data
            camera_pose = vision_data.value
            if is_camera_pose_valid(camera_pose):
               drivetrain.add_vision_measurement(camera_pose, vision_data.timestamp)

Adjusting Robot Code Architecture
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Replaying **custom** signals typically requires changes to the architecture of the robot's subsystems or other hardware classes. As an example, consider changes to a ``Vision`` class.

When working with vision, a robot program will typically fetch raw/unfiltered camera/pose data (the "inputs") from the vision library (such as a list of targets). Then, it will perform some additional processing and filtering on that data to get the final vision pose estimate (the "output").

The goal is to **replay the "inputs"** so the replayed program can test changes to the subsequent data processing and filtering. This means the robot program should only replay data that is **unaffected by code logic**, letting the program determine all the new outputs.

The simplest way to make the code easily replayed is to consolidate all input fetches into a single ``fetchInputs()`` function and save the results to class member variables. From there, a single periodic function would be responsible for calling that function when ``Utils.isReplay()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/Utils.html#isReplay()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/namespacectre_1_1phoenix6_1_1utils.html#a58f5bd75a0588e8fcd671edc0bbab816>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/utils/index.html#phoenix6.utils.is_replay>`__) returns ``false``, as well as performing all data processing to get the outputs.

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
               cameraPoseEst = camera.getPoseEstimate();
            }

            public void periodic() {
               if (!Utils.isReplay()) {
                  fetchInputs();
               }

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
               cameraPoseEst = camera.GetPoseEstimate();
            }

         public:
            void Periodic()
            {
               if (!utils::IsReplay()) {
                  FetchInputs();
               }

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
               self._camera_pose_est = camera.getPoseEstimate()

            def periodic(self):
               if not utils.is_replay():
                  self._fetch_inputs()

               # process inputs here...

At this point, there are two methods to set up Hoot Replay of the inputs.

.. tab-set::

   .. tab-item:: Automatic (``HootAutoReplay``)

      The inputs can be registered to a ``HootAutoReplay`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootAutoReplay.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_hoot_auto_replay.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/hoot_replay/index.html#phoenix6.hoot_auto_replay.HootAutoReplay>`__) instance using getter and setter lambdas. The periodic function then calls ``update()`` on the ``HootAutoReplay`` instance to write the inputs to the hoot log on the real robot (or :doc:`simulation </docs/api-reference/simulation/simulation-intro>`) and fetch the inputs from the log during Hoot Replay.

      .. tip:: In a WPILib robot program, ``HootAutoReplay`` also supports replaying ``Timer.getTimestamp()`` and joystick inputs. These can be registered using ``withTimestampReplay()`` and ``withJoystickReplay()``, respectively. See the API documentation for more information.

      For example, the previous ``Vision`` example would now have:

      .. tab-set::

         .. tab-item:: Java
            :sync: java

            .. code-block:: java

               public class Vision {
                  private final Camera camera = new Camera(...);
                  /* vision inputs */
                  private PoseEstimate cameraPoseEst = new PoseEstimate();

                  /* NEW: register inputs for replay */
                  private final HootAutoReplay autoReplay = new HootAutoReplay()
                     .withStruct(
                        "CameraPoseEst/pose", Pose2d.struct,
                        /* getter lambda returns the value to log */
                        () -> cameraPoseEst.pose,
                        /* setter lambda applies the value from the log */
                        val -> cameraPoseEst.pose = val.value
                     )
                     .withDouble(
                        "CameraPoseEst/timestamp",
                        () -> cameraPoseEst.timestamp,
                        val -> cameraPoseEst.timestamp = val.value
                     );

                  // ...

                  private void fetchInputs() {
                     cameraPoseEst = camera.getPoseEstimate();
                  }

                  public void periodic() {
                     if (!Utils.isReplay()) {
                        fetchInputs();
                     }
                     /* NEW: log the inputs on hardware/sim, and playback in replay */
                     autoReplay.update();

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

                  /* NEW: register inputs for replay */
                  HootAutoReplay autoReplay = HootAutoReplay{}
                     .WithStruct<frc::Pose2d>(
                        "CameraPoseEst/pose",
                        /* getter lambda returns the value to log */
                        [this] -> frc::Pose2d const& { return cameraPoseEst.pose; },
                        /* setter lambda applies the value from the log */
                        [this](HootReplay::SignalData<frc::Pose2d> val) {
                           cameraPoseEst.pose = val.value;
                        }
                     )
                     .WithValue<units::second_t>(
                        "CameraPoseEst/timestamp",
                        [this] -> units::second_t const& { return cameraPoseEst.timestamp; },
                        [this](HootReplay::SignalData<units::second_t> val) {
                           cameraPoseEst.timestamp = val.value;
                        }
                     );

                  // ...

                  void FetchInputs()
                  {
                     cameraPoseEst = camera.GetPoseEstimate();
                  }

               public:
                  void Periodic()
                  {
                     if (!utils::IsReplay()) {
                        FetchInputs();
                     }
                     /* NEW: log the inputs on hardware/sim, and playback in replay */
                     autoReplay.Update();

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

                     # NEW: register inputs for replay
                     def _set_camera_pose(val: HootReplay.SignalData[Pose2d]):
                        self._camera_pose_est.pose = val.value
                     def _set_camera_timestamp(val: HootReplay.SignalData[float]):
                        self._camera_pose_est.timestamp = val.value
                     self._auto_replay = (
                        HootAutoReplay()
                        .with_struct(
                           "CameraPoseEst/pose",
                           # getter lambda returns the value to log
                           lambda: self._camera_pose_est.pose,
                           # setter lambda applies the value from the log
                           _set_camera_pose,
                        )
                        .with_double(
                           "CameraPoseEst/timestamp",
                           lambda: self._camera_pose_est.timestamp,
                           _set_camera_timestamp
                        )
                     )

                     # ...

                  def _fetch_inputs(self):
                     self._camera_pose_est = camera.getPoseEstimate()

                  def periodic(self):
                     if not utils.is_replay():
                        self._fetch_inputs()
                     # NEW: log the inputs on hardware/sim, and playback in replay
                     self._auto_replay.update()

                     # process inputs here...

   .. tab-item:: Manual (``HootReplay.get*()``)

      The ``fetchInputs()`` function should also log the inputs using ``SignalLogger``. Then, it is possible to implement a ``fetchInputsReplay()`` function, which should be called when ``Utils.isReplay()`` returns ``true``. This function would do the reverse of the regular ``fetchInputs()``, pulling out the data from ``HootReplay`` and saving it to the class member variables.

      For example, the previous ``Vision`` example would now have:

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
                     cameraPoseEst = camera.getPoseEstimate();

                     /* NEW: manually log the inputs */
                     SignalLogger.writeStruct("CameraPoseEst/pose", Pose2d.struct, cameraPoseEst.pose);
                     SignalLogger.writeDouble("CameraPoseEst/timestamp", cameraPoseEst.timestamp);
                  }

                  private void fetchInputsReplay() {
                     /* NEW: pull out inputs from the log */
                     final var cameraPoseEst_pose = HootReplay.getStruct("CameraPoseEst/pose", Pose2d.struct);
                     final var cameraPoseEst_timestamp = HootReplay.getDouble("CameraPoseEst/timestamp");

                     if (
                        cameraPoseEst_pose.status.isOK() &&
                        cameraPoseEst_timestamp.status.isOK()
                     ) {
                        cameraPoseEst = new PoseEstimate();
                        cameraPoseEst.pose = cameraPoseEst_pose.value;
                        cameraPoseEst.timestamp = cameraPoseEst_timestamp.value;
                     }
                  }

                  public void periodic() {
                     /* NEW: fetch the correct inputs based on if we're in replay */
                     if (Utils.isReplay()) {
                        fetchInputsReplay();
                     } else {
                        fetchInputs();
                     }

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
                     cameraPoseEst = camera.GetPoseEstimate();

                     /* NEW: manually log the inputs */
                     SignalLogger::WriteStruct<frc::Pose2d>("CameraPoseEst/pose", cameraPoseEst.pose);
                     SignalLogger::WriteValue("CameraPoseEst/timestamp", cameraPoseEst.timestamp);
                  }

                  void FetchInputsReplay()
                  {
                     /* NEW: pull out inputs from the log */
                     auto const cameraPoseEst_pose =
                        HootReplay::GetStruct<frc::Pose2d>("CameraPoseEst/pose");
                     auto const cameraPoseEst_timestamp =
                        HootReplay::GetValue<units::second_t>("CameraPoseEst/timestamp");

                     if (
                        cameraPoseEst_pose.status.IsOK() &&
                        cameraPoseEst_timestamp.status.IsOK()
                     ) {
                        cameraPoseEst = PoseEstimate{};
                        cameraPoseEst.pose = cameraPoseEst_pose.value.value();
                        cameraPoseEst.timestamp = cameraPoseEst_timestamp.value;
                     }
                  }

               public:
                  void Periodic()
                  {
                     /* NEW: fetch the correct inputs based on if we're in replay */
                     if (utils::IsReplay()) {
                        FetchInputsReplay();
                     } else {
                        FetchInputs();
                     }

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
                     self._camera_pose_est = camera.getPoseEstimate()

                     # NEW: manually log the inputs
                     SignalLogger.write_struct("CameraPoseEst/pose", Pose2d, self._camera_pose_est.pose)
                     SignalLogger.write_double("CameraPoseEst/timestamp", self._camera_pose_est.timestamp)

                  def _fetch_inputs_replay(self):
                     # NEW: pull out inputs from the log
                     camera_pose_est_pose = HootReplay.get_struct("CameraPoseEst/pose")
                     camera_pose_est_timestamp = HootReplay.get_double("CameraPoseEst/timestamp")

                     if (
                        camera_pose_est_pose.status.is_ok()
                        and camera_pose_est_timestamp.status.is_ok()
                     ):
                        self._camera_pose_est = PoseEstimate()
                        self._camera_pose_est.pose = camera_pose_est_pose.value
                        self._camera_pose_est.timestamp = camera_pose_est_timestamp.value

                  def periodic(self):
                     # NEW: fetch the correct inputs based on if we're in replay
                     if utils.is_replay():
                        self._fetch_inputs_replay()
                     else:
                        self._fetch_inputs()

                     # process inputs here...
