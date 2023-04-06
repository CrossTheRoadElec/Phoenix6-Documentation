Phoenix Pro Documentation
=========================

Welcome to the Phoenix Pro documentation. Individuals looking for the `Phoenix 5` documentation may locate them `here <https://docs.ctre-phoenix.com/en/stable/>`__.

The Phoenix Pro software framework allows you to control and configure your `CTR Electronics <https://store.ctr-electronics.com/>`__ Phoenix Pro Devices. Phoenix Pro represents a complete rewrite of the software framework over the existing Phoenix 5 framework. With Phoenix Pro, users have access to many new features that expand the control the user has over their device.

.. note:: A changelog containing API, Tuner and Firmware changes is available `here <https://api.ctr-electronics.com/changelog>`__ and a migration guide is available :doc:`here </docs/api-reference/api-usage/migration-guide/index>`.

Why Phoenix Pro?
----------------

Phoenix Pro currently offers the following features and will further expand:

* :ref:`Time Synchronization <docs/api-reference/api-usage/status-signals:canivore timesync>`

  - Using time synchronization (when using CANivore), users can accurately determine when a signal was measured and react synchronously.

* Canonical Units

  - Uses the popular `Units <https://github.com/nholthaus/units>`__ library for C++ and standardizes on SI units.

* :doc:`Comprehensive API </docs/api-reference/api-usage/index>`

  - Get API calls return a StatusSignalValue object that contain methods to refresh, wait for new data, and get the timestamp of the signal.
  - Control API is performed with request-specific control objects to reduce the parameter count while maintaining clarity on what the request does.

* Improved device control

  - New control modes such as FOC (`velocity-based <https://en.wikipedia.org/wiki/Vector_control_(motor)>`__ control) to take advantage of ~15% increased peak power.
  - Kalman based algorithms for velocity smoothing

.. card:: CTR Electronics Blog
   :link: https://store.ctr-electronics.com/blog/

   For news and updates about your CTR Electronics device, please see the `blog <https://store.ctr-electronics.com/blog/>`__

.. grid:: 1 2 3 3
   :gutter: 3

   .. grid-item-card:: :octicon:`paintbrush` Installation
      :link: docs/installation/pro-installation
      :link-type: doc

      Installation instructions for Phoenix API & Tuner.

   .. grid-item-card:: :octicon:`graph` Phoenix Tuner
      :link: docs/tuner/index
      :link-type: doc

      Documentation that introduces the companion application to manage your CTR Electronics devices.

   .. grid-item-card:: :octicon:`rocket` Hardware Reference
      :link: docs/hardware-reference/index
      :link-type: doc

      Documentation for device specific configuration, troubleshooting and setup instructions.

   .. grid-item-card:: :octicon:`rocket` API Reference
      :link: docs/api-reference/index
      :link-type: doc

      Documentation and details on using the CTR Electronics device API. This includes usage of signals, configs, control requests, etc.

   .. grid-item-card:: :octicon:`git-pull-request` Examples
      :link: docs/api-reference/examples/index
      :link-type: doc

      Software API examples for controlling your devices.

   .. grid-item-card:: :octicon:`light-bulb` Troubleshooting
      :link: /docs/troubleshooting/index
      :link-type: doc

      Common troubleshooting for hardware or software problems.

.. toctree::
   :maxdepth: 1
   :caption: Getting Started
   :hidden:

   docs/installation/pro-installation
   docs/installation/configuring-your-device

.. toctree::
   :maxdepth: 1
   :caption: Licensing
   :hidden:

   docs/licensing/licensing

.. toctree::
   :maxdepth: 1
   :caption: Phoenix Tuner
   :hidden:

   docs/tuner/index

.. toctree::
   :maxdepth: 1
   :caption: Hardware Reference
   :hidden:

   docs/hardware-reference/talonfx/index
   docs/hardware-reference/pigeon2/index
   docs/hardware-reference/cancoder/index

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: API Reference

   docs/api-reference/api-usage/index
   docs/api-reference/simulation/index
   docs/api-reference/wpilib-integration/index
   docs/api-reference/examples/index

.. toctree::
   :maxdepth: 1
   :caption: CANivore
   :hidden:

   docs/canivore/canivore-intro
   docs/canivore/canivore-setup
   docs/canivore/canivore-hardware-attached
   docs/canivore/canivore-config

.. toctree::
   :maxdepth: 1
   :caption: API docs
   :hidden:

   Java API Docs <https://api.ctr-electronics.com/phoenixpro/release/java/>
   C++ API Docs <https://api.ctr-electronics.com/phoenixpro/release/cpp/>

.. toctree::
   :maxdepth: 1
   :caption: Support
   :hidden:

   docs/troubleshooting/index
   docs/support
