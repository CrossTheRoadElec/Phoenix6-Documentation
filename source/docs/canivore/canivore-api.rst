CANivore API
============

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

CAN Bus API
-----------

The ``CANBus`` API can be used to retrieve information about any given CAN bus, such as the bus utilization.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // retrieve bus utilization for the CANivore named drivetrain
         CANBusStatus canInfo = CANBus.getStatus("drivetrain");
         float busUtil = canInfo.BusUtilization;

         if (busUtil > 0.8) {
            System.out.println("CAN bus utilization is greater than 80%!");
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // retrieve for CAN bus named drivetrain
         CANBus::CANBusStatus canInfo = CANBus::GetStatus("drivetrain");
         float busUtil = canInfo.BusUtilization;

         if (busUtil > 0.8) {
            std::cout << "CAN bus utilization is greater than 80%!" << std::endl;
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # retrieve for CAN bus named drivetrain
         can_info = CANBus.get_status("drivetrain")
         bus_util = can_info.bus_utilization

         if bus_util > 0.8:
            print("CAN bus utilization is greater than 80%!")

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
