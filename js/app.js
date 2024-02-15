import Element from './classes/Element.js'; // Імпорт базового класу Element
import TextElement from './classes/TextElement.js'; // Імпорт класу TextElement
import Accordion from './Accordion.js'; // Імпортування класу Accordion
import DraggableElement from './classes/DraggableElement.js'; // Імпорт класу DraggableElement
import Workspace from './classes/Workspace.js'; // Імпорт класу Workspace



document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація акордеону для панелі елементів
    new Accordion('.element-panel');
    // Ініціалізація перетягуваних елементів
    document.querySelectorAll('.draggable-element').forEach(element => {
        new DraggableElement(element); 
    });
     // Ініціалізація робочої області
     const workspaceElement = document.getElementById('workspace');
     new Workspace(workspaceElement);
});

