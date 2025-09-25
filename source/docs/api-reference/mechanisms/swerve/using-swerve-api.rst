Using the Swerve Drivetrain
===========================

In addition to :doc:`control </docs/api-reference/mechanisms/swerve/swerve-requests>` and :doc:`simulation </docs/api-reference/mechanisms/swerve/swerve-simulation>`,  the ``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html>`__) has many other APIs to manage the built-in pose estimator, telemetry, and more.

Changing Neutral Mode
---------------------

The neutral mode of the drive motors can be reconfigured at runtime using ``configNeutralMode`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#configNeutralMode(com.ctre.phoenix6.signals.NeutralModeValue,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a9499b6aad63e67db4212215b14e8dc8a>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.config_neutral_mode>`__).

.. tip:: The neutral mode can be applied on construction by modifying the ``DriveMotorInitialConfigs`` and ``SteerMotorInitialConfigs`` provided to the ``SwerveModuleConstants``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // The drivetrain was constructed in brake mode, switch to coast
         drivetrain.configNeutralMode(NeutralModeValue.Coast);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // The drivetrain was constructed in brake mode, switch to coast
         drivetrain.ConfigNeutralMode(signals::NeutralModeValue::Coast);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # The drivetrain was constructed in brake mode, switch to coast
         self.drivetrain.config_neutral_mode(signals.NeutralModeValue.COAST)

Using Field-Centric Control
---------------------------

In field-centric control, the robot is driven using velocities relative to the field. This makes it so the forward direction is constant (typically away from the driver) regardless of the robot orientation. There are two common field coordinate systems: `Blue Alliance Perspective <https://docs.wpilib.org/en/stable/docs/software/basic-programming/coordinate-system.html#always-blue-origin>`__ (which are absolute coordinates) and `Operator Perspective <https://docs.wpilib.org/en/stable/docs/software/basic-programming/coordinate-system.html#origin-follows-your-alliance>`__ (which are alliance-relative coordinates).

For field-centric control to behave correctly, the drivetrain needs to know which directions the driver and the robot are facing.

Setting the Operator Perspective
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``OperatorPerspective`` is typically used during teleop control, ensuring that forward (+X) is always away from the driver. The forward direction for ``OperatorPerspective`` can be set using ``setOperatorPerspectiveForward`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#setOperatorPerspectiveForward(edu.wpi.first.math.geometry.Rotation2d)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a02160b893a7ef024e066810062461130>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.set_operator_perspective_forward>`__). This tells the drivetrain which direction the **driver** is facing.

Looking at the Blue Alliance Perspective coordinates, facing away from the **blue alliance** is a heading of **0 degrees**. On the other hand, the red alliance is flipped, so facing away from the **red alliance** is a heading of **180 degrees**.

