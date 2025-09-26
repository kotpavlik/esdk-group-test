

// Коды мобильных операторов Беларуси
const BELARUS_MOBILE_OPERATOR_CODES = [
  '25', // life:)
  '29', // A1 и МТС (зависит от серии номера)
  '33', // МТС
  '44'  // A1
];

// Коды городов Беларуси (стационарная связь)
const BELARUS_CITY_CODES = [
  '17', // Минск
  '162', // Брест
  '212', // Витебск
  '232', // Гомель
  '152', // Гродно
  '222'  // Могилев
];

// Все коды операторов и городов
const ALL_BELARUS_CODES = [...BELARUS_MOBILE_OPERATOR_CODES, ...BELARUS_CITY_CODES];

/**
 * Проверяет, является ли номер белорусским
 * @param phoneNumber - номер телефона для проверки
 * @returns true если номер белорусский, false в противном случае
 */
export function isBelarusPhoneNumber(phoneNumber: string): boolean {
  // Нормализуем номер (убираем пробелы, дефисы и т.д.)
  const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
  
  // Проверяем международный формат +375
  const internationalMobileRegex = new RegExp(`^\\+375(${BELARUS_MOBILE_OPERATOR_CODES.join('|')})\\d{7}$`);
  const internationalLandlineRegex = /^\+375(17\d{7}|(162|212|232|152|222)\d{6})$/;
  
  // Проверяем внутренний формат 80 (8-0XX-XXX-XXXX)
  const internalMobileRegex = new RegExp(`^8(0${BELARUS_MOBILE_OPERATOR_CODES.join('|0')})\\d{7}$`);
  const internalLandlineRegex = /^8(017\d{7}|0(162|212|232|152|222)\d{6})$/;
  
  return internationalMobileRegex.test(normalizedNumber) || 
         internationalLandlineRegex.test(normalizedNumber) ||
         internalMobileRegex.test(normalizedNumber) ||
         internalLandlineRegex.test(normalizedNumber);
}

/**
 * Получает информацию об операторе по номеру телефона
 * @param phoneNumber - номер телефона
 * @returns информация об операторе или null
 */
export function getBelarusOperatorInfo(phoneNumber: string): { operator: string; code: string; type: 'mobile' | 'landline' } | null {
  if (!isBelarusPhoneNumber(phoneNumber)) {
    return null;
  }

  // Нормализуем номер
  const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
  
  // Определяем тип номера и код
  let code: string;
  let type: 'mobile' | 'landline';
  
  if (normalizedNumber.startsWith('+37517')) {
    code = '17';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375162')) {
    code = '162';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375212')) {
    code = '212';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375232')) {
    code = '232';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375152')) {
    code = '152';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375222')) {
    code = '222';
    type = 'landline';
  } else if (normalizedNumber.startsWith('8017')) {
    code = '17';
    type = 'landline';
  } else if (normalizedNumber.startsWith('80162')) {
    code = '162';
    type = 'landline';
  } else if (normalizedNumber.startsWith('80212')) {
    code = '212';
    type = 'landline';
  } else if (normalizedNumber.startsWith('80232')) {
    code = '232';
    type = 'landline';
  } else if (normalizedNumber.startsWith('80152')) {
    code = '152';
    type = 'landline';
  } else if (normalizedNumber.startsWith('80222')) {
    code = '222';
    type = 'landline';
  } else if (normalizedNumber.startsWith('+375')) {
    // Мобильные номера международного формата
    code = normalizedNumber.substring(4, 6);
    type = 'mobile';
  } else if (normalizedNumber.startsWith('80')) {
    // Мобильные номера внутреннего формата
    code = normalizedNumber.substring(2, 4);
    type = 'mobile';
  } else {
    return null;
  }
  
  const operatorMap: { [key: string]: string } = {
    // Мобильные операторы
    '25': 'life:)',
    '29': 'A1/МТС (зависит от серии)',
    '33': 'МТС',
    '44': 'A1',
    // Стационарная связь
    '17': 'Минск (стационарный)',
    '162': 'Брест (стационарный)',
    '212': 'Витебск (стационарный)',
    '232': 'Гомель (стационарный)',
    '152': 'Гродно (стационарный)',
    '222': 'Могилев (стационарный)'
  };

  return {
    operator: operatorMap[code] || 'Неизвестный оператор',
    code: code,
    type: type
  };
}

/**
 * Форматирует белорусский номер телефона
 * @param phoneNumber - номер телефона
 * @returns отформатированный номер или исходный если не валидный
 */
export function formatBelarusPhoneNumber(phoneNumber: string): string {
  if (!isBelarusPhoneNumber(phoneNumber)) {
    return phoneNumber;
  }

  // Нормализуем номер
  const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');

  // Для стационарных номеров (коды городов)
  if (normalizedNumber.startsWith('+37517')) {
    // Минск: +375 (17) XXX-XX-XX
    const number = normalizedNumber.substring(6);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `+375 (17) ${part1}-${part2}-${part3}`;
  } else if (normalizedNumber.startsWith('+375162') || normalizedNumber.startsWith('+375212') || 
             normalizedNumber.startsWith('+375232') || normalizedNumber.startsWith('+375152') || 
             normalizedNumber.startsWith('+375222')) {
    // Другие города: +375 (XXX) XXX-XXX (6 цифр)
    const code = normalizedNumber.substring(4, 7);
    const number = normalizedNumber.substring(7);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3);
    return `+375 (${code}) ${part1}-${part2}`;
  } else if (normalizedNumber.startsWith('8017')) {
    // Минск внутренний: 8 (017) XXX-XX-XX
    const number = normalizedNumber.substring(4);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `8 (017) ${part1}-${part2}-${part3}`;
  } else if (normalizedNumber.startsWith('80162') || normalizedNumber.startsWith('80212') || 
             normalizedNumber.startsWith('80232') || normalizedNumber.startsWith('80152') || 
             normalizedNumber.startsWith('80222')) {
    // Другие города внутренний: 8 (0XXX) XXX-XXX (6 цифр)
    const code = normalizedNumber.substring(1, 5);
    const number = normalizedNumber.substring(5);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3);
    return `8 (${code}) ${part1}-${part2}`;
  } else if (normalizedNumber.startsWith('+375')) {
    // Мобильные номера международный: +375 (XX) XXX-XX-XX
    const code = normalizedNumber.substring(4, 6);
    const number = normalizedNumber.substring(6);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `+375 (${code}) ${part1}-${part2}-${part3}`;
  } else if (normalizedNumber.startsWith('80')) {
    // Мобильные номера внутренний: 8 (0XX) XXX-XX-XX
    const code = normalizedNumber.substring(1, 4);
    const number = normalizedNumber.substring(4);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `8 (${code}) ${part1}-${part2}-${part3}`;
  } else {
    return phoneNumber;
  }
}
