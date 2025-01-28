# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

## Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

## Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

## Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

## Deployment 

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## deployed link

https://ajackus-users-application.vercel.app/

## Features
Fetch and display user data from JSONPlaceholder API.
Add new users to the list.
Edit existing user details.
Delete users with confirmation.
Responsive design for seamless use across devices.
Basic error handling for API requests.
Pagination for better data navigation (if implemented).

### Directory Structure
src/
├── components/        # Reusable React components
│   ├── UserList.js    # Displays the list of users with options to edit or delete
│   ├── UserForm.js    # Form to add or edit a user
│   
├── services/
│   └── api.js         # API utility to interact with JSONPlaceholder
├── App.js             # Main application component
├── index.js           # Application entry point
└── reportWebVitals.js # Web performance tracking


#### Challenges Faced
1. Error Handling:

Addressing API failures due to network issues or incorrect endpoints.
Implemented try-catch blocks and displayed error messages to the user.

2. State Management:
Managed application state using React's useState and useEffect hooks.

3. Pagination:
Implementing pagination for large datasets was challenging but improves usability.

4. Responsive UI:
Designed components to adapt across screen sizes using CSS.

##### Potential Improvements

State Management: Integrate Redux or Context API for better scalability.
Form Validation: Use a library like Formik or React Hook Form for comprehensive validation.
Testing: Add unit and integration tests with tools like Jest or React Testing Library.
Search and Filter: Implement additional features for searching and filtering users.
Backend Integration: Replace JSONPlaceholder with a custom backend API for real-world use.