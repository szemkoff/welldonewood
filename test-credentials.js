const fs = require('fs');
const path = require('path');

try {
  // Path to credentials file
  const credentialsPath = path.join(__dirname, 'credentials.json');
  
  // Check if file exists
  if (!fs.existsSync(credentialsPath)) {
    console.error(`Error: Credentials file not found at ${credentialsPath}`);
    process.exit(1);
  }
  
  // Read the file
  const credentialsContent = fs.readFileSync(credentialsPath, 'utf8');
  
  // Parse JSON
  const credentials = JSON.parse(credentialsContent);
  
  // Check for required fields
  const requiredFields = ['client_email', 'private_key', 'type', 'project_id'];
  const missingFields = requiredFields.filter(field => !credentials[field]);
  
  if (missingFields.length > 0) {
    console.error(`Error: Credentials file is missing required fields: ${missingFields.join(', ')}`);
    process.exit(1);
  }
  
  // Show info about the credentials
  console.log('Credentials file looks valid:');
  console.log(`- Service Account: ${credentials.client_email}`);
  console.log(`- Project ID: ${credentials.project_id}`);
  console.log(`- Type: ${credentials.type}`);
  console.log(`- Private Key present: ${credentials.private_key ? 'Yes' : 'No'}`);
  
  // Check private key formatting
  if (credentials.private_key) {
    if (!credentials.private_key.includes('-----BEGIN PRIVATE KEY-----')) {
      console.error('Warning: Private key does not appear to be in the correct format');
    } else {
      console.log('- Private key format appears correct');
    }
  }
  
  console.log('\nYour credentials file looks good! Try running createHub.js again.');
  
} catch (error) {
  console.error(`Error reading or parsing credentials file: ${error.message}`);
  process.exit(1);
} 