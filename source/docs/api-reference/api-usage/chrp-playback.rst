CHRP Playback
=============

CHRP functionality is a feature of compatible TalonFX motors that actuate the rotor at very specific frequencies, creating audible output. This output can be in the form of music.

.. note:: For information on converting MIDI to CHRP, see :doc:`/docs/tuner/tools/chrp-converter`.

To get started, construct a ``Orchestra`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/Orchestra.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1_orchestra.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/orchestra/index.html#module-phoenix6.orchestra>`__) object with an instrument and CHRP. Ensure that ``addInstrument()`` and ``loadMusic()`` are not called periodically, as they are blocking functions.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         // Add a single device to the orchestra
         orchestra.addInstrument(m_motor);

         // Attempt to load the chrp
         var status = orchestra.loadMusic("track.chrp");

         if (!status.isOK()) {
            // log error
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         // Add a single device to the orchestra
         orchestra.addInstrument(m_motor);

         // Attempt to load the chrp
         auto status = orchestra.loadMusic("track.chrp");

         if (!status.IsOK()) {
            // log error
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         orchestra.add_instrument(self.motor);

         status = orchestra.load_music("track.chrp")

         if (status.is_ok()):
            # log error

Once the track has been loaded, ``play/pause/stop`` can be used to manage the track. ``play()`` only needs to be called once.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         orchestra.play();

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         orchestra.Play();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         orchestra.play()

Playback While Disabled (FRC)
-----------------------------

Playback can be safely enabled during robot disable by enabling the ``Allow Music Dur Disable`` (`Java <https://api.ctr-electronics.com/phoenix6/release/java/com/ctre/phoenix6/configs/AudioConfigs.html#AllowMusicDurDisable>`__, `C++ <https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1configs_1_1_audio_configs.html#a52c5a5c614f2b0fe7e9342297d44178e>`__, `Python <https://api.ctr-electronics.com/phoenix6/release/python/autoapi/phoenix6/configs/index.html#phoenix6.configs.AudioConfigs.allow_music_dur_disable>`__) config.
