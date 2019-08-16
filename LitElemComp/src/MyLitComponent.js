import { LitElement, html, property } from 'lit-element';

export default class extends LitElement {

  @property({ type: String }) 
  myProp = 123;
  render() {
    
    return html`<p>222111!Lit-element ComponentZZZZ</p>`;
  }
}