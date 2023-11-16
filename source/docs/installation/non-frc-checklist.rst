Using Phoenix outside of FRC
============================

.. important:: Users in FRC can skip this article.

Phoenix 6 is fully supported outside of `FRC <https://en.wikipedia.org/wiki/FIRST_Robotics_Competition>`__ on :ref:`supported <docs/installation/installation:system requirements>` Linux systems with a USB to CAN adapter.

.. note:: `CANivore <https://store.ctr-electronics.com/canivore/>`__ is the recommended USB to CAN adapter with support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__, name specification, and Windows (as host).

Installation
------------

API Installation
^^^^^^^^^^^^^^^^

Installation instructions can be found in :doc:`/docs/installation/installation`. The instructions on this site can be utilized for both FRC and non-FRC.

Firmware Installation
^^^^^^^^^^^^^^^^^^^^^

Device firmware upgrading is handled by the :doc:`/docs/tuner/index` configuration client.

Enabling Devices
----------------

When utilizing the TalonFX motor controller, the user must continuously feed an enable signal to the device. The device will disable if the enable signal has not been fed within the specified timeout period.

.. note:: It's recommended for ``feedEnable()`` to be called synchronously with your motor update loop. The timeout should be larger than than the update loop rate.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // enable the motor controller for the next 100ms
         Unmanaged.feedEnable(100);

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // enable the motor controller for the next 100ms
         ctre::phoenix::unmanaged::FeedEnable(100);

   .. tab-item:: Python
      :sync: python3

      .. code-block:: python

         from phoenix6 import unmanaged

         // enable the motor controller for the next 100ms
         unmanaged.feed_enable(100)

   .. tab-item:: C#
      :sync: csharp

      .. code-block:: csharp

         // enable the motor controller for the next 100ms
         UnmanagedNative.FeedEnable(0.100);

Examples
--------

The same Phoenix 6 examples can be used as a reference outside of FRC. The function calls are identical, although the framework that is used to call them may be different and specialized for FRC.

Non FRC Projects
----------------

We recommend that users use the standard language projects to use our library outside of FRC. For example, a typical Python project will have a ``main.py`` that utilizes the ``phoenix6`` library that's installed with ``pip``.

A typical C# project is a `Visual Studio <https://visualstudio.microsoft.com/>`__ project that includes our libraries via nuget.

For C++, an example utilizing CMake is provided `here <https://github.com/CrossTheRoadElec/PhoenixPro-Linux-Example>`__.

Alternative Support
-------------------

In the event that the Phoenix 6 API does not fit the user's needs (e.g. utilizing devices such as a `TalonSRX <https://store.ctr-electronics.com/talon-srx/>`__). Users can utilize the `Phoenix 5 API <https://v5.docs.ctr-electronics.com/>`__.

We also provide a hardware robot controller called the `HERO development board <https://store.ctr-electronics.com/hero-development-board/>`__. The HERO can be programmed in C# to utilize `compatible <https://v5.docs.ctr-electronics.com/en/stable/ch04_DoINeedThis.html#do-i-need-to-install-any-of-this>`__ **v5** devices.
