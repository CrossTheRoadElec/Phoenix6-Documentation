Device Configs
==============

This section intends to explain device specific config groups and how they are useful. Users looking for how to modify the configs via code can find instructions :ref:`here <docs/api-reference/api-usage/configuration:applying configs>`. Instructions on modifying configs from Tuner can be found :ref:`here <docs/tuner/configs:tuner configs>`.

Custom Params
-------------

All supported CTR-Electronics devices have a ``CustomParams`` config group which contains 2 configs. These configs are not used by anything and can be used by the user to store data on the motor controller directly.

Device Specific Configs
-----------------------

.. grid:: 1 1 3 3

   .. grid-item-card:: CANcoder
      :text-align: center
      :link: cancoder-configs
      :link-type: doc

      .. image:: images/cancoder.png
         :width: 200
         :alt: CANcoder product image

   .. grid-item-card:: Pigeon 2.0
      :text-align: center
      :link: pigeon-configs
      :link-type: doc

      .. image:: images/pigeon2.png
         :width: 200
         :alt: Pigeon2 product image

   .. grid-item-card:: TalonFX
      :text-align: center
      :link: talonfx-configs
      :link-type: doc

      .. image:: images/talonfx.png
         :width: 200
         :alt: TalonFX product image

.. toctree::
   :maxdepth: 1
   :hidden:

   cancoder-configs
   pigeon-configs
   talonfx-configs
