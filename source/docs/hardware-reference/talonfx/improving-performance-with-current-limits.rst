Improving Performance with Current Limits
=========================================

Current-limiting, is the process of reducing motor output when a given current has surpassed a limit. There are 2 types of current limits available: supply and stator/torque. Each of these limits accomplishes different goals. This article goes over how to configure those limits, when to configure them and why current limiting is important.

.. note:: By default, devices are not configured with any current limits. This is because the optimal limits depend on how the motor is integrated into the system. There are additional safety measures in place to prevent damage to the motor or motor controller under excessive load.

Supply and Stator/Torque Limits
-------------------------------

It's important to understand the need for current limits and how they work. When a motor is under a load, it takes an increasing amount of current to continue rotating the shaft of the motor (and by extension the mechanism). When integrating multiple motors into a system (such as an FRC robot), this increase current draw can drain batteries, reset fuses, blow breakers, or even damage the battery.

There exists 2 forms of current limiting: supply and stator/torque. For all limits, the following :ref:`configs <docs/tuner/configs:tuner configs>` apply. In the below example, replace ``Supply`` with ``Stator``.

.. note:: Limits for torque based control modes should be applied with ``Peak Forward Torque Current`` and ``Peak Reverse Torque Current`` instead.

- ``SupplyCurrentLimit``
- ``SupplyCurrentLimitEnable``

All limits must be enabled using the appropriate enable config.

Supply Limits
^^^^^^^^^^^^^

.. note:: Supply limits are not functional in torque based control modes. Use the peak torque current configs instead.

When ``SupplyCurrentThreshold`` has elapsed for ``SupplyTimeThreshold`` amount of time, it will reduce motor output until it's within range of the current limit (see the above section on examples of these configs).

Supply current limits are useful to prevent fuses from reseting and breakers from tripping. They are also effective at preventing brownouts and reducing overall current load on the battery.

Stator & Torque Limits
^^^^^^^^^^^^^^^^^^^^^^

.. important::

   Stator current limits are only applicable in non-torque control modes. For example, a stator limit would have no affect if the current control mode is ``TorqueCurrentFOC``. Users utilizing torque based control modes should use ``Peak Forward Torque Current`` and ``Peak Reverse Torque Current`` configs instead, but the following documentation is still applicable.

Stator current is the output current of the motor and is directly proportional to torque. The stator current differs from supply current in that it's at a different voltage from the input.

.. note:: The below example ignores factors such as energy loss from heat or inefficiency.

For example, if a motor is being applied with 50% dutycycle with :math:`80A` of load (stator current), the resulting supply current will be :math:`40A`. If the motor has 100% dutycycle applied wth :math:`80A` of measured stator current, the resulting supply current wll be :math:`80A`.

.. figure:: images/stator-limit.png
   :alt: 80a stator limit being applied

   *80a torque limit taking affect*

Stator limits are more effective in dealing with situations such as wheel slip or ramping acceleration.

Supply current limits, at least at low velocity, actually have less of a restriction on acceleration than stator limits, and they are more effective at preventing brownouts. For example, a :math:`50A` supply limit here could allow for more than :math:`100A` stator at stall.

While you can explain the relationship between the two currents using duty cycle out, it's hard to do the same for current limits, because the current limits are what restrict duty cycle out. Stator limits do so linearly, while supply is nonlinear. Voltage is the dependent variable here, velocity and current limit are the independent variables.

How to Budget Limits
--------------------

When budgeting current limits for FRC, the most robust strategy is to run a robot in match-like conditions and observe battery draw and current draw through the course of the robot operation. One thing to be aware of when reading the following section is that the robot won't be under peak draw of **all** mechanisms at the same time.

Using Limits to Improve Battery Longevity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

While supply limits can be estimated using battery datasheets and average mechanism current draw, the easiest method is to graph and reduce. By applying a conservative supply limit to mechanisms that can operate with minimal current draw, you can improve the performance of other mechanisms (e.g. capping your intake supply to increase the amount of current a swerve drivetrain can draw).

1. Plot a mechanism supply currents throughout the match
2. Reduce your supply current until your performance begins to suffer (unable to intake items, etc). Increase this value slightly for some comfort room.
3. Repeat this for all mechanisms on a fresh battery each time. Time how long it takes before brownouts are regular and battery capacity has dropped.

For example, a user may have the following mechanisms and supply limits.

- x4 Kraken(s) on swerve drive - 60A supply
- x4 Kraken(s) on swerve dzimuth - 20A supply
- x1 Kraken(s) on elevator - 30A supply
- x1 Kraken(s) on intake - 15A supply

This would yield peak supply current of ~365A for a worst case scenario. This draw is extremely unlikely as peak supply is often extremely brief (for example, 60A on all 4 swerve drive motors will likely be for less than 5 seconds) and all mechanisms won't be under peak load at the same time. A more common scenario is 4 swerve drive motors accelerating at the same time for a peak supply of 240A.

.. math::

   (60 * 4) + (20 * 4) + (30 * 1) + (15 * 1) \approx 365A

Reduce your limits until your battery life is in an acceptable range.

