import { createStore, bindActionCreators } from 'redux';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';

// Dummy data for app
const attendeeList = [{
    name: 'Charlie Kelly',
    color: '#E74C3C',
    id: 1
}, {
    name: 'Mac',
    color: '#553285',
    id: 2
}, {
    name: 'Frank Reynolds',
    color: '#296AA8',
    id: 3
}, {
    name: 'Deandra Reynolds',
    color: '#202020',
    id: 4
}, {
    name: 'Dennis Reynolds',
    color: '#287572',
    id: 5
} ];

/* --- COMPONENTS --- */

/**
 * Componente inicial
 */

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Attendees</h1>
        <hr />
        <AddAttendee {...this.props} />
        <hr />
        <Attendees {...this.props} />
      </div>
    );
  }
}

/**
 * Componentes complementarios
 */

class Attendees extends React.Component {
  render() {
    return(
      <ul className="attendees">
        {this.props.attendees.map((attendee, index) =>
          <li className="attendees__attendee" key={index}>
            <Badge attendee={attendee} />
            <RemoveAttendee removeAttendee={this.props.removeAttendee} index={index} />
          </li>
        )}
      </ul>
    );
  }
}

class Badge extends React.Component {
  render() {
    let style = {backgroundColor: this.props.attendee.color};
    return (
      <div className="hello-badge" style={style}>
        <p className="hello-badge__title">
          <span className="hello-badge__hello">Hello<br /></span> my name is
        </p>
        <p className="hello-badge__name">
          {this.props.attendee.name}
        </p>
      </div>
    );
  }
}

class AddAttendee extends React.Component {

  handleSubmit(e) {
    // Stop page refreshing
    e.preventDefault();
    // Store reference to our form references
    let refs = this.refs;
    // Users name
    let name = refs.name.value;
    // Users favourite colour
    let color = refs.color.value
    // Trigger action
    this.props.addAttendee(name, color);
    // Reset form so our inputs are empty again
    refs.addAttendee.reset();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-6 col-xs-offset-3">
          <form ref="addAttendee" onSubmit={this.handleSubmit.bind(this)}>
            <label for="name">Name</label>
            <br />
            <input id="name" className="form-control" type="text" ref="name" placeholder="John Doe" />
            <br />
            <label for="color">Favourite color</label>
            <br />
            <input id="color" className="form-control" type="text" ref="color" placeholder="#2e2e2e" />
            <br />
            <button type="submit" className="button btn">Add attendee</button>
          </form>
        </div>
      </div>
    );
  }
}

class RemoveAttendee extends React.Component {
  handleOnClick() {
    let index = this.props.index;
    this.props.removeAttendee(index);
  }
  render() {
    return (
      <button className="alert button tiny btn
      " onClick={this.handleOnClick.bind(this)}> &times; Remove attendee</button>
    );
  }
}

/* --- END-COMPONENTS --- */


/* --- REDUCERS --- */
function reducer(state = [], action) {
  switch (action.type) {
    case 'ADD_ATTENDEE':
      // Return a new array with old state and added attendee.
      return [{
              name: action.name,
              color: action.color
          },
          ...state
      ];
    case 'REMOVE_ATTENDEE':
      return [
        // In the array grab the state from beginning to index of one to delete
        ...state.slice(0, action.index),
        // Grab state from the one after one we want to delete
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

/* --- ACTIONS --- */
const actions = {
  addAttendee: (name, color) => {
    return {
      // String for Reducer to pick up
      type: 'ADD_ATTENDEE',
      // Randomly generated id
      id: 5,
      // Name and colour we sent through from the form
      name,
      color
    }
  },
  removeAttendee: (index) => {
    return {
      type: 'REMOVE_ATTENDEE',
      index
    }
  }
};

/* --- STORE --- */

// esta funcion es para enviar toda la data necesaria al prop

function mapStateToProps(state) {
  return {
    attendees: state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(actions, dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

const store = createStore(reducer, attendeeList);

/* --- Render --- */

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
