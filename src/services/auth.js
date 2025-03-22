import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   return user;
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   return errorMessage;
    // });


  
}



export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   console.log(user);
    //   return user;
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   return errorMessage;
    // });

}
export function signOut() {
    return auth.signOut();
    }
    