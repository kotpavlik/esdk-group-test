

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
  // Проверяем мобильные номера (7 цифр после кода оператора)
  const mobileRegex = new RegExp(`^\\+375(${BELARUS_MOBILE_OPERATOR_CODES.join('|')})\\d{7}$`);
  
  // Проверяем стационарные номера
  // Минск: +37517XXXXXXX (7 цифр)
  // Другие города: +375XXXYYYYYY (6 цифр после кода города)
  const landlineRegex = /^\+375(17\d{7}|(162|212|232|152|222)\d{6})$/;
  
  return mobileRegex.test(phoneNumber) || landlineRegex.test(phoneNumber);
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

  // Определяем тип номера и код
  let code: string;
  let type: 'mobile' | 'landline';
  
  if (phoneNumber.startsWith('+37517')) {
    code = '17';
    type = 'landline';
  } else if (phoneNumber.startsWith('+375162')) {
    code = '162';
    type = 'landline';
  } else if (phoneNumber.startsWith('+375212')) {
    code = '212';
    type = 'landline';
  } else if (phoneNumber.startsWith('+375232')) {
    code = '232';
    type = 'landline';
  } else if (phoneNumber.startsWith('+375152')) {
    code = '152';
    type = 'landline';
  } else if (phoneNumber.startsWith('+375222')) {
    code = '222';
    type = 'landline';
  } else {
    // Мобильные номера
    code = phoneNumber.substring(4, 6);
    type = 'mobile';
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

  // Для стационарных номеров (коды городов)
  if (phoneNumber.startsWith('+37517')) {
    // Минск: +375 (17) XXX-XX-XX
    const number = phoneNumber.substring(6);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `+375 (17) ${part1}-${part2}-${part3}`;
  } else if (phoneNumber.startsWith('+375162') || phoneNumber.startsWith('+375212') || 
             phoneNumber.startsWith('+375232') || phoneNumber.startsWith('+375152') || 
             phoneNumber.startsWith('+375222')) {
    // Другие города: +375 (XXX) XXX-XXX (6 цифр)
    const code = phoneNumber.substring(4, 7);
    const number = phoneNumber.substring(7);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3);
    return `+375 (${code}) ${part1}-${part2}`;
  } else {
    // Мобильные номера: +375 (XX) XXX-XX-XX
    const code = phoneNumber.substring(4, 6);
    const number = phoneNumber.substring(6);
    const part1 = number.substring(0, 3);
    const part2 = number.substring(3, 5);
    const part3 = number.substring(5);
    return `+375 (${code}) ${part1}-${part2}-${part3}`;
  }
}
