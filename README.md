#five-day-weather

This is an app to give you the five day weather forecast for a location.

To build it you will need 'create-react-app'. If you don't have it installed already, you can install it with npm: 
```
npm install -g create-react-app
```

After you have cloned the repository install the dependencies with:
```
npm install
```

Then to build it do: 
```
npm run build
```

To run in dev mode with live reload do: 
```
npm start
```

And to run the tests do: 
```
npm test
```

## The application is hosted at
http://five-day-weather-dev.eu-west-1.elasticbeanstalk.com/

## Enhancements

The application could do with caching the responses from the service either in local storage or ideally on the server. Currently the implementation is purely in the browser and callouts are done with jsonp. If server logic were used the server could get new weather data in the background and serve up data that other users have fetched, which would speed up response times and keep the guys at OpenWeatherMap happy. The ui would benefit from a proper searchable input instead of just a few choices for location. Also maybe a map which could be clicked/touched to receive the weather forceast for the selected coordinates. I suppose it would be beneficial to see the temperature also :). 

I spent more like 24 hours on this. I'm new to react and I found that just reading through and understanding the documentation took me 3-4 hours, so I decided to learn the library and build tools properly instead of skimming it and having a vague idea and a fussy feeling. Thouroughly enjoyed react. I got the greatest kick out of the templating setup and the Jest testing library which makes it super fast to implement basic regression testing on the ui. Talk about innovation! I felt React falls a little short though on the state side of things, but it's dressed up in the lifting up state/closest common ancestor ideology, which I suppose is fine. It makes the development process a little fiddly, at least to start with, but I suspect this is overcome as one begins to anticipate more.

Thanks for the excercise.
