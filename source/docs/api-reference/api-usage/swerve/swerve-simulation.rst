Swerve Simulation
=================

The API supports a functionality focused simulation. This means that the simulation API assumes that the swerve drive is perfect (no scrub and no wheel slip). Additionally, it assumes the inertia of the steer module and the drive modules. Robot-wide, rotational and translational inertia is not accounted for.

To update the simulated swerve robot state, ensure ``m_drivetrain.updateSimState(0.02, 12)`` (``m_drivetrain`` is a ``SwerveDrivetrain``, ``0.02`` is the loop update rate, and ``12`` is the battery voltage) is called in ``simulationPeriodic()``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         @Override
         public void simulationPeriodic() {
            /* Assume 20ms update rate, 12v battery voltage */
            updateSimState(0.02, 12);
         }

.. note:: When utilizing ``CommandSwerveDrivetrain`` (via example, or Tuner X), this is handled in the subsystem ``simulationPeriodic`` instead.

Simulation FAQ
--------------

Q: My robot does not move in simulation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Verify that all gains are non-zero and that the steer/drive inertia is non-zero.

Q: My robot stutters when driving
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A: Simulation uses predetermined constants that represent the drivetrain, as such, gains may be inaccurate compared to the real robot.
