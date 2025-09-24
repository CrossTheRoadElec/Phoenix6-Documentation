Swerve Overview
===============

.. important:: Some swerve features, such as simulation support, are only available for FRC users.

Phoenix 6 incorporates a high performance swerve API supported in Java, C++, and Python. This API simplifies the boilerplate necessary for swerve and maximizes performance.

.. tip:: Tuner X supports a :doc:`swerve project creator </docs/tuner/tuner-swerve/index>` that greatly simplifies the setup process and eliminates common error cases.

- Small API surface, easily debuggable

  * Build robot characteristics using ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstants>`__) and ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain_constants/index.html#phoenix6.swerve.swerve_drivetrain_constants.SwerveDrivetrainConstants>`__).
  * Integrates cleanly into the WPILib `command-based <https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html>`__ framework using ``CommandSwerveDrivetrain`` (from our examples or Tuner X).
  * Provide a lambda to telemetrize directly in the odometry loop using ``registerTelemetry(...)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#registerTelemetry(java.util.function.Consumer)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a436b15dcc20e3c4ece0f3c0656a9701a>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/index.html#phoenix6.swerve.SwerveDrivetrain.register_telemetry>`__).
  * Extensible and powerful control of the drivetrain via ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_swerve_request.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SwerveRequest>`__).

    * Built-in requests tuned for both autonomous and teleoperated robot-centric, field-centric and field-centric facing angle control.
    * Supports common scenarios such as X brake (point all modules toward the center of the robot).

- Simulation

  * Test your autonomous paths and pose estimation without a physical robot.
  * Simply call ``updateSimState(...)`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#updateSimState(double,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a26d01bf576e432bd377dd82498ed90d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.update_sim_state>`__) in ``simulationPeriodic()`` or on a separate thread.

- Performance

  * Odometry is updated synchronously with the motor controllers.
  * Odometry is received as fast as possible using a separate thread.
  * Control is run inline with odometry updates.
  * Combine with `Phoenix Pro <https://store.ctr-electronics.com/phoenix-pro/>`__ and a `CANivore <https://store.ctr-electronics.com/canivore/>`__ with :ref:`timesync <docs/api-reference/api-usage/status-signals:canivore timesync>` for improved performance.

.. tip:: Simulation boilerplate is automatically handled when generating a robot project using Tuner X.

Hardware Requirements
---------------------

Utilizing the swerve API requires that the robot drivetrain is composed of supported Phoenix 6 devices. At a minimum, these requirements are:

- 4 Talon FX or Talon FXS drive motor controllers
- 4 Talon FX or Talon FXS steer motor controllers
- 1 Pigeon 2.0
- 4 encoders (must all be one of the following)

  - 4 CANcoders
  - 4 PWM absolute encoders connected to at least 2 CANdi
  - 4 PWM absolute encoders connected to their corresponding steer Talon FXS

.. note:: All drive motor controllers must be of the same type, and all steer motor controllers must be of the same type. However, the drive and steer motor controllers can be different types from each other. For example, you can utilize 4 Talon FXS connected to a Minion for steer and 4 Kraken X60 for drive.

Overview of the API
-------------------

Simple usage is comprised of 5 core APIs:

- ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain_constants/index.html#phoenix6.swerve.swerve_drivetrain_constants.SwerveDrivetrainConstants>`__)

  * This class handles characteristics of the robot that are not module specific. e.g. CAN bus, Pigeon 2 ID, whether FD is enabled or not.

- ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants_factory.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstantsFactory>`__)

  * Factory class with common constants used to instantiate ``SwerveModuleConstants`` for each module on the robot.

- ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstants>`__)

  * Represents the characteristics for a given module.

- ``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html>`__)

  * Created using ``SwerveDrivetrainConstants`` and a ``SwerveModuleConstants`` for each module, this is used to control the swerve drivetrain.

- ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1requests_1_1_swerve_request.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/requests/index.html#phoenix6.swerve.requests.SwerveRequest>`__)

  * Controls the drivetrain, such as driving field-centric.

Usage of these classes is available in the following articles in this section.

.. toctree::
   :maxdepth: 1

   swerve-builder-api
   swerve-requests
   swerve-simulation
