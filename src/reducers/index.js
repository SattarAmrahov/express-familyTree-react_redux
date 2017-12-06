import { combineReducers } from 'redux';
import MemberReducer from './reducer-members';
import addModalReducer from './reducer-add-modal';
import updateModalReducer from './reducer-update-modal';
import SortMembersReducer from './reducer-sort';

const allReducers = combineReducers({
  myFamily: MemberReducer,
  addModalOpen: addModalReducer,
  updateModalOpen: updateModalReducer,
  sortMembers: SortMembersReducer
});


export default allReducers;
