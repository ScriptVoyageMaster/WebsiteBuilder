// script.js

document.addEventListener("DOMContentLoaded", function () {
    initializeCategoryToggle();
    initializeTabs();
    initializeDragAndDrop();
    initializeSiteTree();
    initializeEscapeKey();
});

function initializeCategoryToggle() {
    var categories = document.querySelectorAll('.element-category .category-title');
    categories.forEach(categoryToggle);
}

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

function initializeTabs() {
    const tabs = document.querySelectorAll(".tab-header");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => activateTab(tab));
    });
}

function activateTab(tab) {
    const target = document.querySelector("#" + tab.getAttribute("data-tab"));
    const tabs = document.querySelectorAll(".tab-header");
    const tabContents = document.querySelectorAll(".tab-content");
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    target.classList.add("active");
}

function initializeDragAndDrop() {
    document.querySelectorAll('.draggable-element').forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    const workspace = document.getElementById('workspace');
    workspace.addEventListener('dragover', dragOver);
    workspace.addEventListener('drop', drop);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.type);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("text/plain");
    addElementToWorkspace(type);
}

function addElementToWorkspace(type) {
    let element = createDraggableElement(type);
    if (element) {
        const workspace = document.getElementById('workspace');
        const nextIndex = workspace.querySelectorAll('.draggable-element').length;
        element.setAttribute('data-index', nextIndex); // Важливо!
        workspace.appendChild(element);
        updateSiteTree();
    }
}


function createDraggableElement(type) {
    let element = null;
    if (type === 'paragraph') {
        element = document.createElement('p');
        element.textContent = 'Новий абзац';
        element.className = 'draggable-element';
        element.setAttribute('draggable', true);
        element.addEventListener('click', () => elementClick(element));
    }
    if (type === 'heading') {
        element = document.createElement('h1');
        element.textContent = 'Новий заголовок';
        element.className = 'draggable-element';
        element.setAttribute('draggable', true);
        element.addEventListener('click', () => elementClick(element));
    }
    // Додайте інші типи елементів за потребою
    return element;
}

function elementClick(element) {
    clearActiveElements();
    element.classList.add('active');
    highlightElementInTree(element.dataset.index);
}

function initializeSiteTree() {
    updateSiteTree();
    const workspace = document.getElementById('workspace');
    workspace.addEventListener('drop', () => setTimeout(updateSiteTree, 0));
}

function updateSiteTree() {
    const workspace = document.getElementById('workspace');
    const treeContainer = document.getElementById('tree');
    const elements = workspace.querySelectorAll('.draggable-element');
    treeContainer.innerHTML = '<ul>' + Array.from(elements).map((element, index) =>
        `<li data-index="${index}">${element.textContent || 'Елемент'}</li>`).join('') + '</ul>';
    treeContainer.querySelectorAll('li').forEach(item => item.addEventListener('click', treeItemClick));
}

// function treeItemClick() {
//     const index = this.getAttribute('data-index');
//     activateElementInWorkspace(index);
// }
function treeItemClick() {
    console.log("treeItemClick called");
    const index = this.getAttribute('data-index');
    console.log("Clicked index:", index);
    activateElementInWorkspace(index);
}
function activateElementInWorkspace(index) {
    const workspace = document.getElementById('workspace');
    clearActiveElements();
    const elementToActivate = workspace.querySelector(`.draggable-element[data-index="${index}"]`);
    if (elementToActivate) {
        elementToActivate.classList.add('active');
        highlightElementInTree(index);
    }
}

function clearActiveElements() {
    // Видаляємо клас 'active' з елементів у робочій області
    document.querySelectorAll('#workspace-container .active').forEach(el => {
        el.classList.remove('active');
    });

    // Видаляємо клас 'active' з елементів у дереві сайту
    document.querySelectorAll('#tree .active').forEach(el => {
        el.classList.remove('active');
    });
}

function highlightElementInTree(index) {
    const treeItems = document.querySelectorAll('#tree li');
    treeItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-index') === index) {
            item.classList.add('active');
        }
    });
}
function deleteActiveElement() {
    const activeElement = document.querySelector('.workspace .active');
    if (activeElement) {
        activeElement.remove();
        updateIndexes();
        updateSiteTree();
    }
}

function updateIndexes() {
    const elements = document.querySelectorAll('.workspace .draggable-element');
    elements.forEach((element, index) => {
        element.setAttribute('data-index', index);
    });
}

function initializeEscapeKey() {
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            clearActiveElements();
        }
         if (e.key === "Delete") {
        deleteActiveElement();
    }
    });
}

