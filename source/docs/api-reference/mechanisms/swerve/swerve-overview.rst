Swerve Overview
===============

.. important:: Swerve functionality is only available for FRC users and is limited to Java at this time.

New in 2024 is a high performance swerve API. This API simplifies the boilerplate necessary for swerve and maximizes performance.

This section focuses on utilizing the Swerve API and configuring it correctly. Tuner X supports a :doc:`swerve project creator </docs/tuner/tuner-swerve/index>` that greatly simplifies this process and removes common error cases.

- Small API surface, easily debuggable

  * Build robot characteristics using ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__) and ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__).
  * Integrates cleanly into WPILib `command-based <https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html>`__ framework using ``CommandSwerveDrivetrain`` (from our examples or Tuner X).
  * Telemetrize directly in the odometry loop using the ``registerTelemetry()`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#registerTelemetry(java.util.function.Consumer)>`__) lambda.
  * Supports handling the swerve state via ``SwerveRequest`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveRequest.html>`__).

    * Supports robot-centric, field-centric and field-centric facing angle.
    * Supports common scenarios such as X mode (point all modules toward the center of the robot).

- Simulation

  * Swerve simulation focuses on usability, and as such isn't perfectly accurate to a real robot.
  * Simply call ``updateSimState`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#updateSimState(double,double)>`__) in ``simulationPeriodic()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/IterativeRobotBase.html#simulationPeriodic()>`__).

- Performance

  * Odometry is updated synchronously with the motor controllers.
  * Odometry is received as fast as possible using a separate thread.
  * Combine with `Phoenix Pro <https://store.ctr-electronics.com/phoenix-pro/>`__ and a `CANivore <https://store.ctr-electronics.com/canivore/>`__ with :ref:`timesync <docs/api-reference/api-usage/status-signals:canivore timesync>` for improved performance.

.. note:: Simulation boilerplate is automatically handled when generating a robot project using Tuner X.

Hardware Requirements
---------------------

Utilizing the swerve API requires that the robot drivetrain is composed of supported Phoenix 6 devices. At a minimum, these requirements are:

- 8 TalonFX motor controllers (4 steer, 4 drive)
- 4 CANcoders
- 1 Pigeon 2.0

Overview on the API
-------------------

Simple usage of the API is comprised of 4 core classes:

- ``SwerveDrivetrainConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__)

  * This class handles characteristics of the robot that are not module specific. e.g. CAN bus, Pigeon 2 ID, whether FD is enabled or not.

- ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__)

  * Factory class that is used to instantiate ``SwerveModuleConstants`` for each module on the robot.

- ``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__)

  * Represents the characteristics for a given module.

- ``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__)

  * Created using ``SwerveDrivetrainConstants`` and a ``SwerveModuleConstants`` for each module, this is used to control the swerve drivetrain.

Usage of these classes is available in the following articles in this section.

.. toctree::
   :maxdepth: 1

   swerve-builder-api
   swerve-requests
   swerve-simulation
