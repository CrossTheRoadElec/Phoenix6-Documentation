New for 2026
============

Engineering never stops, and neither do we. At CTR Electronics, we are constantly analyzing and reflecting on our software, documentation and hardware integration. This past year, we've made immense investments in our differential stack, data analysis with Tuner, data logging pipeline and much more. We are proud to present our new for 2026 changelog!

Firmware for the 2026 release of Phoenix 6 can be found by selecting "2026" in the firmware selection menu.

The API vendordep for 2026 is available under ``https://maven.ctr-electronics.com/release/com/ctre/phoenix6/latest/Phoenix6-frc2026-latest.json``.

Users will need to update both firmware and API to make use of these features.

.. note:: This changelog is intended to highlight the major additions to the Phoenix 6 ecosystem. For a detailed list of changes and bug fixes, visit the `API changelog <https://api.ctr-electronics.com/changelog>`__.

API
---

Breaking Changes
^^^^^^^^^^^^^^^^

- The ``new <Device>(int id, String canbus)`` constructors are now deprecated and will be removed in 2027. Use the ``new <Device>(int id, CANBus canbus)`` constructors instead. This change is intended to prepare users for 2027, where an explicit CAN bus declaration is necessary.
- C++: Improved robot project compilation times. This results in the following breaking changes: The ``ctre/phoenix6/configs/Configs.hpp`` header has been split into separate files. In generated swerve projects, ``TunerConstants.h`` must now explicitly include the motor controllers and encoder used.
- ``DifferentialMechanism`` and ``SimpleDifferentialMechanism`` have been reworked to more closely align with the ``Swerve`` API.
- C++: We've bumped the minimum supported C++ version to C++ 20 and the minimum Ubuntu requirement to Ubuntu 22.04. Linux ARM32 is no longer supported.

Signal Logger Improvements & Behavior Changes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/hoot-struct-support.gif
   :alt: Picture showing playing back the pose signal in AdvantageScope

Signal logger has had quite a few changes over the off-season. Signal Logger now has support for `structs <https://github.wpilib.org/allwpilib/docs/release/java/edu/wpi/first/util/struct/Struct.html>`__, arbitrarily sized user signals, and annotation-based logging as an :doc:`Epilogue Backend </docs/api-reference/wpilib-integration/epilogue-integration>`.

The behavior of the signal logger auto-start functionality has also been changed in response to user feedback. Signal Logging auto start is **only enabled** on the roboRIO 1 if a flash drive is present, and otherwise default enabled on the roboRIO 2. Signal logging is started by any of the following (whichever occurs first):

- The robot is enabled
- It has been at least 5 seconds since program startup (allowing for calls to ``setPath``), and the Driver Station is connected to the robot.

This change in behavior should make the experience consistent between at-home testing and events. Additionally, ``OptimizeBusUtilization()`` now defaults to setting optimized signals to 4 Hz instead of 0 Hz, preserving data for hoot logs. Users can still get the old behavior by explicitly passing in 0 Hz.

.. dropdown:: Miscellaneous Changes

   - Logs from the same robot program instance / FRC match will now be grouped into a subdirectory named after the match and the date/time of the start of the match.
   - Java: Added ``List<BaseStatusSignal>`` overloads to ``waitForAll``/``refreshAll``/etc.
   - C++: Replaced the ``std::vector`` and ``std::array`` overloads with a ``std::span`` overload for APIs such as ``WaitForAll``/``RefreshAll``/``OptimizeBusUtilization``/etc.

Hoot Replay Improvements
^^^^^^^^^^^^^^^^^^^^^^^^

Hoot replay has been enhanced to enable use cases beyond just status signal playback. A ``HootAutoReplay`` API has been added to easily register custom "input" signals for logging on hardware and playback in replay.

.. code-block:: java

   private final HootAutoReplay autoReplay = new HootAutoReplay()
   .withStruct(
      "CameraPoseEst/pose", Pose2d.struct,
      /* getter lambda returns the value to log */
      () -> cameraPoseEst.pose,
      /* setter lambda applies the value from the log */
      val -> cameraPoseEst.pose = val.value
   )
   .withDouble(
      "CameraPoseEst/timestamp",
      () -> cameraPoseEst.timestamp,
      val -> cameraPoseEst.timestamp = val.value
   );

We highly recommend reading over the `improved hoot replay </docs/api-reference/api-usage/hoot-replay>` documentation for understanding how to integrate hoot replay into your robot program.

Additional Language Support for C#
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/csharp-demo.gif
   :alt: Video of running a WinUI3 app that manipulates a simulated Talon

C# has received some much needed updates that bring it to feature parity with the other supported languages. C# fits the middle-ground for users looking for type safety, but not wanting to use an unmanaged language like C++.

Check out the :ref:`installation instructions <docs/installation/installation-nonfrc:API Installation>` on installing the nuget.

Investments in Differential
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Our differential API has seen a variety of changes and feature additions that should enhance and expand the capabilities of teams building differential systems (such as Differential Wrists or Elevators). ``SimpleDifferentialMechanism`` and ``DifferentialMechanism`` have been reworked to more closely align with swerve. Both APIs now take a ``DifferentialMotorConstants`` object on construction, internally construct and configure the motor controllers (with initial configs objects), and provide useful APIs such as ``getAveragePosition()`` and ``setPosition(avg, diff)``. Support has been added for ``MotionMagicExpo`` and ``MotionMagicVelocity`` on the average axis, and configs have been added to control the behavior of continuous wrapping on the difference axis.

