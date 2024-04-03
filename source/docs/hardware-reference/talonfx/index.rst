TalonFX
=======

.. tab-set::

   .. tab-item:: Kraken X60

      The Kraken X60 powered by Talon FX is a brushless motor developed by `WestCoast Products <https://wcproducts.com/products/kraken>`__ that uses the latest BLDC motor control technology from CTR Electronics. The integrated Talon FX unlocks the full performance of the Kraken X60 BLDC motor while providing best-in-class motion control.

      .. grid:: 2

         .. grid-item-card:: Store Page
            :link: https://store.ctr-electronics.com/kraken-x60/
            :link-type: url

            CAD, Firmware and purchase instructions.

         .. grid-item-card:: Hardware User Manual
            :link: https://docs.wcproducts.com/kraken-x60/kraken-x60-motor/overview-and-features
            :link-type: url

            Wiring and mount instructions available on the WestCoast Products documentation site.

   .. tab-item:: Falcon 500

      The Falcon 500 powered by Talon FX is a brushless motor with an integrated motor controller and high-resolution encoder, custom designed specifically for the FIRST Robotics Competition, through a collaboration between Cross the Road Electronics and `VEX Robotics <https://www.vexrobotics.com/217-6515.html>`__.

      .. grid:: 2

         .. grid-item-card:: Store Page
            :link: https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/
            :link-type: url

            CAD, Firmware and purchase instructions.

         .. grid-item-card:: Hardware User Manual
            :link: https://store.ctr-electronics.com/content/user-manual/Falcon%20500%20User%20Guide.pdf
            :link-type: url

            Wiring and mount instructions in PDF format.

Actuator Limits
---------------

CTR Electronics actuators, such as the TalonFX, support various kinds of hardware and software limits.

.. note:: The TalonFX + Kraken X60 does not support hardware limit switches. Instead, :ref:`control request limit <docs/api-reference/api-usage/actuator-limits:control request limits>` overrides can be used, or a CANcoder can be used a :ref:`remote limit switch <docs/api-reference/api-usage/actuator-limits:remote limit switches>`.

Documentation on retrieving and configuring limits can be found :doc:`here </docs/api-reference/api-usage/actuator-limits>`.

Limit Switches
^^^^^^^^^^^^^^

CTR Electronics supported actuators have limit features that will automatically neutral the actuator output (set voltage to 0) if a limit switch is activated. By default, limits are set to "normally open". This means that the switch needs to be explicitly closed (or grounded) for the actuator output to be set to neutral.

When the limit switch is closed (connected to ground), the actuator will disable and the pattern will move toward the forward/reverse limit pin (red blink pattern will move toward the forward limit pin when the forward limit is closed, and vice-versa).

.. tip:: For more information on limit switch wiring in the Falcon 500, consult the `Falcon 500 User's Guide <https://store.ctr-electronics.com/content/user-manual/Falcon%20500%20User%20Guide.pdf>`__.

Status Light Reference
----------------------

.. image:: images/talonfx-status-led-location.png
   :width: 60%
   :alt: Status LEDs located in central part of the motor

