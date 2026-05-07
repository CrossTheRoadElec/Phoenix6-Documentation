Swerve Simulation
=================

.. important:: Swerve simulation is only supported for FRC users.

The API supports a functionality focused simulation. This means that the simulation API assumes that the swerve drive is perfect (no scrub and no wheel slip). Additionally, it assumes a constant drive motor inertia regardless of the type of motion.

To update the simulated swerve robot state, ensure ``drivetrain.updateSimState(...)`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/swerve/SwerveDrivetrain.html#updateSimState(double,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1swerve_1_1_swerve_drivetrain.html#a26d01bf576e432bd377dd82498ed90d3>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/swerve/swerve_drivetrain/index.html#phoenix6.swerve.swerve_drivetrain.SwerveDrivetrain.update_sim_state>`__) is called in ``simulationPeriodic()``. The typical update rate of a robot project is 20 ms (0.020 seconds), and ``RobotController.getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_controller.html#a4b1e42e825583c82664a4ecc5d81b83f>`__, `Python <https://robotpy.readthedocs.io/projects/wpilib/en/stable/wpilib/RobotController.html#wpilib.RobotController.getBatteryVoltage>`__) can be used to get the simulated battery voltage.

The behavior of the simulated drivetrain can be improved to more closely match hardware by running the simulation logic at a faster update rate, such as by using a WPILib ``Notifier`` as demonstrated below.

.. important:: When using ``CommandSwerveDrivetrain`` from our examples or Tuner X, this is already handled by the subsystem.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         private static final double kSimLoopPeriod = 0.004; // 4 ms
         private Notifier m_simNotifier = null;
         private double m_lastSimTime;

         @Override
         public void simulationInit() {
            m_lastSimTime = Utils.getCurrentTimeSeconds();

            /* Run simulation at a faster rate so PID gains behave more reasonably */
            m_simNotifier = new Notifier(() -> {
               final double currentTime = Utils.getCurrentTimeSeconds();
               double deltaTime = currentTime - m_lastSimTime;
               m_lastSimTime = currentTime;

               /* Use the measured time delta, get battery voltage from WPILib */
               drivetrain.updateSimState(deltaTime, RobotController.getBatteryVoltage());
            });
            m_simNotifier.startPeriodic(kSimLoopPeriod);
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         private:
            static constexpr units::second_t kSimLoopPeriod = 4_ms;
            std::unique_ptr<frc::Notifier> m_simNotifier;
            units::second_t m_lastSimTime;

         public:
            void SimulationInit() override
            {
               m_lastSimTime = utils::GetCurrentTime();

               /* Run simulation at a faster rate so PID gains behave more reasonably */
               m_simNotifier = std::make_unique<frc::Notifier>([this] {
                  units::second_t const currentTime = utils::GetCurrentTime();
                  auto const deltaTime = currentTime - m_lastSimTime;
                  m_lastSimTime = currentTime;

                  /* Use the measured time delta, get battery voltage from WPILib */
                  drivetrain.UpdateSimState(deltaTime, frc::RobotController::GetBatteryVoltage());
               });
               m_simNotifier->StartPeriodic(kSimLoopPeriod);
            }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         _SIM_LOOP_PERIOD: units.second = 0.004  # 4 ms

         def __init__(self):
            self._sim_notifier: Notifier | None = None
            self._last_sim_time: units.second = 0.0
            # ...

         def simulationInit(self):
            def _sim_periodic():
               current_time = utils.get_current_time_seconds()
               delta_time = current_time - self._last_sim_time
               self._last_sim_time = current_time

               # Use the measured time delta, get battery voltage from WPILib
               self.drivetrain.update_sim_state(delta_time, RobotController.getBatteryVoltage())

            # Run simulation at a faster rate so PID gains behave more reasonably
            self._last_sim_time = utils.get_current_time_seconds()
            self._sim_notifier = Notifier(_sim_periodic)
            self._sim_notifier.startPeriodic(self._SIM_LOOP_PERIOD)

Simulation FAQ
--------------

Q: My robot does not move in simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Verify that all gains are non-zero and that the steer/drive inertia is non-zero.

Q: My robot drifts a bit when driving while rotating
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Azimuth inertia and control latency is simulated. As a result, simulated swerve modules match the behavior of hardware in lagging behind the module targets, which can be improved by tuning the steer PID gains.
