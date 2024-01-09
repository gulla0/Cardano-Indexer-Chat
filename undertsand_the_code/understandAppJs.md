The provided JavaScript code is designed to handle user interactions on the "Blockchain Query Interface" web page. Here's a breakdown of its functionality:

1. **Event Listener for DOMContentLoaded**
   - **Description**: Adds an event listener that executes the enclosed function once the HTML document has been fully loaded and parsed.
   - **Code Snippet**:
     ```javascript
     document.addEventListener('DOMContentLoaded', function () { ... });
     ```

2. **Element Selection**
   - **Description**: Retrieves elements from the DOM: the user's query input field, the submit query button, and the chat container where messages will be displayed.
   - **Code Snippet**:
     ```javascript
     const userQueryInput = document.getElementById('userQuery');
     const submitQueryButton = document.getElementById('submitQuery');
     const chatContainer = document.querySelector('.chat-container');
     ```

3. **Function to Append Messages**
   - **Description**: Declares a function `appendMessage` to create and append chat messages to the chat container.
   - **Code Snippet**:
     ```javascript
     function appendMessage(sender, content) { ... }
     ```

4. **Event Listener for Submit Button Click**
   - **Description**: Adds an event listener to the submit query button to handle clicks.
   - **Code Snippet**:
     ```javascript
     submitQueryButton.addEventListener('click', function() { ... });
     ```

5. **Fetch User Query and Clear Input**
   - **Description**: Retrieves the user query from the input field and then clears the input field.
   - **Code Snippet**:
     ```javascript
     const userQuery = userQueryInput.value;
     userQueryInput.value = '';
     ```

6. **Display User Query in Chat**
   - **Description**: Calls `appendMessage` to display the user's query in the chat container.
   - **Code Snippet**:
     ```javascript
     appendMessage('User', userQuery);
     ```

7. **Fetch API Call to Process Query**
   - **Description**: Makes a POST request to the server's '/processQuery' endpoint, sending the user's query for processing.
   - **Code Snippet**:
     ```javascript
     fetch('/processQuery', { ... })
     ```

8. **Handle Server Response**
   - **Description**: Processes the server's response. If the response is not OK, it throws an error; otherwise, it displays the server's response in the chat container.
   - **Code Snippet**:
     ```javascript
     .then(response => { ... })
     .then(data => {
         appendMessage('Server', data.response);
     })
     ```

9. **Error Handling**
   - **Description**: Catches and logs any errors, and displays error messages in the chat container.
   - **Code Snippet**:
     ```javascript
     .catch((error) => {
         console.error('Error:', error);
         appendMessage('Error', error.toString());
     });
     ```

This script ensures the user's query is sent to the server, processes the response, and then displays both the query and the response in the chat interface, providing a seamless interaction experience.