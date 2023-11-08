
// Получаем элементы страницы
const addForm = document.getElementById('addForm');
const productNameInput = document.getElementById('productName');
const shoppingList = document.getElementById('shoppingList');



// Функция для добавления продукта в список
function addProduct(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы

  const productName = productNameInput.value;

  if (productName) {
    const listItem = document.createElement('li');
    listItem.textContent = productName;

    const deleteButton = document.createElement('button');

      //deleteButton.textContent = 'Удалить';
        deleteButton.textContent = '  ';
    deleteButton.classList.add('delete'); // Добавляем класс для отличия кнопки удаления
    deleteButton.addEventListener('click', deleteProduct);

    listItem.appendChild(deleteButton);
    shoppingList.appendChild(listItem);

    productNameInput.value = ''; // Очищаем поле ввода

    updateLocalStorage(); // Обновляем состояние в localStorage
  }
}



// Функция для удаления продукта из списка
function deleteProduct(event) {
  const listItem = event.target.parentElement;
  shoppingList.removeChild(listItem);

  updateLocalStorage(); // Обновляем состояние в localStorage
}

// Функция для обновления состояния списка покупок в localStorage
function updateLocalStorage() {
  const shoppingItems = Array.from(shoppingList.children).map(item => item.textContent);
  localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
}

// Функция для загрузки состояния списка покупок из localStorage
function loadLocalStorage() {
  const shoppingItems = JSON.parse(localStorage.getItem('shoppingItems'));

  if (shoppingItems && shoppingItems.length) {
    shoppingItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;

      const deleteButton = document.createElement('button');
      //deleteButton.textContent = 'Удалить';
        deleteButton.textContent = ' ';
      deleteButton.classList.add('delete'); // Добавляем класс для отличия кнопки удаления
      deleteButton.addEventListener('click', deleteProduct);

      listItem.appendChild(deleteButton);
      shoppingList.appendChild(listItem);
    });
  }
}

// Обработчик события отправки формы
addForm.addEventListener('submit', addProduct);

// Загружаем состояние списка покупок при загрузке страницы
window.addEventListener('load', loadLocalStorage);