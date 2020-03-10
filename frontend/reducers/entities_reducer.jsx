import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import messagesReducer from "./messagesReducer"
import channelsReducer from "./channels_reducer"
import searchReducer from "./search_reducer"


const entitiesReducer = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
  channels: channelsReducer,
  search: searchReducer
});

export default entitiesReducer;