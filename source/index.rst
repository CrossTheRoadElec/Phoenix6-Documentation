Phoenix 6 Documentation
=======================

Welcome to the Phoenix 6 documentation. Individuals looking for `Phoenix 5` documentation may locate it `here <https://docs.ctre-phoenix.com/en/stable/>`__.

The Phoenix 6 software framework allows you to control and configure your `CTR Electronics <https://store.ctr-electronics.com/>`__ Phoenix 6 Devices. Phoenix 6 represents a complete rewrite of the software framework over the existing Phoenix 5 framework. With Phoenix 6, users have access to many new features that expand the control the user has over their devices.

.. card:: CTR Electronics Blog
   :link: https://store.ctr-electronics.com/blog/

   For news and updates about your CTR Electronics device, please check out our `blog <https://store.ctr-electronics.com/blog/>`__.

.. grid:: 1 2 2 2
   :gutter: 3

   .. grid-item-card:: New for 2024
      :link: docs/yearly-changes/yearly-changelog
      :link-type: doc

      What's new in Phoenix 6 for 2024. A full changelog with bug fixes is available `here <https://api.ctr-electronics.com/changelog>`__.

   .. grid-item-card:: Migration Guide
      :link: docs/migration/migration-guide/index
      :link-type: doc

      A Phoenix 5 migration guide is available :doc:`here </docs/migration/migration-guide/index>`.

.. grid:: 1 2 3 3
   :gutter: 3

   .. grid-item-card:: :octicon:`paintbrush` Installation
      :link: docs/installation/installation
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

   docs/installation/installation
   docs/installation/running-diagnostics
   docs/installation/configuring-your-device
   docs/yearly-changes/yearly-changelog

.. toctree::
   :maxdepth: 1
   :caption: Migration
   :hidden:

   docs/migration/new-to-phoenix
   docs/migration/migration-guide/index
   docs/migration/canbus-utilization

.. toctree::
   :maxdepth: 1
   :caption: Licensing
   :hidden:

   docs/licensing/licensing
   docs/licensing/team-licensing

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
   docs/api-reference/device-specific/index
   docs/api-reference/simulation/index
   docs/api-reference/wpilib-integration/index
   docs/api-reference/examples/index

.. toctree::
   :maxdepth: 1
   :caption: CANivore
   :hidden:

   docs/canivore/canivore-intro
   docs/canivore/canivore-setup
   docs/canivore/canivore-api
   docs/canivore/canivore-hardware-attached
   docs/canivore/canivore-config

.. toctree::
   :maxdepth: 1
   :caption: API docs
   :hidden:

   Java API Docs <https://api.ctr-electronics.com/phoenix6/release/java/>
   C++ API Docs <https://api.ctr-electronics.com/phoenix6/release/cpp/>
   Python API Docs <https://api.ctr-electronics.com/phoenix6/release/python/>
   C# API Docs <https://api.ctr-electronics.com/phoenix6/release/csharp/>

.. toctree::
   :maxdepth: 1
   :caption: Application Notes
   :hidden:

   docs/application-notes/devblog

.. toctree::
   :maxdepth: 1
   :caption: Support
   :hidden:

   docs/troubleshooting/index
   docs/support
