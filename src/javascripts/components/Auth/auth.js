import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../data/util';
import googleImage from './loginbutton-2.png';


const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};


const authStringBuilder = () => {
  let domString = '<button class="btn btn-danger">';
  domString += `<img id="google-auth" src=${googleImage}/>`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };
