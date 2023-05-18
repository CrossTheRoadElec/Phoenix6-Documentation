MotorController Integration
===========================

Phoenix 6 motor controller classes such as ``TalonFX`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/hardware/TalonFX.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1hardware_1_1_talon_f_x.html>`__) implement the ``MotorController`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/motorcontrol/MotorController.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_motor_controller.html>`__) interface. This allows Phoenix 6 motor controllers to be used in WPILib drivetrain classes such as ``DifferentialDrive``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // instantiate motor controllers
         TalonFX m_motorLeft = new TalonFX(0);
         TalonFX m_motorRight = new TalonFX(1);

         // create differentialdrive object for robot control
         DifferentialDrive m_diffDrive = new DifferentialDrive(m_motorLeft, m_motorRight);

         // instantiate joystick
         XboxController m_driverJoy = new XboxController(0);

         public void teleopPeriodic() {
            var forward = -m_driverJoy.getLeftY();
            var rot = -m_driverJoy.getRightX();

            m_diffDrive.arcadeDrive(forward, rot);
         }

   .. tab-item:: C++ (Source)
      :sync: C++

      .. code-block:: cpp

         void Robot::TeleopPeriodic() {
            auto forward = -m_driverJoy.GetLeftY();
            auto rot = -m_driverJoy.GetRightX();

            m_diffDrive.ArcadeDrive(forward, rot);
         }

   .. tab-item:: C++ (Header)
      :sync: C++ Header

      .. code-block:: cpp

         // instantiate motor controllers
         hardware::TalonFX m_motorLeft{0};
         hardware::TalonFX m_motorRight{1};

         // create differentialdrive object for robot control
         frc::DifferentialDrive m_diffDrive{m_motorLeft, m_motorRight};

         // instantiate joystick
         frc::XboxController m_driverJoy{0};

Motor Safety
------------

CTR Electronics supported actuators implement WPILib `Motor Safety <https://docs.wpilib.org/en/stable/docs/software/hardware-apis/motors/wpi-drive-classes.html#motor-safety>`__. In additional to the normal :doc:`enable signal </docs/api-reference/api-usage/enabling-actuators>` of CTR Electronics actuators, Motor Safety will automatically disable the device according to the WPILib Motor Safety implementation.

Simulation
----------

It's recommended that users set supply voltage to ``getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_controller.html#a4b1e42e825583c82664a4ecc5d81b83f>`__) to take advantage of WPILib's ``BatterySim`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/simulation/BatterySim.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1sim_1_1_battery_sim.html>`__) API. Additionally, the simulated device state is shown in the simulation :guilabel:`Other Devices` menu.

.. image:: images/simulation-preview.png
   :width: 300
   :alt: Simulation other devices menu
