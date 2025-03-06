Pigeon 2.0
==========

Pigeon 2.0 is the next evolution in the family of Pigeon IMUs.

With no on-boot calibration or temperature calibration required and dramatic improvement to drift, the Pigeon is the easiest IMU to use yet.

.. toctree::
   :maxdepth: 1

   pigeon-issues

.. grid:: 2

   .. grid-item-card:: Store Page
      :link: https://store.ctr-electronics.com/pigeon-2/
      :link-type: url

      CAD and purchase instructions.

   .. grid-item-card:: Hardware User Manual
      :link: https://store.ctr-electronics.com/content/user-manual/Pigeon2%20User's%20Guide.pdf
      :link-type: url

      Wiring and mount instructions in PDF format.

Status Light Reference
----------------------

.. image:: images/pigeon2-status-led-location.png
   :width: 30%
   :alt: Pigeon 2 led location

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
                <td>Provide 12V to Red/Black leads.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='red'></div></div></td>
                <td>Blinking Alternating Red</td>
                <td>Pigeon 2 does not have valid CAN.</td>
                <td>Ensure good connections between CANH and CANL (Yellow and Green) & robot controller is on.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='orange'></div></div></td>
                <td>Blinking Alternating Orange</td>
                <td>Pigeon 2 detects CAN but does not see Phoenix running on the robot controller.</td>
                <td>If Phoenix is running on the robot controller, ensure good connection between the controller and this device. Otherwise, deploy a robot program that uses Phoenix.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='black'></div></div></td>
                <td>Blinking Simultaneous Orange</td>
                <td colspan="2">Pigeon 2 detects CAN and sees the robot is disabled. Phoenix is running in robot controller <b>and</b> Pigeon 2 has good CAN connection to robot controller.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='green' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='black' offcolor='green'></div></div></td>
                <td>Blinking Alternating Green</td>
                <td colspan="2">Pigeon 2 detects CAN and sees the robot is enabled.</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='300' offtime='300' oncolor='red' offcolor='orange'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='orange' offcolor='red'></div></div></td>
                <td>Alternate Red/Orange</td>
                <td>Damaged Hardware.</td>
                <td>Use Tuner X Self Test to confirm the LEDs and that the hardware fault is set, then contact CTRE</td>
            </tr>
            <tr>
                <td><div class='ledGroup'><div class='led' ontime='0' offtime='0' oncolor='black' offcolor='black'></div>
                                          <div class='led' ontime='300' offtime='300' oncolor='green' offcolor='orange'></div></div></td>
                <td>Single LED alternates Green/Orange</td>
                <td>Pigeon 2 in bootloader.</td>
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


Mount Calibration
-----------------

It's recommended to perform a mount calibration when placement of the Pigeon 2.0 has been finalized. This can be done via the :doc:`Calibration page </docs/tuner/pigeon-cal>` in Tuner X.

.. image:: images/mount-calibration.png
   :width: 70%
   :alt: Mount calibration page in Tuner X
