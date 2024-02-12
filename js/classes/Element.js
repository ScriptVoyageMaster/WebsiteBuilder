// Базовий клас для всіх елементів
class Element {
    constructor(type, content = '') {
        this.type = type; // Тип елемента, наприклад 'div', 'p'
        this.content = content; // Вміст елемента
        this.children = []; // Масив для зберігання дочірніх елементів
        this.styles = { zIndex: '1' }; // Початкові стилі для елемента
    }

    // Метод для додавання дочірніх елементів
    addChild(childElement) {
        this.children.push(childElement);
    }

    // Метод для встановлення CSS стилів
    setStyle(key, value) {
        this.styles[key] = value;
    }

    // Метод для рендерингу елемента та його дочірніх елементів
    render() {
        const element = document.createElement(this.type);
        element.textContent = this.content;
        Object.assign(element.style, this.styles);
        this.children.forEach(child => element.appendChild(child.render()));
        return element;
    }
}

export default Element;
