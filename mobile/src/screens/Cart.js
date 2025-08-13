import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Cart({ route, navigation }) {
  const cart = route.params?.cart || [];
  const total = cart.reduce((s,i)=> s + i.qty * i.price_cents, 0);

  return (
    <View style={{flex:1, backgroundColor: theme.colors.background}}>
      <Text style={styles.h}>Cart</Text>
      <FlatList data={cart} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={styles.row}>
          <Text style={styles.name}>{item.name} x{item.qty}</Text>
          <Text style={styles.price}>${(item.qty * item.price_cents/100).toFixed(2)}</Text>
        </View>
      )}/>
      <View style={styles.footer}>
        <Text style={styles.total}>Total ${(total/100).toFixed(2)}</Text>
        <TouchableOpacity style={styles.pay} onPress={()=>navigation.navigate('Checkout',{cart})}>
          <Text style={{color:'white', fontWeight:'800'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h:{ fontSize:24, fontWeight:'800', color:theme.colors.text, margin:16 },
  row:{ padding:16, flexDirection:'row', justifyContent:'space-between' },
  name:{ color:theme.colors.text, fontWeight:'700' },
  price:{ color:theme.colors.accent, fontWeight:'700' },
  footer:{ borderTopWidth:1, borderColor:'#eee', padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  total:{ fontWeight:'800', color:theme.colors.text },
  pay:{ backgroundColor:theme.colors.accent, padding:12, borderRadius:10 }
});
