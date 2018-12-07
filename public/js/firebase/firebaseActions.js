import {db,authentication} from './credentials.js'

function createAccount(email, password, callback){
  authentication.createUserWithEmailAndPassword(email,password).then((res)=>{
    let profileName = email.substring(0,email.indexOf('@'));
    console.log(res.user.uid);
    db.ref('diaplayName/' + res.user.uid).set({
      profile: profileName,
      email: email,
      userId: res.user.uid
    })
    callback(true,profileName);
  }).catch((err)=>{
    console.log(err.message);
    callback(false,err.message);
  })
}
function signIn(email, password){
  authentication.signInWithEmailAndPassword(email, password).then((res)=>{
    console.log(res.user.uid);
  }).catch((error)=>{
    console.log(error.message);
  })
}
function changePassword(user){
  console.log(user);
  authentication.sendPasswordResetEmail(user.email).then( () => {
    // email sent
  }).catch( (error) => {
    alert("Sorry, an error happened, cannot send reset password email");
    console.log(error);
  })
}

export {createAccount,signIn,changePassword};