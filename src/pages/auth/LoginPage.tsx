import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  // import for rendering alerts
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

// import firebase declared in firebase.js
import { firebaseAuth } from "../../store/firebase";

// import img
import welcomeImg from "../../assets/img/welcome.jpg";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // used to render platform specific alerts
  const [present] = useIonAlert();

  // firebase documentation
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
          <IonTitle>STUDYPELAGO - LOGIN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>STUDYPELAGO</IonCardTitle>
            <IonCardSubtitle>STUDY ISLANDS ONLINE: 700</IonCardSubtitle>
          </IonCardHeader>
          {/* ION-IMG: Render Image */}
          <IonImg src={welcomeImg}></IonImg>

          <IonCardContent>
            Welcome to Studypelago, the Caribbean's premier tutor services app!
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
