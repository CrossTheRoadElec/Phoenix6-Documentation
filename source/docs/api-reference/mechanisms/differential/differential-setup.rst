Differential Mechanism Setup
============================

The differential mechanism APIs are constructed by setting up a ``DifferentialMotorConstants`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/mechanisms/DifferentialMotorConstants.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/structctre_1_1phoenix6_1_1mechanisms_1_1_differential_motor_constants.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/mechanisms/differential_constants/index.html#phoenix6.mechanisms.differential_constants.DifferentialMotorConstants>`__) object. This includes necessary information such as the leader motor controllers' IDs, gear ratio on the differential, and alignment of the two sides of the mechanism.

.. important:: The differential mechanism only manages one motor controller from each gearbox. Any other motors in the gearboxes should be separately constructed and configured to follow their corresponding leader.

Defining the Motor Constants
----------------------------

An example configuration for a differential wrist is shown below with the following setup:

- A 3:1 gear ratio on the average axis
- An additional 2:1 gear ratio on the differential axis
- The two motor directions are aligned (ignoring inverts)
- Closed-loop control and relevant status signals run at 200 Hz

.. warning:: Many of these constants, including the PID gains, are specific to this example and **will not work** on your mechanism.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // Average axis gains typically go in Slot 0
         private static final Slot0Configs averageGains = new Slot0Configs()
            .withKP(20).withKI(0).withKD(0.1)
            .withKG(0.2).withKS(0.1).withKV(0.36).withKA(0)
            .withGravityType(GravityTypeValue.Arm_Cosine);
         // Difference axis gains typically go in Slot 1
         private static final Slot1Configs differenceGains = new Slot1Configs()
            .withKP(30).withKI(0).withKD(0.1)
            .withKS(0.1).withKV(0.72);

         private static final double kAverageGearRatio = 3.0;
         private static final double kDifferenceGearRatio = 2.0;

         // Initial configs for the differential leader and follower motor controllers.
         // Some configs will be overwritten; check the `with*InitialConfigs()` API documentation.
         private static final TalonFXConfiguration leaderInitialConfigs = new TalonFXConfiguration()
            .withMotorOutput(
               new MotorOutputConfigs()
                  .withNeutralMode(NeutralModeValue.Brake)
            )
            .withCurrentLimits(
               new CurrentLimitsConfigs()
                  .withStatorCurrentLimit(Amps.of(80))
                  .withStatorCurrentLimitEnable(true)
            )
            .withFeedback(
               new FeedbackConfigs()
                  .withSensorToMechanismRatio(kAverageGearRatio)
            )
            .withClosedLoopGeneral(
               new ClosedLoopGeneralConfigs()
                  // differential wrist is continuous on the difference axis
                  .withDifferentialContinuousWrap(true)
            )
            .withSlot0(averageGains)
            .withSlot1(differenceGains)
            .withMotionMagic(
               new MotionMagicConfigs()
                  .withMotionMagicCruiseVelocity(80)
                  .withMotionMagicAcceleration(320)
            );
         private static final TalonFXConfiguration followerInitialConfigs = new TalonFXConfiguration()
            .withFeedback(
               new FeedbackConfigs()
                  .withSensorToMechanismRatio(kAverageGearRatio)
            );

         // CAN bus that the devices are located on;
         // All mechanism devices must share the same CAN bus
         private static final CANBus kCANBus = new CANBus("canivore", "./logs/example.hoot");

         private static final DifferentialMotorConstants<TalonFXConfiguration> differentialConstants =
            new DifferentialMotorConstants<TalonFXConfiguration>()
               .withCANBusName(kCANBus.getName())
               .withLeaderId(0)
               .withFollowerId(1)
               .withAlignment(MotorAlignmentValue.Aligned)
               .withSensorToDifferentialRatio(kDifferenceGearRatio)
               .withClosedLoopRate(200.0)
               .withLeaderInitialConfigs(leaderInitialConfigs)
               .withFollowerInitialConfigs(followerInitialConfigs)
               .withFollowerUsesCommonLeaderConfigs(true);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // Average axis gains typically go in Slot 0
         static constexpr configs::Slot0Configs averageGains = configs::Slot0Configs{}
            .WithKP(10).WithKI(0).WithKD(0.1)
            .WithKG(0.2).WithKS(0.1).WithKV(0.12).WithKA(0)
            .WithGravityType(signals::GravityTypeValue::Arm_Cosine);
         // Difference axis gains typically go in Slot 1
         static constexpr configs::Slot1Configs differenceGains = configs::Slot1Configs{}
            .WithKP(10).WithKI(0).WithKD(0.1)
            .WithKS(0.1).WithKV(0.12);

         static constexpr units::scalar_t kAverageGearRatio = 3.0;
         static constexpr units::scalar_t kDifferenceGearRatio = 2.0;

         // Initial configs for the differential leader and follower motor controllers.
         // Some configs will be overwritten; check the `With*InitialConfigs()` API documentation.
         static constexpr configs::TalonFXConfiguration leaderInitialConfigs = configs::TalonFXConfiguration{}
            .WithMotorOutput(
               configs::MotorOutputConfigs{}
                  .WithNeutralMode(signals::NeutralModeValue::Brake)
            )
            .WithCurrentLimits(
               configs::CurrentLimitsConfigs{}
                  .WithStatorCurrentLimit(80_A)
                  .WithStatorCurrentLimitEnable(true)
            )
            .WithFeedback(
               configs::FeedbackConfigs{}
                  .WithSensorToMechanismRatio(kAverageGearRatio)
            )
            .withClosedLoopGeneral(
               configs::ClosedLoopGeneralConfigs{}
                  // differential wrist is continuous on the difference axis
                  .WithDifferentialContinuousWrap(true)
            )
            .WithSlot0(averageGains)
            .WithSlot1(differenceGains)
            .WithMotionMagic(
               configs::MotionMagicConfigs{}
                  .WithMotionMagicCruiseVelocity(80_tps)
                  .WithMotionMagicAcceleration(320_tr_per_s_sq)
            );
         static constexpr configs::TalonFXConfiguration followerInitialConfigs = configs::TalonFXConfiguration{}
            .WithFeedback(
               configs::FeedbackConfigs{}
                  .WithSensorToMechanismRatio(kAverageGearRatio)
            );

         // CAN bus that the devices are located on;
         // All mechanism devices must share the same CAN bus
         static constexpr std::string_view kCANBusName = "canivore";
         static inline CANBus kCANBus{kCANBusName, "./logs/example.hoot"};

         static constexpr mechanisms::DifferentialMotorConstants differentialConstants =
            mechanisms::DifferentialMotorConstants<configs::TalonFXConfiguration>{}
               .WithCANBusName(kCANBusName)
               .WithLeaderId(0)
               .WithFollowerId(1)
               .WithAlignment(signals::MotorAlignmentValue::Opposed)
               .WithSensorToDifferentialRatio(kDifferenceGearRatio)
               .WithClosedLoopRate(200_Hz)
               .WithLeaderInitialConfigs(leaderInitialConfigs)
               .WithFollowerInitialConfigs(followerInitialConfigs)
               .WithFollowerUsesCommonLeaderConfigs(true);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Average axis gains typically go in Slot 0
         _average_gains = (
            configs.Slot0Configs()
            .with_k_p(10)
            .with_k_i(0)
            .with_k_d(0.1)
            .with_k_g(0.2)
            .with_k_s(0.1)
            .with_k_v(0.12)
            .with_k_a(0)
            .with_gravity_type(signals.GravityTypeValue.ARM_COSINE)
         )
         # Difference axis gains typically go in Slot 1
         _difference_gains = (
            configs.Slot1Configs()
            .with_k_p(10)
            .with_k_i(0)
            .with_k_d(0.1)
            .with_k_s(0.1)
            .with_k_v(0.12)
         )

         _average_gear_ratio = 3.0
         _difference_gear_ratio = 2.0

         # Initial configs for the differential leader and follower motor controllers.
         # Some configs will be overwritten; check the `with*InitialConfigs()` API documentation.
         _leader_initial_configs = (
            configs.TalonFXConfiguration()
            .with_motor_output(
               configs.MotorOutputConfigs()
               .with_neutral_mode(signals.NeutralModeValue.BRAKE)
            )
            .with_current_limits(
               configs.CurrentLimitsConfigs()
               .with_stator_current_limit(80.0)
               .with_stator_current_limit_enable(True)
            )
            .with_feedback(
               configs.FeedbackConfigs()
               .with_sensor_to_mechanism_ratio(_average_gear_ratio)
            )
            .with_closed_loop_general(
               configs.ClosedLoopGeneralConfigs()
               # differential wrist is continuous on the difference axis
               .with_differential_continuous_wrap(True)
            )
            .with_slot0(_average_gains)
            .with_slot1(_difference_gains)
            .with_motion_magic(
               configs.MotionMagicConfigs()
               .with_motion_magic_cruise_velocity(80)
               .with_motion_magic_acceleration(320)
            )
         )
         _follower_initial_configs = (
            configs.TalonFXConfiguration()
            .with_feedback(
               configs.FeedbackConfigs()
               .with_sensor_to_mechanism_ratio(_average_gear_ratio)
            )
         )

         # CAN bus that the devices are located on;
         # All mechanism devices must share the same CAN bus
         self._canbus = CANBus("canivore", "./logs/example.hoot")

         self._differential_constants: mechanisms.DifferentialMotorConstants[configs.TalonFXConfiguration] = (
            mechanisms.DifferentialMotorConstants()
            .with_can_bus_name(_canbus.name)
            .with_leader_id(0)
            .with_follower_id(1)
            .with_alignment(signals.MotorAlignmentValue.OPPOSED)
            .with_sensor_to_differential_ratio(_difference_gear_ratio)
            .with_closed_loop_rate(200.0)
            .with_leader_initial_configs(_leader_initial_configs)
            .with_follower_initial_configs(_follower_initial_configs)
            .with_follower_uses_common_leader_configs(True)
         )

