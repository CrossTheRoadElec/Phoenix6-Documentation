Unit Testing
============

:doc:`High-fidelity simulation </docs/api-reference/simulation/simulation-intro>` with CTR Electronics devices can be used for `unit testing <https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/unit-testing.html>`__ robot applications.

When writing unit tests, the regular device APIs should be used to control devices and read status signals. Just like in simulation, the device ``SimState`` API can be used to update the simulated state of the device.

Additionally, users must ensure the robot is enabled prior to controlling actuators. This can be accomplished in WPILib by calling ``DriverStationSim.setEnabled(true)`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/simulation/DriverStationSim.html#setEnabled(boolean)>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1sim_1_1_driver_station_sim.html#a2dec77debb4d78d0dd7753a2c4cd4d2e>`__), followed by ``DriverStation.notifyNewData()`` to apply the change (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/simulation/DriverStationSim.html#notifyNewData()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1sim_1_1_driver_station_sim.html#ad83b913f0c6e8d3fba87adba6528e3be>`__).

.. important:: There may be a short delay between enabling the robot and the simulated actuators being enabled. Unit tests should delay for ~100ms after constructing all devices and enabling the robot to account for this delay.

In unit tests, users should utilize the ``StatusSignal.waitForUpdate()`` and ``BaseStatusSignal.waitForAll()`` APIs to wait for fresh data after sending a control request or modifying the simulated device state.

.. important:: There may be a short delay between sending a control request and the simulated device applying the control. Unit tests should delay for ~20ms after sending a control request to account for this delay.

Below is an example unit test that verifies the robot is enabled and verifies that the device responds to a control request.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         public class TalonFXTest implements AutoCloseable {
            static final double DELTA = 1e-3; // acceptable deviation range

            static final double kGearRatio = 10.0;

            TalonFX m_fx;
            TalonFXSimState m_fxSim;
            DCMotorSim m_motorSim;

            @Override
            public void close() {
               /* destroy our TalonFX object */
               m_fx.close();
            }

            @BeforeEach
            public void constructDevices() {
               assert HAL.initialize(500, 0);

               /* create the TalonFX */
               m_fx = new TalonFX(0);
               m_fxSim = m_fx.getSimState();
               /* create the simulated DC motor */
               var gearbox = DCMotor.getKrakenX60Foc(1);
               m_motorSim = new DCMotorSim(
                  LinearSystemId.createDCMotorSystem(gearbox, 0.001, kGearRatio),
                  gearbox
               );

               /* enable the robot */
               DriverStationSim.setEnabled(true);
               DriverStationSim.notifyNewData();

               /* delay ~100ms so the devices can start up and enable */
               Timer.delay(0.100);
            }

            @AfterEach
            void shutdown() {
               close();
            }

            @Test
            public void robotIsEnabled() {
               /* verify that the robot is enabled */
               assertTrue(DriverStation.isEnabled());
            }

            @Test
            public void motorDrives() {
               /* set the voltage supplied by the battery */
               m_fxSim.setSupplyVoltage(RobotController.getBatteryVoltage());

               var dutyCycle = m_fx.getDutyCycle();

               /* wait for a fresh duty cycle signal */
               dutyCycle.waitForUpdate(0.100);
               /* verify that the motor output is zero */
               assertEquals(dutyCycle.getValue(), 0.0, DELTA);

               /* request 100% output */
               m_fx.setControl(new DutyCycleOut(1.0));

               /* wait for the control to apply and the motor to accelerate */
               for (int i = 0; i < 10; ++i) {
                  Timer.delay(0.020);
                  m_motorSim.setInputVoltage(m_fxSim.getMotorVoltage();
                  m_motorSim.update(0.020);

                  m_fxSim.setRawRotorPosition(m_motorSim.getAngularPosition().times(kGearRatio));
                  m_fxSim.setRotorVelocity(m_motorSim.getAngularVelocity().times(kGearRatio));
               }

               /* wait for a new duty cycle signal */
               dutyCycle.waitForUpdate(0.100);
               /* verify that the motor output is 1.0 */
               assertEquals(dutyCycle.getValue(), 1.0, DELTA);
            }
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         class TalonFXTest : public testing::Test {
         protected:
            static constexpr double kGearRatio = 10.0;

            /* create the TalonFX */
            hardware::TalonFX m_fx{0};
            sim::TalonFXSimState& m_fxSim{m_fx.GetSimState()};
            /* create the simulated DC motor */
            frc::sim::DCMotorSim m_motorSim{
               frc::LinearSystemId::DCMotorSystem{
                  frc::DCMotor::KrakenX60FOC(1),
                  0.001_kg_sq_m,
                  kGearRatio
               },
               frc::DCMotor::KrakenX60FOC(1)
            };

            void SetUp() override
            {
               /* enable the robot */
               frc::sim::DriverStationSim::SetEnabled(true);
               frc::sim::DriverStationSim::NotifyNewData();

               /* delay ~100ms so the devices can start up and enable */
               std::this_thread::sleep_for(std::chrono::milliseconds{100});
            }
         };

         TEST_F(TalonFXTest, RobotIsEnabled)
         {
            /* verify that the robot is enabled */
            EXPECT_TRUE(frc::DriverStation::IsEnabled());
         }

         TEST_F(TalonFXTest, MotorDrives)
         {
            /* set the voltage supplied by the battery */
            m_fxSim.SetSupplyVoltage(frc::RobotController::GetBatteryVoltage());

            auto& dutyCycle = m_fx.GetDutyCycle();

            /* wait for a fresh duty cycle signal */
            dutyCycle.WaitForUpdate(100_ms);
            /* verify that the motor output is zero */
            EXPECT_DOUBLE_EQ(dutyCycle.GetValue(), 0.0);

            /* request 100% output */
            m_fx.SetControl(controls::DutyCycleOut{1.0});

            /* wait for the control to apply and the motor to accelerate */
            for (int i = 0; i < 10; ++i) {
               std::this_thread::sleep_for(std::chrono::milliseconds{20});
               m_motorSim.SetInputVoltage(m_fxSim.GetMotorVoltage());
               m_motorSim.Update(20_ms);

               m_fxSim.SetRawRotorPosition(kGearRatio * m_motorSim.GetAngularPosition());
               m_fxSim.SetRotorVelocity(kGearRatio * m_motorSim.GetAngularVelocity());
            }

            /* wait for a new duty cycle signal */
            dutyCycle.WaitForUpdate(100_ms);
            /* verify that the motor output is 1.0 */
            EXPECT_DOUBLE_EQ(dutyCycle.GetValue(), 1.0);
         }
