import Element from './classes/Element.js'; // Імпорт базового класу Element
import TextElement from './classes/TextElement.js'; // Імпорт класу TextElement
import Accordion from './Accordion.js'; // Імпортування класу Accordion

// Функція, що ініціалізує додаток
function initApp() {
    const workspace = document.getElementById('workspace'); // Отримання робочої області

    // Створення та додавання текстового елемента до робочої області
    const textElement = new TextElement('Привіт, світ!');
    workspace.appendChild(textElement.render());
}

// Ініціалізація додатку після завантаження DOM
document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація акордеону для панелі елементів
    new Accordion('.element-panel');
});