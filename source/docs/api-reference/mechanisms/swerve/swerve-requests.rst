Swerve Requests
===============

Controlling the drivetrain is done by calling ``setControl(SwerveRequest)`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#setControl(com.ctre.phoenix6.swerve.SwerveRequest)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a6ec080fd2f6ce56ad0ade8845e64929e>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.set_control>`__) periodically, which takes a given ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_swerve_request.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SwerveRequest>`__). There are multiple pre-defined ``SwerveRequest`` implementations that cover the majority of use cases. In some advanced scenarios, users can also define their own.

Applying a Request
------------------

Requests are instantiated once and then mutated using various ``withX`` functions. In the example below, a ``FieldCentric`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.FieldCentric.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_field_centric.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.FieldCentric>`__) request is created and given values from a joystick.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private double MaxSpeed = TunerConstants.kSpeedAt12Volts.in(MetersPerSecond);
         private double MaxAngularRate = RotationsPerSecond.of(0.75).in(RadiansPerSecond);

         private final SwerveRequest.FieldCentric m_driveRequest = new SwerveRequest.FieldCentric()
            .withDeadband(MaxSpeed * 0.1).withRotationalDeadband(MaxAngularRate * 0.1) // Add a 10% deadband
            .withDriveRequestType(DriveRequestType.OpenLoopVoltage)
            .withSteerRequestType(SteerRequestType.MotionMagicExpo);

         private final XboxController m_joystick = new XboxController(0);
         public final TunerSwerveDrivetrain drivetrain = TunerConstants.createDrivetrain();

         @Override
         public void teleopPeriodic() {
            // Note that X is defined as forward according to WPILib convention,
            // and Y is defined as to the left according to WPILib convention.
            drivetrain.setControl(
               m_driveRequest.withVelocityX(-joystick.getLeftY() * MaxSpeed)
                  .withVelocityY(-joystick.getLeftX() * MaxSpeed)
                  .withRotationalRate(-joystick.getRightX() * MaxAngularRate)
            );
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         private:
            units::meters_per_second_t MaxSpeed = TunerConstants::kSpeedAt12Volts;
            units::radians_per_second_t MaxAngularRate = 0.75_tps;

            swerve::requests::FieldCentric m_driveRequest = swerve::requests::FieldCentric{}
               .WithDeadband(MaxSpeed * 0.1).WithRotationalDeadband(MaxAngularRate * 0.1) // Add a 10% deadband
               .WithDriveRequestType(swerve::DriveRequestType::OpenLoopVoltage)
               .WithSteerRequestType(swerve::SteerRequestType::MotionMagicExpo);

            frc::XboxController m_joystick{0};

         public:
            TunerSwerveDrivetrain drivetrain{TunerConstants::CreateDrivetrain()};

            void TeleopPeriodic() override
            {
               // Note that X is defined as forward according to WPILib convention,
               // and Y is defined as to the left according to WPILib convention.
               drivetrain.SetControl(
                  m_driveRequest.WithVelocityX(-joystick.GetLeftY() * MaxSpeed)
                     .WithVelocityY(-joystick.GetLeftX() * MaxSpeed)
                     .WithRotationalRate(-joystick.GetRightX() * MaxAngularRate)
               );
            }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self._max_speed = (
            TunerConstants.speed_at_12_volts
         )
         self._max_angular_rate = rotationsToRadians(
            0.75
         )

         self._drive_request = (
            swerve.requests.FieldCentric()
            .with_deadband(self._max_speed * 0.1)
            .with_rotational_deadband(
               self._max_angular_rate * 0.1
            )  # Add a 10% deadband
            .with_drive_request_type(
               swerve.SwerveModule.DriveRequestType.OPEN_LOOP_VOLTAGE
            )
            .with_steer_request_type(
               swerve.SwerveModule.SteerRequestType.MOTION_MAGIC_EXPO
            )
         )

         self._joystick = XboxController(0)
         self.drivetrain = TunerConstants.create_drivetrain()

         def teleopPeriodic():
            # Note that X is defined as forward according to WPILib convention,
            # and Y is defined as to the left according to WPILib convention.
            self.drivetrain.set_control(
               self._drive_request
               .with_velocity_x(
                  -self._joystick.getLeftY() * self._max_speed
               )
               .with_velocity_y(
                  -self._joystick.getLeftX() * self._max_speed
               )
               .with_rotational_rate(
                  -self._joystick.getRightX() * self._max_angular_rate
               )
            )

Command-Based
^^^^^^^^^^^^^

When using the command-based ``CommandSwerveDrivetrain`` generated by Tuner X, the ``applyRequest(Supplier<SwerveRequest>)`` method can instead be used to get a command that periodically applies the ``SwerveRequest`` returned by the lambda.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private double MaxSpeed = TunerConstants.kSpeedAt12Volts.in(MetersPerSecond);
         private double MaxAngularRate = RotationsPerSecond.of(0.75).in(RadiansPerSecond);

         private final SwerveRequest.FieldCentric m_driveRequest = new SwerveRequest.FieldCentric()
            .withDeadband(MaxSpeed * 0.1).withRotationalDeadband(MaxAngularRate * 0.1) // Add a 10% deadband
            .withDriveRequestType(DriveRequestType.OpenLoopVoltage)
            .withSteerRequestType(SteerRequestType.MotionMagicExpo);

         private final CommandXboxController m_joystick = new CommandXboxController(0);
         public final CommandSwerveDrivetrain drivetrain = TunerConstants.createDrivetrain();

         public void configureBindings() {
            // Note that X is defined as forward according to WPILib convention,
            // and Y is defined as to the left according to WPILib convention.
            drivetrain.setDefaultCommand(
               // Drivetrain will execute this command periodically
               drivetrain.applyRequest(() ->
                  m_driveRequest.withVelocityX(-joystick.getLeftY() * MaxSpeed)
                     .withVelocityY(-joystick.getLeftX() * MaxSpeed)
                     .withRotationalRate(-joystick.getRightX() * MaxAngularRate)
               )
            );

            // Idle while the robot is disabled. This ensures the configured
            // neutral mode is applied to the drive motors while disabled.
            final var idle = new SwerveRequest.Idle();
            RobotModeTriggers.disabled().whileTrue(
               drivetrain.applyRequest(() -> idle).ignoringDisable(true)
            );
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         private:
            units::meters_per_second_t MaxSpeed = TunerConstants::kSpeedAt12Volts;
            units::radians_per_second_t MaxAngularRate = 0.75_tps;

            swerve::requests::FieldCentric m_driveRequest = swerve::requests::FieldCentric{}
               .WithDeadband(MaxSpeed * 0.1).WithRotationalDeadband(MaxAngularRate * 0.1) // Add a 10% deadband
               .WithDriveRequestType(swerve::DriveRequestType::OpenLoopVoltage)
               .WithSteerRequestType(swerve::SteerRequestType::MotionMagicExpo);

            frc::XboxController m_joystick{0};

         public:
            subsystems::CommandSwerveDrivetrain drivetrain{TunerConstants::CreateDrivetrain()};

            void ConfigureBindings()
            {
               // Note that X is defined as forward according to WPILib convention,
               // and Y is defined as to the left according to WPILib convention.
               drivetrain.SetDefaultCommand(
                  // Drivetrain will execute this command periodically
                  drivetrain.ApplyRequest([this]() -> auto&& {
                     return m_driveRequest.WithVelocityX(-joystick.GetLeftY() * MaxSpeed)
                        .WithVelocityY(-joystick.GetLeftX() * MaxSpeed)
                        .WithRotationalRate(-joystick.GetRightX() * MaxAngularRate);
                  })
               );

               // Idle while the robot is disabled. This ensures the configured
               // neutral mode is applied to the drive motors while disabled.
               frc2::RobotModeTriggers::Disabled().WhileTrue(
                  drivetrain.ApplyRequest([] {
                     return swerve::requests::Idle{};
                  }).IgnoringDisable(true)
               );
            }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self._max_speed = (
            TunerConstants.speed_at_12_volts
         )
         self._max_angular_rate = rotationsToRadians(
            0.75
         )

         self._drive_request = (
            swerve.requests.FieldCentric()
            .with_deadband(self._max_speed * 0.1)
            .with_rotational_deadband(
               self._max_angular_rate * 0.1
            )  # Add a 10% deadband
            .with_drive_request_type(
               swerve.SwerveModule.DriveRequestType.OPEN_LOOP_VOLTAGE
            )
            .with_steer_request_type(
               swerve.SwerveModule.SteerRequestType.MOTION_MAGIC_EXPO
            )
         )

         self._joystick = CommandXboxController(0)
         self.drivetrain = TunerConstants.create_drivetrain()

         def configureButtonBindings() -> None:
            # Note that X is defined as forward according to WPILib convention,
            # and Y is defined as to the left according to WPILib convention.
            self.drivetrain.setDefaultCommand(
               # Drivetrain will execute this command periodically
               self.drivetrain.apply_request(
                  lambda: (
                     self._drive_request.with_velocity_x(
                        -self._joystick.getLeftY() * self._max_speed
                     )  # Drive forward with negative Y (forward)
                     .with_velocity_y(
                        -self._joystick.getLeftX() * self._max_speed
                     )  # Drive left with negative X (left)
                     .with_rotational_rate(
                        -self._joystick.getRightX() * self._max_angular_rate
                     )  # Drive counterclockwise with negative X (left)
                  )
               )
            )

            # Idle while the robot is disabled. This ensures the configured
            # neutral mode is applied to the drive motors while disabled.
            idle = swerve.requests.Idle()
            Trigger(DriverStation.isDisabled).whileTrue(
               self.drivetrain.apply_request(lambda: idle).ignoringDisable(True)
            )

Custom Swerve Requests
----------------------

In many cases, advanced control logic can live in the command applying the swerve request. For example, path following is typically implemented using a WPILib ``Command`` factory in the subsystem. Most path planning libraries generate the path setpoints in the main robot loop, and PID on the ``Pose2d`` must be run inline with setpoint generation.

However, there are some advanced cases where it is beneficial to run some of the control logic at the higher update frequency of the odometry thread. To accomplish that, users can define custom swerve requests by implementing the ``SwerveRequest`` interface.

In a custom swerve request, the control logic lives in the ``apply(...)`` method, which is called by the odometry thread.

.. important:: Custom swerve requests can have a performance cost compared to the native implementations. Additionally, the ``apply(...)`` method must be fast to avoid blocking odometry updates.

Swerve Requests with Composition
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To maximize performance and minimize duplicate code, most custom swerve requests should be built on top of existing ones. For example, the built-in ``FieldCentricFacingAngle`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.FieldCentricFacingAngle.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_field_centric_facing_angle.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.FieldCentricFacingAngle>`__) request uses a regular ``FieldCentric`` request under the hood, as demonstrated below.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private final FieldCentric m_fieldCentric = new FieldCentric();

         @Override
         public StatusCode apply(SwerveControlParameters parameters, SwerveModule<?, ?, ?>... modulesToApply) {
            Rotation2d angleToFace = TargetDirection;
            if (ForwardPerspective == ForwardPerspectiveValue.OperatorPerspective) {
               /* If we're operator perspective, rotate the direction we want to face by the angle */
               angleToFace = angleToFace.rotateBy(parameters.operatorForwardDirection);
            }

            double toApplyOmega = TargetRateFeedforward +
               HeadingController.calculate(
                  parameters.currentPose.getRotation().getRadians(),
                  angleToFace.getRadians(),
                  parameters.timestamp
               );

            /* The rest of the logic is the same as FieldCentric, so
             * set up and call FieldCentric's apply() method */
            return m_fieldCentric
               .withVelocityX(VelocityX)
               .withVelocityY(VelocityY)
               .withRotationalRate(toApplyOmega)
               .withDeadband(Deadband)
               .withRotationalDeadband(RotationalDeadband)
               .withCenterOfRotation(CenterOfRotation)
               .withDriveRequestType(DriveRequestType)
               .withSteerRequestType(SteerRequestType)
               .withDesaturateWheelSpeeds(DesaturateWheelSpeeds)
               .withForwardPerspective(ForwardPerspective)
               .apply(parameters, modulesToApply);
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         ctre::phoenix::StatusCode Apply(
            swerve::requests::SwerveRequest::ControlParameters const &parameters,
            std::span<std::unique_ptr<swerve::impl::SwerveModuleImpl> const> modulesToApply
         ) override {
            swerve::Rotation2d angleToFace = TargetDirection;
            if (ForwardPerspective == swerve::requests::ForwardPerspectiveValue::OperatorPerspective) {
               /* If we're operator perspective, rotate the direction we want to face by the angle */
               angleToFace = angleToFace.RotateBy(parameters.operatorForwardDirection);
            }

            units::radians_per_second_t toApplyOmega = TargetRateFeedforward +
               units::radians_per_second_t{HeadingController.Calculate(
                  parameters.currentPose.Rotation().Radians().value(),
                  angleToFace.Radians().value(),
                  parameters.timestamp
               )};

            /* The rest of the logic is the same as FieldCentric, so
             * set up and call FieldCentric's Apply() method */
            return swerve::requests::FieldCentric{}
               .WithVelocityX(VelocityX)
               .WithVelocityY(VelocityY)
               .WithRotationalRate(toApplyOmega)
               .WithDeadband(Deadband)
               .WithRotationalDeadband(RotationalDeadband)
               .WithCenterOfRotation(CenterOfRotation)
               .WithDriveRequestType(DriveRequestType)
               .WithSteerRequestType(SteerRequestType)
               .WithDesaturateWheelSpeeds(DesaturateWheelSpeeds)
               .WithForwardPerspective(ForwardPerspective)
               .Apply(parameters, modulesToApply);
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         def __init__(self):
            # ...
            self.__field_centric = FieldCentric()

         def apply(
            self,
            parameters: swerve.SwerveControlParameters,
            modules_to_apply: list[swerve.SwerveModule]
         ) -> StatusCode:
            angle_to_face = self.target_direction
            if self.forward_perspective is swerve.requests.ForwardPerspectiveValue.OPERATOR_PERSPECTIVE:
               # If we're operator perspective, rotate the direction we want to face by the angle
               angle_to_face = angle_to_face.rotateBy(parameters.operator_forward_direction)

            to_apply_omega = self.target_rate_feedforward + self.heading_controller.calculate(
               parameters.current_pose.rotation().radians(),
               angle_to_face.radians(),
               parameters.timestamp
            )

            # The rest of the logic is the same as FieldCentric, so
            # set up and call FieldCentric's apply() method
            return (
               self.__field_centric
               .with_velocity_x(self.velocity_x)
               .with_velocity_y(self.velocity_y)
               .with_rotational_rate(to_apply_omega)
               .with_deadband(self.deadband)
               .with_rotational_deadband(self.rotational_deadband)
               .with_center_of_rotation(self.center_of_rotation)
               .with_drive_request_type(self.drive_request_type)
               .with_steer_request_type(self.steer_request_type)
               .with_desaturate_wheel_speeds(self.desaturate_wheel_speeds)
               .with_forward_perspective(self.forward_perspective)
               .apply(parameters, modules_to_apply)
            )

Swerve Requests with Module Targets
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a few cases, none of the existing swerve request implementations may be suitable for the desired request. For example, there is no built-in swerve request that directly accepts an array of ``SwerveModuleState`` instances. In that situation, the custom swerve request can call ``apply(SwerveModule.ModuleRequest)`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveModule.html#apply(com.ctre.phoenix6.swerve.SwerveModule.ModuleRequest)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_module.html#a0854ceb97e3de9bbdb21f5690533bf49>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/swerve_module/index.html#phoenix6.swerve.swerve_module.SwerveModule.apply>`__) on each ``SwerveModule`` instance provided to the ``apply(...)`` method.

