Pigeon 2.0 Configs
==================

This article highlights the configs specific to the Pigeon 2.0 and how they are intended to be used.

The Pigeon 2.0 has 3 config groups exclusive to this device

- Feature Enable/Disable

  - Enable and disable various Pigeon 2 features

- Mounting Orientation

  - Mounting orientation configurations

- Gyro Sensitivities

  - Scaling the Gyro for enhanced sensitivity

Feature Enable/Disable
----------------------

.. warning:: The below configs are primarily for internal testing or non-FRC usage. It is not recommended to modify these unless directed by CTR-Electronics support.

The following configs are exposed:

- Disable No Motion Calibration
- Disable Temperature Compensation
- Enable Compass

Mounting Orientation
--------------------

Mounting Orientation config group contains the configs used to manually set offsets to Pitch, Roll or Yaw. If the user has performed calibration, then the values should be non-zero and not be modified, unless a manual offset is preferred.

The following configs are exposed:

- Pitch Pose
- Roll Pose
- Yaw Pose

Gyro Sensitivity
----------------

.. important:: Configuring gyro sensitivity is typically not necessary in FRC robot applications.

While the Pigeon is factory calibrated, sensitivity precision can be application dependent. The following test procedure can be used for determining gyroscope sensitivity error:

1. First drive or push the robot to an immmoveable flat obstacle. A wall works best.
2. Zero the yaw and accumulated gyro Z
3. Drive the robot in a zero turn at max speed for 10 rotations.
4. Drive back up against the obstacle and read Yaw. It should be 3600 (plus/minus expected drift).
5. Drive the robot in a zero turn at max speed in the opposite direction for 10 rotations.
6. Drive backup up against the obstacle (wall) and read Yaw. Reported Yaw should be 0 (plus/minus expected drift).

The below table can be used to determine if sensitivity error is likely:

+---------------------------+---------------------------+----------------------------+
|                           | **Step 4:** Error is low  | **Step 4:** Error is high  |
+===========================+===========================+============================+
| **Step 6:** Error is low  | No error                  | Possible error             |
| **Step 6:** Error is high | Inconclusive              | Inconclusive               |
+---------------------------+---------------------------+----------------------------+

In the situation that the IMU reports that the reported Yaw traveled from ``0`` deg to ``-3602`` deg but the gyro mechanically traveled `-3600` deg, there is an overshoot by 2 degrees. The user would set the :guilabel:`Yaw Error About Z` to ``0.2`` (deg per rotation). Always retest to ensure accuracy has improved.

The following configs are exposed:

- Yaw Error About X
- Yaw Error About Y
- Yaw Error About Z
