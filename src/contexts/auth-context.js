import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { serverUrl } from 'src/utils/backend-url';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let loggedUser = {
      id: null,
      avatar: null,
      name: null,
      email: null,
      role: null,
    }

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      if(isAuthenticated) {
        loggedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'));
      }
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: loggedUser
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    const loggedUser = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Skip',
      email: 'Skip@email.com',
      role: 'skip',
    };

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: loggedUser
    });
  };

  const signIn = async (email, password) => {
    const response = await axios.get(`${serverUrl}/credentials/certain/${email}`);
    const userAuth = response.data;
    const isExist = userAuth.length > 0;
    if (!isExist) {
      throw new Error('User not found, please check your email / username.');
    }
    
    const userExist = userAuth[0];
    const samePassword = userExist && userExist.password === password;
    if (!samePassword) {
      throw new Error('Incorrect password, please re-entry correct password.');
    } 
    
    const loggedUser = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: userExist.username,
      email: userExist.email,
      role: userExist.role,
    };

    const anotherResponse = await axios.patch(`${serverUrl}/credentials/last_login/${userExist.username}`);
    if (!anotherResponse.data.includes('success')) {
      throw new Error('Failed to login, please try again.');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
    catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: loggedUser
    });
    
  };

  const signUp = async (username, email, password, role, first_name, last_name, gender) => {
    // throw new Error('Sign up is not implemented');
    const body = {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      gender,
    };
    const response = await axios.post(`${serverUrl}/credentials/add`, body);
    const failed = response.data.includes('Failed');
    if (failed) {
      throw new Error('Username/email already exist! Please try another one');
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
