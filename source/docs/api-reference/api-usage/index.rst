:orphan:

API Usage
=========

This section serves to provide basic API usage for the Phoenix Pro API. For full details, please visit the API docs (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/>`__).

.. important:: While Phoenix Pro and Phoenix 5 devices may exist on the same CAN bus and same robot project, each robot project **must** use the API tied to the device firmware version.
   This means Phoenix 5 devices **must** use the Phoenix 5 API, and Phoenix Pro devices **must** use the Phoenix Pro API.

There are three major components to the Phoenix Pro API:

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

- :doc:`api-overview`
   - Details a high level overview of what makes up the Phoenix Pro API.

- :doc:`configuration`
   - Describes configuring device configs via code.

- :doc:`control-requests`
   - Highlights using control requests to control the open and closed loop functionality of actuators such as the TalonFX.

- :doc:`status-signals`
   - Details using status signals to retrieve sensor data from devices.

- :doc:`faults`
   - Documents how faults are used to indicate device hardware status.

- :doc:`enabling-actuators`
   - Information on the FRC Lock safety feature and enabling actuators.

- :doc:`actuator-limits`
   - Documents how to retrieve and configure software and hardware actuator limits.

- :doc:`device-specific/index`
   - Describes some device specific functionality, such as the different TalonFX control requests and how they are used.

- :doc:`migration-guide`
   - A "cheat sheet" on migrating from Phoenix 5 to Phoenix Pro.

.. toctree::
   :maxdepth: 1
   :hidden:

   api-overview
   configuration
   control-requests
   status-signals
   faults
   enabling-actuators
   actuator-limits
   device-specific/index
   migration-guide
