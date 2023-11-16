Swerve Requests
===============

Controlling the drivetrain is done using ``setControl(SwerveRequest request)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveDrivetrain.html#setControl(com.ctre.phoenix6.mechanisms.swerve.SwerveRequest)>`__) which takes a given ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveRequest.html>`__). There are multiple pre-defined ``SwerveRequest`` implementations, or users can define their own (only recommended for advanced scenarios).

Applying a Request
------------------

Requests are instantiated once and then mutated using various ``withX`` functions. In the below example, a ``FieldCentric`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveRequest.FieldCentric.html>`__) request is created and given values from a joystick.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         SwerveDrivetrain m_drivetrain = TunerConstants.DriveTrain;
         SwerveRequest.FieldCentric m_driveRequest = new SwerveRequest.FieldCentric()
            .withIsOpenLoop(true);

         XboxController m_joystick = new XboxController(0);

         @Override
         public void teleopPeriodic() {
            m_drivetrain.setControl(
               m_driveRequest.withVelocityX(-joystick.getLeftY())
                  .withVelocityY(-joystick.getLeftX())
                  .withRotationalRate(-joystick.getRightX())
            );

.. tip:: Users can optionally make their own ``SwerveRequests`` by implementing the ``SwerveRequest`` interface.
