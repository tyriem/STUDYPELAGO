import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseApp, firebaseStorage } from "../store/firebase";
import "./Page.css";
// import img
import iconImg from "../assets/img/user-icon.png";

const ProfilePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [currentURL, setCurrentURL] = useState<any>(null);
  const [uploading, setUploading] = useState<any>(false);

  const [image, setImage] = useState<any>("");

  const uploadToFirebase = () => {
    setUploading(true);
    const fileName = firebaseAuth.currentUser?.uid;
    const imageRef = firebaseStorage().ref(`/profiles/${fileName}`);
    const task = imageRef.put(selectedFile);
    const unsub = task.on(
      firebaseStorage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        // IN PROGRESS
        console.log(snapShot.bytesTransferred / snapShot.totalBytes);
      },
      (error) => {
        // ERROR
        console.log(error);
      },
      async () => {
        // COMPLETE
        const url = await task.snapshot.ref.getDownloadURL();
        setCurrentURL(url);
        setUploading(false);
        unsub();
      }
    );
  };

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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <pre>USER ID: {firebaseAuth.currentUser?.uid}</pre>
        <pre>Profile Picture:</pre>
        {/* TODO: CODE PROFILE IMAGE REPLACEMENT */}
        <img src={iconImg} width="100" />

        <br></br>
        <br></br>
        <br></br>
        <pre>Upload A New Profile Picture:</pre>
        {uploading ? (
          <IonLoading isOpen={uploading} message="Uploading File"></IonLoading>
        ) : null}
        <input
          type="file"
          onChange={(event: any) => {
            setSelectedFile(event.target.files[0]);
          }}
        ></input>
        <p>SELECTED FILE {selectedFile?.name}</p>

        <IonButton onClick={uploadToFirebase} size="small">
          UPLOAD PICTURE
        </IonButton>

        <br></br>
        <img src={currentURL} width="200" />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
