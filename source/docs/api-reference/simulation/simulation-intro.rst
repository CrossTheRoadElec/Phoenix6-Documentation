Introduction to Simulation
==========================

Many CTR Electronics devices support high-fidelity simulation, allowing the simulated robot to match the behavior of the real robot hardware as closely as possible. This makes simulation a powerful tool to quickly diagnose and fix bugs in robot code without relying on access to hardware.

Supported Devices
-----------------

Currently, all Phoenix 6 devices are supported in simulation.

.. warning:: **Multiple** CAN buses using the :doc:`CANivore API </docs/canivore/canivore-api>` is not supported at this time. All CAN devices will **appear on the same CAN bus**. If you wish to run your robot code in simulation, ensure devices have **unique IDs across CAN buses**.

Simulation API
--------------

Each supported device has a device-specific ``SimState`` object that can be used to manage I/O with the simulated device. The object can be retrieved by calling ``getSimState()`` on an instance of a device.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var talonFXSim = m_talonFX.getSimState();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& talonFXSim = m_talonFX.GetSimState();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         talon_fx_sim = self.talon_fx.sim_state

.. note:: Phoenix 6 utilizes the `Java units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/java-units.html>`__ and `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ when applicable.

In general, simulation logic should **only** interact with the ``SimState`` class and the physics simulator (such as WPILib's ``DCMotorSim``), and the rest of the robot code should **never** interact with those simulation classes. This clear separation between simulation and hardware logic ensures that simulation most accurately reflects the behavior of the real robot hardware.

Orientation
^^^^^^^^^^^

The ``SimState`` API ignores typical device invert settings, as the user may change invert for any reason (such as flipping which direction is forward for a drivebase). As a result, for some devices, the ``SimState`` object supports specifying the orientation of the device relative to the robot chassis (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/sim/TalonFXSimState.html#Orientation>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1sim_1_1_talon_f_x_sim_state.html#ac3cce344719d64c98216286399936d6e>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/sim/talon_fx_sim_state/index.html#phoenix6.sim.talon_fx_sim_state.TalonFXSimState.orientation>`__).

This orientation represents the **mechanical** linkage between the device and the robot chassis. It **should not be changed with runtime invert**, as runtime invert specifies the *logical* orientation of the device. Rather, the orientation should **only be modified when the mechanical linkage itself changes**, such as when switching between two gearboxes inverted from each other.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var leftTalonFXSim = m_leftTalonFX.getSimState();
         var rightTalonFXSim = m_rightTalonFX.getSimState();

         // left drivetrain motors are typically CCW+
         leftTalonFXSim.Orientation = ChassisReference.CounterClockwise_Positive;

         // right drivetrain motors are typically CW+
         rightTalonFXSim.Orientation = ChassisReference.Clockwise_Positive;

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& leftTalonFXSim = m_leftTalonFX.GetSimState();
         auto& rightTalonFXSim = m_rightTalonFX.GetSimState();

         // left drivetrain motors are typically CCW+
         leftTalonFXSim.Orientation = sim::ChassisReference::CounterClockwise_Positive;

         // right drivetrain motors are typically CW+
         rightTalonFXSim.Orientation = sim::ChassisReference::Clockwise_Positive;

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         left_talon_fx_sim = self.left_talon_fx.sim_state
         right_talon_fx_sim = self.right_talon_fx.sim_state

         # left drivetrain motors are typically CCW+
         left_talon_fx_sim.orientation = sim.ChassisReference.COUNTER_CLOCKWISE_POSITIVE

         # right drivetrain motors are typically CW+
         right_talon_fx_sim.orientation = sim.ChassisReference.CLOCKWISE_POSITIVE

Inputs and Outputs
^^^^^^^^^^^^^^^^^^

All ``SimState`` objects contain multiple inputs to manipulate the state of the device based on simulation physics calculations. For example, all device ``SimState`` objects have a supply voltage input:

.. important::  Non-FRC platforms are required to set supply voltage, as it affects simulation calculations. It's recommended that FRC users set supply voltage to ``RobotController.getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_controller.html#a4b1e42e825583c82664a4ecc5d81b83f>`__) to take advantage of WPILib's ``BatterySim`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/simulation/BatterySim.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1sim_1_1_battery_sim.html>`__) API.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // set the supply voltage of the TalonFX to 12 V
         m_talonFXSim.setSupplyVoltage(Volts.of(12));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // set the supply voltage of the TalonFX to 12 V
         m_talonFXSim.SetSupplyVoltage(12_V);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # set the supply voltage of the TalonFX to 12 V
         self.talon_fx_sim.set_supply_voltage(12.0)

Some device ``SimState`` objects also contain outputs that can be used in simulation physics calculations. For example, the ``TalonFXSimState`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/sim/TalonFXSimState.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1sim_1_1_talon_f_x_sim_state.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/sim/talon_fx_sim_state/index.html>`__) object has a motor voltage output that can be used to calculate position and velocity:

