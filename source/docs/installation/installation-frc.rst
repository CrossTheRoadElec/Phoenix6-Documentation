:orphan:

Installing Phoenix 6 (FRC)
==========================

Offline
^^^^^^^

.. important:: Users on non-Windows devices should skip to the :ref:`Online <docs/installation/installation:online>` installation instructions.

1. Download the `Phoenix Framework Installer <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__
2. Navigate through the installer, ensuring applicable options are selected

.. image:: images/framework-installer.png
   :width: 70%
   :alt: Showing the installation screen root

3. Apply the vendordep via WPILib VS Code `Adding Offline Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#installing-libraries>`__

.. note:: The Python and C# APIs can only be installed online. See :ref:`docs/installation/installation:installing additional languages` for more information.

Online
^^^^^^

Users in FRC can install Phoenix without an installer using WPILib's `Install New Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#libraries>`__ functionality in VS Code. This requires the user to have an installation of WPILib on their machine.

To begin, open WPILib VS Code and click on the WPILib icon in the top right.

.. image:: images/wpilib-icon-location.png
   :width: 250
   :alt: WPILib icon is located in the top right of VS Code

Then type :guilabel:`Manage Vendor Libraries` and click on the menu option that appears. Click :guilabel:`Install new libraries (online)` and a textbox should appear. Follow the remaining instructions below on pasting the correct link into the textbox.

.. tab-set::

   .. tab-item:: FRC (v6 Only)

      .. important:: This vendordep is for robot projects that are **only** using devices with Phoenix 6 firmware.

      Paste the following URL in WPILib VS Code :guilabel:`Install new libraries (online)`:

      - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-frc2023-latest.json``

   .. tab-item:: FRC (v6 & Phoenix 5)

      .. important:: This vendordep is for robot projects that are using **both** Phoenix 6 devices & Phoenix 5 devices.

      Paste the following URL in WPILib VS Code :guilabel:`Install new libraries (online)`:

      - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6And5-frc2023-latest.json``

      .. important:: Devices on Phoenix 6 firmware **must** use the Phoenix 6 API. Device on Phoenix 5 firmware **must** use the Phoenix 5 API.

   .. tab-item:: non-FRC (Linux)

      Phoenix 6 is distributed through our APT repository. Begin with adding the repository to your APT sources.

      .. code-block:: bash

         sudo curl -s --compressed -o /usr/share/keyrings/ctr-pubkey.gpg "https://deb.ctr-electronics.com/ctr-pubkey.gpg"
         sudo curl -s --compressed -o /etc/apt/sources.list.d/ctr<year>.list "https://deb.ctr-electronics.com/ctr<year>.list"

      .. note:: ``<year>`` should be replaced with the year of Phoenix 6 software for which you have purchased licenses.

      After adding the sources, Phoenix 6 can be installed and updated using the following:

      .. code-block:: bash

         sudo apt update
         sudo apt install phoenix-pro

      Additional information for non-FRC users is available in :doc:`/docs/installation/non-frc-checklist`.

      .. tip:: To get a robot application up and running quickly, check out our `non-FRC Linux example <https://github.com/CrossTheRoadElec/PhoenixPro-Linux-Example>`__.

Installing Additional Languages
-------------------------------

Python and C# require additional installation steps.

.. note:: Installation for Python and C# are only required if the user wants to use those languages. Otherwise, the below steps can be skipped.

Python
^^^^^^

Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

.. code-block:: bash

   python3 -m pip install phoenix-6

C# (non-FRC only)
^^^^^^^^^^^^^^^^^

Installation is available through `Nuget <https://www.nuget.org/packages/Phoenix6/>`__.  An example on adding nuget packages to a Visual Studio project is available in the `Microsoft Quickstart <https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-in-visual-studio>`__.

Tuner X Installation
--------------------

Phoenix Tuner X is a modern version of the legacy Phoenix Tuner v1 application that is used to configure CTRE Phoenix CAN devices.

Phoenix Tuner X is supported on Android, Windows 10 (build 1903+), and Windows 11. Installation is available from the respective OS stores.

- Windows: https://apps.microsoft.com/store/detail/phoenix-tuner/9NVV4PWDW27Z
- Android: https://play.google.com/store/apps/details?id=com.ctre.phoenix_tuner

.. toctree::
   :maxdepth: 1
   :hidden:

   non-frc-checklist
