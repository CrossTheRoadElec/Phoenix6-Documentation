Swerve Builder API
==================

To simplify the API surface, both `builder <https://en.wikipedia.org/wiki/Builder_pattern>`__ and `factory <https://en.wikipedia.org/wiki/Factory_method_pattern>`__ paradigms are used. Users create a ``SwerveDrivetrain`` by first defining the global drivetrain characteristics and then each module characteristics.

.. note:: Phoenix 6 supports the `Java units library <https://docs.wpilib.org/en/latest/docs/software/basic-programming/java-units.html>`__ when applicable.

Defining Drivetrain Characteristics
-----------------------------------

Drivetrain, in this instance, refers to the ``SwerveDrivetrainConstants`` class (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__). This class defines characteristics that are not module specific. Mandatory parameters include ``withCANBusName()`` and ``withPigeon2Id()``.

.. note:: All devices in the swerve drivetrain must be on the same CAN bus.

Users can optionally provide a configuration object to apply custom configs to the Pigeon 2, such as mount orientation. Leaving the configuration object ``null`` will skip applying configs to the Pigeon 2.

``SwerveDrivetrainConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
               .withCANBusName(kCANbus.getName())
               .withPigeon2Id(kPigeonId)
               .withPigeon2Configs(pigeonConfigs);

Defining Module Characteristics
-------------------------------

The typical FRC drivetrain includes 4 identical modules. To simplify module creation, there exists a ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__) class to simplify module creation.

Mandatory parameters for this factory are:

* ``withDriveMotorGearRatio()`` - Gearing between the drive motor output shaft and the wheel.
* ``withSteerMotorGearRatio()`` - Gearing between the steer motor output shaft and the azimuth gear.
* ``withWheelRadius()`` - Radius of the wheel.
* ``withSteerMotorGains()`` - Instance of ``Slot0Configs``, closed-loop gains for the steering motor.
* ``withDriveMotorGains()`` - Instance of ``Slot0Configs``, closed-loop gains for the drive motor.
* ``withSteerMotorClosedLoopOutput()`` - The ``ClosedLoopOutputType`` to use for steer motor closed-loop control requests.
* ``withDriveMotorClosedLoopOutput()`` - The ``ClosedLoopOutputType`` to use for drive motor closed-loop control requests.
* ``withSpeedAt12Volts()`` - Required for open-loop control, theoretical free speed at 12v applied output.
* ``withFeedbackSource()`` - Instance of ``SteerFeedbackType``. Typically ``FusedCANcoder`` (requires Pro) or ``RemoteCANcoder``.

For functional simulation, the following additional parameters **must** be defined.

* ``withSteerInertia()``
* ``withDriveInertia()``

For a full reference of the available functions, see the API documentation of ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__).

