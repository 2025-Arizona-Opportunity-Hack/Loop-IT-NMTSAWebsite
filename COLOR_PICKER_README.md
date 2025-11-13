# Floating Color Picker Widget

## Overview

A floating color picker widget integrated into the main website that allows users to interactively change the colors of **ANY section** on the page using a circular color wheel. The tool appears as a beautiful floating button in the bottom-right corner.

## ✅ Features

### Core Functionality

1. **Floating Widget Button** - Gradient purple/pink button in bottom-right corner
2. **Click ANY Section** - Select any element on the website with a background color
3. **Circular Color Picker** - Full hue/saturation wheel with brightness slider (iro.js)
4. **Real-time Updates** - Colors change instantly as you drag
5. **HEX Code Display** - Shows and copies color codes
6. **Reset All Colors** - One-click restore to original colors
7. **Auto-Save** - Changes persist across page reloads (localStorage)

### Visual Feedback

- 🎯 Dashed blue outline on hover during selection
- ✅ Solid blue outline on selected element
- 💫 Animated pulse during selection mode
- 🎨 Live color preview swatch

## 🚀 How to Use

1. **Click the floating button** (🎨 icon) in the bottom-right corner
2. **Click "Select Element"** to enter selection mode
3. **Hover and click** on any section you want to recolor
4. **Drag the color wheel** to pick your color
5. **Repeat** to change more sections
6. **Click "Reset All Colors"** to restore everything

## 📍 Location

- **Live on:** Main homepage (`http://localhost:3000`)
- **Component:** `/src/components/ColorPickerWidget.tsx`
- **Integration:** `/src/components/HomePage.tsx`

## 🛠️ Technical Stack

- Next.js 14 + React 18 + TypeScript
- iro.js (color picker library)
- Tailwind CSS (styling)
- localStorage (persistence)
- Lucide Icons (UI icons)

## 💡 Smart Features

- Automatically finds nearest colored element
- Preserves original colors for reset
- CSS selector-based storage
- Non-destructive changes
- Works with any background color
- Mobile responsive

## 🎨 Usage Tips

- **Selection Mode:** Crosshair cursor appears - click any colored section
- **Copy Colors:** Click "Copy HEX" to copy color codes
- **Deselect:** Use "Deselect Element" to unselect without picking new one
- **Persistent:** Colors saved automatically and survive page reload
- **Reset Anytime:** "Reset All Colors" restores original appearance

## 📦 Dependencies

```json
{
  "@jaames/iro": "^5.5.2",
  "lucide-react": "latest"
}
```

## ✨ Future Ideas

- Color scheme presets
- Export/import themes
- Undo/redo
- Gradient support
- Opacity control
- Color harmony suggestions

---

**Note:** This tool modifies the visual appearance only - no permanent changes to code!
