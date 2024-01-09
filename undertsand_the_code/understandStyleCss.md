The provided CSS code styles the "Blockchain Query Interface" web page. Let's break down the key CSS rules and their impact on the page's appearance and layout:

1. **Body Styling**
   - **Description**: Sets the font, removes default margin and padding, applies a flex layout with vertical direction, centers items, and sets a light grey background.
   - **Code Snippet**:
     ```css
     body {
       font-family: 'Arial', sans-serif;
       margin: 0;
       padding: 0;
       display: flex;
       flex-direction: column;
       align-items: center;
       background-color: #f4f4f4;
     }
     ```

2. **Heading (h1) Styling**
   - **Description**: Styles the main heading with a top and bottom margin and dark grey color.
   - **Code Snippet**:
     ```css
     h1 {
       margin: 20px 0;
       color: #333;
     }
     ```

3. **Chat Container Styling**
   - **Description**: Styles the chat container with a flexible column layout, a white background, a shadow effect, and a scrollbar for overflow content.
   - **Code Snippet**:
     ```css
     .chat-container {
       width: 80%;
       max-width: 800px;
       height: 500px;
       margin: 20px 0;
       border: 1px solid #ccc;
       background: #fff;
       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
       overflow-y: auto;
       display: flex;
       flex-direction: column;
       padding-bottom: 10px;
     }
     ```

4. **Chat Message Styling**
   - **Description**: Defines the layout and padding for individual chat messages.
   - **Code Snippet**:
     ```css
     .chat-message {
       display: flex;
       align-items: flex-end;
       margin: 10px;
       padding: 10px;
     }
     ```

5. **Sender Styling**
   - **Description**: Styles the sender's name in chat messages with bold text and a specific color for user queries and server responses.
   - **Code Snippet**:
     ```css
     .chat-message .sender {
       min-width: 100px;
       font-weight: bold;
       color: #333;
     }
     .chat-message.user-query .sender {
       color: #007bff;
       align-self: flex-start;
     }
     .chat-message.server-response .sender {
       color: #28a745;
       align-self: flex-start;
     }
     ```

6. **Message Styling**
   - **Description**: Styles the message content with a specific background color, border, and text layout for user queries, server responses, and errors.
   - **Code Snippet**:
     ```css
     .chat-message .message {
       max-width: 70%;
       word-wrap: break-word;
       padding: 10px;
       border-radius: 10px;
       line-height: 1.5;
       font-size: 0.9rem;
     }
     .chat-message.user-query .message {
       background-color: #e9ecef;
       border: 1px solid #dee2e6;
     }
     .chat-message.server-response .message {
       background-color: #d4edda;
       border: 1px solid #c3e6cb;
     }
     .chat-message.error .message {
       background-color: #f8d7da;
       border: 1px solid #f5c6cb;
     }
     ```

7. **Chat Input Group Styling**
   - **Description**: Styles the chat input area with a flexible layout and specific dimensions.
   - **Code Snippet**:
     ```css
     .chat-input-group {
       width: 80%;
       max-width: 800px;
       display: flex;
       margin: 10px 0;
     }
     ```

8. **Chat Input Styling**
   - **Description**: Styles the chat input field with padding, border, and rounded corners.
   - **Code Snippet**:
     ```css
     .chat-input {
       width: calc(100% - 120px);
       padding: 10px;
       border: 1px solid #ccc;
       border-top-left-radius: 10px;
       border-bottom-left-radius: 10px;
       border-right: none;
     }
     ```

9. **Submit Button Styling**
   - **Description**: Styles the submit button with a specific width, padding, color, and hover effect.
   - **Code Snippet**:
     ```css
     .chat-input button {
       width: 120px;
       padding: 