import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
  IonTitle,
  IonToolbar,
  useIonAlert,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import firebase from "firebase";
import { options } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";

// import firebase client
import { firebaseAuth, firebaseApp } from "../../data/data-services";

// START OF COMPONENT
const CreateAccountPage: React.FC = () => {
  // for routing between pages
  const history = useHistory();

  // variables from the page that are needed to create
  // the user
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [island, setIsland] = useState("");
  const [streetAddr, setStreetAddr] = useState("");

  // used to render platform specific alerts
  const [present] = useIonAlert();

  const doCreateAccount = async () => {
    try {
      // STEP 1 - CREATE USER
      // firebase documentation
      // https://firebase.google.com/docs/auth/web/password-auth?authuser=0
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // STEP 2 - ADD USER INFO TO PROFILE
      // writing to firebase databases...
      //
      // Overview
      // https://firebase.google.com/docs/firestore/quickstart?authuser=0
      //
      // Adding Data
      // https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

      firebaseApp.firestore().collection("users").doc(response.user?.uid).set({
        firstName,
        lastName,
        age,
        credit: 1,
        email,
        username: email,
        gender,
        role,
        country,
        island,
        streetAddr,
        firstRun: 1, // Set to 1 to indicate that the user has completed the setup
        updated_at: firebase.firestore.Timestamp.now(),
      });

      // if no error, then render home page
      history.replace("/home");
    } catch (error: any) {
      // error check for adding user profile...
      if (error) {
        present({
          header: "Error Creating Account",
          message: error?.message,
          buttons: ["OK"],
        });
        return;
      }
    }
    // TERNARY: USER COUNT INCREMENTOR
    if (role === "Tutor") {
      {
        gender === "f"
          ? firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderF: firebase.firestore.FieldValue.increment(1),
                roleT: firebase.firestore.FieldValue.increment(1),
              })
          : firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderM: firebase.firestore.FieldValue.increment(1),
                roleT: firebase.firestore.FieldValue.increment(1),
              });
      }
    } else if (role === "Student") {
      {
        gender === "f"
          ? firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderF: firebase.firestore.FieldValue.increment(1),
                roleS: firebase.firestore.FieldValue.increment(1),
              })
          : firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderM: firebase.firestore.FieldValue.increment(1),
                roleS: firebase.firestore.FieldValue.increment(1),
              });
      }
    } else if (role === "Parent") {
      {
        gender === "f"
          ? firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderF: firebase.firestore.FieldValue.increment(1),
                roleP: firebase.firestore.FieldValue.increment(1),
              })
          : firebaseApp
              .firestore()
              .collection("platform")
              .doc("user-stats")
              .update({
                users: firebase.firestore.FieldValue.increment(1),
                genderM: firebase.firestore.FieldValue.increment(1),
                roleP: firebase.firestore.FieldValue.increment(1),
              });
      }
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CREATE ACCOUNT</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="fixed">First Name</IonLabel>
          <IonInput
            onIonChange={(event: any) => setFirstName(event.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="fixed">Last Name</IonLabel>
          <IonInput
            onIonChange={(event: any) => setLastName(event.target.value)}
          />
        </IonItem>

        <IonItem>
          <IonLabel> Age</IonLabel>
          <IonSelect onIonChange={(event: any) => setAge(event.target.value)}>
            {/*TODO: DATA VALIDATION: ANY AGE UNDER 12 is NOT ALLOWED ON PLATFORM | GO TO 00 */}
            <IonSelectOption value="00">Five</IonSelectOption>
            <IonSelectOption value="00">Six</IonSelectOption>
            <IonSelectOption value="00">Seven</IonSelectOption>
            <IonSelectOption value="00">Eight</IonSelectOption>
            <IonSelectOption value="00">Nine</IonSelectOption>
            <IonSelectOption value="00">Ten</IonSelectOption>
            <IonSelectOption value="00">Eleven</IonSelectOption>
            <IonSelectOption value="12">Twelve</IonSelectOption>
            <IonSelectOption value="13">Thirteen</IonSelectOption>
            <IonSelectOption value="14">Fourteen</IonSelectOption>
            <IonSelectOption value="15">Fifteen</IonSelectOption>
            <IonSelectOption value="16">Sixteen</IonSelectOption>
            <IonSelectOption value="17">Seventeen</IonSelectOption>
            <IonSelectOption value="18">Eighteen</IonSelectOption>
            <IonSelectOption value="19">Nineteen</IonSelectOption>
            <IonSelectOption value="20">Twenty</IonSelectOption>
            <IonSelectOption value="21">Twenty-One</IonSelectOption>
            <IonSelectOption value="22">Twenty-Two</IonSelectOption>
            <IonSelectOption value="23">Twenty-Three</IonSelectOption>
            <IonSelectOption value="24">Twenty-Four</IonSelectOption>
            <IonSelectOption value="25">Twenty-Five</IonSelectOption>
            <IonSelectOption value="26">Twenty-Six</IonSelectOption>
            <IonSelectOption value="27">Twenty-Seven</IonSelectOption>
            <IonSelectOption value="28">Twenty-Eight</IonSelectOption>
            <IonSelectOption value="29">Twenty-Nine</IonSelectOption>
            <IonSelectOption value="30">Thirty</IonSelectOption>
            <IonSelectOption value="31">Thirty-One</IonSelectOption>
            <IonSelectOption value="32">Thirty-Two</IonSelectOption>
            <IonSelectOption value="33">Thirty-Three</IonSelectOption>
            <IonSelectOption value="34">Thirty-Four</IonSelectOption>
            <IonSelectOption value="35">Thirty-Five</IonSelectOption>
            <IonSelectOption value="36">Thirty-Six</IonSelectOption>
            <IonSelectOption value="37">Thirty-Seven</IonSelectOption>
            <IonSelectOption value="38">Thirty-Eight</IonSelectOption>
            <IonSelectOption value="39">Thirty-Nine</IonSelectOption>
            <IonSelectOption value="40">Forty</IonSelectOption>
            <IonSelectOption value="41">Forty-One</IonSelectOption>
            <IonSelectOption value="42">Forty-Two</IonSelectOption>
            <IonSelectOption value="43">Forty-Three</IonSelectOption>
            <IonSelectOption value="44">Forty-Four</IonSelectOption>
            <IonSelectOption value="45">Forty-Five</IonSelectOption>
            <IonSelectOption value="46">Forty-Six</IonSelectOption>
            <IonSelectOption value="47">Forty-Seven</IonSelectOption>
            <IonSelectOption value="48">Forty-Eight</IonSelectOption>
            <IonSelectOption value="49">Forty-Nine</IonSelectOption>
            <IonSelectOption value="50">Fifty</IonSelectOption>
            <IonSelectOption value="51">Fifty-One</IonSelectOption>
            <IonSelectOption value="52">Fifty-Two</IonSelectOption>
            <IonSelectOption value="53">Fifty-Three</IonSelectOption>
            <IonSelectOption value="54">Fifty-Four</IonSelectOption>
            <IonSelectOption value="55">Fifty-Five</IonSelectOption>
            <IonSelectOption value="56">Fifty-Six</IonSelectOption>
            <IonSelectOption value="57">Fifty-Seven</IonSelectOption>
            <IonSelectOption value="58">Fifty-Eight</IonSelectOption>
            <IonSelectOption value="59">Fifty-Nine</IonSelectOption>
            <IonSelectOption value="60">Sixty</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel> Gender</IonLabel>
          <IonSelect
            onIonChange={(event: any) => setGender(event.target.value)}
          >
            <IonSelectOption value="f">Female</IonSelectOption>
            <IonSelectOption value="m">Male</IonSelectOption>
          </IonSelect>
        </IonItem>

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

        <IonItem>
          <IonRadioGroup
            value={role}
            onIonChange={(event: any) => setRole(event.target.value)}
          >
            <IonListHeader>
              <IonLabel>Role:</IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>Student</IonLabel>
              <IonRadio slot="start" value="Student" />
            </IonItem>

            <IonItem>
              <IonLabel>Parent</IonLabel>
              <IonRadio slot="start" value="Parent" />
            </IonItem>

            <IonItem>
              <IonLabel>Tutor</IonLabel>
              <IonRadio slot="start" value="Tutor" />
            </IonItem>
          </IonRadioGroup>
        </IonItem>

        <IonItem>
          <IonLabel>Country</IonLabel>
          <IonSelect
            onIonChange={(event: any) => setCountry(event.target.value)}
          >
            <IonSelectOption value="AR">ARUBA</IonSelectOption>
            <IonSelectOption value="BHS">Bahamas, The</IonSelectOption>
            <IonSelectOption value="BB">Barbados</IonSelectOption>
            <IonSelectOption value="JA">Jamaica</IonSelectOption>
            <IonSelectOption value="OUTSIDE">United States</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel> Island</IonLabel>
          <IonSelect
            onIonChange={(event: any) => setIsland(event.target.value)}
          >
            <IonSelectOption value="NAA">NOT APPLICABLE</IonSelectOption>
            <IonSelectOption value="AB">ABACO</IonSelectOption>
            <IonSelectOption value="AN">ANDROS</IonSelectOption>
            <IonSelectOption value="BI">BIMINI</IonSelectOption>
            <IonSelectOption value="CI">CAT ISLAND</IonSelectOption>
            <IonSelectOption value="GB">GRAND BAHAMA</IonSelectOption>
            <IonSelectOption value="EL">ELEUTHERA</IonSelectOption>
            <IonSelectOption value="LI">LONG ISLAND</IonSelectOption>
            <IonSelectOption value="NP">NEW PROVIDENCE</IonSelectOption>
            <IonSelectOption value="SS">SAN SALVADOR</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="fixed">Street Address</IonLabel>
          <IonInput
            onIonChange={(event: any) => setStreetAddr(event.target.value)}
          />
        </IonItem>

        <IonButton onClick={() => doCreateAccount()}>CREATE ACCOUNT</IonButton>
        <IonButton routerLink={"/auth/login"}>CANCEL</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccountPage;
