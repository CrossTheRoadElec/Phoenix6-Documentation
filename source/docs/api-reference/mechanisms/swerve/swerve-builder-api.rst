Swerve Builder API
==================

To simplify the API surface, both `builder and factory <https://stackoverflow.com/questions/757743/what-is-the-difference-between-builder-design-pattern-and-factory-design-pattern>`__ paradigms are used. Users create a ``SwerveDrivetrain`` by first defining the global drivetrain characteristics and then each module characteristics.

Defining Drivetrain Characteristics
-----------------------------------

Drivetrain, in this instance, refers to the ``SwerveDrivetrainConstants`` class (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveDrivetrainConstants.html>`__). This class defines characteristics that are not module specific. Mandatory parameters include ``.withPigeon2Id()``.

``SwerveDrivetrainConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
            .withPigeon2Id(kPigeonId)
            .withCANbusName(kCANbusName);

Defining Module Characteristics
-------------------------------

The typical FRC drivetrain includes 4 identical modules. To simplify module creation, there exists a ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveModuleConstantsFactory.html>`__) class to simplify module creation.

Mandatory parameters for this factory are:

* ``withDriveMotorGearRatio()`` - Gearing between the drive motor output shaft and the wheel.
* ``withSteerMotorGearRatio()`` - Gearing between the steer motor output shaft and the azimuth gear.
* ``withWheelRadius()`` - Radius of the wheel in inches.
* ``withSteerMotorGains()`` - Instance of ``Slot0Configs``, closed-loop gains for the steering motor.
* ``withDriveMotorGains()`` - Instance of ``Slot0Configs``, closed-loop gains for the drive motor.
* ``withSteerMotorClosedLoopOutput()`` - The ``ClosedLoopOutputType`` to use for steer motor closed-loop control requests.
* ``withDriveMotorClosedLoopOutput()`` - The ``ClosedLoopOutputType`` to use for drive motor closed-loop control requests.
* ``withSpeedAt12VoltsMps()`` - Required for open-loop control, theoretical free speed (m/s) at 12v applied output.
* ``withFeedbackSource()`` - Instance of ``SteerFeedbackType``. Typically ``FusedCANcoder`` (requires Pro) or ``RemoteCANcoder``.

For functional simulation, the following additional parameters **must** be defined.

* ``withSteerInertia()``
* ``withDriveInertia()``

For a full reference of the available functions, see the API documentation of ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveModuleConstantsFactory.html>`__).

``SwerveModuleConstantsFactory`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private static final SwerveModuleConstantsFactory ConstantCreator = new SwerveModuleConstantsFactory()
            .withDriveMotorGearRatio(kDriveGearRatio)
            .withSteerMotorGearRatio(kSteerGearRatio)
            .withWheelRadius(kWheelRadiusInches)
            .withSlipCurrent(kSlipCurrentA)
            .withSteerMotorGains(steerGains)
            .withDriveMotorGains(driveGains)
            .withSteerMotorClosedLoopOutput(steerClosedLoopOutput)
            .withDriveMotorClosedLoopOutput(driveClosedLoopOutput)
            .withSpeedAt12VoltsMps(kSpeedAt12VoltsMps)
            .withSteerInertia(kSteerInertia)
            .withDriveInertia(kDriveInertia)
            .withFeedbackSource(SteerFeedbackType.FusedCANcoder)
            .withCouplingGearRatio(kCoupleRatio)
            .withSteerMotorInverted(kSteerMotorReversed);

Additional Constants
^^^^^^^^^^^^^^^^^^^^

In the previous section, several optional constants are defined. These constants are not mandatory for usable swerve, but they can greatly increase swerve controllability and accuracy.

``CouplingGearRatio``
  The ratio at which the output wheel rotates when the azimuth spins. In a traditional swerve module, this is the inverse of the 1st stage of the drive motor.

  To manually determine the coupling ratio, lock the drive wheel in-place, then rotate the azimuth three times. Observe the number of rotations reported by the drive motor. The coupling ratio will be :math:`driveRotations / 3`, or :math:`driveRotations / azimuthRotations`.

``SlipCurrent``
  This is the amount of stator current the drive motors can apply without slippage. This can be found by placing the robot against a solid wall and slowly increase the output voltage. As the output voltage increases, :ref:`plot <docs/tuner/plotting:plotting>` the drive wheel velocity and stator current. Observe when the drive wheel velocity starts to rise (wheel is slipping) and at what stator current this begins.

Building the Swerve Module Constants
------------------------------------

