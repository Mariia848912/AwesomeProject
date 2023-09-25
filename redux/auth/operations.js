import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

import { updateUserProfile, authStateChange, authSignOut } from "./authSlice";

export const authSignUpUser =
  ({ photo, nikename, email, password }) =>
  async (dispatch, state) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: nikename,
        photoURL: photo,
      });

      const { uid, displayName, photoURL } = auth.currentUser;

      const userProfile = {
        userId: uid,
        nikename: displayName,
        email,
        avatar: photoURL,
      };
      dispatch(updateUserProfile(userProfile));

      return user;
    } catch (error) {
      console.log(error);
    }
  };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, state) => {
//     try {
//       return await signInWithEmailAndPassword(email, password);
//     } catch (error) {
//       return error.code;
//     }
//   };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, state) => {
    try {
      // return await signInWithEmailAndPassword(email, password);
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credentials.user;
    } catch (error) {
      return error.code;
    }
  };

export const authSignOutUser = () => async (dispatch, state) => {
  await signOut(auth);

  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, state) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        nikename: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userProfile));
    }
  });
};

export const authUpdateUser =
  ({ avatarURL }) =>
  async (dispatch, state) => {
    try {
      const user = auth.currentUser;

      await updateProfile(user, {
        avatar: avatarURL,
      });

      const { uid, displayName, email, avatar: photoURL } = auth.currentUser;

      const userProfile = {
        userId: uid,
        nikename: displayName,
        email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userProfile));
    } catch (error) {
      return error.code;
    }
  };
