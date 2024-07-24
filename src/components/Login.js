import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const toggleSignInForm = () =>{
      setIsSignInForm(!isSignInForm);
  };
  const handleButtonClick = () =>{
    // validate form data

    console.log(email.current.value)
    console.log(password.current.value)
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message)

    if(message) return;
    if(!isSignInForm){
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name.current.value
      }).then(() => {
        const {uid, email, displayName} = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        )
        navigate("/browse");

      }).catch((error) => {
        setErrorMessage(error.message);
      });      
      console.log(user);
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+ "-"+ errorMessage)
      });
    }
    else{
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-"+ errorMessage)
      });
    }
  }
  return (
    <div className=''>
        <Header/>
        <div className='absolute'>
        <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg"
        alt = "bg"/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()}className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 className='font-bold text-3xl p-4'>{isSignInForm ? "Sign In": "Sign Up"}</h1>
        {!isSignInForm &&
          <input type="text" placeholder='Full Name' ref = {name} className='p-4 my-4 w-full bg-gray-800'/>
          }
          <input type="text" placeholder='Email Address' ref = {email} className='p-4 my-4 w-full bg-gray-800'/>
          <input type="password" placeholder='Password' ref = {password} className='p-4 my-4 w-full bg-gray-800'/>
          <p className='text-red-800 font-bold text-lg'>{errorMessage}</p>
          <button onClick={handleButtonClick} className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In": "Sign Up"}</button>
          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now": "Already registered? Sign In Now."}</p>
        </form>
    </div>
  )
}

export default Login;