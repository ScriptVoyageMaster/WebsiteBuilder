// Оголошення базового класу для елемента
class Element {
    // Конструктор класу приймає тип елемента та необов'язковий вміст
    constructor(type, content = '') {
        this.type = type; // Тип елемента (наприклад, 'div', 'p', 'span')
        this.content = content; // Вміст елемента, який буде відображено всередині
        this.children = []; // Масив дочірніх елементів
        this.parent = null; // Батьківський елемент, спочатку відсутній
        this.styles = { zIndex: 1 }; // Об'єкт для зберігання CSS стилів, початково лише з-index
        this.attributes = {}; // Об'єкт для зберігання HTML атрибутів елемента
    }

    // Метод для додавання дочірнього елемента
    addChild(child) {
        child.parent = this; // Встановлення поточного елемента як батька для дочірнього
        this.children.push(child); // Додавання дочірнього елемента до масиву дочірніх елементів
    }

    // Метод для встановлення CSS стилю для елемента
    setStyle(property, value) {
        this.styles[property] = value; // Додавання або оновлення значення стилю
    }

    // Метод для встановлення атрибута елемента
    setAttribute(name, value) {
        this.attributes[name] = value; // Додавання або оновлення значення атрибута
    }

    // Метод для генерації HTML елемента на основі властивостей об'єкта
    render() {
        const element = document.createElement(this.type); // Створення HTML елемента заданого типу
        element.textContent = this.content; // Встановлення вмісту елемента

        // Застосування стилів до елемента
        Object.entries(this.styles).forEach(([key, value]) => {
            element.style[key] = value; // Застосування кожного стилю до елемента
        });

        // Додавання атрибутів до елемента
        Object.entries(this.attributes).forEach(([name, value]) => {
            element.setAttribute(name, value); // Додавання кожного атрибута до елемента
        });

        // Рекурсивне додавання дочірніх елементів
        this.children.forEach(child => {
            element.appendChild(child.render()); // Рендер кожного дочірнього елемента та додавання його до поточного
        });

        return element; // Повернення створеного та налаштованого HTML елемента
    }
}
