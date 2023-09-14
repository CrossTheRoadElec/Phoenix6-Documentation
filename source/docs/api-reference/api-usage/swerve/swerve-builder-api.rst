Swerve Builder API
==================

To simplify the API surface, both `builder and factory <https://stackoverflow.com/questions/757743/what-is-the-difference-between-builder-design-pattern-and-factory-design-pattern>`__ paradigms are used. Users create a ``SwerveDrivetrain`` by first defining the global drivetrain characteristics and then each module characteristics.

Defining Drivetrain Characteristics
-----------------------------------

Drivetrain, in this instance, refers to the ``SwerveDrivetrainConstants`` class (Java). This class defines characteristics that are not module specific. Mandatory parameters include ``.withPigeon2Id()`` (Java).

``SwerveDrivetrainConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
            .withPigeon2Id(kPigeonId)
            .withSupportsPro(true)
            .withCANbusName(kCANbusName);

Defining Module Characteristics
-------------------------------

The typical FRC drivetrain includes 4 identical modules. To simplify module creation, there exists a ``SwerveModuleConstantsFactory`` (Java) class to simplify module creation.

Mandatory parameters for this factory are:

* ``withDriveMotorGearRatio()`` (Java) - Gearing between the drive motor output shaft and the wheel.
* ``withSteerMotorGearRatio()`` (Java) - Gearing between the steer motor output shaft and the azimuth gear.
* ``withWheelRadius()`` (Java) - Radius of the wheel in inches.
* ``withSteerMotorGains()`` (Java) - Instance of ``Slot0Configs`` of gains for the steering motor.
* ``withDriveMotorGains()`` (Java) - Instance of ``Slot0Configs`` of gains for the drive motor.
* ``withFeedbackSource()`` (Java) - Instance of ``SwerveModuleSteerFeedbackType``. Typically ``FusedCANcoder`` (Java) or ``RemoteCANcoder`` (Java).

For functional simulation, the following additional parameters **must** be defined.

* ``withSteerInertia()``
* ``withDriveInertia()``

For a full reference of the available functions, see the API documentation of ``SwerveModuelConstantsFactory``.

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
            .withSlipCurrent(800)
            .withSteerMotorGains(steerGains)
            .withDriveMotorGains(driveGains)
            .withSpeedAt12VoltsMps(6) // Theoretical free speed is 10 meters per second at 12v applied output
            .withSteerInertia(kSteerInertia)
            .withDriveInertia(kDriveInertia)
            .withFeedbackSource(SwerveModuleSteerFeedbackType.FusedCANcoder)
            .withCouplingGearRatio(kCoupleRatio) // Every 1 rotation of the azimuth results in couple ratio drive turns
            .withSteerMotorInverted(kSteerMotorReversed);

Building the Swerve Module Constants
------------------------------------

``SwerveModuleConstants`` can be derived, or created, from the previous ``SwerveModuleConstantsFactory``. A typical swerve drivetrain consists of four identical modules: Front Left, Front Right, Back Left, Back Right. While these modules can be instantiated directly (only really useful if the modules have different physical characteristics), the modules can also be created by calling ``createModuleConstants()`` with the aforementioned factory.

Calling ``ConstantCreator.createModuleConstants()`` takes the following arguments:

* Steer Motor ID
* Drive Motor ID
* Steer Encoder ID
* Steer Encoder Offset
* X position in meters
* Y position in meters

.. note:: The X and Y position of the modules is measured from the center point of the robot. These values use the same coordinate system as ``Translation2d`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/math/geometry/Translation2d.html>`__), where forward is positive X and left is positive Y.

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

.. note:: ``CommandSwerveDrivetrain`` (Java) is a version that implements ``Subsystem`` for easy command-based integration.

