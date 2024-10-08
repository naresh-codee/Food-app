import { useRef , useState} from "react";
import validateFormData from "./validateformdata";

import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
// import {updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";


const SignIn = () =>{

    const email = useRef(null);
    const password = useRef(null);
    const name=useRef(null);

    const [isSignType,setIsSigninType] = useState(true);
    const [validationStatus,setValidationStatus] = useState(null);

    const navigate = useNavigate();

    const formSubmit=() =>{
        // console.log(email.current.value);
        // console.log(password.current.value);

        // if the result valiable gets "null" then the email and password is good , if the result contains some "string value" then email or password is wrong
        
        const result = validateFormData(email.current.value,password.current.value);
        setValidationStatus(result);

        //console.log(result);

        if(result) return   


        if(result === null){

          createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          // Sign up  logic
          const user = userCredential.user;
          console.log(user);

          // updating the user profile with displayName and photourl
          // updateProfile(user, {
          //   displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          // }).then(() => {
          //   // Profile updated!

          //  //  const {uid,email,displayName,photoURL}=user;  we should not use "user" because user here won't have displayName and photoURL details , so we need to use "auth.currentUser" becuase it contains the displayName and photURL details

          //  const {uid,email,displayName,photoURL}=auth.currentUser;

          //   dispatch(addUser({
          //     uid:uid,
          //     email:email,
          //     displayName:displayName,
          //     photoURL:photoURL,
          //   })

          // );

          // navigate("/");

          // }).catch((error) => {
          //   setValidationStatus(error.message);

          //   navigate("/error");
          // });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setValidationStatus(errorCode+"-"+errorMessage);
          
        });

        }
        else{
          signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
              // Sign in logic
              const user = userCredential.user;
              // console.log(user);
             
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setValidationStatus(errorCode+"-"+errorMessage);
            });
        }
        

       

    }

    const toggleUser=() =>{
        setIsSigninType(!isSignType);
    }


    return(

            <div className="bg-orange-500 h-screen">
            
              <form  onSubmit={(e) => e.preventDefault()}   className="absolute my-[10%] w-3/12 mx-auto left-0 right-0 py-6 bg-black flex flex-col bg-opacity-75 text-white">
                <h1 className="py-1 px-2 mx-3 my-1 text-2xl">{isSignType?"Sign In" : "Sign Up"}</h1>
                { !isSignType && (<input  ref={name} className="py-1.5 px-2 mx-4 my-3 text-black" type="text" placeholder="Name"/>) }
                <input ref={email}  className="py-1.5 px-2 mx-4 my-3 text-black" type="email" placeholder="Email"/>
                <input ref={password}  className="py-1.5 px-2 mx-4 my-3 text-black" type="password" placeholder="Password"/>
                <button  onClick={() => formSubmit()} className="py-1.5 px-2 mx-4 my-3 bg-green-800 rounded-lg">Submit</button>
                <p className="py-1.5 px-2 mx-4 my-3 text-white cursor-pointer" onClick={()=>toggleUser()}>{isSignType? "If you are a new user- Sign up !": "If already registered user ? - sign In"}</p>
               { validationStatus && (<p className="py-1.5 px-2 mx-4 my-3 text-white bg-red-700 cursor-pointer text-xl text-center" >{validationStatus}</p>) }
              </form>
            </div>
       
    );
}

export default SignIn;