Using the Differential Mechanism API
====================================

``DifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html>`__) and ``SimpleDifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/SimpleDifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_simple_differential_mechanism.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/simple_differential_mechanism/index.html>`__) **automatically** set up and applies **all configs** to the two provided motor controllers on construction. Additionally, the mechanisms provide functions to control the mechanism, pull out relevant signals, and automatically detect and disable on fault conditions.

.. tip:: The configs applied to the motor controllers, including invert and neutral mode, can be adjusted using the ``LeaderInitialConfigs`` and ``FollowerInitialConfigs``. For more information, see :doc:`/docs/api-reference/mechanisms/differential/differential-setup`.

Running Control Requests
------------------------

The differential mechanism can be controlled by calling ``setControl`` with one of the supported control requests.

.. tab-set::

   .. tab-item:: ``DifferentialMechanism``
      :sync: differential

      The full ``DifferentialMechanism`` (requires `Phoenix Pro <https://store.ctr-electronics.com/products/phoenix-pro/>`__ and `CANivore <https://store.ctr-electronics.com/products/canivore>`__) accepts two separate control requests. The first is run on the Average axis, while the second is run on the Difference axis. Both control requests must use the same :ref:`control output type <docs/api-reference/device-specific/talonfx/talonfx-control-intro:control output types>`. All control output types are supported, as are all parameters within the two provided control requests. However, note that Motion Magic® is not supported on the Difference axis.

      .. note:: Common parameters such as ``UseTimesync`` only need to be set on the Average axis control request.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Run Motion Magic on the Average axis, Position on the Difference axis
               final MotionMagicVoltage avgRequest = new MotionMagicVoltage(0).withSlot(0);
               final PositionVoltage diffRequest = new PositionVoltage(0).withSlot(1);

               // Apply a TrapezoidProfile to the Difference axis for smoother motion
               final TrapezoidProfile diffProfile = new TrapezoidProfile(
                  new TrapezoidProfile.Constraints(80, 320)
               );
               TrapezoidProfile.State diffSetpoint = new TrapezoidProfile.State();
               TrapezoidProfile.State diffGoal = new TrapezoidProfile.State();

               // Update the Difference setpoint and control the mechanism
               diffGoal = new TrapezoidProfile.State(5.0, 0.0);
               diffSetpoint = diffProfile.calculate(0.020, diffSetpoint, diffGoal);

               diffMech.setControl(
                  avgRequest.withPosition(10.0),
                  diffRequest.withPosition(diffSetpoint.position)
                     .withVelocity(diffSetpoint.velocity)
               );

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Run Motion Magic on the Average axis, Position on the Difference axis
               controls::MotionMagicVoltage avgRequest = controls::MotionMagicVoltage{0_tr}.WithSlot(0);
               controls::PositionVoltage diffRequest = controls::PositionVoltage{0_tr}.WithSlot(1);

               // Apply a TrapezoidProfile to the Difference axis for smoother motion
               frc::TrapezoidProfile<units::turn_t> diffProfile{{80_tps, 320_tr_per_s_sq}};
               frc::TrapezoidProfile<units::turn_t>::State diffSetpoint{};
               frc::TrapezoidProfile<units::turn_t>::State diffGoal{};

               /* Update the Difference setpoint and control the mechanism */
               diffGoal = frc::TrapezoidProfile<units::turn_t>::State{5_tr, 0_tps};
               diffSetpoint = diffProfile.Calculate(20_ms, diffSetpoint, diffGoal);

               diffMech.SetControl(
                  avgRequest.WithPosition(10_tr),
                  diffRequest.WithPosition(diffSetpoint.position)
                     .WithVelocity(diffSetpoint.velocity)
               );

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Run Motion Magic on the Average axis, Position on the Difference axis
               self._avg_request = controls.MotionMagicVoltage(0).with_slot(0)
               self._diff_request = controls.PositionVoltage(0).with_slot(1)

               # Apply a TrapezoidProfile to the Difference axis for smoother motion
               self._diff_profile = TrapezoidProfile(
                  TrapezoidProfile.Constraints(80, 320)
               )
               self._diff_setpoint = TrapezoidProfile.State()
               self._diff_goal = TrapezoidProfile.State()

               # Update the Difference setpoint and control the mechanism
               self._diff_goal = TrapezoidProfile.State(5.0, 0.0)
               self._diff_setpoint = self._diff_profile.calculate(0.020, self._diff_setpoint, self._diff_goal)

               self._diff_mech.set_control(
                  self._avg_request.with_position(10.0),
                  self._diff_request
                  .with_position(self._diff_setpoint.position)
                  .with_velocity(self._diff_setpoint.velocity)
               )

   .. tab-item:: ``SimpleDifferentialMechanism``
      :sync: simple-differential

      The limited ``SimpleDifferentialMechanism`` accepts a single ``Differential*`` control request. These control requests contain a limited number of parameters compared to the non-differential requests. For example, ``DifferentialPositionVoltage`` does not support ``FeedForward`` or ``Velocity``. Additionally, all of these control requests run position PID on the Difference axis, and only Duty Cycle and Voltage :ref:`control output types <docs/api-reference/device-specific/talonfx/talonfx-control-intro:control output types>` are supported.

      The ``Average*`` parameters specify the targets for the Average axis, while the ``Differential*`` parameters specify the targets for the Difference axis.

      .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Run Motion Magic on the Average axis, unprofiled Position on the Difference axis
               // Defaults to Slot 0 on Average, Slot 1 on Differential
               final DifferentialMotionMagicVoltage request = new DifferentialMotionMagicVoltage(0, 0);

               // Apply the control to the mechanism
               simpleDiffMech.setControl(
                  request.withAveragePosition(10.0)
                     .withDifferentialPosition(5.0)
               );

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Run Motion Magic on the Average axis, unprofiled Position on the Difference axis
               // Defaults to Slot 0 on Average, Slot 1 on Differential
               controls::DifferentialMotionMagicVoltage request{0_tr, 0_tr};

               // Apply the control to the mechanism
               simpleDiffMech.SetControl(
                  request.WithAveragePosition(10_tr)
                     .WithDifferentialPosition(5_tr)
               );

         .. tab-item:: Python
            :sync: python

            .. code-block:: python

               # Run Motion Magic on the Average axis, unprofiled Position on the Difference axis
               # Defaults to Slot 0 on Average, Slot 1 on Differential
               self._request = controls.DifferentialMotionMagicVoltage(0, 0)

               # Apply the control to the mechanism
               self._simple_diff_mech.set_control(
                  self._request
                  .with_average_position(10.0)
                  .with_differential_position(5.0)
               )

