import React from "react";
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

interface User {
  name: string;
  picture: string;
  email: string;
}

const UserCard: React.FC = () => {
  const {
    accessToken,
    isAuthenticated,
    idToken,
    logout,
  } = useAuthConnect<User>();

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
