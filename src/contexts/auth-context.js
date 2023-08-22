import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { serverUrl } from 'src/utils/backend-url';
import bcrypt from 'bcryptjs';

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
      username: null,
      email: null,
      password: null,
      role: null,
      firstName: null,
      lastName: null,
      phone: null,
      gender: null,
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

  const signIn = async (email, password) => {
    const response = await axios.get(`${serverUrl}/credentials/certain/${email}`);
    const userAuth = response.data;
    const isExist = userAuth.length > 0;
    if (!isExist) {
      throw new Error('User not found, please check your email / username.');
    }
    
    const userExist = userAuth[0];
    const samePassword = userExist && bcrypt.compareSync(password, userExist.password);
    if (!samePassword) {
      throw new Error('Incorrect password, please re-entry correct password.');
    }
    
    const loggedUser = {
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
      password: userExist.password,
      role: userExist.role,
      firstName: userExist.first_name,
      lastName: userExist.last_name,
      phone: userExist.phone,
      gender: userExist.gender,
    };

    const anotherResponse = await axios.patch(`${serverUrl}/credentials/last_login/${userExist.username}`);
    if (!anotherResponse.data.includes('success')) {
      throw new Error('Failed to login, please try again.');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      window.sessionStorage.setItem('type', 'create');
      window.sessionStorage.setItem('ip', '192.168.0.23');
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
