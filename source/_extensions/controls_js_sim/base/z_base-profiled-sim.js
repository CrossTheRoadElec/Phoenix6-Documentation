class BaseProfiledSim extends BaseSim {
  constructor(divIdPrefix, processVariableUnits) {
    super(divIdPrefix, processVariableUnits);

    this.procVelocity = new Signal("Velocity", processVariableUnits + "/s");
    this.measVelocity = new Signal("MeasVelocity", processVariableUnits + "/s");
    this.procAcceleration = new Signal("Acceleration", processVariableUnits + "/s²");
    this.measAcceleration = new Signal("MeasAcceleration", processVariableUnits + "/s²");
    this.procVarPlot.addSignal(this.procVelocity, "blue");
    this.procVarPlot.addSignal(this.measVelocity, "brown");
    this.procVarPlot.addSignal(this.procAcceleration, "yellow");
    this.procVarPlot.addSignal(this.measAcceleration, "orange");
    this.procVarPlot.setNumValueAxes(2);
  }
  begin() {
    super.begin();
    this.procVelocity.clearValues();
    this.measVelocity.clearValues();
    this.procAcceleration.clearValues();
    this.measAcceleration.clearValues();
  }
}