# Japanese Letters Quiz

[![CI](https://github.com/henrya/JapaneseLetters/workflows/CI/badge.svg)](https://github.com/henrya/JapaneseLetters/actions/workflows/ci.yml)
[![Build](https://github.com/henrya/JapaneseLetters/workflows/Build/badge.svg)](https://github.com/henrya/JapaneseLetters/actions/workflows/build.yml)
[![Release](https://github.com/henrya/JapaneseLetters/workflows/Release/badge.svg)](https://github.com/henrya/JapaneseLetters/actions/workflows/release.yml)

This is a simple React application for quizzing yourself on Japanese Hiragana, Katakana, and Vocabulary. The vocabulary section now includes quizzes for specific JLPT levels (N5, N4, N3, N2, and N1) as well as a combined "All Vocabulary" option. Vocabulary answers are displayed in Kana.

## 📥 Download

Get the latest version for your platform:

- **Windows**: [Download Installer](https://github.com/henrya/JapaneseLetters/releases/latest)
- **macOS**: [Download DMG](https://github.com/henrya/JapaneseLetters/releases/latest)
- **Linux**: [Download AppImage](https://github.com/henrya/JapaneseLetters/releases/latest) | [.deb](https://github.com/henrya/JapaneseLetters/releases/latest) | [.rpm](https://github.com/henrya/JapaneseLetters/releases/latest)

The app includes automatic updates, so you'll always have the latest features!

## Technologies Used

* **Material-UI:** A comprehensive React UI library for building user interfaces.
* **React:** A JavaScript library for building user interfaces.
* **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **LESS:** A dynamic stylesheet language that extends CSS.
*   **Jest:** A delightful JavaScript Testing Framework with a focus on simplicity.
*   **React Testing Library:** A set of utilities for testing React components.
*   **Electron:** A framework for building cross-platform desktop apps with web technologies.
*   **Electron Builder:** A complete solution to package and build a ready for distribution Electron app.

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/henrya/JapaneseLetters.git
    cd JapaneseLetters
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run electron:dev`

Runs the app in a desktop development environment using Electron. This will open a native desktop window that hot-reloads as you make changes to the code.

### `npm run electron:build`

Packages the application for production for Windows, macOS, and Linux using `electron-builder`. The distributable files can be found in the `dist` folder.
