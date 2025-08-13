import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Navbar({ title="Artisans on the Alley", onBack, onCart, cartCount=0 }) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={onBack} disabled={!onBack}><Text style={[styles.link, !onBack && {opacity:.4}]}>Back</Text></TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onCart}>
        <Text style={styles.link}>Bag {cartCount ? `(${cartCount})` : ''}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  nav:{
    height:60, backgroundColor: theme.colors.bgAlt, borderBottomColor: theme.colors.line, borderBottomWidth:1,
    flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16
  },
  title:{ color: theme.colors.ink, fontSize:18, fontWeight:'800' },
  link:{ color: theme.colors.ink, fontWeight:'700' }
});
