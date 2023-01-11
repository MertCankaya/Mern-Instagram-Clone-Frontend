import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./components/spinner/Spinner";
import RouterPage from "./pages/RouterPage";
import SignPage from "./pages/signing/SignPage";
import { getLoggedUserRequest } from "./store/auth/slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("userId")) {
      dispatch(getLoggedUserRequest());
    }
  }, [dispatch]);

  const isAuthorized = useSelector(({ auth: { user } }) => user);
  const loading = useSelector(({ auth: { loading } }) => loading);

  return (
    <div className="app">
      {loading && !isAuthorized ? (
        <Spinner />
      ) : (
        <Routes>
          {isAuthorized ? (
            <>
              <Route path="*" element={<RouterPage />} />
            </>
          ) : (
            <Route path="*" element={<SignPage />} />
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