``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveModuleConstants.html>`__) can be derived, or created, from the previous ``SwerveModuleConstantsFactory``. A typical swerve drivetrain consists of four identical modules: Front Left, Front Right, Back Left, Back Right. While these modules can be instantiated directly (only really useful if the modules have different physical characteristics), the modules can also be created by calling ``createModuleConstants()`` with the aforementioned factory.

Calling ``createModuleConstants()`` takes the following arguments:

* Steer Motor ID
* Drive Motor ID
* Steer Encoder ID
* Steer Encoder Offset
* X position in meters
* Y position in meters
* Whether the drive motor is reversed

.. note:: The X and Y position of the modules is measured from the center point of the robot along the X and Y axes, respectively. These values use the same coordinate system as ``Translation2d`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/math/geometry/Translation2d.html>`__), where forward is positive X and left is positive Y.

``SwerveModuleConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private static final SwerveModuleConstants FrontLeft = ConstantCreator.createModuleConstants(
            kFrontLeftSteerMotorId, kFrontLeftDriveMotorId, kFrontLeftEncoderId, kFrontLeftEncoderOffset, Units.inchesToMeters(kFrontLeftXPosInches), Units.inchesToMeters(kFrontLeftYPosInches), kInvertLeftSide);
         private static final SwerveModuleConstants FrontRight = ConstantCreator.createModuleConstants(
            kFrontRightSteerMotorId, kFrontRightDriveMotorId, kFrontRightEncoderId, kFrontRightEncoderOffset, Units.inchesToMeters(kFrontRightXPosInches), Units.inchesToMeters(kFrontRightYPosInches), kInvertRightSide);
         private static final SwerveModuleConstants BackLeft = ConstantCreator.createModuleConstants(
            kBackLeftSteerMotorId, kBackLeftDriveMotorId, kBackLeftEncoderId, kBackLeftEncoderOffset, Units.inchesToMeters(kBackLeftXPosInches), Units.inchesToMeters(kBackLeftYPosInches), kInvertLeftSide);
         private static final SwerveModuleConstants BackRight = ConstantCreator.createModuleConstants(
            kBackRightSteerMotorId, kBackRightDriveMotorId, kBackRightEncoderId, kBackRightEncoderOffset, Units.inchesToMeters(kBackRightXPosInches), Units.inchesToMeters(kBackRightYPosInches), kInvertRightSide);

Building the ``SwerveDrivetrain``
---------------------------------

.. note:: ``CommandSwerveDrivetrain`` is a version created by the Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` that implements ``Subsystem`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj2/command/Subsystem.html>`__) for easy command-based integration.

