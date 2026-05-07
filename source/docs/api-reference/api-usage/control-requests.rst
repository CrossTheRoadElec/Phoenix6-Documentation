Control Requests
================

Control Requests represent the **output** of a device. A list of control requests can be found in the API docs (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/controls/package-summary.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/namespacectre_1_1phoenix6_1_1controls.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/controls/index.html>`__).

.. note:: Phoenix 6 utilizes the `C++ units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/cpp-units.html>`__ and, optionally, the `Java units library <https://docs.wpilib.org/en/stable/docs/software/basic-programming/java-units.html>`__ when applicable. Using the Java units library may increase GC overhead.

Applying a Control Request
--------------------------

Control requests can be applied by calling ``setControl()`` on the device object. ``setControl()`` returns a ``StatusCode`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/StatusCode.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/_status_codes_8h.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/status_code/index.html#phoenix6.status_code.StatusCode>`__) enum that represents success state. A successful request will return ``StatusCode.OK``.

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

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Command m_motor to 100% of duty cycle
         self.motor.set_control(controls.DutyCycleOut(1.0))

Modifying a Control Request
---------------------------

Control requests are mutable, so they can be saved in a member variable and reused. For example, ``DutyCycleOut`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/controls/DutyCycleOut.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/controls/duty_cycle_out/index.html#phoenix6.controls.duty_cycle_out.DutyCycleOut>`__) has an ``Output`` member variable that can be manipulated, thus changing the output DutyCycle (proportion of supply voltage).

.. note:: Java users should reuse control requests to prevent excessive invocation of the Garbage Collector.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         final DutyCycleOut m_motorRequest = new DutyCycleOut(0.0);

         m_motorRequest.Output = 1.0;
         m_motor.setControl(m_motorRequest);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         controls::DutyCycleOut m_motorRequest{0.0};

         m_motorRequest.Output = 1.0;
         m_motor.SetControl(m_motorRequest);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self.motor_request = controls.DutyCycleOut(0.0)

         self.motor_request.output = 1.0
         self.motor.set_control(self.motor_request)

Method Chaining API
^^^^^^^^^^^^^^^^^^^

Control requests also supports modification using method chaining. This can be useful for mutating multiple values of a control request. In Java, this can also be used to provide a unit type.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // initialize torque current FOC request with 0 amps
         final TorqueCurrentFOC m_motorRequest = new TorqueCurrentFOC(0);

         // mutate request with output of 10 amps and max duty cycle 0.5
         m_motor.setControl(m_motorRequest.withOutput(Amps.of(10)).withMaxAbsDutyCycle(0.5));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // initialize torque current FOC request with 0 amps
         controls::TorqueCurrentFOC m_motorRequest{0_A};

         // mutate request with output of 10 amps and max duty cycle 0.5
         m_motor.SetControl(m_motorRequest.WithOutput(10_A).WithMaxAbsDutyCycle(0.5));

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # initialize torque current FOC request with 0 amps
         self.motor_request = controls.TorqueCurrentFOC(0)

         # mutate request with output of 10 amps and max duty cycle 0.5
         self.motor.set_control(self.motor_request.with_output(10).with_max_abs_duty_cycle(0.5))

Changing Update Frequency
-------------------------

Control requests are automatically transmitted at a fixed update frequency. This update frequency can be modified by changing the ``UpdateFreqHz`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/controls/DutyCycleOut.html#UpdateFreqHz>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html#a605f1b3e6ffa8bc83afb9b0d2ab6ab16>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/controls/duty_cycle_out/index.html#phoenix6.controls.duty_cycle_out.DutyCycleOut.with_update_freq_hz>`__) field of the control request before sending it to the device.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // create a duty cycle request
         final DutyCycleOut m_motorRequest = new DutyCycleOut(0);
         // reduce the update frequency to 50 Hz
         m_motorRequest.UpdateFreqHz = 50;

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // create a duty cycle request
         controls::DutyCycleOut m_motorRequest{0};
         // reduce the update frequency to 50 Hz
         m_motorRequest.UpdateFreqHz = 50;

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # create a duty cycle request
         self.motor_request = controls.DutyCycleOut(0)
         # reduce the update frequency to 50 Hz
         self.motor_request.update_freq_hz = 50

.. tip:: ``UpdateFreqHz`` can be set to 0 Hz to synchronously one-shot the control request. In this case, users must ensure the control request is sent periodically in their robot code. Therefore, we recommend users call ``setControl`` no slower than 20 Hz (50 ms) when the control is one-shot.
