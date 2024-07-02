.. raw:: html

   <script src="../../_static/pid-tune.js"></script>
   <link rel="stylesheet" type="text/css" href="../../_static/pid-tune.css" />


How to Manually Tune your PID Loops
===================================
*Authored by Cory*

There's plenty of tools available now that allow users to characterize their mechanism and find the ideal gains, however sometimes it's faster and easier to manually tune a mechanism. This guide covers how to tune the more popular Phoenix 6 PID loops manually.

General Information
-------------------

Every closed loop controller has the following aspects consistent:

1. Gains are canonical

   - :math:`k_{P} = \frac{\mathrm{motor\_output}}{\mathrm{error}}`

   - :math:`k_{I} = \frac{\mathrm{motor\_output}}{\mathrm{error} \cdot \mathrm{sec}}`

   - :math:`k_{D} = \frac{\mathrm{motor\_output}}{\frac{\mathrm{error}}{\mathrm{sec}}}=\frac{\mathrm{motor\_output} \cdot \mathrm{sec}}{\mathrm{error}}`

   - :math:`k_{S} = \mathrm{motor\_output}`

   - :math:`k_{G} = \frac{\mathrm{motor\_output}}{\cos(\mathrm{angle})}` if mechanism is arm; :math:`k_{G} = \mathrm{motor\_output}` if mechanism is an elevator

   - :math:`k_{V} = \frac{\mathrm{motor\_output}}{\mathrm{vel}}`

   - :math:`k_{A} = \frac{\mathrm{motor\_output}}{\mathrm{acc}}`

2. Motor output is dependent on control type

   - Duty Cycle uses percent of supply voltage: :math:`\mathrm{motor\_output}=\mathrm{duty\_cycle}`

   - Voltage uses motor output voltage: :math:`\mathrm{motor\_output}=\mathrm{Volts}`

   - Torque Current uses stator amps: :math:`\mathrm{motor\_output}=\mathrm{Amps}`

3. Everything operates in Mechanism units

   - This generally multiplies the gains by the gear ratio

   - A 100:1 reduction means a :math:`k_{P}=1` is 1 Volt output at 1 rotation error at the mechanism, or 1 Volt output at 100 rotations error at the motor.


This leads to the first major aspect of manual PID tuning - finding a good start. Since every gain is canonical, you can back-calculate what value the gain should start at based on the error you see and the desired motor voltage. Say I have an arm mechanism that is currently 0.1 rotations away from where I want it to be. I know that applying 1 volt of output is enough to move it, so at 0.1 rotation error I should apply 1 Volt to slowly bring it to the setpoint. That means my kP is :math:`k_{P}=\frac{\mathrm{Volts}}{\mathrm{error}}=\frac{1}{0.1}=10`. This is a good starting point for my mechanism and I can see a safe response that matches what I would do manually.

Similar math can be done for every other gain constant to find a good starting point.

Specific Response Tuning
------------------------

These general guidelines are great for understanding what's happening in a closed loop controller and how to forward-calculate what a reasonable starting point is. However, the specific mechanism you're tuning is going to affect how to find the ideal gains and what gains you should be using in the first place.

Flywheel Tuning with TorqueCurrentFOC
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Below is a list of steps and a simulator that provides the opportunity to try tuning a flywheel system using PID with TorqueControl. The Red line is the setpoint of the flywheel controller, purple is the current velocity, and the green line is the current of the motor in stator-amps.

Tuning a flywheel is largely done with the following steps:
 1. Zero all PID gains.
 2. Set a high setpoint (typically 8/10th the maximum velocity).
 3. Increase kS until just before the wheel starts moving.
 4. Set kP to a very low number (typically 10 / setpoint is a good starting point).
 5. Adjust kV until flywheel achieves setpoint.
 6. Set a low setpoint (1/10th of the maximum velocity).
 7. Adjust kS until flywheel achieves setpoint.
 8. Set back to the high setpoint.
 9. Repeat steps 4-7 until the gains stabilize.
 10. Increase kP until just before oscillation.
 11. Verify gains hold for expected velocities.

The simulator below allows you to follow these steps to find the right gains.

.. raw:: html

    <div class="viz-div" id="flywheel_both_container">
      <div >
         <div class="col" id="flywheel_both_plotVals"></div>
         <div class="col" id="flywheel_both_plotAmps"></div>
      </div>
      <div class="flex-grid">
         <div class="col" id="flywheel_both_viz"></div>
         <div id="flywheel_both_ctrls"></div>
      </div>
      <script>
         flywheel_bb = new FlywheelPIDF("flywheel_both", "both");
      </script>
    </div>


.. dropdown:: Tuning Walkthrough

   Following the guide, I start with all gains set to 0, set a setpoint of 80 (100 rps maximum), and begin with playing with the kS parameter.

   Setting kS to 1 doesn't start spinning the wheel, so I double it to 2, which remains still. Doubling it to 4 does start moving the wheel, so I take the halway point between 2 and 4, and set it to 3, but that lets the wheel move. So I leave the kS at 2 and move on to the next step.

   I set the kP to 10/10 = 1 (1 amp output per rps error), and notice that the wheel starts moving up to the setpoint, but can't quite reach it. It stalls out at 65-70 rps. This means the drag is significant and preventing us from reaching the setpoint, necessitating a kV.

   Now I set kV to 1, and notice that it significantly overshoots. I halve it to 0.5, 0.25, then 0.125 before I notice it doesn't achieve the target anymore. It's somewhere between 0.125 and 0.25 so I set it to 0.15 before saying it's good enough.

   Then, I set the setpoint to 10, and notice that I'm undershooting. This means I need to increase the kS gain further.

   I try 3 from before again, and notice that it overshoots. So I cut it in half to 2.5 and find that's pretty close.

   Going back to 80 rps, I'm still pretty close to the target, so I move on to increasing kP.

   I first double kP to 2, then 4, 8, and 16, noticing that the time to target is decreasing with a larger kP. A kP of 16 results in a bit of overshoot that I don't like, so I decrease it to 12, then 10 before it matches what I want. I increase to 11 and still like the response, so I leave it at 11.

   And that's the flywheel tuned! This took 2 iterations of going between low setpoint and high setpoint, but sometimes you may need more depending on how difficult your system's dynamics are and if you need tighter tolerances. In this case I'm eyeballing the response and saying it's good enough, but in practice you should use the closed loop error Status Signal to verify the error is within the tolerance of your mechanism.

