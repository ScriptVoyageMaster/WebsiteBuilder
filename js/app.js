import Element from './classes/Element.js'; // Імпорт базового класу Element
import TextElement from './classes/TextElement.js'; // Імпорт класу TextElement
import Accordion from './Accordion.js'; // Імпортування класу Accordion
import DraggableElement from './classes/DraggableElement.js'; // Імпорт класу DraggableElement
import Workspace from './classes/Workspace.js'; // Імпорт класу Workspace


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


document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація перетягуваних елементів
    document.querySelectorAll('.draggable-element').forEach(element => {
        new DraggableElement(element); 
    });

    // Ініціалізація робочої області
    const workspaceElement = document.getElementById('workspace');
    new Workspace(workspaceElement);
    
});
