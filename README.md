# Resizer.js

Resizer is a javascript library for handling custom resizing of flex box elements.

This allows the user to drag a handle to resize the frame.

## Installation

Install with NPM

```bash
$ npm i resizerjs
```

Add script to the document

```html
<script src="./node_modules/resizerjs/dist/resizer.min.js"></script>
```

Add the CSS and customise how you wish.

```css
[data-rz-handle] {
    flex: 0 0 8px;
    width: 8px;
    background-color: black;
}

[data-rz-handle] div {
    width: 8px;
    background-color: rgba(0, 0, 0, 0.5);
}
```

## Usage

Create an instance of Resizer. Use a CSS selector of the container element as the first argument.

##### JavaScript

```javascript
const myResizer = new Resizer('.container');
```

##### HTML

```html
<div class="container">
    <div class="item"></div>
    <div class="item"></div>
</div>
```
