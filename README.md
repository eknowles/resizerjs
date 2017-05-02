# Resizer.js

[![Build Status](https://travis-ci.org/eknowles/resizerjs.svg?branch=master)](https://travis-ci.org/eknowles/resizerjs)
[![Coverage Status](https://coveralls.io/repos/github/eknowles/resizerjs/badge.svg?branch=master)](https://coveralls.io/github/eknowles/resizerjs?branch=master)
[![GitHub stars](https://img.shields.io/github/stars/eknowles/resizerjs.svg)](https://github.com/eknowles/resizerjs/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/eknowles/resizerjs.svg)](https://github.com/eknowles/resizerjs/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/eknowles/resizerjs.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

Resizer is a javascript library for handling custom resizing of flex box elements.

This allows the user to drag a handle to resize the frame.

# TODO

- [X] snap by 20 px
- [X] add tests
- [ ] allow up down resizing
- [ ] add coverage
- [ ] add travis
- [ ] add demo page
- [ ] create npm

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
    flex: 0 0 6px;
    background-color: rgba(0, 0, 0, 0.5);
}

[data-rz-handle] div {
    width: 6px;
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
