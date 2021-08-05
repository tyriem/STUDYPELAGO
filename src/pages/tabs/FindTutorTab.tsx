import { useEffect, useState } from "react";
import {
  firebaseApp,
  firebaseAuth,
  getDataByTutorId,
} from "../../data/data-services";
import { getTutorData } from "../../data/data-services";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonChip,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab.css";
import { Redirect, Route, useParams } from "react-router";
import { PopupWidget } from "react-calendly";
import { home, calendar, pencil, compass, search } from "ionicons/icons";

// IMPORT TABS
import TabT from "./TimelineTab";
import TabTC from "./TutorCenterTab";
import TabCC from "./CourseCenterTab";
import TabSI from "./StudyIslandTab";
import TabFT from "./FindTutorTab";

function FindTutorTab() {
  const [message, setMessage] = useState<any>();
  const params = useParams<any>();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const msg = await getTutorData();
      setMessage(msg);
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

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>FIND A TUTOR</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              color="secondary"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          {message ? (
            <IonItem>
              <IonLabel className="ion-text-wrap">
                {/* use firebase call to get list of tutors, and
         render the json response */}
                {/* <pre>{JSON.stringify(message, null, 2)}</pre> */}
                <h2>{message?.name}</h2>
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
        </IonCard>
        <IonItem>
          <PopupWidget
            color="#42C4D1"
            text="Request a Session with Tutor: Tyrie Moss"
            textColor="#ffffff"
            url="https://calendly.com/studypelago"
          />
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {/* TABS BY ROLE */}
          {/* TERNARY OP: ROLE = TUTOR */}
          {userProfile?.role === "Tutor" ? (
            <IonTabs>
              <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/timeline" />
                {/*
          NB: Render - Cuts down on # of renders
              Component Prop - component depends on the RouterComponentProps passed in automatically.
        */}
                <Route
                  path="/tabs/TimelineTab"
                  render={() => <TabT />}
                  exact={true}
                />
                <Route
                  path="/tabs/TutorCenterTab"
                  render={() => <TabTC />}
                  exact={true}
                />
                <Route
                  path="/tabs/CourseCenterTab"
                  render={() => <TabCC />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="TimelineTab" href="/tabs/timeline">
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>

                <IonTabButton tab="TutorCenterTab" href="/tabs/tutor-center">
                  <IonIcon icon={calendar} />
                  <IonLabel>Tutor Center</IonLabel>
                </IonTabButton>
                <IonTabButton tab="CourseCenterTab" href="/tabs/course-center">
                  <IonIcon icon={pencil} />
                  <IonLabel>Course Center</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : (
            /* TERNARY OP: ROLE = STUDENT OR PARENT */
            <IonTabs>
              <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/timeline" />
                <Route
                  path="/tabs/TimelineTab"
                  render={() => <TabT />}
                  exact={true}
                />
                <Route
                  path="/tabs/StudyIslandTab"
                  render={() => <TabSI />}
                  exact={true}
                />
                <Route
                  path="/tabs/FindTutorTab"
                  render={() => <TabFT />}
                  exact={true}
                />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="TimelineTab" href="/tabs/timeline">
                  <IonIcon icon={home} />
                  <IonLabel>Timeline</IonLabel>
                </IonTabButton>

                <IonTabButton tab="StudyIslandTab" href="/tabs/study-island">
                  <IonIcon icon={compass} />
                  <IonLabel>Study Island</IonLabel>
                </IonTabButton>
                <IonTabButton tab="FindTutorTab" href="/tabs/find-tutor">
                  <IonIcon icon={search} />
                  <IonLabel>Find A Tutor</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          )}
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default FindTutorTab;
