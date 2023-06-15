Deploying the Diagnostic Server
-------------------------------

Phoenix Tuner utilizes an on-device HTTP server called Phoenix Diagnostic Server to communicate with the device. The user can install the diagnostic server through one of two ways.

1: Deploying a Robot Program
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Phoenix Diagnostics will automatically run assuming you have instantiated a CTR-Electronics device in your robot program. This can be as simple as having a motor declared somewhere in your program.

.. note:: The motor IDs do not have to be valid, just creating the object alone will start diagnostics. C++ users can simply include any ``phoenix6`` header and it will accomplish the same behavior.

.. tab-set::

   .. tab-item:: Java

      .. code-block:: java

         private TalonFX m_motor = new TalonFX(0, "*");

   .. tab-item:: C++

      .. code-block:: cpp

         hardware::TalonFX m_talonFX{0};

When the program runs, it'll print text to the console similar to the below

.. note:: WPILib users will see this text in the `Driver Station <https://docs.wpilib.org/en/stable/docs/software/driverstation/driver-station.html#messages-tab>`__ or `RioLog <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/viewing-console-output.html>`__

.. code-block:: text

   [phoenix] Starting Standalone Diagnostics Server (23.1.0-Jun  2 2023,23:17:09)
   [phoenix-diagnostics] Server 2023.1.0 (Jun  2 2023, 23:17:56) running on port: 1250

2: Running Temporary Diagnostic Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Alternatively, users can :ref:`run a temporary diagnostic <docs/tuner/connecting:temporary diagnostics (frc)>` server in Tuner X. The temporary diagnostic server will only run until the next reboot of the target system.
