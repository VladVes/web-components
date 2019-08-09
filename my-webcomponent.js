export class MyWebComp extends HTMLElement {
  connectedCallback() {
      // this.insertAdjacentHTML('beforeEnd', `<div>Hellow!</div>`);

      // const tmpEl = document.querySelector('#myWebCompTemplate');
      // const html = document.importNode(tmpEl.content, true);

      const html = document.importNode(myWebCompTemplate.content, true); // копирование // все айдишники элементов прокидываются в глобальное пространство имен
      // Долгое время использование id считалось дурным тоном, потому что на значительных объемах кода они могли дублироваться, что приводило к коллизиям. Однако, с появлением технологии теневого дерева можно внутреннее содержимое элемента изолировать использовать id, стили и прочие ресурсы без опасений. Для веб-компонентов включается теневое дерево следующим образом:
      this.attachShadow({ mode: 'open' });
      // все DOM обращения к this придется заменить на this.shadowRoot
      this.shadowRoot.appendChild(html);
      this.shadowRoot.querySelector('#helloLabel').textContent += ' ' + this.getAttribute('greet-name'); // добавление содержимого аттрибута при создании
      // Вместо .textContent может быть .innerHTML или можно вызвать у объекта из селектора метод .insertAdjacentHTML() 
  }
  showMessage(event) {
      alert("This is the message from " + this.getAttribute('greet-name'));
      console.log(event);
  }
}