``SwerveModuleConstantsFactory`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private static final SwerveModuleConstantsFactory ConstantCreator = new SwerveModuleConstantsFactory()
               .withDriveMotorGearRatio(kDriveGearRatio)
               .withSteerMotorGearRatio(kSteerGearRatio)
               .withCouplingGearRatio(kCoupleRatio)
               .withWheelRadius(kWheelRadius)
               .withSteerMotorGains(steerGains)
               .withDriveMotorGains(driveGains)
               .withSteerMotorClosedLoopOutput(kSteerClosedLoopOutput)
               .withDriveMotorClosedLoopOutput(kDriveClosedLoopOutput)
               .withSlipCurrent(kSlipCurrent)
               .withSpeedAt12Volts(kSpeedAt12Volts)
               .withFeedbackSource(kSteerFeedbackType)
               .withDriveMotorInitialConfigs(driveInitialConfigs)
               .withSteerMotorInitialConfigs(steerInitialConfigs)
               .withCANcoderInitialConfigs(cancoderInitialConfigs)
               .withSteerInertia(kSteerInertia)
               .withDriveInertia(kDriveInertia)
               .withSteerFrictionVoltage(kSteerFrictionVoltage)
               .withDriveFrictionVoltage(kDriveFrictionVoltage);

Additional Constants
^^^^^^^^^^^^^^^^^^^^

In the previous section, several optional constants are defined. These constants are not mandatory for usable swerve, but they can greatly increase swerve controllability and accuracy.

``CouplingGearRatio``
  The ratio at which the output wheel rotates when the azimuth spins. In a traditional swerve module, this is the inverse of the 1st stage of the drive motor.

  To manually determine the coupling ratio, lock the drive wheel in-place, then rotate the azimuth three times. Observe the number of rotations reported by the drive motor. The coupling ratio will be :math:`driveRotations / 3`, or :math:`driveRotations / azimuthRotations`.

``SlipCurrent``
  This is the amount of stator current the drive motors can apply without slippage. This can be found by placing the robot against a solid wall and slowly increase the output voltage. As the output voltage increases, :ref:`plot <docs/tuner/plotting:plotting>` the drive wheel velocity and stator current. Observe when the drive wheel velocity starts to rise (wheel is slipping) and at what stator current this begins.

``DriveMotorInitialConfigs``/``SteerMotorInitialConfigs``/``CANcoderInitialConfigs``
  An initial configuration object that can be used to apply custom configs to the backing devices for each swerve module. This is useful for situations such as applying supply current limits.

Building the Swerve Module Constants
------------------------------------

``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__) can be derived, or created, from the previous ``SwerveModuleConstantsFactory``. A typical swerve drivetrain consists of four identical modules: Front Left, Front Right, Back Left, Back Right. While these modules can be instantiated directly (only really useful if the modules have different physical characteristics), the modules can also be created by calling ``createModuleConstants()`` with the aforementioned factory.

Calling ``createModuleConstants()`` takes the following arguments:

* Steer Motor ID
* Drive Motor ID
* Steer Encoder ID
* Steer Encoder Offset
* X position
* Y position
* Whether the drive motor is inverted
* Whether the steer motor is inverted
* Whether the CANcoder is inverted

.. note:: The X and Y position of the modules is measured from the center point of the robot along the X and Y axes, respectively. These values use the same coordinate system as ``Translation2d`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/math/geometry/Translation2d.html>`__), where forward is positive X and left is positive Y.

``SwerveModuleConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public static final SwerveModuleConstants FrontLeft = ConstantCreator.createModuleConstants(
               kFrontLeftSteerMotorId, kFrontLeftDriveMotorId, kFrontLeftEncoderId, kFrontLeftEncoderOffset,
               kFrontLeftXPos, kFrontLeftYPos, kInvertLeftSide, kFrontLeftSteerMotorInverted, kFrontLeftCANcoderInverted);
         public static final SwerveModuleConstants FrontRight = ConstantCreator.createModuleConstants(
               kFrontRightSteerMotorId, kFrontRightDriveMotorId, kFrontRightEncoderId, kFrontRightEncoderOffset,
               kFrontRightXPos, kFrontRightYPos, kInvertRightSide, kFrontRightSteerMotorInverted, kFrontRightCANcoderInverted);
         public static final SwerveModuleConstants BackLeft = ConstantCreator.createModuleConstants(
               kBackLeftSteerMotorId, kBackLeftDriveMotorId, kBackLeftEncoderId, kBackLeftEncoderOffset,
               kBackLeftXPos, kBackLeftYPos, kInvertLeftSide, kBackLeftSteerMotorInverted, kBackLeftCANcoderInverted);
         public static final SwerveModuleConstants BackRight = ConstantCreator.createModuleConstants(
               kBackRightSteerMotorId, kBackRightDriveMotorId, kBackRightEncoderId, kBackRightEncoderOffset,
               kBackRightXPos, kBackRightYPos, kInvertRightSide, kBackRightSteerMotorInverted, kBackRightCANcoderInverted);

Building the ``SwerveDrivetrain``
---------------------------------

.. note:: ``CommandSwerveDrivetrain`` is a version created by the Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` that implements ``Subsystem`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj2/command/Subsystem.html>`__) for easy command-based integration.

