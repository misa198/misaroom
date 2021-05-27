import { FC, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "./routes";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Switch>
        {routes.map((route) => (
          <Route
            component={route.component}
            exact={route.exact}
            path={route.path}
            key={route.path}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default App;
