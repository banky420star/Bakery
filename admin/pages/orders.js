import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Orders(){
  const [orders,setOrders] = useState([]);
  useEffect(()=>{ api('/orders').then(setOrders); },[]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered': return <span className="status-badge status-delivered">Delivered</span>;
      case 'transit': return <span className="status-badge status-transit">In Transit</span>;
      case 'processing': return <span className="status-badge status-processing">Processing</span>;
      default: return <span className="status-badge status-processing">Processing</span>;
    }
  };

  return (
    <>
      <nav>
        <a href="/">Artisans Admin</a>
        <a href="/products">Products</a>
        <a href="/orders">Orders</a>
      </nav>
      <main style={{padding:16}}>
        <h1>Orders</h1>
        {orders.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <h3>No orders yet</h3>
              <p>Orders will appear here once customers start placing them</p>
            </div>
          </div>
        ) : (
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o=>(
                  <tr key={o.id}>
                    <td style={{fontWeight: 600, color: 'var(--accent)'}}>#{o.id.slice(0,8)}</td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    <td>
                      <div style={{fontWeight: 600}}>{o.customer_name}</div>
                      <div style={{fontSize: 12, color: 'var(--inkSoft)'}}>{o.customer_email}</div>
                    </td>
                    <td style={{maxWidth: 200}}>
                      {JSON.parse(o.items_json).map(i=>`${i.name} ×${i.qty}`).join(', ')}
                    </td>
                    <td style={{fontWeight: 600, color: 'var(--accent)'}}>${(o.total_cents/100).toFixed(2)}</td>
                    <td>{getStatusBadge('processing')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
