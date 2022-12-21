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

The following configs are exposed:

- Yaw Error About X
- Yaw Error About Y
- Yaw Error About Z
