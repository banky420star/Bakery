import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Orders(){
  const [orders,setOrders] = useState([]);
  useEffect(()=>{ api('/orders').then(setOrders); },[]);
  return (
    <>
      <nav>
        <a href="/">Artisans Admin</a>
        <a href="/products">Products</a>
        <a href="/orders">Orders</a>
      </nav>
      <main style={{padding:16}}>
        <h2>Orders</h2>
        <div className="card">
          <table width="100%" cellPadding="8">
            <thead><tr><th>Date</th><th>Customer</th><th>Method</th><th>Total</th><th>Items</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id}>
                  <td>{new Date(o.created_at).toLocaleString()}</td>
                  <td>{o.customer_name} <br/>{o.customer_email}</td>
                  <td>{o.delivery_method}</td>
                  <td>${(o.total_cents/100).toFixed(2)}</td>
                  <td>{JSON.parse(o.items_json).map(i=>`${i.name} x${i.qty}`).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
