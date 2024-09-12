Installing Phoenix 6 (non-FRC)
==============================

.. important:: Users in FRC can skip this article.

Phoenix 6 is fully supported outside of `FRC <https://en.wikipedia.org/wiki/FIRST_Robotics_Competition>`__ on :ref:`supported <docs/installation/requirements:system requirements>` systems with a USB to CAN adapter.

.. note:: `CANivore <https://store.ctr-electronics.com/canivore/>`__ is the recommended USB to CAN adapter with support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__, name specification, and Windows (as host).

Installation
------------

Installation is composed of a few primary pieces. Users may skip CANivore installation if they are using a generic USB-to-CAN adapter.

1. :ref:`docs/installation/installation-nonfrc:installing the phoenix apt repository`
2. (Optional) :ref:`docs/installation/installation-nonfrc:canivore installation`
3. :ref:`docs/installation/installation-nonfrc:api installation`

Installing the Phoenix APT Repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix 6 is distributed through our APT repository. Begin with adding the repository to your APT sources.

.. code-block:: bash

   YEAR=<year>
   sudo curl -s --compressed -o /usr/share/keyrings/ctr-pubkey.gpg "https://deb.ctr-electronics.com/ctr-pubkey.gpg"
   sudo curl -s --compressed -o /etc/apt/sources.list.d/ctr${YEAR}.list "https://deb.ctr-electronics.com/ctr${YEAR}.list"

.. note:: ``<year>`` should be replaced with the year of Phoenix 6 software for which you have purchased licenses.

Open ``/etc/apt/sources.list.d/ctr${YEAR}.list`` with an editor of your choice.

.. code-block:: bash

   sudo nano /etc/apt/sources.list.d/ctr${YEAR}.list

In the ``tools`` entry, replace ``stable`` with the distribution you want to use.

.. code-block:: bash

   # APT repo for CTR tools, including canivore-usb
   deb [signed-by=/usr/share/keyrings/ctr-pubkey.gpg] https://deb.ctr-electronics.com/tools stable main

For example. Raspberry Pi would look like:

.. code-block:: bash

   # APT repo for CTR tools, including canivore-usb
   deb [signed-by=/usr/share/keyrings/ctr-pubkey.gpg] https://deb.ctr-electronics.com/tools raspberrypi main

Available distributions can be found in the dropdown below.

.. _canivore-modifying-list-dist:

.. dropdown:: Modifying ``.list`` Distribution

   .. list-table::
      :header-rows: 1
      :align: left
      :width: 100%

      * - System

        - ``<dist>``

      * - Raspberry Pi

        - raspberrypi

      * - NVIDIA Jetson

        - jetson

      * - Other Linux systems (default)

        - stable

.. warning:: Do not modify the distribution of the ``libs/<year>`` entry in the ``.list`` file.

CANivore Installation
^^^^^^^^^^^^^^^^^^^^^

On non-FRC Linux systems, the ``canivore-usb`` kernel module must be installed to add SocketCAN support for the CANivore. The kernel module is distributed through our APT repository.

.. note:: **Custom bit rates and CAN 2.0 are not supported at this time.** The parameters passed into SocketCAN are not applied by the firmware.

.. dropdown:: Raspberry Pi

   .. warning:: Raspberry Pi 4 with 32-bit OS require additional instructions. See :ref:`docs/installation/installation-nonfrc:raspberry pi errata` for more information.

   1. Install the Raspberry Pi kernel headers.

   .. code-block:: bash

      sudo apt install raspberrypi-kernel-headers

   2. Update APT and install ``canivore-usb``

   .. code-block::

      sudo apt update
      sudo apt install canivore-usb -y

.. dropdown:: Other Supported Distributions

   1. Update APT and install ``canivore-usb``.

   .. code-block:: bash

      sudo apt update
      sudo apt install canivore-usb

.. tip:: To get a robot application up and running quickly, check out our `non-FRC Linux example <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

API Installation
^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: C++ (Linux)

      Phoenix 6 can be installed and updated using the following:

      .. code-block:: bash

         sudo apt update
         sudo apt install phoenix6

      .. tip:: To get a robot application up and running quickly, check out our `non-FRC Linux example <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

   .. tab-item:: Python

      Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         py -3 -m pip install phoenix6

   .. tab-item:: C# (Windows)

      Installation is available through `Nuget <https://www.nuget.org/packages/Phoenix6/>`__.  An example on adding Nuget packages to a Visual Studio project is available in the `Microsoft Quickstart <https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio>`__.

