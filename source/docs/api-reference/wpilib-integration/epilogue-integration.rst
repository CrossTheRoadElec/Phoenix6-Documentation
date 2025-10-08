Annotation Logging with Epilogue
================================

WPILib provides an annotation logger library called `Epilogue <https://docs.wpilib.org/en/stable/docs/software/telemetry/robot-telemetry-with-annotations.html>`__ that can be easily integrated by adding ``HootEpilogueBackend`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/HootEpilogueBackend.html>`__) to the list of Epilogue backends.

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
