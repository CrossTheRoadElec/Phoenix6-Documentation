CAN Bus Utilization
===================

CTR-Electronics goes through great efforts to make our products efficient on CAN Bus bandwidth. This article highlights the average default bandwidth utilization of supported Phoenix 6 devices. Users should keep total CAN Bus utilization below 90% to prevent any unexpected behavior. Information on changing the default CAN update frequency is available in the :ref:`API documentation <docs/api-reference/api-usage/status-signals:changing update frequency>`.

.. note:: Using Phoenix API will automatically start up a diagnostics server which adds a constant 0-5% total CAN Bus utilization.

.. list-table::
   :widths: 25 25 25 25 25
   :header-rows: 1

   * - Device
     - Phoenix 5 (CAN 2.0)
     - Phoenix 6 (CAN 2.0)
     - Phoenix 5 (CAN FD)
     - Phoenix 6 (CAN FD)
   * - .. centered:: Talon FX
     - 4.7%
     - 4.1%
     - 2.0%
     - 1.8%
   * - .. centered:: CANcoder
     - 1.8%
     - 1.7%
     - 0.9%
     - 0.9%
   * - .. centered:: Pigeon 2
     - 5.5%
     - 3.1%
     - 2.5%
     - 1.3%
