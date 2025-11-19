Orchestra
=========

Compatible motors powered by Talon FX have the ability to produce audible output through the ``MusicTone`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/controls/MusicTone.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1controls_1_1_music_tone.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/controls/music_tone/index.html#phoenix6.controls.music_tone.MusicTone>`__) control request. The Orchestra API extends this ability and orchestrates multiple motors to play music.

To get started, construct an ``Orchestra`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/Orchestra.html>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1_orchestra.html>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/orchestra/index.html#module-phoenix6.orchestra>`__) object with an instrument and CHRP. Ensure that ``addInstrument()`` and ``loadMusic()`` are not called periodically, as they are blocking functions.

.. note:: For information on converting MIDI to CHRP, see :doc:`/docs/tuner/tools/chrp-converter`.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         Orchestra m_orchestra = new Orchestra();

         // Add a single device to the orchestra
         m_orchestra.addInstrument(m_motor);

         // Attempt to load the chrp
         var status = m_orchestra.loadMusic("track.chrp");

         if (!status.isOK()) {
            // log error
         }

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         Orchestra m_orchestra;

         // Add a single device to the orchestra
         m_orchestra.addInstrument(m_motor);

         // Attempt to load the chrp
         auto status = m_orchestra.loadMusic("track.chrp");

         if (!status.IsOK()) {
            // log error
         }

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self.orchestra = Orchestra()

         self.orchestra.add_instrument(self.motor);

         status = self.orchestra.load_music("track.chrp")

         if not status.is_ok():
            # log error

Once the track has been loaded, ``play/pause/stop`` can be used to manage the track. ``play()`` only needs to be called once.

.. tab-set::

   .. tab-item:: Java
      :sync: java

      .. code-block:: java

         m_orchestra.play();

   .. tab-item:: C++
      :sync: cpp

      .. code-block:: cpp

         m_orchestra.Play();

   .. tab-item:: Python
      :sync: python

      .. code-block:: python

         self.orchestra.play()

Playback While Disabled (FRC)
-----------------------------

Playback can be safely enabled during robot disable by enabling the ``Allow Music Dur Disable`` (`Java <https://api.ctr-electronics.com/phoenix6/latest/java/com/ctre/phoenix6/configs/AudioConfigs.html#AllowMusicDurDisable>`__, `C++ <https://api.ctr-electronics.com/phoenix6/latest/cpp/classctre_1_1phoenix6_1_1configs_1_1_audio_configs.html#a52c5a5c614f2b0fe7e9342297d44178e>`__, `Python <https://api.ctr-electronics.com/phoenix6/latest/python/autoapi/phoenix6/configs/index.html#phoenix6.configs.AudioConfigs.allow_music_dur_disable>`__) config.
