import { useEffect, useState } from "react";
import {
  firebaseApp,
  firebaseAuth,
  getDataByTutorId,
} from "../../data/data-services";
import { getTutorData } from "../../data/data-services";
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTextarea,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "../Page.css";

import firebase from "firebase";

import { Redirect, Route, useParams } from "react-router";
import { PopupButton } from "react-calendly";
import {
  home,
  calendar,
  pencil,
  compass,
  search,
  star,
  idCardSharp,
} from "ionicons/icons";

// IMPORT TABS
import TabT from "./TimelineTab";
import TabTC from "./TutorCenterTab";
import TabCC from "./CourseCenterTab";
import TabSI from "./StudyIslandTab";
import TabFT from "./FindTutorTab";

// IMPORT DATA SERVICES
import { updateTutor, saveImage } from "../../data/data-services";

function FindTutorTab() {
  const [studentArray, setStudentArray] = useState([]);
  const [tutorId, setTutorId] = useState<any>(null);

  const [message, setMessage] = useState<any>();
  const params = useParams<any>();
  const [userProfile, setUserProfile] = useState<any>(null);

  const doAddStudent = async () => {
    try {
      firebaseApp
        .firestore()
        .collection("tutor-listing")
        .doc(tutorId)
        .update({
          students: firebase.firestore.FieldValue.arrayUnion(
            firebaseAuth.currentUser?.uid
          ),
        });
    } catch (error: any) {
      // error check for adding user profile...
      if (error) {
        return;
      }
    }
  };

  useEffect(() => {
    (async () => {
      const msg = await getTutorData();
      setMessage(msg);
      console.log("The MSG IS:", msg);
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
        {message ? (
          <div>
            {message.map((id: any, index: string) => {
              return (
                <div key={index} style={{ width: "100%", margin: "auto" }}>
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" offset="0">
                          <IonCard color="secondary">
                            <IonCardHeader>
                              <IonThumbnail slot="start"></IonThumbnail>

                              <IonCardTitle>
                                <strong>{id.timelineTitle}</strong>
                              </IonCardTitle>
                              <IonChip>
                                {/* ION-IMG: Render Image */}
                                <IonAvatar>
                                  <img src="https://en.gravatar.com/userimage/37371217/fc40b48729e7d16a37d340e00c96618e.png" />
                                </IonAvatar>

                                <IonLabel>Tutor Name: {id.name}</IonLabel>
                              </IonChip>
                              <IonChip>
                                <IonLabel>
                                  Tutor Rating: <IonIcon icon={star} />
                                  <IonIcon icon={star} />
                                  <IonIcon icon={star} />
                                  <IonIcon icon={star} />
                                </IonLabel>
                              </IonChip>
                              <IonLabel>Tutor ID: {id.id}</IonLabel>
                            </IonCardHeader>
                            <div style={{ padding: 5 }}>
                              <h2>Tutor Type: {id.subject}</h2>
                            </div>
                            <div style={{ padding: 5 }}>
                              <h3>Tutor Description: {id.description}</h3>
                            </div>

                            <div style={{ width: "100%", padding: 5 }}>
                              <IonImg src={id.imageData?.downloadUrl} />
                            </div>
                            <div style={{ width: "100%", margin: "auto" }}>
                              <IonButton
                                size="default"
                                onClick={() => {
                                  doAddStudent();
                                  setTutorId({ id });
                                  console.log(id.id, tutorId);
                                }}
                              >
                                <IonButton
                                  routerLink={"/tabs/study-island"}
                                  color="light"
                                >
                                  <h6>Start A Study Island With This Tutor</h6>
                                </IonButton>
                              </IonButton>
                            </div>
                          </IonCard>
                        </IonCol>
                      </IonRow>
                    </IonGrid>

                    <br></br>
                  </IonItem>
                </div>
              );
            })}
          </div>
        ) : (
          <div>NO TUTORS FOUND</div>
        )}
      </IonContent>
      <IonFooter style={{ padding: 1 }}>
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
