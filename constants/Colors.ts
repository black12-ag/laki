// LakiRemit Brand Colors - Exact match from screenshots
export const Colors = {
  light: {
    // Primary Colors
    primary: "#4CAF50",
    primaryDark: "#388E3C",
    primaryLight: "#C8E6C9",

    // Background Colors
    background: "#FFFFFF",
    backgroundSecondary: "#F5F7FA",
    cardBackground: "#FFFFFF",

    // Text Colors
    text: "#1A1A1A",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",

    // Accent Colors
    accent: "#4CAF50",
    accentLight: "#E8F5E9",

    // Card Gradients (for amount input card)
    cardGradientStart: "#1E3A5F",
    cardGradientEnd: "#2C5282",

    // Status Colors
    success: "#4CAF50",
    warning: "#FFA726",
    error: "#EF5350",
    info: "#29B6F6",

    // Border Colors
    border: "#E5E7EB",
    borderLight: "#F3F4F6",

    // Tab Bar
    tabIconDefault: "#9CA3AF",
    tabIconSelected: "#4CAF50",

    // Specific UI Elements
    lockIconBackground: "#4CAF50",
    bankCardBorder: "#E5E7EB",
    rateTagBackground: "#E8F5E9",
    rateTagText: "#4CAF50",
  },
  dark: {
    // Primary Colors
    primary: "#4CAF50",
    primaryDark: "#388E3C",
    primaryLight: "#1B5E20",

    // Background Colors - True Black (OLED Friendly)
    background: "#000000",
    backgroundSecondary: "#1C1C1E",
    cardBackground: "#1C1C1E",

    // Text Colors - High Contrast
    text: "#FFFFFF",
    textSecondary: "#98989F", // iOS System Gray equivalent
    textMuted: "#636366",

    // Accent Colors
    accent: "#4CAF50",
    accentLight: "#1C1C1E",

    // Card Gradients
    cardGradientStart: "#1C1C1E",
    cardGradientEnd: "#2C2C2E",

    // Status Colors
    success: "#32D74B", // iOS Green
    warning: "#FFD60A", // iOS Yellow
    error: "#FF453A",   // iOS Red
    info: "#64D2FF",    // iOS Blue

    // Border Colors
    border: "#38383A",
    borderLight: "#2C2C2E",

    // Tab Bar
    tabIconDefault: "#8E8E93",
    tabIconSelected: "#4CAF50",

    // Specific UI Elements
    lockIconBackground: "#4CAF50",
    bankCardBorder: "#2C2C2E",
    rateTagBackground: "#2C2C2E",
    rateTagText: "#32D74B",
  },
};

export type ColorScheme = "light" | "dark";
export type ThemeColors = typeof Colors.light;
