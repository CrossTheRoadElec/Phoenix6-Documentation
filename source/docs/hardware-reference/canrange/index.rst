CANrange
========

CANrange is a CAN-enabled Time-of-Flight distance measurement sensor. This product uses laser measurements to calculate precise distance to a surface parallel to the sensor. Users can also configure the CANrange to act as a limit switch or beam break sensor in the :ref:`Device Configs <docs/tuner/configs:tuner configs>`.

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/products/canrange
      :link-type: url

      CAD and purchase instructions.

   .. grid-item-card:: Hardware User Manual
      :link: https://ctre.download/files/user-manual/CANrange%20User's%20Guide.pdf
      :link-type: url

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
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div>
                                          <div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div></div></td>
                <td>LEDs Off</td>
                <td>No Power</td>
                <td>Provide 12V to V+ and V- inputs.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='red'></div></div></td>
                <td>Blinking Alternating Red</td>
                <td>CANrange does not have valid CAN.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='orange'></div></div></td>
                <td>Blinking Alternating Orange</td>
                <td colspan="2">CANrange has a good CAN connection. Measured distance is not within detection threshold.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='green'></div></div></td>
                <td>Blinking Alternating Green</td>
                <td colspan="2">CANrange has a good CAN connection. Measured distance is within detection threshold.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='orange'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='red'></div></div></td>
                <td>Alternate Red/Orange</td>
                <td>Damaged Hardware.</td>
                <td>Use Tuner X Self Test to confirm the LEDs, then contact CTRE.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='orange'></div></div></td>
                <td>Single LED alternates Green/Orange</td>
                <td>CANrange in bootloader.</td>
                <td>Field-upgrade device in Tuner X.</td>
            </tr>
        </table>
    </div>


The rate at which the LED is blinking can be used as a rough indicator of measured distance. For example, the below LED shows that the detected distance is close to the CANrange.

.. raw:: html

   <div class="tableOverflow">
        <table class="center">
            <tr>
                <th>Animation (Click to play)</th>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='50' offtime='50' oncolor='green' offcolor='black'></div>
                                          <div class='led' ontime='50' offtime='50' oncolor='black' offcolor='green'></div></div></td>
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
