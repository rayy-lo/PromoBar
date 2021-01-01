# \<promo-bar>

A web component to display promotions in a carousel for an online store. This web component follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Local Demo

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

```
<custom-element-demo>
  <template>
    <link rel="import" href="my-element.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```

```html
<promo-bar></promo-bar>
```

## Usage

```html
<script type="module">
  import 'promo-bar/promo-bar.js';
</script>

<promo-bar>
  <!-- Provide messages as children of web component -->
  <span>Promo Message</span>
  <span>
    <a href="#">Sales</a>
    Another Promo Message
  </span>
</promo-bar>
```

## Documentation

`<promo-bar>` can be styled and configured in a few ways to meet client needs.

###### Attributes

You can pass attributes `<promo-bar attribute></promobar>` to configure the web component.

| Attribute      | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| _hideButtons_  | Hides the left and right arrow buttons to change promotion messages |
| _autoCycleOff_ | Stops automatically cycling through the messages                    |

###### CSS Variables

`<promo-bar>` uses CSS variables for default styles to allow for styling from the outside.

```css
/* declare CSS variables in your stylesheet to override default */
:root {
  --text-color: red;
}
```

| CSS Variable         | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| _--text-color_       | Variable to change color of promo messages. _Default: white_              |
| _--bg-color_         | Variable to change background color of component. _Default: #232323_      |
| _--arrow-color_      | Variable to change color of arrow buttons. _Default: white_               |
| _--promo-bar-height_ | Variable to change height of component. _Default: 60px_                   |
| _--font_             | Variable to change font of messages. _Default: Arial, Roboto, sans-serif_ |
