General API Usage
=================

This section serves to provide general API usage for the Phoenix 6 API. For full details, please visit the API docs (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/>`__).

.. important:: While Phoenix 6 and Phoenix 5 devices may exist on the same CAN bus and same robot project, each robot project **must** use the API tied to the device firmware version.
   This means Phoenix 5 devices **must** use the Phoenix 5 API, and Phoenix 6 devices **must** use the Phoenix 6 API.

There are three major components to the Phoenix 6 API:

.. grid:: 1 2 3 3

   .. grid-item-card:: Configs
      :link-type: doc
      :link: configuration

      Configs represent a **persistent configuration** for a device. For example, closed-loop gains.

   .. grid-item-card:: Control Requests
      :link-type: doc
      :link: control-requests

      Control Requests represent the **output** of a device, typically a motor controller.

   .. grid-item-card:: Signals
      :link-type: doc
      :link: status-signals

      Signals represent **data retrieved** from a device. This can be velocity, position, yaw, pitch, roll, temperature, etc.

.. card:: TalonFX Quickstart
   :link-type: doc
   :link: /docs/api-reference/device-specific/talonfx/open-loop-requests

   Quickstart on controlling a TalonFX with open loop control requests and a Joystick.

- :doc:`api-overview`
   - Details a high level overview of what makes up the Phoenix 6 API.

- :doc:`configuration`
   - Describes configuring device configs via code.

- :doc:`control-requests`
   - Highlights using control requests to control the output of actuators such as the TalonFX.

- :doc:`status-signals`
   - Details using status signals to retrieve sensor data from devices.

- :doc:`signal-logging`
   - Information on the signal logging API used for capturing signal traffic on the bus.

- :doc:`faults`
   - Documents how faults are used to indicate device hardware status.

- :doc:`enabling-actuators`
   - Information on the FRC Lock safety feature and enabling actuators.

- :doc:`actuator-limits`
   - Documents how to retrieve and configure software and hardware actuator limits.

- :doc:`orchestra`
   - Information on playing music and sounds using the Orchestra API.

.. toctree::
   :maxdepth: 1
   :hidden:

   api-overview
   configuration
   control-requests
   status-signals
   signal-logging
   faults
   enabling-actuators
   actuator-limits
   orchestra
