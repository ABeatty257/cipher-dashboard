import React, { useState } from 'react';
import { Lock, Unlock, Copy, RefreshCw, Shield, Key } from 'lucide-react';
import {
  caesarCipher,
  vigenereCipher,
  atbashCipher,
  rot13Cipher,
  xorCipher,
  toBase64,
  fromBase64
} from './utils/cipherUtils';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [cipherType, setCipherType] = useState('caesar');
  const [mode, setMode] = useState('encrypt');
  const [shift, setShift] = useState(3);
  const [key, setKey] = useState('');
  const [copied, setCopied] = useState(false);

  const cipherOptions = [
    { value: 'caesar', label: 'Caesar Cipher', needsShift: true, needsKey: false },
    { value: 'vigenere', label: 'Vigenère Cipher', needsShift: false, needsKey: true },
    { value: 'atbash', label: 'Atbash Cipher', needsShift: false, needsKey: false },
    { value: 'rot13', label: 'ROT13', needsShift: false, needsKey: false },
    { value: 'xor', label: 'XOR Cipher', needsShift: false, needsKey: true },
    { value: 'base64', label: 'Base64', needsShift: false, needsKey: false }
  ];

  const handleProcess = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    let result = '';
    const isDecrypt = mode === 'decrypt';

    switch (cipherType) {
      case 'caesar':
        result = caesarCipher(inputText, parseInt(shift) || 0, isDecrypt);
        break;
      case 'vigenere':
        result = vigenereCipher(inputText, key, isDecrypt);
        break;
      case 'atbash':
        result = atbashCipher(inputText);
        break;
      case 'rot13':
        result = rot13Cipher(inputText);
        break;
      case 'xor':
        result = xorCipher(inputText, key);
        break;
      case 'base64':
        result = isDecrypt ? fromBase64(inputText) : toBase64(inputText);
        break;
      default:
        result = inputText;
    }

    setOutputText(result);
  };

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const currentCipher = cipherOptions.find(opt => opt.value === cipherType);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-silver-100 mr-3" />
            <h1 className="text-5xl font-bold text-white">
              Cipher Encryption Platform
            </h1>
          </div>
          <p className="text-silver-100 text-lg">
            Secure your messages with classical cipher algorithms
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Controls Section */}
          <div className="bg-gradient-to-r from-silver-100 to-silver-200 p-6 border-b border-silver-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cipher Type */}
              <div>
                <label className="block text-sm font-semibold text-silver-700 mb-2">
                  Cipher Algorithm
                </label>
                <select
                  value={cipherType}
                  onChange={(e) => setCipherType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-silver-300 focus:border-silver-500 focus:outline-none transition-colors bg-white text-silver-800"
                >
                  {cipherOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div>
                <label className="block text-sm font-semibold text-silver-700 mb-2">
                  Operation Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode('encrypt')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      mode === 'encrypt'
                        ? 'bg-silver-600 text-white shadow-md'
                        : 'bg-white text-silver-600 border-2 border-silver-300 hover:border-silver-400'
                    }`}
                  >
                    <Lock className="w-4 h-4 inline mr-1" />
                    Encrypt
                  </button>
                  <button
                    onClick={() => setMode('decrypt')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      mode === 'decrypt'
                        ? 'bg-silver-600 text-white shadow-md'
                        : 'bg-white text-silver-600 border-2 border-silver-300 hover:border-silver-400'
                    }`}
                  >
                    <Unlock className="w-4 h-4 inline mr-1" />
                    Decrypt
                  </button>
                </div>
              </div>

              {/* Shift (for Caesar) */}
              {currentCipher?.needsShift && (
                <div>
                  <label className="block text-sm font-semibold text-silver-700 mb-2">
                    Shift Value
                  </label>
                  <input
                    type="number"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-silver-300 focus:border-silver-500 focus:outline-none transition-colors"
                    min="0"
                    max="25"
                  />
                </div>
              )}

              {/* Key (for Vigenere, XOR) */}
              {currentCipher?.needsKey && (
                <div>
                  <label className="block text-sm font-semibold text-silver-700 mb-2 flex items-center">
                    <Key className="w-4 h-4 mr-1" />
                    Encryption Key
                  </label>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter key..."
                    className="w-full px-4 py-2 rounded-lg border-2 border-silver-300 focus:border-silver-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Text Areas Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Area */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-silver-700">
                  Input Text
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-64 px-4 py-3 rounded-lg border-2 border-silver-300 focus:border-silver-500 focus:outline-none transition-colors resize-none font-mono text-sm"
                />
                <div className="text-xs text-silver-500">
                  Characters: {inputText.length}
                </div>
              </div>

              {/* Output Area */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-silver-700">
                  Output Text
                </label>
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Result will appear here..."
                  className="w-full h-64 px-4 py-3 rounded-lg border-2 border-silver-300 bg-silver-50 resize-none font-mono text-sm"
                />
                <div className="text-xs text-silver-500">
                  Characters: {outputText.length}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleProcess}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-silver-600 to-silver-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-silver-700 hover:to-silver-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {mode === 'encrypt' ? (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Encrypt Text
                  </>
                ) : (
                  <>
                    <Unlock className="w-5 h-5 mr-2" />
                    Decrypt Text
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-silver-400 text-silver-700 hover:bg-silver-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Copy className="w-5 h-5 mr-2" />
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <button
                onClick={handleSwap}
                disabled={!outputText}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-silver-400 text-silver-700 hover:bg-silver-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Swap
              </button>

              <button
                onClick={handleClear}
                className="px-6 py-3 rounded-lg font-semibold border-2 border-red-400 text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-silver-50 p-6 border-t border-silver-200">
            <h3 className="text-lg font-semibold text-silver-800 mb-2">
              About {currentCipher?.label}
            </h3>
            <p className="text-silver-600 text-sm">
              {cipherType === 'caesar' && 'Caesar cipher shifts each letter by a fixed number of positions in the alphabet.'}
              {cipherType === 'vigenere' && 'Vigenère cipher uses a keyword to shift letters by varying amounts.'}
              {cipherType === 'atbash' && 'Atbash cipher reverses the alphabet (A↔Z, B↔Y, etc.).'}
              {cipherType === 'rot13' && 'ROT13 is a Caesar cipher with a shift of 13. Applying it twice returns the original text.'}
              {cipherType === 'xor' && 'XOR cipher performs bitwise XOR operation with a key. Applying it twice returns the original text.'}
              {cipherType === 'base64' && 'Base64 encodes binary data into ASCII text format.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-silver-100">
          <p className="text-sm">
            Built with React • Modern Cipher Algorithms • Secure & Private
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
