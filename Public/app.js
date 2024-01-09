document.addEventListener('DOMContentLoaded', function () {
    const userQueryInput = document.getElementById('userQuery');
    const submitQueryButton = document.getElementById('submitQuery');
    const chatContainer = document.querySelector('.chat-container');

    function appendMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'User' ? 'user-query' : 'server-response');

        const senderSpan = document.createElement('span');
        senderSpan.classList.add('sender');
        senderSpan.textContent = sender;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message');
        contentDiv.textContent = content;

        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    submitQueryButton.addEventListener('click', function() {
        console.log('JavaScript file loaded'); // Add this line here
        console.log('Submit button clicked'); // This line is for testing purposes
        const userQuery = userQueryInput.value;
        userQueryInput.value = '';

        // Display the user query
        appendMessage('User', userQuery);

        fetch('/processQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userQuery })
        })
        .then(response => {
            if (!response.ok) {
                // If the server response is not OK, parse and throw the error message
                return response.json().then(errorData => {
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                });
            }
            // Otherwise, parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Display the server response
            appendMessage('Server', data.response);
        }) 
        .catch((error) => {
            console.error('Error:', error);
            // Display the error message
            appendMessage('Error', error.toString());
        });                                       
    });
});


   
