import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme'; // if placed differently, adjust path

export default function Navbar({ title, onBack, onCart }) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={onBack}><Text style={styles.link}>Back</Text></TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onCart}><Text style={styles.link}>Cart</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar:{ height:56, backgroundColor: theme.colors.muted, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, borderBottomLeftRadius: theme.radius, borderBottomRightRadius: theme.radius },
  title:{ color: theme.colors.text, fontSize:18, fontWeight:'700' },
  link:{ color: theme.colors.text }
});
