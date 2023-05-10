## Assignment overview

```
Description: Backend APIs for managing vehicle bookings.
Backend: NodeJS, ExpressJS
Database: MySQL
```

## Routes

### 1. API Endpoints related to vehicles

```
Method: GET
Endpoint: /vehicles/categories/wheels
Description: this route categorises vehicles by their no of wheels.
```

```
Method: GET
Endpoint: /vehicles/categories?wheels=<no_of_wheels>
Example: /vehicles/categories?wheels=4
Description: this route categorises vehicles by class based on the no of wheels received from query params.
```

```
Method: GET
Endpoint: /vehicles/types?category=<vehicle_class>
Example: /vehicles/types?category=car
Description: this route fetches all vehicle types based on the class/category received from query params.
```

```
Method: GET
Endpoint: /vehicles/models?type=<vehicle_type>
Example: /vehicles/models?type=suv
Description: this route fetches all vehicle models with their companies based on the type received from query params.
```

### 2. API Endpoints related to vehicle bookings

```
Method: POST
Endpoint: /booking/details/user
Request Body: {
    "firstName": "<user_first_name>",
    "lastName": "<user_last_name>"
}
Example Request Body: {
    "firstName": "John",
    "lastName": "Doe"
}
Description: this route receives user's first name and last name who is willing to book a vehicle and attaches the details to a browser cookie.
```

```
Method: POST
Endpoint: /booking/details/time
Request Body: {
    "startDate": "<booking_start_date>",
    "endDate": "<booking_end_date>"
}
Example Request Body: {
    "startDate": "2023-05-11",
    "endDate": "2023-05-15"
}
Description: this route receives the start date and end date for vehicle booking and attaches them to the cookie created previously to store user details.
```

```
Method: POST
Endpoint: /booking
Request Body: {
    "userFirstName": "<user_first_name>",
    "userLastName": "<user_last_name>",
    "bookingStartDate": "<booking_start_date>",
    "bookingEndDate": "<booking_end_date",
    "vehicleId": <vehicle_id>
}
Example Request Body: {
    "userFirstName": "John",
    "userLastName": "Doe",
    "bookingStartDate": "2023-05-11",
    "bookingEndDate": "2023-05-15",
    "vehicleId": 1
}
Description: this route creates a new vehicle booking corresponding to the vehicle with the id 'vehicleId', if no booking already exists.
```

## Database schemas

### 1. Vehicle schema

`id (type: INT)`: This column denotes a unique id for a vehicle which is also the Primary Key for the table.

`model (type: VARCHAR)`: This column denotes the unique model of the vehicle. For eg. Creta, Brezza, Glamour, etc.

`company (type: VARCHAR)`: This column denotes the vehicle's company. For eg. Hyundai, Suzuki, etc.

`type (type: VARCHAR)`: This column denotes the vehicle's type. For eg. suv, sedan, cruiser, etc.

`class (type: VARCHAR)`: This column denotes the vehicle's class. For eg. bike, car, etc.

`wheels (type: INT)`: This column denotes the vehicle's no of wheels. For eg. 4, 2, etc.

`isBooked (type: BOOLEAN)`: This column denotes the vehicle's booking status.

### 2. Booking schema

`id (type: INT)`: This column denotes a unique id for a booking which is also the Primary Key for the table.

`userFirstName (type: VARCHAR)`: This column denotes the first name of the booking owner.

`userLastName (type: VARCHAR)`: This column denotes the last name of the booking owner.

`bookingStartDate (type: TIMESTAMP)`: This column denotes the start date of the booking.

`bookingEndDate (type: TIMESTAMP)`: This column denotes the end date of the booking.

`vehicleId (type: INT)`: This column is the foreign key of the table and it refers to the id of an existing vehicle for which the booking was created.

## Environment variables

### 1. Environment variables for database configuration

`DB_HOST` `DB_USER` `DB_PASSWORD` `DB_NAME`

### 2. Other environment variables
`PORT`

## Steps to run

1. Make sure that you have `node` and `nodemon` installed.
2. If you are using VS Code, make sure that you have the `ESLint` extension enabled to avoid the possible linting errors.
3. Clone the repository.
4. Move into the project directory using `cd <path_to_project_directory>`
5. Install the required packages using `npm install`
6. Create a `.env` file at the root of the directory and set the environment variables as described above.
7. Run the `db_seeds.sql` file to create the database and the related tables along with the initial seeds using the command `source <path_to_sql_file>;`
8. Make sure that the database is created successfully.
9. Now run the application using `npm run start`