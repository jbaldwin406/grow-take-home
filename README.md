# Grow Take Home Assessment

For this take home assignment I built a React App that allows a user to input a date and the number of results they wish to see, and it returns results including the article title as stored by Wikipedia, the rank and views pertaining to that day. If the user would like to see more detail they can click the 'Learn More' button and see the top three days of the month (pertaining to the month the As Of Date is in) as well as a short description of the article as stored by Wikipedia.

In my wikiService.js file, I have three endpoints:
    
    getMostViewedArticles 
        - takes in three parameters in string format: year, month, day
        - returns a json object with 1000 records 
        - example request url: https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia.org/all-access/2015/10/10
        - example result:{
  "items": [
    {
      "project": "en.wikipedia",
      "access": "all-access",
      "year": "2015",
      "month": "10",
      "day": "10",
      "articles": [
        {
          "article": "Main_Page",
          "views": 18793503,
          "rank": 1
        },
        {
          "article": "Special:Search",
          "views": 2629537,
          "rank": 2
        },
        {
          "article": "Carlos_Hathcock",
          "views": 291358,
          "rank": 3
        }...]

    getArticleMetadata
        - takes in one parameter in string format: title
        - returns a json object with details pertaining to the article(title) that is being sent
        - example request url: https://en.wikipedia.org/api/rest_v1/page/summary/Justin_Trudeau
        - example result: {
  "type": "standard",
  "title": "Justin Trudeau",
  "displaytitle": "Justin Trudeau",
  "namespace": {
    "id": 0,
    "text": ""
  },
  "wikibase_item": "Q3099714",
  "titles": {
    "canonical": "Justin_Trudeau",
    "normalized": "Justin Trudeau",
    "display": "Justin Trudeau"
  },
  "pageid": 451733,
  "thumbnail": {
    "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Trudeau_visit_White_House_for_USMCA_%28cropped%29.jpg/227px-Trudeau_visit_White_House_for_USMCA_%28cropped%29.jpg",
    "width": 227,
    "height": 320
  },
  "originalimage": {
    "source": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Trudeau_visit_White_House_for_USMCA_%28cropped%29.jpg",
    "width": 518,
    "height": 730
  },
  ...]

    getPageHistory
        - takes in three parameters in string format: title, startDate, endDate
        - returns a json object with the view count of the article on each day in the range startDate-endDate
        - for the startDate and endDate parameters, I have made them equal to the start and end of the month that the search date is within.
        - example request URL: https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/Main_Page/daily/20220101/20220130
        - example result: {
            "items": [
                    {
                    "project": "en.wikipedia",
                    "article": "Main_Page",
                    "granularity": "daily",
                    "timestamp": "2022010100",
                    "access": "all-access",
                    "agent": "all-agents",
                    "views": 12799589
                    }...]

# Performance Considerations/Future Enhancements

If this project were to go to production, I would want to pre-filter the results coming back from getMostViewedArticles. In this example it isn't too much of a concern as the wikipedia api limits the return to 1000 results, but if there was no limit, I would either want to impose a limit or filter the results on the back-end before passing the result to the frontend. 

Also I would want to include functionality to allow the user to search by country. I have the endpoint commented out currently, but I would give the user the option to search by a single country or search by overall views (as it is now).

Another consideration would be more gracefully handling errors coming from the endpoints. I found while working with the wikipedia api's, not all pages have every data point and in the case of 'Search:Special', it doesn't have an entry in the getArticleMetadata endpoint. To get around this I made the app check if there was data returned and if not, insert some dummy data to render.

And lastly I would create mock endpoint data and overall test coverage.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
