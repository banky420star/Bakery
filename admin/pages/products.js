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
          {items.map(p=>(
            <div key={p.id} style={{display:'grid', gridTemplateColumns:'64px 1fr auto', gap:12, alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--line)'}}>
              <img src={p.image_url || 'https://images.unsplash.com/photo-1543747578-b53a3821f25d?q=80&w=400&auto=format&fit=crop'} width="64" height="64" style={{borderRadius:8, objectFit:'cover'}} alt={p.name}/>
              <div>
                <div style={{fontWeight:800}}>{p.name}</div>
                <div style={{color:'var(--inkSoft)'}}>${(p.price_cents/100).toFixed(2)}</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <button className="button" style={{background:'var(--inkSoft)'}}>Edit</button>
                <button className="button" style={{background:'#9C3B3B'}} onClick={()=>remove(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
