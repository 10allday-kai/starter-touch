# Kai Components

## KaiText

### Props (attributes)

- `[as]`: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "sub-1" | "sub-2" | "body-1" | "body-2"
- `[transform]`: "capitalize" | "lowercase" | "uppercase" | "none"

### Example

```html
<!-- Header Title -->
<kai-text as="h2">Title</kai-text>
<!-- With transform -->
<kai-text as="sub-1" tarnsform="capitalize">primary text</kai-text>
```

## KaiIcon

### Props (attribute)

- `[size]`: 24 | 32

### List of ligatures

To discover the name of the icon to use check the [doc path]('../../doc/gaia-icons/demo.html').

### Examples

```html
<!-- size 24x24 px -->
<kai-icon>mic</kai-icon>
<!-- size 32x32 px -->
<kai-icon size="32">menu</kai-icon>
```

## KaiButton

### Props (attributes)

- `[type]`: "rounded" | "flat" | "flat-icon"
- `[secondary]`: `boolean`
- `[disabled]`: `boolean`
- `[toggle]`: "on" | "off"

### Example

```html
<!-- Rounded -->
<kai-button>Save</kai-button>
<!-- Flat -->
<kai-button type="flat">Done</kai-button>
<!-- Flat Icon -->
<kai-button type="flat-icon">menu</kai-button>
```

## KaiHeader

### Props (attributes)

- `[mode]`: "standard" | "slidable" | "fixed" | "shrinkable"

### Slots

- `left`: To render side menu icon
- `content`: To render title and secondary text
- `right`: To render action buttons (`kai-button[type="flat"]`)
- `right-icon`: To render icon buttons (`kai-button[type="flat-icon"]`)

### Examples

```html
<!-- standard with title and subtitle -->
<kai-header>
  <kai-text as="h2" slot="content">Title</kai-text>
  <kai-text as="sub-1" slot="content">Secondary text</kai-text>
</kai-header>
<!-- slidable with right icons -->
<kai-header mode="slidable">
  <kai-text as="h2" slot="content">Title</kai-text>
  <kai-button type="flat-icon" slot="right-icons">menu</kai-button>
</kai-header>
<!-- fixed with right actions -->
<kai-header mode="fixed">
  <kai-text as="h2" slot="content">Title</kai-text>
  <kai-button type="flat" slot="right">Done</kai-button>
</kai-header>
```