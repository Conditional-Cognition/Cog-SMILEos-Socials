Just add another entry to the `enemyData` object in script.js — the grid and detail pages both build themselves from that object automatically, so nothing else needs to change.

```javascript
const enemyData = {
    artfight: { ... },
    youtube: { ... },
    github: { ... },
    twitter: {
        name: 'TWITTER',
        url: 'https://twitter.com/yourhandle',
        image: 'assets/enemies/twitter.png',
        description: 'Your description here.'
    }
};
```

Drop `twitter.png` into `assets/enemies/` at 256×256 like the others, and that's the whole addition.

One thing worth knowing: the locked "?" placeholder count is currently hardcoded at 3 (`Array(3).fill(...)`), sized so 3 real entries + 3 locked = 6 cells, filling two full rows of the 3-wide grid. If you add a 4th real entry without touching that number, you'll get 7 cells total, which wraps into a 3rd row with just one locked tile sitting next to it — not broken, just slightly lopsided. If you want it to stay tidy, drop that `3` to `2` each time you add a real entry to keep the total a multiple of 3.
