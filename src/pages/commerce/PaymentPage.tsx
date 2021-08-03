import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

//DECLARE: Global variable paypal
declare var paypal: any;

function PaymentPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const lineItems = [
    {
      description: " Credit: One(1) Hour Session ",
      amount: { currency_code: "BSD", value: 20 },
    },
  ];

  useEffect(() => {
    // https://developer.paypal.com/docs/checkout/integrate/
    function initPayPalButton() {
      paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            layout: "vertical",
            label: "paypal",
          },

          createOrder: (data: any, actions: any) => {
            // this is where you would need to pass in line items
            return actions.order.create({
              purchase_units: lineItems,
            });
          },

          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              alert(
                "Transaction completed by: " +
                  details.payer.name.given_name +
                  "!"
              );
              console.log(details);
            });
          },

          onError: (err: any) => {
            console.log(err);
          },
        })
        .render("#paypal-button-container");
    }
    initPayPalButton();
  }, []);

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>ADD CREDIT TO ACCOUNT</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h1>PAYMENTS</h1>
        <div id="paypal-button-container"></div>
      </IonContent>
    </IonPage>
  );
}

export default PaymentPage;
