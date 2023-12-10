Requirements
============

This document details what Phoenix 6 supports.

Supported Devices
-----------------

Phoenix 6 supports the following devices:

- TalonFX (`Falcon 500 <https://store.ctr-electronics.com/falcon-500-powered-by-talon-fx/>`__, `Kraken x60 <https://store.ctr-electronics.com/kraken-x60/>`__)
- `CANcoder <https://store.ctr-electronics.com/cancoder/>`__
- `Pigeon 2.0 <https://store.ctr-electronics.com/pigeon-2/>`__

CAN bus Requirements
--------------------

Phoenix 6 devices are supported on the below CAN bus adapters.

.. tab-set::

   .. tab-item:: FRC

      - roboRIO
      - CANivore

   .. tab-item:: non-FRC

      Any SocketCAN capable adapter will work, but the `CANivore <https://store.ctr-electronics.com/canivore/>`__ is highly recommended. CANivore offers :ref:`additional functionality <docs/migration/new-to-phoenix:feature breakdown>` over other SocketCAN adapters.

System Requirements
-------------------

Phoenix supports a plethora of languages and operating systems. The table found below details which languages are supported on what platforms. All targets support our :ref:`high-fidelity simulation <docs/api-reference/simulation/index:simulation>`.

+-----------------------------+-----------------------+-------------------+
| Targets                     | Supported Languages   | Supports CANivore |
+=============================+=======================+===================+
| NI roboRIO                  | Java, C++, Python     | Yes               |
+-----------------------------+-----------------------+-------------------+
| Windows 10/11 x86-64        | Java, C++, Python, C# | Yes               |
+-----------------------------+-----------------------+-------------------+
| Linux x86-64 (desktop) [#]_ | Java, C++, Python, C# | Yes               |
+-----------------------------+-----------------------+-------------------+
| Linux ARM32 and ARM64 [#]_  | Java, C++, Python, C# | Yes               |
+-----------------------------+-----------------------+-------------------+
| macOS                       | Java, C++, Python     | No                |
+-----------------------------+-----------------------+-------------------+

.. [#] Supported Linux x86-64 (desktop) targets:

   - Ubuntu 22.04 or newer
   - Debian Bullseye or newer

.. [#] Supported ARM32 and ARM64 targets:

   - Raspberry Pi
   - NVIDIA Jetson
   - Ubuntu 20.04 or newer
   - Debian Bullseye or newer
