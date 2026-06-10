Installing Phoenix 6 (FRC)
==========================

.. tab-set::

   .. tab-item:: Java/C++

      .. tab-set::

         .. tab-item:: Offline

            1. Download the `Phoenix Offline Installer <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__
            2. Navigate through the installer, ensuring applicable options are selected

            .. image:: images/offline-installer.png
               :width: 70%
               :alt: Showing the installation screen root

            3. Apply the vendordep via WPILib VS Code `Adding Offline Libraries <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#installing-libraries>`__

         .. tab-item:: Online

            Users can install Phoenix without an installer using WPILib's `Vendor Dependencies <https://docs.wpilib.org/en/stable/docs/software/vscode-overview/3rd-party-libraries.html#installing-libraries>`__ functionality in VS Code. This requires the user to have an installation of WPILib on their machine.

            To begin, open WPILib VS Code and click on the WPILib icon in the left sidebar.

            .. image:: images/wpilib-vendordep-location.png
               :width: 450
               :alt: WPILib icon is located in the left sidebar of VS Code

            Then under the :guilabel:`Available Dependencies` dropdown, find :guilabel:`CTRE-Phoenix (v6)` and click :guilabel:`Install` to add the vendordep to the robot project. The vendordep can also be updated from this page by pressing the :guilabel:`To Latest` button.

            Additionally, v5 can safely installed alongside it by installing the :guilabel:`CTRE-Phoenix (v5)` vendordep.

            .. important:: Users utilizing only v5 devices still need the v6 vendordep added to their robot project.

            Alternatively, the Hoot Replay version of the vendordep can be installed using :guilabel:`CTRE-Phoenix Replay (v6)`, as well as the v5 Replay-compatible vendordep using :guilabel:`CTRE-Phoenix (v5) Replay Compatibility`.

   .. tab-item:: Python

      First, make sure to `install RobotPy <https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/python-setup.html>`__. From there, installation of Phoenix 6 is available through `PyPI <https://pypi.org/project/phoenix6/>`__.

      .. code-block:: bash

         python3 -m pip install phoenix6

   .. tab-item:: LabVIEW

      Download the Phoenix Offline Installer from the `Latest GitHub Release <https://github.com/CrossTheRoadElec/Phoenix-Releases/releases>`__, and install it on the computer (with the LabVIEW component checked). This will put the Phoenix LabVIEW VIs into the "WPI Robotics Library -> Third Party -> CTRE" pallette for LabVIEW development.

      To deploy robot projects with Phoenix, you need to first download the Phoenix Libraries to the roboRIO. This can be done one of two ways:

      1. Phoenix Tuner X under "Settings -> FRC Advanced -> Install LabVIEW"
      2. LabVIEW under "Tools -> FIRST Robotics Tools -> Download CTRE Phoenix Libs".

      After the libraries are downloaded, hard deploy (run as startup) a LabVIEW program and restart the roboRIO.
