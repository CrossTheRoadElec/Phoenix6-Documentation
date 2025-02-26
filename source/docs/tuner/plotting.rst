Plotting
========

Phoenix Tuner X supports an accurate and highly performant real-time plotter. Users can plot and manipulate multiple signals simultaneously. Plotter has undergone strenuous stress testing to ensure hours of plotting operation. This can be used in conjunction with :doc:`configs </docs/tuner/configs>` and :doc:`control </docs/tuner/controlling-devices>` for tasks like tuning PID loops.

.. image:: images/tuner-plot-overview.png
   :alt: Picture of plotter in Phoenix Tuner
   :width: 650

Tuner supports plotting signals as they arrive, ensuring that every visible point is a signal update that has been sent by a device. Users can zoom in and hover over points for a tooltip highlighting the exact value of the datapoint.

.. image:: images/tuner-plot-tooltip.png
   :alt: Tuner supports tooltips by hovering on the plot
   :width: 650

Adding a Signal
---------------

Signals can be added from the right-side menu.

.. image:: images/tuner-plot-signallist.png
   :alt: List of signals in Tunr
   :width: 650

Manipulating the Plot
---------------------

.. card-carousel:: 3

   .. card:: Horizontal Stretch

      .. image:: images/tuner-plot-horizontal-stretch.gif
         :alt: Horizontal stretch in Tuner

   .. card:: Vertical Stretch

      .. image:: images/tuner-plot-vertical-stretch.gif
         :alt: Vertical stretch in Tuner

   .. card:: Panning

      .. image:: images/tuner-plot-pan.gif
         :alt: Panning in Phoenix Tuner

   .. card:: Box Selection

      .. image:: images/tuner-box-selection.gif
         :alt: Box selection in Tuner

The plot can be manipulated in a variety of ways:

- :kbd:`Click` + :kbd:`Drag` to pan around the plot
- :kbd:`Scroll` over the X-axis or the plot to horizontally stretch the timescale
- :kbd:`Shift` + :kbd:`Scroll` over a signal's Y-axis to vertically stretch that signal
- :kbd:`Shift` + :kbd:`Scroll` over the plot to vertically stretch all visible signals' Y-axis
- :kbd:`Ctrl` + :kbd:`Drag` to pan across all signals' Y-axis
