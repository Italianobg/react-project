# Fuel Tracking application

This project was created with React.
For back end is used Firebase /Firestore, Storage, Authentication - in progress, Hosting - app would be launched/ and also Google Places API and AutoScout24 API.

So far the application has the following features:
1. Authentication - still in progress.
2. Home page displays the commont staticsitcs of app usage i.e. Number of Fuel Ups, KMs recorder and etc. 
3. Add car. The image is uploaded to Firebase Storage. All models and makes are extracted from AutoScout24 API where the user are given options to select from.
4. Edit car. User can change the image and the existing image would be deleted from the storage. Also he can change the car manufacturer and mode.
5. Delete car. 
6. Car Details. The user is able to observe car statistics for the car consumption as well as expenses.
7. Add Fuel Ups. The user could record his fuel up. The gas station field has has autosuggestion based on the current location of the user. For this component is used react navigation and also Google Places API.
To be continued... 
