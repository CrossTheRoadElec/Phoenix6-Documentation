CANivore Intro
==============

The `CANivore <https://store.ctr-electronics.com/canivore/>`__ is a multipurpose USB-to-CAN FD device. The CANivore:

- Adds a secondary CAN FD bus to the roboRIO

  - `CAN FD <https://store.ctr-electronics.com/can-fd/>`__ improves upon CAN with increased device bandwidth and transfer speed.

- Allows the control of CTR Electronics devices on :ref:`docs/installation/requirements:supported devices`.

.. important:: Details on licensing your CANivore is available on the :doc:`licensing </docs/licensing/licensing>` page.

.. grid:: 1 2 2 2
   :gutter: 3

   .. grid-item-card:: Initial Setup
      :link-type: doc
      :link: canivore-setup

      Setting up a CANivore for robot projects and desktop development.

   .. grid-item-card:: API Usage
      :link-type: doc
      :link: canivore-api

      Using the CANivore with devices in API.

   .. grid-item-card:: Hardware-Attached Simulation
      :link-type: doc
      :link: canivore-hardware-attached

      Using a CANivore with hardware devices in a desktop environment.

   .. grid-item-card:: Advanced Configuration
      :link-type: doc
      :link: canivore-config

      Advanced configuration options for the CANivore.

Status Light Reference
----------------------

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
                <th colspan="4">STAT Codes</th>
            </tr>
            <tr>
                <th>Animation (Click to play)</th>
                <th>LED State</th>
                <th>Cause</th>
                <th>Possible Fix</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black' oncount='1'></div></div></td>
                <td>LED Off</td>
                <td>No Power</td>
                <td>Provide 12V to V+/V-, or plug in USB.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black' oncount='2'></div></div></td>
                <td>Red Double-Blink</td>
                <td>Device powered through V+/V-, but no USB.</td>
                <td>Plug in USB and ensure the robot controller is powered on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='red' offcolor='black' oncount='1'></div></div></td>
                <td>Red Fast-Strobe</td>
                <td>USB plugged in, but no USB communication.</td>
                <td>Ensure robot controller is fully booted and enumerated USB. Then consider replacing the USB cable.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black' oncount='2'></div></div></td>
                <td>Orange Double-Blink</td>
                <td>Good USB connection, CAN streaming disabled. V+/V- is NOT powered.</td>
                <td>Ensure a robot program using Phoenix is running.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='orange' offcolor='black' oncount='1'></div></div></td>
                <td>Orange Fast-Strobe</td>
                <td>Good USB connection, CAN streaming disabled. V+/V- is powered.</td>
                <td>Ensure a robot program using Phoenix is running.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black' oncount='2'></div></div></td>
                <td>Green Double-Blink</td>
                <td colspan="2">Good USB connection, CAN streaming enabled. V+/V- is NOT powered.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='green' offcolor='black' oncount='1'></div></div></td>
                <td>Green Fast-Strobe</td>
                <td colspan="2">Good USB connection, CAN streaming enabled. V+/V- is powered.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='orange'></div></div></td>
                <td>Alternate Red/Orange</td>
                <td>Damaged Hardware.</td>
                <td>Contact CTRE Support.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='green'></div></div></td>
                <td>Alternate Orange/Green</td>
                <td>CANivore in bootloader.</td>
                <td>Field-upgrade device in Tuner X.</td>
            </tr>
            <tr>
                <th colspan="4">Wi-Fi Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black' oncount='1'></div></div></td>
                <td>LED Off</td>
                <td>Wi-Fi is disabled.</td>
                <td>Enable the ESP32.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black' oncount='1'></div></div></td>
                <td>Green Blink</td>
                <td colspan="2">Wi-Fi is enabled, or ESP32 custom application is allowed to use Wi-Fi.</td>
            </tr>
            <tr>
                <th colspan="4">BT Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black' oncount='1'></div></div></td>
                <td>LED Off</td>
                <td>Bluetooth is disabled.</td>
                <td>Enable the ESP32.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black' oncount='1'></div></div></td>
                <td>Green Blink</td>
                <td colspan="2">Bluetooth is enabled, or ESP32 custom application is allowed to use Bluetooth.</td>
            </tr>
            <tr>
                <th colspan="4">CAN Codes</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='red' offcolor='red' oncount='1'></div></div></td>
                <td>Solid Red</td>
                <td>Voltage too low for CAN bus.</td>
                <td>Ensure device is receiving 5 V over USB and optionally 12 V over V+/V-.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black' oncount='2'></div></div></td>
                <td>Red Double-Blink</td>
                <td>No CAN communication. CAN termination is disabled.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green), all connected devices support CAN FD, and the bus is properly terminated with two 120-ohm resistors, one on each end.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='red' offcolor='black' oncount='1'></div></div></td>
                <td>Red Fast-Strobe</td>
                <td>No CAN communication. CAN termination is enabled.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green), all connected devices support CAN FD, and the bus is properly terminated with a 120-ohm resistor on the other end.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black' oncount='2'></div></div></td>
                <td>Orange Double-Blink</td>
                <td colspan="2">Reserved for CAN 2.0b legacy mode. CAN termination is disabled.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='orange' offcolor='black' oncount='1'></div></div></td>
                <td>Orange Fast-Strobe</td>
                <td colspan="2">Reserved for CAN 2.0b legacy mode. CAN termination is enabled.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black' oncount='2'></div></div></td>
                <td>Green Double-Blink</td>
                <td colspan="2">CAN FD is active. CAN termination is disabled.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='250' offtime='50' oncolor='green' offcolor='black' oncount='1'></div></div></td>
                <td>Green Fast-Strobe</td>
                <td colspan="2">CAN FD is active. CAN termination is enabled.</td>
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
                        'offcolor': ledGrpElems[i].children[0].getAttribute('offcolor'),
                        'oncount': ledGrpElems[i].children[0].getAttribute('oncount'),
                    }
                ],
                "vars": [
                    {
                        'time': 0,
                        'state': false,
                        'blinks': 0,
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
            for (var i = 0; i < ledGrpElems.length; i++) {
                if (ledGrpElems[i].getAttribute('blink') === 'true') {
                    for (var j = 0; j < ledGrpElems[i].children.length; j++) {
                        var time = ledGrps[i]['vars'][j]['time'];
                        var blinks = ledGrps[i]['vars'][j]['blinks'];
                        const oncount = ledGrps[i]['consts'][j]['oncount'];
                        ledGrps[i]['vars'][j]['time'] = time + 10;
                        if (ledGrps[i]['vars'][j]['state']) {
                            if (time > ledGrps[i]['consts'][j]['offtime']) {
                                ++blinks;
                                if (blinks > oncount) {
                                    blinks = 0;
                                }
                                ledGrps[i]['vars'][j]['blinks'] = blinks;

                                if (oncount <= 1 || blinks < oncount) {
                                    ledGrpElems[i].children[j].style.background = ledGrps[i]['consts'][j]['oncolor'];
                                } else {
                                    ledGrpElems[i].children[j].style.background = ledGrps[i]['consts'][j]['offcolor'];
                                }
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
        }, 10);
    </script>
