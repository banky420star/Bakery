import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
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
        payment_method_id: 'pm_card_visa'
      })
    }).then(x=>x.json());
    if (r.ok) navigation.reset({ index:0, routes:[{name:'Products'}] });
    else alert('Payment failed: ' + r.error);
  };

  return (
    <View style={{flex:1, backgroundColor: theme.colors.bg}}>
      <Navbar title="Checkout" onBack={()=>navigation.goBack()} onCart={()=>{}} />
      <View style={{padding:16}}>
        <Text style={theme.text.h2}>Order Total ${(total/100).toFixed(2)}</Text>
        <Text style={theme.text.meta}>We'll email your receipt.</Text>

        <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <View style={styles.row}>
          <TouchableOpacity style={[styles.tag, delivery==='PICKUP' && styles.tagActive]} onPress={()=>setDelivery('PICKUP')}><Text style={[styles.tagText, delivery==='PICKUP' && styles.tagTextActive]}>Pickup</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.tag, delivery==='DELIVERY' && styles.tagActive]} onPress={()=>setDelivery('DELIVERY')}><Text style={[styles.tagText, delivery==='DELIVERY' && styles.tagTextActive]}>Delivery</Text></TouchableOpacity>
        </View>
        {delivery==='DELIVERY' && (
          <TextInput style={styles.input} placeholder="Delivery address" value={address} onChangeText={setAddress} />
        )}

        <TouchableOpacity style={styles.pay} onPress={pay}>
          <Text style={{color:'#fff', fontWeight:'900'}}>Pay now</Text>
        </TouchableOpacity>
        <Text style={[theme.text.meta,{marginTop:8}]}>Test card via Stripe dev: this uses pm_card_visa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{ backgroundColor:'#fff', borderColor: theme.colors.line, borderWidth:1, padding:12, borderRadius:12, marginTop:10 },
  row:{ flexDirection:'row', gap:10, marginTop:10 },
  tag:{ paddingVertical:10, paddingHorizontal:14, borderRadius:999, backgroundColor:'#fff', borderWidth:1, borderColor: theme.colors.line },
  tagActive:{ backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  tagText:{ color: theme.colors.ink, fontWeight:'800' },
  tagTextActive:{ color:'#fff' },
  pay:{ marginTop:14, backgroundColor: theme.colors.ink, paddingVertical:14, borderRadius:12, alignItems:'center' }
});
