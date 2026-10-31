# Photo Compression Instructions

Use these commands to generate web-optimized and thumbnail versions of a folder of large images.

## Prerequisites

- `ffmpeg` installed (tested with v8.1.1)

## Folder structure

```
<folder>/
  *.JPG          # original high-res images (untouched)
  web/           # web-optimized versions (1800px max)
  thumbnails/    # thumbnail versions (800px max)
```

## Commands

Replace `<folder>` with the path to your image folder.

### 1. Create output directories

```bash
mkdir -p "<folder>/web" "<folder>/thumbnails"
```

### 2. Generate web-optimized images (1800px max)

```bash
find "<folder>" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read f; do
  out="<folder>/web/$(basename "$f")"
  ffmpeg -y -i "$f" \
    -vf "scale='min(1800,iw)':'min(1800,ih)':force_original_aspect_ratio=decrease" \
    -q:v 4 \
    -pix_fmt yuvj420p \
    "$out" 2>/dev/null
done
```

### 3. Generate thumbnails (800px max)

```bash
find "<folder>" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read f; do
  out="<folder>/thumbnails/$(basename "$f")"
  ffmpeg -y -i "$f" \
    -vf "scale='min(800,iw)':'min(800,ih)':force_original_aspect_ratio=decrease" \
    -q:v 3 \
    -pix_fmt yuvj420p \
    "$out" 2>/dev/null
done
```

## Settings explained

| Setting | Web | Thumbnails | Description |
|---|---|---|---|
| Max dimension | 1800px | 800px | Longest side capped; aspect ratio preserved |
| Quality (`-q:v`) | 4 | 3 | mjpeg encoder scale 2–31 (lower = better) |
| Pixel format | `yuvj420p` | `yuvj420p` | Full-range YUV 4:2:0, universal browser support |
| Scaling | `force_original_aspect_ratio=decrease` | same | Never upscales; only shrinks if larger than max |

## Expected output sizes

| Type | Dimensions | Per file |
|---|---|---|
| Web (landscape) | 1800×1201 | ~100–250 KB |
| Web (portrait) | 1201×1800 | ~100–250 KB |
| Thumbnail (landscape) | 800×534 | ~44–96 KB |
| Thumbnail (portrait) | 534×800 | ~44–96 KB |

*Sizes vary based on image content complexity. High-detail photos will be on the upper end.*
