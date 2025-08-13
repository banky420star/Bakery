import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';
import { theme } from '../theme';

export default function Cart({ route, navigation }) {
  const [items, setItems] = useState(route.params?.cart || []);
  const total = items.reduce((s,i)=> s + i.qty * i.price_cents, 0);

  const inc = (id)=> setItems(prev=> prev.map(x=> x.id===id? {...x, qty:x.qty+1 }: x));
  const dec = (id)=> setItems(prev=> prev.map(x=> x.id===id? {...x, qty: Math.max(1,x.qty-1) }: x));
  const rm  = (id)=> setItems(prev=> prev.filter(x=> x.id!==id));

  return (
    <View style={{flex:1, backgroundColor: theme.colors.bg}}>
      <Navbar title="Your Bag" onBack={()=>navigation.goBack()} onCart={()=>{}} cartCount={items.reduce((s,i)=>s+i.qty,0)} />
      <FlatList
        contentContainerStyle={{padding:16, paddingBottom:120}}
        data={items}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>${(item.price_cents/100).toFixed(2)} each</Text>
            </View>
            <View style={styles.qty}>
              <TouchableOpacity style={styles.chip} onPress={()=>dec(item.id)}><Text>-</Text></TouchableOpacity>
              <Text style={styles.qtyNum}>{item.qty}</Text>
              <TouchableOpacity style={styles.chip} onPress={()=>inc(item.id)}><Text>+</Text></TouchableOpacity>
            </View>
            <Text style={styles.lineTotal}>${(item.qty*item.price_cents/100).toFixed(2)}</Text>
            <TouchableOpacity style={[styles.chip,{marginLeft:8}]} onPress={()=>rm(item.id)}><Text>×</Text></TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center', color:theme.colors.inkSoft, marginTop:32}}>Your bag is empty. A tragedy easily fixed.</Text>}
      />
      <View style={styles.checkoutBar}>
        <Text style={styles.total}>Total ${(total/100).toFixed(2)}</Text>
        <TouchableOpacity style={styles.pay} onPress={()=>navigation.navigate('Checkout',{cart:items})}>
          <Text style={{color:'#fff', fontWeight:'800'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{ backgroundColor:'#fff', borderColor:theme.colors.line, borderWidth:1, borderRadius:12, padding:12, marginBottom:12, flexDirection:'row', alignItems:'center', gap:10 },
  name:{ fontWeight:'800', color:theme.colors.ink },
  meta:{ color:theme.colors.inkSoft, marginTop:2 },
  qty:{ flexDirection:'row', alignItems:'center', gap:8 },
  chip:{ backgroundColor: theme.colors.bgAlt, borderRadius:8, paddingVertical:6, paddingHorizontal:10, borderWidth:1, borderColor: theme.colors.line },
  qtyNum:{ fontWeight:'800', minWidth:18, textAlign:'center' },
  lineTotal:{ fontWeight:'900', color: theme.colors.ink, marginLeft:'auto' },
  checkoutBar:{ position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#fff', borderTopColor: theme.colors.line, borderTopWidth:1, padding:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  total:{ fontWeight:'900', color: theme.colors.ink, fontSize:18 },
  pay:{ backgroundColor: theme.colors.accent, paddingVertical:12, paddingHorizontal:18, borderRadius:12 }
});
