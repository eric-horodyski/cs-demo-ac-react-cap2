import { LockEvent, VaultConfig } from "@ionic-enterprise/identity-vault";
import React, { createContext, useState } from "react";
import { SessionVault } from "./SessionVault";

export const SessionVaultContext = createContext<{
  isLocked: boolean;
  vault: SessionVault;
}>({ isLocked: false, vault: SessionVault.getInstance() });

export const SessionVaultProvider: React.FC = ({ children }) => {
  const vault = SessionVault.getInstance();
  const [isLocked, setIsLocked] = useState<boolean>(true);

  vault.onVaultLocked = (event: LockEvent) => {
    setIsLocked(true);
    console.log("E:/onVaultLocked", isLocked);
  };

  vault.onVaultUnlocked = (config: VaultConfig) => {
    setIsLocked(false);
    console.log("E:/onVaultUnlocked", isLocked);
  };

  return (
    <SessionVaultContext.Provider value={{ isLocked, vault }}>
      {children}
    </SessionVaultContext.Provider>
  );
};
