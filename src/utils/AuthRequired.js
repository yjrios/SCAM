// import firebase from 'firebase'
export default (to, from, next) => {
  if (localStorage.getItem('user') != null && localStorage.getItem('user').length > 0) {
    // verify with firebase or jwt
    // const user = firebase.auth().currentUser
    next()
  } else {
    localStorage.removeItem('user')
    next('/user/login')
  }
}
