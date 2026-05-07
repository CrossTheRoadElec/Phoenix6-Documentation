class VerticalArmPlant {
    constructor(TimestepS) {
        this.TimestepS = TimestepS;

        // Constants related to plant model
        // Vertical Arm

        let mass = 5; // Arm mass in kg
        let length = 1; // 1 meter length, converted to meters

        // Gearbox
        this.GEARBOX_RATIO = 1.0 / 35.0; // output over input - 1:35 reduction gear ratio

        // Kraken FOC Torque-Constant
        let Kt = 0.01981; // Nm/A torque constant -  Taken from Kraken Motor Performance Analysis Report
        this.kGAmps = 25;

        // TODO: better comment and descriptive variable naming
        // Constants from the blog post equations
        this.C1 = 3 * Kt / (mass * length * length * this.GEARBOX_RATIO);
        this.C3 = 3 / (mass * length * length);

        this.systemNoise = false;
        // Simulate 4 A std dev system noise at sim loop update frequency
        this.gaussianNoise = gaussian(0, 4);
    }
    init() {
        this.speed = 0;
        this.speedPrev = 0;
        this.curpositionRev = 0;
    }

    restrict(inAmps, supplyV) {
        // restrict output current based on supply voltage and back EMF
        let Rc = 0.0252; // Coil & Wiring Resistance in Ohms
        let maxRps = 96.4; // Max motor velocity in RPS

        let bemf = this.getCurrentSpeedRPS() / this.GEARBOX_RATIO * supplyV / maxRps;
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
        let extTrq = 2.5; // 2 Nm of static friction (very sticky arm)
        extTrq += 0.0005 * this.speedPrev; // 0.0005 Nm of friction for every RPM it's spinning

        // Increase friction when not moving to simulate static friction
        if (this.speedPrev == 0) {
            extTrq = 2.6;
        }

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

        this.curpositionRev += this.speed / 2.0 / Math.PI * this.TimestepS;

        this.speedPrev = this.speed;
    }

    getCurrentSpeedRPS() {
        return this.speed/2/Math.PI;
    }

    getCurrentPosition() {
        return this.curpositionRev;
    }

    setSystemNoise(enabled) {
        this.systemNoise = enabled;
    }
}
