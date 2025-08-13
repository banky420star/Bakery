import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import ProductCard from '../components/ProductCard';

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/products').then(r => r.json()).then(setProducts);
  }, []);

  const addToCart = (p) => setCart(prev => {
    const i = prev.findIndex(x => x.id === p.id);
    if (i === -1) return [...prev, {...p, qty:1}];
    const copy = [...prev]; copy[i].qty += 1; return copy;
  });

  const renderProduct = ({ item }) => (
    <ProductCard item={item} onAdd={() => addToCart(item)} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {/* Brand Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Artisans on the Alley</Text>
        <Text style={styles.subtitle}>Freshly baked • Handcrafted goods</Text>
        <View style={styles.divider} />
      </View>

      <FlatList 
        data={products} 
        keyExtractor={item => item.id} 
        renderItem={renderProduct}
        contentContainerStyle={styles.productList}
      />
      
      <TouchableOpacity 
        style={styles.cartButton} 
        onPress={() => navigation.navigate('Cart', { cart })}
      >
        <Text style={styles.cartButtonText}>
          Bag ({cart.reduce((s,i)=>s+i.qty,0)})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16, 
    backgroundColor: theme.colors.bgAlt, 
    borderBottomColor: theme.colors.line, 
    borderBottomWidth: 1
  },
  title: { 
    ...theme.text.h1,
    marginBottom: 4
  },
  subtitle: { 
    ...theme.text.meta,
    marginBottom: 12
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.line,
    width: 60
  },
  productList: {
    padding: 16
  },
  cartButton: { 
    backgroundColor: theme.colors.accent, 
    padding: 16, 
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    ...theme.shadow.soft
  },
  cartButtonText: { 
    color: 'white', 
    fontWeight: '800',
    fontSize: 16
  }
});
