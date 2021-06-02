import { FC, Suspense, useEffect, memo } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { routes } from "./routes";

import { update } from "./store/slice/router.slice";
import { RootState } from "./store";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const to = useSelector((state: RootState) => state.router.to);

  useEffect(() => {
    dispatch(
      update({
        to: location.pathname,
        from: to,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

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

export default memo(App);
