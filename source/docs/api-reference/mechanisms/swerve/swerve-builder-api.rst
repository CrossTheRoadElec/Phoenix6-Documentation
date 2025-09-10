Swerve Builder API
==================

To simplify the API surface, both `builder <https://en.wikipedia.org/wiki/Builder_pattern>`__ and `factory <https://en.wikipedia.org/wiki/Factory_method_pattern>`__ paradigms are used. Users create a ``SwerveDrivetrain`` by first defining the global drivetrain characteristics and then each module characteristics.

.. note:: Phoenix 6 supports the `Java units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/java-units.html>`__ when applicable.

Defining Drivetrain Characteristics
-----------------------------------

Drivetrain, in this instance, refers to the ``SwerveDrivetrainConstants`` class (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain_constants/index.html#phoenix6.swerve.swerve_drivetrain_constants.SwerveDrivetrainConstants>`__). This class defines characteristics that are not tied to the swerve modules, such as the CAN bus or Pigeon 2 device ID.

.. note:: All devices in the swerve drivetrain must be on the same CAN bus.

Users can optionally provide a configuration object to apply custom configs to the Pigeon 2, such as mount orientation. Leaving the configuration object ``null`` will skip applying configs to the Pigeon 2.

Defining Module Characteristics
-------------------------------

The typical FRC drivetrain includes 4 identical modules. To simplify module creation, the ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants_factory.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstantsFactory>`__) class is used to set up constants common across all modules, such as the drive/steer gear ratios and the wheel radius.

Some extra steps may be required to determine some constants, described below.

``CouplingGearRatio``
  The ratio at which the output wheel rotates when the azimuth spins. In a traditional swerve module, this is the inverse of the 1st stage of the drive motor.

  To manually determine the coupling ratio, lock the drive wheel in-place, then rotate the azimuth three times. Observe the number of rotations reported by the drive motor. The coupling ratio will be :math:`driveRotations / 3`, or :math:`driveRotations / azimuthRotations`.

``SlipCurrent``
  This is the amount of stator current the drive motors can apply without slippage. Follow the instructions in :ref:`docs/hardware-reference/talonfx/improving-performance-with-current-limits:preventing wheel slip` to find the slip current of the drivetrain.

``DriveMotorInitialConfigs``/``SteerMotorInitialConfigs``/``EncoderInitialConfigs``
  An initial configuration object that can be used to apply custom configs to the backing devices for each swerve module. This is useful for situations such as applying supply current limits.

Building the Swerve Module Constants
------------------------------------

``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1swerve_1_1_swerve_module_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_module_constants/index.html#phoenix6.swerve.swerve_module_constants.SwerveModuleConstants>`__) can be created from the previous ``SwerveModuleConstantsFactory``. A typical swerve drivetrain consists of four identical modules: Front Left, Front Right, Back Left, Back Right. While these modules can be instantiated directly (only really useful if the modules have different physical characteristics), the modules can also be created by calling ``createModuleConstants(...)`` with the aforementioned factory.

.. note:: The X and Y position of the modules is measured from the center point of the robot along the X and Y axes, respectively. These values use the same coordinate system as ``Translation2d`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/math/geometry/Translation2d.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_translation2d.html>`__, `Python <https://robotpy.readthedocs.io/projects/robotpy/en/stable/wpimath.geometry/Translation2d.html>`__), where forward is positive X and left is positive Y.

Building the ``SwerveDrivetrain``
---------------------------------

``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html>`__) is the class that handles odometry, configuration and control of the drivetrain. The constructor for this class takes the previous ``SwerveDrivetrainConstants`` and a list of ``SwerveModuleConstants``.

Utilization of ``SwerveDrivetrain`` consists of ``SwerveRequests`` that define the state of the drivetrain. For full details of using ``SwerveRequests`` to control your swerve, see :doc:`/docs/api-reference/mechanisms/swerve/swerve-requests`.

Full Example
------------

.. note:: ``CommandSwerveDrivetrain`` is a version created by the Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` that implements ``Subsystem`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj2/command/Subsystem.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc2_1_1_subsystem.html>`__, `Python <https://robotpy.readthedocs.io/projects/commands-v2/en/stable/commands2/Subsystem.html>`__) for easy command-based integration.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 19-
         :linenos:
         :lineno-start: 1

   .. tab-item:: C++ (Header)
      :sync: C++

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/cpp/SwerveWithPathPlanner/src/main/include/generated/TunerConstants.h
         :language: cpp
         :lines: 3-
         :linenos:
         :lineno-start: 1

   .. tab-item:: C++ (Source)
      :sync: C++ Header

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/cpp/SwerveWithPathPlanner/src/main/cpp/generated/TunerConstants.cpp
         :language: cpp
         :linenos:
         :lineno-start: 1

   .. tab-item:: Python
      :sync: python

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/python/SwerveWithPathPlanner/generated/tuner_constants.py
         :language: python
         :lines: 6-
         :linenos:
         :lineno-start: 1
