# Tessera — brand assets

Rendered from `artboards.html`, which draws them with the site's own mark and
typeface. Each artboard is already at its exact export dimension in CSS pixels;
the PNGs are captured at 2x, so a 1500x500 banner lands as a 3000x1000 file.

| File | Pixels | Use |
| --- | --- | --- |
| `tessera-banner.png` | 3000x1000 | X / Twitter header (1500x500 @2x). Texture only, no type. |
| `tessera-banner-lockup.png` | 3000x1000 | Same banner carrying the mark beside the wordmark. |
| `tessera-avatar.png` | 800x800 | Profile picture (400x400 @2x), mark inside a thin ring. |
| `tessera-avatar-plain.png` | 800x800 | Same avatar with no ring, mark set slightly larger. |

The header carries neither the mark nor the wordmark on purpose: on X the
profile picture overlaps the banner's lower left and the account name is drawn
over it, so the header would only say the same thing twice. It is texture, and
its lower left is left quiet for the avatar to sit in.

The two tesserae at the edges are cropped deliberately; the quieter pair sits
whole, inside the canvas, so nothing reads as an accidental crop.

## The mark

A tessera lifted clear of its socket — the piece in the instant before it goes
into the mosaic. Drawn as an isometric prism from five shapes, so it still
reads at 16px as a favicon.

## Colours

| Token | Hex | Where |
| --- | --- | --- |
| Ground | `#08080b` | Every artboard |
| Ink | `#f5f5f7` | Wordmark |
| Tile | `#ffffff` to `#c8c8d0` | The lifted tessera |
| Left face | `#c2c2ca` to `#6e6e78` | Socket, light side |
| Right face | `#75757f` to `#37373f` | Socket, shadow side |
| Rim | `#a6a6b0` to `#5a5a64` | Socket rim |
| Hairline | `rgba(245,245,247,.13)` | The thin isometric rules |

## Safe areas

The avatar is cropped to a circle, so the ring sits inside at 22px of 400 and
nothing essential passes it. On the banner, narrow viewports crop the top and
bottom and the profile picture covers the lower left, so the wordmark is
centred and the decorative tesserae are the only things near the edges.

## Re-rendering

The typeface is Bricolage Grotesque (SIL Open Font License). Serve the
repository, open `/tessera/brand/artboards.html`, and screenshot `#banner`,
`#banner-lockup`, `#avatar` and `#avatar-plain`.
