import React from "react";
import { Route } from "react-router-dom";
import CampaignDashboard from "./CampaignDashboard/CampaignDashboard";

const App = () => {
  return (
    <div>
      <Route path="/" exact component={CampaignDashboard} />
    </div>
  );
};

export default App;
