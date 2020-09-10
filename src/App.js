import React from 'react';
//import './App.css';
import { Switch, Route } from "react-router-dom";
// import Header from "./Components/header/header";
import HomePage from "./pages/homepage/homepage";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
