:orphan:

Installing Phoenix 6 (FRC)
==========================

Offline
^^^^^^^

.. important:: Users on non-Windows devices should skip to the :ref:`Online <docs/installation/installation-frc:online>` installation instructions.

1. Download the `Phoenix Framework Installer <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__
2. Navigate through the installer, ensuring applicable options are selected

.. image:: images/framework-installer.png
   :width: 70%
   :alt: Showing the installation screen root

3. Apply the vendordep via WPILib VS Code `Adding Offline Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#installing-libraries>`__

.. note:: The Python APIs can only be installed online. See :ref:`docs/installation/installation-frc:installing additional languages` for more information.

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

Installing Additional Languages
-------------------------------

Python and C# require additional installation steps.

.. note:: Installation for Python and C# are only required if the user wants to use those languages. Otherwise, the below steps can be skipped.

Python
^^^^^^

Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

.. code-block:: bash

   python3 -m pip install phoenix-6
