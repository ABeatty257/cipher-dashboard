# 🔐 Cipher Encryption Platform

A modern, React-based encryption platform featuring multiple classical cipher algorithms with a clean, silver-themed UI.

## ✨ Features

- **Multiple Cipher Algorithms:**
  - Caesar Cipher (with adjustable shift)
  - Vigenère Cipher (keyword-based)
  - Atbash Cipher (alphabet reversal)
  - ROT13 (fixed rotation)
  - XOR Cipher (bitwise encryption)
  - Base64 Encoding/Decoding

- **Modern UI/UX:**
  - Clean silver-themed design
  - Responsive layout (mobile, tablet, desktop)
  - Real-time character counting
  - Copy to clipboard functionality
  - Swap input/output feature
  - Smooth animations and transitions

- **User-Friendly:**
  - Encrypt and decrypt modes
  - Clear visual feedback
  - Informative descriptions for each cipher
  - No backend required - runs entirely in the browser

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎨 Design

The application features a modern design with:
- Silver color palette (from light #f8f9fa to dark #1a1d20)
- Gradient purple background
- Lucide React icons
- Tailwind CSS for styling
- Smooth animations and transitions

## 🔧 Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **PostCSS & Autoprefixer** - CSS processing

## 📖 How to Use

1. **Select a cipher algorithm** from the dropdown menu
2. **Choose operation mode** (Encrypt or Decrypt)
3. **Enter parameters** (shift value or encryption key if required)
4. **Type or paste your text** in the input area
5. **Click the Encrypt/Decrypt button** to process
6. **Copy the result** or swap input/output to reverse the operation

## 🔒 Security Note

This application uses classical cipher algorithms for educational and demonstration purposes. These ciphers are **not cryptographically secure** for protecting sensitive information in real-world applications. For production use, employ modern encryption standards like AES, RSA, or TLS.

## 📝 Cipher Descriptions

- **Caesar Cipher:** Shifts each letter by a fixed number of positions
- **Vigenère Cipher:** Uses a keyword to shift letters by varying amounts
- **Atbash Cipher:** Reverses the alphabet (A↔Z, B↔Y, etc.)
- **ROT13:** Caesar cipher with a fixed shift of 13
- **XOR Cipher:** Performs bitwise XOR operation with a key
- **Base64:** Encodes binary data into ASCII text format

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React and modern web technologies
