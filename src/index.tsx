import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers, createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  Actions,
  ControlElement,
  HorizontalLayout,
  jsonformsReducer,
  mapDispatchToArrayControlProps,
  mapStateToArrayControlProps,
  NOT_APPLICABLE,
  VerticalLayout,
  withIncreasedRank
} from '@jsonforms/core';
import {materialArrayControlTester, materialFields, materialRenderers} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester'
import {MaterialArrayLayoutRenderer} from "@jsonforms/material-renderers/lib/layouts/MaterialArrayLayoutRenderer";

const data = {
  clients: [
    {
      firstName: 'bart'
    },
    {
      firstName: 'lisa'
    },
  ]
};

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      fields: materialFields,
      renderers: materialRenderers
    },
  }
);

store.dispatch(Actions.init(data, schema, uischema));
store.dispatch(Actions.registerRenderer(
  withIncreasedRank(1, materialArrayControlTester),
  connect(mapStateToArrayControlProps, mapDispatchToArrayControlProps)(MaterialArrayLayoutRenderer))
);
store.dispatch(Actions.registerUISchema(
  (jsonSchema, schemaPath) => {
    return schemaPath === '#/properties/clients' ? 2 : NOT_APPLICABLE;
  },
  {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/clientId'
          } as ControlElement,
          {
            type: 'Control',
            scope: '#/properties/startDate'
          },
          {
            type: 'Control',
            scope: '#/properties/endDate'
          }
        ]
      } as HorizontalLayout,
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/firstName'
          } as ControlElement,
          {
            type: 'Control',
            scope: '#/properties/middleName'
          },
          {
            type: 'Control',
            scope: '#/properties/lastName'
          }
        ]
      }  as HorizontalLayout,
    ]
  } as VerticalLayout
));




// Uncomment this line (and respective import) to register our custom renderer
store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
