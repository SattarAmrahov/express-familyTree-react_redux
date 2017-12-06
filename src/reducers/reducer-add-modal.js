export default function(state=false, action){
  let isModalOpen = null;
  switch (action.type) {
    case 'OPEN_ADD_MODAL':
      isModalOpen = action.open;
      return isModalOpen;
    default:
    return state;

  }
}
