Installing Phoenix 6 (non-FRC)
==============================

.. important:: Users in FRC can skip this article.

Phoenix 6 is fully supported outside of `FRC <https://en.wikipedia.org/wiki/FIRST_Robotics_Competition>`__ on :ref:`supported <docs/installation/requirements:system requirements>` systems with a USB to CAN adapter.

.. note:: `CANivore <https://store.ctr-electronics.com/canivore/>`__ is the recommended USB to CAN adapter with support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__, name specification, and Windows (as host).

Installation is composed of a few primary pieces. Linux users may skip CANivore installation if they are using a generic USB-to-CAN adapter.

1. :ref:`docs/installation/installation-nonfrc:apt repository installation` (Linux only)
2. (Optional) :ref:`docs/installation/installation-nonfrc:canivore installation` (Linux only)
3. :ref:`docs/installation/installation-nonfrc:api installation`

Linux Setup
-----------

Linux systems require some extra steps to install Phoenix 6 and CANivore.

APT Repository Installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Phoenix 6 C++ API, CANivore kernel module, and other utilities are distributed through our APT repository. Begin with adding the repository to your APT sources.

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

.. tab-set::

   .. tab-item:: Raspberry Pi

      1. Install the Raspberry Pi kernel headers.

      .. code-block:: bash

         sudo apt install raspberrypi-kernel-headers

      2. Update APT and install ``canivore-usb``

      .. code-block::

         sudo apt update
         sudo apt install canivore-usb -y

   .. tab-item:: Other Distributions

      1. Update APT and install ``canivore-usb``.

      .. code-block:: bash

         sudo apt update
         sudo apt install canivore-usb -y

API Installation
----------------

.. tab-set::

   .. tab-item:: Python
      :sync: python

      Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         py -3 -m pip install phoenix6

      .. tip:: To get a robot application up and running quickly, check out our `non-FRC Python example <https://github.com/CrossTheRoadElec/Python-NonFRC-Example>`__.

   .. tab-item:: C#
      :sync: C#

      Installation is available through `NuGet <https://www.nuget.org/packages/Phoenix6/>`__.

      An example on adding NuGet packages to a Visual Studio project is available in the `Microsoft Quickstart <https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio>`__. Alternatively, the package can be added using the dotnet CLI.

      .. code-block:: bash

         dotnet add package Phoenix6.Hardware

   .. tab-item:: C++ (Linux)

      Phoenix 6 can be installed and updated using the following:

      .. code-block:: bash

         sudo apt update
         sudo apt install phoenix6

      .. tip:: To get a robot application up and running quickly, check out our `non-FRC Linux example <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

Simulation vs Hardware
^^^^^^^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: Python
      :sync: python

      Users may notice the robot program is using simulated devices by default. This is the default behavior if the host platform supports simulation (see :ref:`requirements <docs/installation/requirements:system requirements>` for a full list of supported platforms).

      In order for the robot program to communicate with physical devices (on platforms that support both simulation and hardware), the ``CTR_TARGET`` environment variable must be set. Possible values of ``CTR_TARGET`` are:

      - ``Hardware`` (see :doc:`/docs/canivore/canivore-hardware-attached`)
      - ``Simulation`` (see :doc:`/docs/api-reference/simulation/simulation-intro`)
      - ``Replay`` (see :doc:`/docs/api-reference/api-usage/hoot-replay`)

      Examples of setting ``CTR_TARGET`` are shown below.

      .. tab-set::

         .. tab-item:: Windows

            .. code-block:: ps1

               $env:CTR_TARGET="Hardware" # Set the environment variable, which will persist for the duration of this powershell instance.

         .. tab-item:: Linux

            .. code-block:: bash

               export CTR_TARGET=Hardware # Export the environment variable so it's persistent in the shell

            Or

            .. code-block:: bash

               CTR_TARGET=Hardware python3 application.py # Set the environment variable only for the python call

   .. tab-item:: C#
      :sync: C#

      There are several variations of the Phoenix 6 NuGet package to switch between real and simulated devices on supported platforms (see :ref:`requirements <docs/installation/requirements:system requirements>`). The available NuGet packages are:

      - ``Phoenix6.Hardware`` (see :doc:`/docs/canivore/canivore-hardware-attached`)
      - ``Phoenix6.Simulation`` (see :doc:`/docs/api-reference/simulation/simulation-intro`)
      - ``Phoenix6.Replay`` (see :doc:`/docs/api-reference/api-usage/hoot-replay`)

      Note that only one of these packages may be active in the program at a time.

Firmware Installation
---------------------

Device firmware upgrading is handled by the :doc:`/docs/tuner/index` configuration client.

Troubleshooting
---------------

``Bad return status on module...``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This error can show up on Raspberry Pi or Jetson systems when using the incorrect tools distribution for APT. Refer to :ref:`Modifying list Distribution <canivore-modifying-list-dist>` to correct your ``.list`` file.

Diagnostics is running but no CAN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Symptom:** Tuner can ping the system and see that diagnostics is running but there are no devices.

**Possible Solutions:**

* Verify that the CAN Bus is valid. Motors should be blinking orange. Consult :ref:`docs/hardware-reference/index:hardware reference` for a full list of LED codes.

* Verify that the ``canivore-usb`` kernel module is correctly installed by running ``modinfo canivore-usb``.

  * If ``canivore-usb`` shows installed with APT but does not appear with ``modinfo``, then an update may have broken the module. Uninstall and reinstall ``canivore-usb`` with:

.. code-block:: bash

   sudo apt remove canivore-usb canivore-usb-kernel
   sudo apt install canivore-usb

Examples
--------

The FRC `Phoenix 6 Examples <https://github.com/CrossTheRoadElec/Phoenix6-Examples>`__ can be used as a reference outside of FRC. Most of the API is identical, aside from a few FRC-specific integrations and the WPILib framework used by the robot program.

Non-FRC Projects
^^^^^^^^^^^^^^^^

We recommend that users use the standard language projects to use our library outside of FRC.

- A typical Python project will have a ``robot.py`` that utilizes the installed ``phoenix6`` library, as demonstrated by the `Python example <https://github.com/CrossTheRoadElec/Python-NonFRC-Example>`__.

- A typical C# project is a `Visual Studio <https://visualstudio.microsoft.com/>`__ or ``dotnet`` project that includes our libraries via NuGet.

- A typical C++ Linux project uses CMake, as demonstrated by the `C++ Linux example <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

.. note:: When utilizing actuators outside of FRC, the user must continuously feed an enable signal to the device. For more information, see :ref:`Enabling Actuators <docs/api-reference/api-usage/enabling-actuators:non-frc applications>`.

Alternative Support
-------------------

Some older devices such as the `TalonSRX <https://store.ctr-electronics.com/talon-srx/>`__ are not supported by Phoenix 6 and require usage of the `Phoenix 5 API <https://v5.docs.ctr-electronics.com/>`__.

We also provide a hardware robot controller called the `HERO development board <https://store.ctr-electronics.com/hero-development-board/>`__. The HERO can be programmed in C# to utilize `compatible <https://v5.docs.ctr-electronics.com/en/stable/ch04_DoINeedThis.html#do-i-need-to-install-any-of-this>`__ **Phoenix 5** devices.