``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__) is the class that handles odometry, configuration and control of the drivetrain. The constructor for this class takes the previous ``SwerveDrivetrainConstants`` and a list of ``SwerveModuleConstants``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public static CommandSwerveDrivetrain createDrivetrain() {
            return new CommandSwerveDrivetrain(
               DrivetrainConstants, FrontLeft, FrontRight, BackLeft, BackRight
            );
         }

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
            .withKP(100).withKI(0).withKD(0.5)
            .withKS(0.1).withKV(1.91).withKA(0)
            .withStaticFeedforwardSign(StaticFeedforwardSignValue.UseClosedLoopSign);
         // When using closed-loop control, the drive motor uses the control
         // output type specified by SwerveModuleConstants.DriveMotorClosedLoopOutput
         private static final Slot0Configs driveGains = new Slot0Configs()
            .withKP(0.1).withKI(0).withKD(0)
            .withKS(0).withKV(0.124);

         // The closed-loop output type to use for the steer motors;
         // This affects the PID/FF gains for the steer motors
         private static final ClosedLoopOutputType kSteerClosedLoopOutput = ClosedLoopOutputType.Voltage;
         // The closed-loop output type to use for the drive motors;
         // This affects the PID/FF gains for the drive motors
         private static final ClosedLoopOutputType kDriveClosedLoopOutput = ClosedLoopOutputType.Voltage;

         // The remote sensor feedback type to use for the steer motors;
         // When not Pro-licensed, FusedCANcoder/SyncCANcoder automatically fall back to RemoteCANcoder
         private static final SteerFeedbackType kSteerFeedbackType = SteerFeedbackType.FusedCANcoder;

         // The stator current at which the wheels start to slip;
         // This needs to be tuned to your individual robot
         private static final Current kSlipCurrent = Amps.of(120.0);

         // Initial configs for the drive and steer motors and the CANcoder; these cannot be null.
         // Some configs will be overwritten; check the `with*InitialConfigs()` API documentation.
         private static final TalonFXConfiguration driveInitialConfigs = new TalonFXConfiguration();
         private static final TalonFXConfiguration steerInitialConfigs = new TalonFXConfiguration()
            .withCurrentLimits(
               new CurrentLimitsConfigs()
                  // Swerve azimuth does not require much torque output, so we can set a relatively low
                  // stator current limit to help avoid brownouts without impacting performance.
                  .withStatorCurrentLimit(Amps.of(60))
                  .withStatorCurrentLimitEnable(true)
            );
         private static final CANcoderConfiguration cancoderInitialConfigs = new CANcoderConfiguration();
         // Configs for the Pigeon 2; leave this null to skip applying Pigeon 2 configs
         private static final Pigeon2Configuration pigeonConfigs = null;

         // CAN bus that the devices are located on;
         // All swerve devices must share the same CAN bus
         public static final CANBus kCANbus = new CANBus("drivetrain", "./logs/example.hoot");

         // Theoretical free speed (m/s) at 12v applied output;
         // This needs to be tuned to your individual robot
         public static final LinearVelocity kSpeedAt12Volts = MetersPerSecond.of(4.73);

         // Every 1 rotation of the azimuth results in kCoupleRatio drive motor turns;
         // This may need to be tuned to your individual robot
         private static final double kCoupleRatio = 3.5;

         private static final double kDriveGearRatio = 6.75;
         private static final double kSteerGearRatio = 15.43;
         private static final Distance kWheelRadius = Inches.of(2);

         private static final boolean kInvertLeftSide = false;
         private static final boolean kInvertRightSide = true;

         private static final int kPigeonId = 1;

         // These are only used for simulation
         private static double kSteerInertia = 0.01;
         private static double kDriveInertia = 0.01;
         // Simulated voltage necessary to overcome friction
         private static final double kSteerFrictionVoltage = 0.2;
         private static final double kDriveFrictionVoltage = 0.2;

         public static final SwerveDrivetrainConstants DrivetrainConstants = new SwerveDrivetrainConstants()
               .withCANbusName(kCANbus.getName())
               .withPigeon2Id(kPigeonId)
               .withPigeon2Configs(pigeonConfigs);

         private static final SwerveModuleConstantsFactory ConstantCreator = new SwerveModuleConstantsFactory()
               .withDriveMotorGearRatio(kDriveGearRatio)
               .withSteerMotorGearRatio(kSteerGearRatio)
               .withCouplingGearRatio(kCoupleRatio)
               .withWheelRadius(kWheelRadius)
               .withSteerMotorGains(steerGains)
               .withDriveMotorGains(driveGains)
               .withSteerMotorClosedLoopOutput(kSteerClosedLoopOutput)
               .withDriveMotorClosedLoopOutput(kDriveClosedLoopOutput)
               .withSlipCurrent(kSlipCurrent)
               .withSpeedAt12Volts(kSpeedAt12Volts)
               .withFeedbackSource(kSteerFeedbackType)
               .withDriveMotorInitialConfigs(driveInitialConfigs)
               .withSteerMotorInitialConfigs(steerInitialConfigs)
               .withCANcoderInitialConfigs(cancoderInitialConfigs)
               .withSteerInertia(kSteerInertia)
               .withDriveInertia(kDriveInertia)
               .withSteerFrictionVoltage(kSteerFrictionVoltage)
               .withDriveFrictionVoltage(kDriveFrictionVoltage);


         // Front Left
         private static final int kFrontLeftDriveMotorId = 1;
         private static final int kFrontLeftSteerMotorId = 0;
         private static final int kFrontLeftEncoderId = 0;
         private static final Angle kFrontLeftEncoderOffset = Rotations.of(-0.75);
         private static final boolean kFrontLeftSteerMotorInverted = false;
         private static final boolean kFrontLeftCANcoderInverted = false;

         private static final Distance kFrontLeftXPos = Inches.of(10.5);
         private static final Distance kFrontLeftYPos = Inches.of(10.5);

         // Front Right
         private static final int kFrontRightDriveMotorId = 3;
         private static final int kFrontRightSteerMotorId = 2;
         private static final int kFrontRightEncoderId = 1;
         private static final Angle kFrontRightEncoderOffset = Rotations.of(-0.75);
         private static final boolean kFrontRightSteerMotorInverted = false;
         private static final boolean kFrontRightCANcoderInverted = false;

         private static final Distance kFrontRightXPos = Inches.of(10.5);
         private static final Distance kFrontRightYPos = Inches.of(-10.5);

         // Back Left
         private static final int kBackLeftDriveMotorId = 5;
         private static final int kBackLeftSteerMotorId = 4;
         private static final int kBackLeftEncoderId = 2;
         private static final Angle kBackLeftEncoderOffset = Rotations.of(-0.75);
         private static final boolean kBackLeftSteerMotorInverted = false;
         private static final boolean kBackLeftCANcoderInverted = false;

         private static final Distance kBackLeftXPos = Inches.of(-10.5);
         private static final Distance kBackLeftYPos = Inches.of(10.5);

         // Back Right
         private static final int kBackRightDriveMotorId = 7;
         private static final int kBackRightSteerMotorId = 6;
         private static final int kBackRightEncoderId = 3;
         private static final Angle kBackRightEncoderOffset = Rotations.of(-0.75);
         private static final boolean kBackRightSteerMotorInverted = false;
         private static final boolean kBackRightCANcoderInverted = false;

         private static final Distance kBackRightXPos = Inches.of(-10.5);
         private static final Distance kBackRightYPos = Inches.of(-10.5);


         public static final SwerveModuleConstants FrontLeft = ConstantCreator.createModuleConstants(
               kFrontLeftSteerMotorId, kFrontLeftDriveMotorId, kFrontLeftEncoderId, kFrontLeftEncoderOffset,
               kFrontLeftXPos, kFrontLeftYPos, kInvertLeftSide, kFrontLeftSteerMotorInverted, kFrontLeftCANcoderInverted);
         public static final SwerveModuleConstants FrontRight = ConstantCreator.createModuleConstants(
               kFrontRightSteerMotorId, kFrontRightDriveMotorId, kFrontRightEncoderId, kFrontRightEncoderOffset,
               kFrontRightXPos, kFrontRightYPos, kInvertRightSide, kFrontRightSteerMotorInverted, kFrontRightCANcoderInverted);
         public static final SwerveModuleConstants BackLeft = ConstantCreator.createModuleConstants(
               kBackLeftSteerMotorId, kBackLeftDriveMotorId, kBackLeftEncoderId, kBackLeftEncoderOffset,
               kBackLeftXPos, kBackLeftYPos, kInvertLeftSide, kBackLeftSteerMotorInverted, kBackLeftCANcoderInverted);
         public static final SwerveModuleConstants BackRight = ConstantCreator.createModuleConstants(
               kBackRightSteerMotorId, kBackRightDriveMotorId, kBackRightEncoderId, kBackRightEncoderOffset,
               kBackRightXPos, kBackRightYPos, kInvertRightSide, kBackRightSteerMotorInverted, kBackRightCANcoderInverted);

         /**
          * Creates a CommandSwerveDrivetrain instance.
          * This should only be called once in your robot program.
          */
         public static CommandSwerveDrivetrain createDrivetrain() {
            return new CommandSwerveDrivetrain(
               DrivetrainConstants, FrontLeft, FrontRight, BackLeft, BackRight
            );
         }
