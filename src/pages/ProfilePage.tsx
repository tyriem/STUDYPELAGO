import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { firebaseAuth, firebaseApp } from "../store/firebase";
import "./Page.css";

const ProfilePage: React.FC = () => {
  const { firstName } = useParams<{ firstName: string }>();

  // get user profile information
  useEffect(() => {
    const getUserInfo = async (user: any) => {
      if (user) {
      }
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile, {firebaseAuth.currentUser?.uid}</IonTitle>
          <IonTitle>WELCOME, {firstName}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Profile Page: {firebaseAuth.currentUser?.email}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
