import { useState, useContext } from 'react';
import GitHubContext from '../../context/github/GitHubContext';
import AlertContext from '../../context/alert/AlertContext';
import { fetchUsers } from '../../context/github/GitHubActions';

const UserSearch = () => {
  const [text, setText] = useState('');
  const { users, dispatch } = useContext(GitHubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('please enter something', 'error');
    } else {
      // step 1 - set loading to true
      dispatch({
        type: 'SET_LOADING',
      });

      // step 2 call api
      const users = await fetchUsers(text);

      // step 3 - set users in state
      dispatch({
        type: 'GET_USERS',
        payload: users,
      });

      // step 4 - set local search text to ''
      setText('');
    }
  };

  const handleClear = () => {
    dispatch({
      type: 'CLEAR_USERS',
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;

// we have some functions in context that will dispatch some kind of action to reducer. Reducer looks at that action and updates the state. Any component that use any part of that state that reacts to that (component changes accordingly). So we have single source of truth for the state.
