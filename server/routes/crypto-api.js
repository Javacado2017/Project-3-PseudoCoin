// This is where the app will pull information from an API (key or no key) and render it to the client side
    //The app will pull data from the API (no keys), input it into the client folder components, 
    //and then webpack will recognize the changes on the client side and bundle it to render on a page
// It's on the server side in the event the app uses a special kep code, cryptocompare doesn't doesn't use one, but CoinAPI.io does
// Keep in mind taht if you use a .env file to protect your codes you cannot acess those enviormental vaiables in client side coding. 
// You need to do a work around.