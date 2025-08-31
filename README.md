# 📺 Channels Web application 
This is a **Channels Web Application** built with **React JS** and **Material-UI (MUI)**. The project uses **React Hooks** for state management, and all channel data is handled via a local **JSON file**.

---

# 📌 Features  

🗂️ **Filter & Search**  
- Filter channels by Country, Device Type, Tab, Category, Platform Version, Status, Title, and Date Range.  
- Reset all filters with a single click.  

🛠️ **CRUD Operations**  
- Add new channels using a modal form.  
- Delete selected channels.  
- Data is saved to a local JSON file (`data.json`).  

📊 **Data Table**  
- Paginated table with checkbox selection.  
- Columns: Id, Title, Country, Device Type, Category, Platform Version, Status, Start Date, End Date.  

---

# 📂 Folder Structure

application/
│── src/
│ ├── Webapp.js # Main component with filters, table, modal, and CRUD logic
│ ├── index.js # React entry point
│── data.json # Local JSON file storing channel data
│── package.json
│── README.md

# To run the app, follow the steps below after cloning or downloading:

Install dependencies: npm install
Start the React App (UI): npm start

# 🛠️ Tech Stack
- Frontend: React JS, Material-UI (MUI)  
- State Management: React Hooks (`useState`, `useEffect`)  
- Data Handling: JSON file  