Note, however, that this can **negatively impact performance** of the robot, both in terms of loop times and control accuracy, compared to reusing the built-in requests. As a result, we recommend converting to supported types, such as ``ChassisSpeeds``, and reusing existing swerve requests, such as ``ApplyFieldSpeeds`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.ApplyFieldSpeeds.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_apply_field_speeds.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.ApplyFieldSpeeds>`__), whenever possible.

.. warning:: We recommend against using a custom swerve request for the WPILib ``SwerveControllerCommand``, as it does not follow modern WPILib best practices. Instead, the command can be `reimplemented as a command factory <https://www.chiefdelphi.com/t/example-of-wpilib-swervecontrollercommand-following-trajectory-with-ctre-generated-commandswervedrivetrain/502566/2>`__ using ``ApplyFieldSpeeds`` to maximize performance.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         public class ApplyModuleStates implements SwerveRequest {
            public SwerveModuleState[] ModuleStates = new SwerveModuleState[0];

            @Override
            public StatusCode apply(SwerveControlParameters parameters, SwerveModule<?, ?, ?>... modulesToApply) {
               var moduleRequest = new SwerveModule.ModuleRequest()
                  .withUpdatePeriod(parameters.updatePeriod);
               for (int i = 0; i < modulesToApply.length && i < ModuleStates.length; ++i) {
                  /* apply the SwerveModuleState to the module */
                  modulesToApply[i].apply(moduleRequest.withState(ModuleStates[i]));
               }
            }
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         struct ApplyModuleStates : public swerve::requests::SwerveRequest {
            std::vector<SwerveModuleState> ModuleStates;

            ctre::phoenix::StatusCode Apply(
               swerve::requests::SwerveRequest::ControlParameters const &parameters,
               std::span<std::unique_ptr<swerve::impl::SwerveModuleImpl> const> modulesToApply
            ) override {
               auto moduleRequest = impl::SwerveModuleImpl::ModuleRequest{}
                  .WithUpdatePeriod(parameters.updatePeriod);
               for (size_t i = 0; i < modulesToApply.size() && i < ModuleStates.size(); ++i) {
                  /* apply the SwerveModuleState to the module */
                  modulesToApply[i]->Apply(moduleRequest.WithState(ModuleStates[i]));
               }
            }
         };

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         class ApplyModuleStates(swerve.requests.SwerveRequest):
            def __init__(self):
               self.module_states: list[SwerveModuleState] = []

            def apply(
               self,
               parameters: swerve.SwerveControlParameters,
               modules_to_apply: list[swerve.SwerveModule]
            ) -> StatusCode:
               module_request = (
                  SwerveModule.ModuleRequest()
                  .with_update_period(parameters.update_period)
               )
               for (module, state) in zip(modules_to_apply, self.module_states):
                  # apply the SwerveModuleState to the module
                  module.apply(module_request.with_state(state))
               }
            }

