import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  // IMPORT: RENDER ALERTS
  useIonAlert,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import "../Page.css";

// IMPORT: firebaseAuth from data modules
import { firebaseAuth } from "../../data/firebase";

// IMPORT: IMG - welcome
import welcomeImg from "../../assets/img/welcome.jpg";
import { firebaseApp } from "../../data/data-services";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // FIREBASE DOCs
  // https://firebase.google.com/docs/auth/web/password-auth?authuser=0
  const doLogin = async () => {
    try {
      // STEP 1 - LOGIN USER
      // response contains, error, data, user, session
      const result = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );

      console.log("signInWithEmailAndPassword: ", result);

      history.replace("/home");
    } catch (error: any) {
      // error check for creating user...
      if (error) {
        present({
          header: "Error Logging In User",
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
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>STUDYPELAGO</IonCardTitle>
            <IonCardSubtitle>STUDYPELAGO CITIZENS: 700</IonCardSubtitle>
          </IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol size="10" size-lg offset="1">
                {/* ION-IMG: Render Image */}
                <IonImg src={welcomeImg}></IonImg>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonCardContent>
            Welcome to Studypelago, the Caribbean's premier tutor services app!
            {/* TODO: #15 WRAP INPUT IN FORM */}
            <IonItem>
              <IonLabel position="fixed">email</IonLabel>
              <IonInput
                onIonChange={(event: any) => setEmail(event.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="fixed">password</IonLabel>
              <IonInput
                type="password"
                onIonChange={(event: any) => setPassword(event.target.value)}
              />
            </IonItem>
            <IonButton onClick={() => doLogin()}>LOGIN</IonButton>
            <IonButton routerLink={"/auth/create-account"}>
              CREATE ACCOUNT
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