Building the Mechanism
----------------------

The differential motor constants can then be used to construct the ``DifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html>`__) or ``SimpleDifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/mechanisms/SimpleDifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_simple_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/mechanisms/simple_differential_mechanism/index.html>`__). The mechanisms have constructor overloads to provide a remote sensor for the Difference axis, such as the yaw of a Pigeon 2.

.. tab-set::

   .. tab-item:: ``DifferentialMechanism``
      :sync: differential

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Construct the mechanism, Difference axis uses half the difference between the motors
               private final DifferentialMechanism<TalonFX> diffMech =
                  new DifferentialMechanism<TalonFX>(TalonFX::new, differentialConstants);

               // Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               private final Pigeon2 pigeon2 = new Pigeon2(0, kCANBus);
               private final DifferentialMechanism<TalonFX> diffMech =
                  new DifferentialMechanism<TalonFX>(
                     TalonFX::new, differentialConstants,
                     pigeon2, DifferentialPigeon2Source.Yaw
                  );

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Construct the mechanism, Difference axis uses half the difference between the motors
               mechanisms::DifferentialMechanism<hardware::TalonFX> diffMech{differentialConstants};

               // Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               hardware::Pigeon2 pigeon2{0, kCANBus};
               mechanisms::DifferentialMechanism<hardware::TalonFX> diffMech{
                  differentialConstants, pigeon2,
                  mechanisms::DifferentialPigeon2Source::Yaw
               };

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Construct the mechanism, Difference axis uses half the difference between the motors
               self._diff_mech: mechanisms.DifferentialMechanism[hardware.TalonFX] = (
                  mechanisms.DifferentialMechanism(hardware.TalonFX, self._differential_constants)
               )

               # Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               self._pigeon2 = hardware.Pigeon2(0, self._canbus)
               self._diff_mech: mechanisms.DifferentialMechanism[hardware.TalonFX] = (
                  mechanisms.DifferentialMechanism(
                     hardware.TalonFX,
                     self._differential_constants
                     self._pigeon2,
                     mechanisms.DifferentialPigeon2Source.YAW
                  )
               )

   .. tab-item:: ``SimpleDifferentialMechanism``
      :sync: simple-differential

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Construct the mechanism, Difference axis uses half the difference between the motors
               private final SimpleDifferentialMechanism<TalonFX> diffMech =
                  new SimpleDifferentialMechanism<TalonFX>(TalonFX::new, differentialConstants);

               // Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               private final Pigeon2 pigeon2 = new Pigeon2(0, kCANBus);
               private final SimpleDifferentialMechanism<TalonFX> diffMech =
                  new SimpleDifferentialMechanism<TalonFX>(
                     TalonFX::new, differentialConstants,
                     pigeon2, DifferentialPigeon2Source.Yaw
                  );

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Construct the mechanism, Difference axis uses half the difference between the motors
               mechanisms::SimpleDifferentialMechanism<hardware::TalonFX> diffMech{differentialConstants};

               // Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               hardware::Pigeon2 pigeon2{0, kCANBus};
               mechanisms::SimpleDifferentialMechanism<hardware::TalonFX> diffMech{
                  differentialConstants, pigeon2,
                  mechanisms::DifferentialPigeon2Source::Yaw
               };

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Construct the mechanism, Difference axis uses half the difference between the motors
               self._diff_mech: mechanisms.SimpleDifferentialMechanism[hardware.TalonFX] = (
                  mechanisms.SimpleDifferentialMechanism(hardware.TalonFX, self._differential_constants)
               )

               # Construct the mechanism, Difference axis uses the yaw of a Pigeon 2
               self._pigeon2 = hardware.Pigeon2(0, self._canbus)
               self._diff_mech: mechanisms.SimpleDifferentialMechanism[hardware.TalonFX] = (
                  mechanisms.SimpleDifferentialMechanism(
                     hardware.TalonFX,
                     self._differential_constants
                     self._pigeon2,
                     mechanisms.DifferentialPigeon2Source.YAW
                  )
               )
