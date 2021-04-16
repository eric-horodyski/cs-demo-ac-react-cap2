import React, { useEffect, useState } from "react";
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
import { useSessionVault } from "../vault/useSessionVault";

const Login: React.FC = () => {
  const { error } = useAuthConnect();
  const { login, isAuthenticated, canUnlock } = useSessionVault();
  const router = useIonRouter();

  const [unlock, setUnlock] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      (await canUnlock()) && setUnlock(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      (await isAuthenticated()) && router.push("tabs/tab1", "none", "replace");
    })();
  }, [isAuthenticated, router]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Can We Unlock the Vault? {unlock.toString()}</p>
        <IonButton expand="block" onClick={() => login()}>
          Login
        </IonButton>
        {error && <p className="ion-padding">{JSON.stringify(error)}</p>}
      </IonContent>
    </IonPage>
  );
};
export default Login;
