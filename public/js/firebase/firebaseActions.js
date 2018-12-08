import { db, authentication } from "./credentials.js";

function createAccount(email, password, callback) {
  authentication
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      let profileName = email.substring(0, email.indexOf("@"));
      console.log(profileName);
      let defaultPic = "";
      console.log(res.user.uid);
      db.ref("profile/" + res.user.uid).set({
        displayName: profileName,
        email: email,
        userId: res.user.uid,
        photoURL: defaultPic
      });
      callback(true, profileName);
    })
    .catch(err => {
      console.log(err.message);
      callback(false, err.message);
    });
}
function signIn(email, password, callback) {
  authentication
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      db.ref("profile/" + res.user.uid)
        .once("value")
        .then(snapshot => {
          var userinfo = snapshot.val();
          callback(userinfo);
          console.log("before");
          console.log(authentication);
          console.log(authentication.currentUser);
        });
    })
    .catch(error => {
      console.log(error.message);
    });
}

function getUserInfo(user, setUserInfo) {
  var userinfo;
  console.log(user);
  db.ref('profile/' + user.uid).once('value').then((snapshot) => {
    userinfo = snapshot.val();
    setUserInfo(user, userinfo.displayName,userinfo.email,userinfo.photoURL);
    return userinfo;
  }).catch((err) => {
    console.log(err.message);
  })
}

function changePassword(user, oriPw, newPw){
  authentication.signInWithEmailAndPassword(user.email, oriPw).then((res)=>{
    res.user.updatePassword(newPw).then(function() {
      alert("Change password successfully!");
    }).catch(function(error) {
      alert("Change password failed!");
      console.log("cannot update")
      console.log(error.mesage);
    });
  }).catch((error)=>{
    alert("Please ente valid password to change your password.");
    console.log("cannot login");
    console.log(error.message);
  })
function addMemeToAccount(uid, meme) {
  console.log(meme);
  let topText = meme.topText;
  let bottomText = meme.bottomText;
  let imageURL = meme.backgroundImage;
  let memeUri = meme.memeUri;
  db.ref("profile/" + uid + "/memes").push({
    topText: topText,
    bottomText : bottomText,
    backgroundImageURL: imageURL,
    memeUri: memeUri
  }).then((res) => {
      console.log(res);
    })
    .catch(error => {
      console.log(error.message);
    });
}

export { createAccount, signIn, changePassword, getUserInfo, addMemeToAccount};
