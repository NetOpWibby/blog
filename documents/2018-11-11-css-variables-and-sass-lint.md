---
title:      Using CSS variables with Sass-Lint
date:       2018-11-11
tags:       code-snippet
tldr:
color:
published:  false
---

// https://github.com/sasstools/sass-lint/issues/1161#issuecomment-390537190

```sass
@mixin root-prop($prop: null, $value: null) {
  @if ($prop and $value) {
    #{$prop}: $value;
  }
}
```

```sass
:root {
  @include root-prop(--root-prop, #000000);
}
```

```css
:root {
  --root-prop: #000000;
}
```
