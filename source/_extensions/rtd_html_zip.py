# Force RTD to build the HTML zip with separate HTML files
# instead of combining them into one large HTML file.

from sphinx.builders.html import StandaloneHTMLBuilder

class ReadtheDocsBuilderLocalMedia(StandaloneHTMLBuilder):
    name = "readthedocssinglehtmllocalmedia"

def setup(app):
    app.add_builder(ReadtheDocsBuilderLocalMedia, override=True)
