API Overview
============

The Phoenix 6 API resides in the ``com.ctre.phoenix6`` package in Java, the ``ctre::phoenix6`` namespace in C++, and the ``phoenix6`` module in Python. The API is then further organized into smaller packages and namespaces that group together similar types of classes and functions:

- ``configs`` - classes related to device :doc:`configuration </docs/api-reference/api-usage/configuration>`
- ``controls`` - classes related to device :doc:`control </docs/api-reference/api-usage/control-requests>`
- ``hardware`` - the device hardware classes, such as ``TalonFX``
- ``signals`` - enumeration types for device :doc:`signals </docs/api-reference/api-usage/status-signals>`
- ``sim`` - classes related to device :doc:`simulation </docs/api-reference/simulation/simulation-intro>`

C++ IntelliSense
^^^^^^^^^^^^^^^^

In C++, this namespace structure has the advantage of cleaning up IntelliSense when searching for classes:

.. code-block:: cpp

   // first use the ctre::phoenix6 namespace
   using namespace ctre::phoenix6;

   // now types are organized cleanly by namespace
   hardware::TalonFX m_talonFX{0};
   sim::TalonFXSimState& m_talonFXSim{m_talonFX.GetSimState()};

   controls::DutyCycleOut m_talonFXOut{0};

   configs::TalonFXConfiguration m_talonFXConfig{};
   signals::InvertedValue m_talonFXInverted{signals::InvertedValue::CounterClockwise_Positive};

All C++ code examples in this documentation will assume the presence of ``using namespace ctre::phoenix6;``.

Python Imports
^^^^^^^^^^^^^^

Python also takes advantage of the module structure to improve IntelliSense:

.. code-block:: python

   # first import the relevant submodules and types
   from phoenix6 import controls, configs, hardware, signals

   # now types are organized cleanly by module
   self.talonfx = hardware.TalonFX(0)
   self.talonfx_out = controls.DutyCycleOut(0)

   talonfx_configs = configs.TalonFXConfiguration()
   talonfx_inverted = signals.InvertedValue.COUNTER_CLOCKWISE_POSITIVE

All Python code examples in this documentation will assume the presence of ``from phoenix6 import *``.
