# 🍎 Finite

**Finite** is a simple web app that lets you select and install multiple popular macOS applications at once, hassle-free. It generates a custom installer script that uses [Homebrew](https://brew.sh/) to automatically download and install your chosen apps.

## Features

- **One-click multi-app installer:** Select your favorite apps and generate a single script to install them all.
- **Modern UI:** Clean, easy-to-use interface with categories for productivity, development, browsers, media, games, and more.
- **Homebrew-powered:** Uses Homebrew Cask to install the latest versions of macOS apps.
- **No account or download required:** Everything runs in your browser.

## How It Works

1. **Select Apps:** Browse the categories and check the apps you want.
2. **Get Installer:** Click the "Get Installer" button to download a custom `finite.sh` script.
3. **Run Script:** Open Terminal, navigate to your Downloads folder, and run:

    ```sh
    sh ./finite.sh
    ```

   The script will install Homebrew if needed, then install all your selected apps.

## Supported Apps

- **Web Browsers:** Google Chrome, Firefox, Microsoft Edge
- **Productivity:** Microsoft Office, Notion, Slack
- **Development:** VS Code, GitHub Desktop, Docker Desktop
- **Creative:** Adobe Creative Cloud, Figma, Sketch
- **Utilities:** The Unarchiver, CleanMyMac X, Rectangle
- **Media:** Spotify, VLC, HandBrake
- **Games:** Steam, Lutris, OpenEmu
- **Security & Privacy:** Malwarebytes, Little Snitch, KeePassXC
- **Cloud & Backup:** Dropbox, Google Drive, Syncthing
- **Runtimes & Languages:** Python, Java, Go
- **Communication:** Discord, Telegram, Zoom
- **System Tools:** Alfred, iStat Menus, Bartender

*(All apps are available via [Homebrew Cask](https://formulae.brew.sh/cask/).)*

## Requirements

- macOS (tested on Monterey and later)
- Internet connection
- [Homebrew](https://brew.sh/) (the script will install it if missing)

## Development

1. Clone or download this repository.
2. Open `index.html` in your browser to use locally.
3. Edit `index.html` and `script.js` to add or modify apps/categories.

