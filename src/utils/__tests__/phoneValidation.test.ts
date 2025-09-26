import { isBelarusPhoneNumber, getBelarusOperatorInfo, formatBelarusPhoneNumber } from '../phoneValidation';

describe('Phone Validation Tests', () => {
  describe('isBelarusPhoneNumber', () => {
    test('должен принимать валидные мобильные номера', () => {
      expect(isBelarusPhoneNumber('+375251234567')).toBe(true); // life:)
      expect(isBelarusPhoneNumber('+375291234567')).toBe(true); // A1/МТС
      expect(isBelarusPhoneNumber('+375331234567')).toBe(true); // МТС
      expect(isBelarusPhoneNumber('+375441234567')).toBe(true); // A1
    });

    test('должен принимать валидные стационарные номера', () => {
      expect(isBelarusPhoneNumber('+375171234567')).toBe(true); // Минск (7 цифр)
      expect(isBelarusPhoneNumber('+375162123456')).toBe(true); // Брест (6 цифр)
      expect(isBelarusPhoneNumber('+375212123456')).toBe(true); // Витебск (6 цифр)
      expect(isBelarusPhoneNumber('+375232123456')).toBe(true); // Гомель (6 цифр)
      expect(isBelarusPhoneNumber('+375152123456')).toBe(true); // Гродно (6 цифр)
      expect(isBelarusPhoneNumber('+375222123456')).toBe(true); // Могилев (6 цифр)
    });

    test('должен принимать внутренние форматы номеров (8-0XX)', () => {
      // Мобильные номера внутреннего формата
      expect(isBelarusPhoneNumber('80251234567')).toBe(true); // life:)
      expect(isBelarusPhoneNumber('80291234567')).toBe(true); // A1/МТС
      expect(isBelarusPhoneNumber('80331234567')).toBe(true); // МТС
      expect(isBelarusPhoneNumber('80441234567')).toBe(true); // A1
      
      // Стационарные номера внутреннего формата
      expect(isBelarusPhoneNumber('80171234567')).toBe(true); // Минск (7 цифр)
      expect(isBelarusPhoneNumber('80162123456')).toBe(true); // Брест (6 цифр)
      expect(isBelarusPhoneNumber('80212123456')).toBe(true); // Витебск (6 цифр)
      expect(isBelarusPhoneNumber('80232123456')).toBe(true); // Гомель (6 цифр)
      expect(isBelarusPhoneNumber('80152123456')).toBe(true); // Гродно (6 цифр)
      expect(isBelarusPhoneNumber('80222123456')).toBe(true); // Могилев (6 цифр)
    });

    test('должен принимать номера с форматированием', () => {
      expect(isBelarusPhoneNumber('+375 (29) 123-45-67')).toBe(true);
      expect(isBelarusPhoneNumber('8 (029) 123-45-67')).toBe(true);
      expect(isBelarusPhoneNumber('8-029-123-45-67')).toBe(true);
      expect(isBelarusPhoneNumber('8 029 123 45 67')).toBe(true);
    });

    test('должен отклонять невалидные номера', () => {
      expect(isBelarusPhoneNumber('+79001234567')).toBe(false); // Российский номер
      expect(isBelarusPhoneNumber('+375991234567')).toBe(false); // Несуществующий код
      expect(isBelarusPhoneNumber('375291234567')).toBe(false); // Без +
      expect(isBelarusPhoneNumber('+37529123456')).toBe(false); // Недостаточно цифр
      expect(isBelarusPhoneNumber('+3752912345678')).toBe(false); // Слишком много цифр
      expect(isBelarusPhoneNumber('+37529123456a')).toBe(false); // Содержит буквы
    });
  });

  describe('getBelarusOperatorInfo', () => {
    test('должен определять мобильных операторов', () => {
      const info1 = getBelarusOperatorInfo('+375291234567');
      expect(info1).toEqual({ operator: 'A1/МТС (зависит от серии)', code: '29', type: 'mobile' });
      
      const info2 = getBelarusOperatorInfo('+375251234567');
      expect(info2).toEqual({ operator: 'life:)', code: '25', type: 'mobile' });
    });

    test('должен определять стационарные номера', () => {
      const info = getBelarusOperatorInfo('+375171234567');
      expect(info).toEqual({ operator: 'Минск (стационарный)', code: '17', type: 'landline' });
    });

    test('должен возвращать null для невалидного номера', () => {
      const info = getBelarusOperatorInfo('+79001234567');
      expect(info).toBeNull();
    });
  });

  describe('formatBelarusPhoneNumber', () => {
    test('должен форматировать мобильные номера', () => {
      const formatted = formatBelarusPhoneNumber('+375291234567');
      expect(formatted).toBe('+375 (29) 123-45-67');
    });

    test('должен форматировать стационарные номера Минска', () => {
      const formatted = formatBelarusPhoneNumber('+375171234567');
      expect(formatted).toBe('+375 (17) 123-45-67');
    });

    test('должен форматировать стационарные номера других городов', () => {
      const formatted = formatBelarusPhoneNumber('+375162123456');
      expect(formatted).toBe('+375 (162) 123-456');
    });

    test('должен форматировать внутренние мобильные номера', () => {
      const formatted = formatBelarusPhoneNumber('80291234567');
      expect(formatted).toBe('8 (029) 123-45-67');
    });

    test('должен форматировать внутренние стационарные номера', () => {
      const formattedMinsk = formatBelarusPhoneNumber('80171234567');
      expect(formattedMinsk).toBe('8 (017) 123-45-67');
      
      const formattedOther = formatBelarusPhoneNumber('80162123456');
      expect(formattedOther).toBe('8 (0162) 123-456');
    });

    test('должен форматировать номера с пробелами и дефисами', () => {
      const formatted1 = formatBelarusPhoneNumber('+375 (29) 123-45-67');
      expect(formatted1).toBe('+375 (29) 123-45-67');
      
      const formatted2 = formatBelarusPhoneNumber('8-029-123-45-67');
      expect(formatted2).toBe('8 (029) 123-45-67');
    });

    test('должен возвращать исходный номер для невалидного', () => {
      const formatted = formatBelarusPhoneNumber('+79001234567');
      expect(formatted).toBe('+79001234567');
    });
  });
});
