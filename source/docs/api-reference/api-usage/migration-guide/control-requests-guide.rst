Control Requests
================

Phoenix Pro provides an extensive list of flexible control modes through the use of strongly-typed control requests.

Using Control Requests
----------------------

**Phoenix 5**

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // robot init, set voltage compensation to 12 V
         m_motor.configVoltageComSaturation(12);
         m_motor.enableVoltageCompensation(true);

         // main robot code, command 12 V output
         m_motor.set(ControlMode.PercentOutput, 1.0);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // robot init, set voltage compensation to 12 V
         m_motor.ConfigVoltageComSaturation(12);
         m_motor.EnableVoltageCompensation(true);

         // main robot code, command 12 V output
         m_motor.Set(ControlMode::PercentOutput, 1.0);

**Phoenix Pro**

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // class member variable
         VoltageOut m_request = new VoltageOut(0);

         // main robot code, command 12 V output
         m_motor.setControl(m_request.withOutput(12.0));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // class member variable
         controls::VoltageOut m_request{0_V};

         // main robot code, command 12 V output
         m_motor.SetControl(m_request.WithOutput(12_V));

Control Types
-------------

In Phoenix Pro, voltage compensation has been replaced with the ability to directly specify the :ref:`control output type <docs/api-reference/api-usage/device-specific/talonfx/talonfx-control-intro:control output types>`.

All control output types are supported in open-loop and closed-loop control requests.

.. list-table:: Open-loop Control Requests
   :header-rows: 1

   * - Phoenix 5
     - Phoenix Pro

   * - PercentOutput
     - DutyCycleOut

   * - PercentOutput + Voltage Compensation
     - VoltageOut

   * - Phoenix 5 does not support torque control
     - TorqueCurrentFOC

   * - Current closed-loop
     - This has been removed in Phoenix Pro.

       - Users looking to control torque should use TorqueCurrentFOC
       - Users looking to limit current should use supply and stator current limits

.. list-table:: Closed-loop Control Requests
   :header-rows: 1

   * - Phoenix 5
     - Phoenix Pro

   * - Position
     - PositionDutyCycle

   * - Velocity
     - VelocityDutyCycle

   * - MotionMagic
     - MotionMagicDutyCycle

   * - Closed-loop + Voltage Compensation
     - {ClosedLoop}Voltage

   * - External Closed-loop + Torque control (not supported in Phoenix 5)
     - {ClosedLoop}TorqueCurrentFOC
