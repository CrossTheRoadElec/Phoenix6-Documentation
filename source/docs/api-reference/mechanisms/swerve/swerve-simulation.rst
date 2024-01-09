Swerve Simulation
=================

The API supports a functionality focused simulation. This means that the simulation API assumes that the swerve drive is perfect (no scrub and no wheel slip). Additionally, it assumes the inertia of the steer module and the drive modules. Robot-wide, rotational and translational inertia is not accounted for.

To update the simulated swerve robot state, ensure ``m_drivetrain.updateSimState()`` is called in ``simulationPeriodic()``, where ``m_drivetrain`` is a ``SwerveDrivetrain``. The typical update rate of a robot project is 20 ms (0.020 seconds), and ``RobotController.getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__) can be used to get the simulated battery voltage.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         @Override
         public void simulationPeriodic() {
            /* Assume 20ms update rate, get battery voltage from WPILib */
            updateSimState(0.020, RobotController.getBatteryVoltage());
         }

.. important:: When utilizing ``CommandSwerveDrivetrain`` (from our examples or Tuner X), this is handled in the subsystem ``simulationPeriodic`` instead.

Simulation FAQ
--------------

Q: My robot does not move in simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Verify that all gains are non-zero and that the steer/drive inertia is non-zero.

Q: My robot stutters when driving
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Simulation uses predetermined constants that represent the drivetrain, as such, gains may be inaccurate compared to the real robot.
