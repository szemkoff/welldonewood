const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('==========================================================');
console.log('    Welldonewood Social Media Hub - Credentials Setup');
console.log('==========================================================');
console.log('');
console.log('This script will help you set up your Google API credentials');
console.log('');

// Ask for the path to the credentials file
rl.question('Please enter the full path to your credentials.json file: ', (credentialsPath) => {
  try {
    // Remove quotes if the user added them
    credentialsPath = credentialsPath.replace(/^["']|["']$/g, '');
    
    // Check if the file exists
    if (!fs.existsSync(credentialsPath)) {
      console.error(`Error: File does not exist at ${credentialsPath}`);
      rl.close();
      return;
    }
    
    // Read the file
    const credentials = fs.readFileSync(credentialsPath, 'utf8');
    
    // Parse the JSON to make sure it's valid
    try {
      JSON.parse(credentials);
    } catch (e) {
      console.error('Error: The file is not a valid JSON file.');
      rl.close();
      return;
    }
    
    // Copy the file to the current directory
    const targetPath = path.join(__dirname, 'credentials.json');
    fs.writeFileSync(targetPath, credentials);
    
    console.log(`\nSuccess! Credentials copied to ${targetPath}`);
    console.log('\nYou can now run the Social Media Hub creator:');
    console.log('\n    node createHub.js');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    rl.close();
  }
}); 