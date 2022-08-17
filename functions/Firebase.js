import { authentication, db } from '../Firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getDoc, doc, updateDoc, getDocs, collection} from 'firebase/firestore';


    //sign out user
    export const signoutUser = () => {
        signOut(authentication)
        .then((re) => {
        })
        .catch((re) => {console.log("failed to sign out")})
    };




    // Update Users score data in firestore Database
    export const updateUserScore = async (thisscore) => {
        const currentUser = authentication.currentUser;
        const docRef = doc(db, 'Users', currentUser.email);
        return await updateDoc(docRef, {'Score': thisscore})
    }
      