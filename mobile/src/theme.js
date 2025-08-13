import { Platform } from 'react-native';

export const theme = {
  colors: {
    bg: '#FAF7F1',        // parchment
    bgAlt: '#F3EEE5',     // alternative background
    ink: '#3C2F26',       // warm dark brown (text)
    inkSoft: '#6A5A4C',   // softer text
    accent: '#A0662E',    // toasted crust
    accentDeep: '#7F4F22', // deeper accent
    olive: '#6F7B58',     // herb note
    berry: '#7C4C5B',     // jam note (sparingly)
    line: '#E6DDCF',      // subtle lines
    success: '#4E7D55',   // success green
    danger: '#9C3B3B'     // error red
  },
  radius: { 
    xs: 6, 
    sm: 10, 
    md: 14, 
    lg: 20 
  },
  spacing: (n) => n * 8,
  text: {
    h1: { 
      fontFamily: Platform.select({ios:'CormorantGaramond_700Bold',android:'CormorantGaramond_700Bold',default:'serif'}), 
      fontSize: 34, 
      lineHeight: 40, 
      color: '#3C2F26' 
    },
    h2: { 
      fontFamily: Platform.select({ios:'CormorantGaramond_700Bold',android:'CormorantGaramond_700Bold',default:'serif'}), 
      fontSize: 24, 
      lineHeight: 30, 
      color: '#3C2F26' 
    },
    body: { 
      fontFamily: Platform.select({ios:'Inter',android:'Inter',default:'Inter'}), 
      fontSize: 16, 
      lineHeight: 22, 
      color: '#3C2F26' 
    },
    meta: { 
      fontFamily: 'Inter', 
      fontSize: 12, 
      color: '#6A5A4C', 
      letterSpacing: 0.2 
    }
  },
  shadow: {
    soft: { 
      shadowColor: '#000', 
      shadowOpacity: 0.06, 
      shadowRadius: 6, 
      elevation: 2 
    },
    card: { 
      shadowColor: '#000', 
      shadowOpacity: 0.08, 
      shadowRadius: 10, 
      elevation: 3 
    }
  }
};
