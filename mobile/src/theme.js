import { Platform } from 'react-native';

// Professional, warm artisan shop
export const theme = {
  colors: {
    bg: '#FAF7F1',        // parchment
    bgAlt: '#F3EEE5',
    ink: '#2E261E',       // deep warm brown
    inkSoft: '#6A5A4C',
    accent: '#A0662E',    // toasted crust
    line: '#E6DDCF',
    success: '#3F7D4E',
    danger: '#9C3B3B'
  },
  radius: { xs:6, sm:10, md:14, lg:20 },
  spacing: n => n * 8,
  text: {
    h1: { fontSize: 30, fontWeight: '800', color: '#2E261E' },
    h2: { fontSize: 22, fontWeight: '800', color: '#2E261E' },
    body: { fontSize: 16, color: '#2E261E' },
    meta: { fontSize: 12, color: '#6A5A4C', letterSpacing: 0.2 }
  },
  shadow: {
    card: { shadowColor:'#000', shadowOpacity:0.08, shadowRadius:10, elevation:3 }
  }
};
