# frontendticketsystem
## Available Scripts

In the project directory, you can run:
### `npm install`
Run the command after cloning the project frontendticketsystem.

### `npm install node-modules`
Run the command npm install node-modules after npm install. To install the modules.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# project summary
# A brief explanation of the database schema
I used SQLite database schema for managing tickets. The tickets table stores ticket information, including a unique id, title, description, priority (defaulting to "Low"), status (defaulting to "Open"), and createdAt timestamp. The id is an auto-incrementing primary key. The title is a required text field, while description, priority, and status are optional. The createdAt field automatically records the ticket creation time. This schema efficiently organizes ticket data for retrieval, updates, and deletion.
### A demo of the system in action
This Project of ticket management system is using Node.js and SQLite DB for backend and React.JS for frontend. It creates, reads, updates, and deletes tickets stored in the SQLite database. When a user creates a new ticket via the Frontend(UI), the backend stores the title, description, priority, and status. Similarly, when a user views, edits, or deletes a ticket through the UI, the backend interacts with the database to fetch, modify, or remove the corresponding data as per users wish. The UI then displays the updated information enabling the user to access what’s in the database from the frontend side.




