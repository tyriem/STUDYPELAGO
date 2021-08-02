import { useEffect, useState } from "react";
import { getDataByTutorId } from "../../data/data-services";
import { getTutorData } from "../../data/data-services";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";

function FindTutorTab() {
  const [message, setMessage] = useState<any>();
  const params = useParams<any>();

  useEffect(() => {
    (async () => {
      const msg = await getTutorData();
      setMessage(msg);
    })();
  }, []);

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>FIND A TUTOR</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <IonItem>
            <IonLabel className="ion-text-wrap">
              {/* use firebase auth api to get current user, and
         render the json response */}
              <pre>{JSON.stringify(message, null, 2)}</pre>
              <h2>{message.name}</h2>
              <h3>{message?.subject}</h3>
              <h3>{message?.description}</h3>
              <div style={{ width: "90%" }}>
                <IonImg src={message?.imageData?.downloadUrl} />
              </div>
            </IonLabel>
          </IonItem>
        ) : (
          <div>NO TUTORS FOUND</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default FindTutorTab;
