import { detectCardSystem, getCardInfo } from '../js/cards.js';
import { validateCard } from '../js/validator.js';

describe('Определение платежных систем', () => {
  describe('Visa', () => {
    test('определяет Visa по началу 4', () => {
      const system = detectCardSystem('4111111111111111');
      expect(system).toBeTruthy();
      expect(system.name).toBe('Visa');
    });
    
    test('Visa с 13 цифрами', () => {
      const system = detectCardSystem('4123456789012');
      expect(system.name).toBe('Visa');
    });
    
    test('Visa с 19 цифрами', () => {
      const system = detectCardSystem('4123456789012345678');
      expect(system.name).toBe('Visa');
    });
  });

  describe('MasterCard', () => {
    test('определяет MasterCard 51-55', () => {
      const system = detectCardSystem('5555555555554444');
      expect(system.name).toBe('MasterCard');
    });
    
    test('определяет MasterCard 2221-2720', () => {
      const system = detectCardSystem('2720999999999999');
      expect(system.name).toBe('MasterCard');
    });
    
    test('не определяет MasterCard для 2721', () => {
      const system = detectCardSystem('2721999999999999');
      expect(system).toBeNull();
    });
  });

  describe('Mir', () => {
    test('определяет Mir 2200-2204', () => {
      const system = detectCardSystem('2200000000000004');
      expect(system.name).toBe('Mir');
    });
    
    test('определяет Mir 2204', () => {
      const system = detectCardSystem('2204999999999999');
      expect(system.name).toBe('Mir');
    });
    
    test('не определяет Mir для 2205', () => {
      const system = detectCardSystem('2205999999999999');
      expect(system).toBeNull();
    });
  });

  describe('American Express', () => {
    test('определяет Amex 34', () => {
      const system = detectCardSystem('341111111111111');
      expect(system.name).toBe('American Express');
    });
    
    test('определяет Amex 37', () => {
      const system = detectCardSystem('371111111111111');
      expect(system.name).toBe('American Express');
    });
    
    test('не определяет Amex для 35', () => {
      const system = detectCardSystem('351111111111111');
      expect(system).toBeNull();
    });
  });

  describe('Неизвестные системы', () => {
    test('возвращает null для неизвестной системы', () => {
      const system = detectCardSystem('6011111111111111');
      expect(system).toBeNull();
    });
    
    test('возвращает null для слишком короткого номера', () => {
      const system = detectCardSystem('123');
      expect(system).toBeNull();
    });
    
    test('возвращает null для пустой строки', () => {
      const system = detectCardSystem('');
      expect(system).toBeNull();
    });
  });

  describe('Полная информация о карте', () => {
    test('возвращает полную информацию о Visa', () => {
      const info = getCardInfo('4111111111111111');
      expect(info.isValid).toBe(true);
      expect(info.system.name).toBe('Visa');
      expect(info.isSupported).toBe(true);
    });
    
    test('возвращает информацию о невалидной карте', () => {
      const info = getCardInfo('4111111111111112');
      expect(info.isValid).toBe(false);
      expect(info.system.name).toBe('Visa');
      expect(info.isSupported).toBe(true);
    });
    
    test('возвращает информацию о неизвестной системе', () => {
      const info = getCardInfo('6011111111111111');
      const validationResult = validateCard('6011111111111111');
      expect(info.isValid).toBe(validationResult.isValid);
      expect(info.system).toBeNull();
      expect(info.isSupported).toBe(false);
    });
  });
});