import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

class AddContactForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} >
          <div className="form-group row">
            <label htmlFor="name.first" className="col-md-2 control-label">First name</label>
            <div className="col-md-10">
              <Field name="name.first" component="input" className="form-control" type="text" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name.last" className="col-md-2 control-label">Last name</label>
            <div className="col-md-10">
              <Field name="name.last" component="input" className="form-control" type="text" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-md-2 control-label">Contact email</label>
            <div className="col-md-10">
              <Field name="email" component="input" className="form-control" type="email" />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-md-2 col-md-10">
              <RaisedButton type="submit" label="Add contact" className="btn-w-md" primary />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'AddContactForm'})(AddContactForm);

