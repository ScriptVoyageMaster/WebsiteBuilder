// Клас для робочої області Workspace.js
class Workspace {
    constructor(element) {
       // console.log("фіпфівп");
        this.element = element; // DOM елемент робочої області
        this.element.addEventListener('dragover', this.handleDragOver.bind(this)); // Додавання обробника події dragover
        this.element.addEventListener('drop', this.handleDrop.bind(this)); // Додавання обробника події drop
    }

    // Обробник події dragover
    handleDragOver(event) {
         // Запобігання стандартній поведінці перетягування
    event.preventDefault();

    // Визначення цільового елемента на основі позиції курсора
    const newDropTarget = document.elementFromPoint(event.clientX, event.clientY);
    
    // Перевірка, чи є поточний dropTarget, і видалення класу drop-target, якщо він існує
    if (this.dropTarget) {
        this.dropTarget.classList.remove('drop-target');
    }
    
    // Встановлення класу drop-target для нового dropTarget, якщо він існує
    if (newDropTarget) {
        newDropTarget.classList.add('drop-target');
    }

    // Зберігання нового dropTarget для подальшого використання
    this.dropTarget = newDropTarget;
      }

    // Обробник події drop
    // Обробник події drop
handleDrop(event) {
    // Запобігання стандартній поведінці скидання
    event.preventDefault();

    // Отримання типу елемента, що перетягується
    const type = event.dataTransfer.getData('type');

    // Створення нового елемента на основі типу
    const newItem = this.createElement(type);

    // Отримання елемента, над яким відбувається скидання
    const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
    //console.log(dropTarget);
    // Перевірка, чи є dropTarget дочірнім елементом робочої області
    if (dropTarget && this.element.contains(dropTarget)) {
        // Вставка нового елемента в кінець елемента робочої області
        this.element.appendChild(newItem);
    } else {
        // Вставка нового елемента перед або після dropTarget в залежності від положення курсора
        const rect = this.element.getBoundingClientRect();
        const offsetY = event.clientY - rect.top;
        const insertBefore = offsetY < dropTarget.offsetHeight / 2;

        if (insertBefore) {
            this.element.insertBefore(newItem, dropTarget);
        } else {
            this.element.insertBefore(newItem, dropTarget.nextSibling);
        }
    }
}

    // Метод для створення нового елемента в робочій області
    createElement(type) {
        let newItem = null;
        
        // Визначення, як створити новий елемент на основі його типу
        switch (type) {
            case 'paragraph':
                newItem = document.createElement('p');
                newItem.textContent = 'Новий абзац';
                break;
            case 'heading':
                newItem = document.createElement('h1');
                newItem.textContent = 'Новий заголовок';
                break;
            // Додайте інші випадки для різних типів елементів
        }
       // console.log(newItem);
        // Повертаємо новий елемент для додавання в робочу область
        return newItem;
    }
    
}
export default Workspace;