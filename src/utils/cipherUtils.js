// Caesar Cipher Implementation
export const caesarCipher = (text, shift, decrypt = false) => {
  if (decrypt) shift = -shift;
  
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + shift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
};

// Vigenère Cipher Implementation
export const vigenereCipher = (text, key, decrypt = false) => {
  if (!key) return text;
  
  const keyUpper = key.toUpperCase();
  let keyIndex = 0;
  
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        
        const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;
        keyIndex++;
        
        const finalShift = decrypt ? -shift : shift;
        return String.fromCharCode(((code - base + finalShift + 26) % 26) + base);
      }
      return char;
    })
    .join('');
};

// Atbash Cipher Implementation (substitution cipher)
export const atbashCipher = (text) => {
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(base + (25 - (code - base)));
      }
      return char;
    })
    .join('');
};

// ROT13 Cipher Implementation
export const rot13Cipher = (text) => {
  return caesarCipher(text, 13);
};

// Simple Substitution Cipher
export const substitutionCipher = (text, key, decrypt = false) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const keyUpper = key.toUpperCase();
  
  if (keyUpper.length !== 26 || new Set(keyUpper).size !== 26) {
    return text; // Invalid key
  }
  
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const charUpper = char.toUpperCase();
        const index = decrypt 
          ? keyUpper.indexOf(charUpper)
          : alphabet.indexOf(charUpper);
        
        const result = decrypt 
          ? alphabet[index]
          : keyUpper[index];
        
        return isUpperCase ? result : result.toLowerCase();
      }
      return char;
    })
    .join('');
};

// XOR Cipher Implementation
export const xorCipher = (text, key) => {
  if (!key) return text;
  
  return text
    .split('')
    .map((char, i) => {
      const keyChar = key[i % key.length];
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
    })
    .join('');
};

// Convert to Base64
export const toBase64 = (text) => {
  try {
    return btoa(text);
  } catch (e) {
    return btoa(unescape(encodeURIComponent(text)));
  }
};

// Convert from Base64
export const fromBase64 = (text) => {
  try {
    return atob(text);
  } catch (e) {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (err) {
      return 'Invalid Base64';
    }
  }
};
