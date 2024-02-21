 Upon starting the application, user already has a static list of trips (1 trip). The list is scrollable.

When user selects a trip from the list, a forecast for each day of the trip is displayed. 

There is a possibility to search for a trip implemented 

The app  includs a button for adding a new trip. When the user clicks on "Add trip," a modal window appears. Inside the modal, the user  has the ability to:

a.	Choose a city from a predefined list.
b.	Enter the start date of the trip (the start date should be within the next 15 days).
c.	Enter the end date of the trip (the end date should be within the next 15 days).
Upon clicking "Done," the trip will be added to the list.

On the right side of the page:
a.	When user selects a trip, today's weather forecast for that city is displayed.
b.	There is a countdown timer from the current date to the start date of the trip.

Store the data (trips) after reloading page is implemented.

React + Redux Toolkit

http-requests to public API https://weather.visualcrossing.com/###VisualCrossingWebServices/rest/services/timeline are implemented with axios

all utility functions are collected in the utils.js file

 For the form in the modal window the "formik", "data-picker" libraries were used. Yup library was used for form validation.

Responsive layout was implemented.

user-message with 'react-toastify'-library.

icons were collected in sprite