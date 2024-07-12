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
      - The amount of output to apply per unit of error in the system.

   - :math:`k_{I} = \frac{\mathrm{motor\_output}}{\mathrm{error} \cdot \mathrm{sec}}`
      - The amount of output to apply per unit of error for every second of that error.

   - :math:`k_{D} = \frac{\mathrm{motor\_output}}{\frac{\mathrm{error}}{\mathrm{sec}}}=\frac{\mathrm{motor\_output} \cdot \mathrm{sec}}{\mathrm{error}}`
      - The amount of output to apply per change in error over time.

   - :math:`k_{S} = \mathrm{motor\_output}`
      - A static or constant amount of output to apply typically used to overcome friction.

   - :math:`k_{G} = \frac{\mathrm{motor\_output}}{\cos(\mathrm{angle})}` if mechanism is arm; :math:`k_{G} = \mathrm{motor\_output}` if mechanism is an elevator
      - The amount of output to apply to counteract the force of gravity.

   - :math:`k_{V} = \frac{\mathrm{motor\_output}}{\mathrm{vel}}`
      - The amount of output to apply per target velocity. In Voltage control modes this is a feed forward to counteract the back-emf of the motor. In Current control modes this is a feed forward to counteract the force of drag on the system.

   - :math:`k_{A} = \frac{\mathrm{motor\_output}}{\mathrm{acc}}`
      - The amount of output to apply per target acceleration. This is used to account for the inertia of a system.

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

This particular flywheel has a maximum velocity of 100 rps.

Tuning a flywheel is largely done with the following steps:
 1. Zero all PID gains.
 2. Set a high setpoint (typically 8/10th the maximum velocity).
 3. Increase kS until the wheel starts moving, then back off to just before that movement.
 4. Set kP to a very low number (typically 10 / setpoint is a good starting point).
 5. Adjust kV until flywheel achieves setpoint.
 6. Set a low setpoint (1/10th of the maximum velocity).
 7. Adjust kS until flywheel achieves setpoint.
 8. Set back to the high setpoint.
 9. Repeat steps 5-8 until the gains do not change.
 10. Increase kP until the flywheel oscillates, then back off to just before that oscillation.
 11. Verify gains hold for expected velocities.

.. dropdown:: "Why" for each step

   1. We start with PID gains at 0 to isolate as many of the forces in play as possible, and iteratively get closer to the "ideal" gains.
   2. There needs to be a setpoint for the parameters to take affect, and a higher setpoint sets up the following steps.
   3. The kS gain is meant to reduce the effect of friction without it moving the mechanism on its own, so getting it as close to breaking friction without it actually breaking friction is ideal. However, this step alone only accounts for static friction which isn't ideal in a flywheel, where it'll typically be experiencing rolling friction. This is managed in a later step.
   4. A low kP will magnify the requirement for a good kS and kV. If this gain is too high it'll mask a "bad" kS and kV during the kS/kV tuning.
   5. When the setpoint is high, the kV will dwarf the kS term in its effectiveness, so the kV term should be prioritized to achieve the setpoint.
   6. Setting a low setpoint will prioritize the kS term during its tuning phase.
   7. With the low setpoint, the kS term will dwarf the kV term and correctly account for rolling friction.
   8. Going back to a high setpoint verifies the kV term is still correct.
   9. Typically, after reducing kS the system won't achieve its high setpoint, so the kV term needs to increase. Similarly, increasing kV may cause the system to overshoot the low setpoint, requiring the kS to lower. This procedure continues until the kS/kV gains stabilize and stop changing, indicating the feed forwards are correct.
   10. With proper kS/kV terms, the kP can be increased to quickly achieve the setpoint. The system wants as high a kP gain as possible to decrease the time taken to get to the setpoint. The limit of how high the kP term can be is determined by the system latency, at which point the oscillation is impossible to avoid. The goal of repeating steps 5-8 is to find that limit.
   11. Always verify the gains work for the setpoints you expect the system to be commanded, as it's possible the generic gains may not work under the operating range of the system. If that's the case, adjust the setpoints to be within the expected operating range and re-tune with them.

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

