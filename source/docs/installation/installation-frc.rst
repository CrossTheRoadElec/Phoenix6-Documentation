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

            - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-frc2025-beta-latest.json``

            Alternatively, the Hoot Replay version of the vendordep can be installed:

            - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-replay-frc2025-beta-latest.json``

            Additionally, v5 can safely installed alongside it by installing the v5 vendordep.

            - ``https://maven.ctr-electronics.com/release/com/ctre/phoenix/Phoenix5-frc2025-beta-latest.json``

            .. important:: Users utilizing only v5 devices still need the v6 vendordep added to their robot project.

   .. tab-item:: Python

      First, make sure to `install RobotPy <https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/python-setup.html>`__. From there, installation of Phoenix 6 is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         py -3 -m pip install phoenix6

   .. tab-item:: LabVIEW

      Download the Phoenix Offline Installer from the `Latest GitHub Release <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__, and install it on the computer (with the LabVIEW component checked). This will put the Phoenix LabVIEW VIs into the "WPI Robotics Library -> Third Party -> CTRE" pallette for LabVIEW development.

      To deploy robot projects with Phoenix, you need to first download the Phoenix Libraries to the roboRIO. This can be done one of two ways:

      1. Phoenix Tuner X under "Settings -> FRC Advanced -> Install LabVIEW"
      2. LabVIEW under "Tools -> FIRST Robotics Tools -> Download CTRE Phoenix Libs".

      After the libraries are downloaded, hard deploy (run as startup) a LabVIEW program and restart the roboRIO.

      .. note:: Currently only Phoenix 5 is supported in LabVIEW. A Phoenix 6 LabVIEW alpha is in development, teams that are interested in this may contact us directly at support@ctr-electronics.com.
