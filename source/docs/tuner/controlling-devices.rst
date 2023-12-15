Controlling Devices
===================

Tuner X can be used to directly control devices outside a robot program. When combined with :ref:`docs/tuner/plotting:plotting`, it can be an excellent tool for calculating closed loop gains or isolating mechanical issues.

.. image:: images/highlighting-tuner-controls.png
   :alt: Indicating the control section in Tuner
   :width: 600

Devices can be controlled by clicking on the red "DISABLED" button, switching it to "ENABLED".

During this time, the output can be adjusted using the sliders or the text entries below it.

.. image:: images/highlighting-control-sliders.png
   :alt: Control sliders in the middle of the controls pane
   :width: 600

Control modes can be changed utilizing the dropdown below the disable/enable button.

.. image:: images/control-dropdown.png
   :alt: The control dropdown below the enable/disable button
   :width: 300

FRC Locked
----------

The "lock" icon next to the "DISABLED" button indicates that this device is FRC locked. This means the FRC Driver Station **must** also be enabled for the device to actuate. For more information, see :ref:`docs/api-reference/api-usage/enabling-actuators:frc lock`.

.. image:: images/highlighting-frc-lock.png
   :alt: Highlighting the FRC lock icon next to DISABLED
   :width: 400
