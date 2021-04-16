import React, { useContext, useEffect, useState } from "react";
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
import { SessionVaultContext } from "../vault/SessionVaultContext";

const Login: React.FC = () => {
  const { error, isAuthenticated } = useAuthConnect();
  const { login, canUnlock, isLocked, checkLockStatus, unlock } = useContext(
    SessionVaultContext
  );
  const router = useIonRouter();

  useEffect(() => {
    checkLockStatus();
  }, []);

  useEffect(() => {
    !isLocked && isAuthenticated && router.push("tabs/tab1", "none", "replace");
  }, [isLocked, isAuthenticated, router]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {canUnlock && (
          <IonButton expand="block" onClick={() => unlock()}>
            Unlock
          </IonButton>
        )}

        <IonButton
          expand="block"
          onClick={() => login()}
          fill={canUnlock ? "clear" : "solid"}
        >
          {canUnlock ? "Sign In Instead" : "Login"}
        </IonButton>
        {error && <p className="ion-padding">{JSON.stringify(error)}</p>}
      </IonContent>
    </IonPage>
  );
};
export default Login;
