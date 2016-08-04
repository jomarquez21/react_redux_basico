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
        <ul>
          {this.props.attendees.map((attendee, index) =>
            <li className="attendees__attendee" key={attendee.id}>
              <Badge attendee={attendee} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

/**
 * Componentes complementarios
 */

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

/* --- REDUCERS --- */
function reducer(state = [], action) {
  return state;
};

/* --- ACTIONS --- */
const actions = {};

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

if (typeof window !== 'undefined') {
    window.React = React;
}