.. important:: For all motor controllers, the ``RawRotorPosition`` and ``RotorVelocity`` values must be set for simulated PID and current limits to behave correctly. Additionally, simulated PID more closely matches hardware when updating the ``SimState`` more frequently, such as using a WPILib ``Notifier``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private static final double kGearRatio = 10.0;
         private final DCMotorSim m_motorSimModel = new DCMotorSim(
            LinearSystemId.createDCMotorSystem(
               DCMotor.getKrakenX60Foc(1), 0.001, kGearRatio
            )
            DCMotor.getKrakenX60Foc(1)
         );

         public void simulationInit() {
            var talonFXSim = m_talonFX.getSimState();
            talonFXSim.Orientation = ChassisReference.CounterClockwise_Positive;
            talonFXSim.setMotorType(TalonFXSimState.MotorType.KrakenX60);
         }

         public void simulationPeriodic() {
            var talonFXSim = m_talonFX.getSimState();

            // set the supply voltage of the TalonFX
            talonFXSim.setSupplyVoltage(RobotController.getBatteryVoltage());

            // get the motor voltage of the TalonFX
            var motorVoltage = talonFXSim.getMotorVoltageMeasure();

            // use the motor voltage to calculate new position and velocity
            // using WPILib's DCMotorSim class for physics simulation
            m_motorSimModel.setInputVoltage(motorVoltage.in(Volts));
            m_motorSimModel.update(0.020); // assume 20 ms loop time

            // apply the new rotor position and velocity to the TalonFX;
            // note that this is rotor position/velocity (before gear ratio), but
            // DCMotorSim returns mechanism position/velocity (after gear ratio)
            talonFXSim.setRawRotorPosition(m_motorSimModel.getAngularPosition().times(kGearRatio));
            talonFXSim.setRotorVelocity(m_motorSimModel.getAngularVelocity().times(kGearRatio));
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         static constexpr double kGearRatio = 10.0;
         frc::sim::DCMotorSim m_motorSimModel{
            frc::LinearSystemId::DCMotorSystem{
               frc::DCMotor::KrakenX60FOC(1),
               0.001_kg_sq_m,
               kGearRatio
            },
            frc::DCMotor::KrakenX60FOC(1)
         };

         void SimulationInit()
         {
            auto& talonFXSim = m_talonFX.GetSimState();
            talonFXSim.Orientation = sim::ChassisReference::CounterClockwise_Positive;
            talonFXSim.SetMotorType(sim::TalonFXSimState::MotorType::KrakenX60);
         }

         void SimulationPeriodic()
         {
            auto& talonFXSim = m_talonFX.GetSimState();

            // set the supply voltage of the TalonFX
            talonFXSim.SetSupplyVoltage(frc::RobotController::GetBatteryVoltage());

            // get the motor voltage of the TalonFX
            auto motorVoltage = talonFXSim.GetMotorVoltage();

            // use the motor voltage to calculate new position and velocity
            // using WPILib's DCMotorSim class for physics simulation
            m_motorSimModel.SetInputVoltage(motorVoltage);
            m_motorSimModel.Update(20_ms); // assume 20 ms loop time

            // apply the new rotor position and velocity to the TalonFX;
            // note that this is rotor position/velocity (before gear ratio), but
            // DCMotorSim returns mechanism position/velocity (after gear ratio)
            talonFXSim.SetRawRotorPosition(kGearRatio * m_motorSimModel.GetAngularPosition());
            talonFXSim.SetRotorVelocity(kGearRatio * m_motorSimModel.GetAngularVelocity());
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         GEAR_RATIO = 10.0

         def __init__(self):
            gearbox = DCMotor.krakenX60FOC(1)
            self.motor_sim_model = DCMotorSim(LinearSystemId.DCMotorSystem(gearbox, 0.001, GEAR_RATIO), gearbox)

         def simulationInit(self):
            talon_fx_sim = self.talon_fx.sim_state
            talon_fx_sim.orientation = sim.ChassisReference.COUNTER_CLOCKWISE_POSITIVE
            talon_fx_sim.set_motor_type(sim.TalonFXSimState.MotorType.KRAKEN_X60)

         def simulationPeriodic(self):
            talon_fx_sim = self.talon_fx.sim_state

            # set the supply voltage of the TalonFX
            talon_fx_sim.set_supply_voltage(RobotController.getBatteryVoltage())

            # get the motor voltage of the TalonFX
            motor_voltage = talon_fx_sim.motor_voltage

            # use the motor voltage to calculate new position and velocity
            # using WPILib's DCMotorSim class for physics simulation
            self.motor_sim_model.setInputVoltage(motor_voltage)
            self.motor_sim_model.update(0.020) # assume 20 ms loop time

            # apply the new rotor position and velocity to the TalonFX;
            # note that this is rotor position/velocity (before gear ratio), but
            # DCMotorSim returns mechanism position/velocity (after gear ratio)
            talon_fx_sim.set_raw_rotor_position(
               GEAR_RATIO
               * units.radiansToRotations(self.motor_sim_model.getAngularPosition())
            )
            talon_fx_sim.set_rotor_velocity(
               GEAR_RATIO
               * units.radiansToRotations(self.motor_sim_model.getAngularVelocity())
            )

High Fidelity CAN Bus Simulation
--------------------------------

As a part of high-fidelity simulation, the influence of the CAN bus is simulated at a level similar to what happens on a real robot. This means that the timing behavior of control and status signals in simulation will align to the same framing intervals seen on a real CAN bus. In simulation, this may appear as a delay between setting a signal and getting its real value, or between setting its real value and getting it in API.

In unit tests, it may be useful to increase the update rate of status signals to avoid erroneous failures and minimize delays. The update rate can be modified for simulation by wrapping the :ref:`signal update frequency <docs/api-reference/api-usage/status-signals:changing update frequency>` in a ``Utils.isSimulation()`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/Utils.html#isSimulation()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/namespacectre_1_1phoenix6_1_1utils.html#a4d309e0125a0f686b3fe1a8c064a1f65>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/utils/index.html#phoenix6.utils.is_simulation>`__) condition.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         if (Utils.isSimulation()) {
            // set update rate to 1ms for unit tests
            m_velocitySignal.setUpdateFrequency(Hertz.of(1000));
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         if (utils::IsSimulation()) {
            // set update rate to 1ms for unit tests
            m_velocitySignal.SetUpdateFrequency(1000_Hz);
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         if utils.is_simulation():
            # set update rate to 1ms for unit tests
            self.velocity_signal.set_update_frequency(1000.0)
