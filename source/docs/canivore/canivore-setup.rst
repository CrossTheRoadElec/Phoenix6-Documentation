CANivore Setup
==============

Supported Systems
-----------------

Currently, the following systems are supported for CANivore development:

- roboRIO
- Windows (x86-64)
- Linux desktop (x86-64)
- Raspberry Pi (Linux ARM 32-bit and 64-bit)
- NVIDIA Jetson

.. note:: **Custom bit rates and CAN 2.0 are not supported at this time.** The parameters passed into SocketCAN are not applied by the firmware.

roboRIO
^^^^^^^

.. note:: Phoenix Tuner X requires a 2023 roboRIO image or newer to configure the CANivore.

No additional steps are required. The roboRIO comes with the ``canivore-usb`` kernel module pre-installed.

Linux (non-FRC)
^^^^^^^^^^^^^^^

On non-FRC Linux systems, the ``canivore-usb`` kernel module must be installed to add SocketCAN support for the CANivore. The kernel module is distributed through our APT repository. Begin with adding this repository to your APT sources.

.. code-block:: bash

   sudo curl -s --compressed -o /usr/share/keyrings/ctr-pubkey.gpg "https://deb.ctr-electronics.com/ctr-pubkey.gpg"
   sudo curl -s --compressed -o /etc/apt/sources.list.d/ctr2022.list "https://deb.ctr-electronics.com/ctr2022.list"

After adding the sources, the kernel module can be installed and updated using the following:

.. code-block:: bash

   sudo apt update
   sudo apt install canivore-usb

.. tip:: To get a robot application up and running quickly, check out our `SocketCAN example <https://github.com/CrossTheRoadElec/Phoenix-Linux-SocketCAN-Example/blob/master/example.cpp>`__.

Viewing Attached CANivores
--------------------------

Attached CANivores can be viewed in Phoenix Tuner X by selecting the :guilabel:`CANivores` page from the left-hand sidebar. You can specify the target system in the :guilabel:`Target IP or Team #` text box.

.. image:: images/canivore-page.png
   :width: 70%
   :alt: Showing where the CANivores page is in the left-hand sidebar

.. note:: The Phoenix Diagnostic Server must be running on the target system to use the CANivores page.

.. tip:: If you are connecting to CANivores on your local Windows machine, you can enable the CANivore USB toggle and set the target IP to ``localhost``. This runs a diagnostic server within Tuner X so you do not need to run a robot project to communicate with CANivores.

Field Upgrading CANivores
-------------------------

A CANivore can be field updated using :doc:`Phoenix Tuner X </docs/tuner/index>`.

Click or tap on the listed CANivore card:

.. image:: images/canivore-cards.png
   :width: 70%
   :alt: CANivore root page

The CANivore can then be field upgraded via the dropdown or by manually selected a file:

.. image:: images/canivore-field-upgrade.png
   :width: 70%
   :alt: Showcases the CANivore popup and the field upgrade functionality

Phoenix Tuner X also allows the user to batch field upgrade CANivores from the list of CANivores in the same manner as :ref:`batch field upgrading devices <docs/tuner/device-list:batch field upgrade>`.

Renaming CANivores
------------------

CANivores can be given custom names for use within a robot program. This can be configured through Phoenix Tuner X on the specified device card.

.. image:: images/setting-canivore-name.png
   :width: 70%
   :alt: Setting CANivore name

CANivore API
------------

All device constructors have an overload that takes a string CAN bus identifier. This identifier can be ``rio`` for the native roboRIO CAN bus, ``*`` to select the first available CANivore, or a CANivore's name or serial number. On non-FRC Linux systems, this string can also be a SocketCAN interface.

.. note:: If there are multiple CANivores with the same name, the system will use the first CANivore found.

If no CAN bus string is passed into the constructor, or the CAN bus string is empty, the behavior is platform-dependent:

- roboRIO: use the roboRIO native CAN bus
- Windows: use the first CANivore found
- non-FRC Linux: use SocketCAN interface ``can0``

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         TalonFX fx_default = new TalonFX(0); // On roboRIO, this constructs a TalonFX on the RIO native CAN bus
         TalonFX fx_rio = new TalonFX(1, "rio"); // This also constructs a TalonFX on the RIO native CAN bus
         TalonFX fx_drivebase = new TalonFX(0, "Drivebase"); // This constructs a TalonFX on the CANivore bus named "Drivebase"
         CANcoder cc_elevator = new CANcoder(0, "Elevator"); // This constructs a CANcoder on the CANivore bus named "Elevator"

   .. tab-item:: C++ (Header)
      :sync: C++

      .. code-block:: c++

         hardware::TalonFX fx_default{0}; // On roboRIO, this constructs a TalonFX on the RIO native CAN bus
         hardware::TalonFX fx_rio{1, "rio"}; // This also constructs a TalonFX on the RIO native CAN bus
         hardware::TalonFX fx_drivebase{0, "Drivebase"}; // This constructs a TalonFX on the CANivore bus named "Drivebase"
         hardware::CANcoder cc_elevator{0, "Elevator"}; // This constructs a CANcoder on the CANivore bus named "Elevator"

CANivore Status Prints
----------------------

When working with CANivore CAN buses in a robot program, Phoenix prints some messages to report the state of the CANivore connection. These messages can be useful to debug connection issues (bad USB vs bad CAN) or report bugs to CTR Electronics.


.. list-table:: Connection Messages
   :widths: 50 80
   :header-rows: 1

   * - Message
     - Connection Status
   * - CANbus Failed to Connect
     - Could not connect to a CANivore with the given name or serial number
   * - CANbus Connected
     - Successfully found and connected to the CANivore with the given name or serial number
   * - CANbus Disconnected
     - Detected that a CANivore USB device has been disconnected

.. list-table:: CANivore Bring-up Messages (Linux only)
   :widths: 50 80
   :header-rows: 1

   * - Message
     - Bring-up Status
   * - CANbus Failed Bring-up
     - Found and connected to the CANivore, but could not configure the device or start the network
   * - CANbus Successfully Started
     - Successfully configured the CANivore and started the network

.. list-table:: Network State Messages
   :widths: 50 80
   :header-rows: 1

   * - Message
     - Network State
   * - CANbus Network Down
     - | Linux: The SocketCAN network has been deactivated, USB-to-CAN activity has stopped
       | Windows: Could not open the communication channels for USB-to-CAN traffic
   * - CANbus Network Up
     - | Linux: The SocketCAN network has been activated, USB-to-CAN activity has resumed
       | Windows: Successfully opened the communication channels for USB-to-CAN traffic
