Swerve Next Steps
=================

Now that you have a working swerve drive, you may want to explore some of the following topics.

Setting Current Limits
----------------------

Current limits are an important part of battery management. The following represents a short example of setting Supply Current limits to the drive motors in a Tuner generated swerve project. To determine the correct current limits, and understand what they do and how they affect robot control, please refer to :doc:`Improving Performance with Current Limits </docs/hardware-reference/talonfx/improving-performance-with-current-limits>`.

.. code-block:: java

   // Initial configs for the drive and steer motors and the azimuth encoder; these cannot be null.
   // Some configs will be overwritten; check the `with*InitialConfigs()` API documentation.
   private static final TalonFXConfiguration driveInitialConfigs = new TalonFXConfiguration()
      .withCurrentLimits(
         new CurrentLimitsConfigs()
               .withSupplyCurrentLimit(70)
               .withSupplyCurrentLimitEnable(true)
      );
