const userQueryInput = document.getElementById('userQuery');
const submitQueryButton = document.getElementById('submitQuery');
const chatContainer = document.querySelector('.chat-container');

// Add an event listener to the submit query button
submitQueryButton.addEventListener('click', function() {
  // Get the user's query
  const userQuery = userQueryInput.value;

  // Clear the user query input field
  userQueryInput.value = '';

  // Create a new chat message element
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  // Create a sender element
  const sender = document.createElement('span');
  sender.classList.add('sender');
  sender.textContent = 'ChatGPT';

  // Create a message element
  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = userQuery;

  // Append the sender and message elements to the chat message element
  chatMessage.appendChild(sender);
  chatMessage.appendChild(message);

  // Append the chat message element to the chat container element
  chatContainer.appendChild(chatMessage);

  // Send the user's query to the server and get the response
fetch('/processQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: userQuery })
  })
  .then(response => response.json())
  .then(data => {
    // Display the server's response in the chat
    const serverResponse = document.createElement('div');
    serverResponse.classList.add('chat-message');
  
    const responseSender = document.createElement('span');
    responseSender.classList.add('sender');
    responseSender.textContent = 'Server:';
  
    const serverMessage = document.createElement('div');
    serverMessage.classList.add('message');
    serverMessage.textContent = data.response;
  
    serverResponse.appendChild(responseSender);
    serverResponse.appendChild(serverMessage);
  
    chatContainer.appendChild(serverResponse);
  })
  .catch(error => console.error('Error:', error));  
});

