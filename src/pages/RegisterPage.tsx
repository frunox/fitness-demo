import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  // const [error, setError] = useState('');
  // const [isLoading, setIsLoading] = useState()
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: '' });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(credential);
    } catch (error) {
      setStatus({ loading: false, error: error.message });
      console.log('login error', error.message);
    }
    if (displayName) {
      let user = auth.currentUser;
      console.log('RegisterPage user', user);
      user
        .updateProfile({
          displayName: displayName,
          photoURL: '',
        })
        .then(() => {
          console.log('User display name updated');
        })
        .catch((error) => {
          console.log('Error updating user profile');
        });
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Display Name</IonLabel>
            <IonInput
              value={displayName}
              onIonChange={(event) => setDisplayName(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">{status.error}</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already registered?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
