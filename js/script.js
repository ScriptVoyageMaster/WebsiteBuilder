// script.js
// Ініціалізація основних функцій після завантаження DOM.
document.addEventListener("DOMContentLoaded", function () {
    initializeCategoryToggle();
    initializeTabs();
    initializeDragAndDrop();
    initializeSiteTree();
    initializeEscapeKey();
});

// Ініціалізує можливість згортання/розгортання категорій елементів.
function initializeCategoryToggle() {
    var categories = document.querySelectorAll('.element-category .category-title');
    categories.forEach(categoryToggle);
}

// Визначає поведінку згортання/розгортання для кожної категорії.
function categoryToggle(category) {
    category.addEventListener('click', function() {
        var content = this.nextElementSibling;
        var icon = this.querySelector('.category-icon');
        if (content.style.display === "block") {
            content.style.display = "none";
            icon.textContent = '+'; // Закрита категорія
        } else {
            content.style.display = "block";
            icon.textContent = '-'; // Відкрита категорія
        }
    });
}

// Ініціалізує перемикання між вкладками.
function initializeTabs() {
    const tabs = document.querySelectorAll(".tab-header");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => activateTab(tab));
    });
}

// Активує вкладку та відповідний їй контент.
function activateTab(tab) {
    const target = document.querySelector("#" + tab.getAttribute("data-tab"));
    const tabs = document.querySelectorAll(".tab-header");
    const tabContents = document.querySelectorAll(".tab-content");
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    target.classList.add("active");
}

// Налаштовує функціонал перетягування елементів.
function initializeDragAndDrop() {
    document.querySelectorAll('.draggable-element').forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    const workspace = document.getElementById('workspace');
    workspace.addEventListener('dragover', dragOver);
    workspace.addEventListener('drop', drop);
}

// Обробляє початок перетягування.
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.type);
}

// Дозволяє перетягування над робочою областю.
function dragOver(e) {
    e.preventDefault();
}

// Обробляє випадання елемента на робочу область.
function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("text/plain");
    addElementToWorkspace(type);
}

// Додає елемент до робочої області.
function addElementToWorkspace(type) {
    let element = createDraggableElement(type);
    if (element) {
        const workspace = document.getElementById('workspace');
        const nextIndex = workspace.querySelectorAll('.draggable-element').length;
        element.setAttribute('data-index', nextIndex); // Встановлює індекс для нового елемента.
        workspace.appendChild(element);
        updateSiteTree(); // Оновлює дерево сайту після додавання нового елемента.
    }
}

// Створює новий елемент відповідно до типу.
function createDraggableElement(type) {
    let element = null;
    // Створення абзацу
    if (type === 'paragraph') {
        element = document.createElement('p');
        element.textContent = 'Новий абзац';
        element.className = 'draggable-element';
        element.setAttribute('draggable', true);
        element.addEventListener('click', () => elementClick(element));
    }
    // Створення заголовку
    if (type === 'heading') {
        element = document.createElement('h1');
        element.textContent = 'Новий заголовок';
        element.className = 'draggable-element';
        element.setAttribute('draggable', true);
        element.addEventListener('click', () => elementClick(element));
    }
    // Можливість додавання інших типів елементів
    return element;
}

// Встановлює активний стан для елемента при кліку на нього.
function elementClick(element) {
    clearActiveElements(); // Очищує активний стан усіх елементів.
    element.classList.add('active'); // Встановлює активний стан для поточного елемента.
    highlightElementInTree(element.dataset.index); // Виділяє елемент у дереві сайту.
}

// Ініціалізує дерево сайту.
function initializeSiteTree() {
    updateSiteTree();
    const workspace = document.getElementById('workspace');
    workspace.addEventListener('drop', () => setTimeout(updateSiteTree, 0)); // Оновлює дерево сайту після кожного додавання нового елемента.
}

// Оновлює дерево сайту.
function updateSiteTree() {
    const workspace = document.getElementById('workspace');
    const treeContainer = document.getElementById('tree');
    const elements = workspace.querySelectorAll('.draggable-element');
    treeContainer.innerHTML = '<ul>' + Array.from(elements).map((element, index) =>
        `<li data-index="${index}">${element.textContent || 'Елемент'}</li>`).join('') + '</ul>';
    treeContainer.querySelectorAll('li').forEach(item => item.addEventListener('click', treeItemClick)); // Призначає обробник події для кожного елемента дерева.
}

// Активує елемент у робочій області, коли клікають на відповідний елемент у дереві сайту.
function treeItemClick() {
    console.log("treeItemClick called"); // Виводить повідомлення у консоль для дебагу.
    const index = this.getAttribute('data-index');
    console.log("Clicked index:", index); // Виводить індекс клікнутого елемента у консоль.
    activateElementInWorkspace(index); // Активує елемент у робочій області.
}

// Активує елемент у робочій області за індексом.
function activateElementInWorkspace(index) {
    const workspace = document.getElementById('workspace');
    clearActiveElements(); // Очищує активний стан усіх елементів.
    const elementToActivate = workspace.querySelector(`.draggable-element[data-index="${index}"]`);
    if (elementToActivate) {
        elementToActivate.classList.add('active'); // Встановлює активний стан для вибраного елемента.
        highlightElementInTree(index); // Виділяє відповідний елемент у дереві сайту.
    }
}

// Очищує активний стан елементів у робочій області та дереві сайту.
function clearActiveElements() {
    document.querySelectorAll('#workspace-container .active').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('#tree .active').forEach(el => {
        el.classList.remove('active');
    });
}

// Виділяє елемент у дереві сайту за індексом.
function highlightElementInTree(index) {
    const treeItems = document.querySelectorAll('#tree li');
    treeItems.forEach(item => {
        item.classList.remove('active'); // Видаляє клас 'active' з усіх елементів.
        if (item.getAttribute('data-index') === index) {
            item.classList.add('active'); // Додає клас 'active' до елемента з відповідним індексом.
        }
    });
}

// Видаляє активний елемент з робочої області та оновлює індекси.
function deleteActiveElement() {
    const activeElement = document.querySelector('.workspace .active'); // Знаходить активний елемент у робочій області.
    if (activeElement) {
        activeElement.remove(); // Видаляє активний елемент.
        updateIndexes(); // Оновлює індекси для усіх елементів.
        updateSiteTree(); // Оновлює дерево сайту.
    }
}

// Оновлює індекси для усіх елементів у робочій області після видалення елемента.
function updateIndexes() {
    const elements = document.querySelectorAll('.workspace .draggable-element');
    elements.forEach((element, index) => {
        element.setAttribute('data-index', index); // Встановлює новий індекс для кожного елемента.
    });
}

// Ініціалізує обробку натискання клавіші Escape для очищення активного стану елементів та клавіші Delete для видалення активного елемента.
function initializeEscapeKey() {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            clearActiveElements(); // Очищує активний стан усіх елементів при натисканні клавіші Escape.
        }
        if (e.key === "Delete") {
            deleteActiveElement(); // Видаляє активний елемент при натисканні клавіші Delete.
        }
    });
}
