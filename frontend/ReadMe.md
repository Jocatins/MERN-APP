# Process involved in the development

-   Create a Slices
    A slice is a component where states and reducers are kept

1.  AuthSlice - It will take the user data from API and put it in a local storage, and put it in our Auth State

2.  UserAPI slice - Makes the request to the backend, to authenticate, where we register, update our profile
    (endpoints to work with the backend)

After creating the slices, they will be imported to the store.js to be used.

3. APISlice -- this will implement the thunk middleware

-   Then you create the Store, import the necessary reducers and Slices

-   Now we go to the LoginScreen to implement the functions
