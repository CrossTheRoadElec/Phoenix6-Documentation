Swerve Next Steps
=================

Now that you have a working swerve drive, you may want to explore some of the following topics.

Setting Current Limits
----------------------

Current limits are an important part of battery management. The following represents a short example of setting the stator/slip current limit and the supply current limit of the drive motors in a Tuner generated swerve project. To determine the correct current limits, and understand what they do and how they affect robot control, please refer to :doc:`Improving Performance with Current Limits </docs/hardware-reference/talonfx/improving-performance-with-current-limits>`.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/da029fc9676412dc9a24e3e2e3a3e4d6d71d5107/java/SwerveWithPathPlanner/src/main/java/frc/robot/generated/TunerConstants.java
         :language: java
         :lines: 52-65
         :linenos:
         :lineno-start: 1

   .. tab-item:: C++
      :sync: C++

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/da029fc9676412dc9a24e3e2e3a3e4d6d71d5107/cpp/SwerveWithPathPlanner/src/main/include/generated/TunerConstants.h
         :language: cpp
         :lines: 47-60
         :linenos:
         :lineno-start: 1

   .. tab-item:: Python
      :sync: python

      .. rli:: https://raw.githubusercontent.com/CrossTheRoadElec/Phoenix6-Examples/da029fc9676412dc9a24e3e2e3a3e4d6d71d5107/python/SwerveWithPathPlanner/generated/tuner_constants.py
         :language: python
         :lines: 58-70
         :linenos:
         :lineno-start: 1
