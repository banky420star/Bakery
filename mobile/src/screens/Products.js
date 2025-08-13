import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import Navbar from '../components/Navbar';
import { theme } from '../theme';

const HERO_IMG = 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1600&auto=format&fit=crop'; // rustic bakery counter

// Fallback stock photos by product hint (improve realism)
const photoFor = (name, fallback) => {
  const n = (name || '').toLowerCase();
  if (n.includes('sourdough')) return 'https://images.unsplash.com/photo-1543747578-b53a3821f25d?q=80&w=1200&auto=format&fit=crop';
  if (n.includes('brioche'))   return 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=1200&auto=format&fit=crop';
  if (n.includes('olive'))     return 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop';
  if (n.includes('croissant')) return 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1200&auto=format&fit=crop';
  return fallback || 'https://images.unsplash.com/photo-1604908554026-05c3f6f7b4f2?q=80&w=1200&auto=format&fit=crop';
};

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:4000/products').then(r => r.json()).then((rows)=>{
      // add client-side photo fallbacks if empty
      setProducts(rows.map(p => ({...p, image_url: p.image_url || photoFor(p.name, p.image_url)})));
    });
  }, []);

  const categories = useMemo(()=>{
    // categories by keywords; swap to backend categories if you add them later
    const cats = new Set(['All']);
    products.forEach(p=>{
      const n=(p.name||'').toLowerCase();
      if (/(sourdough|loaf|batard|brioche|bread)/.test(n)) cats.add('Loaves');
      if (/(croissant|pastry|danish|babka|buns?)/.test(n)) cats.add('Pastries');
      if (/(season|pumpkin|special)/.test(n)) cats.add('Seasonal');
    });
    return [...cats];
  },[products]);

  const filtered = useMemo(()=>{
    if (category==='All') return products;
    if (category==='Loaves')   return products.filter(p=>/(sourdough|loaf|batard|brioche|bread)/i.test(p.name));
    if (category==='Pastries') return products.filter(p=>/(croissant|pastry|danish|babka|buns?)/i.test(p.name));
    if (category==='Seasonal') return products.filter(p=>/(season|pumpkin|special)/i.test(p.name));
    return products;
  }, [products, category]);

  const add = (p)=> setCart(prev=>{
    const i=prev.findIndex(x=>x.id===p.id);
    if (i<0) return [...prev,{...p, qty:1}];
    const copy=[...prev]; copy[i].qty+=1; return copy;
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <Navbar
        title="Artisans on the Alley"
        onCart={()=>navigation.navigate('Cart', { cart })}
        cartCount={cart.reduce((s,i)=>s+i.qty,0)}
      />

      {/* Hero */}
      <ImageBackground source={{uri:HERO_IMG}} style={styles.hero} imageStyle={{opacity:.9}}>
        <View style={styles.heroOverlay} />
        <Text style={styles.heroTitle}>Handcrafted • Fresh Daily</Text>
        <Text style={styles.heroSubtitle}>Prepay online. Pick up or request delivery.</Text>
      </ImageBackground>

      {/* Category tabs */}
      <View style={styles.tabs}>
        {categories.map(c=>(
          <TouchableOpacity key={c} onPress={()=>setCategory(c)} style={[styles.tab, category===c && styles.tabActive]}>
            <Text style={[styles.tabText, category===c && styles.tabTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product grid (2 columns) */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal:16, paddingBottom:90 }}
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap:12 }}
        renderItem={({ item }) => (
          <View style={[styles.card, theme.shadow.card]}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={{padding:12}}>
              <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>${(item.price_cents/100).toFixed(2)}</Text>
                <TouchableOpacity style={styles.add} onPress={()=>add(item)}>
                  <Text style={styles.addLabel}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Floating bag CTA */}
      <TouchableOpacity style={styles.fab} onPress={()=>navigation.navigate('Cart',{cart})}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Bag • {cart.reduce((s,i)=>s+i.qty,0)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  hero:{ height:180, justifyContent:'flex-end' },
  heroOverlay:{ ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.25)' },
  heroTitle:{ color:'#fff', fontSize:24, fontWeight:'900', marginHorizontal:16, marginBottom:6 },
  heroSubtitle:{ color:'#fff', marginHorizontal:16, marginBottom:12 },
  tabs:{ flexDirection:'row', gap:8, paddingHorizontal:16, paddingVertical:12, borderBottomWidth:1, borderBottomColor: theme.colors.line, backgroundColor: theme.colors.bgAlt },
  tab:{ paddingVertical:8, paddingHorizontal:12, borderRadius:20, borderWidth:1, borderColor: theme.colors.line, backgroundColor:'#fff' },
  tabActive:{ backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  tabText:{ color: theme.colors.ink, fontWeight:'700' },
  tabTextActive:{ color:'#fff' },
  card:{ flex:1, backgroundColor:'#fff', borderRadius:12, overflow:'hidden', borderWidth:1, borderColor: theme.colors.line, marginTop:12 },
  image:{ width:'100%', height:120 },
  name:{ fontSize:16, fontWeight:'800', color: theme.colors.ink },
  desc:{ fontSize:12, color: theme.colors.inkSoft, marginTop:2 },
  row:{ marginTop:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  price:{ fontSize:16, fontWeight:'900', color: theme.colors.ink },
  add:{ backgroundColor: theme.colors.accent, paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
  addLabel:{ color:'#fff', fontWeight:'800' },
  fab:{ position:'absolute', bottom:16, left:16, right:16, backgroundColor: theme.colors.ink, padding:16, borderRadius:14, alignItems:'center' }
});
