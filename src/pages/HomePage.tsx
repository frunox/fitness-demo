import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add as addIcon } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { formatDate } from '../date';
import './HomePage.css';

const HomePage: React.FC = () => {
  const { userId, userDisplayName } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  // useEffect(() => {
  //   const entriesRef = firestore
  //     .collection('users')
  //     .doc(userId)
  //     .collection('entries');
  //   return entriesRef
  //     .orderBy('date', 'desc')
  //     .limit(6)
  //     .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
  // }, [userId, userDisplayName]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fitness Demo for {userDisplayName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="dropdown">
          <button className="dropbtn">Locations</button>
          <div className="dropdown-content">
            <a href="/my/settings">Kitchen</a>
            <a href="/my/settings">Bathroom</a>
            <a href="/my/settings">Vehicle</a>
          </div>
        </div>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton routerLink="/my/entries/add">
          <IonIcon icon={addIcon} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default HomePage;
