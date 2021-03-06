import {providers} from "./credentials.js"
let uiConfig = {
    // Url to redirect to after a successful sign-in.
    signInSuccessUrl: "/",
    callbacks: {
      signInSuccess: function(user, credential, redirectUrl) {
        if (window.opener) {
          // The widget has been opened in a popup, so close the window
          // and return false to not redirect the opener.
          window.close();
          return false;
        } else {
          // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
          return true;
        }
      }
    },
    signInOptions: [
      providers.GoogleAuthProvider.PROVIDER_ID,
      providers.FacebookAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: "https://www.google.com"
  };
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
  // within the element corresponding to the selector specified.
  ui.start("#firebaseui-auth-container", uiConfig);