import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  IonFooter,
  IonTextarea,
} from "@ionic/react";
import {
  home,
  ellipse,
  square,
  triangle,
  calendar,
  compass,
  personCircle,
  pencil,
  search,
  map,
  informationCircle,
} from "ionicons/icons";
import { Route, Redirect, useHistory } from "react-router";
import "./Page.css";

import { firebaseAuth, firebaseApp } from "../../store/firebase";
import { useEffect, useState } from "react";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any>([]);

  const loadProducts = async () => {
    const userId = firebaseAuth.currentUser?.uid;
    console.log("User ID: ", userId);
    const dataResponse = await firebaseApp
      .firestore()
      .collection("products")
      .doc("*")
      .get();

    // get the user data
    setProducts(dataResponse.data());
    console.log("Data Response: ", dataResponse.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ProductList</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/add-product">ADD</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {products.map((p: any) => {
          return (
            <IonItem key={p.id} routerLink={`/product-detail/${p.id}`}>
              <IonLabel>
                <h1> {p.name}</h1>
                <div>{p.description}</div>
                <div>
                  <span style={{ paddingRight: 10, color: "green" }}>
                    ${p.price}
                  </span>
                  <span>{p.quantity}</span>
                </div>
              </IonLabel>
            </IonItem>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;
