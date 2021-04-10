# Fuel Tracking application

# Deployed at: - https://react-project1-8f65f.web.app/

Firebase has been used as backend: Firestore - database, Storage - file storage service, Authentication- provides the possibility for public part and private part.
Two additional APIs are user: Google Places API - suggests the name of the Gas Station, AutoScout24 API - extracts all car manufacturers and models available used in the 'Add/Edit Car/ component.

# So far the application has the following features:
1. Authentication - Provides public and private part. 
      Non logged in users have access only to home page.
      Registered and logged in users have access to "Add/Edit/Delete Car", "Add Fuel Up" and statistics regarding tracked fuel ups.
3. Home page displays the commont staticsitcs of app usage i.e. Number of Fuel Ups, KMs recorder and etc. 
4. Add car. Requires an image which is uploaded to Firebase Storage. All models and makes are extracted from AutoScout24 API where the user are given options to select from.
5. Edit car. User can change the image and the existing image would be deleted from the storage. Also he can change the vehicle type, manufacturer and model.
6. Delete car. Deletes the image from the storage as well as all records from Firestore database.
7. Car Details. The user is able to observe car statistics for the car consumption as well as expenses.
8. Add Fuel Ups. The user could record his fuel up. The gas station field has has autosuggestion based on the current location of the user. For this component is used react navigation and also Google Places API.
9. Fuel Ups & Edit Fuel Ups. In progress...

# Examples of used React technologies, frameworks and development techniques.
 * dynamical pages - Home, Add Car, Edit Car, Car Statistic Details, Car Fuel Ups
 * Communicate to remote service - Google Places & AutoScout24
 * Firebase Authentication
 * Used React-Router-Dom
 * Class Component - Features
 * Function Component - The app was build mainly on function components i.e. Statistics, Cars, Add/Edit Car etc.
 * Stateless Component - Cars, Navigation etc,
 * Stateful Components - CarDetails, CarType etc.
 * Forms - 
      - Controlled Components - CarFuelUp
      - Uncontrolled Component - Login
 * Syntetic Events - onClick, onChange, onSubmit, onFocus, onBlur etc.
 * React Hooks - as most components are function components useEffect hook is used to lets us express different kinds of side effects after a component mount/update.
 * Context API - used to store user information and erros.
 * Error handling - All error messages returned from the backend are catched and displayed to the user.
 * Data validation - Data entered in the input fields in forms is being validated based on specific creterias.
 * Unit Test - two unit tests - CarModel.test.js and CarCard.test.js - Mainly checks if the component renders correctly and if the supplier props are displayed.
 * Firebase Storage - used to store files
 * Google Places API - used for autosuggestion of Gas Stations.

In case you see any issues and possibilities for improvement feel free to contact me!
