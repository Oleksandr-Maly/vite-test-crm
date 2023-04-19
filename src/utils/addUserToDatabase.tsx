import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  Firestore,
} from 'firebase/firestore';

export const addUserToDatabase = async (user: User, db: Firestore): Promise<void> => {
  console.log(`start creating user in firestore`);
  const userRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      console.log('User with this email already exists.');
      return;
    }
    try {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        role: 'user',
      });
    } catch (error) {
      console.error('Error adding user to Firestore collection:', error);
    }
  } else {
    // user exists in Firestore
    console.log('user exists in Firestore document!');
  }
};