.. raw:: html

    <style>
        .led {
            float: left;
            height: 20px;
            width: 20px;
            border: 1px solid black;
            border-radius: 10px;
            margin: 5px;
            background-color: darkgray;
        }
        .ledGroup {
            display: inline-block;
            height: 20px;
        }
        table.center, table.center th, table.center td {
            border: 1px solid white;
            border-collapse: collapse;
            padding: 5px;
            text-align: center;
        }

        .tableOverflow {
            overflow: scroll;
        }

        td.overflow {
            max-width: 550px;
            overflow: scroll;
        }

        @media screen and (max-width: 480px) {
            td.overflow {
                max-width: 0;
                overflow: scroll;
            }

            .tableOverflow {
                max-width: 480px;
            }
        }
    </style>

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="4">Blink Codes</th>
            </tr>
            <tr>
                <th colspan="4">Disabled Codes</th>
            </tr>
            <tr>
                <th>Animation (Click to animate)</th>
                <th>LED State</th>
                <th>Cause</th>
                <th>Possible Fix</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div>
                                          <div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div></div></td>
                <td>LEDs Off</td>
                <td>No Power</td>
                <td>Provide 12V to Red/Black leads.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='red'></div></div></td>
                <td>Blinking Alternating Red</td>
                <td>Talon FX does not have a valid CAN/PWM signal.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='orange'></div></div></td>
                <td>Blinking Alternating Orange</td>
                <td>TalonFX detects CAN but does not see Phoenix running on the robot controller.</td>
                <td>If Phoenix is running on the robot controller, ensure good connection between the controller and this device. Otherwise, deploy a robot program that uses Phoenix.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Orange</td>
                <td colspan="2">Talon FX has valid CAN/PWM signal. If on CAN, Phoenix is running in robot controller <b>and</b> Talon FX has good CAN connection to robot controller.</td>
            </tr>
            <tr>
                <th colspan="4">Enabled Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='orange' offcolor='orange'></div>
                                          <div class='led' ontime='0' offtime='0' oncolor='orange' offcolor='orange'></div></div></td>
                <td>Both Solid Orange</td>
                <td colspan="2">Talon FX Enabled with Neutral Output.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Red</td>
                <td colspan="2">Talon FX driving in reverse. Rate of blink corresponds to duty cycle applied.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Green</td>
                <td colspan="2">Talon FX driving forward. Rate of blink corresponds to duty cycle applied.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='100' offtime='400' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='400' offtime='100' oncolor='black' offcolor='red'></div></div></td>
                <td>Offset Alternating Red/Off</td>
                <td colspan="2">Talon FX limited (hard or soft limit). Direction of offset determines forward/reverse limit.</td>
            </tr>
            <tr>
                <th colspan="4">Special Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='400' offtime='100' oncolor='black' offcolor='orange'></div>
                                          <div class='led' ontime='100' offtime='400' oncolor='orange' offcolor='black'></div></div></td>
                <td>Offset Orange/Off</td>
                <td>Talon FX in thermal cutoff.</td>
                <td>Allow Talon FX to cool. Consider configuring Stator Current Limits to reduce heat generation.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='green'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='red'></div></div></td>
                <td>Alternate Red/Green</td>
                <td>Talon FX driven with Pro-only command while unlicensed.</td>
                <td>Use non-Pro-only command, or license device for Pro.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='orange'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='red'></div></div></td>
                <td>Alternate Red/Orange</td>
                <td>Damaged Hardware.</td>
                <td>Contact CTRE.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='orange'></div></div></td>
                <td>Single LED alternates Green/Orange</td>
                <td>Talon FX in bootloader.</td>
                <td>Field-upgrade device in Tuner X.</td>
            </tr>
        </table>
    </div>

    <script>
        var ledGrpElems = document.getElementsByClassName('ledGroup');
        var ledGrps = [];
        for(var i = 0; i < ledGrpElems.length; i++) {
            ledGrps[i] = {
                "consts": [
                    {
                        'ontime': ledGrpElems[i].children[0].getAttribute('ontime'),
                        'offtime': ledGrpElems[i].children[0].getAttribute('offtime'),
                        'oncolor': ledGrpElems[i].children[0].getAttribute('oncolor'),
                        'offcolor': ledGrpElems[i].children[0].getAttribute('offcolor')
                    },
                    {
                        'ontime': ledGrpElems[i].children[1].getAttribute('ontime'),
                        'offtime': ledGrpElems[i].children[1].getAttribute('offtime'),
                        'oncolor': ledGrpElems[i].children[1].getAttribute('oncolor'),
                        'offcolor': ledGrpElems[i].children[1].getAttribute('offcolor')
                    }
                ],
                "vars": [
                    {
                        'time': 0,
                        'state': false,
                    },
                    {
                        'time': 0,
                        'state': false,
                    }
                ]
            };
            ledGrpElems[i].setAttribute('blink', 'false');
            ledGrpElems[i].onclick = function(){
                var turningOn = !(this.getAttribute('blink') === 'true');
                this.setAttribute('blink', turningOn);
                for (var c of this.children) {
                    if (turningOn) {
                        c.style.background = c.getAttribute('oncolor');
                    } else {
                        c.style.background = 'darkgray';
                    }
                }
            };
        }

        setInterval(function() {
            for(var i = 0; i < ledGrpElems.length; i++) {
                if (ledGrpElems[i].getAttribute('blink') === 'true') {
                    for(var j = 0; j < ledGrpElems[i].children.length; j++) {
                        var time = ledGrps[i]['vars'][j]['time'];
                        ledGrps[i]['vars'][j]['time'] = time + 100;
                        if (ledGrps[i]['vars'][j]['state']) {
                            if (time > ledGrps[i]['consts'][j]['offtime']) {
                                ledGrpElems[i].children[j].style.background = ledGrps[i]['consts'][j]['oncolor'];
                                ledGrps[i]['vars'][j]['state'] = false;
                                ledGrps[i]['vars'][j]['time'] = 0;
                            }
                        } else {
                            if (time > ledGrps[i]['consts'][j]['ontime']) {
                                ledGrpElems[i].children[j].style.background = ledGrps[i]['consts'][j]['offcolor'];
                                ledGrps[i]['vars'][j]['state'] = true;
                                ledGrps[i]['vars'][j]['time'] = 0;
                            }
                        }
                    }
                }
            }
        }, 100);
    </script>

