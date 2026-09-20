# Tessera

A tokenized indie game studio. Hold `$tessera` on Robinhood Chain to get into
playtests, review every build, and play each release free.

## Running it

The site is one self-contained HTML file — no build step, no dependencies, no
bundler. Any static host serves it as is.

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

## Layout

| Path | Role |
| --- | --- |
| `index.html` | The whole site: markup, styles and script in one file. |
| `brand/artboards.html` | Source for the banner and avatar, drawn with the site's own mark. |
| `brand/*.png` | Exported brand assets. See `brand/README.md`. |

## The four tabs

Each is a real view with its own URL (`#/`, `#/token`, `#/playtest`,
`#/reviews`), so any tab can be linked, bookmarked and reached with the back
button.

- **Home** — the studio, what holders get.
- **Token** — what `$tessera` is and the venue facts.
- **Playtest** — the build list, gated on an on-chain balance.
- **Reviews** — holder ratings and written feedback per build.

## The balance check

The playtest gate reads a visitor's balance and nothing else. On connect it
asks the wallet for the public address, then makes two read-only calls to the
token contract:

```
eth_requestAccounts   -> the public address
eth_call decimals()   -> how the balance is scaled
eth_call balanceOf()  -> what the visitor holds
                      -> compared against 5,000,000
```

There is **no signature request, no transaction and no token approval**
anywhere in that sequence. The page cannot move anything out of a wallet,
because it never asks for the permission that would let it.

It reports every state it can actually be in — not connected, wrong network,
balance unreadable, short of the threshold, unlocked — and offers a network
switch when the wallet is on the wrong chain. Wallets are discovered through
EIP-6963, falling back to `window.ethereum`.

## Reviews

Ratings are held in a shared document store when the page is served with one:
one document per viewer, everyone reads the scores, only the author writes
their own. Averages and counts come from a live subscription.

Served as a plain static file with no such store, it falls back to the
viewer's own browser and **says so on the page** rather than implying the
scores are shared. Wiring it to your own backend means replacing that one
block.

## Known placeholders

- The build catalogue is sample data. The page says so on the line above it.
- The venue facts are real; the contract address is held in app code for the
  balance check but is not displayed.

## Accessibility and rendering

Real form controls, visible focus states, `prefers-reduced-motion` honoured,
and every view readable at 390px with no horizontal scroll. The design commits
to one black theme and paints every colour explicitly, so it holds on any host
ground.
