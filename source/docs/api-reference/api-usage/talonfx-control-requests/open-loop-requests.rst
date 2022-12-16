Open-Loop Control
=================

Open-Loop control typically refers to directly controlling device output.

There are open-loop control requests for all TalonFX control output types. With the exception of FOC-only control requests, all open-loop control requests follow the naming pattern ``{ControlOutputType}Out``. For example, the open-loop Voltage control request is called ``VoltageOut``. FOC-only control requests follow the naming pattern ``{ControlOutputType}``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // users should reuse control requests when possible
         var leftRequest = new DutyCycleOut(0.0);
         var rightRequest = new DutyCycleOut(0.0);

         // retrieve joystick inputs
         var forward = -m_driverJoy.getLeftY();
         var turn = m_driverJoy.getRightX();

         // calculate motor outputs, utilizes a "arcade" style of driving;
         // where left Y controls forward and right X controls rotation/turn
         var leftOut = forward + turn;
         var rightOut = forward - turn;

         // set request to motor controller
         m_leftLeader.setControl(leftRequest.withOutput(leftOut));
         m_rightLeader.setControl(rightRequest.withOutput(rightOut));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // users should reuse control requests when possible
         controls::DutyCycleOut leftRequest{0.0};
         controls::DutyCycleOut rightRequest{0.0};

         // retrieve joystick inputs
         auto forward = -m_driverJoy.GetLeftY();
         auto turn = m_driverJoy.GetRightX();

         // calculate motor outputs, utilizes a "arcade" style of driving;
         // where left Y controls forward and right X controls rotation/turn
         auto leftOut = forward + turn;
         auto rightOut = forward - turn;

         // set request to motor controller
         m_leftLeader.SetControl(leftRequest.WithOutput(leftOut));
         m_rightLeader.SetControl(rightRequest.WithOutput(rightOut));
