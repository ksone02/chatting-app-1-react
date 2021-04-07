import React from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function App() {
  /* jshint ignore:start */
  return (
    <div className="app">
      <div className="app_body">
          <Sidebar />
          <Chat />
      </div>
    </div>
  );
  /* jshint ignore:end */
}

export default App;
