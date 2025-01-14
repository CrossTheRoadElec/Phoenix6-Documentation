Talon FXS
=========

Talon FXS is a versatile motor controller compatible with the CTRE software ecosystem. This standalone device seamlessly supports both brushless and brushed motors, offering unparalleled flexibility and performance.

The Talon FXS supports the `CTR Electronics Minion <https://store.ctr-electronics.com/products/minion-brushless-motor>`__ and other third-party motors. Talon FXS also employs methods to reduce hall sensor velocity measurement noise and phase delay - a common problem with similar standalone motor controllers.

Phoenix Pro users also benefit with “Advanced Hall Support” which can increase motor peak efficiency as high as an additional 2% percentage points and further reduce velocity measurement noise, making it ideal for velocity closed loop modes.

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/products/talon-fxs
      :link-type: url

      CAD and purchase instructions.

Supported Motors
----------------

- CTR Electronics Minion
- REV Robotics NEO
- REV Robotics NEO 550
- REV Robotics Vortex with Solo Adapter
- Most 3rd party brushed motors

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
                <th>Animation (Click to play)</th>
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
                <td>Talon FXS does not have a valid CAN/PWM signal.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='orange'></div></div></td>
                <td>Blinking Alternating Orange</td>
                <td>TalonFXS detects CAN but does not see Phoenix running on the robot controller.</td>
                <td>If Phoenix is running on the robot controller, ensure good connection between the controller and this device. Otherwise, deploy a robot program that uses Phoenix.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Orange</td>
                <td>Talon FXS has valid CAN signal and is disabled. Phoenix is running in robot controller <b>and</b> Talon FXS has good CAN connection to robot controller.</td>
                <td>If robot is enabled, ensure a control request is being sent to the Talon FXS.</td>
            </tr>
            <tr>
                <th colspan="4">Enabled Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='orange' offcolor='orange'></div>
                                          <div class='led' ontime='0' offtime='0' oncolor='orange' offcolor='orange'></div></div></td>
                <td>Both Solid Orange</td>
                <td colspan="2">Talon FXS enabled with neutral output.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Red</td>
                <td colspan="2">Talon FXS driving in reverse. Rate of blink corresponds to duty cycle applied.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Green</td>
                <td colspan="2">Talon FXS driving forward. Rate of blink corresponds to duty cycle applied.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='100' offtime='400' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='400' offtime='100' oncolor='black' offcolor='red'></div></div></td>
                <td>Offset Alternating Red/Off</td>
                <td colspan="2">Talon FXS limited (hard or soft limit). Direction of offset determines forward/reverse limit.</td>
            </tr>
            <tr>
                <th colspan="4">Special Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='400' offtime='100' oncolor='black' offcolor='orange'></div>
                                          <div class='led' ontime='100' offtime='400' oncolor='orange' offcolor='black'></div></div></td>
                <td>Offset Orange/Off</td>
                <td>Talon FXS in thermal cutoff or temperature measurement is missing.</td>
                <td>Please see <span style="font-weight: bold;">"Troubleshooting Thermal Faults"</span> for potential solutions.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='green'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='red'></div></div></td>
                <td>Alternate Red/Green</td>
                <td>Talon FXS driven with Pro-only command while unlicensed.</td>
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
                <td>Talon FXS in bootloader.</td>
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

Troubleshooting Thermal Faults
------------------------------

A Talon FXS thermal fault, as indicated with an "Offset Orange/Off" blink code, can be triggered for a variety of reasons. The following list can be used to help identify the reason and a potential solution.

- Brushless Motor

  - JST is disconnected or damaged. Plug-in the motor JST cable into the JST port and ensure the cable is not damaged.
  - Motor arrangement is incorrect. Please select the correct motor in :ref:`configs <docs/tuner/configs:tuner configs>`.
  - Talon FXS or motor has reached thermal cut-off. Allow time for the device to cool and consider configuring a :ref:`Stator Current limit <docs/hardware-reference/talonfx/improving-performance-with-current-limits:stator limits>`.

- Brushed Motor

  - Motor arrangement is incorrect. Please select one of the brushed options in :ref:`configs <docs/tuner/configs:tuner configs>`.
  - Talon FXS has reached thermal cut-off. Allow time for the device to cool and consider configuring a :ref:`Stator Current limit <docs/hardware-reference/talonfx/improving-performance-with-current-limits:stator and supply current limits>`.
