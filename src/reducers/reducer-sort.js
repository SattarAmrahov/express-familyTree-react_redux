
const sortByName = (sortedMembers) => {
  sortedMembers.sort(function compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  });
  return sortedMembers;
}

const sortBySurname = (sortedMembers) => {
  sortedMembers.sort(function compare(a,b) {
    if (a.surname < b.surname)
      return -1;
    if (a.surname > b.surname)
      return 1;
    return 0;
  });
  return sortedMembers;
}

const sortByAge = (sortedMembers) => {
  sortedMembers.sort(function(a, b){return a.age - b.age});
  return sortedMembers;
}





export default function(state=null, action){
  let sortedMemberArray = [];
  switch (action.type) {
    case 'SORT_BY_NAME':
      sortedMemberArray = sortByName(action.payload);
      return sortedMemberArray;
    case 'SORT_BY_AGE':
      sortedMemberArray = sortByAge(action.payload);
      return sortedMemberArray;
    case 'SORT_BY_SURNAME':
      sortedMemberArray = sortBySurname(action.payload);
      return sortedMemberArray;
    default:
      return state;

  }
}
