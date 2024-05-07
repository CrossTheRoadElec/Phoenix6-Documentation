Requirements
============

This document explains the requirements to use Phoenix 6.

Supported Devices
-----------------

Phoenix 6 supports the following devices:

- TalonFX (`Falcon 500 <https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/>`__, `Kraken X60 <https://store.ctr-electronics.com/kraken-x60/>`__)
- `CANcoder <https://store.ctr-electronics.com/cancoder/>`__
- `Pigeon 2.0 <https://store.ctr-electronics.com/pigeon-2/>`__

CAN Bus Requirements
--------------------

Phoenix 6 devices are supported on the below CAN bus adapters.

.. tab-set::

   .. tab-item:: FRC

      - roboRIO
      - `CANivore <https://store.ctr-electronics.com/canivore/>`__

   .. tab-item:: non-FRC

      Any SocketCAN capable adapter will work, but the `CANivore <https://store.ctr-electronics.com/canivore/>`__ is highly recommended. CANivore offers :ref:`additional functionality <docs/migration/new-to-phoenix:feature breakdown>` over other SocketCAN adapters.

System Requirements
-------------------

Phoenix 6 supports a plethora of languages and operating systems. The table found below details which languages are supported on what platforms.

.. tab-set::

   .. tab-item:: FRC

      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Targets                     | Supported Languages   | Supports :doc:`CANivore </docs/canivore/canivore-intro>` | Supports :doc:`High-Fidelity Simulation </docs/api-reference/simulation/index>` |
      +=============================+=======================+==========================================================+=================================================================================+
      | NI roboRIO                  | Java, C++, Python     | Yes                                                      | n/a                                                                             |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Windows 10/11 x86-64        | Java, C++, Python     | Yes                                                      | Yes                                                                             |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Linux x86-64 (desktop) [1]_ | Java, C++, Python     | Yes                                                      | Yes                                                                             |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | macOS                       | Java, C++, Python     | No                                                       | Yes                                                                             |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+

   .. tab-item:: non-FRC

      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Targets                     | Supported Languages   | Supports :doc:`CANivore </docs/canivore/canivore-intro>` | Supports :doc:`High-Fidelity Simulation </docs/api-reference/simulation/index>` |
      +=============================+=======================+==========================================================+=================================================================================+
      | Windows 10/11 x86-64        | C#, C++, Python       | Yes                                                      | Yes (Python only)                                                               |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Linux x86-64 (desktop) [1]_ | C++, Python           | Yes                                                      | Yes (Python only)                                                               |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Linux ARM32 and ARM64 [2]_  | C++, Python           | Yes                                                      | No                                                                              |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | macOS (Simulation Only)     | Python                | No                                                       | Yes                                                                             |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+

.. [1] Supported Linux x86-64 (desktop) targets:

   - Ubuntu 22.04 or newer
   - Debian Bullseye or newer

.. [2] Supported Linux ARM32 and ARM64 targets:

   - Raspberry Pi
   - NVIDIA Jetson
   - Ubuntu 20.04 or newer
   - Debian Bullseye or newer
