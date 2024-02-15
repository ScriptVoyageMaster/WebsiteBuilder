export default class Workspace {
    constructor(element) {
      this.element = element;
      this.element.addEventListener('dragover', this.handleDragOver.bind(this));
      this.element.addEventListener('drop', this.handleDrop.bind(this));
      this.element.addEventListener('dragleave', this.clearPreview.bind(this));
      this.previewTimeout = null;
    }
  
   

    handleDragOver(event) {
  event.preventDefault();
  event.stopPropagation(); // Зупиняємо подальшу пропагацію події
  event.dataTransfer.dropEffect = 'move';

  clearTimeout(this.previewTimeout);
  this.previewTimeout = setTimeout(() => this.showPreview(event), 2000);

  // Видаляємо попередній елемент попереднього перегляду, якщо він існує
  if (this.previewElement) {
    this.clearPreview();
  }
}

  
    handleDrop(event) {
      event.preventDefault();
  
      // Очищуємо попередній перегляд
      clearTimeout(this.previewTimeout);
      this.clearPreview();
  
      const type = event.dataTransfer.getData('type');
      const newItem = this.createElement(type);
      this.insertElement(event, newItem);
    }
  
    showPreview(event) {
        
      const type = event.dataTransfer.getData('type');
      this.previewElement = this.createElement(type, true); // Створюємо елемент попереднього перегляду
  
      this.insertElement(event, this.previewElement);
    }
  
    clearPreview() {
      if (this.previewElement && this.element.contains(this.previewElement)) {
        this.element.removeChild(this.previewElement);
      }
      this.previewElement = null;
    }
  
    insertElement(event, element, isPreview = false) {
      const cursorY = event.clientY;
      const children = Array.from(this.element.children);
      let insertBeforeElement = null;
  
      for (let i = 0; i < children.length; i++) {
        const current = children[i];
        const next = children[i + 1];
        const currentRect = current.getBoundingClientRect();
        let middlePoint = currentRect.bottom;
  
        if (next) {
          const nextRect = next.getBoundingClientRect();
          middlePoint = (currentRect.bottom + nextRect.top) / 2;
        }
  
        if (cursorY < middlePoint) {
          insertBeforeElement = current;
          break;
        }
      }
  
      if (insertBeforeElement) {
        this.element.insertBefore(element, insertBeforeElement);
      } else {
        this.element.appendChild(element);
      }
  
      // Якщо це попередній перегляд, не додаємо його до DOM постійно
      if (isPreview) {
        setTimeout(() => this.clearPreview(), 2000);
      }
    }
  
    createElement(type, isPreview = false) {
        let element;
      
        switch (type) {
          case 'paragraph':
            element = document.createElement('p');
            element.textContent = isPreview ? 'Попередній абзац' : 'Новий абзац';
            break;
          case 'heading':
            element = document.createElement('h1');
            element.textContent = isPreview ? 'Попередній заголовок' : 'Новий заголовок';
            break;
          // Додайте додаткові типи елементів за потребою
          default:
            console.error('Невідомий тип елемента:', type);
            return null; // Повертаємо null, щоб запобігти подальшим помилкам
        }
      
        if (isPreview && element) { // Переконуємося, що елемент був створений, перш ніж змінювати стилі
          element.style.backgroundColor = 'lightgreen';
          element.style.opacity = '0.5';
        }
      
        return element;
      }
  }
  