.. important:: When using ``CommandSwerveDrivetrain`` from our examples or Tuner X, this is already handled by the subsystem.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         /* Blue alliance sees forward as 0 degrees (toward red alliance wall) */
         private static final Rotation2d kBlueAlliancePerspectiveRotation = Rotation2d.kZero;
         /* Red alliance sees forward as 180 degrees (toward blue alliance wall) */
         private static final Rotation2d kRedAlliancePerspectiveRotation = Rotation2d.k180deg;
         /* Keep track if we've ever applied the operator perspective before or not */
         private boolean m_hasAppliedOperatorPerspective = false;

         @Override
         public void periodic() {
            // Periodically try to apply the operator perspective
            // if we haven't yet or if we're currently disabled.
            if (!m_hasAppliedOperatorPerspective || DriverStation.isDisabled()) {
               DriverStation.getAlliance().ifPresent(allianceColor -> {
                  setOperatorPerspectiveForward(
                     allianceColor == Alliance.Red
                        ? kRedAlliancePerspectiveRotation
                        : kBlueAlliancePerspectiveRotation
                  );
                  m_hasAppliedOperatorPerspective = true;
               });
            }
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         /* Blue alliance sees forward as 0 degrees (toward red alliance wall) */
         static constexpr frc::Rotation2d kBlueAlliancePerspectiveRotation{0_deg};
         /* Red alliance sees forward as 180 degrees (toward blue alliance wall) */
         static constexpr frc::Rotation2d kRedAlliancePerspectiveRotation{180_deg};
         /* Keep track if we've ever applied the operator perspective before or not */
         bool m_hasAppliedOperatorPerspective = false;

         void Periodic() override
         {
            // Periodically try to apply the operator perspective
            // if we haven't yet or if we're currently disabled.
            if (!m_hasAppliedOperatorPerspective || frc::DriverStation::IsDisabled()) {
               auto const allianceColor = frc::DriverStation::GetAlliance();
               if (allianceColor) {
                  SetOperatorPerspectiveForward(
                     *allianceColor == frc::DriverStation::Alliance::kRed
                        ? kRedAlliancePerspectiveRotation
                        : kBlueAlliancePerspectiveRotation
                  );
                  m_hasAppliedOperatorPerspective = true;
               }
            }
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         _BLUE_ALLIANCE_PERSPECTIVE_ROTATION = Rotation2d.fromDegrees(0)
         """Blue alliance sees forward as 0 degrees (toward red alliance wall)"""
         _RED_ALLIANCE_PERSPECTIVE_ROTATION = Rotation2d.fromDegrees(180)
         """Red alliance sees forward as 180 degrees (toward blue alliance wall)"""

         def __init__(self, ...):
            # ...

            self._has_applied_operator_perspective = False
            """Keep track if we've ever applied the operator perspective before or not"""

         def periodic(self):
            # Periodically try to apply the operator perspective
            # if we haven't yet or if we're currently disabled.
            if not self._has_applied_operator_perspective or DriverStation.isDisabled():
               alliance_color = DriverStation.getAlliance()
               if alliance_color is not None:
                  self.set_operator_perspective_forward(
                     self._RED_ALLIANCE_PERSPECTIVE_ROTATION
                     if alliance_color == DriverStation.Alliance.kRed
                     else self._BLUE_ALLIANCE_PERSPECTIVE_ROTATION
                  )
                  self._has_applied_operator_perspective = True

Setting the Robot Heading
^^^^^^^^^^^^^^^^^^^^^^^^^

After setting the operator perspective, the drivetrain also needs to know which direction the **robot** is facing.

.. note:: Many path planning libraries automatically reset the full pose of the robot, including heading, at the start of the path.

.. tab-set::

   .. tab-item:: Current Direction is Forward

      If the robot is currently facing the driver's forward direction, call ``seedFieldCentric()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#seedFieldCentric()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#aa01af83b6fce4848164681a80cdff9d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.seed_field_centric>`__) to reset the heading.

      .. tip:: The Tuner X generated swerve project and our examples bind ``seedFieldCentric()`` to the left bumper.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Reset the field-centric heading on left bumper press.
               joystick.leftBumper().onTrue(drivetrain.runOnce(drivetrain::seedFieldCentric));

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // reset the field-centric heading on left bumper press
               joystick.LeftBumper().OnTrue(drivetrain.RunOnce([this] { drivetrain.SeedFieldCentric(); }));

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # reset the field-centric heading on left bumper press
               self._joystick.leftBumper().onTrue(
                  self.drivetrain.runOnce(self.drivetrain.seed_field_centric)
               )

   .. tab-item:: Angle Relative to Forward

      If the robot is facing some other angle relative to the driver's forward direction, call ``seedFieldCentric(Rotation2d)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#seedFieldCentric(edu.wpi.first.math.geometry.Rotation2d)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#aa01af83b6fce4848164681a80cdff9d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.seed_field_centric>`__) with the relative angle. For example, if the robot is facing left, then pass in an angle of +90 degrees (counter-clockwise).

      .. tip:: The Tuner X generated swerve project calls ``seedFieldCentric(Rotation2d)`` at the start of the default autonomous command.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Reset the field-centric heading so the robot is facing left (90 deg CCW)
               drivetrain.seedFieldCentric(Rotation2d.kCCW_90deg);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Reset the field-centric heading so the robot is facing left (+90 deg)
               drivetrain.SeedFieldCentric(frc::Rotation2d{90_deg});

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Reset the field-centric heading so the robot is facing left (+90 deg)
               self.drivetrain.seed_field_centric(Rotation2d.fromDegrees(90))

   .. tab-item:: Blue Alliance Heading or Pose

      When using a path planning library such as `PathPlanner <https://pathplanner.dev/home.html>`__ or `Choreo <https://choreo.autos/>`__, the paths often operate using the ``BlueAlliancePerspective`` and reset the robot's pose at the start of the path. Vision libraries similarly often operate using a ``BlueAlliancePerspective`` heading or pose.

      The robot's heading can be reset to a ``BlueAlliancePerspective`` heading using ``resetRotation(Rotation2d)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#resetRotation(edu.wpi.first.math.geometry.Rotation2d)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#acf58aeda0ae278488522db3369e867d5>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.reset_rotation>`__), and the pose can be reset using ``resetPose(Pose2d)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#resetPose(edu.wpi.first.math.geometry.Pose2d)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#aad3c77c2ae4b899b5812d64dfab06441>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.reset_pose>`__).

      .. tip:: PathPlanner and Choreo can call ``resetPose`` automatically at the start of the autonomous path.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Reset the robot's heading to 0 deg (away from the Blue Alliance wall)
               drivetrain.resetRotation(Rotation2d.kZero);

            .. code-block:: java

               // Reset the robot's pose to the initial pose of the autonomous path
               drivetrain.resetPose(initialPose);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Reset the robot's heading to 0 deg (away from the Blue Alliance wall)
               drivetrain.ResetRotation(frc::Rotation2d{});

            .. code-block:: cpp

               // Reset the robot's pose to the initial pose of the autonomous path
               drivetrain.ResetPose(initialPose);

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Reset the robot's heading to 0 deg (away from the Blue Alliance wall)
               drivetrain.reset_rotation(Rotation2d())

            .. code-block:: python

               # Reset the robot's pose to the initial pose of the autonomous path
               self.drivetrain.reset_pose(initial_pose)

Odometry and State
------------------

The ``SwerveDrivetrain`` has a built-in pose estimator running on a separate odometry thread (250 Hz on CANivore, 100 Hz on roboRIO). This significantly improves the accuracy and consistency of odometry and robot pose estimation.

Information about the robot's state can be retrieved using ``getState()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#getState()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a99c975ed34851ceca41108fbf13fee36>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.get_state>`__), and a thread-safe copy can be retrieved using ``getStateCopy()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#getStateCopy()>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.get_state_copy>`__). This returns a ``SwerveDriveState`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.SwerveDriveState.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1impl_1_1_swerve_drivetrain_impl_1_1_swerve_drive_state.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.SwerveDriveState>`__) instance that includes information such as the pose estimate, module states, and chassis speeds.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var state = drivetrain.getState();
         // pull out the pose estimate and chassis speeds
         Pose2d pose = state.Pose;
         ChassisSpeeds speeds = state.Speeds;

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto state = drivetrain.GetState();
         // pull out the pose estimate and chassis speeds
         frc::Pose2d pose = state.Pose;
         frc::ChassisSpeeds speeds = state.Speeds;

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         state = self.drivetrain.get_state()
         # pull out the pose estimate and chassis speeds
         pose = state.pose
         speeds = state.speeds

Drivetrain Telemetry
^^^^^^^^^^^^^^^^^^^^

The state of the drivetrain can also be telemeterized inline with odometry updates, ensuring that all information is captured in logs. A telemetry function that accepts the latest ``SwerveDriveState`` as a parameter can be registered using ``registerTelemetry`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#registerTelemetry(java.util.function.Consumer)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#aee1a2a756c0e0e6ecbbded9926e24667>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.register_telemetry>`__).

.. tip:: The Tuner X generated swerve project and our examples have a ``Telemetry`` class that is already registered with the drivetrain.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         public Robot() {
            drivetrain.registerTelemetry(this::telemeterize);
         }

         /** Accept the swerve drive state and telemeterize it to SignalLogger. */
         public void telemeterize(SwerveDriveState state) {
            SignalLogger.writeStruct("DriveState/Pose", Pose2d.struct, state.Pose);
            SignalLogger.writeStruct("DriveState/Speeds", ChassisSpeeds.struct, state.Speeds);
            SignalLogger.writeStructArray("DriveState/ModuleStates", SwerveModuleState.struct, state.ModuleStates);
            SignalLogger.writeStructArray("DriveState/ModuleTargets", SwerveModuleState.struct, state.ModuleTargets);
            SignalLogger.writeStructArray("DriveState/ModulePositions", SwerveModulePosition.struct, state.ModulePositions);
            SignalLogger.writeDouble("DriveState/OdometryPeriod", state.OdometryPeriod, "seconds");
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         Robot()
         {
            drivetrain.RegisterTelemetry(
               [this](auto const &state) { Telemeterize(state); }
            );
         }

         /** Accept the swerve drive state and telemeterize it to SignalLogger. */
         void Telemeterize(subsystems::TunerSwerveDrivetrain::SwerveDriveState const &state)
         {
            SignalLogger::WriteStruct("DriveState/Pose", state.Pose);
            SignalLogger::WriteStruct("DriveState/Speeds", state.Speeds);
            SignalLogger::WriteStructArray<frc::SwerveModuleState>("DriveState/ModuleStates", state.ModuleStates);
            SignalLogger::WriteStructArray<frc::SwerveModuleState>("DriveState/ModuleTargets", state.ModuleTargets);
            SignalLogger::WriteStructArray<frc::SwerveModulePosition>("DriveState/ModulePositions", state.ModulePositions);
            SignalLogger::WriteValue("DriveState/OdometryPeriod", state.OdometryPeriod);
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         def __init__(self):
            # ...
            self.drivetrain.register_telemetry(self.telemeterize)

         def telemeterize(self, state: swerve.SwerveDrivetrain.SwerveDriveState):
            """
            Accept the swerve drive state and telemeterize it to SignalLogger.
            """
            SignalLogger.write_struct(
               "DriveState/Pose", Pose2d, state.pose
            )
            SignalLogger.write_struct(
               "DriveState/Speeds", ChassisSpeeds, state.speeds
            )
            SignalLogger.write_struct_array(
                  "DriveState/ModuleStates", SwerveModuleState, state.module_states
            )
            SignalLogger.write_struct_array(
                  "DriveState/ModuleTargets", SwerveModuleState, state.module_targets
            )
            SignalLogger.write_struct_array(
                  "DriveState/ModulePositions", SwerveModulePosition, state.module_positions
            )
            SignalLogger.write_double(
                  "DriveState/OdometryPeriod", state.odometry_period, "seconds"
            )

.. TODO: Vision pose integration, Methods of control using vision
