API Structure
=============

Phoenix 6 uses a separate, simpler set of namespaces and packages from Phoenix 5.

.. note:: For more information about the structure of Phoenix 6, see :doc:`/docs/api-reference/api-usage/api-overview`.

.. list-table::
   :width: 100%
   :widths: 1 99

   * - .. centered:: v5
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: Java

               // Phoenix 5 is in the com.ctre.phoenix.* packages
               import com.ctre.phoenix.motorcontrol.can.WPI_TalonFX;
               import com.ctre.phoenix.motorcontrol.TalonFXConfiguration;
               import com.ctre.phoenix.motorcontrol.TalonFXControlMode;
               import com.ctre.phoenix.motorcontrol.TalonFXInvertType;
               import com.ctre.phoenix.motorcontrol.TalonFXSimCollection;
               import com.ctre.phoenix.sensors.CANCoderConfiguration;
               import com.ctre.phoenix.sensors.WPI_CANCoder;

               // WPI_* for WPILib integration
               final WPI_TalonFX m_talonFX = new WPI_TalonFX(0);
               final WPI_CANCoder m_cancoder = new WPI_CANCoder(0);

               final TalonFXSimCollection m_talonFXSim = m_talonFX.getSimCollection();

               final TalonFXConfiguration m_talonConfig = new TalonFXConfiguration();
               final CANCoderConfiguration m_cancoderConfig = new CANCoderConfiguration();

               TalonFXInvertType m_talonFXInverted = TalonFXInvertType.CounterClockwise;

               m_talonFX.set(TalonFXControlMode.PercentOutput, 0);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Phoenix 5 is in the ctre/phoenix headers
               #include "ctre/phoenix/motorcontrol/can/WPI_TalonFX.h"
               #include "ctre/phoenix/sensors/WPI_CANCoder.h"

               // Phoenix 5 uses the ctre::phoenix namespace
               using namespace ctre::phoenix;

               // WPI_* for WPILib integration
               motorcontrol::can::WPI_TalonFX m_talonFX{0};
               sensors::WPI_CANCoder m_cancoder{0};

               motorcontrol::TalonFXSimCollection& m_talonFXSim{m_talonFX.GetSimCollection()};

               motorcontrol::TalonFXConfiguration m_talonConfig{};
               sensors::CANCoderConfiguration m_cancoderConfig{};

               motorcontrol::TalonFXInvertType m_talonFXInverted{motorcontrol::TalonFXInvertType::CounterClockwise};

               m_talonFX.Set(motorcontrol::TalonFXControlMode::PercentOutput, 0);

   * - .. centered:: v6
     - .. tab-set::

         .. tab-item:: Java
            :sync: Java

            .. code-block:: java

               // Phoenix 6 is in the com.ctre.phoenix6.* packages
               import com.ctre.phoenix6.configs.CANcoderConfiguration;
               import com.ctre.phoenix6.configs.TalonFXConfiguration;
               import com.ctre.phoenix6.controls.DutyCycleOut;
               import com.ctre.phoenix6.hardware.CANcoder;
               import com.ctre.phoenix6.hardware.TalonFX;
               import com.ctre.phoenix6.signals.InvertedValue;
               import com.ctre.phoenix6.sim.TalonFXSimState;

               // All hardware classes already have WPILib integration
               final TalonFX m_talonFX = new TalonFX(0);
               final CANcoder m_cancoder = new CANcoder(0);

               final TalonFXSimState m_talonFXSim = m_talonFX.getSimState();

               final DutyCycleOut m_talonFXOut = new DutyCycleOut(0);

               final TalonFXConfiguration m_talonFXConfig = new TalonFXConfiguration();
               final CANcoderConfiguration m_cancoderConfig = new CANcoderConfiguration();

               InvertedValue m_talonFXInverted = InvertedValue.CounterClockwise_Positive;

               m_talonFX.setControl(m_talonFXOut);

         .. tab-item:: C++
            :sync: C++

            .. code-block:: cpp

               // Phoenix 6 is in the ctre/phoenix6 headers
               #include "ctre/phoenix6/CANcoder.hpp"
               #include "ctre/phoenix6/TalonFX.hpp"

               // Phoenix 6 uses the ctre::phoenix6 namespace
               using namespace ctre::phoenix6;

               // now types are organized cleanly by namespace

               // All hardware classes already have WPILib integration
               hardware::TalonFX m_talonFX{0};
               hardware::CANcoder m_cancoder{0};

               sim::TalonFXSimState& m_talonFXSim{m_talonFX.GetSimState()};

               controls::DutyCycleOut m_talonFXOut{0};

               configs::TalonFXConfiguration m_talonFXConfig{};
               configs::CANcoderConfiguration m_cancoderConfig{};

               signals::InvertedValue m_talonFXInverted{signals::InvertedValue::CounterClockwise_Positive};

               m_talonFX.SetControl(m_talonFXOut);
