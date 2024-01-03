Closed-Loop Control
===================

Phoenix 6 enhances the experience of using onboard closed-loop control through the use of standardized units and a variety of control output types.

.. note:: For more information about closed-loop control in Phoenix 6, see :doc:`/docs/api-reference/device-specific/talonfx/closed-loop-requests`.

.. raw:: html

    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

    <style>
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

Closed-Loop Setpoints
---------------------

Phoenix 6 uses canonical units for closed-loop setpoints.

.. raw:: html

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="5">Setpoint Conversion</th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>Formula</th>
            </tr>
            <tr>
                <th rowspan="2">Position</th>
                <td>Original</td>
                <td><input type="number" id="pos_entry" min="-99999999" max="99999999" placeholder="0"></td>
                <td>\(\mathrm{raw\_units}\)</td>
                <td class="overflow">\(x_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_pos" min="-99999999" max="99999999" placeholder="0"></input></td>
                <td>\(\mathrm{rotations}\)</td>
                <td class="overflow">\(x_{\mathrm{new}}=x_{\mathrm{old}} \cdot \frac{1}{2048} \frac{\mathrm{rot}}{\mathrm{raw\_unit}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">Velocity</th>
                <td>Original</td>
                <td><input type="number" id="vel_entry"  min="-99999999" max="99999999" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_units}}{\mathrm{100ms}}\)</td>
                <td class="overflow">\(v_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_vel"  min="-99999999" max="99999999" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{rot}}{\mathrm{second}}\)</td>
                <td class="overflow">\(v_{\mathrm{new}}=v_{\mathrm{old}} \cdot \frac{1}{2048} \frac{\mathrm{rot}}{\mathrm{raw\_unit}} \cdot 10 \frac{\mathrm{100ms}}{\mathrm{second}} \)</td>
            </tr>
            <tr>
                <th rowspan="2">Acceleration</th>
                <td>Original</td>
                <td><input type="number" id="accel_entry"  min="-99999999" max="99999999" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_units}}{\mathrm{100ms} \cdot \mathrm{second}}\)</td>
                <td class="overflow">\(a_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_accel"  min="-99999999" max="99999999" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{rot}}{\mathrm{second}^2}\)</td>
                <td class="overflow">\(a_{\mathrm{new}}=a_{\mathrm{old}} \cdot \frac{1}{2048} \frac{\mathrm{rot}}{\mathrm{raw\_unit}} \cdot 10 \frac{\mathrm{100ms}}{\mathrm{second}} \)</td>
            </tr>
        </table>
    </div>

Closed-Loop Gains
-----------------

Position without Voltage Comp
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix 5 ``ControlMode.Position`` with voltage compensation **disabled** maps to the Phoenix 6 ``PositionDutyCycle`` control request.

.. raw:: html

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="5">Position without Voltage Compensation</th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>Formula</th>
            </tr>
            <tr>
                <th rowspan="2">kP</th>
                <td>Original</td>
                <td><input type="number" id="kP_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{\mathrm{unit}}\)</td>
                <td class="overflow">\(kP_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kP" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot}}\)</td>
                <td class="overflow">\(kP_{\mathrm{new}}=kP_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kI</th>
                <td>Original</td>
                <td><input type="number" id="kI_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{\mathrm{unit} \cdot \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kI_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kI" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot} \cdot \mathrm{second}}\)</td>
                <td class="overflow">\(kI_{\mathrm{new}}=kI_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot 1000 \frac{\mathrm{millisecond}}{\mathrm{second}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kD</th>
                <td>Original</td>
                <td><input type="number" id="kD_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{\mathrm{unit} / \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kD_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kD" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot} / \mathrm{second}}\)</td>
                <td class="overflow">\(kD_{\mathrm{new}}=kD_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{1000} \frac{\mathrm{second}}{\mathrm{millisecond}}\)</td>
            </tr>
        </table>
    </div>
    <br />

Position with Voltage Comp
^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix 5 ``ControlMode.Position`` with voltage compensation **enabled** has been replaced with the Phoenix 6 ``PositionVoltage`` control request, which directly controls voltage.

