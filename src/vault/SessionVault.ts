import { isPlatform } from "@ionic/react";
import {
  IonicIdentityVaultUser,
  AuthMode,
  IonicNativeAuthPlugin,
} from "@ionic-enterprise/identity-vault";
import { BrowserVaultPlugin } from "./BrowserVaultPlugin";
import { User } from "../models/User";

export class SessionVault extends IonicIdentityVaultUser<User> {
  private static instance: SessionVault | undefined = undefined;

  private constructor() {
    super(
      { ready: () => Promise.resolve(true) },
      { authMode: AuthMode.PasscodeOnly, lockAfter: 300 }
    );
  }

  public static getInstance(): SessionVault {
    if (!SessionVault.instance) {
      SessionVault.instance = new SessionVault();
    }
    return SessionVault.instance;
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (isPlatform("capacitor")) return super.getPlugin();
    return BrowserVaultPlugin.getInstance();
  }
}
