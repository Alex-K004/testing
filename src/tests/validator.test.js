import { luhnCheck, validateCard, formatCardNumber, cleanCardNumber } from '../js/validator';

describe('Валидатор номеров карт', () => {
  describe('Алгоритм Луна', () => {
    test('валидный номер Visa', () => {
      expect(luhnCheck('4111111111111111')).toBe(true);
    });
    
    test('валидный номер MasterCard', () => {
      expect(luhnCheck('5555555555554444')).toBe(true);
    });
    
    test('валидный номер Mir', () => {
      expect(luhnCheck('2200000000000004')).toBe(true);
    });
    
    test('валидный номер American Express', () => {
      expect(luhnCheck('378282246310005')).toBe(true);
    });
    
    test('невалидный номер', () => {
      expect(luhnCheck('4111111111111112')).toBe(false);
    });
    
    test('пустая строка', () => {
      expect(luhnCheck('')).toBe(false);
    });
    
    test('не строковый аргумент', () => {
      expect(luhnCheck(4111111111111111)).toBe(false);
    });
  });

  describe('Форматирование номера', () => {
    test('форматирование без пробелов', () => {
      expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
    });
    
    test('форматирование с пробелами', () => {
      expect(formatCardNumber('4111 1111 1111 1111')).toBe('4111 1111 1111 1111');
    });
    
    test('форматирование с лишними символами', () => {
      expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111');
    });
    
    test('форматирование короткого номера', () => {
      expect(formatCardNumber('123456789012')).toBe('1234 5678 9012');
    });
  });

  describe('Очистка номера', () => {
    test('очистка от пробелов', () => {
      expect(cleanCardNumber('4111 1111 1111 1111')).toBe('4111111111111111');
    });
    
    test('очистка от тире', () => {
      expect(cleanCardNumber('4111-1111-1111-1111')).toBe('4111111111111111');
    });
    
    test('очистка от всех нецифровых символов', () => {
      expect(cleanCardNumber('4111 1111-1111_1111')).toBe('4111111111111111');
    });
  });

  describe('Полная проверка карты', () => {
    test('успешная валидация Visa', () => {
      const result = validateCard('4111111111111111');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Номер карты валиден');
      expect(result.formatted).toBe('4111 1111 1111 1111');
    });
    
    test('невалидный номер', () => {
      const result = validateCard('4111111111111112');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Номер карты невалиден');
    });
    
    test('слишком короткий номер', () => {
      const result = validateCard('123456');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('от 13 до 19 цифр');
    });
    
    test('нецифровые символы', () => {
      const result = validateCard('4111-1111-1111-1111');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('только цифры');
    });
    
    test('пустой ввод', () => {
      const result = validateCard('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Введите номер карты');
    });
  });
});