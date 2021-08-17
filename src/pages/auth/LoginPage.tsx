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
  IonSlides,
  IonSlide,
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

// IMPORT: IMGs
import welcomeImg from "../../assets/img/welcome.png";
import logoImg from "../../assets/img/logo.gif";
import platImg from "../../assets/img/platform.png";

import { firebaseApp } from "../../data/data-services";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

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
          <IonTitle>STUDYPELAGO</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-lg>
                    <div>
                      {/* ION-IMG: Render Image */}
                      <div style={{ width: "50%", margin: "auto" }}>
                        <IonImg src={logoImg}></IonImg>
                      </div>

                      <h2>
                        Welcome to <b>Studypelago</b>
                      </h2>
                      <p>
                        Welcome to the the Caribbean's premier tutor services
                        app!
                      </p>
                      <br></br>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-lg>
                    <div>
                      {/* ION-IMG: Render Image */}
                      <div style={{ width: "50%", margin: "auto" }}>
                        <IonImg src={welcomeImg}></IonImg>
                      </div>

                      <h2>A New Age Of Knowledge</h2>
                      <p>
                        We built this platform to serve the needs of our
                        developing minds
                      </p>
                      <br></br>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
            <IonSlide>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-lg>
                    <div>
                      {/* ION-IMG: Render Image */}
                      <div style={{ width: "50%", margin: "auto" }}>
                        <IonImg src={platImg}></IonImg>
                      </div>

                      <h2>Feature Rich, Security Focused</h2>
                      <p>
                        With a focus on security, we ensure that each stage of
                        the journey is secured and monitored
                      </p>
                      <br></br>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonSlide>
          </IonSlides>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>

          <IonGrid>
            <IonRow>
              <IonCol size="10" size-lg offset="1"></IonCol>
            </IonRow>
          </IonGrid>
          <IonCardContent>
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
