Swerve Overview
===============

.. important:: Swerve functionality is only available for FRC users.

CTR Electronics has a first-party Swerve API that supports Java, C++, and Python. This API simplifies the boilerplate necessary for swerve and maximizes performance.

This section focuses on utilizing the Swerve API. Tuner X supports a :doc:`swerve project creator </docs/tuner/tuner-swerve/index>` that greatly simplifies this process and removes common error cases.

- Small API surface, easily debuggable

  * Build robot characteristics using ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/_swerve_module_constants_8hpp.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstants>`__) and ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain_constants/index.html#phoenix6.swerve.swerve_drivetrain_constants.SwerveDrivetrainConstants>`__).
  * Integrates cleanly into WPILib `command-based <https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html>`__ framework using ``CommandSwerveDrivetrain`` (from our examples or Tuner X).
  * Telemetrize directly in the odometry loop using the ``registerTelemetry()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#registerTelemetry(java.util.function.Consumer)>`__ `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a436b15dcc20e3c4ece0f3c0656a9701a>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/index.html#phoenix6.swerve.SwerveDrivetrain.register_telemetry>`__) lambda.
  * Supports handling the swerve state via ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_swerve_request.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SwerveRequest>`__).

    * Supports robot-centric, field-centric and field-centric facing angle.
    * Supports common scenarios such as X mode (point all modules toward the center of the robot).

- Simulation

  * Swerve simulation focuses on usability, and as such isn't perfectly accurate to a real robot.
  * Simply call ``updateSimState`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#updateSimState(double,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a26d01bf576e432bd377dd82498ed90d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.update_sim_state>`__) in ``simulationPeriodic()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/IterativeRobotBase.html#simulationPeriodic()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_iterative_robot_base.html#a43ded4345299bb1bdf4d3e615b585dc6>`__).

- Performance

  * Odometry is updated synchronously with the motor controllers.
  * Odometry is received as fast as possible using a separate thread.
  * Combine with `Phoenix Pro <https://store.ctr-electronics.com/phoenix-pro/>`__ and a `CANivore <https://store.ctr-electronics.com/canivore/>`__ with :ref:`timesync <docs/api-reference/api-usage/status-signals:canivore timesync>` for improved performance.

.. note:: Simulation boilerplate is automatically handled when generating a robot project using Tuner X.

Hardware Requirements
---------------------

Utilizing the swerve API requires that the robot drivetrain is composed of supported Phoenix 6 devices. At a minimum, these requirements are:

.. note:: You can mix and match within a given grouping (steer, drive), but motors within a grouping must be of the same type. For example, you can utilize 4 Talon FXS connected to a Minion for steer, and you can use 4 Kraken x60 for drive.

- 8 TalonFX motor controllers (4 steer, 4 drive)
- 4 encoders (must be one selection of the following)

  - 4 CANcoders
  - At least 2 CANdi with PWM absolute encoder
  - 4 PWM absolute encoder connected to Talon FXS when used in steer

- 1 Pigeon 2.0

Overview on the API
-------------------

Simple usage of the API is comprised of 4 core classes:

- ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain_constants/index.html>`__)

  * This class handles characteristics of the robot that are not module specific. e.g. CAN bus, Pigeon 2 ID, whether FD is enabled or not.

- ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants_factory.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstantsFactory>`__)

  * Factory class that is used to instantiate ``SwerveModuleConstants`` for each module on the robot.

- ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/index.html#phoenix6.swerve.SwerveModuleConstants>`__)

  * Represents the characteristics for a given module.

- ``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/index.html#phoenix6.swerve.SwerveDrivetrain>`__)

  * Created using ``SwerveDrivetrainConstants`` and a ``SwerveModuleConstants`` for each module, this is used to control the swerve drivetrain.

For a reference on how to construct and utilize these classes, see the ``TunerConstants`` implementation for your preferred language.

.. grid:: 1 2 2 3
   :gutter: 1

   .. grid-item-card:: Java
      :link: https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java

      ``TunerConstants.java`` implementation for Java

  .. grid-item-card:: C++
      :link: https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java

      ``TunerConstants.h`` implementation for C++

  .. grid-item-card:: Python
      :link: https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java

      ``tuner_constants.py`` implementation for Python

- `Java <https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java>`__
- `C++ <https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/cpp/SwerveWithPathPlanner/src/main/include/generated/TunerConstants.h>`__
- `Python <https://github.com/CrossTheRoadElec/Phoenix6-Examples/blob/main/python/SwerveWithPathPlanner/generated/tuner_constants.py>`__

.. toctree::
   :maxdepth: 1

   swerve-requests
   swerve-simulation
