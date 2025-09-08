Swerve Requests
===============

Controlling the drivetrain is done using ``setControl(SwerveRequest)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#setControl(com.ctre.phoenix6.swerve.SwerveRequest)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a6ec080fd2f6ce56ad0ade8845e64929e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.set_control>`__) which takes a given ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_swerve_request.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SwerveRequest>`__). There are multiple pre-defined ``SwerveRequest`` implementations that cover the majority of use cases. In some advanced scenarios, users can also define their own.

Applying a Request
------------------

Requests are instantiated once and then mutated using various ``withX`` functions. In the below example, a ``FieldCentric`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.FieldCentric.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_field_centric.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.FieldCentric>`__) request is created and given values from a joystick.

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

When using the command-based ``CommandSwerveDrivetrain`` generated by Tuner X, the ``applyRequst(Supplier<SwerveRequest>)`` method can instead be used to get a command that periodically applies the ``SwerveRequest`` returned by the lambda.

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
