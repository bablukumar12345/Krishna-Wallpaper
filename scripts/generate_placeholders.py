"""
generate_placeholders.py
----------------------------------------------------------------------
One-time dev utility: creates local JPG placeholder images for every
path the React app references (banners, thumbnails, product photos,
logo, hero) so the site renders correctly before real photography is
uploaded to /public/images. Safe to delete once real assets are in
place — nothing at runtime imports this script.

Run with: python3 scripts/generate_placeholders.py
----------------------------------------------------------------------
"""
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')

PALETTES = {
    'wallpapers': ((216, 189, 141), (43, 38, 34)),
    'customized-wallpapers': ((222, 199, 168), (74, 55, 40)),
    'wpc-panel': ((201, 193, 181), (92, 84, 75)),
    'blinds': ((239, 232, 218), (124, 139, 111)),
    'artificial-grass': ((169, 192, 139), (63, 87, 50)),
    'default': ((176, 141, 87), (43, 38, 34)),
}

try:
    FONT_L = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 40)
    FONT_S = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 22)
except Exception:
    FONT_L = ImageFont.load_default()
    FONT_S = ImageFont.load_default()


def make_image(path, label, sub, palette_key, size=800):
    bg, fg = PALETTES.get(palette_key, PALETTES['default'])
    img = Image.new('RGB', (size, size), bg)
    draw = ImageDraw.Draw(img)

    # Soft diagonal duotone block for visual interest
    draw.polygon([(0, size), (size, 0), (size, size)], fill=fg)
    overlay = Image.new('RGB', (size, size), bg)
    img = Image.blend(img, overlay, 0.35)
    draw = ImageDraw.Draw(img)

    # Border frame
    draw.rectangle([24, 24, size - 24, size - 24], outline=(247, 243, 236), width=2)

    # Centered label text
    text_color = (247, 243, 236)
    bbox_l = draw.textbbox((0, 0), label, font=FONT_L)
    lw, lh = bbox_l[2] - bbox_l[0], bbox_l[3] - bbox_l[1]
    draw.text(((size - lw) / 2, size / 2 - lh), label, font=FONT_L, fill=text_color)

    if sub:
        bbox_s = draw.textbbox((0, 0), sub, font=FONT_S)
        sw = bbox_s[2] - bbox_s[0]
        draw.text(((size - sw) / 2, size / 2 + 18), sub, font=FONT_S, fill=text_color)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, 'JPEG', quality=72, optimize=True)


def slugify(name):
    return ''.join(c if c.isalnum() else '-' for c in name.lower()).strip('-').replace('--', '-')


SERVICES = [
    {'slug': 'wallpapers', 'name': 'Wallpapers', 'categories': ['Floral', '3D Textured', 'Geometric', 'Kids Room', 'Metallic & Foil']},
    {'slug': 'customized-wallpapers', 'name': 'Customized Wallpapers', 'categories': ['Photo Murals', 'Logo & Branding', 'Kids Custom', 'Nature Scenes']},
    {'slug': 'wpc-panel', 'name': 'WPC Panel', 'categories': ['Wooden Finish', 'Marble Finish', 'Louvers', '3D Wall Panels']},
    {'slug': 'blinds', 'name': 'Blinds', 'categories': ['Zebra Blinds', 'Roller Blinds', 'Wooden Blinds', 'Blackout Blinds']},
    {'slug': 'artificial-grass', 'name': 'Artificial Grass', 'categories': ['Balcony Turf', 'Garden Turf', 'Sports Turf', 'Rooftop Turf']},
]

count = 0

for service in SERVICES:
    sdir = os.path.join(BASE, 'services', service['slug'])
    make_image(os.path.join(sdir, f"{service['slug']}-banner.jpg"), service['name'], 'Noida Decor', service['slug'], size=1600)
    make_image(os.path.join(sdir, f"{service['slug']}-thumb.jpg"), service['name'], 'Collection', service['slug'])
    count += 2

    for category_name in service['categories']:
        cslug = slugify(category_name)
        cdir = os.path.join(sdir, cslug)
        for i in range(1, 26):
            base = f"{cslug}-{i}"
            make_image(os.path.join(cdir, f"{base}.jpg"), category_name, f"{service['name']} #{i}", service['slug'])
            make_image(os.path.join(cdir, f"{base}-alt1.jpg"), category_name, f"View 2 · #{i}", service['slug'])
            make_image(os.path.join(cdir, f"{base}-alt2.jpg"), category_name, f"View 3 · #{i}", service['slug'])
            make_image(os.path.join(cdir, f"{base}-alt3.jpg"), category_name, f"View 4 · #{i}", service['slug'])
            count += 4

# Site-wide images
make_image(os.path.join(BASE, 'hero', 'hero-main.jpg'), 'Noida Decor', 'Hero placeholder', 'default', size=1920)
make_image(os.path.join(BASE, 'about', 'about-hero.jpg'), 'Our Studio', 'About placeholder', 'default', size=1200)
make_image(os.path.join(BASE, 'logo', 'og-image.jpg'), 'Noida Decor', 'Social share image', 'default', size=1200)
count += 3

print(f"Generated {count} local JPG placeholder images under /public/images.")
