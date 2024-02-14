// TextElement.js
import Element from './Element.js'; // Імпорт базового класу Element

// Клас для текстових елементів, розширює базовий клас Element
class TextElement extends Element {
    constructor(content) {
        super('p', content); // Виклик конструктора базового класу з типом 'p'
        this.setStyle('fontSize', '16px'); // Встановлення базового розміру шрифту
        this.setStyle('color', '#000'); // Встановлення базового кольору тексту
    }
}

export default TextElement;
