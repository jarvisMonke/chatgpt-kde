# ChatGPT KDE

A desktop application that integrates ChatGPT with the KDE desktop environment using Electron.

## Features
- ChatGPT interface in a native-like KDE app
- Modern UI with CSS styling
- Easy to run and modify

## Project Structure
- `src/index.html` – Main HTML file
- `src/index.js` – Main renderer process JavaScript
- `src/preload.js` – Electron preload script
- `src/index.css` – Stylesheet
- `package.json` – Project metadata and scripts
- `forge.config.js` – Electron Forge configuration

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)

### Install dependencies
```sh
npm install
```

### Run the app in development mode
```sh
npm start
```

### Build for production
```sh
npm run make
```

## Customization
- Modify `src/index.html` and `src/index.js` to change the UI or logic.
- Update `src/index.css` for custom styles.

## License
MIT