.. note:: The flywheel will react to the ball getting launched at 5 seconds.

.. dropdown:: Tuning Process Example

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
 2. Set a setpoint relatively nearby (typically 0.1 mechanism rotations).
 3. Increase kS until the turret starts moving, then back off to just before that movement.
 4. Increase kP until you notice significant overshoot.
 5. Increase kD until the overshoot stops happening.
 6. Repeat steps 4 and 5 until increasing kD results in more oscillation, or until the system oscillates on its way to the setpoint. If oscillation on the way to setpoint is seen, decrease kD until it stops. If overshoot in general is happening and kD is already at max, reduce kP until it stops.
 7. Verify gains work for other setpoints as well. Tune kP/kD as appropriate for most general cases.

.. note:: Values of kP=200, kD=15 demonstrate the "oscillates on its way to the setpoint" case for setpoints within 1 rotation.

.. dropdown:: "Why" for each step

   1. We start with PID gains at 0 to isolate as many of the forces in play as possible, and iteratively get closer to the "ideal" gains.
   2. A nearby setpoint ensures the system response should be relatively small to start with when tuning.
   3. The kS gain is meant to reduce the effect of friction, so the largest possible value that still prevents the system from moving will reduce the effect of friction in general.
   4. The kP gain will control how quickly the system gets to the setpoint, however in TorqueCurrentFOC modes there is no natural dampening force, so overshoot is expected at the beginning. Once that happens kD should be tuned.
   5. The kD gain will effectively slow down the system as it reaches the setpoint, increasing it will increase the force slowing it down, so it should be increased until the system no longer overshoots.
   6. In general, the system wants as high a kP gain as possible to decrease the time taken to get to the setpoint. This also requires a high kD gain to properly dampen the system. The limit of how high the kP/kD term can be is determined by the system latency, at which point the oscillation is impossible to avoid. The goal of repeating steps 4 and 5 is to find that limit.
   7. Always verify the gains work for the expected setpoints of the system, it's possible the general solution may not work under the expected operating range of the system. If that's the case, re-tune for the expected operating range using the generic gains as a basis.

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

.. dropdown:: Tuning Process Example

   Following the guide, I start with all gains at 0 and set a setpoint of 0.1 rotations.

   I start with a kS of 1 amp and notice it moves, so I cut it in half to 0.5, 0.25, 0.125 until it stops. Increasing to 0.13 gets the turret moving again, so I leave it at 0.125 amps.

   I then set a kP of 1, and see significant overshoot, so I add a kD of 1. This is very overdamped system, but that's fine, as I'll start increasing kP again.

   I double kP to 2 and see no overshoot. Double again to 4, and I see a little overshoot. Double again to 8 and I see significant overshoot, indicating I should increase kD again. I double it to 2 and the overshoot becomes minimal, but then I double it again to 4 before it becomes significantly overdamped again.

   Doubling kP again to 16 still looks fine, to 32 is still fine, 64 finally has significant overshoot. I double kD to 8 and that overshoot is gone.

   So I double kP again to 128, then to 256 where I notice it oscillates a bit. I try to stop this oscillation by increasing kD to 16, then to 32 where I notice it's always oscillating. This means I've reached the limit of the system, and need to back off on gains a bit.

   I reduce kD back to 16 where I notice a bit of oscillation on its way to the setpoint, and start dialing back kP. I start with a kP of 200, where it's overdamped and oscillating on its way to the setpoint. So I reduce kD to 12.

   From here I continue to reduce kP to 180, then 150 where I notice the oscillation on its way to the setpoint again. Reduce kD again to 10, and decrease kP to 140, then 130 where I see oscillation on its way to setpoint again.

   Reduce kD even more to 9, and the system response looks relatively good at this point. Now it's time to play with different setpoint. Any setpoint within 1 rotation looks good, which is appropriate for a turret. However, let's say I'm not tuning a turret anymore, but some other position controller where a setpoint of, say, 20 is appropriate. When I set a setpoint of 20, I notice significant overshoot that I should correct in PID.

   At this point, I know that my kD can't go much higher otherwise I have oscillation on my way to the setpoint at smaller setpoints. So I try to stop the oscillation only with kP. Reducing it to 120, 110, 100, then finally 90 before the overshoot stops. I check back with my 0.1 setpoint to make sure it's still good, but now it looks overdamped.

   So I reduce kD to 8, and it looks good. Back to a setpoint of 20, I have a bit of overshoot, so I reduce kP to 80 which looks good. Back to setpoint of 0.1, I have a bit of overdamped behavior, so I increase kP up to 85. Setpoint of 20 still has a bit of overshoot, so I bring kD up to 8.5 which looks good.

   Back to a setpoint of 0.1 and I still have some underdamped behavior, but it's minimal at this point and what I'd consider acceptable.

   If my system normally expects setpoints within 1 rotation of my current position, then I'd prioritize the within-1-rotation situation for my PID controller, however if my system normally expects setpoints closer to 20 rotations away from current position then I'd prioritize that situation. If I really needed both close and far away behavior, then I'd look at gain-scheduling based on the value of the error, using both Slots 0 and 1, with 0 for the within-1-rotation situation, and 1 for the outside-1-rotation situation.


