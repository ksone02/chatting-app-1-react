import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    /* jshint ignore:start */
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
    /* jshint ignore:end */
);

export const useStateValue = () => useContext(StateContext);