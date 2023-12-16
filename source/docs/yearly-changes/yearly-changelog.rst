New for 2024
============

The CTR Electronics development team has been hard at work expanding the Phoenix 6 API based on user feedback. We are proud to announce several exciting new features with this release!

Firmware for the beta version of 2024 Phoenix 6 can be found by selecting "2024" instead of "2023" in the firmware selection menu.

The API vendordep for the 2024 beta is available under ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-frc2024-beta-latest.json``.

Users will need to update both firmware and API to make use of these features.

.. important:: The 2024 Beta of Phoenix 6 requires 2024 Beta FRC Software.  Find more information about the beta `here <https://github.com/wpilibsuite/2024Beta>`__.

.. note:: This changelog is intended to highlight the major additions to the Phoenix 6 API. For a detailed list of changes and bug fixes, visit the `Phoenix changelog <https://api.ctr-electronics.com/changelog>`__.

Phoenix Pro Licensing
---------------------

Introduced earlier this year is the new season pass licensing model. Season pass improves licensing flexibility when utilizing multiple robots and the roboRIO CAN bus. Additional information on this can be found in the `blog post <https://store.ctr-electronics.com/blog/phoenix-pro-licensing-announcing-season-pass/>`__.

As a reminder, many of the features available in Phoenix 6 do **not** require Pro to use. A full breakdown of what is and is not supported is available under :ref:`the feature table <docs/migration/new-to-phoenix:feature breakdown>`.

A variety of new (Pro and non-Pro) features have been added and are described in the API section below.

API
---

New Language Support
^^^^^^^^^^^^^^^^^^^^

Phoenix 6 now supports the following languages.

- Java
- C++
- `Python <https://pypi.org/project/phoenix6/>`__
- `C# <https://www.nuget.org/packages/Phoenix6/>`__ (non-FRC only)

Feedback for the new language targets is welcome at `feedback@ctr-electronics.com <mailto:feedback@ctr-electronics.com>`__.

:doc:`Swerve API </docs/api-reference/api-usage/swerve/swerve-overview>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now included in the Phoenix 6 API is a high performance Swerve API (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/swerve/package-summary.html>`__). Teams using Phoenix 6 compatible devices for their swerve drivetrain can utilize the API to maximize performance and **eliminate** the boilerplate that comes with copying swerve template code. Empower your odometry and maximize your robot responsiveness with our synchronous, latency-compensated API with simulation support!

To complement the Swerve API, we've added a :doc:`project generation utility </docs/tuner/tuner-swerve/index>` to Tuner X to handle boilerplate related to inverts, offsets and gearing.

Swerve drive code is as easy as the following.

.. note:: The following example utilizes a generated ``TunerConstants`` class from Tuner X, but users can create the ``CommandSwerveDrivetrain`` or ``SwerveDrivetrain`` directly if they prefer. Additionally, this API is currently only available for Java.

.. code-block:: java

   /* Setting up bindings for necessary control of the swerve drive platform */
   CommandXboxController joystick = new CommandXboxController(0); // My joystick
   CommandSwerveDrivetrain drivetrain = TunerConstants.DriveTrain; // My drivetrain
   SwerveRequest.FieldCentric drive = new SwerveRequest.FieldCentric().withIsOpenLoop(true); // I want field-centric
                                                                                             // driving in open loop
   SwerveRequest.SwerveDriveBrake brake = new SwerveRequest.SwerveDriveBrake();
   SwerveRequest.PointWheelsAt point = new SwerveRequest.PointWheelsAt();
   Telemetry logger = new Telemetry(MaxSpeed);

   private void configureBindings() {
      drivetrain.setDefaultCommand( // Drivetrain will execute this command periodically
         drivetrain.applyRequest(() ->
            drive.withVelocityX(-joystick.getLeftY() * MaxSpeed) // Drive forward with negative Y (forward)
               .withVelocityY(-joystick.getLeftX() * MaxSpeed) // Drive left with negative X (left)
               .withRotationalRate(-joystick.getRightX() * MaxAngularRate) // Drive counterclockwise with negative X (left)
         )
      );

      joystick.a().whileTrue(drivetrain.applyRequest(() -> brake));
      joystick.b().whileTrue(drivetrain
         .applyRequest(() -> point.withModuleDirection(new Rotation2d(-joystick.getLeftY(), -joystick.getLeftX()))));

      if (Utils.isSimulation()) {
         drivetrain.seedFieldRelative(new Pose2d(new Translation2d(), Rotation2d.fromDegrees(90)));
      }

      drivetrain.registerTelemetry(logger::telemeterize);
   }

