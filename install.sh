#!/bin/zsh
# install.sh - Build and install the minimal Electron ChatGPT app with custom icon

set -e

# Build the app using Electron Forge
npx electron-forge package

# Optionally, move the built app to /opt and create a desktop entry (Linux example)
APP_DIR=$(find out -type d -name "chatgpt-kde-*" | head -n1)
if [[ -z "$APP_DIR" ]]; then
  echo "Build failed or app directory not found."
  exit 1
fi


# Remove any previous install
sudo rm -rf /opt/chatgpt-kde

# Copy contents of build dir to /opt/chatgpt-kde
sudo mkdir -p /opt/chatgpt-kde
sudo cp -r "$APP_DIR"/* /opt/chatgpt-kde/

# Copy icon to system pixmaps directory for desktop integration
sudo cp "$(dirname "$0")/chatgpt_cool.png" /usr/share/pixmaps/chatgpt_cool.png

# Create desktop entry

# Create desktop entry using system icon path
cat <<EOF | sudo tee /usr/share/applications/chatgpt-kde.desktop > /dev/null
[Desktop Entry]
Name=ChatGPT KDE
Exec=/opt/chatgpt-kde/chatgpt-kde
Icon=chatgpt_cool
Type=Application
Categories=Utility;
EOF

echo "App installed to /opt/chatgpt-kde and desktop entry created."
