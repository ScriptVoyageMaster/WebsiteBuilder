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
    // Отримання наступного елемента після заголовка, який є контентом категорії
    const content = title.nextElementSibling;
    // Отримання значка категорії
    const icon = title.querySelector('.category-icon');
    // Отримання поточного значення властивості display для контенту
    const currentDisplay = window.getComputedStyle(content).display;

    // Перевірка поточного значення властивості display
    if (currentDisplay === 'none') {
        // Якщо контент прихований, відображаємо його та змінюємо значок на мінус
        content.style.display = 'block';
        icon.textContent = '-';
    } else {
        // Якщо контент відображений, приховуємо його та змінюємо значок на плюс
        content.style.display = 'none';
        icon.textContent = '+';
    }
}

}

// Експортувати клас, якщо ви використовуєте модулі
export default Accordion;
