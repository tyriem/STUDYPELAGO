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
import { firebaseAuth, firebaseApp } from "../data/data-services";
import "./Page.css";

const StudyPage: React.FC = () => {
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
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>STUDY ISLAND</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">STUDY ISLAND</IonTitle>
          </IonToolbar>
        </IonHeader>
        WELCOME TO YOUR STUDY ISLAND, {firstName}
      </IonContent>
    </IonPage>
  );
};

export default StudyPage;
