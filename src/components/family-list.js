import React, { Component } from 'react';
import { connect } from 'react-redux';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Info from 'material-ui-icons/Info';

import { sortByName, sortByAge, sortBySurname } from '../actions/index';


class FamilyList extends Component {
  constructor(props){
    super(props);
    this.state = ({
      sortingValue: '',
      sortMembers: {payload:[]}
    })
    console.log('constructor');
  }


  handleSortingChange = (event, index, value) => {
    this.setState({sortingValue: value})
  }

  listMembers(members){
    // this.setState({sortMembers : sortedMembers});
    console.log('this.props', this.props);
    let sortedMembers = members;
    if (typeof(members) === 'object') {
      return (
        <div>
          <div className='sorting'>
            <p className='sorting-text'>Sort by:</p>
            <DropDownMenu className='sorting-menu' value={this.state.sortingValue} onChange={(event, index, value)=> {this.handleSortingChange(event, index, value)}}>
              <MenuItem value={1} primaryText="Name"
                onClick={()=>{
                  this.setState({sortMembers : this.props.sortByName(sortedMembers)})
                }}
                />
              <MenuItem value={2} primaryText="Surname"
                onClick={()=>{
                  this.setState({sortMembers : this.props.sortBySurname(sortedMembers)})
                }} />
              <MenuItem value={3} primaryText="Age"
                 onClick={() => {
                   this.setState({sortMembers : this.props.sortByAge(sortedMembers)})
                 }} />
            </DropDownMenu>
          </div>


        <div className='family-list-sorting'>
          {
          this.props.family.map(member => {
            console.log('Member', member);
            let memberInfo = `${member.name} ${member.surname} - ${member.age}`;
            return (
             <ListItem
               key={member.id}
               primaryText={memberInfo}
               leftAvatar={<Avatar src={member.avatar} />}
               rightIcon={<Info />}
             />


            )
          })
        }
      </div>

    </div>
      )
    } else {
        return(
          <div className="teessst">{members}</div>
        )
    }

  } // end renderMembers function



  render() {

    return (
      this.listMembers(this.props.family)
    )
  }

} // end FamilyList class


function mapStateToProps(state){
  return {
    sortMembers: state.sortMembers
  }
}


export default connect(mapStateToProps, { sortByName, sortByAge, sortBySurname })(FamilyList);
