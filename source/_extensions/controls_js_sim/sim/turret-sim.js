class TurretSim extends BaseSim {
  constructor(divIdPrefix) {
    super(divIdPrefix, "Rot", -0.75, 0.75);

    this.positionDelayLine = new DelayLine(3); //models sensor lag

    this.simDurationS = 5.0;
    this.simulationTimestepS = 0.005;
    this.controllerTimestepS = 0.02;

    // User-configured setpoints
    this.currentSetpoint = 0.0;

    this.plant = new TurretPlant(this.simulationTimestepS);

    this.visualization = new TurretVisualization(
      this.visualizationDrawDiv,
      this.simulationTimestepS,
      () => this.iterationCount - 1,
      setpoint => this.setSetpoint(setpoint),
      () => this.begin()
    );
    this.visualization.drawStatic();

    this.timeSinceLastControllerIteration = 0.0;

    this.accumulatedError = 0.0;
    this.previousError = 0.0;

    this.validPrevious = false;

    //User-configured feedback
    this.kP = 0.0;
    this.kI = 0.0;
    this.kD = 0.0;

    //User-configured Feed-Forward
    this.kS = 0.0;

    this.inputAmps = 0.0;
    this.statorLimit = 300.0;

    this.resetCustom();
  }

  setSetpoint(setpoint) {
    this.currentSetpoint = setpoint;
    document.getElementById(this.divIdPrefix + "_setpoint").value = setpoint;
  }

  resetCustom() {
    this.plant.init();
    this.timeS = Array(this.simDurationS / this.simulationTimestepS)
      .fill()
      .map((_, index) => {
        return index * this.simulationTimestepS;
      });

    this.visualization.setCurPos(0.0);
    this.visualization.setCurTime(0.0);
    this.visualization.setCurSetpoint(0.0);
    this.visualization.setCurControlEffort(0.0);

    this.accumulatedError = 0.0;
    this.previousError = 0.0;
    this.validPrevious = false;
    this.inputAmps = 0.0;
    this.iterationCount = 0;

    this.positionDelayLine = new DelayLine(2); //models sensor lag

  }

  iterateCustom() {

    this.curSimTimeS = this.timeS[this.iterationCount];

    let measuredPositionRad = this.positionDelayLine.getSample();

    // Update controller at controller freq
    if (this.timeSinceLastControllerIteration >= this.controllerTimestepS) {
      this.inputAmps = this.updateController(this.currentSetpoint, measuredPositionRad);
      this.timeSinceLastControllerIteration = 0;
    } else {
      this.timeSinceLastControllerIteration = this.timeSinceLastControllerIteration + this.simulationTimestepS;
    }

    this.plant.update(this.inputAmps);

    this.positionDelayLine.addSample(this.plant.getCurrentPosition());

    this.procVarActualSignal.addSample(new Sample(this.curSimTimeS, this.plant.getCurrentPosition()));
    this.procVarDesiredSignal.addSample(new Sample(this.curSimTimeS, this.currentSetpoint));
    this.ampsSignal.addSample(new Sample(this.curSimTimeS, this.inputAmps));

    this.visualization.setCurPos(this.plant.getCurrentPosition());
    this.visualization.setCurTime(this.curSimTimeS);
    this.visualization.setCurSetpoint(this.currentSetpoint);
    this.visualization.setCurControlEffort(this.inputAmps);


    this.iterationCount++;

    if (this.iterationCount >= this.timeS.length) {
      this.end();
    }

  }

  updateController(setpoint, measurement) {

    // Calculate error, error derivative, and error integral
    let error = setpoint - measurement;

    this.accumulatedError += error * this.controllerTimestepS;

    let derivativeError =
      (error - this.previousError) / this.controllerTimestepS;

    if (this.validPrevious == false) {
      derivativeError = 0;
    }

    // PID + kS
    let controlEffortAmps =
      this.kS * Math.sign(error) +
      this.kP * error +
      this.kI * this.accumulatedError +
      this.kD * derivativeError;

    // Cap voltage at max/min of the physically possible command
    if (controlEffortAmps > this.statorLimit) {
      controlEffortAmps = this.statorLimit;
    } else if (controlEffortAmps < -this.statorLimit) {
      controlEffortAmps = -this.statorLimit;
    }

    this.previousError = error;
    this.validPrevious = true;

    return controlEffortAmps;
  }

}
