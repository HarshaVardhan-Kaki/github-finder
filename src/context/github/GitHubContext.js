import { createContext, useReducer } from 'react';
import gitHubReducer from './GitHubReducer';

const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    currentUser: {},
    repos: [],
    isLoading: false,
  };

  // dispatch is to dispatch an action to reducer
  const [state, dispatch] = useReducer(gitHubReducer, initialState);

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
