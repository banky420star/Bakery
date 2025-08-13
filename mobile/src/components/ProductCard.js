import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ProductCard({ item, onAdd }){
  return (
    <View style={[styles.card, theme.shadow.card]}>
      {!!item.image_url && <Image source={{uri:item.image_url}} style={styles.image} />}
      <View style={{padding: 12}}>
        <Text style={styles.name}>{item.name}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${(item.price_cents/100).toFixed(2)}</Text>
          <TouchableOpacity style={styles.cta} onPress={onAdd}>
            <Text style={styles.ctaLabel}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor: '#fff', 
    borderRadius: theme.radius.md, 
    overflow: 'hidden',
    borderWidth: 1, 
    borderColor: theme.colors.line, 
    marginBottom: 12
  },
  image:{ 
    width: '100%', 
    height: 160 
  },
  name:{ 
    ...theme.text.h2 
  },
  desc:{ 
    ...theme.text.body, 
    color: theme.colors.inkSoft, 
    marginTop: 4 
  },
  bottomRow:{ 
    marginTop: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  price:{ 
    ...theme.text.h2, 
    fontSize: 20 
  },
  cta:{
    backgroundColor: theme.colors.accent, 
    paddingVertical: 8, 
    paddingHorizontal: 14,
    borderRadius: theme.radius.sm
  },
  ctaLabel:{ 
    color: '#fff', 
    fontWeight: '800' 
  }
});
