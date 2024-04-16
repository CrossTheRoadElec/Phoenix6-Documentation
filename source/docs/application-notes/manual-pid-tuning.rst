.. raw:: html

   <script src="../../../../_static/pid-tune.js"></script>
   <link rel="stylesheet" type="text/css" href="../../../../_static/pid-tune.css" />


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


This leads to the first major aspect of manual PID tuning - finding a good start. Since every gain is canonical, you can back-calculate what value the gain should start at based on the error you see and the desired motor voltage. Say I have an arm mechanism that is currently 0.1 rotations away from where I want it to be. I know that applying 1 volt of output is enough to move it, and if I were the mechanism I'd apply 1 volt to slowly bring it to the setpoint. This means at 0.1 rotation error I want 1 volt of output. That means my kP is :math:`k_{P}=\frac{\mathrm{Volts}}{\mathrm{error}}=\frac{1}{0.1}=10`. This is a good starting point for my mechanism and I can see a safe response that matches what I would do manually.

Similar math can be done for every other gain constant to find a good starting point.

Specific Response Tuning
------------------------

These general guidelines are great for understanding what's happening in a closed loop controller and how to forward-calculate what a reasonable starting point is. However, the specific mechanism you're tuning is going to affect how to find the ideal gains and what gains you should be using in the first place.

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