Arm Tuning with TorqueCurrentFOC
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Tuning an Arm is very similar to tuning a turret, just with the addition of needing to account for gravity. As such, the process is nearly identical, except for a small section dedicated to dialing in the kG term.

The steps:
 1. Zero all PID gains.
 2. Increase kG and find the smallest possible kG that stops the arm from moving.
 3. Increase kG and find the largest possible kG that stops the arm from moving.
 4. Set kG to the middle of the two.
 5. Set a setpoint relatively nearby (typically 0.1 mechanism rotations).
 6. Increase kS until the arm starts moving, then back off to just before that movement.
 7. Increase kP until you notice significant overshoot.
 8. Increase kD until the overshoot stops happening.
 9. Repeat steps 7 and 8 until increasing kD results in more oscillation, or until the system oscillates on its way to the setpoint. If oscillation on the way to setpoint is seen, decrease kD until it stops. If overshoot in general is happening and kD is already at max, reduce kP until it stops.
 10. Verify gains work for other setpoints as well. Tune kP/kD as appropriate for most general cases.

.. dropdown:: "Why" for each step

   1. We start with PID gains at 0 to isolate as many of the forces in play as possible, and iteratively get closer to the "ideal" gains.
   2. The kG gain is meant to counteract the force of gravity, however the force of friction is also at play in an arm. The lowest possible kG that prevents the system from moving is the lower bound of the gravity and friction component.
   3. The highest possible kG that prevents the system from moving is the upper bound of the gravity and friction component.
   4. Setting kG to the middle point of the lower and upper bounds is a good approximation for the true effect of gravity, removing the force of friction.
   5. A nearby setpoint ensures the system response should be relatively small to start with when tuning.
   6. The kS gain is meant to reduce the effect of friction, so the largest possible value that still prevents the system from moving will reduce the effect of friction in general.
   7. The kP gain will control how quickly the system gets to the setpoint, however in TorqueCurrentFOC modes there is no natural dampening force, so overshoot is expected at the beginning. Once that happens kD should be tuned.
   8. The kD gain will effectively slow down the system as it reaches the setpoint, increasing it will increase the force slowing it down, so it should be increased until the system no longer overshoots.
   9. In general, the system wants as high a kP gain as possible to decrease the time taken to get to the setpoint. This also requires a high kD gain to properly dampen the system. The limit of how high the kP/kD term can be is determined by the system latency, at which point the oscillation is impossible to avoid. The goal of repeating steps 7 and 8 is to find that limit.
   10. Always verify the gains work for the expected setpoints of the system, it's possible the general solution may not work under the expected operating range of the system. If that's the case, re-tune for the expected operating range using the generic gains as a basis.

