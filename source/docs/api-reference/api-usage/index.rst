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

.. mimictoc::
   :maxdepth: 1

   api-overview
   configuration
   control-requests
   status-signals
   faults
   talonfx-control-requests/index
   enabling-actuators
   migration-guide
