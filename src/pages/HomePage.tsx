import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./Page.css";

import { firebaseAuth, firebaseApp } from "../store/firebase";
import { useEffect, useState } from "react";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // get user profile information
  useEffect(() => {
    const loadUserProfile = async () => {
      const userId = firebaseAuth.currentUser?.uid;
      console.log("User ID: ", userId);
      const dataResponse = await firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      // get the user data
      setUserProfile(dataResponse.data());
      console.log("Data Response: ", dataResponse.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
  }, []);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="light" />
          </IonButtons>
          <IonTitle>STUDYPELAGO</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonButton routerLink={"/profile"} color="light">
          Profile
        </IonButton>

        <pre>
          Welcome back, {userProfile?.firstName} {userProfile?.lastName}
        </pre>
        <h6>Role: {userProfile?.role}</h6>

        {/* use firebase auth api to get current user, and
         render the json response */}
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
