class FlywheelPlant{

    constructor() {

        // Constants related to plant model
        // Flywheel

        let mass = 0.55; //shooter wheel mass in Kg
        let radius = 0.0762; //3 inch radius, converted to meters

        // Gearbox
        let GEARBOX_RATIO = 1.0/1.0; // output over input - 1:1 direct-drive gear ratio

        // Kraken FOC Torque-Constant
        let Kt = 0.01981; // Nm/A torque constant -  Taken from Kraken Motor Performance Analysis Report

        // TODO: better comment and descriptive variable naming
        // Constants from the blog post equations
        this.C1 = 2 * Kt / (mass * radius * radius * GEARBOX_RATIO);
        this.C3 = 2 / (mass * radius * radius);

        this.systemNoise = false;
        // Simulate 4 volt std dev system noise at the loop update frequency
        this.gaussianNoise = gaussian(0, 4);
    }

    init(Ts) {
        this.speed = 0;
        this.speedPrev = 0;
        this.curpositionRev = 0;
        this.Ts = Ts;
        this.ballEnterTime = 5.0;
        this.ballExitTime = null; // gets filled out if the ball does indeed exit in this sim.
        this.ballEnterWheelAngle = null;
    }

    update(t, inAmps) {
        //Simulate friction - both static and dynamic
        let extTrq = 0.005; // 0.005 Nm of static friction
        extTrq += 0.0005*this.speedPrev; // 0.0005 Nm of friction every RPM it speeds up

        // Simulate system noise
        if (this.systemNoise && inAmps > 0) {
            // apply system noise
            inAmps += this.gaussianNoise();
        }

        if (t > this.ballEnterTime & this.ballExitTime == null){
            // ball is in contact with the flywheel

            if (this.ballEnterWheelAngle == null) {
                // First loop, init the enter angle
                this.ballEnterWheelAngle = this.curpositionRev;
            }

            if (this.curpositionRev > this.ballEnterWheelAngle + 0.25) {
                // ball has just exited the flywheel.
                this.ballExitTime = t;
            } else {
                // ball is exerting force on the shooter wheel
                extTrq += this.speedPrev * 0.008;
            }
        }

        // Simulate main Plant behavior
        this.speed = (this.Ts*this.C1*inAmps - this.Ts*this.C3*extTrq + this.speedPrev);
        if(this.speed < 0) {
            this.speed = 0;
        }

        this.curpositionRev += this.speed / 2.0 / Math.PI * this.Ts;

        this.speedPrev = this.speed;

    }

    getCurrentSpeedRPS() {
        return this.speed/2/Math.PI;
    }

    getCurrentPositionRad() {
        return this.curpositionRev * 2.0 * Math.PI;
    }


    getBallEnterTime() {
        return this.ballEnterTime;
    }

    setSystemNoise(enabled) {
        this.systemNoise = enabled;
    }
}