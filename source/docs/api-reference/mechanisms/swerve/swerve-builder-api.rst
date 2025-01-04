Swerve Builder API
==================

To simplify the API surface, both `builder <https://en.wikipedia.org/wiki/Builder_pattern>`__ and `factory <https://en.wikipedia.org/wiki/Factory_method_pattern>`__ paradigms are used. Users create a ``SwerveDrivetrain`` by first defining the global drivetrain characteristics and then each module characteristics.

.. note:: Phoenix 6 supports the `Java units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/java-units.html>`__ when applicable.

Defining Drivetrain Characteristics
-----------------------------------

Drivetrain, in this instance, refers to the ``SwerveDrivetrainConstants`` class (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrainConstants.html>`__). This class defines characteristics that are not module specific. Mandatory parameters include ``withCANBusName()`` and ``withPigeon2Id()``.

.. note:: All devices in the swerve drivetrain must be on the same CAN bus.

Users can optionally provide a configuration object to apply custom configs to the Pigeon 2, such as mount orientation. Leaving the configuration object ``null`` will skip applying configs to the Pigeon 2.

``SwerveDrivetrainConstants`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 96-99

Defining Module Characteristics
-------------------------------

The typical FRC drivetrain includes 4 identical modules. To simplify module creation, there exists a ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__) class to simplify module creation.

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

For a full reference of the available functions, see the API documentation of ``SwerveModuleConstantsFactory`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstantsFactory.html>`__).

``SwerveModuleConstantsFactory`` Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 101-119

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

``SwerveModuleConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveModuleConstants.html>`__) can be derived, or created, from the previous ``SwerveModuleConstantsFactory``. A typical swerve drivetrain consists of four identical modules: Front Left, Front Right, Back Left, Back Right. While these modules can be instantiated directly (only really useful if the modules have different physical characteristics), the modules can also be created by calling ``createModuleConstants()`` with the aforementioned factory.

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

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 167-179

Building the ``SwerveDrivetrain``
---------------------------------

.. note:: ``CommandSwerveDrivetrain`` is a version created by the Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` that implements ``Subsystem`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj2/command/Subsystem.html>`__) for easy command-based integration.

``SwerveDrivetrain`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html>`__) is the class that handles odometry, configuration and control of the drivetrain. The constructor for this class takes the previous ``SwerveDrivetrainConstants`` and a list of ``SwerveModuleConstants``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 180-188

Utilization of ``SwerveDrivetrain`` consists of ``SwerveRequests`` that define the state of the drivetrain. For full details of using ``SwerveRequests`` to control your swerve, see :doc:`/docs/api-reference/mechanisms/swerve/swerve-requests`.

Full Example
------------

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/refs/heads/main/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 24-188
         :linenos:
         :lineno-start: 1
