# Deployment link
https://feels-like-another-weather-widget.netlify.app

# Code Installation
Deploy React app using Netlify: https://www.netlify.com/with/react/

# Timeframe & Working Team
The core application was built by a team of 2 people over 2 days.
Subsequent improvements added thereafter.

# Technologies Used
* React
* React date picker
* SCSS
* OpenWeather APIs:
  * Climatic Forecast 30 days
  * Daily Forecast 16 days
  * Current Weather Data
  * Air Pollution
  * Geocoding
* V&A (Victorial and Albert Museum) API
* Web browser localStorage

# Brief
Create an application using React and a third-party API. Work in pairs over 2 days, using pair programming.

# Planning
1. Researched lots of different APIs
2. Concept, visual research and design
3. Defined user stories
4. Wireframes and user flow
5. Define data flow
6. Pseudocode
7. Code and test
8. Deploy

## Wireframes
  ![Wireframes](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_wireframes1_m6bl5d.png)
  
  ![Wireframes](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_wireframes2_d75tg7.png)

## Flowcharts

### API
![API flow chart](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_apis_mwt4be.png)

### Data
![data flow chart](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_data_og6wij.png)

## Kanban for project management
![kanban](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_kanban_q3wkr5.png)

# Challenges
This was our first project working with React. It’s also the first time we have had to integrate an API into an application.

# Wins
Successes include:
* Getting to grips with React state
* Working with multiple APIs
* Correctly targeting lots of  API endpoints
* Using local storage to handle data

# Key Learnings/Takeaways
We learned how to build, troubleshoot and deploy an application written in React. We also learned how to call APIs inside our app, target API endpoints and work with the different data types returned.

# Bugs
Need to more thoroughly test redirects/ux when an event date is in the past.

# Future Improvements
Potential improvements include:
* Ability to add more than 1 event to the widget.
* Ability to add event time, in order to retrieve day/night images.
* During the project, we found that artworks can be better at conveying the nuances of weather conditions than the weather icons typically used in a weather widget. Future improvements can use the weather id (instead of the weather icon) returned by the API to assign an artwork. Improvements can also be made to curation of the art collection to represent those weather conditions.
* The art collection includes a probability for retrieving a ‘sunny side up’ (photo of a fried egg breakfast) if the weather prediction is sunny. We haven’t fully implemented it yet.
