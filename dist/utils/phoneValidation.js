"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBelarusPhoneNumber = isBelarusPhoneNumber;
exports.getBelarusOperatorInfo = getBelarusOperatorInfo;
exports.formatBelarusPhoneNumber = formatBelarusPhoneNumber;
const BELARUS_MOBILE_OPERATOR_CODES = [
    '25',
    '29',
    '33',
    '44'
];
const BELARUS_CITY_CODES = [
    '17',
    '162',
    '212',
    '232',
    '152',
    '222'
];
const ALL_BELARUS_CODES = [...BELARUS_MOBILE_OPERATOR_CODES, ...BELARUS_CITY_CODES];
function isBelarusPhoneNumber(phoneNumber) {
    const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    const internationalMobileRegex = new RegExp(`^\\+375(${BELARUS_MOBILE_OPERATOR_CODES.join('|')})\\d{7}$`);
    const internationalLandlineRegex = /^\+375(17\d{7}|(162|212|232|152|222)\d{6})$/;
    const internalMobileRegex = new RegExp(`^8(0${BELARUS_MOBILE_OPERATOR_CODES.join('|0')})\\d{7}$`);
    const internalLandlineRegex = /^8(017\d{7}|0(162|212|232|152|222)\d{6})$/;
    return internationalMobileRegex.test(normalizedNumber) ||
        internationalLandlineRegex.test(normalizedNumber) ||
        internalMobileRegex.test(normalizedNumber) ||
        internalLandlineRegex.test(normalizedNumber);
}
function getBelarusOperatorInfo(phoneNumber) {
    if (!isBelarusPhoneNumber(phoneNumber)) {
        return null;
    }
    const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    let code;
    let type;
    if (normalizedNumber.startsWith('+37517')) {
        code = '17';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375162')) {
        code = '162';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375212')) {
        code = '212';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375232')) {
        code = '232';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375152')) {
        code = '152';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375222')) {
        code = '222';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('8017')) {
        code = '17';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('80162')) {
        code = '162';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('80212')) {
        code = '212';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('80232')) {
        code = '232';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('80152')) {
        code = '152';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('80222')) {
        code = '222';
        type = 'landline';
    }
    else if (normalizedNumber.startsWith('+375')) {
        code = normalizedNumber.substring(4, 6);
        type = 'mobile';
    }
    else if (normalizedNumber.startsWith('80')) {
        code = normalizedNumber.substring(2, 4);
        type = 'mobile';
    }
    else {
        return null;
    }
    const operatorMap = {
        '25': 'life:)',
        '29': 'A1/МТС (зависит от серии)',
        '33': 'МТС',
        '44': 'A1',
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
function formatBelarusPhoneNumber(phoneNumber) {
    if (!isBelarusPhoneNumber(phoneNumber)) {
        return phoneNumber;
    }
    const normalizedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (normalizedNumber.startsWith('+37517')) {
        const number = normalizedNumber.substring(6);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3, 5);
        const part3 = number.substring(5);
        return `+375 (17) ${part1}-${part2}-${part3}`;
    }
    else if (normalizedNumber.startsWith('+375162') || normalizedNumber.startsWith('+375212') ||
        normalizedNumber.startsWith('+375232') || normalizedNumber.startsWith('+375152') ||
        normalizedNumber.startsWith('+375222')) {
        const code = normalizedNumber.substring(4, 7);
        const number = normalizedNumber.substring(7);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3);
        return `+375 (${code}) ${part1}-${part2}`;
    }
    else if (normalizedNumber.startsWith('8017')) {
        const number = normalizedNumber.substring(4);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3, 5);
        const part3 = number.substring(5);
        return `8 (017) ${part1}-${part2}-${part3}`;
    }
    else if (normalizedNumber.startsWith('80162') || normalizedNumber.startsWith('80212') ||
        normalizedNumber.startsWith('80232') || normalizedNumber.startsWith('80152') ||
        normalizedNumber.startsWith('80222')) {
        const code = normalizedNumber.substring(1, 5);
        const number = normalizedNumber.substring(5);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3);
        return `8 (${code}) ${part1}-${part2}`;
    }
    else if (normalizedNumber.startsWith('+375')) {
        const code = normalizedNumber.substring(4, 6);
        const number = normalizedNumber.substring(6);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3, 5);
        const part3 = number.substring(5);
        return `+375 (${code}) ${part1}-${part2}-${part3}`;
    }
    else if (normalizedNumber.startsWith('80')) {
        const code = normalizedNumber.substring(1, 4);
        const number = normalizedNumber.substring(4);
        const part1 = number.substring(0, 3);
        const part2 = number.substring(3, 5);
        const part3 = number.substring(5);
        return `8 (${code}) ${part1}-${part2}-${part3}`;
    }
    else {
        return phoneNumber;
    }
}
//# sourceMappingURL=phoneValidation.js.map