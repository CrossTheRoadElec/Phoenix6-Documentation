CANdle®
=======

The CTR Electronics' CANdle® branded device makes it easy to control individually addressable LEDs over CAN. Combined with being a 5V high-efficiency DC voltage regulator, the CANdle® is a versatile addition to any robot.

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/products/candle
      :link-type: url

      CAD and purchase instructions.

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
                <th>Animation (Click to play)</th>
                <th>LED State</th>
                <th>Cause</th>
                <th>Possible Fix</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div></div></td>
                <td>LEDs Off</td>
                <td>No power, or StatusLedWhenActive is set to Disabled.</td>
                <td>If you cannot communicate with the CANdle® and all LEDs are off, validate 12V on the Red/Black (+Vin/-Vin) leads.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div></div></td>
                <td>Blinking Red</td>
                <td>CANdle® does not have valid CAN or Pixel pulse train.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) and the CAN bus or Pixel pulse train, and robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div></div></td>
                <td>Blinking Orange</td>
                <td>CANdle® has a good CAN or Pixel pulse train connection but is not being controlled.</td>
                <td>If the robot program is trying to control the CANdle®, ensure good connection between the controller and this device.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div></div></td>
                <td>Blinking Green</td>
                <td colspan="2">CANdle® has a good CAN or Pixel pulse train connection and is being actively controlled.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='200' offtime='50' oncolor='red' offcolor='black'></div></div></td>
                <td>Rapid Red</td>
                <td>5V too high fault.</td>
                <td>Check for a short between +Vout and 5V out.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='50' offtime='200' oncolor='red' offcolor='black'></div></div></td>
                <td>Blip Red</td>
                <td>Short circuit or software fuse fault.</td>
                <td>Use Tuner X to determine which fault is active. Check for shorts across the output leads, and reduce the current load on the CANdle® (max 6 A).</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='50' offtime='200' oncolor='orange' offcolor='black'></div></div></td>
                <td>Blip Orange</td>
                <td>Thermal fault.</td>
                <td>Allow CANdle® to cool. Consider disabling the onboard LEDs or reducing the current load on the CANdle®.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='orange'></div></div></td>
                <td>Alternate Red/Orange</td>
                <td>Damaged Hardware.</td>
                <td>Use Tuner X Self Test to confirm the LEDs and that the hardware fault is set, then contact CTRE</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='green'></div></div></td>
                <td>Alternate Orange/Green</td>
                <td>CANdle® in bootloader.</td>
                <td>Field-upgrade device in Tuner X.</td>
            </tr>
        </table>
    </div>

.. raw:: html

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
                    }
                ],
                "vars": [
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
                        ledGrps[i]['vars'][j]['time'] = time + 10;
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
        }, 10);
    </script>
