| Statements                                                                  | Branches                                                                  | Functions                                                                  | Lines                                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

# Probability pick

This is a simple package that lets you create probability-based objects. Let me show you:

```typescript
import ProbabilityPick from "probability-pick";

const picker = new ProbabilityPick({
  key1: 50,
  key2: 50,
});

picker.get(); // the probability of this returning key1 is 50%. The same goes for key2
```

If you have a lot of keys or the probabilities are not so easy to keep track of you can use `auto`

```typescript
const picker = new ProbabilityPick({
  key1: "auto",
  key2: 25,
  key3: 12.5,
  key4: 12.5,
  key5: "auto",
});

picker.get(); // the probability of this returning key1 is 25%. The same goes for key5
```

This package handles nested probabilities too:

```typescript
const picker = new ProbabilityPick({
  boys: {
    probability: 60,
    config: {
      John: 70,
      Adam: "auto",
      Chris: "auto",
    },
  },
  girls: {
    probability: 40,
    config: {
      Marie: 30,
      Carol: "auto",
      Natalie: 40,
    },
  },
});

picker.get(); // Here the probability of, for example, John being picked is 42%
```
