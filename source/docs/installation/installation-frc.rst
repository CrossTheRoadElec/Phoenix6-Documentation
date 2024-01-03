:orphan:

Installing Phoenix 6 (FRC)
==========================

.. tab-set::

   .. tab-item:: Java/C++

      .. tab-set::

         .. tab-item:: Offline

            1. Download the `Phoenix Framework Installer <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__
            2. Navigate through the installer, ensuring applicable options are selected

            .. image:: images/framework-installer.png
               :width: 70%
               :alt: Showing the installation screen root

            3. Apply the vendordep via WPILib VS Code `Adding Offline Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#installing-libraries>`__

         .. tab-item:: Online

            Users can install Phoenix without an installer using WPILib's `Install New Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#libraries>`__ functionality in VS Code. This requires the user to have an installation of WPILib on their machine.

            To begin, open WPILib VS Code and click on the WPILib icon in the top right.

            .. image:: images/wpilib-icon-location.png
               :width: 250
               :alt: WPILib icon is located in the top right of VS Code

            Then type :guilabel:`Manage Vendor Libraries` and click on the menu option that appears. Click :guilabel:`Install new libraries (online)` and a textbox should appear. Follow the remaining instructions below on pasting the correct link into the textbox.

            Paste the following URL in WPILib VS Code :guilabel:`Install new libraries (online)`:

            - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-frc2024-beta-latest.json``

            Additionally, v5 can safely installed alongside it by installing the v5 vendordep.

            - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix/Phoenix5-frc2024-beta-latest.json``

            .. important:: Users utilizing only v5 devices still need the v6 vendordep added to their robot project.

   .. tab-item:: Python

      Installation is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         python3 -m pip install phoenix-6