Enabling Actuators
==================

CTR Electronics supported actuators have a safety feature where they will automatically disable output if they have not recently received an enable signal.

FRC Applications
----------------

In FRC applications, the enable signal is automatically sent to devices based on the Driver Station enable signal. This includes controlling devices in Phoenix Tuner X.

.. warning:: The device `FRC Lock`_ must be cleared to control devices in hardware-attached simulation.

Non-FRC Applications
--------------------

In non-FRC applications, ``Unmanaged.feedEnable()`` **must be called periodically** to enable actuators.

.. warning:: The device `FRC Lock`_ must be cleared to control devices.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // feed the enable signal, timeout after 100ms
         Unmanaged.feedEnable(100);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // feed the enable signal, timeout after 100ms
         unmanaged::FeedEnable(100);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # feed the enable signal, timeout after 100ms
         phoenix6.unmanaged.feed_enable(0.100)

This must also be called to control devices in Phoenix Tuner X.

.. tip:: The Tuner X CANivore USB server automatically calls ``Unmanaged.feedEnable()`` when control is enabled.

FRC Lock
--------

When a device is connected to a roboRIO for use in FRC, the device becomes FRC-locked and will require the Driver Station enable signal for actuation. The device FRC lock can be reset by factory-defaulting the device in :doc:`Phoenix Tuner X </docs/tuner/configs>`.
