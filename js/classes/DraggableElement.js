// Клас для перетягуваних елементів DraggableElement.js
class DraggableElement {
    constructor(element) {
        this.element = element; // DOM елемент, який можна перетягувати
        this.element.setAttribute('draggable', true); // Встановлення елементу атрибуту draggable
        this.element.addEventListener('dragstart', this.handleDragStart.bind(this)); // Додавання обробника події dragstart
        // console.log("Подія");
    }

    // Обробник події dragstart
    handleDragStart(event) {
        const type = this.element.getAttribute('data-type'); // Отримання типу елемента з атрибуту data-type
        event.dataTransfer.setData('type', type); // Встановлення типу елемента як даних для перетягування
    }
}
export default DraggableElement;