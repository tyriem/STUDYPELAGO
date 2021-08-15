import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import {
  updateTimeline,
  saveImage,
  firebaseAuth,
  firebaseApp,
  getTimelineData,
} from "../data/data-services";

const TimelineCenter: React.FC = () => {
  const history = useHistory();

  const fileUpload = useRef<any>(null);
  const [message, setMessage] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<any>("");
  const [name, setTimelineName] = useState<any>("");
  const [timelineTitle, setTimelineTitle] = useState<any>("");
  const [timelineBody, setTimelineBody] = useState<any>("");
  const [photo, setPhoto] = useState<any>(null);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // GET DOCUMENT "USERS"
  useEffect(() => {
    (async () => {
      const msg = await getTimelineData();
      setMessage(msg);
      console.log("The TIMELINE FEED IS:", msg);
    })();

    const loadUserProfile = async () => {
      const userId = firebaseAuth.currentUser?.uid;
      console.log("User ID: ", userId);
      const dataResponse = await firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      // SET THE USER DATA FROM DOCUMENT
      setUserProfile(dataResponse.data());
      console.log("Data Response: ", dataResponse.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
  }, []);

  const doAddStuff = async () => {
    try {
      setLoading(true);
      // STEP 1 - SAVE IMAGE TO FIREBASE STORAGE
      const { data: imageData, error: imageError } = await saveImage(photo);

      if (imageError) {
        throw imageError;
      }

      // STEP 2 - ADD ENTRY TO DATABASE
      // TO IMAGE IN FIREBASE STORAGE
      const { data, error } = await updateTimeline({
        name: userProfile?.firstName + " " + userProfile?.lastName,
        role: userProfile?.role,
        timelineTitle,
        timelineBody,
        imageData,
      });
      setLoading(false);
      // if no error, then render home page
      history.replace("/home");
    } catch (error) {
      setLoading(false);

      // error check for adding entry...
      if (error) {
        present({
          header: "Error Creating New Entry",
          message: (error as any)?.message,
          buttons: ["OK"],
        });
        return;
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"></IonButtons>
          <IonTitle>POST TO TIMELINE</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <IonLoading isOpen={loading} message="Uploading to Timeline" />
        ) : null}
        <p>
          {photo ? (
            <div
              style={{
                width: 300,
              }}
            >
              <IonImg src={URL.createObjectURL(photo)} />
            </div>
          ) : null}
        </p>
        <input
          ref={fileUpload}
          type="file"
          style={{ display: "none" }}
          onChange={(e) =>
            setPhoto(e?.target?.files ? e?.target?.files[0] : null)
          }
        />
        <div>
          <IonButton onClick={() => fileUpload.current.click()}>
            ADD AN IMAGE TO YOUR POST
          </IonButton>
          <IonButton onClick={() => setPhoto(null)}>CLEAR UPLOAD</IonButton>
        </div>
        <IonItem>
          <IonLabel position="fixed">Post Title</IonLabel>
          <IonInput
            onIonChange={(event: any) => setTimelineTitle(event.target.value)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Post Body</IonLabel>
          <IonTextarea
            onIonChange={(event: any) => setTimelineBody(event.target.value)}
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonButton onClick={() => doAddStuff()}>POST TO TIMELINE</IonButton>
        <IonButton color="danger" onClick={() => history.goBack()}>
          CANCEL
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default TimelineCenter;
