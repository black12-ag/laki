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

    // Background Colors
    background: "#121212",
    backgroundSecondary: "#000000",
    cardBackground: "#1E1E1E",

    // Text Colors
    text: "#FFFFFF",
    textSecondary: "#A0A0A0",
    textMuted: "#666666",

    // Accent Colors
    accent: "#4CAF50",
    accentLight: "#1B5E20",

    // Card Gradients
    cardGradientStart: "#2C2C2C",
    cardGradientEnd: "#333333",

    // Status Colors
    success: "#4CAF50",
    warning: "#FFA726",
    error: "#EF5350",
    info: "#29B6F6",

    // Border Colors
    border: "#2C2C2C",
    borderLight: "#333333",

    // Tab Bar
    tabIconDefault: "#666666",
    tabIconSelected: "#4CAF50",

    // Specific UI Elements
    lockIconBackground: "#4CAF50",
    bankCardBorder: "#333333",
    rateTagBackground: "#1B5E20",
    rateTagText: "#4CAF50",
  },
};

export type ColorScheme = "light" | "dark";
export type ThemeColors = typeof Colors.light;
