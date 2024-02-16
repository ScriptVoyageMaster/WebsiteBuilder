export default class Workspace {
  // Конструктор класу, викликається при створенні нового екземпляра Workspace
  constructor(element) {
    this.element = element; // Зберігає елемент DOM, з яким працюватиме клас
    // Додає обробники подій для dragover, drop і dragleave до елемента
    this.element.addEventListener('dragover', this.handleDragOver.bind(this));
    this.element.addEventListener('drop', this.handleDrop.bind(this));
    this.element.addEventListener('dragleave', this.clearPreview.bind(this));
    this.previewTimeout = null; // Змінна для зберігання ідентифікатора таймера попереднього перегляду
  }

  // Обробник події dragover
  handleDragOver(event) {
    event.preventDefault(); // Запобігає стандартній обробці події
    event.stopPropagation(); // Зупиняє розповсюдження події вище по DOM-дереву
    event.dataTransfer.dropEffect = 'move'; // Вказує ефект, який буде використано при відпусканні елемента

    clearTimeout(this.previewTimeout); // Скидає таймер, якщо він був раніше встановлений
    // Встановлює таймер для показу попереднього перегляду через 2 секунди
    this.previewTimeout = setTimeout(() => this.showPreview(event), 2000);

    // Перевіряє, чи існує елемент попереднього перегляду, і видаляє його, якщо так
    if (this.previewElement) {
      this.clearPreview();
    }
  }

  // Обробник події drop
  handleDrop(event) {
    event.preventDefault(); // Запобігає стандартній обробці події

    clearTimeout(this.previewTimeout); // Скидає таймер попереднього перегляду
    this.clearPreview(); // Видаляє елемент попереднього перегляду

    const type = event.dataTransfer.getData('type'); // Отримує тип елемента, який перетягується
    const newItem = this.createElement(type); // Створює новий елемент відповідного типу
    this.insertElement(event, newItem); // Вставляє новий елемент у робочу область
  }

  // Показує попередній перегляд елемента
  showPreview(event) {
    console.log('showPreview called');
    const type = event.dataTransfer.getData('type'); // Отримує тип елемента
    // Створює елемент попереднього перегляду з вказаним типом
    this.previewElement = this.createElement(type, true);

    // Вставляє елемент попереднього перегляду в робочу область
    this.insertElement(event, this.previewElement);
  }

  // Очищує попередній перегляд
  clearPreview() {
    clearTimeout(this.previewTimeout); // Також скидуємо таймер тут
    // Перевіряє, чи існує елемент попереднього перегляду та чи він є частиною робочої області
    if (this.previewElement && this.element.contains(this.previewElement)) {
      this.element.removeChild(this.previewElement); // Видаляє елемент попереднього перегляду
    }
    this.previewElement = null; // Скидає змінну елемента попереднього перегляду
  }
    
  // Вставляє елемент в робочу область
  insertElement(event, element, isPreview = false) {
    if (!element) {
      console.error('Cannot insert null element');
      return; // Вихід з функції, якщо елемент не визначено
    }
    const cursorY = event.clientY; // Отримує вертикальну позицію курсора
    const children = Array.from(this.element.children); // Отримує всі дочірні елементи робочої області
    let insertBeforeElement = null; // Змінна для зберігання елемента, перед яким буде вставлено новий елемент

    // Проходить по всім дочірнім елементам, щоб знайти місце для вставки нового елемента
    for (let i = 0; i < children.length; i++) {
      const current = children[i];
      const next = children[i + 1];
      const currentRect = current.getBoundingClientRect();
      let middlePoint = currentRect.bottom;

      if (next) {
        const nextRect = next.getBoundingClientRect();
        middlePoint = (currentRect.bottom + nextRect.top) / 2; // Визначає середину між поточним та наступним елементом
      }

      // Якщо курсор знаходиться вище середини, визначається місце для вставки перед поточним елементом
      if (cursorY < middlePoint) {
        insertBeforeElement = current;
        break;
      }
    }

    // Вставляє новий елемент у визначене місце
    if (insertBeforeElement) {
      this.element.insertBefore(element, insertBeforeElement);
    } else {
      this.element.appendChild(element); // Якщо місце не визначено, вставляє в кінець
    }

    // Якщо це попередній перегляд, встановлюється таймер для його очищення
    if (isPreview) {
      setTimeout(() => this.clearPreview(), 2000);
    }
  }

  // Створює елемент відповідно до типу
  createElement(type, isPreview = false) {
    let element;

    // Вибір типу елемента для створення
    switch (type) {
      case 'paragraph':
        element = document.createElement('p'); // Створює параграф
        element.textContent = isPreview ? 'Попередній абзац' : 'Новий абзац'; // Встановлює текст
        break;
      case 'heading':
        element = document.createElement('h1'); // Створює заголовок
        element.textContent = isPreview ? 'Попередній заголовок' : 'Новий заголовок'; // Встановлює текст
        break;
      default:
        console.error('Невідомий тип елемента:', type); // Виводить помилку, якщо тип не визначено
        return null; // Повертає null, щоб уникнути подальших помилок
    }

    // Якщо це попередній перегляд, встановлюється стиль для елемента
    if (isPreview && element) {
      element.style.backgroundColor = 'lightgreen'; // Встановлює зелений колір фону
      element.style.opacity = '0.5'; // Зменшує прозорість
    }

    return element; // Повертає створений елемент
  }
}
