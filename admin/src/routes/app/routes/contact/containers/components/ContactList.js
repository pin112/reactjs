import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [-1],
    };
  }

  handleRowSelection = (selectedRows) => {
    this.setState({ selected: selectedRows, });
    const contact = this.props.contacts[selectedRows];
    console.log(contact);
  };

  isSelected = index => (this.state.selected.indexOf(index) !== -1);

  render() {
    const table = (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>No.</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.contacts.map((contact, index) => (
              <TableRow key={index} selected={this.isSelected(index)}>
                <TableRowColumn>{index + 1}</TableRowColumn>
                <TableRowColumn>{contact.name.first}</TableRowColumn>
                <TableRowColumn>{contact.name.last}</TableRowColumn>
                <TableRowColumn>{contact.email}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    );

    return (
      <div>
        <h3>Selected row index: {this.state.selected}</h3>
        {table}
      </div>
    );
  }
}
