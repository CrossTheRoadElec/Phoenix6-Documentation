class FlywheelSim extends BaseSim {
  constructor(div_id_prefix) {
    super(div_id_prefix, "RPS", 0, 100);

    this.simDurationS = 10.0;
    this.simulationTimestepS = 0.005;
    this.controllerTimestepS = 0.02;

    // User-configured setpoints
    this.setpointVal = 50.0;
    this.setpointStepTime = 1.0;

    this.plant = new FlywheelPlant();

    this.visualization = new FlywheelVisualization(this.visualizationDrawDiv);
    this.visualization.drawStatic();
  }

  resetCustom() {
    this.plant.init(this.simulationTimestepS);

    this.timeS = Array(this.simDurationS / this.simulationTimestepS)
      .fill()
      .map((_, index) => {
        return index * this.simulationTimestepS;
      });

    this.visualization.setCurPos(0.0);
    this.visualization.setCurOutput(0.0);
    this.visualization.setCurTime(0.0);
    this.visualization.setCurSetpoint(0.0);
    this.visualization.setCurControlEffort(0.0);

    this.inputVolts = 0.0;
    this.nextControllerRunTime = 0;

    this.iterationCount = 0;

    this.speed_delay_line = new DelayLine(3); //models sensor lag - this is minimal in Kraken firmware

  }



  iterateCustom() {

    this.curSimTimeS = this.iterationCount * this.simulationTimestepS;

    var currentSetpoint = 0.0;
    if (this.curSimTimeS > this.setpointStepTime) {
      currentSetpoint = this.setpointVal;
    }

    var meas_speed = this.speed_delay_line.getSample();

    //Simulate Controller
    if (this.curSimTimeS >= this.nextControllerRunTime) {
      this.inputVolts = this.controllerUpdate(this.curSimTimeS, currentSetpoint, meas_speed);
      //Maintain separate sample rate for controller
      this.nextControllerRunTime += this.controllerTimestepS;
    }

    this.inputVolts = this.plant.restrict(this.inputVolts, 12.0);
    this.plant.update(this.curSimTimeS, this.inputVolts);

    this.speed_delay_line.addSample(this.plant.getCurrentSpeedRPS());


    this.procVarActualSignal.addSample(new Sample(this.curSimTimeS, this.plant.getCurrentSpeedRPS()));
    this.procVarDesiredSignal.addSample(new Sample(this.curSimTimeS, currentSetpoint));
    this.ampsSignal.addSample(new Sample(this.curSimTimeS, this.inputVolts));

    this.visualization.setBallState(this.curSimTimeS > this.plant.getBallEnterTime());
    this.visualization.setCurPos(this.plant.getCurrentPositionRad());
    this.visualization.setCurOutput(this.plant.getCurrentSpeedRPS());
    this.visualization.setCurTime(this.curSimTimeS);
    this.visualization.setCurSetpoint(currentSetpoint);
    this.visualization.setCurControlEffort(this.inputVolts);

    this.iterationCount++;

    if (this.iterationCount >= this.timeS.length) {
      this.end();
    }

  }

}
