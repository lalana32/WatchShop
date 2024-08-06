# Watch Shop

Watch Shop is a watch store that allows users to browse, filter, sort, and purchase watches. Administrators can add and delete products from the inventory.

## Technologies

- **Backend:** .NET
- **Frontend:** React, Redux, Material-UI
- - **Database:** SQLite
  - **.NET:** Used for creating a robust and scalable backend API to manage data and business logic.
  - **React:** Utilized for building a dynamic and responsive user interface.
  - **Redux:** Employed for state management, ensuring a predictable state container for the application.
  - **Material-UI:** Provides a set of customizable React components for a sleek and modern design.
  - **SQLite:** Used for lightweight and easy-to-configure database management.

## Installation

### Backend

1. Navigate to the `API` directoy.
2. Run the backend with the following command:
   `dotnet watch run`

### Frontend

1. Navigate to the `front` directory.
2. Install the necessary dependencies with the following command:
   `npm i`
3. Start the frontend with the following command:
    `npm start`

## Usage

### Seeded Accounts

#### Admin Account:

Username: admin
Password: Pa$$w0rd
Roles: admin, member

#### Member Account:

Username: stefan
Password: Pa$$w0rd
Role: member

### Features

Signup: New users can create an account, and the role member is assigned by default upon sign up.
Watch Purchase: Users can browse, filter, and sort watches in the catalog based on various parameters.
My Orders: Users can view their orders.
Inventory Management: Administrators can add and delete products from the inventory.



