CANivore API
============

All device constructors have an overload that takes a ``CANBus`` object (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/CANBus.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_c_a_n_bus.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/canbus/index.html>`__). The native roboRIO CAN bus can be constructed using ``CANBus.roboRIO()``. Otherwise, the ``CANBus`` constructor takes a string identifier. This identifier can be ``*`` to select the first available CANivore, or it can be a CANivore's name or serial number. On non-FRC Linux systems, this string can also be a SocketCAN interface.

.. note:: If there are multiple CANivores with the same name, the system will use the first CANivore found.

If no CAN bus string is passed into the constructor, or the CAN bus string is empty, the behavior is platform-dependent:

- roboRIO: use the roboRIO native CAN bus
- Windows: use the first CANivore found
- non-FRC Linux: use SocketCAN interface ``can0``

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         final TalonFX fx_default = new TalonFX(0); // On roboRIO, this constructs a TalonFX on the RIO native CAN bus
         final TalonFX fx_rio = new TalonFX(1, CANBus.roboRIO()); // This also constructs a TalonFX on the RIO native CAN bus
         final TalonFX fx_drivebase = new TalonFX(0, new CANBus("Drivebase")); // This constructs a TalonFX on the CANivore bus named "Drivebase"
         final CANcoder cc_elevator = new CANcoder(0, new CANBus("Elevator")); // This constructs a CANcoder on the CANivore bus named "Elevator"

   .. tab-item:: C++ (Header)
      :sync: C++

      .. code-block:: c++

         hardware::TalonFX fx_default{0}; // On roboRIO, this constructs a TalonFX on the RIO native CAN bus
         hardware::TalonFX fx_rio{1, CANBus::RoboRIO()}; // This also constructs a TalonFX on the RIO native CAN bus
         hardware::TalonFX fx_drivebase{0, CANBus{"Drivebase"}}; // This constructs a TalonFX on the CANivore bus named "Drivebase"
         hardware::CANcoder cc_elevator{0, CANBus{"Elevator"}}; // This constructs a CANcoder on the CANivore bus named "Elevator"

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self._fx_default = hardware.TalonFX(0) # On roboRIO, this constructs a TalonFX on the RIO native CAN bus
         self._fx_rio = hardware.TalonFX(1, CANBus.roborio()) # This also constructs a TalonFX on the RIO native CAN bus
         self._fx_drivebase = hardware.TalonFX(0, CANBus("Drivebase")) # This constructs a TalonFX on the CANivore bus named "Drivebase"
         self._cc_elevator = hardware.CANcoder(0, CANBus("Elevator")) # This constructs a CANcoder on the CANivore bus named "Elevator"

The ``CANBus`` API can also be used to retrieve information about any given CAN bus, such as the bus utilization.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a CAN bus for the CANivore named drivetrain
         final CANBus canbus = new CANBus("drivetrain");
         // construct a TalonFX on the CAN bus
         final TalonFX fx = new TalonFX(0, canbus);

         // retrieve bus utilization for the CAN bus
         CANBusStatus canInfo = canbus.getStatus();
         float busUtil = canInfo.BusUtilization;

         if (busUtil > 0.8) {
            System.out.println("CAN bus utilization is greater than 80%!");
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a CAN bus for the CANivore named drivetrain
         CANBus canbus{"drivetrain"};
         // construct a TalonFX on the CAN bus
         hardware::TalonFX fx{0, canbus};

         // retrieve bus utilization for the CANivore named drivetrain
         CANBus::CANBusStatus canInfo = canbus.GetStatus();
         float busUtil = canInfo.BusUtilization;

         if (busUtil > 0.8) {
            std::cout << "CAN bus utilization is greater than 80%!" << std::endl;
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # create a CAN bus for the CANivore named drivetrain
         self._canbus = CANBus("drivetrain")
         # construct a TalonFX on the CAN bus
         self._fx = hardware.TalonFX(0, self._canbus)

         # retrieve bus utilization for the CANivore named drivetrain
         can_info = self._canbus.get_status()
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
