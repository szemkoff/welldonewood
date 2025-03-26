import React from 'react';
import Layout from '@theme/Layout';

export default function DiningTables() {
  return (
    <Layout
      title="Dining Tables"
      description="Welldonewood Dining Tables">
      <div className="container margin-vert--lg">
        <h1>Dining Tables</h1>
        <p>
          Our handcrafted dining tables are made with the finest hardwoods and traditional joinery techniques.
        </p>
        <div style={{ marginTop: '2rem' }}>
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card__image">
              <img
                src="/img/walnut-dining-table.jpg"
                alt="Walnut Dining Table"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="card__body">
              <h3>Walnut Dining Table</h3>
              <p>
                A stunning walnut dining table with traditional mortise and tenon joinery 
                and a hand-rubbed oil finish that brings out the natural beauty of the wood grain.
              </p>
            </div>
            <div className="card__footer">
              <a href="/products/walnut-dining-table" className="button button--primary button--block">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 