User documentation for the differential API can be found :doc:`here </docs/api-reference/mechanisms/differential/differential-overview>`. We highly recommend users read over the `full changelog <https://api.ctr-electronics.com/changelog>`__ for a full list of what has changed regarding the differential API.

Improvements to Swerve
^^^^^^^^^^^^^^^^^^^^^^

Swerve has seen a number of enhancements. We've added a ``LinearPath`` API that generates a linear path between two poses with constant velocity and acceleration limits. A ``WheelForceCalculator`` has been added that calculates the wheel force feedforwards to apply for the given target robot accelerations or change in ChassisSpeeds, based on the robot mass and MOI.

Additional Utility Functions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We've added a couple new utility functions, specifically for interacting with status signals.

- Added ``StatusSignal::IsNear(target, tolerance)`` utility function that checks whether the signal is near a target value given tolerance.
- Added ``StatusSignalCollection``, a lightweight ``List<BaseStatusSignal>`` wrapper that provides ``waitForAll``/``refreshAll``/etc. This can be used to register status signals from multiple classes for a single ``refreshAll`` call.

Enhancements to Error Reporting 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some changes have been made to the API to improve error reporting.

- StatusSignal ``WaitForAll()`` and ``RefreshAll()`` now report errors for all the status signals involved that errored.
- StatusSignal ``WaitForAll()`` and ``RefreshAll()`` now propagate an ``InvalidNetwork`` error to all the provided status signals.

Talon FX Improvements
---------------------

Improvements to follower have been made, specifically in-regards to when the leader active request is not DutyCycle based.

- Follower and DifferentialFollower now follow ``MotorVoltage`` instead of ``DutyCycle`` when the leader is running a voltage control output type.
- Follower now follows the leader's coast/brake.

Additionally, ``DynamicMotionMagicExpo`` (requires Pro and CANivore) control request has been added.

.. dropdown:: Miscellaneous Changes

   - Added ``GravityArmPositionOffset`` to offset the position for arm kG calculations (within (-0.25, 0.25) rot).
   - Added support for simple gain scheduling in position PID closed-loop control based on closed-loop error. For more information, see the API documentation of ``ClosedLoopGeneralConfigs::GainSchedErrorThreshold``, ``ClosedLoopGeneralConfigs::GainSchedKpBehavior``, and ``SlotConfigs::GainSchedBehavior``.

X44
^^^

Improvements to FOC have been made to improve peak performance.

Talon FXS
^^^^^^^^^

.. image:: images/generic-bldc.png
   :alt: Picture of a generic sensored BLDC

Our **non-FRC** customers can now utilize generic sensored (with hall effects) BLDC motors up to 24V on Talon FXS. This enables use cases for industrial motors in automation. Take a look at the ``Custom Brushless Motor`` configs for more information on how to configure this.

Phoenix Tuner X
---------------

Tuner has seen a number of new feature additions, bug fixes, and general improvements.

Elevator Mechanism Support
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/elevator-mechanism.png
   :alt: Picture of elevator homepage in Tuner

Under the Mechanisms page in Tuner X is the Elevator Generator. This utility guides the user through determining the necessary constants and configurations for a working Elevator subsystem. Take a read through the :doc:`relevant documentation pages </docs/tuner/tuner-elev/index>` for information on how this works!

Multi-device Control & Plot
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/tuner-multidevice-preview.png
   :alt: Picture of tuning a differential system in control & plot

One of the most asked features of Phoenix Tuner has been the ability to control and plot multiple devices simultaneously. We are proud to announce that this feature will now be available for the 2026 season. This page can be found in the left-hand sidebar.

Integrated Log Analysis (Beta)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/tuner-loganalyzer.png
   :alt: Picture of plotting a hoot log directly in Tuner

Hoot logs can now be directly plotted in Tuner. This feature is marked as beta as we continue to refine and improve the process. This page is available by going to :guilabel:`Tools` (magic wand in the sidebar) and then clicking on :guilabel:`Log Analyzer (Beta)`.

Feedback is welcome and can be submitted by sending us an `email <mailto:support@ctr-electronics.com>`__!

CANdle Animations Preview
^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: images/tuner-candle-preview.png
   :alt: Picture of tuner animations tab

The traditional control interface has been replaced with a CANdle animations tab, directly in Tuner. This allows you to have a real-time preview of the state of your LED strip and also includes generation functionality. The built-in generator will take your current CANdle animations and solid colors, and create a subsystem that you can implement in your robot program.

Miscellaneous Improvements
^^^^^^^^^^^^^^^^^^^^^^^^^^

Beyond the big ticket feature adds is loads of smaller enhancements throughout the application.

- Reworked the flyout to be minimized by default and show a flat list of icons.
- Reworked configs to be a nested menu. This improves the performance and makes it more reusable across the application.
- Added support for extracting and deleting folders on the Hoot Extractor page.
- Added batch licensing to device history.
