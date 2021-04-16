import React, { useContext } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLabel,
  IonItem,
  IonAvatar,
  IonButton,
} from "@ionic/react";
import { useAuthConnect } from "@ionic-enterprise/auth-react";
import { User } from "../models/User";
import { SessionVaultContext } from "../vault/SessionVaultContext";

const UserCard: React.FC = () => {
  const { accessToken, isAuthenticated, idToken } = useAuthConnect<User>();
  const { logout, isLocked } = useContext(SessionVaultContext);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>User Info</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img src={idToken?.picture} alt={idToken?.name} />
          </IonAvatar>
          <IonLabel>
            <h2>{idToken?.name}</h2>
            <p>{idToken?.email}</p>
            <p>Status: {isAuthenticated ? "Signed In" : "Signed Out"}</p>
            <p>Vault: {isLocked ? "Locked" : "Unlocked"}</p>
            <p>Access Token: {accessToken}</p>
          </IonLabel>
        </IonItem>
        <IonButton expand="full" onClick={() => logout()}>
          Logout
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
export default UserCard;
