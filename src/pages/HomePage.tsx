// IMPORT: ION LIBs
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
// IMPORT: ICONS
import { home, calendar, compass, pencil, search } from "ionicons/icons";
// IMPORT: REACT-ROUTER LIBs
import { Route, Redirect, useHistory } from "react-router";
import "./Page.css";

//IMPORT: TAB COMPONENTS
import TabT from "./tabs/TimelineTab";
import TabTC from "./tabs/TutorCenterTab";
import TabCC from "./tabs/CourseCenterTab";
import TabSI from "./tabs/StudyIslandTab";
import TabFT from "./tabs/FindTutorTab";

//IMPORT: FIREBASE LIBs
import { firebaseAuth, firebaseApp } from "../store/firebase";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";

//IMPORT: IMAGE
import welcomeImg from "../assets/img/welcome.jpg";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showModal, setShowModal] = useState(true);

  // RENDER ANDR OR IOS ALERTS
  const [present] = useIonAlert();

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

  // END FIRST RUN PROTOCOL
  var doEndFirstRun = async () => {
    try {
      firebaseApp
        .firestore()
        .collection("users")
        .doc(firebaseAuth.currentUser?.uid)
        .update({ firstRun: 0 });

      // NO ERROR: RENDER TIMELINE/HOME
      history.replace("/tabs/timeline");
    } catch (error: any) {
      // ERROR CHECK: Ending first run...
      if (error) {
        present({
          header: "Error Ending First Run",
          message: error?.message,
          buttons: ["OK"],
        });
        return;
      }
    }
  };

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
          Welcome, {userProfile?.firstName} {userProfile?.lastName}
        </pre>
        <h6>Role: {userProfile?.role}</h6>
        {/* MODAL: FIRST RUN PROTOCOL */}
        {userProfile?.firstRun && userProfile?.role != "Tutor" ? (
          <IonModal isOpen={showModal}>
            Thank you for joining Studypelago,
            {userProfile?.firstName} {userProfile?.lastName}
            {/* ION-IMG: Render Image */}
            <IonImg src={welcomeImg}></IonImg>
            <h4>
              We at Studypelago would like to thank you for trying our service.{" "}
              <p></p>
              Would you like to find a tutor immediately or have a quick tour of
              our app?
            </h4>
            <IonButton routerLink={"/commerce/product"}>FIND A TUTOR</IonButton>
            <IonButton
              onClick={() => {
                doEndFirstRun();
                setShowModal(false);
              }}
            >
              TOUR STUDYPELAGO
            </IonButton>
          </IonModal>
        ) : null}

        {/* use firebase auth api to get current user, and
         render the json response */}
        <pre>{JSON.stringify(userProfile, null, 2)}</pre>

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
                <IonLabel>Timeline</IonLabel>
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
