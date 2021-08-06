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
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { updateTutor, saveImage } from "../../data/data-services";

const TutorCenterTab: React.FC = () => {
  const history = useHistory();

  const fileUpload = useRef<any>(null);

  const [loading, setLoading] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [subject, setSubject] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [photo, setPhoto] = useState<any>(null);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  const doAddStuff = async () => {
    try {
      setLoading(true);
      // STEP 1 - SAVE IMAGE TO FIREBASE STORAGE
      const { data: imageData, error: imageError } = await saveImage(photo);

      if (imageError) {
        throw imageError;
      }
      // [TODO] #14 SET UPLOAD OVERWRITE ENTRY IN DATABASE [TODO]

      // STEP 2 - ADD PRODUCT INFO TO DATABASE, INCLUDE LINK
      // TO IMAGE IN FIREBASE STORAGE
      const { data, error } = await updateTutor({
        name,
        subject,
        description,
        imageData,
      });
      setLoading(false);
      // if no error, then render home page
      history.replace("/home");
    } catch (error) {
      setLoading(false);

      // error check for adding product...
      if (error) {
        present({
          header: "Error Creating New stuff",
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
          <IonTitle>TUTOR CENTER</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <IonLoading isOpen={loading} message="Saving Record" />
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
            SELECT CERTIFICATES TO UPLOAD
          </IonButton>
          <IonButton onClick={() => setPhoto(null)}>CLEAR UPLOAD</IonButton>
        </div>
        <IonItem>
          <IonLabel position="fixed">Name</IonLabel>
          <IonInput onIonChange={(event: any) => setName(event.target.value)} />
        </IonItem>
        <IonItem>
          <IonLabel> SUBJECT LEVEL</IonLabel>
          <IonSelect
            onIonChange={(event: any) => setSubject(event.target.value)}
          >
            <IonSelectOption value="Advanced Placement - Tutor">
              AP
            </IonSelectOption>
            <IonSelectOption value="Bahamas General Certificate of Secondary Education - Tutor">
              BGCSE
            </IonSelectOption>
            <IonSelectOption value="Grade Level Assessment Test - Tutor">
              GLAT
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Biography</IonLabel>
          <IonTextarea
            onIonChange={(event: any) => setDescription(event.target.value)}
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonButton onClick={() => doAddStuff()}>
          UPDATE YOUR TUTOR LISTING
        </IonButton>
        <IonButton color="danger" onClick={() => history.goBack()}>
          CANCEL
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default TutorCenterTab;