.. figure:: images/swerve-simulation-video.*
   :alt: GIF showing swerve simulation support

.. important:: Swerve API requires all necessary swerve devices to be v6 devices. e.g. 4 drive TalonFX, 4 steer TalonFX, 1 Pigeon 2.0, 4 CANcoders.

Signal Logging
^^^^^^^^^^^^^^

We've added a comprehensive signal logger (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/SignalLogger.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_signal_logger.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/signal_logger/index.html>`__, `C# <https://api.ctr-electronics.com/phoenix6/release/csharp/html/T_CTRE_Phoenix6_SignalLogger.htm>`__) that provides a real-time capture of signals for supported devices. Signal logging can be useful for analysis of signals over a period of time. In applications, they can be useful for tuning PID gains, characterization of systems, analyzing latency on a system and much more. Did something unexpected happen in a match? Go back and check your logs to inspect positions, velocities, voltages, currents, temperatures, etc. Logging is automatic, and does not require choosing which signals you need captured ahead of time.

.. important:: MCAP Export requires Pro Licensing

.. note:: Documentation on configuring and extracting logs will be available soon.

.. grid:: 2

   .. grid-item-card:: Log Extractor

      Logs can be extracted and converted to compatible formats directly in Tuner X.

      .. image:: images/tuner-x-log-extractor.png
         :alt: Log extractor page in Tuner X

   .. grid-item-card:: Foxglove Log Analysis

      Logs can then be analyzed in `Foxglove <https://foxglove.dev/>`__ to identify hardware failures, tuning gains, etc.

      .. image:: images/foxglove-example.png
         :alt: Picture of foxglove analyzing data

Signal API Improvements
^^^^^^^^^^^^^^^^^^^^^^^

Users can now disable signals by setting their update rate to 0 Hz. To reduce boilerplate when disabling signals, we have added an ``optimizeBusUtilization()`` function on device objects. This will automatically disable all signals that have not explicitly been given an update frequency with ``setUpdateFrequency()``. There is also a ``ParentDevice.optimizeBusUtilizationForAll()`` static function that takes a list of devices to optimize. Additionally, update frequencies are automatically reapplied when devices reset.

Setting a given signal's frequency behavior has been improved by keeping track of the signal with the highest frequency in a frame. The highest frequency of all signals in the frame is used for the frame instead of the most recent signal.

Additionally, the following new functions have been added.

* ``BaseStatusSignal.refreshAll()``

  * Refreshes all passed in signals

* ``BaseStatusSignal.setUpdateFrequencyForAll()``

  * Applies the given update frequency to all signals that are passed in

* ``getAppliedUpdateFrequency()``

  * Retrieves the actual update frequency of a given signal

New Motion Magic® Controls
^^^^^^^^^^^^^^^^^^^^^^^^^^

We have added a Motion Magic® Velocity control mode, which produces a motion profile in real-time for a velocity controller. This allows for smooth transitions between velocity setpoints. Additionally, we have added a Dynamic Motion Magic® control mode for our Pro CANivore users, which supports modifying the cruise velocity, acceleration, and jerk settings during motion.

Furthermore, we have added Motion Magic® Expo control requests. Whereas traditional Motion Magic® uses a trapezoidal profile or an S-Curve, Motion Magic® Expo uses an exponential profile. The profile follows the kV and kA characteristics of the system, and optionally a cruise velocity. This allows the profile to best match the system dynamics, reducing both overshoot and time to target.

For a full list of new Motion Magic® controls, see the controls API documentation (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/controls/package-summary.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/namespacectre_1_1phoenix6_1_1controls.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/controls/index.html>`__, `C# <https://api.ctr-electronics.com/phoenix6/release/csharp/html/N_CTRE_Phoenix6_Controls.htm>`__).

Differential Mechanisms
^^^^^^^^^^^^^^^^^^^^^^^

.. important:: ``DifferentialMechanism`` requires both Pro and CANFD. ``SimpleDifferentialMechanism`` is a lower performance alternative that requires neither.

``DifferentialMechanism`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/mechanisms/DifferentialMechanism.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1mechanisms_1_1_differential_mechanism.html>`__) provides an easy way to control two-axis differential mechanisms, such as a two motor elevator (motors on the left and right sides of the elevator that are not mechanically linked).

