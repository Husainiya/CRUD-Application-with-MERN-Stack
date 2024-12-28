# CRUD Application with React, JSON Server, Bootstrap, and MongoDB

This repository contains a full-stack CRUD (Create, Read, Update, Delete) application built with **React**, **JSON Server**, **MongoDB Compass**, and **Bootstrap**. It demonstrates how to perform CRUD operations with advanced features such as search, sort, and PDF export.

---

## **Features**

1. **CRUD Operations**
   - Create, Read, Update, and Delete records seamlessly.

2. **Search and Sort Functionality**
   - Quickly locate records with the integrated search bar.
   - Sort data dynamically to organize your view.

3. **PDF Download**
   - Export data into a PDF file for offline access and sharing.

4. **Responsive Design**
   - Built with Bootstrap to ensure a user-friendly experience across all devices.

5. **MongoDB Integration**
   - Persistent data storage managed with MongoDB and visualized using MongoDB Compass.

---

## **Technologies Used**

- **React**: Frontend library for building the user interface.
- **JSON Server**: Mock backend for testing CRUD functionality locally.
- **Bootstrap**: CSS framework for responsive and aesthetic design.
- **MongoDB Compass**: Tool for managing and visualizing the database.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Husainiya/CRUD-Application-with-MERN-Stack
   cd CRUD-Application-with-MERN-Stack


2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the JSON server:
   ```bash
   npx json-server --watch db.json --port 5000
   ```

4. Start MongoDB:
   - Open MongoDB Compass and ensure your local MongoDB server is running.

5. Start the React application:
   ```bash
   npm start
   ```

---

## **Usage**

1. Access the application at `http://localhost:3000`.
2. Use the navigation to perform CRUD operations.
3. Search or sort data using the provided features.
4. Download data as a PDF by clicking the "Download PDF" button.

---

## **Project Structure**

```
├── src
│   ├── components
│   │   ├── AddRecord.js
│   │   ├── EditRecord.js
│   │   ├── ListRecords.js
│   │   └── SearchSort.js
│   ├── App.js
│   └── index.js
├── db.json (Mock Data)
├── public
├── package.json
└── README.md
```
