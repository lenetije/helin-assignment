# Technical assessment Selene Porchi

## Running the application

Run in the root folder of the repository:

- npm install
- npm run dev
  The application will open at the indicated localhost port.

## Running unit tests

Run in the root folder of the application:

- npm run test:unit

## App characteristics

### Tech stack

I used the create-vue scaffolding tool (https://github.com/vuejs/create-vue).
Technologies used include:

- Vue
- Vite
- Vitest
- Pinia
- SCSS
  I decided to stick with a relatively simple UI, so to avoid unneccessary complexity I did not use any components library nor vue-router.

### Applying the business rules

The assignment did not specify if the desired final data format was a list of parcels, each with the department(s) responsible for handling it, or a list of departments, each with the parcels it needs to handle. I chose the first option because it seemed more compatible with a real life scenario where each parcel is handled in succession (but I have no real life experience of a shipping facility, so there's some guesswork at play here).
The core of the logic is in src/utils/AssignDepartmentsToParcel.js

### Technical implementation

I am a Frontend Developer, so the logic that handles the parcels all lives in the Vue app. In a large scale, real life application, this might be better suited to happen on the server.
In order to easily show how to add and remove departments, I provided a simple UI for both actions. The app uses the browser localStorage to persist the data inserted by the user, in place of making API calls. To easily reload the hard-coded default departments, a 'Clean local storage' button is provided.

### TODO list

Here's a few additional features that would bring this project from a proof of concept closer to a real-life working application:

- when adding a new business rule, checking possible incompatibility with existing business rules and consequently warning the user
- adding the possibility to filter the table in the department columns
- extensive error handling
- accessibility (ARIA labels, etc)
- breakpoints for different screen sizes / mobile version

I am happy to discuss more about these and other possible improvements during the tech interview!
