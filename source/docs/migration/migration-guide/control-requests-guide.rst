Control Requests
================

Phoenix 6 provides an extensive list of flexible control modes through the use of strongly-typed control requests.

.. note:: For more information about control requests in Phoenix 6, see :doc:`/docs/api-reference/api-usage/control-requests`.

Using Control Requests
----------------------

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

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

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // class member variable
               final VoltageOut m_request = new VoltageOut(0);

               // main robot code, command 12 V output
               m_motor.setControl(m_request.withOutput(12.0));
               // the control request `with` methods also accept unit types
               m_motor.setControl(m_request.withOutput(Volts.of(12.0)));

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // class member variable
               controls::VoltageOut m_request{0_V};

               // main robot code, command 12 V output
               m_motor.SetControl(m_request.WithOutput(12_V));

Follower Motors
^^^^^^^^^^^^^^^

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // robot init, set m_follower to follow m_leader
               m_follower.follow(m_leader);
               // m_follower should NOT oppose m_leader
               m_follower.setInverted(TalonFXInvertType.FollowMaster);
               // set m_strictFollower to follow m_leader
               m_strictFollower.follow(m_leader);
               // set m_strictFollower to ignore m_leader invert and use its own
               m_strictFollower.setInverted(TalonFXInvertType.CounterClockwise);

               // main robot code, command 100% output for m_leader
               m_leader.set(ControlMode.PercentOutput, 1.0);
               // - m_follower and m_strictFollower will also run at 100% output
               // - m_follower will follow m_leader's invert, while m_strictFollower
               //   ignores it and uses its own
               // NOTE: if set(), neutralOutput(), or disable() is ever called on
               //       the followers, they will stop following

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // robot init, set m_follower to follow m_leader
               m_follower.Follow(m_leader);
               // m_follower should NOT oppose m_leader
               m_follower.SetInverted(TalonFXInvertType::FollowMaster);
               // set m_strictFollower to follow m_leader
               m_strictFollower.Follow(m_leader);
               // set m_strictFollower to ignore m_leader invert and use its own
               m_strictFollower.SetInverted(TalonFXInvertType::CounterClockwise);

               // main robot code, command 100% output for m_leader
               m_leader.Set(ControlMode::PercentOutput, 1.0);
               // - m_follower and m_strictFollower will also run at 100% output
               // - m_follower will follow m_leader's invert, while m_strictFollower
               //   ignores it and uses its own
               // NOTE: if Set(), NeutralOutput(), or Disable() is ever called on
               //       the followers, they will stop following

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // class member variables
               final DutyCycleOut m_request = new DutyCycleOut(0);

               // robot init, set m_follower to follow m_leader
               // m_follower should NOT oppose leader
               m_follower.setControl(new Follower(m_leader.getDeviceID(), false));
               // set m_strictFollower to strict-follow m_leader
               // strict followers ignore the leader's invert and use their own
               m_strictFollower.setControl(new StrictFollower(m_leader.getDeviceID()));

               // main robot code, command 100% output for m_leader
               m_motor.setControl(m_request.withOutput(1.0));
               // - m_follower and m_strictFollower will also run at 100% output
               // - m_follower will follow m_leader's invert, while m_strictFollower
               //   ignores it and uses its own

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // class member variables
               controls::DutyCycleOut m_request{0};

               // robot init, set m_follower to follow m_leader
               // m_follower should NOT oppose leader
               m_follower.SetControl(controls::Follower{m_leader.GetDeviceID(), false});
               // set m_strictFollower to strict-follow m_leader
               // strict followers ignore the leader's invert and use their own
               m_strictFollower.SetControl(controls::StrictFollower{m_leader.GetDeviceID()});

               // main robot code, command 100% output for m_leader
               m_motor.SetControl(m_request.WithOutput(1.0));
               // - m_follower and m_strictFollower will also run at 100% output
               // - m_follower will follow m_leader's invert, while m_strictFollower
               //   ignores it and uses its own

Changing Update Frequency (Control Frame Period)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // slow down the Control 3 frame (general control) to 50 Hz (20ms)
               m_talonFX.setControlFramePeriod(ControlFrame.Control_3_General, 20);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // slow down the Control 3 frame (general control) to 50 Hz (20ms)
               m_talonFX.SetControlFramePeriod(ControlFrame::Control_3_General, 20);

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // class member variables
               final DutyCycleOut m_request = new DutyCycleOut(0);

               // slow down the control request to 50 Hz
               m_request.UpdateFreqHz = 50;

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // class member variables
               controls::DutyCycleOut m_request{0};

               // slow down the control request to 50 Hz
               m_request.UpdateFreqHz = 50_Hz;

.. tip:: ``UpdateFreqHz`` can be set to 0 Hz to synchronously one-shot the control request. In this case, users must ensure the control request is sent periodically in their robot code. Therefore, we recommend users call ``setControl`` no slower than 20 Hz (50 ms) when the control is one-shot.

Control Types
-------------

In Phoenix 6, voltage compensation has been replaced with the ability to directly specify the :ref:`control output type <docs/api-reference/device-specific/talonfx/talonfx-control-intro:control output types>`.

All control output types are supported in open-loop and closed-loop control requests.

.. list-table:: Open-loop Control Requests
   :header-rows: 1

   * - Phoenix 5
     - Phoenix 6

   * - PercentOutput
     - DutyCycleOut

   * - PercentOutput + Voltage Compensation
     - VoltageOut

   * - Phoenix 5 does not support torque control
     - TorqueCurrentFOC (requires Pro)

   * - Current closed-loop
     - This has been deprecated in Phoenix 6.

       - Users looking to control torque should use TorqueCurrentFOC (requires Pro)
       - Users looking to limit current should use supply and stator current limits

.. list-table:: Closed-loop Control Requests
   :header-rows: 1

   * - Phoenix 5
     - Phoenix 6

   * - Position
     - PositionDutyCycle

   * - Velocity
     - VelocityDutyCycle

   * - MotionMagic
     - MotionMagicDutyCycle

   * - Closed-loop + Voltage Compensation
     - {ClosedLoop}Voltage

   * - Closed-loop + Torque Control (not supported in Phoenix 5)
     - {ClosedLoop}TorqueCurrentFOC (requires Pro)
