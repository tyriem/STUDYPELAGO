import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab.css";
import VideoCallFrame from "../../components/VideoCallFrame";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";

const StudyIslandTab: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>STUDY ISLAND</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">STUDY ISLAND</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p></p>
        <IonButton routerLink={"/study-session"} size="large">
          BGCSE MATH WITH TUTOR: TYRIE MOSS
        </IonButton>
        <p></p>
        <p></p>
        <IonButton routerLink={"/study-session"} size="large" disabled={true}>
          BGCSE ENGLISH WITH TUTOR: GAIL WOON
        </IonButton>
        <p></p>
        <p></p>
        <IonButton routerLink={"/study-session"} size="large" disabled={true}>
          BGCSE PHYSICS WITH TUTOR: JOHN DOE
        </IonButton>
        <p></p>
        <p></p>
        <IonButton routerLink={"/study-session"} size="large" disabled={true}>
          BGCSE CHEMISTRY WITH TUTOR: JANE DOE
        </IonButton>
        <p></p>
      </IonContent>
    </IonPage>
  );
};

export default StudyIslandTab;
