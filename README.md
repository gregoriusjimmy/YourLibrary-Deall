# ⚠️ IMPORTANT ⚠️

The API is blocked due to CORS

![CORS error](readme/readmepic1.png? "CORS error")

So I'm using this extension in Google Chrome

https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

## How to use the extension

Run the server with `npm install` & `npm start`

In the http://localhost:3000/ activate extension by clicking the logo
![extension](readme/readmepic2.png? "Cors extension")

# Feedback to B3k3n backend team

The API https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books is great, actually if the pagination feature is implemented just like in this repo.

The only thing that needs to be added is the total number of books (book length). It is needed to know what pages are the latest pages. The way this repo knows when the latest pagination is still hacky. If we got the error when fetching, I'm concluded that the data was unavailable.

We need the total books to able create pagination like these (cmiiw)
![doc](readme/readmepic3.png? "doc")
![doc](readme/readmepic4.png? "doc")

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
