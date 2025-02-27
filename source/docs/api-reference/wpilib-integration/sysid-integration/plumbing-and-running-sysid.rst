Plumbing & Running SysId
========================

For the purpose of this documentation, we focus on the integration of Phoenix 6 and WPILib's SysId API to characterize common mechanisms. Detailed documentation on the SysId routines can be found `here <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html>`__.

To get started, users must construct a ``SysIdRoutine`` that defines a ``Config`` and ``Mechanism``.

The ``Config`` constructor allows the users to define the voltage ramp rate, dynamic step voltage, characterization timeout, and a lambda that accepts the ``SysIdRoutineLog.State`` for logging. The lambda needs to be overridden to log the State string using the :doc:`Phoenix 6 Signal Logger </docs/api-reference/api-usage/signal-logging>`.

The ``Mechanism`` constructor takes a lambda accepts a ``Measure<Voltage>``. This lambda is used to apply the voltage request to the motors during characterization, which can be done using a ``VoltageOut`` request. The second argument to the constructor is a logging callback; this is left ``null`` when using the Signal Logger, as all signals are logged automatically. The last parameter is a reference to this ``Subsystem``.

Putting this all together results in the example shown below.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         private final TalonFX m_motor = new TalonFX(0);
         private final VoltageOut m_voltReq = new VoltageOut(0.0);

         private final SysIdRoutine m_sysIdRoutine =
            new SysIdRoutine(
               new SysIdRoutine.Config(
                  null,        // Use default ramp rate (1 V/s)
                  Volts.of(4), // Reduce dynamic step voltage to 4 to prevent brownout
                  null,        // Use default timeout (10 s)
                               // Log state with Phoenix SignalLogger class
                  (state) -> SignalLogger.writeString("state", state.toString())
               ),
               new SysIdRoutine.Mechanism(
                  (volts) -> m_motor.setControl(m_voltReq.withOutput(volts.in(Volts))),
                  null,
                  this
               )
            );

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         hardware::TalonFX m_motor{0};
         controls::VoltageOut m_voltReq{0_V};

         frc2::sysid::SysIdRoutine m_sysIdRoutine{
            frc2::sysid::Config{
               std::nullopt,  // Use default ramp rate (1 V/s)
               4_V,           // Reduce dynamic step voltage to 4 to prevent brownout
               std::nullopt,  // Use default timeout (10 s)
                              // Log state with Phoenix SignalLogger class
               [](frc::sysid::State state)
               {
                  SignalLogger::WriteString("state", frc::sysid::SysIdRoutineLog::StateEnumToString(state));
               }
            },
            frc2::sysid::Mechanism{
               [this](units::volt_t volts) { m_motor.SetControl(m_voltReq.WithOutput(volts)); },
               [](auto) {},
               this
            }
         };

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         self.motor = hardware.TalonFX(0)
         self.voltage_req = controls.VoltageOut(0)

         self.sys_id_routine = SysIdRoutine(
            SysIdRoutine.Config(
               # Use default ramp rate (1 V/s) and timeout (10 s)
               # Reduce dynamic voltage to 4 to prevent brownout
               stepVoltage = 4.0,
               # Log state with Phoenix SignalLogger class
               recordState = lambda state: SignalLogger.write_string("state", SysIdRoutineLog.stateEnumToString(state))
            ),
            SysIdRoutine.Mechanism(
               lambda volts: self.motor.set_control(self.voltage_req.with_output(volts)),
               lambda log: None,
               self
            )
         )

Now that the routine has been plumbed, the characterization commands need to be exposed from the subsystem.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public Command sysIdQuasistatic(SysIdRoutine.Direction direction) {
            return m_sysIdRoutine.quasistatic(direction);
         }

         public Command sysIdDynamic(SysIdRoutine.Direction direction) {
            return m_sysIdRoutine.dynamic(direction);
         }

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         frc2::CommandPtr SysIdQuasistatic(frc2::sysid::Direction direction)
         {
            return m_sysIdRoutine.Quasistatic(direction);
         }

         frc2::CommandPtr SysIdDynamic(frc2::sysid::Direction direction)
         {
            return m_sysIdRoutine.Dynamic(direction);
         }

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         def sys_id_quasistatic(self, direction: SysIdRoutine.Direction) -> Command:
            return self.sys_id_routine.quasistatic(direction)

         def sys_id_dynamic(self, direction: SysIdRoutine.Direction) -> Command:
            return self.sys_id_routine.dynamic(direction)

