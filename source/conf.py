# -*- coding: utf-8 -*-
#
# Configuration file for the Sphinx documentation builder.
#
# This file does only contain a selection of the most common options. For a
# full list see the documentation:
# http://www.sphinx-doc.org/en/master/config

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
from sphinx.builders import html

sys.path.insert(0, os.path.abspath("."))

# -- Project information -----------------------------------------------------

project = "Phoenix Pro"
copyright = "2023, CTR Electronics"
author = "CTR Electronics"

# The short X.Y version
version = ""
# The full version, including alpha/beta/rc tags
release = ""


# -- General configuration ---------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#
# needs_sphinx = '1.0'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    "notfound.extension",
    "sphinxcontrib.images",
    "sphinxext.mimictoc",
    "sphinxext.opengraph",
    "sphinxext.rediraffe",
    "sphinx.ext.autosectionlabel",
    "sphinx_design",
    "sphinx_copybutton",
]

images_config = {
    "override_image_directive": True,
}

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = ".rst"

# The master toctree document.
master_doc = "index"

# Only one language supported, no URL prefix
# This is only needed when deploying a non-RTD server
on_rtd = os.environ.get("READTHEDOCS") == "True"

if on_rtd:
    notfound_no_urls_prefix = False
else:
    notfound_no_urls_prefix = True

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = None


# -- Options for HTML output -------------------------------------------------

# URL favicon
html_favicon = "assets/ctre.ico"

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "furo"

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
html_theme_options = {
    "light_css_variables": {
        "color-brand-primary": "#84b332",
        "color-brand-content": "#84b332",
    },
    "dark_css_variables": {
        "color-brand-primary": "#96c93d",
        "color-brand-content": "#96c93d",
    },
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]
html_logo = "images/ctre.png"


# Theme tweaks on top of RTD
def setup(app):
    app.add_css_file("css/theme_ctre.css")


# Hide the HTML title for furo theme
html_title = ""

# Custom sidebar templates, must be a dictionary that maps document names
# to template names.
#
# The default sidebars (for documents that don't match any pattern) are
# defined by theme itself.  Builtin themes are using these templates by
# default: ``['localtoc.html', 'relations.html', 'sourcelink.html',
# 'searchbox.html']``.
#
# html_sidebars = {}


# -- Options for HTMLHelp output ---------------------------------------------

# Output file base name for HTML help builder.
htmlhelp_basename = "Phoenixdoc"


# -- Options for LaTeX output ------------------------------------------------

latex_engine = "xelatex"

# Disable xindy support
# See: https://github.com/readthedocs/readthedocs.org/issues/5476
latex_use_xindy = False

latex_elements = {
    "fontpkg": r"""
	\setmainfont{DejaVu Serif}
	\setsansfont{DejaVu Sans}
	\setmonofont{DejaVu Sans Mono}""",
    "preamble": r"""
	\usepackage[titles]{tocloft}
	\cftsetpnumwidth {1.25cm}\cftsetrmarg{1.5cm}
	\setlength{\cftchapnumwidth}{0.75cm}
	\setlength{\cftsecindent}{\cftchapnumwidth}
	\setlength{\cftsecnumwidth}{1.25cm}
	""",
    "fncychap": r"\usepackage[Bjornstrup]{fncychap}",
    "printindex": r"\footnotesize\raggedright\printindex",
}

# Reorder html supported image types to prioritize GIF when available
html.StandaloneHTMLBuilder.supported_image_types = [
    "image/svg+xml",
    "image/gif",
    "image/png",
    "image/jpeg",
]

# -- Options for manual page output ------------------------------------------

# One entry per manual page. List of tuples
# (source start file, name, description, authors, manual section).
man_pages = [(master_doc, "phoenix", "Phoenix Pro Documentation", [author], 1)]

# -- Options for Texinfo output ----------------------------------------------

# Grouping the document tree into Texinfo files. List of tuples
# (source start file, target name, title, author,
#  dir menu entry, description, category)
texinfo_documents = [
    (
        master_doc,
        "Phoenix",
        "Phoenix Pro Documentation",
        author,
        "Phoenix",
        "Documentation for Phoenix Pro eligible devices",
        "Miscellaneous",
    ),
]


# -- Extension configuration -------------------------------------------------

# Disable checking anchors for linkcheck builder
linkcheck_anchors = False

# Set various linkcheck timeouts
linkcheck_timeout = 30
linkcheck_retries = 3
linkcheck_workers = 1

# Specify a standard user agent, as Sphinx default is blocked on some sites
user_agent = "Mozilla/5.0 (X11; Linux x86_64; rv:25.0) Gecko/20100101 Firefox/25.0"

# Autosection labels prefix document path and filename
# Helps handle label collisions throughout the documentation
autosectionlabel_prefix_document = True

# Linkcheck exclusions
linkcheck_ignore = [
    r".*canable.io.*",
    r".*vexrobotics.com.*",
]

# Set redirects location
rediraffe_redirects = "redirects.txt"
