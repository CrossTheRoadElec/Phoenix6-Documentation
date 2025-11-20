Hardware-Attached Simulation
============================

CANivore supports hardware-attached simulation when used in an `FRC robot program <https://docs.wpilib.org/en/stable/>`__. This allows a CANivore to be used with real devices on supported host operating systems. The below video showcases controlling a **real** `Falcon 500 <https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/>`__ in a robot program using hardware-attached simulation.

..
   Use full path since Sphinx does not resolve relative path when using wildcard inclusion
.. image:: /docs/canivore/images/robot-control-sim.*
   :alt: Showcasing robot control in simulation

To utilize hardware-attached simulation, ensure the CANivore is connected directly via USB to the machine running the simulation. All devices on the CANivore CAN Bus should be independently powered, as the CANivore does not provide power. In the robot program, the CANivore name or ``*`` must be specified in the device constructor.

.. important:: Any motors/actuators that have been connected to a roboRIO CAN Bus at any time must be factory defaulted due to them being :ref:`FRC Locked <docs/api-reference/api-usage/enabling-actuators:frc lock>`. Factory defaulting can be done in :ref:`Tuner X <docs/tuner/configs:tuner configs>` and should be done when the CANivore is **not** connected to a roboRIO.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         CANBus m_canbus = new CANbus("mycanivore");
         TalonFX m_motor = new TalonFX(0, m_canbus);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         static constexpr ctre::phoenix6::CANBus m_canbus{"mycanivore"};
         ctre::phoenix6::hardware::TalonFX m_motor{0, m_canbus};

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         self.canbus = CANBus("mycanivore")
         self.motor = hardware.TalonFX(0, self.canbus)

.. tab-set::

   .. tab-item:: Java/C++

      In VS Code, select the 3 dots in the top-right, then select :guilabel:`Hardware Sim Robot Code`

      .. image:: images/hardware-attached-sim-location.png
         :alt: Location of hardware attached simulation
         :width: 450

      A message in the console should appear that the CAN Bus is connected.

      .. code-block:: text

         ********** Robot program startup complete **********
         [phoenix] CANbus Connected: uno (WinUSB, 2B189E633353385320202034383803FF)
         [phoenix] CANbus Network Up: uno (WinUSB, 2B189E633353385320202034383803FF)
         [phoenix] Library initialization is complete.

   .. tab-item:: Python

      Simulation can be started using

      .. code-block:: bash

         python -m robotpy sim

      Users may notice the robot program is using simulated devices by default. This is the default behavior if the host platform supports simulation (see :ref:`requirements <docs/installation/requirements:system requirements>` for a full list of supported platforms).

      In order for the robot program to communicate with physical devices (on platforms that support both simulation and hardware), the ``CTR_TARGET`` environment variable must be set. Examples of this are shown below.

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
