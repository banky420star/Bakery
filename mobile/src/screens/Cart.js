import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Cart({ route, navigation }) {
  const cart = route.params?.cart || [];
  const total = cart.reduce((s,i)=> s + i.qty * i.price_cents, 0);

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your bag is empty</Text>
        <Text style={styles.emptySubtitle}>A tragedy easily fixed.</Text>
        <TouchableOpacity 
          style={styles.emptyButton} 
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.emptyButtonText}>Browse our goods</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Bag</Text>
        <Text style={styles.subtitle}>Review your order</Text>
      </View>

      <FlatList 
        data={cart} 
        keyExtractor={i=>i.id} 
        renderItem={({item})=>(
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>×{item.qty}</Text>
            </View>
            <Text style={styles.itemPrice}>${(item.qty * item.price_cents/100).toFixed(2)}</Text>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />
      
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${(total/100).toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={()=>navigation.navigate('Checkout',{cart})}
        >
          <Text style={styles.checkoutButtonText}>Continue to checkout</Text>
        </TouchableOpacity>
        <Text style={styles.pickupNote}>Pickup today after 3pm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: theme.colors.bg
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  emptyTitle: {
    ...theme.text.h1,
    marginBottom: 8,
    textAlign: 'center'
  },
  emptySubtitle: {
    ...theme.text.body,
    color: theme.colors.inkSoft,
    marginBottom: 32,
    textAlign: 'center'
  },
  emptyButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.radius.sm
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16
  },
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
    ...theme.text.meta
  },
  cartList: {
    padding: 16
  },
  cartItem: { 
    padding: 16, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: theme.radius.sm,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.colors.line,
    ...theme.shadow.soft
  },
  itemInfo: {
    flex: 1
  },
  itemName: { 
    ...theme.text.h2,
    marginBottom: 4
  },
  itemQty: { 
    ...theme.text.meta
  },
  itemPrice: { 
    ...theme.text.h2,
    fontSize: 18
  },
  footer: { 
    borderTopWidth: 1, 
    borderColor: theme.colors.line, 
    padding: 16, 
    backgroundColor: theme.colors.bgAlt
  },
  totalRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 16
  },
  totalLabel: { 
    ...theme.text.h2,
    fontSize: 20
  },
  totalAmount: { 
    ...theme.text.h1,
    fontSize: 24
  },
  checkoutButton: { 
    backgroundColor: theme.colors.accent, 
    padding: 16, 
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    marginBottom: 8,
    ...theme.shadow.soft
  },
  checkoutButtonText: { 
    color: 'white', 
    fontWeight: '800',
    fontSize: 16
  },
  pickupNote: {
    ...theme.text.meta,
    textAlign: 'center'
  }
});
