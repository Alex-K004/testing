/**
 * Проверка номера карты по алгоритму Луна
 * @param {string} cardNumber - Номер карты без пробелов
 * @returns {boolean} - true если номер валиден
 */
export function luhnCheck(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return false;
  }

  // Удаляем все нецифровые символы
  const digits = cardNumber.replace(/\D/g, '');

  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Проходим по цифрам справа налево
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Форматирование номера карты (добавление пробелов)
 * @param {string} cardNumber - Номер карты
 * @returns {string} - Отформатированный номер
 */
export function formatCardNumber(cardNumber) {
  if (!cardNumber) return '';

  // Удаляем все нецифровые символы
  const digits = cardNumber.replace(/\D/g, '');

  // Группируем по 4 цифры
  const groups = digits.match(/.{1,4}/g);

  return groups ? groups.join(' ') : '';
}

/**
 * Очистка номера карты от пробелов
 * @param {string} cardNumber - Номер карты с пробелами
 * @returns {string} - Номер без пробелов
 */
export function cleanCardNumber(cardNumber) {
  return cardNumber ? cardNumber.replace(/\D/g, '') : '';
}

/**
 * Полная проверка карты (формат + алгоритм Луна)
 * @param {string} cardNumber - Номер карты
 * @returns {Object} - Результат проверки
 */
export function validateCard(cardNumber) {
  const cleaned = cleanCardNumber(cardNumber);
  const formatted = formatCardNumber(cleaned);

  if (!cleaned) {
    return {
      isValid: false,
      formatted: '',
      message: 'Введите номер карты',
      raw: '',
    };
  }

  // ПРОВЕРКА НА НЕЦИФРОВЫЕ СИМВОЛЫ В ИСХОДНОЙ СТРОКЕ
  // (проверяем cardNumber, а не cleaned, так как cleaned уже очищен)
  if (cardNumber && /[^\d\s]/.test(cardNumber)) {
    return {
      isValid: false,
      formatted,
      message: 'Номер карты должен содержать только цифры',
      raw: cleaned,
    };
  }

  if (cleaned.length < 13 || cleaned.length > 19) {
    return {
      isValid: false,
      formatted,
      message: 'Номер карты должен содержать от 13 до 19 цифр',
      raw: cleaned,
    };
  }

  const isValid = luhnCheck(cleaned);

  return {
    isValid,
    formatted,
    message: isValid ? 'Номер карты валиден' : 'Номер карты невалиден',
    raw: cleaned,
  };
}
