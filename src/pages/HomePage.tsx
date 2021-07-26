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

  /**
   *
   * @returns
   */
  const doLogout = async () => {
    try {
      await firebaseAuth.signOut();

      // after logout, go back to login page
      history.replace("/auth/login");
    } catch (error: any) {
      // error check for creating user...
      if (error) {
        present({
          header: "Error Logging Out",
          message: error?.message,
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
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>HOME PAGE</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonButton routerLink={"/profile"}>Profile</IonButton>

        {/* use firebase auth api to get current user, and
         render the json response */}

        <pre>{JSON.stringify(userProfile, null, 2)}</pre>

        <IonButton onClick={() => doLogout()}>SIGN OUT</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