Using Limits to Reduce Brownouts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The same strategy for improving battery life is applicable to brownouts as well. In the above example, we can see that our peak draw is 365A. Brownouts occur when the robot voltage dips below a threshold (for the `FRC roboRIO <https://docs.wpilib.org/en/stable/docs/software/roborio-info/roborio-brownouts.html>`__, this threshold is around ~7V). When the roboRIO dips below 7V, it will disable all actuators to prevent a total robot reboot.

As supply current increases, the battery voltage will decrease in a similar fashion. A simplified equation for modeling voltage sag is shown below along with a calculator.

.. math::

   voltage = unloadedvoltage - (current * m\Omega)

.. raw:: html

   <h4>Battery Sag Calculator</h4>
   <div style="width:100%; overflow:hidden;">
      <form onkeypress="return event.keyCode != 13" style="float:left;">
         <p>Unloaded voltage (V)</p>
         <input onchange="updateOutput()" id="uV" value="12.5" style="width:90%;" type="numeric" placeholder="12.5"/>
      </form>
      <form onkeypress="return event.keyCode != 13" style="float:left;">
         <p>Total draw (A)</p>
         <input onchange="updateOutput()" id="current" value="240" style="width:90%;" type="numeric" placeholder="240"/>
      </form>
      <form onkeypress="return event.keyCode != 13" style="float:left;">
         <p>Battery resistance (mOhms)</p>
         <input onchange="updateOutput()" id="resistance" value="20" style="width:90%;" type="numeric" placeholder="20"/>
      </form>
      <p style="float:left;margin-left:10px;margin-top:35px;font-weight:bold;color:#bdeb34;">=<span id="output">10.12V</span></p>
   </div>
   <br/>

   <script>
      updateOutput();

      function updateOutput() {
         var unloadedVoltage = document.getElementById("uV").value
         var current = document.getElementById("current").value
         var resistance = document.getElementById("resistance").value
         var output = document.getElementById("output")

         var calculatedOutput = parseFloat(unloadedVoltage) - (parseFloat(current) * (parseFloat(resistance) / 1000))

         output.innerHTML = (Math.round(calculatedOutput*10**2)/10**2) + "V"
      }
   </script>

Be aware that battery health (in the form of battery resistance above) changes how much increased current draw effects the output voltage of the battery. Health of the battery can be roughly determined via a `battery beak <https://store.ctr-electronics.com/battery-beak/>`__ or a via a battery discharge test with a `battery analyzer <https://www.andymark.com/products/computerized-battery-analyzer>`__.

Using the above information, ensure your battery is healthy and that your supply current limits will prevent the battery sagging below 7V.

Using Limits to Reduce Wheel Slip
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stator current limits are excellent at preventing wheel slip (thus increasing traction). To determine wheel slip, perform the following instructions.

1. Place the robot on carpet against a wall.
2. Begin plotting velocity and stator current in :doc:`Tuner X </docs/tuner/plotting>`.
3. Slowly increase dutycycle until the velocity becomes non-zero.

Set your stator limit to a value below the observed stator current in Tuner. In the below plot, you can see that the wheels began slipping at around 130A.

.. image:: images/slip-current.png
   :alt: wheel slip at 130A

Using Limits to Decrease Acceleration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: The numbers below are quite small compared to a typical drivetrain application. The below example uses a low-load flywheel and because of such, acceleration is already extremely large.

Stator current limits can also be used to reduce acceleration. Below is two graphs. The one on the left has no stator limit applied, and the one on the right does. Because acceleration events are often the most demanding events, this can also help reduce brownouts.

.. grid:: 1 2 2 2
   :gutter: 3

   .. grid-item-card:: Without stator limits (~900 rotations/second)

      .. image:: images/no-stator-limit-accel.png
         :alt: no stator limit applied graph with peak accel around 900 rotations / second

   .. grid-item-card:: With stator limits (~200 rotations/second)

      .. image:: images/with-stator-limit-accel.png
         :alt: stator limit applied graph with peak accel around 200 rotations / second

How to Apply Limits
-------------------

Limits must be **enabled** and **configured**. This can be performed utilizing :doc:`Tuner X configs </docs/tuner/configs>` or using the Phoenix 6 :ref:`configuration API <docs/api-reference/api-usage/configuration:applying configs>`.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var talonFXConfigurator = m_talonFX.getConfigurator();
         var limitConfigs = new CurrentLimitConfigs();

         // enable stator current limit
         limitConfigs.StatorCurrentLimitEnable = true;
         limitConfigs.StatorCurrentLimit = 120;

         talonFXConfigurator.apply(limitConfigs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         auto& talonFXConfigurator = m_talonFX.GetConfigurator();
         configs::CurrentLimitConfigs limitConfigs{};

         // enable stator current limit
         limitConfigs.StatorCurrentLimitEnable = true;
         limitConfigs.StatorCurrentLimit = 120;

         talonFXConfigurator.Apply(limitConfigs);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         talonfx_configurator = self.talonfx.configurator
         limit_configs = configs.CurrentLimitConfigs()

         # set invert to CW+ and apply config change
         limit_configs.stator_current_limit_enable = true
         limit_configs.stator_current_limit = 120

         talonfx_configurator.apply(limit_configs)