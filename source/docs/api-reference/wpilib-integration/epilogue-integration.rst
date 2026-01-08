Annotation Logging with Epilogue
================================

In a WPILib Java robot project, the ``HootEpilogueBackend`` (`Java <https://api.ctr-electronics.com/phoenix6/stable/java/com/ctre/phoenix6/HootEpilogueBackend.html>`__) can be used to integrate the Phoenix 6 :doc:`Signal Logger </docs/api-reference/api-usage/signal-logging>` with `Epilogue <https://docs.wpilib.org/en/stable/docs/software/telemetry/robot-telemetry-with-annotations.html>`__. This makes it easy to register custom signals for logging using Java annotations.

.. code-block:: java

   @Logged
   public class Robot extends TimedRobot {
      public Robot() {
         Epilogue.configure(config -> {
            // Log to both the Phoenix 6 SignalLogger
            // and NT4 backends
            config.backend = EpilogueBackend.multi(
               new HootEpilogueBackend(),
               new NTEpilogueBackend(NetworkTableInstance.getDefault())
            );

            if (Utils.isSimulation()) {
               // Re-throw any errors that occur in simulation
               config.errorHandler = ErrorHandler.crashOnError();
            }

            // ...
         });
         Epilogue.bind(this);
      }
   }
