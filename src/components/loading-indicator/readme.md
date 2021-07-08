---
title: Loading Indicator
description: Displays feedback about a current process. A user can infer that the system is functioning. Best for a system processes that precludes further user action until their completion.
demo:
  embedded:
  - name: Loading Form Example
    slug: example-index
  pages:
  - name: On the Page Body
    slug: example-body
  - name: Loading Input Elements
    slug: example-inputs
  - name: Non Blocking Loading Indicator
    slug: example-non-blocking
  - name: Inline/Smaller Loading Indicator
    slug: example-inline
  - name: Nested Loading Indicators
    slug: test-nested
  - name: transparent Overlay
    slug: example-transparent-overlay
  - name: Ajax Calls
    slug: test-ajax-calls
---

## Code Example

To use the loading indicator, place it on a element with class `loading`. Keep in mind it will center itself on that element.
You can provide the options inline in the `data-options`. This example below uses the initializer. If you're not using the initializer, call `$('#loading-form').loadingIndicator()` to initialize the plugin.

```html
<form id="loading-form" class="loading" action="#" method="POST" data-options="{ 'displayDelay': 100, 'timeToComplete': 4000, 'attributes' : [{ name: 'id', value: 'loadingindicator-id-1' }, { name: 'data-automation-id', value: 'loadingindicator-automation-id-1' }] }">
  <div class="field">
    <label for="loading-field-name">Name</label>
    <input type="text" id="loading-field-name" name="loading-field-name" value="" />
  </div>
  <div class="field">
    <label for="loading-field-address">Address</label>
    <input type="text" id="loading-field-address" name="loading-field-address" value="" />
  </div>
  <div class="field">
    <label for="loading-field-cats">Number of Cats</label>
    <input type="text" id="loading-field-cats" name="loading-field-cats" value="" />
  </div>
  <div class="field">
    <button type="submit" id="submit" class="btn-primary">Submit</button>
  </div>
</form>

```

When a task happens that requires the indicator, you can trigger the event on the element to force this indicator to show.

```javascript
$('#loading-form button[type="submit"]').click(function(e) {
  e.preventDefault();
  $('#loading-form').trigger('start.loading-indicator');
});

```

## Testability

The loading-indicator can have custom id's/automation id's that can be used for scripting. To add them, use the option `attributes` to set an id on the generated loading-indicator. This can take either an object or an array if doing several id's, and you can configure the automation id name. For example:

```js
  attributes: { name: 'id', value: args => `message-id-${args.id}` }
```

Setting the id/automation id with a string value:

```js
  attributes: { name: 'data-automation-id', value: 'my-unique-id' }
```

Setting the id/automation id with a string value:

```js
  attributes: [{ name: 'id', value: 'my-unique-id' }, { name: 'data-automation-id', value: 'my-unique-id' }]
```

Providing the data, this will add an ID added to each loading-indicator overlay with `-overlay`, active loading-indicator with `-loading-indicator`, loading-indicator text with `-text` and to the root loading-indicator element appended.

- Please refer to the [Application Testability Checklist](https://design.infor.com/resources/application-testability-checklist) for further details.

## Responsive Guidelines

Loading Indicators that block UI will usually be placed at a "container" or "form" level, and will cover the container or form elements with an overlay. The overlay should stretch to cover the width and height of the container or form.
