CAN Bus Troubleshooting
=======================

There are typically two failure modes that must be resolved:

* There are same-model devices on the bus with the same device ID (devices have a default device ID of '0').
* CAN bus is not wired correctly or robustly

During hardware validation, you will likely have to isolate each device to assign a unique device ID.

.. note:: CTRE software has the ability to resolve device ID conflicts without device isolation, and CAN bus is capable of reporting the health of the CAN bus (see Driver Station lightening tab). However, the problem is when **both** root-causes are occurring at the same time, this can confuse students who have no experience with CAN bus systems.

.. note:: Many teams will pre-assign and update devices (Talon SRXs for example) long before the robot takes form. This is also a great task for new students who need to start learning the control system (with the appropriate mentor oversight to ensure hardware does not get damaged).

Identifying Duplicate IDs
-------------------------

.. tip:: Label the devices appropriately so there is no guessing which device ID is what. Don't have a label maker? Use tape and/or Sharpie (sharpie marks can be removed with alcohol).

Phoenix Tuner X will report when there are multiple devices of the same model with the same ID. This is shown when the device card is RED and there is a message in the middle of the device card. Users seeing this should iteratively :ref:`reassign IDs <docs/installation/configuring-your-device:configuring your device>` on the device(s).

Check your wiring
-----------------

Specific wiring instructions can be found in the user manual of each product, but there are common steps that must be followed for all devices:

- If connectors are used for CAN bus, **tug-test each individual crimped wire** one at a time. Bad crimps/connection points are the most common cause of intermittent connection issues.
- Confirm red and black are not flipped.
- Confirm battery voltage is adequate (through Driver Station or through voltmeter).
- Manually inspect and confirm that green-connects-to-green and yellow-connects-to-yellow at every connection point. **Flipping/mixing green and yellow is a common failure point during hardware bring up**.
- Confirm breakers are installed in the PDP where appropriate.
- Measure resistance between CANH and CANL when system is not powered (should measure ~60Ω).  If the measurement is 120Ω, then confirm both RIO and PDP are in circuit, and PDP jumper is in the correct location.

LEDs are red - now what?
------------------------

We need to rule out same-ID versus bad-bus-wiring.

There are two approaches:

- Approach 1 will help troubleshoot bad wiring and common IDs.
- Approach 2 will only be effective in troubleshooting common IDs, but this method is noteworthy because it is simple/quick (no wiring changes, just pull breakers).

The specific instructions for changing device ID are in the next section. Review this if needed.

Approach 1 (best)
^^^^^^^^^^^^^^^^^

- **Physically connect CAN bus from roboRIO to one device only.  Circumvent your wiring if need be.**
- Power boot robot/bench setup.
- Open Phoenix Tuner X and wait for connection (roboRIO may take ~30 seconds to boot)
- Open the :guilabel:`Devices` page
- Confirm that CAN device appears
- Use Tuner X to change the device ID
- Label the new ID on the physical device
- Repeat this procedure for every device, one at a time

If you find a particular device where communication is not possible, scrutinize device's power and CAN connection to the system. Make the test setup so simple that the only failure mode possible is within the device itself.

.. note:: Typically, there must be two 120-:math:`\Omega` termination resistors at each end of the bus. CTR Electronics integrates termination resistors into the PDP and the CANivore. The roboRIO also has an integrated termination resistor. During bring-up, if you keep your harness short (such as the CAN pigtail leads from a single TalonFX) then a single resistor is adequate for testing purposes.

Approach 2 (easier)
^^^^^^^^^^^^^^^^^^^

- **Leave CAN bus wiring as is**
- **Pull breakers and PCM fuse from PDP**
- **Disconnect CAN bus pigtail from PDP**
- **Pick the first device to power up and restore breaker/fuse/pigtail so that only this CAN device is powered**
- Power boot robot/bench setup
- Open Phoenix Tuner X and wait for connection (roboRIO may take ~30 seconds to boot)
- Open the Devices page
- Confirm that CAN device appears
- If device does not appear, scrutinize device's power and CAN connection to the system
- Use Tuner X to change the device ID
- Label the new ID on the physical device
- Repeat this procedure for every device

If you find a particular device or section of devices where communication is not possible, then the CAN bus wiring needs to be re-inspected.  Remember to "flick" / "shake" / "jostle" the CAN wiring in various sections to attempt to reproduce red LED blips.  This is a sure sign of loose contact points.

If you are able to detect and change device ID on your devices individually, begin piecing your CAN bus together. Start with either roboRIO <----> device <---> PDP, or CANivore <----> device <---> 120 :math:`\Omega` resistor, to ensure termination exists at both ends.  Then introduce the remaining devices until a failure is observed or until all devices are in-circuit.

If introducing a new device creates a failure symptom, scrutinize that device by replacing it, inspecting common wires, and inspecting power.

At the end of this section, all devices should appear (notwithstanding the above notes) and device LEDs should not be red. TalonFX and Pigeon2 typically blink orange when they are healthy and not controlled, and CANcoder rapid-blinks brightly. PDP may be orange or green depending on its sticky faults.
