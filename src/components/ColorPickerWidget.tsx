"use client";

import { useEffect, useRef, useState } from "react";
// @ts-ignore - iro.js doesn't have official types
import iro from "@jaames/iro";
import { Palette, X, RotateCcw, Check } from "lucide-react";

export default function ColorPickerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(
    null
  );
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const colorPickerRef = useRef<any>(null);
  const pickerContainerRef = useRef<HTMLDivElement>(null);
  const originalColorsRef = useRef<Map<HTMLElement, string>>(new Map());
  const overlayRef = useRef<HTMLDivElement>(null);

  // Initialize color picker
  useEffect(() => {
    if (
      pickerContainerRef.current &&
      !colorPickerRef.current &&
      isOpen &&
      selectedElement
    ) {
      console.log(
        "Initializing color picker for:",
        selectedElement.tagName,
        selectedElement.className
      );

      colorPickerRef.current = iro.ColorPicker(pickerContainerRef.current, {
        width: 200,
        color: currentColor,
        borderWidth: 2,
        borderColor: "#fff",
        layout: [
          {
            component: iro.ui.Wheel,
            options: {},
          },
          {
            component: iro.ui.Slider,
            options: {
              sliderType: "value",
            },
          },
        ],
      });

      console.log("Color picker created successfully");

      // Handle color change
      colorPickerRef.current.on("color:change", (color: any) => {
        const hexColor = color.hexString;
        console.log("Color changed to:", hexColor);
        setCurrentColor(hexColor);

        if (selectedElement) {
          console.log("Applying color to element:", selectedElement.tagName);
          // Remove any background image/gradient to show solid color
          selectedElement.style.setProperty(
            "background-image",
            "none",
            "important"
          );
          selectedElement.style.setProperty(
            "background-color",
            hexColor,
            "important"
          );
          selectedElement.style.setProperty(
            "background",
            hexColor,
            "important"
          );

          console.log(
            "Color applied. Element style:",
            selectedElement.style.backgroundColor
          );

          // Save to localStorage
          const selector = getElementSelector(selectedElement);
          const savedColors = localStorage.getItem("websiteColorPickerColors");
          const colors = savedColors ? JSON.parse(savedColors) : {};
          colors[selector] = hexColor;
          localStorage.setItem(
            "websiteColorPickerColors",
            JSON.stringify(colors)
          );
        }
      });
    }

    return () => {
      // Cleanup on unmount
    };
  }, [isOpen, selectedElement]);

  // Update color picker when element changes
  useEffect(() => {
    if (colorPickerRef.current && selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement);
      let elementColor = computedStyle.backgroundColor;

      // If transparent or no color, use white as default
      if (
        !elementColor ||
        elementColor === "rgba(0, 0, 0, 0)" ||
        elementColor === "transparent"
      ) {
        elementColor = "rgb(255, 255, 255)";
      }

      const hexColor = rgbToHex(elementColor);
      colorPickerRef.current.color.hexString = hexColor;
      setCurrentColor(hexColor);

      console.log(
        "Color picker updated:",
        hexColor,
        "for element:",
        selectedElement.tagName
      );
    }
  }, [selectedElement]);

  // Load colors from localStorage on mount
  useEffect(() => {
    // Clear any saved colors on mount to start fresh
    // Comment this out if you want to keep saved colors
    // localStorage.removeItem("websiteColorPickerColors");

    const savedColors = localStorage.getItem("websiteColorPickerColors");
    if (savedColors) {
      try {
        const parsed = JSON.parse(savedColors);
        Object.keys(parsed).forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.setProperty(
                "background-color",
                parsed[selector],
                "important"
              );
            }
          });
        });
      } catch (e) {
        console.error("Failed to parse saved colors", e);
      }
    }
  }, []);

  // Store original colors and background images
  const storeOriginalColor = (element: HTMLElement) => {
    if (!originalColorsRef.current.has(element)) {
      const computedStyle = window.getComputedStyle(element);
      const originalBg = computedStyle.background;
      const originalBgColor = computedStyle.backgroundColor;
      const originalBgImage = computedStyle.backgroundImage;

      // Store complete background information
      originalColorsRef.current.set(element, originalBg || originalBgColor);

      // Also store as data attribute for recovery
      if (!element.dataset.originalBackground) {
        element.dataset.originalBackground = originalBg;
        element.dataset.originalBackgroundColor = originalBgColor;
        element.dataset.originalBackgroundImage = originalBgImage;
      }
    }
  };

  // Save color to localStorage
  const saveColorToStorage = (element: HTMLElement, color: string) => {
    const selector = getElementSelector(element);
    const savedColors = localStorage.getItem("websiteColorPickerColors");
    const colors = savedColors ? JSON.parse(savedColors) : {};
    colors[selector] = color;
    localStorage.setItem("websiteColorPickerColors", JSON.stringify(colors));
  };

  // Get CSS selector for element
  const getElementSelector = (element: HTMLElement): string => {
    if (element.id) return `#${element.id}`;
    if (element.className) {
      const classes = String(element.className || "")
        .split(" ")
        .filter((c) => c.trim());
      if (classes.length > 0) return `.${classes[0]}`;
    }
    return element.tagName.toLowerCase();
  };

  // Convert RGB to HEX
  const rgbToHex = (rgb: string): string => {
    const result = rgb.match(/\d+/g);
    if (!result) return "#ffffff";
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  // Enable selection mode
  const enableSelectionMode = () => {
    setIsSelectionMode(true);
    document.body.style.cursor = "crosshair";
  };

  // Disable selection mode
  const disableSelectionMode = () => {
    setIsSelectionMode(false);
    document.body.style.cursor = "default";
    // Remove all highlights
    document.querySelectorAll("[data-color-picker-highlight]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.removeAttribute("data-color-picker-highlight");
        el.style.outline = "";
        el.style.outlineOffset = "";
        el.style.cursor = "";
      }
    });
  };

  // Handle element click
  const handleElementClick = (e: MouseEvent) => {
    if (!isSelectionMode) return;

    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;

    // Ignore clicks on the color picker widget itself and floating buttons
    if (
      target.closest(".color-picker-widget") ||
      target.closest("button[aria-label='Toggle color picker']") ||
      target.closest("button[aria-label='Background Color Picker']") ||
      target.closest(".chatbot-button")
    )
      return;

    // Simple selection - just use the direct target element
    // This allows selecting ANY element including buttons, text, divs, etc.
    let element: HTMLElement | null = target;

    // Only skip if it's body or html
    if (
      element &&
      element !== document.body &&
      element !== document.documentElement
    ) {
      storeOriginalColor(element);

      // Clear previous picker to force re-initialization
      if (colorPickerRef.current) {
        colorPickerRef.current = null;
      }

      setSelectedElement(element);
      disableSelectionMode();

      // Add visual indicator
      document
        .querySelectorAll("[data-color-picker-selected]")
        .forEach((el) => {
          if (el instanceof HTMLElement) {
            el.removeAttribute("data-color-picker-selected");
            el.style.outline = "";
            el.style.outlineOffset = "";
          }
        });
      element.setAttribute("data-color-picker-selected", "true");
      element.style.outline = "4px solid #3b82f6";
      element.style.outlineOffset = "4px";
      element.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.3)";

      // Scroll element into view
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      console.log(
        "Selected element:",
        element.tagName,
        element.className,
        "Direct selection"
      );
    }
  };

  // Handle element hover
  const handleElementHover = (e: MouseEvent) => {
    if (!isSelectionMode) return;

    const target = e.target as HTMLElement;

    // Ignore hover on widgets and buttons
    if (
      target.closest(".color-picker-widget") ||
      target.closest("button[aria-label='Toggle color picker']") ||
      target.closest("button[aria-label='Background Color Picker']") ||
      target.closest(".chatbot-button")
    )
      return;

    // Simple selection - just use the direct target element
    const element: HTMLElement | null = target;

    // Remove previous highlights
    document.querySelectorAll("[data-color-picker-highlight]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.removeAttribute("data-color-picker-highlight");
        el.style.outline = "";
        el.style.outlineOffset = "";
        el.style.boxShadow = "";
      }
    });

    // Add highlight to current element
    if (
      element &&
      element !== document.body &&
      element !== document.documentElement
    ) {
      element.setAttribute("data-color-picker-highlight", "true");
      element.style.outline = "3px dashed #fbbf24";
      element.style.outlineOffset = "4px";
      element.style.cursor = "crosshair";
      element.style.boxShadow = "0 0 0 3px rgba(251, 191, 36, 0.3)";

      // Show a tooltip with element info
      const computedStyle = window.getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;
      const bgImage = computedStyle.backgroundImage;
      const hasGradient =
        bgImage && bgImage !== "none" && bgImage.includes("gradient");
      const hasBackground =
        bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent";

      let tooltipText = `${element.tagName.toLowerCase()}`;
      if (hasGradient) tooltipText += " (has gradient)";
      else if (hasBackground) tooltipText += ` (${bgColor})`;
      else tooltipText += " (will add background)";

      element.title = tooltipText;
    }
  };

  // Add event listeners
  useEffect(() => {
    if (isSelectionMode) {
      document.addEventListener("click", handleElementClick, true);
      document.addEventListener("mousemove", handleElementHover);
    } else {
      document.removeEventListener("click", handleElementClick, true);
      document.removeEventListener("mousemove", handleElementHover);
    }

    return () => {
      document.removeEventListener("click", handleElementClick, true);
      document.removeEventListener("mousemove", handleElementHover);
    };
  }, [isSelectionMode]);

  // Reset all colors
  const handleReset = () => {
    originalColorsRef.current.forEach((originalBg, element) => {
      // Restore from data attribute if available
      if (element.dataset.originalBackground) {
        element.style.background = element.dataset.originalBackground;
      } else {
        element.style.backgroundColor = originalBg;
      }
    });
    localStorage.removeItem("websiteColorPickerColors");
    setSelectedElement(null);

    // Remove all visual indicators
    document.querySelectorAll("[data-color-picker-selected]").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.removeAttribute("data-color-picker-selected");
        el.style.outline = "";
        el.style.outlineOffset = "";
        el.style.boxShadow = "";
      }
    });

    // Clean up data attributes
    document.querySelectorAll("[data-original-background]").forEach((el) => {
      if (el instanceof HTMLElement) {
        delete el.dataset.originalBackground;
        delete el.dataset.originalBackgroundColor;
        delete el.dataset.originalBackgroundImage;
      }
    });
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  // Toggle widget
  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      disableSelectionMode();
      // Remove selected indicator
      document
        .querySelectorAll("[data-color-picker-selected]")
        .forEach((el) => {
          if (el instanceof HTMLElement) {
            el.removeAttribute("data-color-picker-selected");
            el.style.outline = "";
          }
        });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-24 z-[10000] bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 group"
        aria-label="Toggle color picker"
        title="Background Color Picker"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Palette className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Color Picker Panel */}
      {isOpen && (
        <div className="color-picker-widget fixed bottom-24 right-6 z-[9999] bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-6 w-80 max-h-[calc(100vh-140px)] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              Background Color Picker
            </h3>
            <p className="text-sm text-gray-600">
              Click "Select Element" to choose any section and change its{" "}
              <strong>background color</strong>
            </p>
          </div>

          {/* Selection Button */}
          <button
            onClick={enableSelectionMode}
            disabled={isSelectionMode}
            className={`w-full mb-4 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isSelectionMode
                ? "bg-blue-500 text-white cursor-wait"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {isSelectionMode ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-pulse">Click on any section...</span>
              </span>
            ) : (
              "Select Element"
            )}
          </button>

          {selectedElement && (
            <div className="mb-4">
              <div className="p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-sm text-gray-600 mb-1">Selected Element:</p>
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {getElementSelector(selectedElement)}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-sm text-gray-600 mb-2">Current Color:</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded border-2 border-gray-300"
                    style={{ backgroundColor: currentColor }}
                  />
                  <div className="flex-1">
                    <p className="font-mono font-bold text-sm text-gray-800">
                      {currentColor.toUpperCase()}
                    </p>
                    <button
                      onClick={() => copyToClipboard(currentColor)}
                      className="text-xs text-blue-600 hover:text-blue-800 underline mt-1"
                    >
                      Copy HEX
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Picker */}
              <div className="flex justify-center mb-4">
                <div ref={pickerContainerRef} />
              </div>

              {/* Deselect Button */}
              <button
                onClick={() => {
                  // Clear the picker
                  if (colorPickerRef.current) {
                    colorPickerRef.current = null;
                  }
                  setSelectedElement(null);
                  document
                    .querySelectorAll("[data-color-picker-selected]")
                    .forEach((el) => {
                      if (el instanceof HTMLElement) {
                        el.removeAttribute("data-color-picker-selected");
                        el.style.outline = "";
                        el.style.outlineOffset = "";
                      }
                    });
                }}
                className="w-full mb-3 py-2 px-4 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
              >
                Deselect Element
              </button>
            </div>
          )}

          {!selectedElement && (
            <div className="text-center py-8">
              <Palette className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-sm">
                Click "Select Element" above to start picking colors
              </p>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full py-3 px-4 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Colors
          </button>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 mb-2">
              <strong>⚠️ Colors look different?</strong> Saved colors may be
              loaded from your browser.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("websiteColorPickerColors");
                window.location.reload();
              }}
              className="w-full text-xs py-2 px-3 rounded bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-all"
            >
              🔄 Clear Saved Colors & Reload
            </button>
          </div>

          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> Your color changes are automatically
              saved and will persist on page reload!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
