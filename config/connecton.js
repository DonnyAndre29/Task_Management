const Sequelize = require('sequelize')
require('dotenv').config();


// connection.js

// Load the discovery doc to initialize the API
async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: process.env.API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'],
    });
    // Set any other necessary configurations
  }
  
  // Callback after Google Identity Services are loaded
  function gisLoaded() {
    // Initialize tokenClient and other necessary setup
  }
  
  // Enables user interaction after all libraries are loaded
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
      // Add other button interactions here
    }
  }
  
  // Sign in the user upon button click
  function handleAuthClick() {
    // Handle authentication logic
  }
  
  // Sign out the user upon button click
  function handleSignoutClick() {
    // Handle signout logic
  }
  
  // Print task lists
  async function fetchTaskLists() {
    // Fetch and display task lists
  }
  
  // Load Google APIs and Identity Services
  // (Include these script tags in your HTML file)
  // <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
  // <script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>
  