Improving Performance with Current Limits
=========================================

Current-limiting, is the process of reducing and eliminating motor output when a given current has surpassed a limit. There are 3 types of current limits available: supply, stator, and torque. Each of these limits accomplishes different goals. This article goes over how to configure those limits, when to configure them and why current limiting is important.

.. note:: By default, devices are not configured with any current limits. This is because the optimal limits depend on how the motor is integrated into the system. There are additional safety measures in place to prevent damage to the motor or motor controller under excessive load.

Supply, Stator and Torque Limits
--------------------------------

It's important to understand how current limits work. When a motor is under a load, it takes an increasing amount of current to continue rotating the shaft of the motor (and by extension the mechanism). When integrating multiple motors into a system (such as an FRC robot), this increase current draw can drain batteries, reset fuses, blow breakers, or even damage the battery.

There exists 3 forms of current limiting: supply, stator and torque. For all limits, the following :ref:`configs <docs/tuner/configs:tuner configs>` apply. In the below example, replace ``Supply`` with ``Stator``.

.. note:: Limits for torque based control modes should be applied with ``Peak Forward Torque Current`` and ``Peak Reverse Torque Current`` instead.

- ``SupplyCurrentLimit``
- ``SupplyCurrentLimitEnable``

All limits must be enabled using the appropriate enable config.

Supply Limits
^^^^^^^^^^^^^

When ``SupplyCurrentThreshold`` has elapsed for ``SupplyTimeThreshold`` amount of time, it will lower motor output until it's within range of the current limit (see the above section on examples of these configs).

Supply current limits are useful to prevent fuses from reseting and breakers from tripping. They are also effective at preventing brownouts and reducing overall current load on the battery.

Stator & Torque Limits
^^^^^^^^^^^^^^^^^^^^^^

.. important::
   
   Stator current limits are only applicable in non-torque control modes. For example, a stator limit would have no affect if the current control mode is ``TorqueCurrentFOC``. Users utilizing torque based control modes should use ``Peak Forward Torque Current`` and ``Peak Reverse Torque Current`` configs instead, but the following documentation is still applicable.

Stator current is the output current (and proportional to torque) of the motor. The stator current differs from supply current in that it's at a different voltage from the input.

.. note:: The below example ignores factors such as energy loss from heat or inefficiency.

A good example of this is a motor that is powered with a :math:`12V` supply drawing :math:`40A` of supply current. If the dutycycle of the motor is at 100% dutycycle, then the stator current will be close to :math:`40A`  as well. If the motor is at 50% of dutycycle, then the output voltage will be :math:`6V` at :math:`80A`.

.. figure:: images/stator-limit.png
   :alt: 80a stator limit being applied

   *80a torque limit taking affect*

Stator limits apply the same limiting strategy used by supply limits, but are more effective in dealing with situations such as wheel slip or acceleration induced brownouts. The rationale behind it reducing acceleration induced brownouts is that initial acceleration is typically peak supply and stator current.

If a robot acceleration event draws :math:`100A` of supply current, it will only do so for a very small portion of the entire acceleration event up to a maximum velocity. During the acceleration event, the motor is likely not being commanded with 100% dutycycle. Therefore, if :math:`100A` are being drawn at supply at :math:`6V`, then output stator is around :math:`200A`. A :math:`100A` stator limit would cap the supply current at `50A` while being more efficient at not limiting the entire robot velocity.

How to Budget Limits
--------------------

Budgeting a current limit depends on the limit and your overall battery budget. When budgeting current limits for FRC, the most robust strategy is to run a robot in match-like conditions and observe battery draw and current draw through the course of the robot operation.

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

This would yield peak supply current of ~395A for a worst case scenario. This draw is extremely unlikely as peak supply is often extremely brief (for example, 60A on all 4 swerve drive motors will likely be for less than 5 seconds).

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
   <div style="height:80px;width:100%;position:relative;">
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

An interesting observation here is that supply current in the above graph was only around ~37A, this information helps provide real world evidence that stator current limits are effective at reducing brownouts.

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
