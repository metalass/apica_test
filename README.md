# How to run the application

You should clone this repo. After that go to the root directory and run in console (you need npm to be installed):

* npm i

That will install all needed modules.
After that start the local server:

* npm start

Now the application is available in a browser in address `localhost:8080` (the port can be not 8080 if it is busy - more information in console).


# Notes about the application

The modal component is the following: https://github.com/qimingweng/react-modal-dialog but rewritten a little bit. Also, here is another UI component used in the application: https://www.npmjs.com/package/react-tooltip

At current application "Create Single Metric" form loses fields values after close. It's better to save it. It can be done by storing values on Redux or smth like this.

Styles can look a little bit messy. Because of they were not in focus in this assignment I organized them in fast way with big parts for every component. There are some global styles (normalize in general) that is not gathered in outer styles. I guess it's a little bit a mistake. And honestly I'm not sure how styles should be properly divided between components.

There is an api_adapter middleware. I wrote the application in fast way (so it took just 9 hours) and application is strongly coupled with structure of an API response. I should place some more value on this from the beginning. So the api_adapter is a middleware invoked after getting a response from API. It can reorganize original structure into the structure that the aplication uses. Now it's empty.
