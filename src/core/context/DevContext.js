import React from "react";

const DevContext = React.createContext();

export default DevContext;

export const useDevContext = () => React.useContext(DevContext);