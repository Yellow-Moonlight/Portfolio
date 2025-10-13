#!/usr/bin/env bash
# 이미지 디더링 + 최적화 스크립트
# 사용법: ./script/process-images.sh <source_dir> <dest_dir>
set -euo pipefail

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_directory> <destination_directory>" >&2
    exit 1
fi

SRC_DIR="$1"
DST_DIR="$2"

mkdir -p "$DST_DIR"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick(magick) not found. Install via 'brew install imagemagick'" >&2
  exit 1
fi
if ! command -v pngquant >/dev/null 2>&1; then
  echo "pngquant not found. Install via 'brew install pngquant'" >&2
  exit 1
fi

for f in "$SRC_DIR"/*; do
  [ -e "$f" ] || continue
  base=$(basename "$f")
  ext="${base##*.}"
  name="${base%.*}"
  ext_lc=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
  tmp="$DST_DIR/tmp-$name.png"
  out="$DST_DIR/$name.png"

  echo "[INFO] Processing: $f (base: $base, ext: $ext, ext_lc: $ext_lc, name: $name)"

  # Resize & convert to PNG (임시 파일은 항상 PNG)
  if ! magick "$f" -resize 600x\> "$tmp"; then
    echo "[ERROR] magick resize failed for $f" >&2
    continue
  fi
  if [ ! -s "$tmp" ]; then
    echo "[ERROR] Temp file not created: $tmp" >&2
    continue
  fi

  # Reduce colors + dither
  if ! magick "$tmp" -colors 12 -dither FloydSteinberg "$tmp"; then
    echo "[ERROR] magick dither failed for $tmp" >&2
    continue
  fi

  # pngquant for compression if png, magick for jpg
  if [[ "$ext_lc" == "png" ]]; then
    if ! pngquant --quality=40-85 --speed 1 --output "$out" -- "$tmp"; then
      echo "[ERROR] pngquant failed for $tmp" >&2
      continue
    fi
  else
    if ! magick "$tmp" -quality 100 "$out"; then
      echo "[ERROR] magick jpg encode failed for $tmp" >&2
      continue
    fi
  fi
  rm -f "$tmp"
  echo "[SUCCESS] Processed $f -> $out"
done