``SwerveDrivetrain`` (Java) is the class that handles odometry, configuration and control of the drivetrain. The constructor for this class takes the previous ``SwerveDrivetrainConstants`` and a list of ``SwerveModuleConstants``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public static final CommandSwerveDrivetrain DriveTrain = new CommandSwerveDrivetrain(DrivetrainConstants, FrontLeft,
            FrontRight, BackLeft, BackRight);

Utilization of ``SwerveDrivetrain`` consists of ``SwerveRequests`` that define the state of the drivetrain. For full details of using ``SwerveRequests`` to control your swerve, see :doc:`/docs/api-reference/api-usage/swerve/swerve-requests`.

Full Example
------------

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         static class CustomSlotGains extends Slot0Configs {
            public CustomSlotGains(double kP, double kI, double kD, double kV, double kS) {
                  this.kP = kP;
                  this.kI = kI;
                  this.kD = kD;
                  this.kV = kV;
                  this.kS = kS;
            }
         }

         private static final CustomSlotGains steerGains = new CustomSlotGains(50, 0, 0.05, 0, 0);
         private static final CustomSlotGains driveGains = new CustomSlotGains(3, 0, 0, 0, 0);

         private static final double kCoupleRatio = 0.0;

         private static final double kDriveGearRatio = 6.056;
         private static final double kSteerGearRatio = 12.8;
         private static final double kWheelRadiusInches = 2;
         private static final int kPigeonId = 1;
         private static final boolean kSteerMotorReversed = false;
         private static final String kCANbusName = "";
         private static final boolean kInvertLeftSide = false;
         private static final boolean kInvertRightSide = true;

         private static double kSteerInertia = 0.0001;
         private static double kDriveInertia = 0.001;

         private static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
               .withPigeon2Id(kPigeonId)
               .withSupportsPro(true)
               .withCANbusName(kCANbusName);

         private static final SwerveModuleConstantsFactory ConstantCreator = new SwerveModuleConstantsFactory()
               .withDriveMotorGearRatio(kDriveGearRatio)
               .withSteerMotorGearRatio(kSteerGearRatio)
               .withWheelRadius(kWheelRadiusInches)
               .withSlipCurrent(800)
               .withSteerMotorGains(steerGains)
               .withDriveMotorGains(driveGains)
               .withSpeedAt12VoltsMps(6) // Theoretical free speed is 10 meters per second at 12v applied output
               .withSteerInertia(kSteerInertia)
               .withDriveInertia(kDriveInertia)
               .withFeedbackSource(SwerveModuleSteerFeedbackType.FusedCANcoder)
               .withCouplingGearRatio(kCoupleRatio) // Every 1 rotation of the azimuth results in couple ratio drive turns
               .withSteerMotorInverted(kSteerMotorReversed);

         private static final int kFrontLeftDriveMotorId = 1;
         private static final int kFrontLeftSteerMotorId = 0;
         private static final int kFrontLeftEncoderId = 0;
         private static final double kFrontLeftEncoderOffset = -0.75;

         private static final double kFrontLeftXPosInches = 0.5;
         private static final double kFrontLeftYPosInches = 10.5;
         private static final int kFrontRightDriveMotorId = 3;
         private static final int kFrontRightSteerMotorId = 2;
         private static final int kFrontRightEncoderId = 1;
         private static final double kFrontRightEncoderOffset = -0.75;

         private static final double kFrontRightXPosInches = 0.5;
         private static final double kFrontRightYPosInches = -10.5;
         private static final int kBackLeftDriveMotorId = 5;
         private static final int kBackLeftSteerMotorId = 4;
         private static final int kBackLeftEncoderId = 2;
         private static final double kBackLeftEncoderOffset = -0.75;

         private static final double kBackLeftXPosInches = -0.5;
         private static final double kBackLeftYPosInches = 10.5;
         private static final int kBackRightDriveMotorId = 7;
         private static final int kBackRightSteerMotorId = 6;
         private static final int kBackRightEncoderId = 3;
         private static final double kBackRightEncoderOffset = -0.75;

         private static final double kBackRightXPosInches = -0.5;
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
