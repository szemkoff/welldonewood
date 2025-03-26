import React from 'react';
import Layout from '@theme/Layout';

export default function Contact() {
  return (
    <Layout
      title="Contact Us"
      description="Contact Welldonewood">
      <div className="container margin-vert--lg">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you about your custom woodworking needs.
        </p>
        
        <div className="row margin-top--lg">
          <div className="col col--6">
            <h2>Contact Information</h2>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Email:</strong> info@welldonewood.com</p>
            <p><strong>Address:</strong><br />
              123 Woodcraft Lane<br />
              Timber Creek, OR 97123
            </p>
          </div>
          
          <div className="col col--6">
            <h2>Send Us a Message</h2>
            <p>Our contact form will be coming soon!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 