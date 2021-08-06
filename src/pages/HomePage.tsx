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
  IonFab,
  IonFabButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonRow,
  IonThumbnail,
  IonFooter,
  IonAvatar,
  IonChip,
} from "@ionic/react";
// IMPORT: ICONS
import {
  home,
  card,
  calendar,
  compass,
  pencil,
  search,
  add,
  cash,
  closeCircle,
  cube,
} from "ionicons/icons";
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

import { firebaseAuth, firebaseApp } from "../data/data-services";
import { getTutorData } from "../data/data-services";
import { getCourseData } from "../data/data-services";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";

//IMPORT: IMAGE WELCOME
import welcomeImg from "../assets/img/welcome.jpg";

//IMPORT: IMAGE POST
import postImg from "../assets/img/post.jpg";

//IMPORT: PAYMENT PAGE
import PaymentPage from "./commerce/PaymentPage";

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
        {/*-- PAYMENT FAB --*/}
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton href="/commerce/payment">
            {/* {history.replace("/commerce/payment")} */}
            <IonIcon icon={cash} />
          </IonFabButton>
        </IonFab>

        <IonGrid>
          <IonRow>
            <IonCol size="5" size-lg offset="0.5">
              <IonChip>
                <IonAvatar>
                  <img src="https://en.gravatar.com/userimage/37371217/fc40b48729e7d16a37d340e00c96618e.png" />
                </IonAvatar>
                <IonLabel>
                  <pre>
                    Welcome, {userProfile?.firstName} {userProfile?.lastName}
                  </pre>
                </IonLabel>
              </IonChip>
              <IonChip>
                <IonIcon icon={cube} />
                <IonLabel>
                  <h6>Role: {userProfile?.role}</h6>
                </IonLabel>
              </IonChip>
              {/* TERNARY OP: ROLE = TUTOR */}
              {userProfile?.role != "Tutor" ? (
                <IonChip>
                  <IonIcon icon={card} />
                  <IonLabel>
                    <h6>Credit: {userProfile?.credit}</h6>
                  </IonLabel>
                </IonChip>
              ) : null}
            </IonCol>
          </IonRow>
        </IonGrid>

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
        {/* EXAMPLE TIMELINE POST: 1 */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-lg offset="0">
              <IonCard color="secondary">
                <IonCardHeader>
                  <IonCardTitle>Studypelago Stats</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <iframe
                    width="100%"
                    height="250"
                    src="//plotly.com/dashboard/Isle:2/embed"
                  ></iframe>
                  <h1>
                    Take a quick look at how our students are performing across
                    the platform.
                  </h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* EXAMPLE TIMELINE POST: 2 */}
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-lg offset="0">
              <IonCard color="secondary">
                <IonCardHeader>
                  <IonThumbnail slot="start">
                    {/* ION-IMG: Render Image */}
                    <IonImg src={postImg}></IonImg>
                  </IonThumbnail>
                  <IonChip>
                    <IonAvatar>
                      <img src="https://en.gravatar.com/userimage/37371217/fc40b48729e7d16a37d340e00c96618e.png" />
                    </IonAvatar>
                    <IonLabel>BGCSE Tutor | Gail Woon</IonLabel>
                  </IonChip>
                  <IonCardSubtitle></IonCardSubtitle>
                  <IonCardSubtitle>Timeline Post: </IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  {/* ION-IMG: Render Image */}
                  <IonImg src={postImg}></IonImg>
                  Getting ready for my first #Studypelago sesh. Wish me luck!
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* use firebase auth api to get current user, and
         render the json response */}
        {/* <pre>{JSON.stringify(userProfile, null, 2)}</pre> */}
      </IonContent>
      {/*-- Footer --*/}
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
                  <IonLabel>Home</IonLabel>
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

export default HomePage;
