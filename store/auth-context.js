// this is a cookie type of thing like in browser
// stores the current login token in the user's device
import { createContext, useState } from "react";
export const AuthContext = createContext({
  // we need these here because they help with code autocompletion
  token: "",
  // this one tells us whether the user is logged in or not
  isAuthenticated: false,
  // this method gets triggered when the user is successfully logged in
  authenticate: (token) => {},
  // this method gets triggered when the user is successfully logged out
  logout: () => {},
});

// this function will be wrapped around the components in which
// we want to have access to the context
function AuthContextProvider({ children }) {
  // the token is undefined initially since we have no token at first
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  // thru this object we get access to the below properties
  // it is passed to the AuthContext.Provider below
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  // this is how the wrapping this function around other components works
  // {children} is the other components that are inside.
  // For example <Context><SignUpScreen></SignUpScreen></Context>
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