``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/SwerveDrivetrain.html>`__) is the class that handles odometry, configuration and control of the drivetrain. The constructor for this class takes the previous ``SwerveDrivetrainConstants`` and a list of ``SwerveModuleConstants``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public static final CommandSwerveDrivetrain DriveTrain = new CommandSwerveDrivetrain(DrivetrainConstants, FrontLeft,
            FrontRight, BackLeft, BackRight);

Utilization of ``SwerveDrivetrain`` consists of ``SwerveRequests`` that define the state of the drivetrain. For full details of using ``SwerveRequests`` to control your swerve, see :doc:`/docs/api-reference/mechanisms/swerve/swerve-requests`.

Full Example
------------

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // Both sets of gains need to be tuned to your individual robot.

         // The steer motor uses any SwerveModule.SteerRequestType control request with the
         // output type specified by SwerveModuleConstants.SteerMotorClosedLoopOutput
         private static final Slot0Configs steerGains = new Slot0Configs()
            .withKP(100).withKI(0).withKD(0.2)
            .withKS(0).withKV(1.5).withKA(0);
         // When using closed-loop control, the drive motor uses the control
         // output type specified by SwerveModuleConstants.DriveMotorClosedLoopOutput
         private static final Slot0Configs driveGains = new Slot0Configs()
            .withKP(3).withKI(0).withKD(0)
            .withKS(0).withKV(0).withKA(0);

         // The closed-loop output type to use for the steer motors;
         // This affects the PID/FF gains for the steer motors
         private static final ClosedLoopOutputType steerClosedLoopOutput = ClosedLoopOutputType.Voltage;
         // The closed-loop output type to use for the drive motors;
         // This affects the PID/FF gains for the drive motors
         private static final ClosedLoopOutputType driveClosedLoopOutput = ClosedLoopOutputType.TorqueCurrentFOC;

         // The stator current at which the wheels start to slip;
         // This needs to be tuned to your individual robot
         private static final double kSlipCurrentA = 300.0;

         // Theoretical free speed (m/s) at 12v applied output;
         // This needs to be tuned to your individual robot
         private static final double kSpeedAt12VoltsMps = 6.0;

         // Every 1 rotation of the azimuth results in kCoupleRatio drive motor turns;
         // This may need to be tuned to your individual robot
         private static final double kCoupleRatio = 3.5;

         private static final double kDriveGearRatio = 6.75;
         private static final double kSteerGearRatio = 15.43;
         private static final double kWheelRadiusInches = 2;

         private static final boolean kSteerMotorReversed = false;
         private static final boolean kInvertLeftSide = false;
         private static final boolean kInvertRightSide = true;

         private static final String kCANbusName = "drivetrain";
         private static final int kPigeonId = 1;


         // These are only used for simulation
         private static double kSteerInertia = 0.00001;
         private static double kDriveInertia = 0.001;

         private static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
               .withPigeon2Id(kPigeonId)
               .withCANbusName(kCANbusName);

         private static final SwerveModuleConstantsFactory ConstantCreator = new SwerveModuleConstantsFactory()
               .withDriveMotorGearRatio(kDriveGearRatio)
               .withSteerMotorGearRatio(kSteerGearRatio)
               .withWheelRadius(kWheelRadiusInches)
               .withSlipCurrent(kSlipCurrentA)
               .withSteerMotorGains(steerGains)
               .withDriveMotorGains(driveGains)
               .withSteerMotorClosedLoopOutput(steerClosedLoopOutput)
               .withDriveMotorClosedLoopOutput(driveClosedLoopOutput)
               .withSpeedAt12VoltsMps(kSpeedAt12VoltsMps)
               .withSteerInertia(kSteerInertia)
               .withDriveInertia(kDriveInertia)
               .withFeedbackSource(SteerFeedbackType.FusedCANcoder)
               .withCouplingGearRatio(kCoupleRatio)
               .withSteerMotorInverted(kSteerMotorReversed);


         // Front Left
         private static final int kFrontLeftDriveMotorId = 1;
         private static final int kFrontLeftSteerMotorId = 0;
         private static final int kFrontLeftEncoderId = 0;
         private static final double kFrontLeftEncoderOffset = -0.75;

         private static final double kFrontLeftXPosInches = 10.5;
         private static final double kFrontLeftYPosInches = 10.5;

         // Front Right
         private static final int kFrontRightDriveMotorId = 3;
         private static final int kFrontRightSteerMotorId = 2;
         private static final int kFrontRightEncoderId = 1;
         private static final double kFrontRightEncoderOffset = -0.75;

         private static final double kFrontRightXPosInches = 10.5;
         private static final double kFrontRightYPosInches = -10.5;

         // Back Left
         private static final int kBackLeftDriveMotorId = 5;
         private static final int kBackLeftSteerMotorId = 4;
         private static final int kBackLeftEncoderId = 2;
         private static final double kBackLeftEncoderOffset = -0.75;

         private static final double kBackLeftXPosInches = -10.5;
         private static final double kBackLeftYPosInches = 10.5;

         // Back Right
         private static final int kBackRightDriveMotorId = 7;
         private static final int kBackRightSteerMotorId = 6;
         private static final int kBackRightEncoderId = 3;
         private static final double kBackRightEncoderOffset = -0.75;

         private static final double kBackRightXPosInches = -10.5;
         private static final double kBackRightYPosInches = -10.5;


         private static final SwerveModuleConstants FrontLeft = ConstantCreator.createModuleConstants(
               kFrontLeftSteerMotorId, kFrontLeftDriveMotorId, kFrontLeftEncoderId, kFrontLeftEncoderOffset, Units.inchesToMeters(kFrontLeftXPosInches), Units.inchesToMeters(kFrontLeftYPosInches), kInvertLeftSide);
         private static final SwerveModuleConstants FrontRight = ConstantCreator.createModuleConstants(
               kFrontRightSteerMotorId, kFrontRightDriveMotorId, kFrontRightEncoderId, kFrontRightEncoderOffset, Units.inchesToMeters(kFrontRightXPosInches), Units.inchesToMeters(kFrontRightYPosInches), kInvertRightSide);
         private static final SwerveModuleConstants BackLeft = ConstantCreator.createModuleConstants(
               kBackLeftSteerMotorId, kBackLeftDriveMotorId, kBackLeftEncoderId, kBackLeftEncoderOffset, Units.inchesToMeters(kBackLeftXPosInches), Units.inchesToMeters(kBackLeftYPosInches), kInvertLeftSide);
         private static final SwerveModuleConstants BackRight = ConstantCreator.createModuleConstants(
               kBackRightSteerMotorId, kBackRightDriveMotorId, kBackRightEncoderId, kBackRightEncoderOffset, Units.inchesToMeters(kBackRightXPosInches), Units.inchesToMeters(kBackRightYPosInches), kInvertRightSide);

         public static final CommandSwerveDrivetrain DriveTrain = new CommandSwerveDrivetrain(DrivetrainConstants, FrontLeft,
               FrontRight, BackLeft, BackRight);
