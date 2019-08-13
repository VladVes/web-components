const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }

    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;

      width: 100%;
      height: 40px;

      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>

  <div class="container">
    <button>Label</button>
  </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('button');

    // What’s missing is a callback function given from the outside that can be called within this listener.
    // we could pass the function as attribute. However, since we have learned that passing non primitives to HTML elements is cumbersome, we would like to avoid this case
    // so we could pass the function as property like this:
    // <my-button label="Click Me"></my-button>

    // <script>
    //   document.querySelector('my-button').onClick = value =>
    //     console.log(value);
    // </script>
    this.$button.addEventListener('click', () => {
      // if we have defined property onClick document.querySelector('my-button').onClick = (value) => {};
      // we can call it here:
      // this.onClick('Wow man you have just clicked the button!\nHello from within the Custom Element!');

      // Now, even though this works as expected, I would rather use the built-in event system provided by the DOM API.
      // Therefore, let’s register an event listener from the outside instead without assigning the function as property to the element:
      // <script>
      //   document
      //     .querySelector('my-button')
      //     .addEventListener('click', value => console.log(value));
      // </script>

      // if you would later on use your Web Component in a different environment (e.g. React),
      // you may want to offer custom events (e.g. onClick) as API for your component as well
      this.dispatchEvent(
        new CustomEvent('onClick', { detail: 'Wow man you have just clicked the button!\nHello from within the Custom Element!' })
      );

      // do something 
      // alert('Wow man you have just clicked the button!');
    });
  }

  // to reflect the attribute to a property 
  get label() {
    return this.getAttribute('label');
  }

  // to reflect the property to an attribute - to set iformation as property like this:
  // <my-button></my-button>
  // 
  // <script>
  //   const element = document.querySelector('my-button');
  //   element.label = 'Click Me';
  // </script>
  // we need setter method to be defined:
  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    // this[name] = newVal;

    // if we have get label() getter method we don't need to use "this[name] = newVal;" antmore for label attribute al least
    this.render();
  }

  render() {
    // this.label is always returns current attribute value because we have getter method "get label"
    this.$button.innerHTML = this.label;
  }

}

window.customElements.define('my-button', Button);