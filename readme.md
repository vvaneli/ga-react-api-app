# Feels Like... Another Weather Widget
This proof-of-concept weather widget uses art to convey what the forecast will *feel like* for a particular day that’s meaningful to you.

Watch demo video on Vimeo (2 mins 18 secs): https://vimeo.com/970975090

![Demo video screenshots](https://res.cloudinary.com/vli/image/upload/v1719610775/feels_like/FeelsLike_video.gif)

<hr/>

## About
The weather can have a significant effect on our mood and wellbeing. Weather forecast widgets usually show objective scientific data, but not our human connection to the natural elements. 

Let’s say you have an outdoor event coming up in the next 30 days and you want to keep an eye on the weather for it. For example, a wedding, a picnic or a festival. Save the date and location into our app and we’ll show you a picture from the Victoria and Albert Museum’s (V&A) collection that matches the best available forecast for that day.

The picture page will stay as the ‘home page’ in the run up to your event, but the art may change according to the changing predictions. If the air pollution is currently high at the location you are watching, the artwork’s visibility will be impaired (it appears darker the higher the pollution level). Flip the picture over and you’ll find more details on the forecast; these look like the provenance labels you may find at the back of a framed picture.

## Deployment link
Use it: https://feels-like-another-weather-widget.netlify.app

Instructions: https://vli.me/demo/feels-like-weather.html

## Code Installation
Deploy React app, e.g. using Netlify: https://www.netlify.com/with/react/

Requires an API key to the OpenWeather APIs, 'Developer' package: https://openweathermap.org/price
<hr/>

# Project background

## Brief
Create an application using React and a third-party API. Work in pairs over 2 days, using pair programming.

## Timeframe & Working Team
The core application was built by a team of 2 people over 2 days, as a part of the full-stack software engineering bootcamp at General Assembly.
Afterwards, I added improvements to the application, working solo. 

## Technologies Used
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

## Planning
1. Researched lots of different APIs
2. Concept, visual research and design
3. Defined user stories
4. Wireframes and user flow
5. Define data flow
6. Pseudocode
7. Code and test
8. Deploy

### Wireframes
  ![Wireframes](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_wireframes1_m6bl5d.png)
  
  ![Wireframes](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_wireframes2_d75tg7.png)

### Flowcharts

### API
![API flow chart](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_apis_mwt4be.png)

### Data
![data flow chart](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_data_og6wij.png)

### Kanban for project management
![kanban](https://res.cloudinary.com/vli/image/upload/v1715706300/feels_like/feelslike_kanban_q3wkr5.png)

## Challenges
This was our first project working with React. It’s also the first time we have had to integrate an API into an application.

## Wins
Successes include:
* Getting to grips with React state
* Working with multiple APIs
* Correctly targeting lots of  API endpoints
* Using local storage to handle data

## Key Learnings/Takeaways
We learned how to build, troubleshoot and deploy an application written in React. We also learned how to call APIs inside our app, target API endpoints and work with the different data types returned.

## Bugs
Known bugs had all been fixed so far.

## Future Improvements
Potential improvements include:
* Ability to add more than 1 event to the widget.
* Ability to add event time, in order to retrieve day/night images.
* During the project, we found that artworks can be better at conveying the nuances of weather conditions than the weather icons typically used in a weather widget. Future improvements can use the weather id (instead of the weather icon) returned by the API to assign an artwork. Improvements can also be made to curation of the art collection to represent those weather conditions.
* The art collection includes a probability for retrieving a ‘sunny side up’ (photo of a fried egg breakfast) if the weather prediction is sunny. We haven’t fully implemented it yet.
