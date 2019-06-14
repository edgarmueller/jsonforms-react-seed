import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {getData, JsonFormsState} from '@jsonforms/core';
import { JsonForms, JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Tabs, Tab } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import { materialRenderers } from '@jsonforms/material-renderers';

const styles = createStyles({
  container: {
    padding: '1em'
  },
  title: {
    textAlign: 'center',
    padding: '0.25em'
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem'
  }
});

export interface AppProps extends WithStyles<typeof styles> {
  dataAsString: string;
}

const App = ({ classes, dataAsString }: AppProps) => {
  const [tabIdx, setTabIdx] = useState(0);
  function handleTabChange(event: any, newValue: number) {
    setTabIdx(newValue);
  }
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to JSON Forms with React</h1>
          <p className="App-intro">More Forms. Less Code.</p>
        </header>
      </div>

      <Tabs value={tabIdx} onChange={handleTabChange}>
        <Tab label="via Redux" />
        <Tab label="Standalone" />
      </Tabs>

      {tabIdx === 0 &&
        <Grid container justify={'center'} spacing={1} className={classes.container}>
          <Grid item sm={6}>
            <Typography
              variant={'h3'}
              className={classes.title}
            >
              Bound data
            </Typography>
            <div className={classes.dataContent}>
              <pre>{dataAsString}</pre>
            </div>
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant={'h3'}
              className={classes.title}
            >
              Rendered form
            </Typography>
            <div className={classes.demoform}>
              <JsonFormsReduxContext>
                <JsonFormsDispatch />
              </JsonFormsReduxContext>
            </div>
          </Grid>
        </Grid>
      }
      {tabIdx === 1 &&
        <div className={classes.demoform} style={{ maxWidth: 1000 }}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={{
              name: 'Send email to Adrian',
              description: 'Confirm if you have passed the subject\nHereby ...',
              done: true,
              recurrence: 'Daily',
              rating: 3,
            }}
            renderers={materialRenderers}
          />
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={{
              name: undefined,
              due_date: '2019-06-19',
              description: 'Confirm if you have passed the subject\nHereby ...',
              done: true,
              recurrence: 'Daily',
              rating: 3,
            }}
            renderers={materialRenderers}
          />
        </div>
      }
    </Fragment>
  );
};

const mapStateToProps = (state: JsonFormsState) => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) }
};

export default connect(mapStateToProps)(withStyles(styles)(App));

