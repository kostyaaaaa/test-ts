// USER ACTIONS ENUMS
enum Actions {
  FETCH_USER_DATA = "FETCH_USER_DATA",
}

enum BasicActions {
  FETCH_USER_DATA_LOADING = "FETCH_USER_DATA_LOADING",
  FETCH_USER_DATA_ERROR = "FETCH_USER_DATA_ERROR",
}

// TYPES AND INTERFACES
type UserType = {
  email: string;
  username: string;
  website: string;
  name: string;
  phone: string;
  id: number;
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
};

type UserBasicActions = {
  type: BasicActions;
};

type UserActions = {
  type: Actions;
  payload: UserType;
};

type UserAction = UserBasicActions | UserActions;

type UserState = {
  user: UserType;
  isLoading: boolean;
  isError: boolean;
};

// INITIAL STATE
const initialState: UserState = {
  user: {
    email: "",
    username: "",
    website: "",
    name: "",
    phone: "",
    id: 0,
    company: {
      name: "",
      bs: "",
      catchPhrase: "",
    },
    address: {
      city: "",
      geo: {
        lat: "",
        lng: "",
      },
      street: "",
      suite: "",
      zipcode: "",
    },
  },
  isLoading: false,
  isError: false,
};

// REDUCER
const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case Actions.FETCH_USER_DATA:
      return { ...state, user: action.payload, isLoading: false, isError: false };
    case BasicActions.FETCH_USER_DATA_ERROR:
      return { ...state, isLoading: false, isError: true };
    case BasicActions.FETCH_USER_DATA_LOADING:
      return { ...state, isLoading: true, isError: false };
    default:
      return state;
  }
};

export default userReducer;
