import { validateCard, formatCardNumber, cleanCardNumber } from './validator.js';
import { detectCardSystem } from './cards.js';

let cardInput; let validateBtn; let clearBtn; let resultDiv; let cardTypeDiv; let
  cardIcons;

/**
 * Инициализация DOM элементов
 */
function initDOM() {
  cardInput = document.getElementById('card-input');
  validateBtn = document.getElementById('validate-btn');
  clearBtn = document.getElementById('clear-btn');
  resultDiv = document.getElementById('result');
  cardTypeDiv = document.getElementById('card-type');
  cardIcons = document.querySelectorAll('.card-icon');

  if (!cardInput || !validateBtn) {
    console.error('Не найдены необходимые DOM элементы');
    return;
  }

  setupEventListeners();
  updateCardIcons();
}

/**
 * Настройка обработчиков событий
 */
function setupEventListeners() {
  // Валидация при нажатии кнопки
  validateBtn.addEventListener('click', handleValidation);

  // Валидация при нажатии Enter
  cardInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleValidation();
    }
  });

  // Автоформатирование при вводе
  cardInput.addEventListener('input', handleInput);

  // Очистка поля
  clearBtn.addEventListener('click', () => {
    cardInput.value = '';
    clearResult();
    cardInput.focus();
  });

  // Автофокус на поле ввода
  setTimeout(() => {
    cardInput.focus();
  }, 500);
}

/**
 * Обработка ввода номера карты
 */
function handleInput() {
  const cursorPosition = cardInput.selectionStart;
  const formatted = formatCardNumber(cardInput.value);

  cardInput.value = formatted;

  // Восстанавливаем позицию курсора
  const diff = formatted.length - cardInput.value.length;
  cardInput.setSelectionRange(cursorPosition + diff, cursorPosition + diff);

  // Обновляем иконки платежных систем
  updateCardIcons();
}

/**
 * Обработка валидации
 */
function handleValidation() {
  const cardNumber = cardInput.value;

  if (!cardNumber.trim()) {
    showResult('Введите номер карты', 'error');
    return;
  }

  const validationResult = validateCard(cardNumber);
  const cardSystem = detectCardSystem(cardNumber);

  // Отображаем результат
  showResult(validationResult.message, validationResult.isValid ? 'success' : 'error');

  // Отображаем тип карты
  if (cardSystem) {
    showCardType(cardSystem.name, cardSystem.color);
  } else if (validationResult.isValid) {
    showCardType('Неизвестная платежная система', '#666');
  } else {
    clearCardType();
  }

  // Выделяем активную иконку платежной системы
  highlightCardIcon(cardSystem ? cardSystem.key : null);
}

/**
 * Отображение результата
 */
function showResult(message, type) {
  resultDiv.textContent = message;
  resultDiv.className = `result ${type}`;
  resultDiv.style.display = 'block';
}

/**
 * Отображение типа карты
 */
function showCardType(type, color) {
  cardTypeDiv.textContent = `Платежная система: ${type}`;
  cardTypeDiv.style.color = color;
  cardTypeDiv.style.display = 'block';
}

/**
 * Очистка результата
 */
function clearResult() {
  resultDiv.textContent = '';
  resultDiv.className = 'result';
  resultDiv.style.display = 'none';
  clearCardType();
  updateCardIcons();
}

/**
 * Очистка типа карты
 */
function clearCardType() {
  cardTypeDiv.textContent = '';
  cardTypeDiv.style.display = 'none';
}

/**
 * Обновление иконок платежных систем
 */
function updateCardIcons() {
  const cardNumber = cleanCardNumber(cardInput.value);
  const cardSystem = detectCardSystem(cardNumber);

  highlightCardIcon(cardSystem ? cardSystem.key : null);
}

/**
 * Выделение иконки активной платежной системы
 */
function highlightCardIcon(systemKey) {
  cardIcons.forEach((icon) => {
    if (systemKey && icon.id === `${systemKey}-icon`) {
      icon.classList.add('active');
      icon.style.opacity = '1';
      icon.style.filter = 'none';
    } else {
      icon.classList.remove('active');
      icon.style.opacity = '0.3';
      icon.style.filter = 'grayscale(50%)';
    }
  });
}

/**
 * Добавление тестовых карт для быстрой проверки
 */
function addTestCardButtons() {
  const testCards = [
    { type: 'Visa', number: '4111111111111111' },
    { type: 'MasterCard', number: '5555555555554444' },
    { type: 'Mir', number: '2200000000000004' },
    { type: 'Amex', number: '378282246310005' },
  ];

  const container = document.createElement('div');
  container.className = 'test-buttons';

  testCards.forEach((card) => {
    const button = document.createElement('button');
    button.className = 'test-btn';
    button.textContent = card.type;
    button.addEventListener('click', () => {
      cardInput.value = formatCardNumber(card.number);
      handleValidation();
    });
    container.appendChild(button);
  });

  document.querySelector('.input-container').appendChild(container);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  addTestCardButtons();
});

// Экспорт функций для тестирования
export {
  initDOM,
  handleValidation,
  handleInput,
  showResult,
  showCardType,
};
