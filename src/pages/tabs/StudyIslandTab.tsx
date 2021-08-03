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
        <VideoCallFrame
          url={process.env.REACT_APP_DAILY_ROOM_URL}
        ></VideoCallFrame>
      </IonContent>
    </IonPage>
  );
};

export default StudyIslandTab;
