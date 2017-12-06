import React, { Component } from 'react';
import { connect } from 'react-redux';

import FamilyList from './family-list';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {List} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui-icons/Add';
import ContentRemove from 'material-ui-icons/Remove';
import ContentEdit from 'material-ui-icons/Edit';

import { addFamilyMember, deleteMember, updateMember, openAddModal, openUpdateModal} from '../actions/index';

// import MemberButtons from './member-buttons';
let familyArray = [];

class FamilyTree extends Component {
  constructor(props){
    super(props);
    this.state = ({
      name: '',
      surname: '',
      parent: '',
      age: '',
      avatar: 'https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463678'
    })
  }

  resetState(){
    this.setState({
      name: '',
      surname: '',
      age: '',
      parent: '',
      avatar: 'https://worldarts2015.s3-us-west-2.amazonaws.com/images/default-profile-picture.jpg?cache=1473463678'
    })
  }

  ///// CRUD /////
  createMember(){
    this.props.addFamilyMember(this.state);
    this.props.openAddModal(false);
  }

  deleteMemberHelper(id){
    this.props.deleteMember(id);
  }

  updateCurrentMember(){
    this.props.updateMember(this.state);
    this.props.openUpdateModal(false);
  }



  changeNameValue = ( changedState) => {
    this.setState({name: changedState})
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

    renderMemberButtons(member) {

      const actions = [];

      return(
        <div>
          <FloatingActionButton className="modal-trigger member-buttons add-button" mini={true} onClick={() => {

                this.setState({parent: member.id});
                this.props.openAddModal(true);
              }}>
             <ContentAdd />
           </FloatingActionButton>
           <Dialog
             title="Add New Member"
             actions={actions}
             modal={true}
             open={this.props.addModalState}
           >
             <form className='row' ref='form' onSubmit={(event)=>{event.preventDefault()}}>
                <div className="input-field col s12">
                  <input id="add-first-name" type="text" className="validate" onChange={(event)=>{this.setState({name: event.target.value})}}/>
                  <label htmlFor="add-first-name">First Name</label>
                </div>
                <div className="input-field col s12">
                 <input id="add-first-name" type="text" className="validate" onChange={(event)=>{this.setState({surname: event.target.value})}}/>
                 <label htmlFor="add-first-name">Last Name</label>
               </div>
               <div className="input-field col s12">
                <input id="add-age" type="text" className="validate" onChange={(event)=>{this.setState({age: event.target.value})}}/>
                <label htmlFor="add-age">Age</label>
              </div>
              <div className="input-field col s12">
               <input id="add-avatar" type="text" className="validate" onChange={(event)=>{this.setState({avatar: event.target.value})}}/>
               <label htmlFor="add-avatar">Image</label>
             </div>


               {/* <input type="text" onChange={(event)=>{this.setState({name: event.target.value})}}/>
               <input type="text" onChange={(event)=>{this.setState({surname: event.target.value})}}/> */}
               {/* <input type="text" onChange={(event)=>{this.setState({avatar: event.target.value})}}/> */}
               <div className='form-buttons'>
                 <RaisedButton className='form-button cancel-button' label="Cancel" onClick={()=>{this.props.openAddModal(false)}} />
                 <RaisedButton className='form-button submit-button'  label="Add" primary={true} onClick={()=> {this.createMember(); this.resetState()}} />
               </div>

             </form>
           </Dialog>

           <FloatingActionButton className='member-buttons delete-button' mini={true} onClick={() => {this.deleteMemberHelper(member.id)}}>
              <ContentRemove />
            </FloatingActionButton>

            <FloatingActionButton className="modal-trigger member-buttons edit-button" mini={true} onClick={() => {
                  this.props.openUpdateModal(true);
                  this.setState({...member});
                }}>
               <ContentEdit />
             </FloatingActionButton>
               <Dialog
                  title="Edit Member"
                  actions={actions}
                  modal={true}
                  open={this.props.updateModalState}
                >
                  <form className='row' ref='form' onSubmit={(event)=>{event.preventDefault()}}>

                    <div className="input-field col s12">
                      <input id="add-first-name" type="text" className="validate" value={this.state.name} onChange={(event)=>{this.setState({name: event.target.value})}}/>
                      <label className="active" htmlFor="add-first-name">First Name</label>
                    </div>
                    <div className="input-field col s12">
                     <input id="add-first-name" type="text" className="validate" defaultValue={this.state.surname} onChange={(event)=>{this.setState({surname: event.target.value})}}/>
                     <label className="active" htmlFor="add-first-name">Last Name</label>
                   </div>
                   <div className="input-field col s12">
                    <input id="add-age" type="text" className="validate" defaultValue={this.state.age} onChange={(event)=>{this.setState({age: event.target.value})}}/>
                    <label className="active" htmlFor="add-age">Age</label>
                  </div>
                  <div className="input-field col s12">
                   <input id="add-avatar" type="text" className="validate" defaultValue={this.state.avatar} onChange={(event)=>{this.setState({avatar: event.target.value})}}/>
                   <label className="active" htmlFor="add-avatar">Image</label>
                 </div>


                    {/* <input type="text" defaultValue={this.state.name} onChange={(event)=>{this.setState({name: event.target.value})}}/>
                    <input type="text" defaultValue={this.state.surname} onChange={(event)=>{this.setState({surname: event.target.value})}}/>
                    <input type="text" defaultValue={this.state.avatar} onChange={(event)=>{this.setState({avatar: event.target.value})}}/> */}
                    <div className='form-buttons'>
                      <RaisedButton className='form-button cancel-button' label="Cancel" onClick={()=>{this.props.openUpdateModal(false)}} />
                      <RaisedButton className='form-button submit-button' label="Save" primary={true} onClick={ () => {this.updateCurrentMember()}} />
                    </div>


                  </form>
                </Dialog>


        </div>

      )
    }




  renderMembers(members){
    if (typeof(members) === 'object') {
      return (
        <ul className='parent'>
          {
            members.map((memberOfFamily) => {
              return (
                <li className='member-list' key={memberOfFamily.id}>
                  <div className="member-list-item">{memberOfFamily.name} </div>
                  <div className="member-list-item" > { this.renderMemberButtons(memberOfFamily) } </div>
                  {this.renderMembers(memberOfFamily.children)}
                </li>
              )
            })
          }
        </ul>
      )
    } else {
        return(
          <div>{members}</div>
        )
    }

  } // end renderMembers function




  pushMembersToArray(family){
     let arr = [];
     family.map(person=>{
       arr.push(person);
     });
     return arr;

   }

    displayMemberList(familyArray){
      return this.listMembers(familyArray);
    }


    convertToArray = (family) => {
      if (typeof(family) === 'object') {
        familyArray.push({
          name: family.name,
          surname: family.surname,
          id: family.id,
          age: family.age,
          parent: family.parent,
          avatar: family.avatar
        });

        if (family.children) {
          for (var i = 0; i < family.children.length; i++) {
            this.convertToArray(family.children[i]);
          }
        }
      }
      return familyArray;
    }


    render() {
      familyArray = [];
     let arrayOfFamily = this.convertToArray(this.props.familyMembers[0]);
      return (
        <div className="">
          <div className="row">
            <div className="member-list col s4">
              <List>

                <FamilyList family={arrayOfFamily}>
                  {/* {this.convertToArray(this.props.familyMembers[0])} */}
                  {console.log('family list array')}
               </FamilyList>
                 {/* {this.displayMemberList(arrayOfFamily)} */}
               </List>
           </div>
            <div className="tree col s8">
              {this.renderMembers(this.props.familyMembers)}
            </div>
          </div>
        </div>
      );
    } // End render

} // end FamilyTree class


function mapStateToProps(state){
  return {
    familyMembers: state.myFamily,
    addModalState: state.addModalOpen,
    updateModalState: state.updateModalOpen
  }
}


export default connect(mapStateToProps, { addFamilyMember, deleteMember, updateMember, openAddModal, openUpdateModal })(FamilyTree);
