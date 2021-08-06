import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Page.css";
import VideoCallFrame from "../components/VideoCallFrame";

// IMPORT: USE LIBs

const StudySession: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SESSION WITH TUTOR: TYRIE MOSS</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SESSION WITH TUTOR: TYRIE MOSS</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* [TODO] #7 IMPLEMENT CHAT AND CALL PROGRAMMATICALLY [TODO] */}
        <VideoCallFrame
          url={process.env.REACT_APP_DAILY_ROOM_URL}
        ></VideoCallFrame>
      </IonContent>
    </IonPage>
  );
};

export default StudySession;
