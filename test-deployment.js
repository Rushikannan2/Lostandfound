#!/usr/bin/env node

/**
 * Deployment Test Script for KLH Lost & Found
 * Tests the application configuration for Render deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing KLH Lost & Found Deployment Configuration...\n');

// Test 1: Check if all required files exist
const requiredFiles = [
  'render.yaml',
  'DEPLOYMENT.md',
  'backend/package.json',
  'backend/server.js',
  'frontend/package.json',
  'frontend/src/api.ts'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Test 2: Check package.json scripts
console.log('\n📦 Checking package.json scripts...');

try {
  const backendPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend/package.json'), 'utf8'));
  if (backendPkg.scripts.start) {
    console.log('✅ Backend start script exists');
  } else {
    console.log('❌ Backend start script missing');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Backend package.json not found or invalid');
  allFilesExist = false;
}

try {
  const frontendPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend/package.json'), 'utf8'));
  if (frontendPkg.scripts.build) {
    console.log('✅ Frontend build script exists');
  } else {
    console.log('❌ Frontend build script missing');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Frontend package.json not found or invalid');
  allFilesExist = false;
}

// Test 3: Check render.yaml configuration
console.log('\n⚙️ Checking render.yaml configuration...');

try {
  const renderConfig = fs.readFileSync(path.join(__dirname, 'render.yaml'), 'utf8');
  if (renderConfig.includes('type: web') && renderConfig.includes('type: static')) {
    console.log('✅ render.yaml has web and static services');
  } else {
    console.log('❌ render.yaml missing required service types');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ render.yaml not found or invalid');
  allFilesExist = false;
}

// Test 4: Check environment variable handling
console.log('\n🔧 Checking environment variable handling...');

try {
  const apiFile = fs.readFileSync(path.join(__dirname, 'frontend/src/api.ts'), 'utf8');
  if (apiFile.includes('import.meta.env.VITE_API_BASE')) {
    console.log('✅ Frontend API base URL configured');
  } else {
    console.log('❌ Frontend API base URL not configured');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Frontend API configuration not found');
  allFilesExist = false;
}

// Test 5: Check production environment handling
console.log('\n🏭 Checking production environment handling...');

try {
  const serverFile = fs.readFileSync(path.join(__dirname, 'backend/server.js'), 'utf8');
  if (serverFile.includes('NODE_ENV') && serverFile.includes('production')) {
    console.log('✅ Backend production environment handling');
  } else {
    console.log('❌ Backend production environment handling missing');
    allFilesExist = false;
  }
} catch (error) {
  console.log('❌ Backend server configuration not found');
  allFilesExist = false;
}

// Final result
console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('\n📋 Next Steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Connect your repository to Render');
  console.log('3. Deploy backend service first');
  console.log('4. Deploy frontend service second');
  console.log('5. Configure environment variables');
  console.log('6. Test your deployed application');
  console.log('\n📖 See DEPLOYMENT.md for detailed instructions');
} else {
  console.log('❌ DEPLOYMENT NOT READY');
  console.log('\n🔧 Please fix the issues above before deploying');
}

console.log('\n🚀 Happy Deploying!');
