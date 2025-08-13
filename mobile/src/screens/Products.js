import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';

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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={styles.title}>Artisans on the Alley</Text>
      <FlatList data={products} keyExtractor={item => item.id} renderItem={({ item }) => (
        <View style={styles.card}>
          {!!item.image_url && <Image source={{ uri: item.image_url }} style={styles.image} />}
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.price}>${(item.price_cents / 100).toFixed(2)}</Text>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
            <Text style={{ color: 'white', fontWeight:'700' }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      )} />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cart })}>
        <Text style={{ color: 'white', fontWeight:'800' }}>Go to Cart ({cart.reduce((s,i)=>s+i.qty,0)})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: 'bold', margin: 16, color: theme.colors.text },
  card: { backgroundColor: 'white', padding: 16, margin: 16, borderRadius: theme.radius },
  image: { height: 150, borderRadius: theme.radius, marginBottom:8 },
  name: { fontWeight: 'bold', fontSize: 18, marginTop: 4, color: theme.colors.text },
  price: { marginTop: 4, fontWeight: 'bold', color: theme.colors.accent },
  button: { backgroundColor: theme.colors.accent, padding: 10, marginTop: 8, borderRadius: theme.radius, alignItems: 'center' },
  cartButton: { backgroundColor: theme.colors.accent, padding: 16, alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0 }
});
