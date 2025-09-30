# HDRI Files

Place your HDRI (High Dynamic Range Image) files here.

## Supported Formats
- `.hdr` files (recommended)
- `.exr` files

## Example Files
- `clear_noon_2k.hdr` - Clear daytime sky
- `sunset_2k.hdr` - Warm sunset lighting
- `night_2k.hdr` - Dark night sky with stars

## Usage
1. Place your HDRI files in this directory
2. Change `SKY_MODE` to `'custom'` in `app/page.tsx`
3. Update the file path in `SkyController.tsx` if using a different filename

## Free HDRI Sources
- [Poly Haven](https://polyhaven.com/hdris) - High quality CC0 HDRIs
- [ambientCG](https://ambientcg.com/list?type=HDRI) - Consistent lighting HDRIs
- [HDRI Haven](https://hdri-haven.com/) - Free HDRI downloads

## Performance Tips
- Use 2K resolution (2048x1024) for good quality/performance balance
- 4K (4096x2048) for maximum quality on desktop
- 1K (1024x512) for mobile devices if needed
