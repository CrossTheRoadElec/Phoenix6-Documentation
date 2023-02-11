Introduction to Simulation
==========================

Supported Devices
-----------------

Currently, all Phoenix Pro devices are supported in simulation.

.. warning:: **Multiple** CAN buses using the :ref:`CANivore API <docs/canivore/canivore-setup:canivore api>` is not supported at this time. All CAN devices will **appear on the same CAN bus**. If you wish to run your robot code in simulation, ensure devices have **unique IDs across CAN buses**.

Simulation API
--------------

Each supported device has a device-specific ``SimState`` object that can be used to manage I/O with the simulated device. The object can be retrieved by calling ``getSimState()`` on an instance of a device.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var talonFXSim = m_talonFX.getSimState();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& talonFXSim = m_talonFX.GetSimState();

.. note:: Phoenix Pro utilizes the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ when applicable.

Orientation
^^^^^^^^^^^

The ``SimState`` API ignores typical device invert settings, as the user may change invert for any reason (such as flipping which direction is forward for a drivebase). As a result, for some devices, the ``SimState`` object supports specifying the orientation of the device relative to the robot chassis (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/sim/TalonFXSimState.html#Orientation>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1sim_1_1_talon_f_x_sim_state.html#accd9e74b59931e43563f26ce44c68890>`__).

This orientation represents the **mechanical** linkage between the device and the robot chassis. It **should not be changed with runtime invert**, as runtime invert specifies the *logical* orientation of the device. Rather, the orientation should **only be modified when the mechanical linkage itself changes**, such as when switching between two gearboxes inverted from each other.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var leftTalonFXSim = m_leftTalonFX.getSimState();
         var rightTalonFXSim = m_rightTalonFX.getSimState();

         // left drivetrain motors are typically CCW+
         leftTalonFXSim.Orientation = ChassisReference.CounterClockwise_Positive;

         // right drivetrain motors are typically CW+
         rightTalonFXSim.Orientation = ChassisReference.Clockwise_Positive;

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         auto& leftTalonFXSim = m_leftTalonFX.GetSimState();
         auto& rightTalonFXSim = m_rightTalonFX.GetSimState();

         // left drivetrain motors are typically CCW+
         leftTalonFXSim.Orientation = sim::ChassisReference::CounterClockwise_Positive;

         // right drivetrain motors are typically CW+
         rightTalonFXSim.Orientation = sim::ChassisReference::Clockwise_Positive;

Inputs and Outputs
^^^^^^^^^^^^^^^^^^

All ``SimState`` objects contain multiple inputs to manipulate the state of the device based on simulation physics calculations. For example, all device ``SimState`` objects have a supply voltage input:

.. important::  Non-FRC platforms are required to set supply voltage, as it affects simulation calculations. It's recommended that FRC users set supply voltage to ``getBatteryVoltage()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotController.html#getBatteryVoltage()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_controller.html#a4b1e42e825583c82664a4ecc5d81b83f>`__) to take advantage of WPILib's ``BatterySim`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/simulation/BatterySim.html>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1sim_1_1_battery_sim.html>`__) API.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // set the supply voltage of the TalonFX to 12 V
         m_talonFXSim.setSupplyVoltage(12);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // set the supply voltage of the TalonFX to 12 V
         m_talonFXSim.SetSupplyVoltage(12_V);

Some device ``SimState`` objects also contain outputs that can be used in simulation physics calculations. For example, the ``TalonFXSimState`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/sim/TalonFXSimState.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1sim_1_1_talon_f_x_sim_state.html>`__) object has a motor voltage output that can be used to calculate position and velocity:

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // get the motor voltage of the TalonFX
         var motorVoltage = m_talonFXSim.getMotorVoltage();

         // use the motor voltage to calculate new position and velocity using an external MotorSimModel class
         m_motorSimModel.setMotorVoltage(motorVoltage);
         m_motorSimModel.update(0.020); // assume 20 ms loop time

         // apply the new rotor position and velocity to the TalonFX
         m_talonFXSim.setRawRotorPosition(m_motorSimModel.getPosition());
         m_talonFXSim.setRotorVelocity(m_motorSimModel.getVelocity());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // get the motor voltage of the TalonFX
         auto motorVoltage = m_talonFXSim.GetMotorVoltage();

         // use the motor voltage to calculate new position and velocity using an external MotorSimModel class
         m_motorSimModel.SetMotorVoltage(motorVoltage);
         m_motorSimModel.Update(20_ms); // assume 20 ms loop time

         // apply the new rotor position and velocity to the TalonFX
         m_talonFXSim.SetRawRotorPosition(m_motorSimModel.GetPosition());
         m_talonFXSim.SetRotorVelocity(m_motorSimModel.GetVelocity());

High Fidelity CAN Bus Simulation
--------------------------------

Many popular CTR Electronics CAN devices support high fidelity simulation, where the influence of CAN bus is simulated at a level similar to what happens on a real robot. This means that timing behavior of control and status signals in simulation will align to the same framing intervals seen on a real CAN bus.  In simulation this may appear as a delay between setting a signal and getting its real value or setting its real value and getting it in API.

The update rate can be modified for simulation by wrapping the :ref:`signal's frequency <docs/api-reference/api-usage/status-signals:changing update frequency>` in a ``RobotBase.isSimulation()`` (`Java <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/wpilibj/RobotBase.html#isSimulation()>`__, `C++ <https://github.wpilib.org/allwpilib/docs/release/cpp/classfrc_1_1_robot_base.html#a307a770aa58d89e1f1cc8e7970cceb84>`__) condition.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         if (RobotBase.isSimulation()) {
            m_velocitySignal.setUpdateFrequency(1000); // set update rate to 1ms
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         if (RobotBase::IsSimulation()) {
            m_velocitySignal.SetUpdateFrequency(1000_Hz); // set update rate to 1ms
         }
