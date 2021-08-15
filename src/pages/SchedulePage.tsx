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
import { InlineWidget } from "react-calendly";

import "./Page.css";

const SchedulePage: React.FC = () => {
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
          <IonTitle>SCHEDULE</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SCHEDULE</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* TODO: #2 PROGRAMMATIC CALENDAR LOGIC HERE: https://github.com/Kiarash-Z/react-modern-calendar-datepicker */}
        <div>
          <InlineWidget url="https://calendly.com/studypelago/60min" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;
