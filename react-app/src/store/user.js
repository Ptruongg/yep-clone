const GET_USERS = "/users";

const getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

export const getAllUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users`);

  const users = await response.json();
  dispatch(getUsers(users));
  return users;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS: {
      const newState = {};
      action.users.users.forEach((user) => (newState[user.id] = user));
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
