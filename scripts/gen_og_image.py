from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
bg = (7, 59, 44)
accent = (11, 110, 79)
white = (255, 255, 255)

img = Image.new("RGB", (W, H), bg)
draw = ImageDraw.Draw(img)
draw.rectangle([0, H - 14, W, H], fill=accent)

font_paths = [
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/arial.ttf",
]

def load_font(size):
    for p in font_paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()

title_font = load_font(110)
sub_font = load_font(34)

draw.text((W / 2, H / 2 - 40), "ZOMEN", font=title_font, fill=white, anchor="mm")
draw.text((W / 2, H / 2 + 70), "Learn Programming the Right Way", font=sub_font, fill=(200, 224, 214), anchor="mm")

img.save("assets/images/og-image.png", "PNG")
print("done")
