const defaultState = {
  contacts: [],
  contact: {name: {}},
  loading: false,
  errors: {}
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'NEW_CONTACT': {
      return {
        ...state,
        contact: { name: {} }
      };
    }

    case 'FETCH_CONTACTS_FULFILLED': {
      return {
        ...state,
        contacts: action.payload.data.data,
        contact: { name: {}},
        loading: false,
        errors: {}
      };
    }

    case 'FETCH_CONTACTS_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      };
    }

    case 'FETCH_CONTACTS_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.message }
      };
    }

    // case 'SAVE_CONTACT': {
    //   const result = {
    //     ...state,
    //     contacts: [...state.contacts, action.payload],
    //     errors: {},
    //     loading: false
    //   };
    //   return result;
    // }

    case 'SAVE_CONTACT_PENDING': {
      return {
        ...state,
        loading: true
      };
    }

    case 'SAVE_CONTACT_FULFILLED': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload.data.data],
        errors: {},
        loading: false
      };
    }

    case 'SAVE_CONTACT_REJECTED': {
      const data = action.payload.response.data;
      // convert feathers error formatting to match client-side error formatting
      const { 'name.first': first, 'name.last': last, phone, email } = data.errors;
      const errors = { global: data.message, name: { first, last }, phone, email };
      return {
        ...state,
        errors,
        loading: false
      };
    }

    default:
      return state;
  }
};
