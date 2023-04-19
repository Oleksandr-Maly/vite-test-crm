import { User } from 'firebase/auth';
import { doc, Firestore, getDoc } from 'firebase/firestore';
import { setUser } from '../store/slices/userSlice';

export const getUserFromDatabase = async (user: User, db: Firestore, dispatch: any) => {
  try {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      dispatch(setUser(docSnap.data()));
    }
  } catch (error) {
    console.log(`couldn't get user from database`, error);
  }
};
