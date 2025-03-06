Requirements
============

This document explains the requirements to use Phoenix 6.

Supported Devices
-----------------

Phoenix 6 supports the following devices:

- `CANcoder <https://store.ctr-electronics.com/cancoder/>`__
- `CANdi <https://store.ctr-electronics.com/products/candi>`__
- `CANrange <https://store.ctr-electronics.com/products/canrange>`__
- `Pigeon 2.0 <https://store.ctr-electronics.com/pigeon-2/>`__
- Talon FX (`Falcon 500 <https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/>`__, `Kraken X60 <https://store.ctr-electronics.com/kraken-x60/>`__, `Kraken X40 <https://store.ctr-electronics.com/products/kraken-x44>`__)
- `Talon FXS <https://store.ctr-electronics.com/products/talon-fxs>`__

CAN Bus Requirements
--------------------

Phoenix 6 devices are supported on the below CAN bus adapters.

.. tab-set::

   .. tab-item:: FRC
      :sync: FRC

      - roboRIO
      - `CANivore <https://store.ctr-electronics.com/canivore/>`__

   .. tab-item:: non-FRC
      :sync: non-FRC

      On Linux systems, any SocketCAN capable adapter will work, but the `CANivore <https://store.ctr-electronics.com/canivore/>`__ is highly recommended. CANivore offers :ref:`additional functionality <docs/migration/new-to-phoenix:feature breakdown>` over other SocketCAN adapters. On Windows systems, you will need a CANivore to communicate with hardware.

System Requirements
-------------------

Phoenix 6 supports a plethora of languages and operating systems. The table found below details which languages are supported on what platforms.

.. tab-set::

   .. tab-item:: FRC
      :sync: FRC

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
      :sync: non-FRC

      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Targets                     | Supported Languages   | Supports :doc:`CANivore </docs/canivore/canivore-intro>` | Supports :doc:`High-Fidelity Simulation </docs/api-reference/simulation/index>` |
      +=============================+=======================+==========================================================+=================================================================================+
      | Windows 10/11 x86-64        | C#, Python            | Yes                                                      | Yes (Python only)                                                               |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Linux x86-64 (desktop) [1]_ | C++, Python           | Yes                                                      | Yes (Python only)                                                               |
      +-----------------------------+-----------------------+----------------------------------------------------------+---------------------------------------------------------------------------------+
      | Linux ARM32 and ARM64 [2]_  | C++, Python           | Yes                                                      | Yes (Python only)                                                               |
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
