class ProfiledSim extends BaseProfiledSim {
  constructor(divIdPrefix) {
    super(divIdPrefix, "Rot", -0.75, 0.75);

    this.positionDelayLine = new DelayLine(3); //models sensor lag

    this.simDurationS = 10.0;
    this.simulationTimestepS = 0.01;
    this.controllerTimestepS = 0.01;

    // User-configured setpoints
    this.currentSetpoint = 0.0;

    this.plant = new TurretPlant(this.simulationTimestepS, false);

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
    this.previousVelocity = 0.0;

    this.validPrevious = false;

    //User-configured feedback
    this.kP = 0.0;
    this.kI = 0.0;
    this.kD = 0.0;

    //User-configured Feed-Forwards
    this.kS = 0.0;
    this.kV = 0.0;
    this.kA = 0.0;

    this.inputAmps = 0.0;
    this.statorLimit = 120.0;

    this.profile = Profile1Data.profileData;

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
    this.previousPosition = 0.0;
    this.previousVelocity = 0.0;
    this.validPrevious = false;
    this.inputAmps = 0.0;
    this.iterationCount = 0;

    this.positionDelayLine = new DelayLine(2); //models sensor lag

  }

  iterateCustom() {

    this.curSimTimeS = this.timeS[this.iterationCount];

    let measuredPosition = this.positionDelayLine.getSample();
    let measuredVelocity = (measuredPosition - this.previousPosition) / this.controllerTimestepS;
    let measuredAcceleration = (measuredVelocity - this.previousVelocity) / this.controllerTimestepS;

    let profileIteration = Math.floor(this.curSimTimeS * 100);
    if (profileIteration >= this.profile.length) profileIteration = this.profile.length - 1;
    let targets = this.profile[profileIteration];

    // Update controller at controller freq
    if (this.timeSinceLastControllerIteration >= this.controllerTimestepS) {
      this.inputAmps = this.updateController(targets["Position"], targets["Velocity"], targets["Acceleration"], measuredPosition, measuredVelocity, measuredAcceleration);
      this.timeSinceLastControllerIteration = 0;
    } else {
      this.timeSinceLastControllerIteration = this.timeSinceLastControllerIteration + this.simulationTimestepS;
    }

    this.inputAmps = this.plant.restrict(this.inputAmps, 12.0);
    this.plant.update(this.inputAmps);

    this.positionDelayLine.addSample(this.plant.getCurrentPosition());

    this.procVarActualSignal.addSample(new Sample(this.curSimTimeS, this.plant.getCurrentPosition()));
    this.procVarDesiredSignal.addSample(new Sample(this.curSimTimeS, targets["Position"]));
    this.procVelocity.addSample(new Sample(this.curSimTimeS, targets["Velocity"]));
    this.measVelocity.addSample(new Sample(this.curSimTimeS, measuredVelocity));
    this.procAcceleration.addSample(new Sample(this.curSimTimeS, targets["Acceleration"]));
    this.measAcceleration.addSample(new Sample(this.curSimTimeS, measuredAcceleration));
    this.ampsSignal.addSample(new Sample(this.curSimTimeS, this.inputAmps));

    this.visualization.setCurPos(this.plant.getCurrentPosition());
    this.visualization.setCurTime(this.curSimTimeS);
    this.visualization.setCurSetpoint(targets["Position"]);
    this.visualization.setCurControlEffort(this.inputAmps);

    this.previousPosition = measuredPosition;
    this.previousVelocity = measuredVelocity;

    this.iterationCount++;

    if (this.iterationCount >= this.timeS.length) {
      this.end();
    }

  }

  updateController(setpoint, velocity, acceleration, measurement, measuredVelocity, measuredAcceleration) {

    // Calculate error, error derivative, and error integral
    let error = setpoint - measurement;

    this.accumulatedError += error * this.controllerTimestepS;

    let derivativeError = velocity - measuredVelocity;

    if (this.validPrevious == false) {
      derivativeError = 0;
    }

    // PID + kS
    let controlEffortAmps =
      this.kS * Math.sign(velocity) +
      this.kV * velocity +
      this.kA * acceleration +
      this.kP * error +
      this.kI * this.accumulatedError +
      this.kD * derivativeError;

    // Cap voltage at max/min of the physically possible command
    if (controlEffortAmps > this.statorLimit) {
      controlEffortAmps = this.statorLimit;
    } else if (controlEffortAmps < -this.statorLimit) {
      controlEffortAmps = -this.statorLimit;
    }

    this.validPrevious = true;

    return controlEffortAmps;
  }

}
