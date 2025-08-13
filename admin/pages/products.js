import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Products(){
  const [items,setItems] = useState([]);
  const [form,setForm] = useState({ name:'', description:'', price_cents:'', image_url:'' });

  async function load(){ setItems(await api('/products')); }
  useEffect(()=>{ load(); },[]);

  async function save(e){
    e.preventDefault();
    await api('/products',{ method:'POST', body: JSON.stringify({ ...form, price_cents: parseInt(form.price_cents||'0',10) }) });
    setForm({ name:'', description:'', price_cents:'', image_url:'' });
    load();
  }
  async function remove(id){ await api(`/products/${id}`,{ method:'DELETE' }); load(); }

  return (
    <>
      <nav>
        <a href="/">Artisans Admin</a>
        <a href="/products">Products</a>
        <a href="/orders">Orders</a>
      </nav>
      <main style={{padding:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <section className="card">
          <h2>Add New Product</h2>
          <form onSubmit={save}>
            <div style={{marginBottom: 16}}>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--ink)'}}>Product Name</label>
              <input 
                className="input" 
                placeholder="e.g., Rustic Baguette" 
                value={form.name} 
                onChange={e=>setForm({...form, name:e.target.value})} 
              />
            </div>
            <div style={{marginBottom: 16}}>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--ink)'}}>Description</label>
              <textarea 
                className="input" 
                rows={4} 
                placeholder="Describe the product..." 
                value={form.description} 
                onChange={e=>setForm({...form, description:e.target.value})}
              />
            </div>
            <div style={{marginBottom: 16}}>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--ink)'}}>Price (cents)</label>
              <input 
                className="input" 
                type="number"
                placeholder="500" 
                value={form.price_cents} 
                onChange={e=>setForm({...form, price_cents:e.target.value})}
              />
            </div>
            <div style={{marginBottom: 16}}>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--ink)'}}>Image URL</label>
              <input 
                className="input" 
                type="url"
                placeholder="https://example.com/image.jpg" 
                value={form.image_url} 
                onChange={e=>setForm({...form, image_url:e.target.value})}
              />
            </div>
            <button className="button">Save Product</button>
          </form>
        </section>

        <section className="card">
          <h2>Products</h2>
          {items.length === 0 ? (
            <div className="empty-state">
              <h3>No products yet</h3>
              <p>Add your first product to get started</p>
            </div>
          ) : (
            <div>
              {items.map(p=>(
                <div key={p.id} className="product-item">
                  <img 
                    src={p.image_url || 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=64&h=64&fit=crop'} 
                    className="product-thumbnail" 
                    alt={p.name}
                  />
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <div className="product-price">${(p.price_cents/100).toFixed(2)}</div>
                  </div>
                  <div className="product-actions">
                    <button className="button secondary">Edit</button>
                    <button className="button danger" onClick={()=>remove(p.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
