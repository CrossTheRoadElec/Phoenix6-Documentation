CANcoder
========

The CANcoder is the next evolution in the line of CTRE magnetic encoder products. As its name implies, this product is a rotary magnetic encoder that communicates over the CAN bus. Supporting CAN FD and CAN 2.0, this product provides the same position and velocity with the same resolutions you've come to expect from the SRX Magnetic Encoder.

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/cancoder/
      :link-type: url

      CAD, Firmware and purchase instructions.

   .. grid-item-card:: Hardware User Manual
      :link: https://store.ctr-electronics.com/content/user-manual/CANCoder%20User's%20Guide.pdf
      :link-type: url

      Wiring and mount instructions in PDF format.

Status Light Reference
----------------------

.. important:: If the status lights do not exactly match any of the blink codes below, the device may be alternating between multiple blink codes (most commonly between good and bad CAN).

.. note:: Users wishing to test magnet placement must wait 8 seconds after boot for the LEDs to blink the magnet placement status.

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
                <td>LED Off</td>
                <td>No Power</td>
                <td>Provide 12V to Red/Black leads.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div></div></td>
                <td>Slow Bright Red</td>
                <td>CANcoder does not have valid CAN.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='darkred' offcolor='black'></div></div></td>
                <td>Rapid Dim Red</td>
                <td>CAN bus never detected since boot, CANcoder now reporting strength of magnet. Magnet is out of range (<25 mT or > 135 mT)</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on. Additionally, ensure the magnet's center axis is aligned with the defined center of the CANcoder housing and the magnet is in range of the CANcoder. See Section 2.1 of the Hardware User Manual.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='#a67000' offcolor='black'></div></div></td>
                <td>Rapid Dim Orange</td>
                <td>CAN bus never detected since boot, CANcoder now reporting strength of magnet. Magnet is in range with slightly reduced accuracy (25-45 mT or 75-135 mT).</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on. Additionally, ensure the magnet's center axis is aligned with the defined center of the CANcoder housing and the CANcoder is not too close or too far from the magnet. See Section 2.1 of the Hardware User Manual.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='darkgreen' offcolor='black'></div></div></td>
                <td>Rapid Dim Green</td>
                <td>CAN bus never detected since boot, CANcoder now reporting strength of magnet. Magnet is in range.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='red' offcolor='black'></div></div></td>
                <td>Rapid Bright Red</td>
                <td>CAN bus healthy. Magnet is out of range (<25 mT or > 135 mT)</td>
                <td>Ensure the magnet's center axis is aligned with the defined center of the CANcoder housing and the magnet is in range of the CANcoder. See Section 2.1 of the Hardware User Manual.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='orange' offcolor='black'></div></div></td>
                <td>Rapid Bright Orange</td>
                <td>CAN bus healthy. Magnet is in range with slightly reduced accuracy (25-45 mT or 75-135 mT).</td>
                <td>Ensure the magnet's center axis is aligned with the defined center of the CANcoder housing and the CANcoder is not too close or too far from the magnet. See Section 2.1 of the Hardware User Manual.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='20' oncolor='green' offcolor='black'></div></div></td>
                <td>Rapid Bright Green</td>
                <td colspan="2">CAN bus healthy. Magnet is in range.</td>
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
                <td>CANcoder in bootloader.</td>
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

Magnet Placement
----------------

Using the `CANcoder User's Guide <https://store.ctr-electronics.com/content/user-manual/CANCoder%20User's%20Guide.pdf>`__, verify that magnet placement is correct for the CANcoder.

Verifying Sensor Direction
--------------------------

CANcoder sensor direction can be configured via the :guilabel:`Config` page in Phoenix Tuner X.

.. image:: images/verifying-sensor-direction.png
   :width: 70%
   :alt: Verifying sensor direction toggle in Phoenix Tuner X

Zeroing the CANcoder
--------------------

The zero offset for the CANcoder absolute position can be configured using the Magnet Offset config.

Additionally, CANcoders can be zeroed in Tuner X by pressing on the button shown below. This sets the Magnet Offset config and reports the applied offset to the user.

.. important:: The Tuner X CANcoder zeroing button requires 2024 diagnostics or newer.

.. image:: images/tunerx-zero-cancoder.png
   :alt: Picture with an arrow pointing at the zero cancoder icon
   :width: 50%
