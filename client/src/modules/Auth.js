class Auth {

    static authenticateUser(token, user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
    }
  
    
    static isUserAuthenticated() {
      return localStorage.getItem('token') !== null;
    }
  
   
    static deauthenticateUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
     
      const axios = require('axios');
      axios.get('/auth/logout')
          .then((response) => {
            console.log(response.data);
      });
    }
  
  
    static getToken() {
      return localStorage.getItem('token');
    }
  
    static getUser() {
      return localStorage.getItem('user');
    }
  
  }
  
  export default Auth;