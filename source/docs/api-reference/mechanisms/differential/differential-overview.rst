Differential Overview
=====================

Phoenix 6 has two robust differential mechanism APIs taking advantage of the motor controllers' onboard differential controls. These APIs greatly simplify the setup and usage of common differential mechanisms, ranging from a `differential wrist <https://youtu.be/tJ4rwWNeLlE>`__ to a two-gearbox elevator without mechanical linkage.

What is a Differential Mechanism?
---------------------------------

A differential mechanism has two axes of motion, where the position along each axis is determined by two motors in separate gearboxes:

- Driving both motors in a common direction causes the mechanism to move forward/reverse, up/down, etc.

  - This is the **Average axis**: position is determined by the average of the two motors' positions.

- Driving the motors in opposing directions causes the mechanism to twist or rotate left/right.

  - This is the **Difference axis**: rotation is determined by half the difference of the two motors' positions.

.. TODO: 1323 differential wrist image here, with arrows indicating axes

As an example, a differential drivetrain has a few motors on each side of the robot. Driving both sides of the robot in the "forward" direction causes the robot to move forward. However, driving the left side "forward" and the right side "reverse" causes the robot to turn right.

Another example is a two-gearbox elevator without mechanical linkage between the two sides. If the two sides of the elevator are not driven together, the elevator carriage twists, potentially breaking if the twist is too extreme. As a result, the elevator can be treated as a differential mechanism that always targets a difference of 0.

In a more advanced setup, a remote sensor can be used on the Difference axis as an absolute sensor source. For example, a differential drivetrain can use the yaw of a Pigeon 2 to target an absolute heading.

Differential Leader and Follower
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In a differential mechanism, one of the motor controllers is selected as the "differential leader", while the other is selected as the "differential follower".

- The **leader** is responsible for running all closed-loop calculations and applies ``Average + Difference`` to its output.
- The **follower** reports its position and velocity to the leader and applies ``Average - Difference`` to its output.

The selection of the leader and follower motor controllers is **only important** when using a **remote sensor** on the difference axis. For example, consider a differential drivetrain using the yaw of a Pigeon 2.

The Pigeon 2 is counter-clockwise positive, so the robot should rotate counter-clockwise (left) from a positive output on the Difference axis. This occurs when the right side drives forward (positive) and the left side drives reverse (negative). As a result, the right motor controller should be selected as the leader.

Hardware Requirements
---------------------

All differential mechanism APIs require at least 2 Talon FX or Talon FXS motor controllers, one on each side of the mechanism. Optionally, a remote CANcoder, CANdi, or Pigeon 2 can be used on the Difference axis as an absolute sensor source.

.. note:: Both motor controllers must be of the same type.

Overview of the API
-------------------

There are two differential mechanism APIs:

- ``DifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html>`__)

  - Requires `Phoenix Pro <https://store.ctr-electronics.com/products/phoenix-pro/>`__ and `CANivore <https://store.ctr-electronics.com/products/canivore>`__.
  - Full functionality, including full support for feedforwards and custom motion profiles.
  - Difference axis supports open-loop control and position/velocity closed-loop control.
  - Supports all control output type.

- ``SimpleDifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/SimpleDifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_simple_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/mechanisms/simple_differential_mechanism/index.html>`__)

  - Free and supports CAN 2.0.
  - Limited functionality.
  - Difference axis only supports position closed-loop control.
  - Only supports Duty Cycle and Voltage control output types.

Both types of mechanism are constructed using a ``DifferentialMotorConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/DifferentialMotorConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/structctre_1_1phoenix6_1_1mechanisms_1_1_differential_motor_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/mechanisms/differential_constants/index.html#phoenix6.mechanisms.differential_constants.DifferentialMotorConstants>`__) object.

Usage of these classes is available in the following articles in this section.

.. toctree::
   :maxdepth: 1

   differential-setup
   using-differential-mech
   differential-tuning
