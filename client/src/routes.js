import Base from './components/Base.js';
import HomePage from './components/HomePage.js';
import DashboardPage from './containers/DashboardPage.js';
import LoginPage from './containers/LoginPage.js';
import SignUpPage from './containers/SignUpPage.js';
import Auth from './modules/Auth';
import ProviderAuthenticated from './components/provider-authenticated.js';

const routes = {
 
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

      
        replace('/');
      },
    },

    {
        path: '/success/auth?token=:token&id=:id',
        component: ProviderAuthenticated
    }

  ]
};

export default routes;