Swerve Requests
===============

Controlling the drivetrain is done using ``setControl(SwerveRequest request)`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#setControl(com.ctre.phoenix6.mechanisms.swerve.SwerveRequest)>`__) which takes a given ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__). There are multiple pre-defined ``SwerveRequest`` implementations, or users can define their own (only recommended for advanced scenarios).

Applying a Request
------------------

Requests are instantiated once and then mutated using various ``withX`` functions. In the below example, a ``FieldCentric`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveRequest.FieldCentric.html>`__) request is created and given values from a joystick.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private final SwerveRequest.FieldCentric m_driveRequest = new SwerveRequest.FieldCentric()
            .withDeadband(MaxSpeed * 0.1).withRotationalDeadband(MaxAngularRate * 0.1) // Add a 10% deadband
            .withDriveRequestType(DriveRequestType.OpenLoopVoltage)
            .withSteerRequestType(SteerRequestType.MotionMagicExpo);

         private final XboxController m_joystick = new XboxController(0);
         public final SwerveDrivetrain m_drivetrain = TunerConstants.createDrivetrain();

         @Override
         public void teleopPeriodic() {
            m_drivetrain.setControl(
               m_driveRequest.withVelocityX(-joystick.getLeftY())
                  .withVelocityY(-joystick.getLeftX())
                  .withRotationalRate(-joystick.getRightX())
            );
         }

.. tip:: Users can optionally make their own ``SwerveRequests`` by implementing the ``SwerveRequest`` interface.