Disabling Output
^^^^^^^^^^^^^^^^

The differential mechanism also provides a few easy ways to disable output:

- ``setNeutralOut()`` applies the configured neutral mode (brake or coast) to both motors.
- ``setCoastOut()`` forces both motors to coast by applying a ``CoastOut`` request.
- ``setStaticBrake()`` forces both motors to brake by applying a ``StaticBrake`` request.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // Disable mechanism output using the configured neutral mode
         diffMech.setNeutralOut();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // Disable mechanism output using the configured neutral mode
         diffMech.SetNeutralOut();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Disable mechanism output using the configured neutral mode
         self._diff_mech.set_neutral_out()

Set Neutral Mode and Position
-----------------------------

The neutral mode of the mechanism can be changed after construction by calling ``configNeutralMode`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#configNeutralMode(com.ctre.phoenix6.signals.NeutralModeValue,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#a36170c8ad722d1dcfbc875d874a23f52>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.config_neutral_mode>`__).

.. tip:: The neutral mode can be applied on construction by modifying the ``LeaderInitialConfigs`` provided to the ``DifferentialMotorConstants``.

Additionally, the position of the mechanism can be reset using ``setPosition`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#setPosition(double,double,double)>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#a3db09435242953e6ec4a2e71950aa044>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.set_position>`__), which accepts the new Average axis and Difference axis positions (default 0). This can be useful for recalibrating the mechanism position. Note that any remote sensor on the Difference axis will not be affected by ``setPosition`` and can be adjusted separately.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // The mechanism was constructed in brake mode, switch to coast
         diffMech.configNeutralMode(NeutralModeValue.Coast);

         // Reset the mechanism positions to 0
         diffMech.setPosition(Rotations.of(0), Rotations.of(0));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // The mechanism was constructed in brake mode, switch to coast
         diffMech.ConfigNeutralMode(signals::NeutralModeValue::Coast);

         // Reset the mechanism positions to 0
         diffMech.SetPosition(0_tr, 0_tr);

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # The mechanism was constructed in brake mode, switch to coast
         self._diff_mech.config_neutral_mode(signals.NeutralModeValue.COAST)

         # Reset the mechanism positions to 0
         self._diff_mech.set_position(0.0, 0.0)

Fetching Status Signals
-----------------------

