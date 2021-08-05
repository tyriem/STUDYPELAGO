import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab.css";
import VideoCallFrame from "../../components/VideoCallFrame";

// IMPORT TABS
import TabT from "./TimelineTab";
import TabTC from "./TutorCenterTab";
import TabCC from "./CourseCenterTab";
import TabSI from "./StudyIslandTab";
import TabFT from "./FindTutorTab";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";
import { home, calendar, pencil, compass, search } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import { firebaseAuth, firebaseApp } from "../../data/data-services";

const StudyIslandTab: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  const [userProfile, setUserProfile] = useState<any>(null);

  // GET DOCUMENT "USERS"
  useEffect(() => {
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
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>STUDY ISLAND</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
              color="secondary"
            ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="1" size-lg offset="0.5"></IonCol>
            <p></p>
            <IonButton routerLink={"/study-session"} size="large">
              BGCSE MATH WITH TUTOR: TYRIE MOSS
            </IonButton>
            <p></p>
            <p></p>
            <IonButton routerLink={"/study-session"} disabled={true}>
              BGCSE ENGLISH WITH TUTOR: GAIL WOON
            </IonButton>
            <p></p>
            <p></p>
            <IonButton routerLink={"/study-session"} disabled={true}>
              BGCSE PHYSICS WITH TUTOR: JOHN DOE
            </IonButton>
            <p></p>
            <p></p>
            <IonButton routerLink={"/study-session"} disabled={true}>
              BGCSE CHEMISTRY WITH TUTOR: JANE DOE
            </IonButton>
            <p></p>
          </IonRow>
        </IonGrid>
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
};

export default StudyIslandTab;
