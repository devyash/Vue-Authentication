/* eslint no-undef: "off" */

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

const auth0 = new Auth0({
  domain: 'devyash.auth0.com',
  clientID: '2pVtIzy2G7aAl7naSHBcmIsBMJqlKzhC',
  responseType: 'token',
  callbackURL: window.location.origin + '/'
})

// set auth header on start up if token is present
if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
}

// login
let login = (username, password) => {
  auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
    scope: 'openid email'
  },
  function (err) {
    if (err) alert('something went wrong: ' + err.message)
  })
}


// logout
let logout = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}



// checkAuth
let checkAuth = () => {
  if (localStorage.getItem('id_token')) {
    return true
  } else {
    return false
  }
}

// requireAuth
let requireAuth = (to, from, next) => {
  if (!checkAuth()) {
    console.log('auth failed ...')
    let path = '/login'
    let result = auth0.parseHash(window.location.hash)
    if (result && result.idToken) {
      
      // set token in local storage
      localStorage.setItem('id_token', result.idToken)
      // redirect to home page
      path = '/'

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
      
      // get user profile data
      auth0.getProfile(result.idToken, function (err, profile) {
        if (err) {
          // handle error
          alert(err)
        }
        let user = JSON.stringify(profile)
        localStorage.setItem('profile', user)
      })
    }
    next({
      path: path
    })
  } else {
    next()
  }
}


axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    console.log('unauthorized, logging out ...')
    auth.logout()
    router.replace('/login')
  }
  return Promise.reject(error)
})


export default {
  checkAuth,
  login,
  logout,
  requireAuth
}