Firmware Installation
^^^^^^^^^^^^^^^^^^^^^

Device firmware upgrading is handled by the :doc:`/docs/tuner/index` configuration client.

Simulation vs Hardware
^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Python

      Users may notice the robot program is using simulated devices by default. This is the default behavior if the host platform supports simulation (see :ref:`requirements <docs/installation/requirements:system requirements>` for a full list of supported platforms).

      In order for the robot program to communicate with physical devices (on platforms that support both simulation and hardware), the ``CTR_TARGET`` environment variable must be set. Examples of this are shown below.

      .. code-block:: bash

         export CTR_TARGET=Hardware # Export the environment variable so it's persistent in the shell

      Or

      .. code-block:: bash

         CTR_TARGET=Hardware python3 application.py # Set the environment variable only for the python call

Troubleshooting
^^^^^^^^^^^^^^^

``Bad return status on module...``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This error can show up on Raspberry Pi or Jetson systems when using the incorrect tools distribution for APT. Refer to :ref:`Modifying list Distribution <canivore-modifying-list-dist>` to correct your ``.list`` file.

Diagnostics is running but no CAN
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptom:** Tuner can ping the system and see that diagnostics is running but there are no devices.
**Possible Solutions:**

* Verify that the CAN Bus is valid. Motors should be blinking orange. Consult :ref:`docs/hardware-reference/index:hardware reference` for a full list of LED codes.

* Verify that the ``canivore-usb`` kernel module is correctly installed by running ``modinfo canivore-usb``.

  * If ``canivore-usb`` shows installed with APT but does not appear with ``modinfo``, then an update may have broken the module. Uninstall and reinstall ``canivore-usb`` with:

.. code-block:: bash

   sudo apt remove canivore-usb canivore-usb-kernel
   sudo apt install canivore-usb

Raspberry Pi Errata
~~~~~~~~~~~~~~~~~~~

On a Raspberry Pi 4 or newer, the latest 32-bit Raspberry Pi OS image will default to using the 64-bit kernel while still using 32-bit APT packages. As a result, the canivore-usb kernel module will fail to install.

There are two options to work around this issue:

1. (Recommended) Use the 64-bit Raspberry Pi OS. This allows programs to use all available RAM and improves overall system performance and stability.
2. Add ``arm_64bit=0`` to /boot/config.txt and reboot. This forces the Raspberry Pi to use the 32-bit kernel. Note that programs will be limited to using 3 GB of RAM, and system performance may be impacted.

.. warning:: Do not add ``arm_64bit=0`` to /boot/config.txt when using the 64-bit Raspberry Pi OS. Attempting to do so may cause the Pi to be unable to boot.

Examples
--------

The same Phoenix 6 examples can be used as a reference outside of FRC. The function calls are identical, although the framework that is used to call them may be different and specialized for FRC.

Non FRC Projects
----------------

We recommend that users use the standard language projects to use our library outside of FRC. For example, a typical Python project will have a ``main.py`` that utilizes the ``phoenix6`` library that's installed with ``pip``.

A typical C# project is a `Visual Studio <https://visualstudio.microsoft.com/>`__ project that includes our libraries via nuget.

For C++, an example utilizing CMake is provided `here <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

.. note:: When utilizing actuators outside of FRC, the user must continuously feed an enable signal to the device. For more information, see :ref:`Enabling Actuators <docs/api-reference/api-usage/enabling-actuators:non-frc applications>`.

Alternative Support
-------------------

In the event that the Phoenix 6 API does not fit the user's needs (e.g. when using devices such as a `TalonSRX <https://store.ctr-electronics.com/talon-srx/>`__), users can utilize the `Phoenix 5 API <https://v5.docs.ctr-electronics.com/>`__.

We also provide a hardware robot controller called the `HERO development board <https://store.ctr-electronics.com/hero-development-board/>`__. The HERO can be programmed in C# to utilize `compatible <https://v5.docs.ctr-electronics.com/en/stable/ch04_DoINeedThis.html#do-i-need-to-install-any-of-this>`__ **v5** devices.
