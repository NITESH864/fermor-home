# Fermor homepage (assignment)

Next.js 15 (App Router) + Tailwind v4. No UI libraries; the chart is plain SVG.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production check
```
Deploy: push to GitHub, import the repo on Vercel, keep default settings.

## Decisions
- **Hero is the product.** Fermor's pitch is "clear math", so the first screen is a working SIP / EMI calculator instead of a stock illustration.
- **"Show the math" on every result.** It turns Fermor's open-methodology promise into something visible: formula, live inputs, assumptions.
- **Indian number format** (₹12,34,567) and tabular figures so values do not jump while sliding.
- **Honest tools list.** Only SIP and EMI are built; the rest are marked "Soon" rather than faked.
- **Palette:** cool grey paper, deep ink blue, leaf green for returns, amber for money you put in. Fonts: Bricolage Grotesque + Instrument Sans.
- Responsive, keyboard focus visible, reduced motion respected, one entrance animation only.
- Finance logic lives in `lib/finance.js` (pure functions, easy to test).

## Next
FD, tax and salary calculators, dark mode, unit tests for `lib/finance.js`.
