import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {SubmissionError} from 'redux-form';
import {connect} from 'react-redux';
import {newContact, saveContact} from '../actions/contact-actions';
import AddContactForm from './components/AddContactForm';

class AddContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    this.props.newContact();
  }

  submit = (contact) => {
    return this
      .props.saveContact(contact).then(response => this.setState({ redirect: true }))
      .catch((err) => {
        throw new SubmissionError(this.props.errors);
      });
  }

  render() {
    return (
      <div>
        <h2>Add Contact Form</h2>
        <hr />
        {this.state.redirect
          ? <Redirect to="/" />
          : <AddContactForm
            contact={this.props.contact}
            loading={this.props.loading}
            onSubmit={this.submit} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { contact: state.contactReducer.contact, errors: state.contactReducer.errors };
}

export default connect(mapStateToProps, { newContact, saveContact })(AddContactPage);
