# Tessera — promo video

`tessera-promo.mp4` — 1080×1080, 15 s, 24 fps, H.264 / yuv420p, silent.

Square, so it plays in an X, Instagram or LinkedIn feed without being cropped.
There is no audio track: add music in your editor if you want one.

## How it is made

`promo.html` is the source. It exposes `window.setT(ms)`, which positions every
element for a given moment, so frames are captured deterministically rather
than screen-recorded — no dropped frames, no timing drift, and the same file
every render.

```sh
node capture.mjs
ffmpeg -framerate 24 -i frames/f%04d.png -c:v libx264 -preset slow \
       -crf 19 -pix_fmt yuv420p -movflags +faststart tessera-promo.mp4
rm -rf frames
```

The page loads its typefaces from Google Fonts. If that host is unreachable,
serve the families yourself and point the capture at them, or the frames render
in a fallback face:

```sh
FONT_BASE=http://127.0.0.1:8766 node capture.mjs
```

It expects `bri-600/700/800.woff2`, `sans-400/500/600.woff2` and
`mono-400/500.woff2` there.

## Scenes

| Time | Content |
| --- | --- |
| 0.0 – 3.2 s | The tessera lifts clear of its socket; wordmark |
| 3.2 – 6.6 s | Indie games, shaped by the people who hold them |
| 6.6 – 10.4 s | What $tessera opens — playtest, reviews, every release free |
| 10.4 – 12.7 s | The mosaic fills, one tessera at a time |
| 12.7 – 15.0 s | Token card, chain, handle, risk line |

## What it deliberately does not say

No price, no supply figure, no launch date and no claim about return. The
closing card carries the same risk line the site's footer does, so the video
cannot outrun the disclaimer.
