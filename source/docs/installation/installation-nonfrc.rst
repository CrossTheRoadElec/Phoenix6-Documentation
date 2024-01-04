Installing Phoenix 6 (non-FRC)
==============================

.. important:: Users in FRC can skip this article.

Phoenix 6 is fully supported outside of `FRC <https://en.wikipedia.org/wiki/FIRST_Robotics_Competition>`__ on :ref:`supported <docs/installation/requirements:system requirements>` systems with a USB to CAN adapter.

.. note:: `CANivore <https://store.ctr-electronics.com/canivore/>`__ is the recommended USB to CAN adapter with support for `CAN FD <https://store.ctr-electronics.com/can-fd/>`__, name specification, and Windows (as host).

Installation
------------

API Installation
^^^^^^^^^^^^^^^^

.. tab-set::

   .. tab-item:: C++ (Linux)

      Phoenix 6 is distributed through our APT repository. Begin with adding the repository to your APT sources.

      .. code-block:: bash

         YEAR=<year>
         sudo curl -s --compressed -o /usr/share/keyrings/ctr-pubkey.gpg "https://deb.ctr-electronics.com/ctr-pubkey.gpg"
         sudo curl -s --compressed -o /etc/apt/sources.list.d/ctr${YEAR}.list "https://deb.ctr-electronics.com/ctr${YEAR}.list"

      .. note:: ``<year>`` should be replaced with the year of Phoenix 6 software for which you have purchased licenses.

      After adding the sources, Phoenix 6 can be installed and updated using the following:

      .. code-block:: bash

         sudo apt update
         sudo apt install phoenix6

      .. tip:: To get a robot application up and running quickly, check out our `non-FRC Linux example <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

   .. tab-item:: Python

      Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         py -3 -m pip install phoenix6

   .. tab-item:: C# (Windows)

      Installation is available through `Nuget <https://www.nuget.org/packages/Phoenix6/>`__.  An example on adding Nuget packages to a Visual Studio project is available in the `Microsoft Quickstart <https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio>`__.

Firmware Installation
^^^^^^^^^^^^^^^^^^^^^

Device firmware upgrading is handled by the :doc:`/docs/tuner/index` configuration client.

Examples
--------

The same Phoenix 6 examples can be used as a reference outside of FRC. The function calls are identical, although the framework that is used to call them may be different and specialized for FRC.

Non FRC Projects
----------------

We recommend that users use the standard language projects to use our library outside of FRC. For example, a typical Python project will have a ``main.py`` that utilizes the ``phoenix6`` library that's installed with ``pip``.

A typical C# project is a `Visual Studio <https://visualstudio.microsoft.com/>`__ project that includes our libraries via nuget.

For C++, an example utilizing CMake is provided `here <https://github.com/CrossTheRoadElec/Phoenix6-Linux-Example>`__.

.. note:: When utilizing actuators outside of FRC, the user must continuously feed an enable signal to the device. For more information, see :ref:`Enabling Actuators <docs/api-reference/api-usage/enabling-actuators:non-frc applications>`.

Alternative Support
-------------------

In the event that the Phoenix 6 API does not fit the user's needs (e.g. when using devices such as a `TalonSRX <https://store.ctr-electronics.com/talon-srx/>`__), users can utilize the `Phoenix 5 API <https://v5.docs.ctr-electronics.com/>`__.

We also provide a hardware robot controller called the `HERO development board <https://store.ctr-electronics.com/hero-development-board/>`__. The HERO can be programmed in C# to utilize `compatible <https://v5.docs.ctr-electronics.com/en/stable/ch04_DoINeedThis.html#do-i-need-to-install-any-of-this>`__ **v5** devices.
