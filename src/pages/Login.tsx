import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { useAuthConnect } from "@ionic-enterprise/auth-react";

const Login: React.FC = () => {
  const { error, isAuthenticated, login } = useAuthConnect();
  const router = useIonRouter();

  useEffect(() => {
    isAuthenticated && router.push("tabs/tab1", "none", "replace");
  }, [isAuthenticated, router]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={() => login()}>
          Login
        </IonButton>
        {error && <p className="ion-padding">{JSON.stringify(error)}</p>}
      </IonContent>
    </IonPage>
  );
};
export default Login;
