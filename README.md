# Edmonton

Welcome to the Edmonton project repository!

## Requirements

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and npm
    - To check that nodejs is installed run 
        ```bash 
        node --version
        ```
    - to check that npm is installed run
        ```bash 
        npm --version
        ```
- [XAMPP](https://www.apachefriends.org/) with MySQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eugenesang/edmonton.git
   ```
2. Navigation to project

    ```bash
    cd edmonton
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Create and configure the database:

    Open MySQL Workbench or your preferred MySQL client (XAMPP for our case).
    Create a new database (if not already created).
    Update the ``.env`` file with the appropriate database credentials.
5. Check that everything is configured, including:
    - Database 
    - Modules (Project directory should include: node_modules folder and package-lock.json file)
    - .env file exists and its contents are correct
    - port 2354 is not hosting another event

## Usage
To run the application, use the following command:

```bash
npm start
```
By default, the application will be accessible at http://localhost:2354

## License
This project is licensed under the MIT License.