#!/usr/bin/env python3
"""Generate the 1200x630 OG image for the portfolio.
Run with: python3 scripts/generate-og-image.py
Writes:   public/og-image.png
"""
from PIL import Image, ImageDraw, ImageFont
import os
import sys

W, H = 1200, 630
VOID = (8, 8, 12)
MINT = (0, 255, 136)
GRAY = (160, 160, 170)
WHITE = (245, 245, 250)
PURPLE = (112, 0, 255)


def find_font(preferred, size):
    """Try to locate a mono/sans font on the system."""
    candidates = [
        "/System/Library/Fonts/Supplemental/Menlo.ttc",
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in [preferred] + candidates:
        if path and os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def main():
    img = Image.new("RGB", (W, H), VOID)
    draw = ImageDraw.Draw(img, "RGBA")

    # Radial mint glow top-left
    for r in range(900, 0, -40):
        alpha = max(0, int(18 * (1 - r / 900)))
        draw.ellipse([-400 - r, -400 - r, 400 + r, 400 + r],
                     fill=(0, 255, 136, alpha))

    # Purple glow bottom-right
    for r in range(900, 0, -60):
        alpha = max(0, int(14 * (1 - r / 900)))
        draw.ellipse([W - 400 - r, H - 400 - r, W + 400 + r, H + 400 + r],
                     fill=(112, 0, 255, alpha))

    # Grid lines (subtle)
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 8), width=1)

    mono_big = find_font(None, 92)
    mono_med = find_font(None, 38)
    mono_sm = find_font(None, 26)
    mono_xs = find_font(None, 22)

    # Top-left bracket tag
    draw.rectangle([60, 60, 60 + 360, 60 + 44], outline=MINT, width=2)
    draw.text((78, 68), "> RAKESH_PORTFOLIO", fill=MINT, font=mono_sm)

    # Main title
    draw.text((60, 190), "Rakesh Chintanippu", fill=WHITE, font=mono_big)

    # Subtitle with accents
    line2 = "Full-Stack Engineer  //  AI Platforms  //  Cloud Architecture"
    draw.text((60, 310), line2, fill=GRAY, font=mono_med)

    # Key projects
    draw.text((60, 390), "Wellby  ·  Collective Brain  ·  SkyPulse  ·  EdgeTicker  ·  Rchat.ai",
              fill=WHITE, font=mono_sm)

    # Bottom-right status line
    draw.rectangle([W - 420, H - 90, W - 60, H - 50],
                   fill=(0, 255, 136, 22), outline=MINT, width=2)
    # Blinking cursor dot
    draw.ellipse([W - 400, H - 78, W - 384, H - 62], fill=MINT)
    draw.text((W - 370, H - 85), "SYSTEM READY  //  UPLINK OPEN",
              fill=MINT, font=mono_xs)

    # Bottom-left site URL
    draw.text((60, H - 80), "rakesh580.github.io/Rakesh_Portfolio",
              fill=GRAY, font=mono_xs)

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "..", "public", "og-image.png")
    out = os.path.abspath(out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out}  ({os.path.getsize(out) // 1024} KB)")


if __name__ == "__main__":
    sys.exit(main())
