import React from 'react';
import routes from "./routes"
import {useRoutes} from "react-router-dom";

function App() {

  const outlet = useRoutes(routes)

  return (
    <div>
      {outlet}
    </div>
  );
}

export default App;
