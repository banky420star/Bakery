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
          <h2>Add Product</h2>
          <form onSubmit={save}>
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <br/><br/>
            <textarea className="input" rows={4} placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
            <br/><br/>
            <input className="input" placeholder="Price (cents)" value={form.price_cents} onChange={e=>setForm({...form, price_cents:e.target.value})}/>
            <br/><br/>
            <input className="input" placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form, image_url:e.target.value})}/>
            <br/><br/>
            <button className="button">Save</button>
          </form>
        </section>

        <section className="card">
          <h2>Products</h2>
          {items.map(p=>(
            <div key={p.id} style={{display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap:8, marginBottom:8}}>
              <div>
                <div style={{fontWeight:800}}>{p.name}</div>
                <div>${(p.price_cents/100).toFixed(2)}</div>
              </div>
              <button className="button" onClick={()=>remove(p.id)}>Delete</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
