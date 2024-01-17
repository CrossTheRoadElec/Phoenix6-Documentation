Plumbing & Running SysId
========================

For the purpose of this documentation, we focus on integration of Phoenix and WPILib SysId to characterize common mechanisms. Detailed documentation on the SysId routines can be found `here <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/introduction.html>`__.

To get started, users must construct a ``SysIdRoutine`` that defines a ``Config`` and ``Mechanism``. The ``Config`` constructor allows the users to define the logging state callback, ramp rate, and other options when running the tests.

The ``Mechanism`` constructor takes a lambda that has ``Voltage`` as a parameter. This lambda is ran when the characterization is performed and what actually causes the mechanism to move. We utilize the parameter provided in the lambda, and pass that as double voltage to a ``VoltageOut`` request. The second argument to the constructor is a logging callback. Since the Phoenix ``SignalLogger`` has much higher accuracy than user-mode logging, we pass ``null``. The last parameter is just an instance of the ``Subsystem`` we are currently in.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block::

         TalonFX m_motor = new TalonFX(0);

         VoltageOut m_voltReq = new VoltageOut(0.0);

         private SysIdRoutine m_sysidRoutine =
            new SysIdRoutine(
               new SysIdRoutine.Config(
                  null,
                  Volts.of(7),
                  null,
                  (state)->SignalLogger.writeString("state", state.toString())
               ),
               new SysIdRoutine.Mechanism(
                  (volts)->m_motor.setControl(m_voltReq.withOutput(volts.in(Volts))),
                  null,
                  this));

Now that the routine has been plumbed, we need to expose some commands to perform characterization

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         public Command sysIdQuasistatic(SysIdRoutine.Direction direction) {
            return m_sysidRoutine.quasistatic(direction);
         }

         public Command sysIdDynamic(SysIdRoutine.Direction direction) {
            return m_sysidRoutine.dynamic(direction);
         }

and then bind to these commands from ``RobotContainer``.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         m_joystick.leftBumper().whenPressed(Commands.run(() -> SignalLogger.start()));
         m_joystick.rightBumper().whenPressed(Commands.run(() -> SignalLogger.stop()));

         /**
         * Joystick Y = quasistatic forward
         * Joystick B = dynamic forward
         * Joystick A = quasistatic reverse
         * Joystick X = dyanmic reverse
         */
         m_joystick.y().whileTrue(m_mechanism.sysIdQuasistatics(SysIdRoutine.Direction.kForward));
         m_joystick.a().whileTrue(m_mechanism.sysIdQuasistatic(SysIdRoutine.Direction.kReverse));
         m_joystick.b().whileTrue(m_mechanism.sysIdDynamic(SysIdRoutine.Direction.kForward));
         m_joystick.x().whileTrue(m_mechanism.sysIdDynamic(SysIdRoutine.Direction.kReverse));

It's important that the user starts and stops the logger after the tests have been ran. This will ensure a log is not cluttered with data from other actions such as driving the robot to an open area.

.. note:: Consult the `WPILib documentation <https://docs.wpilib.org/en/stable/docs/software/advanced-controls/system-identification/index.html>`__ for additional details on mechanism characterization.

Before Characterization
-----------------------

There are a couple of important things to consider before running the characterization tests.

**Characterization Can Be Dangerous:**

.. danger:: Always use caution when mechanisms are moving and ensure that the robot can be disabled swiftly at any time!

- Since characterization applies a scaling (quasistatic) or constant (dynamic) voltage to the motor, it can very easily hit a wall (drivetrain) or break the mechanism (elevator) if unprepared. Ensure that the ramp rate is set appropriately and adequate space is given (15m recommended for drivetrain) for the tests.

**Ensure Adequate Space**

- If the mechanism is continuous (swerve azimuth or a flywheel), then this isn't an issue. Mechanisms such as a drivetrain or elevator have a limited degree of movement. Ensure the configuration parameters match what is possible, and be prepared to disable the robot early.

**Only Run Each Test Once**

- Limitations of the SysId desktop utility prevent multiple of the same tests to be properly analyzed. Ensure each test is analyzed once.

Running Characterization
------------------------

The quasistatic test will slowly ramp up voltage until the button has been released or a timeout has been hit. It's always safe to end the tests early, but at least ~3-5 seconds of data is necessary. Ensure ramp rate is configured such that this can be accomplished.

The dynamic test will immediately run the mechanism at the target voltage. This voltage may need to be adjusted if there is not sufficient room for the test.


Now that the routines have been configured and buttons have been binded, the characterization tests can be performed. To keep things simple and debuggable, perform tests in the following order.

1. Quasistatic forward
2. Quasistatic reverse
3. Dynamic forward
4. Dynamic reverse

Ensure each test is ran once, and only once. If a test is accidentally started multiple times, stop and restart the logger and try again.
