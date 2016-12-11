import os, sys
from PIL import Image

size = 1280

for f in os.listdir('.'):
    if os.path.isfile(f) and f.split('.')[-1] in {'jpeg', 'jpg', 'png'}:
        outfile = f
        if True or f != outfile:
            try:
                im = Image.open(f)
                im.thumbnail((size, size), Image.ANTIALIAS)
                im.save(outfile, "JPEG")
            except IOError:
                print("cannot create thumbnail for '%s'" % f)