New Configs
^^^^^^^^^^^

We've added several new configs. A full list of available configs is available in the ``configs`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/package-summary.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/namespacectre_1_1phoenix6_1_1configs.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/configs/index.html>`__, `C# <https://api.ctr-electronics.com/phoenix6/release/csharp/html/N_CTRE_Phoenix6_Configs.htm>`__) namespace.

Improved Support for roboRIO Motion Profiles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In addition to the kS and kV feedforward terms supported in 2023, Phoenix 6 now supports kG and kA. kG can be constant for use with an elevator, or it can calculate feedforward based on the cosine of position for mechanisms such as a rotating arm.

Additionally, there is now improved integration with roboRIO motion profiling using velocity setpoints in position control modes, along with acceleration setpoints in velocity control modes.

.. code-block:: java

   // Trapezoid profile with max velocity 80 rps, max accel 160 rps/s
   final TrapezoidProfile m_profile = new TrapezoidProfile(
      new TrapezoidProfile.Constraints(80, 160)
   );
   // Final target of 200 rot, 0 rps
   TrapezoidProfile.State m_goal = new TrapezoidProfile.State(200, 0);
   TrapezoidProfile.State m_setpoint = new TrapezoidProfile.State();

   // robot loop
   m_setpoint = m_profile.calculate(0.020, m_goal, m_setpoint);
   m_positionControl.Position = m_setpoint.position;
   m_positionControl.Velocity = m_setpoint.velocity;
   m_talonFX.setControl(m_positionControl);

New ``SyncCANcoder`` Remote Sensor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Added support for ``SyncCANcoder`` feedback. This allows users to synchronize the TalonFX's internal rotor sensor against the remote CANcoder, but continue to use the rotor sensor for all closed loop control. TalonFX will continue to monitor the remote CANcoder and report if its internal position differs significantly from the reported position, or if the remote CANcoder disappears from the bus. Users may want this instead of FusedCANcoder if there is risk that the sensor can fail in a way that the sensor is still reporting "good" data, but the data does not match the mechanism, such as if the entire sensor mount assembly breaks off. Users using this over FusedCANcoder will not have the backlash compensation, as the CANcoder position is not continually fused in.

Miscellaneous Improvements
^^^^^^^^^^^^^^^^^^^^^^^^^^

* Orchestra (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/Orchestra.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_orchestra.html>`__, Python, `C# <https://api.ctr-electronics.com/phoenix6/release/csharp/html/T_CTRE_Phoenix6_Orchestra.htm>`__) has been ported from Phoenix 5.

  * Now supports multiple devices playing a single track.
  * Now works when the robot is disabled.
  * A new ``MusicTone`` control mode has been added and can be used for playing a specific frequency.

* Remote limits have been ported from Phoenix 5.
* Improved support for :doc:`unit tests </docs/api-reference/wpilib-integration/unit-testing>`.

Tuner X
-------

Swerve Project Generator
^^^^^^^^^^^^^^^^^^^^^^^^

Swerve has many common pitfalls (inverts, encoder offsets, gearing, etc.). Utilizing our new Tuner X :doc:`Swerve Project Generator </docs/tuner/tuner-swerve/index>` can help eliminate these problems. This utility will guide the user through specifying their drivebase characteristics, device selection, CANcoder offset configuration and drive/steer validation. This utility will then generate a project that provides minimum viable swerve control!

.. important:: This utility does not characterize the swerve. To maximize robot responsiveness, we recommend characterizing and modifying the gains specified in the generated ``TunerConstants`` class.

.. image:: images/tuner-swerve-page.png
   :alt: Picture of the swerve configuration page in Tuner X

.. note:: The Swerve Project Generator is only supported in FRC Java.

CANcoder Zero Button
^^^^^^^^^^^^^^^^^^^^

.. important:: This feature requires 2024 diagnostics or newer.

CANcoders can be zeroed by pressing on the button shown below. This applies an offset to the encoder config and reports the applied offset to the user.

.. image:: images/tuner-zero-cancoder.png
   :alt: Picture with an arrow pointing at the zero cancoder icon
   :width: 350px

Improved Plotting
^^^^^^^^^^^^^^^^^

.. important:: This feature requires 2024 diagnostics or newer.

All signals exposed in API can now be plotted directly in Tuner X.

.. image:: images/tuner-signal-plotting.png
   :alt: Full signal plotting