Status signals relevant to the mechanism, such as the ``AveragePosition`` and ``DifferentialPosition``, can be directly fetched from the mechanism. For other status signals, such as supply current, the differential leader and follower motor controllers can be pulled out from the mechanism using ``getLeader()`` and ``getFollower()``.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // Pull out some StatusSignals from the mechanism
         var avgPosition = diffMech.getAveragePosition();
         var diffPosition = diffMech.getDifferentialPosition();
         var avgClosedLoopRef = diffMech.getAverageClosedLoopReference();
         var diffClosedLoopRef = diffMech.getDifferentialClosedLoopReference();

         // Also pull out supply and torque current from both motors
         var leaderSupplyCurrent = diffMech.getLeader().getSupplyCurrent();
         var leaderTorqueCurrent = diffMech.getLeader().getTorqueCurrent();
         var followerSupplyCurrent = diffMech.getFollower().getSupplyCurrent();
         var followerTorqueCurrent = diffMech.getFollower().getTorqueCurrent();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // Pull out some StatusSignals from the mechanism
         auto &avgPosition = diffMech.GetAveragePosition();
         auto &diffPosition = diffMech.GetDifferentialPosition();
         auto &avgClosedLoopRef = diffMech.GetAverageClosedLoopReference();
         auto &diffClosedLoopRef = diffMech.GetDifferentialClosedLoopReference();

         // Also pull out supply and torque current from both motors
         auto &leaderSupplyCurrent = diffMech.GetLeader().GetSupplyCurrent();
         auto &leaderTorqueCurrent = diffMech.GetLeader().GetTorqueCurrent();
         auto &followerSupplyCurrent = diffMech.GetFollower().GetSupplyCurrent();
         auto &followerTorqueCurrent = diffMech.GetFollower().GetTorqueCurrent();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # Pull out some StatusSignals from the mechanism
         avg_position = self._diff_mech.get_average_position()
         diff_position = self._diff_mech.get_differential_position()
         avg_closed_loop_ref = self._diff_mech.get_average_closed_loop_reference()
         diff_closed_loop_ref = self._diff_mech.get_differential_closed_loop_reference()

         # Also pull out supply and torque current from both motors
         leader_supply_current = self._diff_mech.leader.get_supply_current()
         leader_torque_current = self._diff_mech.leader.get_torque_current()
         follower_supply_current = self._diff_mech.follower.get_supply_current()
         follower_torque_current = self._diff_mech.follower.get_torque_current()

Automatic Fault Protection
--------------------------

The differential mechanisms provide an optional ``periodic()`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#periodic()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#aa6a39929cc2a6452707d7465b158093b>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.disabled_reason>`__) function that, when called periodically, automatically detects dangerous fault conditions and disables the mechanism to prevent damage. The state of the mechanism can be fetched using ``getMechanismState()`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#getMechanismState()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#ad59da45dc2b19f3867a07351587b2754>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.periodic>`__).

.. note:: This section only applies when calling ``periodic()``.

Some faults temporarily disable the mechanism until they are naturally resolved. For example, the mechanism temporarily disables when one of the motor controllers briefly disconnects from CAN and re-enables once it returns. ``isDisabled()`` (or ``MechanismState.Disabled``) can be used to check if the mechanism is disabled, and ``getDisabledReason()`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#getDisabledReason()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#ad59da45dc2b19f3867a07351587b2754>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.disabled_reason>`__) reports the reason for the disable.

Other faults are higher in severity and require user action before the mechanism can safely re-enable. For example, the mechanism disables when one of the motor controllers is power cycled, as its position is likely invalid and requires a call to :ref:`setPosition <docs/api-reference/mechanisms/differential/using-differential-mech:set neutral mode and position>`. ``requiresUserAction()`` (or ``MechanismState.RequiresUserAction``) can be used to check for these fault conditions, and ``getRequiresUserReason()`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#getRequiresUserReason()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#a494d92c8883d86080effc5f5d0c05aeb>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.requires_user_reason>`__) reports the reason that user action is required. Once the mechanism has been confirmed to be in a safe state, the mechanism can be re-enabled using ``clearUserRequirement()`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html#clearUserRequirement()>`__, `C++ <https://api.ctr-electronics.com/phoenix6/stable/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html#ab86c4e47e7d9f86417f58fc2eacd223f>`__, `Python <https://api.ctr-electronics.com/phoenix6/stable/python/autoapi/phoenix6/mechanisms/differential_mechanism/index.html#phoenix6.mechanisms.differential_mechanism.DifferentialMechanism.clear_user_requirement>`__).

.. note:: ``isDisabled()`` also reports true when ``requiresUserAction()`` reports true.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: java

         // If we encounter a critical fault condition, schedule a
         // WPILib Command to recalibrate our zero and re-enable
         new Trigger(diffMech::requiresUserAction).onTrue(
            calibrateZero().finallyDo(diffMech::clearUserRequirement)
         );

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         // If we encounter a critical fault condition, schedule a
         // WPILib Command to recalibrate our zero and re-enable
         frc2::Trigger{[this] { return diffMech.RequiresUserAction(); }}.OnTrue(
            CalibrateZero().FinallyDo([this] { diffMech.ClearUserRequirement(); })
         );

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         # If we encounter a critical fault condition, schedule a
         # WPILib Command to recalibrate our zero and re-enable
         Trigger(self._diff_mech.requires_user_action).onTrue(
            self.calibrate_zero().finallyDo(self._diff_mech.clear_user_requirement)
         )
