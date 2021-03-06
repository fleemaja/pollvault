import { combineReducers } from 'redux'

import { polls } from './polls';
import { comments } from './comments';
import { flashMessages } from './flashMessages';
import { auth } from './users';

export default combineReducers({
  polls,
  comments,
  flashMessages,
  auth
})
