Dom.js
======

A super lightweight DOM factory library

##Usage

Dom.js takes a plain javascript object and translates it to one or more DOM elements ready for insertion. The object can declare attributes and styles and nest other dom elements.

_ Here's an exmpale of an nested object that is translating to a Dom Tree _

```javascript
var form = Dom.create("div", {
  styles: {
    border: "1px solid #ccc",
    padding: ".5em"
  },
  h3: {
    text: "Join our Newsletter"
  },
  div: {
    className: "row collapse",
    div: {
      nodes:[{
        className: "small-10 columns",
        input: {
          styles: {
            padding: ".35em"
          },
          type: "text",
          placeholder: "Enter your email"
        }
      },{
        className: "small-2 columns",
        button: {
          className: "button postfix",
          text: "Submit"
        }
      }]
    }
  }
});

document.body.appendChild(form);
```

## Uses

The best use cases would be translating DOM like JSON responses from a server, most likely one powered by an MVC framework that produces JSON views.
