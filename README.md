# ChatGPT KDE

A minimal Electron-based desktop app for ChatGPT.

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

### Build and install the app

```sh
chmod +x install.sh
./install.sh
```

This will build the app, install it to `/opt/chatgpt-kde`, and create a desktop entry with the included icon.

## Customization

- Modify `src/index.html` and `src/index.js` to change the UI or logic.
- The app is intentionally minimal; add features as needed.

## KDE Blur Support (Planned)

Support for KDE blur and advanced window effects is planned for future releases. This will allow the app window to blend seamlessly with KDE's translucent backgrounds.

## License

MIT
