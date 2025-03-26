import React from 'react';
import Layout from '@theme/Layout';

export default function Products() {
  return (
    <Layout
      title="Products"
      description="Welldonewood Products">
      <div className="container margin-vert--lg">
        <h1>Our Products</h1>
        <p>
          Welldonewood offers high-quality exterior wood products for your home and outdoor spaces. 
          We're currently working on adding all our products to this page.
        </p>
        
        <div className="row margin-top--lg">
          <div className="col col--6 margin-bottom--lg">
            <div className="card">
              <div className="card__header">
                <h3>Decking</h3>
              </div>
              <div className="card__body">
                <p>
                  Premium wood decking solutions that combine beauty, durability, and sustainability.
                </p>
              </div>
              <div className="card__footer">
                <a href="/products/category/decking" className="button button--primary button--block">
                  View Decking Products
                </a>
              </div>
            </div>
          </div>
          
          <div className="col col--6 margin-bottom--lg">
            <div className="card">
              <div className="card__header">
                <h3>Siding</h3>
              </div>
              <div className="card__body">
                <p>
                  Beautiful exterior siding options that enhance the look and protection of your home.
                </p>
              </div>
              <div className="card__footer">
                <a href="/products/category/siding" className="button button--primary button--block">
                  View Siding Products
                </a>
              </div>
            </div>
          </div>
          
          <div className="col col--6 margin-bottom--lg">
            <div className="card">
              <div className="card__header">
                <h3>Fencing</h3>
              </div>
              <div className="card__body">
                <p>
                  Stylish and durable fencing solutions for privacy, security, and curb appeal.
                </p>
              </div>
              <div className="card__footer">
                <a href="/products/category/fencing" className="button button--primary button--block">
                  View Fencing Products
                </a>
              </div>
            </div>
          </div>
          
          <div className="col col--6 margin-bottom--lg">
            <div className="card">
              <div className="card__header">
                <h3>Custom Projects</h3>
              </div>
              <div className="card__body">
                <p>
                  Tailored woodworking solutions for unique exterior needs and specifications.
                </p>
              </div>
              <div className="card__footer">
                <a href="/products/category/custom" className="button button--primary button--block">
                  View Custom Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 