.. raw:: html

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="5">Position with Voltage Compensation</th>
            </tr>
            <tr>
                <th colspan="5"><label for="volt_comp_value">Voltage Compensation Value: </label><input type="number" id="volt_comp_value" min="0" max="36" placeholder="12"></th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>Formula</th>
            </tr>
            <tr>
                <th rowspan="2">kP</th>
                <td>Original</td>
                <td><input type="number" id="kP_pos_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{\mathrm{unit}}\)</td>
                <td class="overflow">\(kP_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kP_pos_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot}}\)</td>
                <td class="overflow">\(kP_{\mathrm{new}}=kP_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kI</th>
                <td>Original</td>
                <td><input type="number" id="kI_pos_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{\mathrm{unit} \cdot \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kI_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kI_pos_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot} \cdot \mathrm{second}}\)</td>
                <td class="overflow">\(kI_{\mathrm{new}}=kI_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot 1000 \frac{\mathrm{millisecond}}{\mathrm{second}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kD</th>
                <td>Original</td>
                <td><input type="number" id="kD_pos_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{\mathrm{unit} / \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kD_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kD_pos_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot} / \mathrm{second}}\)</td>
                <td class="overflow">\(kD_{\mathrm{new}}=kD_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{1000} \frac{\mathrm{second}}{\mathrm{millisecond}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
        </table>
    </div>
    <br />

Velocity without Voltage Comp
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix 5 ``ControlMode.Velocity`` with voltage compensation **disabled** maps to the Phoenix 6 ``VelocityDutyCycle`` control request.

Additionally, kF from Phoenix 5 has been replaced with kV in Phoenix 6.

.. raw:: html

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="5">Velocity without Voltage Compensation</th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>Formula</th>
            </tr>
            <tr>
                <th rowspan="2">kP</th>
                <td>Original</td>
                <td><input type="number" id="kP_vel_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{\mathrm{unit} / \mathrm{100ms}}\)</td>
                <td class="overflow">\(kP_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kP_vel" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot} / \mathrm{sec}}\)</td>
                <td class="overflow">\(kP_{\mathrm{new}}=kP_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{10} \frac{\mathrm{sec}}{\mathrm{100ms}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kI</th>
                <td>Original</td>
                <td><input type="number" id="kI_vel_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{(\mathrm{unit} / \mathrm{100ms}) \cdot \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kI_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kI_vel" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot}}\)</td>
                <td class="overflow">\(kI_{\mathrm{new}}=kI_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot 1000 \frac{\mathrm{millisecond}}{\mathrm{second}} \cdot \frac{1}{10} \frac{\mathrm{sec}}{\mathrm{100ms}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kD</th>
                <td>Original</td>
                <td><input type="number" id="kD_vel_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{(\mathrm{unit} / \mathrm{100ms}) / \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kD_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kD_vel" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot} / \mathrm{second}^{2}}\)</td>
                <td class="overflow">\(kD_{\mathrm{new}}=kD_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{1000} \frac{\mathrm{second}}{\mathrm{millisecond}} \cdot \frac{1}{10} \frac{\mathrm{sec}}{\mathrm{100ms}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kF<hr style="width:50%">kV</th>
                <td>Original</td>
                <td><input type="number" id="kF_vel_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{raw\_output}}{\mathrm{unit} / \mathrm{100millisecond}}\)</td>
                <td class="overflow">\(kF_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kF_vel" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{duty\_cycle}}{\mathrm{rot} / \mathrm{second}}\)</td>
                <td class="overflow">\(kV_{\mathrm{new}}=kF_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{10} \frac{\mathrm{second}}{\mathrm{100ms}}\)</td>
            </tr>
        </table>
    </div>
    <br />

Velocity with Voltage Comp
^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix 5 ``ControlMode.Velocity`` with voltage compensation **enabled** has been replaced with the Phoenix 6 ``VelocityVoltage`` control request, which directly controls voltage.

Additionally, kF from Phoenix 5 has been replaced with kV in Phoenix 6.

.. raw:: html

    <div class="tableOverflow">
        <table class="center">
            <tr>
                <th colspan="5">Velocity with Voltage Compensation</th>
            </tr>
            <tr>
                <th colspan="5"><label for="volt_comp_value_velocity">Voltage Compensation Value: </label><input type="number" id="volt_comp_value_velocity" min="0" max="36" placeholder="12"></th>
            </tr>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Value</th>
                <th>Units</th>
                <th>Formula</th>
            </tr>
            <tr>
                <th rowspan="2">kP</th>
                <td>Original</td>
                <td><input type="number" id="kP_vel_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{\mathrm{unit} / \mathrm{100ms}}\)</td>
                <td class="overflow">\(kP_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kP_vel_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot} / \mathrm{sec}}\)</td>
                <td class="overflow">\(kP_{\mathrm{new}}=kP_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{10} \frac{\mathrm{second}}{\mathrm{100ms}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kI</th>
                <td>Original</td>
                <td><input type="number" id="kI_vel_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{(\mathrm{unit} / \mathrm{100ms}) \cdot \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kI_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kI_vel_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot}}\)</td>
                <td class="overflow">\(kI_{\mathrm{new}}=kI_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot 1000 \frac{\mathrm{millisecond}}{\mathrm{second}} \cdot \frac{1}{10} \frac{\mathrm{second}}{\mathrm{100ms}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kD</th>
                <td>Original</td>
                <td><input type="number" id="kD_vel_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{(\mathrm{unit} / \mathrm{100ms}) / \mathrm{millisecond}}\)</td>
                <td class="overflow">\(kD_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kD_vel_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot} / \mathrm{second}^{2}}\)</td>
                <td class="overflow">\(kD_{\mathrm{new}}=kD_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{1000} \frac{\mathrm{second}}{\mathrm{millisecond}} \cdot \frac{1}{10} \frac{\mathrm{second}}{\mathrm{100ms}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
            <tr>
                <th rowspan="2">kF<hr style="width:50%">kV</th>
                <td>Original</td>
                <td><input type="number" id="kF_vel_volt_entry" min="0" max="1024" placeholder="0"></td>
                <td>\(\frac{\mathrm{\mathrm{raw\_output}}}{\mathrm{unit} / \mathrm{100ms}}\)</td>
                <td class="overflow">\(kF_{\mathrm{old}}\)</td>
            </tr>
            <tr>
                <td>New</td>
                <td><input type="number" readonly="readonly" id="new_kF_vel_volt" min="0" max="1024" placeholder="0"></input></td>
                <td>\(\frac{\mathrm{V}}{\mathrm{rot} / \mathrm{second}}\)</td>
                <td class="overflow">\(kV_{\mathrm{new}}=kF_{\mathrm{old}} \cdot 2048 \frac{\mathrm{unit}}{\mathrm{rot}} \cdot \frac{1}{1023} \frac{\mathrm{duty\_cycle}}{\mathrm{raw\_output}} \cdot \frac{1}{10} \frac{\mathrm{second}}{\mathrm{100ms}} \cdot \mathrm{V\_comp} \frac{\mathrm{V}}{\mathrm{duty\_cycle}}\)</td>
            </tr>
        </table>
    </div>
    <br />

.. raw:: html

    <script>
        /* Position calculator */
        kp_entry = document.getElementById("kP_entry");
        new_kp = document.getElementById("new_kP");
        kp_entry.addEventListener("input", (event) => {
            new_kp.value = event.target.value * 2048 / 1023;
        });

        ki_entry = document.getElementById("kI_entry");
        new_ki = document.getElementById("new_kI");
        ki_entry.addEventListener("input", (event) => {
            new_ki.value = event.target.value * 2048 / 1023 * 1000;
        });

        kd_entry = document.getElementById("kD_entry");
        new_kd = document.getElementById("new_kD");
        kd_entry.addEventListener("input", (event) => {
            new_kd.value = event.target.value * 2048 / 1023 / 1000;
        });

        /* Position with voltage compensation calculator */
        volt_comp_entry = document.getElementById("volt_comp_value");
        voltage_compensation_value = volt_comp_entry.placeholder;
        volt_comp_entry.addEventListener("input", (event) => {
            voltage_compensation_value = event.target.value;
            new_kp_pos_volt.value = kp_pos_volt_entry.value * voltage_compensation_value * 2048 / 1023;
            new_ki_pos_volt.value = ki_pos_volt_entry.value * voltage_compensation_value * 2048 / 1023 * 1000;
            new_kd_pos_volt.value = kd_pos_volt_entry.value * voltage_compensation_value * 2048 / 1023 / 1000;
        });
        kp_pos_volt_entry = document.getElementById("kP_pos_volt_entry");
        new_kp_pos_volt = document.getElementById("new_kP_pos_volt");
        kp_pos_volt_entry.addEventListener("input", (event) => {
            new_kp_pos_volt.value = event.target.value * voltage_compensation_value * 2048 / 1023;
        });

        ki_pos_volt_entry = document.getElementById("kI_pos_volt_entry");
        new_ki_pos_volt = document.getElementById("new_kI_pos_volt");
        ki_pos_volt_entry.addEventListener("input", (event) => {
            new_ki_pos_volt.value = event.target.value * voltage_compensation_value * 2048 / 1023 * 1000;
        });

        kd_pos_volt_entry = document.getElementById("kD_pos_volt_entry");
        new_kd_pos_volt = document.getElementById("new_kD_pos_volt");
        kd_pos_volt_entry.addEventListener("input", (event) => {
            new_kd_pos_volt.value = event.target.value * voltage_compensation_value * 2048 / 1023 / 1000;
        });


        /* Velocity calculator */
        kp_vel_entry = document.getElementById("kP_vel_entry");
        new_kp_vel = document.getElementById("new_kP_vel");
        kp_vel_entry.addEventListener("input", (event) => {
            new_kp_vel.value = event.target.value * 2048 / 1023 / 10;
        });

        ki_vel_entry = document.getElementById("kI_vel_entry");
        new_ki_vel = document.getElementById("new_kI_vel");
        ki_vel_entry.addEventListener("input", (event) => {
            new_ki_vel.value = event.target.value * 2048 / 1023 * 1000 / 10;
        });

        kd_vel_entry = document.getElementById("kD_vel_entry");
        new_kd_vel = document.getElementById("new_kD_vel");
        kd_vel_entry.addEventListener("input", (event) => {
            new_kd_vel.value = event.target.value * 2048 / 1023 / 1000 / 10;
        });

        kf_vel_entry = document.getElementById("kF_vel_entry");
        new_kf_vel = document.getElementById("new_kF_vel");
        kf_vel_entry.addEventListener("input", (event) => {
            new_kf_vel.value = event.target.value * 2048 / 1023 / 10;
        });


        /* Velocity with voltage compensation calculator */
        volt_comp_vel_entry = document.getElementById("volt_comp_value_velocity");
        voltage_compensation_velocity_value = volt_comp_vel_entry.placeholder;
        volt_comp_vel_entry.addEventListener("input", (event) => {
            voltage_compensation_velocity_value = event.target.value;
            new_kp_vel_volt.value = kp_vel_volt_entry.value * voltage_compensation_velocity_value * 2048 / 1023 / 10;
            new_ki_vel_volt.value = ki_vel_volt_entry.value * voltage_compensation_velocity_value * 2048 / 1023 * 1000 / 10;
            new_kd_vel_volt.value = kd_vel_volt_entry.value * voltage_compensation_velocity_value * 2048 / 1023 / 1000 / 10;
            new_kf_vel_volt.value = kf_vel_volt_entry.value * voltage_compensation_velocity_value * 2048 / 1023 / 10 / 10;
        });
        kp_vel_volt_entry = document.getElementById("kP_vel_volt_entry");
        new_kp_vel_volt = document.getElementById("new_kP_vel_volt");
        kp_vel_volt_entry.addEventListener("input", (event) => {
            new_kp_vel_volt.value = event.target.value * voltage_compensation_velocity_value * 2048 / 1023 / 10;
        });

        ki_vel_volt_entry = document.getElementById("kI_vel_volt_entry");
        new_ki_vel_volt = document.getElementById("new_kI_vel_volt");
        ki_vel_volt_entry.addEventListener("input", (event) => {
            new_ki_vel_volt.value = event.target.value * voltage_compensation_velocity_value * 2048 / 1023 * 1000 / 10;
        });

        kd_vel_volt_entry = document.getElementById("kD_vel_volt_entry");
        new_kd_vel_volt = document.getElementById("new_kD_vel_volt");
        kd_vel_volt_entry.addEventListener("input", (event) => {
            new_kd_vel_volt.value = event.target.value * voltage_compensation_velocity_value * 2048 / 1023 / 1000 / 10;
        });

        kf_vel_volt_entry = document.getElementById("kF_vel_volt_entry");
        new_kf_vel_volt = document.getElementById("new_kF_vel_volt");
        kf_vel_volt_entry.addEventListener("input", (event) => {
            new_kf_vel_volt.value = event.target.value * voltage_compensation_velocity_value * 2048 / 1023 / 10;
        });

        pos_entry = document.getElementById("pos_entry");
        new_pos = document.getElementById("new_pos");
        pos_entry.addEventListener("input", (event) => {
            new_pos.value = event.target.value / 2048;
        });

        vel_entry = document.getElementById("vel_entry");
        new_vel = document.getElementById("new_vel");
        vel_entry.addEventListener("input", (event) => {
            new_vel.value = event.target.value / 2048 * 10;
        });

        accel_entry = document.getElementById("accel_entry");
        new_accel = document.getElementById("new_accel");
        accel_entry.addEventListener("input", (event) => {
            new_accel.value = event.target.value / 2048 * 10;
        });
    </script>

Using Closed-Loop Control
-------------------------

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: Java

               // robot init, set slot 0 gains
               m_motor.config_kF(0, 0.05, 50);
               m_motor.config_kP(0, 0.046, 50);
               m_motor.config_kI(0, 0.0002, 50);
               m_motor.config_kD(0, 4.2, 50);

               // enable voltage compensation
               m_motor.configVoltageComSaturation(12);
               m_motor.enableVoltageCompensation(true);

               // periodic, run velocity control with slot 0 configs,
               // target velocity of 50 rps (10240 ticks/100ms)
               m_motor.selectProfileSlot(0, 0);
               m_motor.set(ControlMode.Velocity, 10240);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // robot init, set slot 0 gains
               m_motor.Config_kF(0, 0.05, 50);
               m_motor.Config_kP(0, 0.046, 50);
               m_motor.Config_kI(0, 0.0002, 50);
               m_motor.Config_kD(0, 4.2, 50);

               // enable voltage compensation
               m_motor.ConfigVoltageComSaturation(12);
               m_motor.EnableVoltageCompensation(true);

               // periodic, run velocity control with slot 0 configs,
               // target velocity of 50 rps (10240 ticks/100ms)
               m_motor.SelectProfileSlot(0, 0);
               m_motor.Set(ControlMode::Velocity, 10240);

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // class member variable
               final VelocityVoltage m_velocity = new VelocityVoltage(0);

               // robot init, set slot 0 gains
               var slot0Configs = new Slot0Configs();
               slot0Configs.kV = 0.12;
               slot0Configs.kP = 0.11;
               slot0Configs.kI = 0.48;
               slot0Configs.kD = 0.01;
               m_talonFX.getConfigurator().apply(slot0Configs, 0.050);

               // periodic, run velocity control with slot 0 configs,
               // target velocity of 50 rps
               m_velocity.Slot = 0;
               m_motor.setControl(m_velocity.withVelocity(50));

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // class member variable
               controls::VelocityVoltage m_velocity{0_tps};

               // robot init, set slot 0 gains
               configs::Slot0Configs slot0Configs{};
               slot0Configs.kV = 0.12;
               slot0Configs.kP = 0.11;
               slot0Configs.kI = 0.48;
               slot0Configs.kD = 0.01;
               m_talonFX.GetConfigurator().Apply(slot0Configs, 50_ms);

               // periodic, run velocity control with slot 0 configs,
               // target velocity of 50 rps
               m_velocity.Slot = 0;
               m_motor.SetControl(m_velocity.WithVelocity(50_tps));

Motion Magic®
^^^^^^^^^^^^^

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: Java

               // robot init, set slot 0 gains
               m_motor.config_kF(0, 0.05, 50);
               // PID runs on position
               m_motor.config_kP(0, 0.2, 50);
               m_motor.config_kI(0, 0, 50);
               m_motor.config_kD(0, 4.2, 50);

               // set Motion Magic settings
               m_motor.configMotionCruiseVelocity(16384); // 80 rps = 16384 ticks/100ms cruise velocity
               m_motor.configMotionAcceleration(32768); // 160 rps/s = 32768 ticks/100ms/s acceleration
               m_motor.configMotionSCurveStrength(3); // s-curve smoothing strength of 3

               // enable voltage compensation
               m_motor.configVoltageComSaturation(12);
               m_motor.enableVoltageCompensation(true);

               // periodic, run Motion Magic with slot 0 configs
               m_motor.selectProfileSlot(0, 0);
               // target position of 200 rotations (409600 ticks)
               // add 0.02 (2%) arbitrary feedforward to overcome friction
               m_motor.set(ControlMode.MotionMagic, 409600, DemandType.ArbitraryFeedforward, 0.02);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // robot init, set slot 0 gains
               m_motor.Config_kF(0, 0.05, 50);
               // PID runs on position
               m_motor.Config_kP(0, 0.2, 50);
               m_motor.Config_kI(0, 0, 50);
               m_motor.Config_kD(0, 4.2, 50);

               // set Motion Magic settings
               m_motor.ConfigMotionCruiseVelocity(16384); // 80 rps = 16384 ticks/100ms cruise velocity
               m_motor.ConfigMotionAcceleration(32768); // 160 rps/s = 32768 ticks/100ms/s acceleration
               m_motor.ConfigMotionSCurveStrength(3); // s-curve smoothing strength of 3

               // enable voltage compensation
               m_motor.ConfigVoltageComSaturation(12);
               m_motor.EnableVoltageCompensation(true);

               // periodic, run Motion Magic with slot 0 configs
               m_motor.SelectProfileSlot(0, 0);
               // target position of 200 rotations (409600 ticks)
               // add 0.02 (2%) arbitrary feedforward to overcome friction
               m_motor.Set(ControlMode::MotionMagic, 409600, DemandType::ArbitraryFeedforward, 0.02);

   * - .. centered:: v6
     - .. compound::

         .. note:: The Motion Magic® S-Curve Strength has been replaced with jerk control in Phoenix 6.

         .. tab-set::

            .. tab-item:: Java
               :sync: Java

               .. code-block:: java

                  // class member variable
                  final MotionMagicVoltage m_motmag = new MotionMagicVoltage(0);

                  // robot init
                  var talonFXConfigs = new TalonFXConfiguration();

                  // set slot 0 gains
                  var slot0Configs = talonFXConfigs.Slot0Configs;
                  slot0Configs.kS = 0.24; // add 0.24 V to overcome friction
                  slot0Configs.kV = 0.12; // apply 12 V for a target velocity of 100 rps
                  // PID runs on position
                  slot0Configs.kP = 4.8;
                  slot0Configs.kI = 0;
                  slot0Configs.kD = 0.1;

                  // set Motion Magic settings
                  var motionMagicConfigs = talonFXConfigs.MotionMagicConfigs;
                  motionMagicConfigs.MotionMagicCruiseVelocity = 80; // 80 rps cruise velocity
                  motionMagicConfigs.MotionMagicAcceleration = 160; // 160 rps/s acceleration (0.5 seconds)
                  motionMagicConfigs.MotionMagicJerk = 1600; // 1600 rps/s^2 jerk (0.1 seconds)

                  m_talonFX.getConfigurator().apply(talonFXConfigs, 0.050);

                  // periodic, run Motion Magic with slot 0 configs,
                  // target position of 200 rotations
                  m_motmag.Slot = 0;
                  m_motor.setControl(m_motmag.withPosition(200));

            .. tab-item:: C++
               :sync: C++

               .. code-block:: cpp

                  // class member variable
                  controls::MotionMagicVoltage m_motmag{0_tr};

                  // robot init
                  configs::TalonFXConfiguration talonFXConfigs{};

                  // set slot 0 gains
                  auto& slot0Configs = talonFXConfigs.Slot0Configs;
                  slot0Configs.kS = 0.24; // add 0.24 V to overcome friction
                  slot0Configs.kV = 0.12; // apply 12 V for a target velocity of 100 rps
                  // PID runs on position
                  slot0Configs.kP = 4.8;
                  slot0Configs.kI = 0;
                  slot0Configs.kD = 0.1;

                  // set Motion Magic settings
                  auto& motionMagicConfigs = talonFXConfigs.MotionMagicConfigs;
                  motionMagicConfigs.MotionMagicCruiseVelocity = 80; // 80 rps cruise velocity
                  motionMagicConfigs.MotionMagicAcceleration = 160; // 160 rps/s acceleration (0.5 seconds)
                  motionMagicConfigs.MotionMagicJerk = 1600; // 1600 rps/s^2 jerk (0.1 seconds)

                  m_talonFX.GetConfigurator().Apply(talonFXConfigs, 50_ms);

                  // periodic, run Motion Magic with slot 0 configs,
                  // target position of 200 rotations
                  m_motmag.Slot = 0;
                  m_motor.SetControl(m_motmag.WithPosition(200_tr));

Motion Profiling
^^^^^^^^^^^^^^^^

Closed-loop control requests have been expanded to support motion profiles generated by the robot controller.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // class member variable
         final PositionVoltage m_position = new PositionVoltage(0);
         // Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
         final TrapezoidProfile m_profile = new TrapezoidProfile(
            new TrapezoidProfile.Constraints(80, 160)
         );
         // Final target of 200 rot, 0 rps
         TrapezoidProfile.State m_goal = new TrapezoidProfile.State(200, 0);
         TrapezoidProfile.State m_setpoint = new TrapezoidProfile.State();

         // robot init, set slot 0 gains
         var slot0Configs = new Slot0Configs();
         slot0Configs.kS = 0.24; // add 0.24 V to overcome friction
         slot0Configs.kV = 0.12; // apply 12 V for a target velocity of 100 rps
         slot0Configs.kP = 4.8;
         slot0Configs.kI = 0;
         slot0Configs.kD = 0.1;
         m_talonFX.getConfigurator().apply(Slot0Configs, 0.050);

         // periodic, update the profile setpoint for 20 ms loop time
         m_setpoint = m_profile.calculate(0.020, m_setpoint, m_goal);
         // apply the setpoint to the control request
         m_position.Position = m_setpoint.position;
         m_position.Velocity = m_setpoint.velocity;
         m_motor.setControl(m_position);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // class member variable
         controls::PositionVoltage m_position{0_tr};
         // Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
         frc::TrapezoidProfile<units::turns> m_profile{{80_tps, 160_tr_per_s_sq}};
         // Final target of 200 rot, 0 rps
         frc::TrapezoidProfile<units::turns>::State m_goal{200_tr, 0_tps};
         frc::TrapezoidProfile<units::turns>::State m_setpoint{};

         // robot init, set slot 0 gains
         configs::Slot0Configs slot0Configs{};
         slot0Configs.kS = 0.24; // add 0.24 V to overcome friction
         slot0Configs.kV = 0.12; // apply 12 V for a target velocity of 100 rps
         slot0Configs.kP = 4.8;
         slot0Configs.kI = 0;
         slot0Configs.kD = 0.1;
         m_talonFX.GetConfigurator().Apply(slot0Configs, 50_ms);

         // periodic, update the profile setpoint for 20 ms loop time
         m_setpoint = m_profile.Calculate(20_ms, m_setpoint, m_goal);
         // apply the setpoint to the control request
         m_position.Position = m_setpoint.position;
         m_position.Velocity = m_setpoint.velocity;
         m_motor.SetControl(m_position);
