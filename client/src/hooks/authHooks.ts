import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useState, FormEvent } from 'react';
import { auth, firestoreDB } from 'firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  isCheck: boolean;
  error: null | string;
  loading: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
  error: null | string;
  loading: boolean;
};

const firebaseErrors: { [firebaseError: string]: string } = {
  'Firebase: Error (auth/invalid-email).': 'Please enter a valid email',
  'Firebase: Password should be at least 6 characters (auth/weak-password).':
    'Password must be at least 6 characters',
  'Firebase: Error (auth/wrong-password).':
    'Invalid email or password. Please try again.',
  'Firebase: Error (auth/user-not-found).':
    'Invalid email or password. Please try again.',
  'Firebase: Error (auth/email-already-in-use).': 'Email is already in use',
};

const getErrorMessage = (error: any) => {
  console.log(error);
  const message = error.message as string;
  const messageToShow =
    message in firebaseErrors
      ? firebaseErrors[message]
      : 'There was an error. Please try again later.';

  return messageToShow;
};

export const useRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<RegistrationFormData>({
    name: '',
    email: '',
    password: '',
    isCheck: false,
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, password, isCheck } = formData;

    let { email } = formData;

    email = email.toLowerCase();

    if (!name || !email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in.',
      }));
      return;
    }

    if (!isCheck) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'Please agree to our Terms of Service and Privacy Policy.',
      }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(firestoreDB, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      await updateProfile(result.user, { displayName: name });
      navigate(fromPage, { replace: true });
    } catch (firebaseError: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: getErrorMessage(firebaseError),
        loading: false,
      }));
    }
  };

  return { handleSubmit, formData, setFormData };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: 'All fields must be filled in',
      }));

      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      error: null,
      loading: true,
    }));

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate(fromPage, { replace: true });
    } catch (firebaseError: any) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        error: getErrorMessage(firebaseError),
        loading: false,
      }));
    }
  };

  return { formData, setFormData, handleSubmit };
};
