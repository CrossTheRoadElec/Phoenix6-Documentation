class BaseProfiledSim extends BaseSim {
  constructor(divIdPrefix, processVariableUnits) {
    super(divIdPrefix, processVariableUnits);

    this.procVelocity = new Signal("Velocity", processVariableUnits + "/s");
    this.procAcceleration = new Signal("Acceleration", processVariableUnits + "/s²");
    this.procVarPlot.addSignal(this.procVelocity, "blue");
    this.procVarPlot.addSignal(this.procAcceleration, "yellow");
    this.procVarPlot.setNumValueAxes(2);
  }
  begin() {
    super.begin();
    this.procVelocity.clearValues();
    this.procAcceleration.clearValues();
  }
}