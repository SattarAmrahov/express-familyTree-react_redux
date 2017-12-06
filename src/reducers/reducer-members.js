
let familyArray = [];
// Initial State
const initialState = [
  {
    id: 1,
    name: 'Sattar',
    surname: 'Amrahov',
    age: 25,
    parent: 0,
    avatar: 'https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463678',
    children: [
      {
        id: 2,
        name: 'John',
        surname: 'Doe',
        age: 23,
        avatar: 'https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463678',
        parent: 1
      },
      {
        id: 3,
        name: 'Lena',
        surname: 'Lisan',
        age: 40,
        avatar: 'https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463678',
        parent: 1
      }
    ]
  }

]

const getNestedChildren = (arr, parent) => {
     var out = [];
     for(var i in arr) {
         if(arr[i].parent === parent) {
             var children = getNestedChildren(arr, arr[i].id)

             if(children.length) {
                 arr[i].children = children
             }
             out.push(arr[i])
         }
     }
     return out
 }




const convertToArray = (family) => {
  if (typeof(family) === 'object') {
    familyArray.push({
      name: family.name,
      surname: family.surname,
      age: family.age,
      id: family.id,
      parent: family.parent,
      avatar: family.avatar
    });

    if (family.children) {
      for (var i = 0; i < family.children.length; i++) {
        convertToArray(family.children[i]);
      }
    }
  }
  return familyArray;
}


// Generate New Member object and return it
const generateMember = (action) => {
  return {
    name: action.newMember.name,
    surname: action.newMember.surname,
    age: action.newMember.age,
    parent: action.newMember.parent,
    avatar: action.newMember.avatar,
    id: Math.random()
  }
}


// remove Member by ID and return new state
const removeById = (state=initialState, id) => {
  const newMembers = state.filter((member)=> member.id !== id);
  return newMembers;
}

const updateFamilyMember = (members, updatedMember) => {
  var arr = [];
  members.findIndex((item)=>{
    if (item.id === updatedMember.id) {
      arr.push(updatedMember);
    } else {
      arr.push(item);
    }
  })
  return arr;
}


export default function(state=initialState, action) {
  familyArray = [];
  let arrayOfMembers = null;
  let members = null;
  let memberTree = null;
  switch (action.type) {
    case 'ADD_MEMBER':
      familyArray = [];
      arrayOfMembers = convertToArray(state[0]);
      members = [...arrayOfMembers, generateMember(action)];
      memberTree = getNestedChildren(members, 0);
      return memberTree;
    case 'DELETE_MEMBER':
      arrayOfMembers = convertToArray(state[0]);
      members = removeById(arrayOfMembers, action.deletedMemberId);
      memberTree = getNestedChildren(members, 0);
      return memberTree;
    case 'UPDATE_MEMBER':
      familyArray = [];
      arrayOfMembers = convertToArray(state[0]);
      members = updateFamilyMember(arrayOfMembers, action.updatedMember);
      memberTree = getNestedChildren(members, 0);
      return memberTree;
    default:
      return state;
  }
}
