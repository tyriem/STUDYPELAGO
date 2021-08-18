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
  add,
  card,
  cash,
  calendar,
  closeCircle,
  compass,
  cube,
  home,
  nutrition,
  pencil,
  search,
  school,
} from "ionicons/icons";
// IMPORT: REACT-ROUTER LIBs
import { Route, Redirect, useHistory, useParams } from "react-router";
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
import { getTimelineData } from "../data/data-services";

// IMPORT: USE LIBs
import { useEffect, useState } from "react";

// IMPORT: CHART JS
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";

//IMPORT: IMAGE WELCOME
import welcomeImg from "../assets/img/welcome.jpg";

//IMPORT: IMAGE POST
import postImg from "../assets/img/post.jpg";

//IMPORT: PAYMENT PAGE
import PaymentPage from "./commerce/PaymentPage";

//IMPORT: PAYMENT PAGE
import TimelineCenter from "./TimelineCenter";

const HomePage: React.FC = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [platStat, setPlatStat] = useState<any>(null);
  const [showModal, setShowModal] = useState(true);
  const [message, setMessage] = useState<any>();
  const params = useParams<any>();

  // RENDER ANDR OR IOS ALERTS
  const [present] = useIonAlert();

  // GET DOCUMENT "USERS"
  useEffect(() => {
    (async () => {
      const msg = await getTimelineData();
      setMessage(msg);
      console.log("The TIMELINE FEED IS:", msg);
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

    const loadPlatStat = async () => {
      const dataUser = await firebaseApp
        .firestore()
        .collection("platform")
        .doc("user-stats")
        .get();

      // SET THE USER DATA FROM DOCUMENT
      setPlatStat(dataUser.data());
      console.log("THE NUMBER OF USERS IS: ", dataUser.data);
    };

    console.log("get user profile information...");
    loadUserProfile();
    loadPlatStat();
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
      // ERROR CHECK: Ending First Run...
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

  //Set Data for Bar Chart: USERS
  const usersBarChartData = {
    labels: ["Studypelago Users"],
    datasets: [
      {
        label: "Platform Users",
        backgroundColor: ["#42C4D1"],
        borderColor: ["black"],
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [JSON.stringify(platStat?.users)],
      },
    ],
  };

  //Set Data for Doughnut Chart: ROLES
  const roleDoughnutChartData = {
    labels: ["Tutors", "Students", "Parents"],
    datasets: [
      {
        label: "User Breakdown",
        backgroundColor: ["#42C4D1", "#B6D0E2", "#FFFFFF"],
        borderColor: "black",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          JSON.stringify(platStat?.roleT),
          JSON.stringify(platStat?.roleS),
          JSON.stringify(platStat?.roleP),
        ],
      },
    ],
  };

  //Set Data for Pie Chart: DEMOGRAPHICS
  const demographPieChartData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Student Demographics",
        backgroundColor: ["#42C4D1", "#B6D0E2", "#FFFFFF"],
        borderColor: "black",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          JSON.stringify(platStat?.genderF),
          JSON.stringify(platStat?.genderM),
        ],
      },
    ],
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
        {/*-- TERNARY OP: ROLE != TUTOR |  PAYMENT FAB OR TIMELINE FAB | --*/}
        {userProfile?.role != "Tutor" ? (
          // PAYMENT FAB
          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton href="/commerce/payment">
              {/* {history.replace("/commerce/payment")} */}
              <h1>$</h1>
            </IonFabButton>
          </IonFab>
        ) : (
          // TIMELINE FAB
          <IonFab vertical="top" horizontal="end" slot="fixed">
            <IonFabButton href="/timeline-center">
              {/* {history.replace("/timeline-center")} */}
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}

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
              {/*-- TERNARY OP: ROLE != TUTOR |  ROLE STUDENT / PARENT OR TUTOR | --*/}
              {userProfile?.role != "Tutor" ? (
                <IonChip>
                  <IonIcon icon={school} />
                  <IonLabel>
                    <h6>Role: {userProfile?.role}</h6>
                  </IonLabel>
                </IonChip>
              ) : (
                <IonChip>
                  <IonIcon icon={nutrition} />
                  <IonLabel>
                    <h6>Role: {userProfile?.role}</h6>
                  </IonLabel>
                </IonChip>
              )}
              {/*-- TERNARY OP: ROLE != TUTOR |  PAYMENT CREDITS OR NULL | --*/}
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
            <IonCard>
              Thank you for joining Studypelago, {userProfile?.firstName}{" "}
              {userProfile?.lastName}
              {/* ION-IMG: Render Image */}
              <IonImg src={welcomeImg}></IonImg>
              <h4>
                We at Studypelago would like to thank you for trying our
                service. <p></p>
                Would you like to find a tutor immediately or have a quick tour
                of our app?
              </h4>
              <IonButton routerLink={"/commerce/product"}>
                FIND A TUTOR
              </IonButton>
              <IonButton
                onClick={() => {
                  doEndFirstRun();
                  setShowModal(false);
                }}
              >
                TOUR STUDYPELAGO
              </IonButton>
            </IonCard>
          </IonModal>
        ) : null}

        {/* TIMELINE POST: STATS*/}
        <IonItem>
          <div style={{ width: "100%", margin: "auto" }}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" offset="0">
                  <IonCard color="secondary">
                    <IonCardHeader>
                      <IonCardTitle>Studypelago Stats</IonCardTitle>
                      <IonCardSubtitle>
                        A quick look at our education platform
                      </IonCardSubtitle>
                    </IonCardHeader>

                    {/*-- TERNARY OP: ROLE === TUTOR |  STATS TUTOR / STATS S|P | --*/}
                    {userProfile?.role === "Tutor" ? (
                      <IonCardContent>
                        {/* Bind the Bar Chart with the Data & Render */}
                        <Bar
                          data={usersBarChartData}
                          options={{ maintainAspectRatio: true }}
                        />
                        {/* Bind the Doughnut Chart with the Data & Render */}
                        <Doughnut
                          data={roleDoughnutChartData}
                          options={{ maintainAspectRatio: true }}
                        />
                        {/* Bind the Pie Chart with the Data & Render */}
                        <Pie
                          data={demographPieChartData}
                          options={{ maintainAspectRatio: true }}
                        />
                      </IonCardContent>
                    ) : (
                      <IonCardContent>
                        <Bar
                          data={usersBarChartData}
                          options={{ maintainAspectRatio: true }}
                        />
                        <Doughnut
                          data={roleDoughnutChartData}
                          options={{ maintainAspectRatio: true }}
                        />
                      </IonCardContent>
                    )}
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonItem>

        {/* TIMELINE POSTS */}
        {message ? (
          <div>
            {message.map((id: any, index: string) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <IonItem>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" offset="0">
                          <IonCard color="secondary">
                            <IonCardHeader>
                              <IonThumbnail slot="start">
                                {/* ION-IMG: Render Image */}
                                <IonImg src={postImg}></IonImg>
                              </IonThumbnail>

                              <IonCardTitle>
                                <strong>{id.timelineTitle}</strong>
                              </IonCardTitle>
                              <IonChip>
                                <IonAvatar>
                                  <img src="https://en.gravatar.com/userimage/37371217/fc40b48729e7d16a37d340e00c96618e.png" />
                                </IonAvatar>
                                <IonLabel>
                                  Post by: {id.role} {id.name}
                                </IonLabel>
                              </IonChip>
                            </IonCardHeader>
                            <IonCardContent>
                              <div style={{ width: "100%" }}>
                                <IonImg src={id.imageData?.downloadUrl} />
                              </div>
                              <div>
                                {" "}
                                <h1>{id.timelineBody} </h1>
                              </div>

                              <br></br>
                            </IonCardContent>
                          </IonCard>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                </div>
              );
            })}
          </div>
        ) : (
          <div>NO NEW TIMELINE POSTS</div>
        )}

        {/* use firebase auth api to get current user, and
         render the json response */}
        {/* <pre>{JSON.stringify(userProfile, null, 2)}</pre> */}
      </IonContent>
      {/*-- Footer --*/}
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
              <IonTabBar slot="bottom" color="white">
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