Turret Tuning with TorqueCurrentFOC
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Tuning a Turret is identical to any other position controller that has no gravity component.

One key thing to note with any position-based torque controller is the reliance on the kD term. When tuning a position controller with voltage, it's often enough to rely on the natural dampening of the system to dampen the response, negating some of the need for kD. However when using torque as the control type, most of that natural dampening is gone, so kD is necessary for the system to stop itself in any reasonable amount of time.

Similarly to the velocity controller, below is a list of steps and simulator for turret tuning. Red is the setpoint in rotations, purple is the current position, green is the stator current in amps.

The following steps cover the general idea:
 1. Zero all PID gains.
 2. Set a setpoint relatively nearby (typically 0.1).
 3. Increase kS until just before the turret starts moving.
 4. Increase kP until you notice significant overshoot.
 5. Increase kD until the overshoot stops happening.
 6. Repeat steps 4 and 5 until increasing kD results in more oscillation, or until the system oscillates on its way to the setpoint.
 7. Verify gains work for other setpoints as well. Tune kP/kD as appropriate for most general cases.

.. note:: Values of kP=200, kD=15 demonstrate the "oscillates on its way to the setpoint" case for setpoints within 1 rotation.

.. raw:: html

    <div class="viz-div" id="turret_both_container">
      <div >
         <div class="col" id="turret_both_plotVals"></div>
         <div class="col" id="turret_both_plotAmps"></div>
      </div>
      <div class="flex-grid">
         <div class="col" id="turret_both_viz"></div>
         <div id="turret_both_ctrls"></div>
      </div>
      <script>
         turret = new TurretPIDF("turret_both", "both");
      </script>
    </div>

.. dropdown:: Tuning Walkthrough

   Following the guide, I start with all gains at 0 and set a setpoint of 0.1 rotations.

   I start with a kS of 1 amp and notice it moves, so I cut it in half to 0.5, 0.25, 0.125 until it stops. Increasing to 0.13 gets the turret moving again, so I leave it at 0.125 amps.

   I then set a kP of 1, and see significant overshoot, so I add a kD of 1. This is very overdamped system, but that's fine, as I'll start increasing kP again.

   I double kP to 2 and see no overshoot. Double again to 4, and I see a little overshoot. Double again to 8 and I see significant overshoot, indicating I should increase kD again. I double it to 2 and the overshoot becomes minimal, but then I double it again to 4 before it becomes significantly overdamped again.

   Doubling kP again to 16 still looks fine, to 32 is still fine, 64 finally has significant overshoot. I double kD to 8 and that overshoot is gone.

   So I doule kP again to 128, then to 256 where I notice it oscillates a bit. I try to stop this oscillation by increasing kD to 16, then to 32 where I notice it's always oscillating. This means I've reached the limit of the system, and need to back off on gains a bit.

   I reduce kD back to 16 where I notice a bit of oscillation on its way to the setpoint, and start dialing back kP. I start with a kP of 200, where it's overdamped and oscillating on its way to the setpoint. So I reduce kD to 12.

   From here I continue to reduce kP to 180, then 150 where I notice the oscillation on its way to the setpoint again. Reduce kD again to 10, and decrease kP to 140, then 130 where I see oscillation on its way to setpoint again.

   Reduce kD even more to 9, and the system response looks relatively good at this point. Now it's time to play with different setpoint. Any setpoint within 1 rotation looks good, which is appropriate for a turret. However, let's say I'm not tuning a turret anymore, but some other position controller where a setpoint of, say, 20 is appropriate. When I set a setpoint of 20, I notice significant overshoot that I should correct in PID.

   At this point, I know that my kD can't go much higher otherwise I have oscillation on my way to the setpoint at smaller setpoints. So I try to stop the oscillation only with kP. Reducing it to 120, 110, 100, then finally 90 before the overshoot stops. I check back with my 0.1 setpoint to make sure it's still good, but now it looks overdamped.

   So I reduce kD to 8, and it looks good. Back to a setpoint of 20, I have a bit of overshoot, so I reduce kP to 80 which looks good. Back to setpoint of 0.1, I have a bit of overdamped behavior, so I increase kP up to 85. Setpoint of 20 still has a bit of overshoot, so I bring kD up to 8.5 which looks good.

   Back to a setpoint of 0.1 and I still have some underdamped behavior, but it's minimal at this point and what I'd consider acceptable.

   If my system normally expects setpoints within 1 rotation of my current position, then I'd prioritize the within-1-rotation situation for my PID controller, however if my system normally expects setpoints closer to 20 rotations away from current position then I'd prioritize that situation. If I really needed both close and far away behavior, then I'd look at gain-scheduling based on the value of the error, using both Slots 0 and 1, with 0 for the within-1-rotation situation, and 1 for the outside-1-rotation situation.