Swerve Requests with Direct Control
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Swerve modules by default have some built-in control optimizations and support a limited set of control types. However, for something like the built-in SysId swerve requests, such high-level control may not be desirable.

As a result, ``SwerveModule`` also has ``apply(ControlRequest drive, ControlRequest steer)`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveModule.html#apply(com.ctre.phoenix6.controls.ControlRequest,com.ctre.phoenix6.controls.ControlRequest)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_module.html#a9934b2dbfab94111fc821eb26fe65238>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/swerve_module/index.html#phoenix6.swerve.swerve_module.SwerveModule.apply>`__) to directly apply control requests to the drive and steer motors. For example, the built-in ``SysIdSwerveSteerGains`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.SysIdSwerveSteerGains.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_sys_id_swerve_steer_gains.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SysIdSwerveSteerGains>`__) request directly applies a ``CoastOut`` to the drive motor and a ``VoltageOut`` to the steer motor.

.. important:: We recommend **against** using this strategy in competition code, as it does not benefit from the built-in control optimizations.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private final CoastOut m_driveRequest = new CoastOut();
         private final VoltageOut m_steerRequest = new VoltageOut(0);

         @Override
         public StatusCode apply(SwerveControlParameters parameters, SwerveModule<?, ?, ?>... modulesToApply) {
            for (int i = 0; i < modulesToApply.length; ++i) {
               /* directly apply the control requests to the drive and steer motors */
               modulesToApply[i].apply(m_driveRequest, m_steerRequest.withOutput(VoltsToApply));
            }
            return StatusCode.OK;
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         ctre::phoenix::StatusCode Apply(
            SwerveRequest::ControlParameters const &parameters,
            std::span<std::unique_ptr<impl::SwerveModuleImpl> const> modulesToApply
         ) override {
            for (size_t i = 0; i < modulesToApply.size(); ++i) {
               /* directly apply the control requests to the drive and steer motors */
               modulesToApply[i]->Apply(controls::CoastOut{}, controls::VoltageOut{VoltsToApply});
            }
            return ctre::phoenix::StatusCode::OK;
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         def __init__(self):
            # ...
            self.__drive_request = CoastOut()
            self.__steer_request = VoltageOut(0)

         def apply(
            self,
            parameters: swerve.SwerveControlParameters,
            modules_to_apply: list[swerve.SwerveModule]
         ) -> StatusCode:
            for module in modules_to_apply:
               # directly apply the control requests to the drive and steer motors
               module.apply(
                  self.__drive_request,
                  self.__steer_request.with_output(self.volts_to_apply)
               )
            return StatusCode.OK
