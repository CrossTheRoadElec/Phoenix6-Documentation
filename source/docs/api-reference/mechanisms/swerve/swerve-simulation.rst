Swerve Simulation
=================

.. important:: Swerve simulation is only supported for FRC users.

The API supports a functionality focused simulation. This means that the simulation API assumes that the swerve drive is perfect (no scrub and no wheel slip). Additionally, it assumes a constant drive motor inertia regardless of the type of motion.

To update the simulated swerve robot state, ensure ``drivetrain.updateSimState(...)`` is called in ``simulationPeriodic()``, where ``drivetrain`` is a ``SwerveDrivetrain``. The typical update rate of a robot project is 20 ms (0.020 seconds), and ``RobotController.getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_controller.html#a4b1e42e825583c82664a4ecc5d81b83f>`__, `Python <https://robotpy.readthedocs.io/projects/wpilib/en/stable/wpilib/RobotController.html#wpilib.RobotController.getBatteryVoltage>`__) can be used to get the simulated battery voltage.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         @Override
         public void simulationPeriodic() {
            /* Assume 20ms update rate, get battery voltage from WPILib */
            drivetrain.updateSimState(0.020, RobotController.getBatteryVoltage());
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         void SimulationPeriodic() override
         {
            /* Assume 20ms update rate, get battery voltage from WPILib */
            drivetrain.UpdateSimState(20_ms, frc::RobotController::GetBatteryVoltage());
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         def simulationPeriodic():
            # Assume 20ms update rate, get battery voltage from WPILib */
            drivetrain.update_sim_state(0.020, RobotController.getBatteryVoltage())

.. important:: When using ``CommandSwerveDrivetrain`` from our examples or Tuner X, this is handled in the subsystem instead.

Simulation FAQ
--------------

Q: My robot does not move in simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Verify that all gains are non-zero and that the steer/drive inertia is non-zero.

Q: My robot drifts a bit when driving while rotating
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Azimuth inertia and control latency is simulated. As a result, simulated swerve modules match the behavior of hardware in lagging behind the module targets, which can be improved by tuning the steer PID gains.
