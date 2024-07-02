class TurretPlant {
    constructor(TimestepS) {
        this.TimestepS = TimestepS;

        // Constants related to plant model
        // Flywheel

        let mass = 10; //Turret wheel mass in Kg
        let radius = 0.2032; //8 inch radius, converted to meters

        // Gearbox
        let GEARBOX_RATIO = 1.0 / 20.0; // output over input - 1:20 reduction gear ratio

        // Kraken FOC Torque-Constant
        let Kt = 0.01981; // Nm/A torque constant -  Taken from Kraken Motor Performance Analysis Report

        // TODO: better comment and descriptive variable naming
        // Constants from the blog post equations
        this.C1 = 2 * Kt / (mass * radius * radius * GEARBOX_RATIO);
        this.C3 = 2 / (mass * radius * radius);

        this.systemNoise = false;
        // Simulate 4 amp std dev system noise at the loop update frequency
        this.gaussianNoise = gaussian(0, 4);
    }
    init() {
        this.speed = 0;
        this.speedPrev = 0;
        this.curpositionRev = 0;
        this.ballEnterTime = 5.0;
        this.ballExitTime = null; // gets filled out if the ball does indeed exit in this sim.
        this.ballEnterWheelAngle = null;
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
        let extTrq = 0.05; // 0.05 Nm of static friction
        extTrq += 0.0005*this.speedPrev; // 0.0005 Nm of friction for every RPM it's spinning
        // Simulate system noise only if control input is outside 3 amps
        if (this.systemNoise && Math.abs(inAmps) > 3) {
            // apply system noise
            inAmps += this.gaussianNoise();
        }

        // Simulate main Plant behavior
        this.speed = (this.TimestepS*this.C1*inAmps + this.speedPrev);
        let speedsign = Math.sign(this.speed);
        this.speed -= speedsign * this.TimestepS*this.C3*extTrq;
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
