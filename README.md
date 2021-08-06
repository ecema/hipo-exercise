Unsplah Website Developed on React.js

This is basic photo browser for user search by Query and Category.
Query is a free text input field for certain keyword and Category is dropdown option which is supplied by API that randomly selected from first 20 pages and 10 items each. In the case of error happens in getting categories they will set hardcoded.

After filling inputs and click search button user directed to results page for successful search with first page of response and 10 items. Pagination buttons below the photo cards enable user for request further pages & go back. Clicking a photo card opens modal with details about photo which are user name, user instagram username, user location and profile photo. In the case of location info is supplied for a photo google map API is called with specifed latitude and longitude values.

In case of error happends while API request or not found any photo related to search criteria user see error page.
PS: Error page photo reference: https://unsplash.com/photos/aoM_7W7qONU

Desing of the project is taken from Figma. 
PS: I am working on 13 inch screen which makes compulsory to change some css work for avoid overflow. And the project is developed by consideration of responsive design.

Since it is a basic project with 3 pages and 1 search component Redux usage is not prefered.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

