Swerve Requests
===============

Controlling the drivetrain is done via ``setControl(SwerveRequest request)`` (Java) which takes a given ``SwerveRequest`` (Java). ``SwerveRequest`` can either be defined by the user (only recommended in advanced scenarios!) or utilizing the existing requests.

Applying a Request
------------------

Requests are instantiated and then mutated via various ``withX`` functions. In the below example, a ``FieldCentric`` (Java) request is created and passed in joystick values.

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

.. note:: Users can optionally make their own ``SwerveRequests`` by implementing the ``SwerveRequest`` interface.
