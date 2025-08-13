import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function Checkout({ route, navigation }) {
  const cart = route.params?.cart || [];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [delivery, setDelivery] = useState('PICKUP');
  const [address, setAddress] = useState('');
  const total = cart.reduce((s,i)=> s + i.qty * i.price_cents, 0);

  const pay = async ()=>{
    const items = cart.map(i=>({ id:i.id, name:i.name, price_cents:i.price_cents, qty:i.qty }));
    const r = await fetch('http://localhost:4000/orders', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        items, total_cents: total,
        customer_name: name, customer_email: email, customer_phone: phone,
        delivery_method: delivery, address,
        payment_method_id: 'pm_card_visa' // Replace with Stripe SDK on production
      })
    }).then(x=>x.json());
    if (r.ok) navigation.reset({ index:0, routes:[{name:'Products'}] });
    else alert('Payment failed: ' + r.error);
  };

  return (
    <View style={{flex:1, backgroundColor: theme.colors.background, padding:16}}>
      <Text style={styles.h}>Checkout (${(total/100).toFixed(2)})</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
      <View style={{flexDirection:'row', gap:12, marginVertical:12}}>
        <TouchableOpacity style={[styles.tag, delivery==='PICKUP' && styles.tagActive]} onPress={()=>setDelivery('PICKUP')}><Text>Pickup</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tag, delivery==='DELIVERY' && styles.tagActive]} onPress={()=>setDelivery('DELIVERY')}><Text>Delivery</Text></TouchableOpacity>
      </View>
      {delivery==='DELIVERY' && (
        <TextInput style={styles.input} placeholder="Delivery Address" value={address} onChangeText={setAddress} />
      )}
      <TouchableOpacity style={styles.pay} onPress={pay}><Text style={{color:'white', fontWeight:'800'}}>Pay Now</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  h:{ fontSize:22, fontWeight:'800', color:theme.colors.text },
  input:{ backgroundColor:'#fff', padding:12, borderRadius:10, marginTop:8 },
  tag:{ backgroundColor:'#fff', padding:8, borderRadius:8 },
  tagActive:{ backgroundColor: theme.colors.muted },
  pay:{ backgroundColor:theme.colors.accent, padding:16, borderRadius:10, alignItems:'center', marginTop:8 }
});
