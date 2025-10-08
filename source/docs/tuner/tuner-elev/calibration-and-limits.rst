Calibration and Limits
======================

Tuner will have the user perform a calibration routine, during which the user will bring the elevator to it's lowest position, and then manually raise the elevator to it's top-most position. This routine will automatically determine the bounds of the elevator and motor inverts.

To begin, select :guilabel:`Open Wizard`.

.. image:: images/highlighting-calibration-wizard.png
   :alt: Highlighting the calibration wizard
   :width: 600

This will open the Elevator Calibation popup. Manually bring the elevator to it's bottom-most position. This will act as it's zero. Once this is done, press :guilabel:`Zero Elevator`.

.. image:: images/elevator-zero.png
   :alt: Elevator zero popup
   :width: 600

Press the arrow on the bottom-right of the popup to navigate to the next step in the wizard. Bring the elevator to it's top-most position. Once this is done, press :guilabel:`Stop Tracking`.

.. image:: images/elevator-stop-tracking.png
   :alt: Elevator stop tracking page in popup
   :width: 600

Go ahead and exit the popup. The :guilabel:`Calibration Results` will be populated with it's results.

.. image:: images/elevator-calibration-results.png
   :alt: Elevator calibration results being populated
   :width: 600

Homing Limits
-------------

The generated Elevator subsystem includes a function for performing a **current-based** homing routine to zero the elevator. However, the calibration and limits interface provides the ability to configure hardware or remote limits.

.. image:: images/homing-and-limits.png
   :alt: Bounding box around the homing and limit configurations section
   :width: 600
