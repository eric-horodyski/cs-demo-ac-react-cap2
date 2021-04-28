import { useAuthConnect } from "@ionic-enterprise/auth-react";
import {
  AuthMode,
  LockEvent,
  VaultConfig,
} from "@ionic-enterprise/identity-vault";
import React, { createContext, useEffect, useState } from "react";
import { SessionVault } from "./SessionVault";

export const SessionVaultContext = createContext<{
  isLocked: boolean;
  canUnlock: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkLockStatus: () => Promise<void>;
  unlock: () => Promise<void>;
}>({
  isLocked: false,
  canUnlock: false,
  login: async () => {},
  logout: async () => {},
  checkLockStatus: async () => {},
  unlock: async () => {},
});

export const SessionVaultProvider: React.FC = ({ children }) => {
  const vault = SessionVault.getInstance();
  const {
    login: authConnectLogin,
    logout: authConnectLogout,
    checkIsAuthenticated,
    isAuthenticated,
    idToken,
  } = useAuthConnect();
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [canUnlock, setCanUnlock] = useState<boolean>(false);

  useEffect(
    () =>
      console.log("E: isAuthenticated Subscription Update", isAuthenticated),
    [isAuthenticated]
  );

  useEffect(() => console.log("E:Vault Context idToken", idToken), [idToken]);

  const login = async () => {
    await vault.logout();
    await vault.setAuthMode(await getAuthMode());
    await authConnectLogin();
    setIsLocked(false);
  };

  const logout = async () => {
    await authConnectLogout();
    await vault.logout();
    setIsLocked(true);
  };

  const checkLockStatus = async (): Promise<void> => {
    if (!(await vault.hasStoredSession())) {
      setCanUnlock(false);
    } else {
      const v = await vault.getVault();
      setCanUnlock(await v.isLocked());
    }
  };

  const unlock = async (): Promise<void> => {
    try {
      await vault.restoreSession();
      setIsLocked(false);
      setCanUnlock(false);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  vault.onVaultLocked = (event: LockEvent) => {
    setIsLocked(true);
  };

  vault.onVaultUnlocked = async (config: VaultConfig) => {
    await checkIsAuthenticated();
    setIsLocked(false);
  };

  const getAuthMode = async (): Promise<AuthMode> => {
    return (await vault.isBiometricsAvailable())
      ? AuthMode.BiometricOnly
      : AuthMode.PasscodeOnly;
  };

  return (
    <SessionVaultContext.Provider
      value={{
        isLocked,
        canUnlock,
        login,
        logout,
        checkLockStatus,
        unlock,
      }}
    >
      {children}
    </SessionVaultContext.Provider>
  );
};
