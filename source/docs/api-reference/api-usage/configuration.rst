Configuration
=============

Devices support persistent settings through the use of "configs".

.. tip:: Configs can also be configured using Phoenix Tuner X. See :ref:`docs/tuner/configs:tuner configs` for more information.

Configuration Objects
---------------------

There are device-specific ``Configuration`` classes that group configuration data of devices in a meaningful way.
These classes are `Passive Data Structures <https://en.wikipedia.org/wiki/Passive_data_structure>`__.
One example is ``TalonFXConfiguration``, which has subgroups of configs such as ``MotorOutputConfigs``.
The configs can be modified through public member variables of the ``Configuration`` object.
The complete list of configuration objects can be found in the API documentation (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/package-summary.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/namespacectre_1_1phoenix6_1_1configs.html>`__).

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         var talonFXConfigs = new TalonFXConfiguration();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         configs::TalonFXConfiguration talonFXConfigs{};

Future Proofing Configs
^^^^^^^^^^^^^^^^^^^^^^^

There is a corner case with configs where the device may have firmware with newer configs that didn't exist when the version of the API was built. To account for this problem, device ``Configuration`` objects have a ``FutureProofConfigs`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/TalonFXConfiguration.html#FutureProofConfigs>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_talon_f_x_configuration.html#a36c4797bc533994122b779405622934d>`__) field.

Configurator API
----------------

Device objects have a ``getConfigurator()`` method that returns a device-specific ``Configurator`` object.
The ``Configurator`` is used to retrieve, apply, and factory default the configs of a device.

.. note:: The ``getConfigurator()`` routine can be called frequently without any performance implications.

The device-specific configurators have type-specific overloads that allow for the widest variety of device-compatible configs.
As a result, the caller can pass the entire device ``Configuration`` object or just the relevant subgroup of configs to the ``Configurator`` API.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         var talonFXConfigurator = m_talonFX.getConfigurator();

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         auto& talonFXConfigurator = m_talonFX.GetConfigurator();

Reading Configs
^^^^^^^^^^^^^^^

To read configs stored in a device, use the ``refresh()`` method to update a ``Configuration`` object. The example below demonstrates retrieving a full ``TalonFXConfiguration`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/TalonFXConfiguration.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_talon_f_x_configuration.html>`__) object from a ``TalonFX`` device.

.. warning:: ``refresh()`` is a blocking API call that waits on the device to respond. Calling ``refresh()`` periodically may slow down the execution time of the periodic function, as it will always wait up to ``defaultTimeoutSeconds`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/ParentConfigurator.html#defaultTimeoutSeconds>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_parent_configurator.html#a166da706f551536b66314687866afc10>`__) for the response when no timeout parameter is specified.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         var talonFXConfigurator = m_talonFX.getConfigurator();
         var talonFXConfigs = new TalonFXConfiguration();

         // optional timeout (in seconds) as a second optional parameter
         talonFXConfigurator.refresh(talonFXConfigs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         auto& talonFXConfigurator = m_talonFX.GetConfigurator();
         configs::TalonFXConfiguration talonFXConfigs{};

         // optional timeout (in seconds) as a second optional parameter
         talonFXConfigurator.Refresh(talonFXConfigs);

Applying Configs
^^^^^^^^^^^^^^^^

Configs can be applied to a device by calling ``apply()`` on the ``Configurator`` with a ``Configuration`` object.

.. warning:: ``apply()`` is a blocking API call that waits on the device to respond. Calling ``apply()`` periodically may slow down the execution time of the periodic function, as it will always wait up to ``defaultTimeoutSeconds`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/ParentConfigurator.html#defaultTimeoutSeconds>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_parent_configurator.html#a166da706f551536b66314687866afc10>`__) for the response when no timeout parameter is specified.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         var talonFXConfigurator = m_talonFX.getConfigurator();
         var motorConfigs = new MotorOutputConfigs();

         // set invert to CW+ and apply config change
         motorConfigs.Inverted = InvertedValue.Clockwise_Positive;
         talonFXConfigurator.apply(motorConfigs);

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         auto& talonFXConfigurator = m_talonFX.GetConfigurator();
         configs::MotorOutputConfigs motorConfigs{};

         // set invert to CW+ and apply config change
         motorConfigs.Inverted = signals::InvertedValue::Clockwise_Positive;
         talonFXConfigurator.Apply(motorConfigs);

.. tip:: To modify a single configuration value without affecting the other configs, users can call ``refresh()`` after constructing the config object, or users can cache the config object and reuse it for future calls to ``apply()``.

Factory Default
~~~~~~~~~~~~~~~

A newly-created ``Configuration`` object contains the default configuration values of a device.
Passing this newly-created ``Configuration`` object to the device ``Configurator`` will factory default the device's configs.

.. tab-set::

   .. tab-item:: Java
      :sync: Java

      .. code-block:: Java

         m_talonFX.getConfigurator().apply(new TalonFXConfiguration());

   .. tab-item:: C++
      :sync: C++

      .. code-block:: c++

         m_talonFX.GetConfigurator().Apply(configs::TalonFXConfiguration{});
