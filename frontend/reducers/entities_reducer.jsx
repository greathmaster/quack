import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import messagesReducer from "./messagesReducer"
import channelsReducer from "./channels_reducer"


const entitiesReducer = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
  channels: channelsReducer
});

export default entitiesReducer;