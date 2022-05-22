import React from "react";
import { truncateWalletAddress } from "../lib/wallet";


const KioskLayout = ({ children }) => {

  return (
      <div className="flex items-center justify-center mt-5 px-20">
        {children}
      </div>
  );
};

export default KioskLayout;