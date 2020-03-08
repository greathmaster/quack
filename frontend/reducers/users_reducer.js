import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_ALL_USERS} from '../actions/session_actions'

const usersReducer = function(prevState = {}, action) {
	Object.freeze(prevState)
	let newState = Object.assign({}, prevState)
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			//Careful when new users are added, you will have to merge it with
			//current state vs replacing (as you are now)
			newState = {[action.currentUser.id]: action.currentUser}
			return newState;
			case RECEIVE_ALL_USERS:
				//TODO: Fix this bug! Usernames and timestamps don't show up for non-logged in users
				//Also check for N+1 queries
			return {...newState, ...action.otherUsers}

		case LOGOUT_CURRENT_USER:
			return {}
	
		default:
			return prevState;
	}
}

export default usersReducer