Control Requests
================

Control Requests represent the **output** of a device. A list of control requests can be found in the API docs (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/package-summary.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/namespacectre_1_1phoenixpro_1_1controls.html>`__).

.. note:: Phoenix Pro utilizes the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ when applicable.

Applying a Control Request
--------------------------

Control requests can be applied by calling ``setControl()`` on the motor object. ``setControl()`` returns a ``StatusCode`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/StatusCode.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/_status_codes_8h.html>`__) enum that represents success state. A successful request will return ``StatusCode.OK``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // Command m_motor to 100% of duty cycle
         m_motor.setControl(new DutyCycleOut(1.0));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // Command m_motor to 100% of duty cycle
         m_motor.SetControl(controls::DutyCycleOut{1.0});

Modifying a Control Request
---------------------------

Control requests are mutable, so they can be saved in a member variable and reused. For example, ``DutyCycleOut`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/DutyCycleOut.html>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1controls_1_1_duty_cycle_out.html>`__) has an ``Output`` member variable that can be manipulated, thus changing the output DutyCycle (proportion of supply voltage).

.. note:: Java users should reuse control requests to prevent excessive invocation of the Garbage Collector.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         var motorRequest = new DutyCycleOut(0.0);

         motorRequest.Output = 1.0;
         m_motor.setControl(motorRequest);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         controls::DutyCycleOut motorRequest{0.0};

         motorRequest.Output = 1.0;
         m_motor.SetControl(motorRequest);

Method Chaining API
^^^^^^^^^^^^^^^^^^^

Control requests also supports modification using method chaining. This can be useful for mutating multiple values of a control request.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // initialize torque current FOC request with 0 amps
         var motorRequest = new TorqueCurrentFOC(0);

         // mutate request with output of 10 amps and max duty cycle 0.5
         m_motor.SetControl(motorRequest.withOutputAmps(10).withMaxDutyCycle(0.5));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // initialize torque current FOC request with 0 amps
         controls::TorqueCurrentFOC motorRequest{0_A};

         // mutate request with output of 10 amps and max duty cycle 0.5
         m_motor.SetControl(motorRequest.WithOutputAmps(10_A).WithMaxDutyCycle(0.5));

Changing Update Frequency
-------------------------

Control requests are automatically transmitted at a fixed update frequency. This update frequency can be modified by changing the ``UpdateFreqHz`` (`Java <https://api.ctr-electronics.com/phoenixpro/release/java/com/ctre/phoenixpro/controls/DutyCycleOut.html#UpdateFreqHz>`__, `C++ <https://api.ctr-electronics.com/phoenixpro/release/cpp/classctre_1_1phoenixpro_1_1controls_1_1_duty_cycle_out.html#a0045022bf2dbb33f1a4591d9b186b198>`__) field of the control request before sending it to the device.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a duty cycle request
         var motorRequest = new DutyCycleOut(0);
         // reduce the update frequency to 50 Hz
         motorRequest.UpdateFreqHz = 50;

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a duty cycle request
         controls::DutyCycleOut motorRequest{0};
         // reduce the update frequency to 50 Hz
         motorRequest.UpdateFreqHz = 50;
