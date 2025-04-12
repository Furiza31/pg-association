# .env

## Generate a secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Environment variables

```
PORT=3000
JWT_SECRET=THE GENERATED SECRET
JWT_EXPIRATION=1d
DATABASE_URL="file:./dev.db"
SALT_ROUNDS=YOURSALTROUNDS
```

PS: SALTS_ROUNDS is the number of rounds to generate the salt for the password hash. The higher the number, the more secure it is, but it will take longer to generate the hash. The recommended value is 10.

## Socket.IO Chat Integration

The API includes real-time chat functionality using Socket.IO with the following events:

- `connection`: Fired when a client connects to the socket server
- `join_room`: Used to join a specific chat room
- `send_message`: Used to send a message to a room
- `receive_message`: Event emitted when a message is received
- `disconnect`: Fired when a client disconnects

### Example usage in client:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Join a chat room
socket.emit("join_room", "room1");

// Send a message
socket.emit("send_message", {
  room: "room1",
  message: "Hello, World!",
  sender: "User123",
});

// Listen for messages
socket.on("receive_message", (data) => {
  console.log(`${data.sender}: ${data.message}`);
});
```
