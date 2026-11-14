from PIL import Image, ImageDraw

sizes = [
    ("feedback-01.jpg", 400, 520),
    ("feedback-02.jpg", 400, 320),
    ("feedback-03.jpg", 400, 600),
    ("feedback-04.jpg", 400, 420),
    ("feedback-05.jpg", 400, 300),
    ("feedback-06.jpg", 400, 480),
]

bg = (238, 246, 242)
fg = (7, 59, 44)

for name, w, h in sizes:
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)
    draw.rectangle([16, 16, w - 16, h - 16], outline=fg, width=2)
    icon_w, icon_h = 64, 48
    ix, iy = w / 2 - icon_w / 2, h / 2 - icon_h / 2 - 20
    draw.rounded_rectangle([ix, iy, ix + icon_w, iy + icon_h], radius=6, outline=fg, width=3)
    draw.ellipse([ix + 10, iy + 10, ix + 22, iy + 22], outline=fg, width=3)
    draw.line([ix + 6, iy + icon_h - 8, ix + 24, iy + 18, ix + 38, iy + 30, ix + icon_w - 6, iy + 14], fill=fg, width=3, joint="curve")
    draw.text((w / 2, h / 2 + 40), "ZOMEN", fill=fg, anchor="mm")
    img.save(f"assets/images/feedback/{name}", "JPEG", quality=85)

print("done")
