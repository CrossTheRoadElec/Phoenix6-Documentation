Open-Loop Control
=================

Open-Loop control typically refers to directly controlling device output.

There are open-loop control requests for all TalonFX control output types. With the exception of FOC-only control requests, all open-loop control requests follow the naming pattern ``{ControlOutputType}Out``. For example, the open-loop Voltage control request is called ``VoltageOut``. FOC-only control requests follow the naming pattern ``{ControlOutputType}``.

In the below example, note that devices are initialized with two arguments. These arguments correspond to :ref:`the device ID <docs/tuner/device-details-page:configuring name & ids>` and CAN bus name. For CANivore, this is the name of the CANivore as configured in :doc:`/docs/tuner/index`. For more information, see the :doc:`CANivore API </docs/canivore/canivore-api>` documentation.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // initialize devices on the rio can bus
         final TalonFX m_leftLeader = new TalonFX(0, CANBus.roboRIO());
         final TalonFX m_rightLeader = new TalonFX(1, CANBus.roboRIO());

         // users should reuse control requests when possible
         final DutyCycleOut m_leftRequest = new DutyCycleOut(0.0);
         final DutyCycleOut m_rightRequest = new DutyCycleOut(0.0);

         // retrieve joystick inputs
         var forward = -m_driverJoy.getLeftY();
         var turn = m_driverJoy.getRightX();

         // calculate motor outputs, utilizes a "arcade" style of driving;
         // where left Y controls forward and right X controls rotation/turn
         var leftOut = forward + turn;
         var rightOut = forward - turn;

         // set request to motor controller
         m_leftLeader.setControl(m_leftRequest.withOutput(leftOut));
         m_rightLeader.setControl(m_rightRequest.withOutput(rightOut));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // initialize devices on the rio can bus
         hardware::TalonFX m_leftLeader{0, CANBus.roboRIO()};
         hardware::TalonFX m_rightLeader{1, CANBus.roboRIO()};

         // users should reuse control requests when possible
         controls::DutyCycleOut m_leftRequest{0.0};
         controls::DutyCycleOut m_rightRequest{0.0};

         // retrieve joystick inputs
         auto forward = -m_driverJoy.GetLeftY();
         auto turn = m_driverJoy.GetRightX();

         // calculate motor outputs, utilizes a "arcade" style of driving;
         // where left Y controls forward and right X controls rotation/turn
         auto leftOut = forward + turn;
         auto rightOut = forward - turn;

         // set request to motor controller
         m_leftLeader.SetControl(m_leftRequest.WithOutput(leftOut));
         m_rightLeader.SetControl(m_rightRequest.WithOutput(rightOut));

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # initialize devices on the rio can bus
         self.left_leader = hardware.TalonFX(0, CANBus.roboRIO())
         self.right_leader = hardware.TalonFX(1, CANBus.roboRIO())

         # users should reuse control requests when possible
         self.left_request = controls.DutyCycleOut(0.0)
         self.right_request = controls.DutyCycleOut(0.0)

         # retrieve joystick inputs
         forward = -self.driver_joy.getLeftY()
         turn = self.driver_joy.getRightX()

         # calculate motor outputs, utilizes a "arcade" style of driving
         # where left Y controls forward and right X controls rotation/turn
         left_out = forward + turn
         right_out = forward - turn

         # set request to motor controllers
         self.left_leader.set_control(self.left_request.with_output(left_out))
         self.right_leader.set_control(self.right_request.with_output(right_out))
