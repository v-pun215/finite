let selectedApps = [];

function toggleApp(appItem) {
    const checkbox = appItem.querySelector('.app-checkbox');
    const appName = appItem.querySelector('.app-name').textContent;
    const appNameStyle = appItem.querySelector('.app-name').style;
    const appDescriptionStyle = appItem.querySelector('.app-description').style;
    
    checkbox.checked = !checkbox.checked;
    
    if (checkbox.checked) {
        selectedApps.push(appName);
        appItem.style.background = '#e3f2fd';
        appNameStyle.color = '#151515';
        appDescriptionStyle.color = '#3b3b3b';

    } else {
        selectedApps = selectedApps.filter(app => app !== appName);
        appItem.style.background = '';
        appNameStyle.color = '';
        appDescriptionStyle.color = '';
    }
    
    updateSelectedCount();
}

function updateSelectedCount() {
    const countElement = document.getElementById('selectedCount');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (selectedApps.length === 0) {
        countElement.textContent = 'No apps selected';
        downloadBtn.disabled = true;
    } else if (selectedApps.length === 1) {
        countElement.textContent = '1 app selected';
        downloadBtn.disabled = false;
    } else {
        countElement.textContent = `${selectedApps.length} apps selected`;
        downloadBtn.disabled = false;
    }
}

function generateInstaller() {
    if (selectedApps.length === 0) return;
    
    // Create a mock download experience
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.textContent;
    
    downloadBtn.textContent = 'Generating installer...';
    downloadBtn.disabled = true;
    
    setTimeout(() => {
        // Create a mock file blob
        const installerScript = generateInstallerScript();
        const blob = new Blob([installerScript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = 'finite.sh';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        
        // Show installation instructions popup
        showInstallationPopup();
    }, 2000);
}

function generateInstallerScript() {
    let script = `#!/bin/bash
# Finite Installer Script
# Generated on ${new Date().toLocaleDateString()}
# Selected apps: ${selectedApps.join(', ')}

echo "🍎 Finite Installer"
echo "Installing ${selectedApps.length} selected apps..."
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
echo "Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install apps using Homebrew Cask
`;

    selectedApps.forEach(app => {
        const caskName = getBrewCaskName(app);
        if (caskName) {
            script += `echo "Installing ${app}..."
brew install --cask ${caskName}
`;
        }
    });

    script += `
echo ""
echo "✅ Installation complete!"
echo "All selected apps have been installed."
`;

    return script;
}

function getBrewCaskName(appName) {
    const caskMap = {
        'Google Chrome': 'google-chrome',
        'Firefox': 'firefox',
        'Microsoft Edge': 'microsoft-edge',
        'Microsoft Office': 'microsoft-office',
        'Notion': 'notion',
        'Slack': 'slack',
        'VS Code': 'visual-studio-code',
        'GitHub Desktop': 'github',
        'Docker Desktop': 'docker',
        'Adobe Creative Cloud': 'adobe-creative-cloud',
        'Figma': 'figma',
        'Sketch': 'sketch',
        'The Unarchiver': 'the-unarchiver',
        'CleanMyMac X': 'cleanmymac',
        'Rectangle': 'rectangle',
        'Spotify': 'spotify',
        'VLC Media Player': 'vlc',
        'HandBrake': 'handbrake',
        'Sublime Text': 'sublime-text',
        'Atom': 'atom',
        'BBEdit': 'bbedit',
        'Malwarebytes': 'malwarebytes',
        'Little Snitch': 'little-snitch',
        'KeePassXC': 'keepassxc',
        'Dropbox': 'dropbox',
        'Google Drive': 'google-drive',
        'Syncthing': 'syncthing',
        'Python': 'python',
        'Java': 'temurin', // temurin is the recommended OpenJDK cask
        'Go': 'golang',
        'Discord': 'discord',
        'Telegram': 'telegram',
        'Zoom': 'zoom',
        'Alfred': 'alfred',
        'iStat Menus': 'istat-menus',
        'Bartender': 'bartender',
        'Steam': 'steam',
        'Lutris': 'lutris',
        'OpenEmu': 'openemu'
    };
    return caskMap[appName] || null;
}

function showInstallationPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create popup
    const popup = document.createElement('div');
    popup.style.cssText = `
        background: rgba(146, 146, 146, 0.288);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 
        0 16px 32px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    height: fit-content;
    min-height: 400px;
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        animation: popIn 0.3s ease;
    `;
    
    popup.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
        <h2 style="color: white; margin-bottom: 20px; font-size: 1.5rem;">Installation Ready!</h2>
        <p style="color: whitesmoke; margin-bottom: 25px; line-height: 1.6;">
            Your installer has been downloaded. To install your selected apps, open Terminal and run:
        </p>
        <div style="background: #d9d9d9; border-radius: 10px; padding: 20px; margin: 25px 0; font-family: 'Monaco', 'Menlo', monospace; font-size: 1.1rem; color: #333; border: 2px solid #e9ecef;">
            <strong>sh ./finite.sh</strong>
        </div>
        <p style="color: #888; font-size: 0.9rem; margin-bottom: 30px;">
            Make sure the script is in your current directory before running the command.
        </p>
        <button onclick="closePopup()" style="
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(102, 126, 234, 0.4)';" 
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.3)';">
            Got it!
        </button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Store reference for closing
    window.currentPopup = overlay;
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closePopup() {
    if (window.currentPopup) {
        window.currentPopup.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (window.currentPopup && window.currentPopup.parentNode) {
                document.body.removeChild(window.currentPopup);
            }
            window.currentPopup = null;
        }, 300);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);