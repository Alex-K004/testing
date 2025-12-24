const visaLogoInstance = 'visa.png';
const mastercardLogoInstance = 'mastercard.png';
const mirLogoInstance = 'mir.png';
const amexLogoInstance = 'amex.png';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
}

export const cardSystems = {
  visa: {
    name: 'Visa',
    patterns: ['^4'],
    lengths: [13, 16, 19],
    icon: visaLogoInstance,
    color: '#1a1f71',
  },
  mastercard: {
    name: 'MasterCard',
    patterns: ['^5[1-5]', '^222[1-9]', '^22[3-9]', '^2[3-6]', '^27[0-1]', '^2720'],
    lengths: [16],
    icon: mastercardLogoInstance,
    color: '#eb001b',
  },
  mir: {
    name: 'Mir',
    patterns: ['^220[0-4]'],
    lengths: [16, 17, 18, 19],
    icon: mirLogoInstance,
    color: '#1f5bff',
  },
  amex: {
    name: 'American Express',
    patterns: ['^34', '^37'],
    lengths: [15],
    icon: amexLogoInstance,
    color: '#2e77bc',
  },
};

export function detectCardSystem(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return null;
  }

  const cleaned = cardNumber.replace(/\D/g, '');

  const foundSystem = Object.entries(cardSystems).find(([, system]) => system.patterns.some((pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(cleaned);
  }));

  return foundSystem ? { ...foundSystem[1], key: foundSystem[0] } : null;
}

export function getCardSystemByKey(key) {
  return cardSystems[key] ? { ...cardSystems[key] } : null;
}

function luhnCheck(num) {
  if (!num || num.length < 13 || num.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);

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

export function getCardInfo(cardNumber) {
  const system = detectCardSystem(cardNumber);
  const cleaned = cardNumber ? cardNumber.replace(/\D/g, '') : '';

  const isValidLength = cleaned.length >= 13 && cleaned.length <= 19;
  const hasOnlyDigits = /^\d+$/.test(cleaned);
  const isLuhnValid = luhnCheck(cleaned);

  const isValid = isValidLength && hasOnlyDigits && isLuhnValid;

  return {
    isValid,
    formatted: cleaned.replace(/(.{4})/g, '$1 ').trim(),
    message: isValid ? 'Номер карты валиден' : 'Номер карты невалиден',
    raw: cleaned,
    system,
    isSupported: !!system,
  };
}

export const cardLogos = {
  visa: visaLogoInstance,
  mastercard: mastercardLogoInstance,
  mir: mirLogoInstance,
  amex: amexLogoInstance,
};
