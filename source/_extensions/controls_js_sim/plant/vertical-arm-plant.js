class VerticalArmPlant {
  constructor(TimestepS) {
    this.TimestepS = TimestepS;

    // Gains estimated by ReCalc (http://reca.lc) with the specs below
    // motor: 1x Kraken x60
    // gearing: 50:1
    // efficiency: 100
    // arm length: 1 meter
    // arm mass: 5 kg
    this.kGAmps = 15;
    let Kt = 0.01981; // Nm/A torque constant -  Taken from Kraken Motor Performance Analysis Report

    let GEARBOX_RATIO = 1.0 / 50.0;
    let mass = 5;
    let radius = 1;

    this.C1 = 2 * Kt / (mass * radius * radius * GEARBOX_RATIO);
    this.C3 = 2 / (mass * radius * radius);

    this.systemNoise = false;
    // Simulate half volt std dev system noise at sim loop update frequency
    this.gaussianNoise = gaussian(0, 0.5);
  }
  init() {
    this.speed = 0;
    this.speedPrev = 0;
    this.curpositionRev = 0;
  }

  restrict(inAmps, supplyV) {
    // restrict output current based on supply voltage and back EMF
    let Rc = 0.0252; // Coil & Wiring Resistance in Ohms
    let maxRps = 100.0; // Max motor velocity in RPS

    let bemf = this.getCurrentSpeedRPS() * supplyV / maxRps;
    let maxCurrent = (supplyV - bemf) / Rc;
    let minCurrent = (-supplyV - bemf) / Rc;
    if (inAmps > maxCurrent) {
      inAmps = maxCurrent;
    } else if (inAmps < minCurrent) {
      inAmps = minCurrent;
    }

    return inAmps;
  }

  update(inAmps) {
    // Simulate friction - both static and dynamic
    let extTrq = 3.6; // 3.6 Nm of static friction (very sticky arm)
    extTrq += 0.0005 * this.speedPrev; // 0.0005 Nm of friction for every RPM it's spinning
    // Simulate system noise only if control input is outside 3 amps
    if (this.systemNoise && Math.abs(inAmps) > 3) {
      // apply system noise
      inAmps += this.gaussianNoise();
    }

    // Subract acceleration due to gravity
    inAmps -= this.kGAmps * Math.cos(this.curpositionRev * 2 * Math.PI);

    // Simulate main Plant behavior
    this.speed = (this.TimestepS * this.C1 * inAmps + this.speedPrev);
    let speedsign = Math.sign(this.speed);
    this.speed -= speedsign * this.TimestepS * this.C3 * extTrq;
    if (Math.sign(this.speed) != speedsign) {
      this.speed = 0;
    }

    this.curpositionRev += this.speed * this.TimestepS;

    this.speedPrev = this.speed;
  }

  getCurrentSpeedRPS() {
    return this.speed;
  }

  getCurrentPosition() {
    return this.curpositionRev;
  }

  setSystemNoise(enabled) {
    this.systemNoise = enabled;
  }
}
