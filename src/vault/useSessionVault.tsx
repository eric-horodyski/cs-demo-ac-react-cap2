import { useContext } from "react";
import { useAuthConnect } from "@ionic-enterprise/auth-react";
import { SessionVaultContext } from "./SessionVaultContext";
import { AuthMode } from "@ionic-enterprise/identity-vault";

export const useSessionVault = () => {
  const {
    login: authConnectLogin,
    logout: authConnectLogout,
    isAuthenticated: authConnectIsAuthenticated,
  } = useAuthConnect();
  const { vault } = useContext(SessionVaultContext);

  const login = async () => {
    await vault.logout();
    await vault.setAuthMode(await getAuthMode());
    await authConnectLogin();
  };

  const logout = async () => {
    await authConnectLogout();
    await vault.logout();
  };

  const isAuthenticated = async () => {
    const isVaultLocked = await isLocked();
    return !isVaultLocked && authConnectIsAuthenticated;
  };

  const canUnlock = async (): Promise<boolean> => {
    if (!(await vault.hasStoredSession())) return false;
    return isLocked();
  };

  const getAuthMode = async (): Promise<AuthMode> => {
    return (await vault.isBiometricsAvailable())
      ? AuthMode.BiometricOnly
      : AuthMode.PasscodeOnly;
  };

  const isLocked = async (): Promise<boolean> => {
    const v = await vault.getVault();
    return v.isLocked();
  };

  return { login, logout, isAuthenticated, canUnlock };
};
