# Selection Scanner PWA

A robust Progressive Web Application (PWA) for accessible word selection with speech synthesis.

## Features

### ✨ Progressive Web App Features
- **Offline Support**: Works completely offline after first load
- **App Installation**: Can be installed on any device (mobile, tablet, desktop)
- **Background Sync**: Automatically syncs data when back online
- **Push Notifications**: Updates and notifications support
- **Responsive Design**: Optimized for all screen sizes and orientations

### 🎯 Accessibility Features
- **Speech Synthesis**: High-quality text-to-speech
- **Dual Scanning Modes**: Timed and manual scanning
- **Touch Gestures**: Tap to select, swipe to advance
- **Keyboard Navigation**: Full keyboard accessibility
- **Switch Support**: Compatible with assistive switches
- **High Contrast Mode**: Automatic high contrast support
- **Reduced Motion**: Respects user motion preferences

### 📱 Cross-Platform Support
- **iOS**: Install as PWA from Safari
- **Android**: Install from Chrome or any PWA-compatible browser
- **Windows**: Install from Edge, Chrome, or other browsers
- **macOS**: Install from Safari or Chrome
- **Linux**: Install from any modern browser

## Installation

### Mobile Devices (iOS/Android)
1. Open the app in your mobile browser
2. Look for the "Install" banner at the top
3. Tap "Install" to add to your home screen
4. The app will now work offline and launch like a native app

### Desktop (Windows/Mac/Linux)
1. Open the app in Chrome, Edge, or Safari
2. Click the install icon in the address bar, or
3. Go to browser menu → "Install Selection Scanner"
4. The app will appear in your applications folder

## Usage

### Basic Operation
1. **Add Words**: Type words and click "Add" or press Enter
2. **Start Scanning**: Click the "Play" button
3. **Select Words**: Use touch, keyboard, or switch controls
4. **Stop Scanning**: Click "End" or press Escape

### Scanning Modes
- **Timed Scanning**: Automatically advances through words
- **Manual Scanning**: User controls advancement with chosen keys

### Touch Controls (Always Available)
- **Tap**: Select current word
- **Swipe Down**: Advance to next word

### Settings
- **Wait Time**: How long to pause on each word (timed mode only)
- **Loop Count**: How many times to repeat the list
- **Voice Selection**: Choose from available system voices
- **Activation Keys**: Customize keyboard/mouse controls

## Technical Details

### Storage
- **Primary**: localStorage for immediate access
- **Backup**: IndexedDB for enhanced offline support
- **Sync**: Automatic saving every 30 seconds and on app close

### Performance
- **Service Worker**: Caches all resources for offline use
- **Background Sync**: Syncs data when connection restored
- **Lazy Loading**: Optimized resource loading
- **Error Recovery**: Automatic fallbacks for failed operations

### Privacy
- **Local Storage**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **Offline First**: Works without internet connection

## Browser Support

### Fully Supported
- Chrome 67+ (Android/Desktop)
- Safari 11.1+ (iOS/macOS)
- Edge 79+ (Windows)
- Firefox 63+ (All platforms)

### Partially Supported
- Older browsers support basic functionality
- IE 11: Basic features only (no PWA functionality)

## Troubleshooting

### Installation Issues
- **Banner not showing**: Try refreshing the page
- **Install failed**: Check browser PWA support
- **iOS Safari**: Use "Add to Home Screen" from share menu

### Performance Issues
- **Slow loading**: Check internet connection
- **Speech not working**: Verify browser speech synthesis support
- **Touch not responsive**: Ensure touch events are enabled

### Data Issues
- **Settings not saving**: Check browser storage permissions
- **Words disappeared**: Check if localStorage is enabled

## Development

### Files Structure
```
├── Index.html          # Main application
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── icon-192x192.svg   # App icon (192px)
├── icon-512x512.svg   # App icon (512px)
└── README.md          # This file
```

### Key Technologies
- **HTML5**: Modern web standards
- **CSS3**: Advanced styling and animations
- **JavaScript ES6+**: Modern JavaScript features
- **Web Speech API**: Text-to-speech functionality
- **Service Workers**: Offline functionality
- **IndexedDB**: Enhanced data storage
- **Web App Manifest**: PWA configuration

## Contributing

This is a standalone PWA designed for accessibility and ease of use. To modify:

1. Edit `Index.html` for main functionality
2. Update `manifest.json` for PWA settings
3. Modify `sw.js` for offline behavior
4. Test on multiple devices and browsers

## License

Open source - feel free to use and modify for educational and assistive purposes.

## Support

For technical issues:
1. Check browser console for errors
2. Verify PWA support in your browser
3. Clear browser cache and reload
4. Try installing from a different browser

---

**Selection Scanner** - Making content accessible for everyone, everywhere, offline or online.
