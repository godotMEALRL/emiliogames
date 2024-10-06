// yarn add stream-chat
import { StreamChat } from 'stream-chat';

// If you're using CommonJS
// const StreamChat = require('stream-chat').StreamChat;

// Instantiate your stream client using the API key and secret
// The secret is only used server side and gives you full access to the API
// Find your API keys here https://getstream.io/dashboard/
const serverClient = StreamChat.getInstance('6hevtpzamvgu', 'ed8cy58taky8tju6jmmt7nd68zhfkxccjdwebq9qggdskyzyhbsq594xdpxn3gs6');

// Generate a token for the user with id 'john'
const token = serverClient.createToken('john');

// Call askForName on page load
window.onload = function() {
    let storedName = localStorage.getItem('userName');

    // Check if username is already stored
    if (!storedName) {
        let name = prompt("What is your name?");
        // If user does not input a name, default to 'Guest'
        if (!name) {
            name = "Guest"; 
        }
        // Store the name in localStorage
        localStorage.setItem('userName', name);
    }

    // Greet the user
    document.getElementById("greeting").innerText = "Hello, " + (storedName || name) + "!";
};

// Add your chat initialization logic here, if needed.
