import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { firebaseAuth, firebaseApp } from "../store/firebase";

import "./Page.css";

function ChatPage() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // get user profile information
  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = firebaseAuth.currentUser?.uid;
      console.log("User ID: ", userId);
      const dataResponse = await firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      // get the user data
      setUserProfile(dataResponse.data());
      console.log("Data Response: ", dataResponse.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
  }, []);

  // function ChatRoom() {
  //   const dummy = useRef();
  //   const messagesRef = firebaseApp('messages');
  //   const query = messagesRef.orderBy('createdAt').limit(25);
  //
  //   const [messages] = useCollectionData(query, { idField: 'id' });
  //
  //   const [formValue, setFormValue] = useState('');
  //
  //
  //   const sendMessage = async (e) => {
  //     e.preventDefault();
  //
  //     const { uid, photoURL } = firebaseAuth.currentUser;
  //
  //     await messagesRef.add({
  //       text: formValue,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //       uid,
  //       photoURL
  //     })
  //
  //     setFormValue('');
  //     dummy.current.scrollIntoView({ behavior: 'smooth' });
  //   }

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>CHAT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CHAT PAGE</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}

export default ChatPage;

import React from "react";

// export function ChatEng() {
//   return (
//     <ChatEngine
//       height="100vh"
//       userName="TyrieM"
//       userSecret="Gaiaex1448"
//       projectID="8db2ba2b-3b37-40d8-b509-1c2307acd250"
//     />
//   );
// }
