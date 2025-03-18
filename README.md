# Experiment ExcelJS

This is an experiment using the ExcelJS library with Node.js and Express.js to import an XLSX file and insert it into a MongoDB database.

## Getting Started

1. Clone this repository and select the experiment/exceljs branch:

   ```sh
   git checkout experiment/exceljs
   ```

2. Install the necessary dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```sh
    PORT=your_running_server_port_number
    MONGO_DB=your_mongodb_connection_string
    ```

4. Run the application:
    ```sh
    npm start
    ```

5. Upload an XLSX file using the provided endpoint:
    ```sh
    POST /read-excel
    ```

6. Check the MongoDB database to ensure the data has been inserted correctly.

## Prerequisites

- Node.js
- MongoDB
- npm
- ExcelJS Library

## Project Structure

- `index.js` - Main application file
- `models/` - MongoDB models
- `data/` - Directory for saved Excel example files

## References

- [ExcelJS Library](https://www.npmjs.com/package/exceljs)
