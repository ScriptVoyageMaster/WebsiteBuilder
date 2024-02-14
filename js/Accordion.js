// Accordion.js
class Accordion {
    constructor(selector) {
        this.accordion = document.querySelector(selector); // Знайти акордеон у DOM за селектором
        this.bindEvents(); // Прив'язати події до елементів акордеону
    }

    // Метод для прив'язки подій кліку до заголовків категорій
    bindEvents() {
        this.accordion.querySelectorAll('.category-title').forEach(title => {
            title.addEventListener('click', () => this.toggleCategory(title));
        });
    }

    // Метод для згортання/розгортання категорії
    toggleCategory(title) {
        const content = title.nextElementSibling;
        const icon = title.querySelector('.category-icon');
        const currentDisplay = window.getComputedStyle(content).display;
    
        if (currentDisplay === 'none') {
            content.style.display = 'block';
            icon.textContent = '-';
        } else {
            content.style.display = 'none';
            icon.textContent = '+';
        }
     }
}

// Експортувати клас, якщо ви використовуєте модулі
export default Accordion;