From there, the program can bind buttons to these commands in ``RobotContainer``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         m_joystick.leftBumper().onTrue(Commands.runOnce(SignalLogger::start));
         m_joystick.rightBumper().onTrue(Commands.runOnce(SignalLogger::stop));

         /*
          * Joystick Y = quasistatic forward
          * Joystick A = quasistatic reverse
          * Joystick B = dynamic forward
          * Joystick X = dyanmic reverse
          */
         m_joystick.y().whileTrue(m_mechanism.sysIdQuasistatic(SysIdRoutine.Direction.kForward));
         m_joystick.a().whileTrue(m_mechanism.sysIdQuasistatic(SysIdRoutine.Direction.kReverse));
         m_joystick.b().whileTrue(m_mechanism.sysIdDynamic(SysIdRoutine.Direction.kForward));
         m_joystick.x().whileTrue(m_mechanism.sysIdDynamic(SysIdRoutine.Direction.kReverse));

   .. tab-item:: C++
      :sync: C++

      .. code-block:: cpp

         m_joystick.LeftBumper().OnTrue(frc2::cmd::RunOnce(SignalLogger::Start));
         m_joystick.RightBumper().OnTrue(frc2::cmd::RunOnce(SignalLogger::Stop));

         /*
          * Joystick Y = quasistatic forward
          * Joystick A = quasistatic reverse
          * Joystick B = dynamic forward
          * Joystick X = dynamic reverse
          */
         m_joystick.Y().WhileTrue(m_mechanism.SysIdQuasistatic(frc2::sysid::Direction::kForward));
         m_joystick.A().WhileTrue(m_mechanism.SysIdQuasistatic(frc2::sysid::Direction::kReverse));
         m_joystick.B().WhileTrue(m_mechanism.SysIdDynamic(frc2::sysid::Direction::kForward));
         m_joystick.X().WhileTrue(m_mechanism.SysIdDynamic(frc2::sysid::Direction::kReverse));

   .. tab-item:: Python
      :sync: Python

      .. code-block:: python

         self.joystick.leftBumper().onTrue(cmd.runOnce(SignalLogger.start))
         self.joystick.rightBumper().onTrue(cmd.runOnce(SignalLogger.stop))

         # Joystick Y = quasistatic forward
         # Joystick A = quasistatic reverse
         # Joystick B = dynamic forward
         # Joystick X = dynamic reverse
         self.joystick.y().whileTrue(self.mechanism.sys_id_quasistatic(SysIdRoutine.Direction.kForward))
         self.joystick.a().whileTrue(self.mechanism.sys_id_quasistatic(SysIdRoutine.Direction.kReverse))
         self.joystick.b().whileTrue(self.mechanism.sys_id_dynamic(SysIdRoutine.Direction.kForward))
         self.joystick.x().whileTrue(self.mechanism.sys_id_dynamic(SysIdRoutine.Direction.kReverse))

All four tests must be run and captured in a single log file. As a result, it is important that the user starts the Signal Logger before running the tests and stops the Signal Logger after all tests have been completed. This will ensure the log is not cluttered with data from other actions such as driving the robot to an open area.

.. note:: Consult the `WPILib documentation <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/index.html>`__ for additional details on mechanism characterization.

Before Characterization
-----------------------

There are a couple of important things to consider before running the characterization tests.

**Characterization Can Be Dangerous:**

.. danger:: Always use caution when mechanisms are moving and ensure that the robot can be disabled swiftly at any time!

- Since characterization applies a scaling (quasistatic) or constant (dynamic) voltage to the motor, it can very easily hit a wall (drivetrain) or break the mechanism (elevator) if unprepared. Ensure that the ramp rate is set appropriately and adequate space is given (15m recommended for drivetrain) for the tests.

**Ensure Adequate Space**

- If the mechanism is continuous (swerve azimuth or a flywheel), then this is not an issue. However, mechanisms such as a drivetrain or elevator have a limited degree of movement. Ensure the configuration parameters match what is possible, and be prepared to disable the robot early.

**Only Run Each Test Once**

- Limitations of the SysId desktop utility prevent multiple of the same tests to be properly analyzed. Ensure each test is run exactly once.

Running Characterization
------------------------

The quasistatic test will slowly ramp up voltage until the button has been released or a timeout has been hit. It is always safe to end the tests early, but at least ~3-5 seconds of data is necessary. Ensure ramp rate is configured such that this can be accomplished.

The dynamic test will immediately run the mechanism at the target voltage. This voltage may need to be adjusted if there is not sufficient room for the test.

With the routines configured and buttons set up, the characterization tests can be performed. To keep things simple and debuggable, perform tests in the following order.

1. Quasistatic forward
2. Quasistatic reverse
3. Dynamic forward
4. Dynamic reverse

Ensure each test is ran once, and only once. If a test is accidentally started multiple times, stop and restart the Signal Logger and try again.

Once you have a log with all the tests, you can use Tuner X or the :ref:`owlet CLI tool <docs/api-reference/api-usage/signal-logging:converting signal logs>` to :doc:`extract the hoot log to WPILOG </docs/tuner/tools/log-extractor>`. The exported WPILOG can then be `loaded into SysId <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/loading-data.html>`__ for analysis using the Talon FX ``Position``, ``Velocity``, and ``MotorVoltage`` signals.

.. important:: We recommend against using third-party tools to export a hoot log to WPILOG. Doing so may result in a lossy conversion that impacts the quality of the SysId analysis. This is particularly true in simulation, where a lossy export can result in SysId failing to analyze the data.
