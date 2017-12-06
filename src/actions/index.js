export const addFamilyMember = ( newMember ) => {
  console.log('ADDDD', newMember);
  return {
    type: 'ADD_MEMBER',
    newMember: newMember
  }
}

export const deleteMember = (id) => {
  return {
    type: 'DELETE_MEMBER',
    deletedMemberId: id
  }
}

export const updateMember = (updatedMember) => {
  return {
    type: 'UPDATE_MEMBER',
    updatedMember
  }
}




export const openAddModal = (opened) => {
  return {
    type: 'OPEN_ADD_MODAL',
    open: opened
  }
}

export const openUpdateModal = (opened) => {
  return {
    type: 'OPEN_UPDATE_MODAL',
    open: opened
  }
}


// Sort by name
export const sortByName = (memberArray) => {
  return {
    type: 'SORT_BY_NAME',
    payload: memberArray
  }
}
// Sort by Age
export const sortByAge = (memberArray) => {
  return {
    type: 'SORT_BY_AGE',
    payload: memberArray
  }
}
// Sort by Surname
export const sortBySurname = (memberArray) => {
  return {
    type: 'SORT_BY_SURNAME',
    payload: memberArray
  }
}
