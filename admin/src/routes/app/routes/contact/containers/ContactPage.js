import React from 'react';
import APPCONFIG from 'constants/Config';
import QueueAnim from 'rc-queue-anim';
import {hashHistory} from 'react-router';

import { connect } from 'react-redux';
import {fetchContacts, newContact, saveContact} from '../actions/contact-actions';
import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    this.props.fetchContacts();
  }

  submit = (values) => {
    this.props.saveContact(values);
  }

  render() {
    return (
      <section className="container-fluid with-maxwidth chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1">
            <h2>Contact Page</h2>
            <ContactList contacts={this.props.contacts} />
            <hr />
            <AddContactForm onSubmit={this.submit} />
          </div>
        </QueueAnim>
      </section>
    );
  }
}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {contacts: state.contactReducer.contacts};
}

module.exports = connect(mapStateToProps, {fetchContacts, saveContact})(ContactPage);