.. raw:: html

    <div class="viz-div" id="vertical_arm_container">
      <div >
         <div class="col" id="vertical_arm_plotVals"></div>
         <div class="col" id="vertical_arm_plotAmps"></div>
      </div>
      <div class="flex-grid">
         <div class="col" id="vertical_arm_viz"></div>
         <div id="vertical_arm_ctrls"></div>
      </div>
      <script>
         turret = new VerticalArmPIDF("vertical_arm", "both");
      </script>
    </div>

.. dropdown:: Tuning Process Example

   Following the guide, I start with all gains at 0 to dial in kG.

   I start with a kG of 1, and notice that the arm's still falling, so I increase it to 2, 4, 8, and 16 before it stops moving. From there I reduce it to 12, then 10 and notice it fall again. I bring it up to 11 and see it still falls appreciably, so I leave it at 12 for the lower bound.

   Going back up, I start at 16 again, then to 18, and 20 before it moves its way up. 19 also produces appreciable movement, so I leave it at 18. This means my kG is (12 + 18) / 2 = 15 amps.

   From here, I set a setpoint of 0.1 and dial in kS to just before it starts moving. I increase it to 1, 2, and 4 when it starts moving. From here, I dial it down to 3 where it doesn't move, and back up to 3.5, 3.7 where it moves again. I check 3.6 and see it doesn't move, so I leave kS at 3.6 amps.

   Now it's time for kP/kD tuning. I bring kP up to 1, 2, 4, 8, 16, and 32 before I get significant overshoot, where I dial kD in to 1, 2, 4, and 8 before that overshoot is gone. kP keeps increasing to 64 and 128, then kD goes up to 16 and 32 before it's back to kP. I go up to 256 and 512 where I notice a bit of oscillation, and I may be near the limit at this point. kD increases to 64 and I get oscillation on the way to the target, so I bring it down to 50 then 40 before I'm happy with it. There's still a little oscillation at the target, but it's minimal.

   I check with other setpoints of -0.1, 0.4, 0.6 and confirm the movement looks good, and say the PID tuning is done.

Profiled Tuning
^^^^^^^^^^^^^^^
Profiled tuning can be treated much the same way as normal tuning, but the introduction of a profile the system should follow means much of the response can be calculated in advance with feed-forwards.

The example below uses a pre-generated profile for the system to follow, and the general steps to tune it are below:
 1. Zero all PID gains.
 2. Set a setpoint relatively nearby (typically 0.1 mechanism rotations).
 3. Increase kS until the system starts moving, then back off to just before that movement.
 4. Increase kA until the measured position matches the profiled position at the beginning.
 5. Increase kV until the measured position matches the profiled position at the end.
 6. Increase kP until you notice significant overshoot or oscillation (even during motion at cruise velocity).
 7. Increase kD until the overshoot/oscillation stops happening.
 8. Repeat steps 6 and 7 until increasing kD results in more oscillation, or until the system oscillates on its way to the setpoint. If oscillation on the way to setpoint is seen, decrease kD until it stops. If overshoot in general is happening and kD is already at max, reduce kP until it stops.

.. raw:: html

    <div class="viz-div" id="profiled_container">
      <div >
         <div class="col" id="profiled_plotVals"></div>
         <div class="col" id="profiled_plotAmps"></div>
      </div>
      <div class="flex-grid">
         <div class="col" id="profiled_viz"></div>
         <div id="profiled_ctrls"></div>
      </div>
      <script>
         turret = new ProfiledPIDF("profiled", "both");
      </script>
    </div>
