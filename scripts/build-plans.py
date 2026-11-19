"""Build clean plan drawings + unit geometry from the floor-plan rasters in docs/.
Run once: python3 scripts/build-plans.py  (needs Pillow + numpy). Outputs images/plans/*.png and src/data/plans.json."""
import json, os
import numpy as np
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'docs', 'plans-source')
NAVY = (27, 34, 58)
PLANS = {
  'f1': dict(src='plan-floor-1.png', crop=(880,120,2840,1845), units=[
    # x,y,w,h in crop px, area m2 or None, status
    (60,68,291,623,'119.73','free'), (354,68,218,618,'96.79','free'), (580,67,220,540,'68.51','free'),
    (803,68,231,532,'79.59','free'), (1040,144,218,454,'79.49','free'), (1402,68,504,307,'99.25','free'),
    (1532,574,375,236,None,'sold'), (1625,816,281,437,None,'sold'), (1286,1258,621,226,None,'sold'),
    (1288,1489,618,229,'100.57','free')]),
  'f37': dict(src='plan-floors-3-7.png', crop=(300,40,945,615), blank=[(0,500,410,575)], units=[
    (8,8,60,132,'52.69'),(71,9,41,106,'31.96'),(116,8,35,107,'26.45'),(154,9,34,106,'26.45'),(190,8,36,108,'26.45'),
    (228,10,35,104,'26.45'),(265,8,37,108,'26.45'),(304,20,36,94,'23.19'),(342,48,30,68,'17.22'),(376,47,36,68,'20.72'),
    (458,8,47,107,'30.26'),(507,8,131,59,'54.83'),(532,69,108,45,'31'),(532,114,106,34,'25.91'),(532,152,108,35,'25.91'),
    (532,190,107,34,'25.91'),(532,227,108,35,'25.91'),(532,264,107,34,'25.91'),(532,301,108,36,'25.91'),(532,339,106,34,'25.91'),
    (532,376,109,38,'25.91'),(532,416,94,48,'30.51'),(532,466,96,45,'29.45'),(524,513,103,51,'35.36'),(421,512,100,54,'33.37'),
    (422,436,83,74,'37.95'),(22,141,89,83,'50.45'),(114,141,35,85,'20.06'),(152,142,36,82,'20.06'),(190,142,36,84,'18.3'),
    (338,142,34,84,'21.19'),(376,142,36,82,'24.48')]),
  'fB': dict(src='plan-typical-unlabeled.png', crop=(0,0,1026,924), units=[
    (18,14,92,207,'48.57'),(114,16,67,165,'30.03'),(184,16,56,165,'24.83'),(243,16,56,165,'24.80'),(301,16,57,165,'24.80'),
    (360,16,56,165,'24.80'),(418,16,57,165,'24.74'),(478,35,58,146,'22.90'),(539,77,53,104,'14.84'),(595,76,55,105,'15.57'),
    (724,16,70,165,'30.71'),(797,16,207,91,'51.50'),(838,109,168,68,'30.39'),(837,180,167,56,'25.10'),(838,238,168,56,'25.10'),
    (838,297,166,56,'25.10'),(838,356,168,56,'25.10'),(838,414,166,56,'25.12'),(838,473,168,56,'25.10'),(838,532,166,56,'25.10'),
    (838,590,168,59,'25.26'),(838,652,146,76,'31.08'),(838,731,147,71,'27.08'),(822,804,162,80,'34.62'),(667,804,153,82,'32.93'),
    (666,717,129,85,'29.14'),(667,629,128,86,'29.14'),(39,224,140,128,'48.09'),(181,224,57,128,'19.45'),(241,224,58,128,'19.90'),
    (301,224,58,128,'19.87'),(533,224,58,128,'19.61'),(593,224,57,128,'19.72')]),
}
out = {}
for key, p in PLANS.items():
    im = Image.open(os.path.join(RAW, p['src'])).convert('RGB').crop(p['crop'])
    a = np.asarray(im).astype(np.int32).copy()
    W, H = im.size
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    red = (r > 170) & (g < 90) & (b < 90)
    # paint unit interiors white (keeps red structure), removing raster labels and fills
    pad = max(2, W // 400)
    for u in p['units']:
        x, y, w, h = u[:4]
        sl = (slice(y + pad, y + h - pad), slice(x + pad, x + w - pad))
        keep = red[sl]
        blk = a[sl]
        blk[~keep] = 255
        a[sl] = blk
    for (bx0, by0, bx1, by1) in p.get('blank', []):
        a[by0:by1, bx0:bx1] = 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    red = (r > 170) & (g < 90) & (b < 90)
    lum = (0.299 * r + 0.587 * g + 0.114 * b)
    lum[red] = 20  # structure reads as solid ink
    alpha = np.clip((255 - lum) * 1.25, 0, 255)
    alpha[alpha < 40] = 0
    alpha = alpha.astype(np.uint8)
    rgba = np.zeros((H, W, 4), np.uint8)
    rgba[..., 0], rgba[..., 1], rgba[..., 2] = NAVY
    rgba[..., 3] = alpha
    Image.fromarray(rgba, 'RGBA').save(os.path.join(ROOT, 'images', 'plans', f'{key}.png'), optimize=True)
    units = []
    for i, u in enumerate(p['units']):
        x, y, w, h, area = u[:5]
        status = u[5] if len(u) > 5 else 'free'
        units.append(dict(id=f'{key}-{i+1:02d}', x=x, y=y, w=w, h=h,
                          area=float(area) if area else None, status=status))
    out[key] = dict(width=W, height=H, units=units)
with open(os.path.join(ROOT, 'src', 'data', 'plans.json'), 'w') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
for k, v in out.items():
    areas = [u['area'] for u in v['units'] if u['area']]
    print(k, v['width'], v['height'], len(v['units']), min(areas), max(areas))
