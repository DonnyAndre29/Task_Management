const { google } = require('googleapis');
require('dotenv').config();


  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly';

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;



  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);

  }

  // Load the discovery doc to initialize the API
async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: process.env.API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }
  
  // Callback after Google Identity Services are loaded
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      });
      gisInited = true;
      maybeEnableButtons();

  }
  
  // Enables user interaction after all libraries are loaded
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
      
    }
  }
  
  // Sign in the user upon button click
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        await fetchTaskLists();
      };

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({prompt: ''});
      }
  }
  
  // Sign out the user upon button click
  function handleSignoutClick() {
    const token = gapi.client.getToken();
        if (token !== null) {
          google.accounts.oauth2.revoke(token.access_token);
          gapi.client.setToken('');
          document.getElementById('content').innerText = '';
          document.getElementById('authorize_button').innerText = 'Authorize';
          document.getElementById('signout_button').style.visibility = 'hidden';
        }
  }
  
  // Print task lists
  async function fetchTaskLists() {
    let response;
    try {
      response = await gapi.client.tasks.tasklists.list({
        'maxResults': 10,
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
    const taskLists = response.result.items;
    if (!taskLists || taskLists.length == 0) {
      document.getElementById('content').innerText = 'No task lists found.';
      return;
    }
    // Flatten to string to display
    const output = taskLists.reduce(
        (str, taskList) => `${str}${taskList.title} (${taskList.id})\n`,
        'Task lists:\n');
    document.getElementById('content').innerText = output;
  }
  
  gapiLoaded();
  gisLoaded();
  handleAuthClick();
  handleSignoutClick();
  
  