Tuning CANrange
===============

There are a few aspects of tuning a CANrange to correctly detect the presence of game pieces, robot components, or field elements.

Signal Strength Tuning
----------------------

The first step of detection tuning is to verify that the distance measurement is a valid measurement. This is accomplished by looking at the signal strength, with higher values indicating more confident distance measurements. By default, the minimum signal strength is 2500 to classify a distance measurement as "valid" for the purpose of the IsDetected signal.

There are two primary scenarios that affect the signal strength for the CANrange:

1. **CANrange looks into open air when nothing is in front of it** - This results in low signal strength under "not detected" and high signal strength with some distance when "detected"
2. **CANrange looks at something further away when nothing is in front of it** - This typically results in high signal strength regardless of wither something is in front of it, but the distance shortens when something is in front of it.

The first scenario requires Signal Strength tuning to identify the difference between open air and objects in front of the sensor. The process for tuning is to put an object in front of the CANrange, as it would happen on the final mechanism, and measure the signal strength. Then, remove that object and measure the signal strength.

Do this in as many configurations as is practical for the system and identify a signal strength threshold that will allow all detections when the object is present while disallowing as many of the detections when the object is not present as possible. Typically, in an open-air system, this alone is sufficient to classify an object as detected or not.

Distance Tuning
---------------

Distance tuning is essentially the same process as signal strength tuning: place an object in front of the CANrange, take a measurement, remove the object, take a measurement, and repeat. Just like in signal strength tuning, distance threshold should be set such that it splits the two scenarios as best as possible.

In open air, the distance measurement may be unreliable when the object is not detected, in which case the signal strength should filter it out and reject it. For these cases, simply ensure the distance threshold is above the distance when an object is present.

Examples
--------

Open Air
^^^^^^^^

The following is an example of a CANrange being used to detect an object with it otherwise pointing to open air.

.. image:: images/CANrange-OpenAir.png
   :alt: Plot of CANrange distance and signal strength when object is detected vs open air.

In the image, the distance measurement is unreliable at signal strengths below 2000, and very reliable when the strength is above 2000.

Given that the signal strength alone is sufficient to detect game piece detection, a large distance threshold can be used without much concern. In this case, the distance threshold is 0.4 meters, even though the measured distance is only 0.11 meters.

This results in the following IsDetected result, which aligns nicely with the presence of the object:

.. image:: images/CANrange-OpenAir-IsDetected.png
   :alt: Plot of CANrange distance, signal strength, and IsDetected when object is detected vs open air.

Always-Valid Measurements
^^^^^^^^^^^^^^^^^^^^^^^^^

The following is an example of a CANrange being used to detect an object when it is also pointed at a backing material when the object is not present.

.. image:: images/CANrange-Closed.png
   :alt: Plot of CANrange distance and signal strength when object is detected vs pointed at the backing material.

In this scenario, note that the signal strength is always high, typically larger than 2000. However, the distance measurement is always valid, so object detection must instead rely on the distance thresholding.

In this case, a signal strength of 2000 is appropriate, and a distance threshold of 0.15 meters would cleanly identify when an object is detected. This results in the following plot:

.. image:: images/CANrange-Closed-IsDetected.png
   :alt: Plot of CANrange distance, signal strength, and IsDetected when object is detected vs pointed at the backing material.

This, too, aligns nicely with when an object is placed in front of the CANrange.

Hysteresis
^^^^^^^^^^

In some cases, the object being detected results in a noisy distance measurement, and the CANrange must avoid accidentally declaring an object as no longer detected when it is still present and vice versa. An increased hysteresis may be appropriate in this circumstance, as it will require the distance measurement to move beyond the threshold to account for this noise.

Below is an example of such a case.

.. image:: images/CANrange-Hysteresis.png
   :alt: Plot of CANrange distance and signal strength when detecting an object that requires hysteresis.

In this scenario, the threshold should be approximately 0.115; however, the distance measurement sometimes dips below that threshold when the object is not present and above that threshold when it is. In this case, the hysteresis can be set to approximately 0.01 to account for the dips above and below, resulting in the following:

.. image:: images/CANrange-Hysteresis-IsDetected.png
   :alt: Plot of CANrange distance, signal strength, and IsDetected when detecting an object that requires hysteresis.

In this scenario, the hysteresis correctly prevents the IsDetected signal from blipping while the distance measured crosses the threshold.
