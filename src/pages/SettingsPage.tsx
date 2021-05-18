import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import React, { useState } from 'react';
import { auth } from '../firebase';

const SettingsPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');

  let user = auth.currentUser;
  console.log('SettingsPage', user.displayName);

  const handleSave = () => {
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
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <h3>User Email: {user.email}</h3>
        </IonItem>
        <IonItem>
          <h3>User Display Name: {user.displayName}</h3>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Change Display Name</IonLabel>
          <IonInput
            value={displayName}
            onIonChange={(event) => setDisplayName(event.detail.value)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSave}>
          Save
        </IonButton>
        <IonButton color="medium" expand="block" onClick={() => auth.signOut()}>
          Log Out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
