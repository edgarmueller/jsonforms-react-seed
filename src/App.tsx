import {connect} from 'react-redux';
import {JsonForms} from '@jsonforms/react';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles, {WithStyles} from "@material-ui/core/styles/withStyles";
import {getData, JsonFormsState, mapDispatchToArrayControlProps, mapStateToArrayControlProps} from '@jsonforms/core';
import logo from './logo.svg';
import './App.css';
import createStyles from "@material-ui/core/styles/createStyles";
import {MaterialArrayLayoutRenderer} from "@jsonforms/material-renderers/lib/layouts/MaterialArrayLayoutRenderer";

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
    margin: 'auto'
  }
});

export interface AppProps extends WithStyles<typeof styles> {
  dataAsString: string;
}

class App extends React.Component<AppProps, any> {

  render() {
    const { classes, dataAsString } = this.props;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to JSON Forms with React</h1>
            <p className="App-intro">More Forms. Less Code.</p>
          </header>
        </div>

        <Grid container justify={'center'} spacing={24} className={classes.container}>
          <Grid item sm={6}>
            <Typography
              variant={'display1'}
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
              variant={'display1'}
              className={classes.title}
            >
              Rendered form
            </Typography>
            <div className={classes.demoform}>
              <JsonForms />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: JsonFormsState) => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) }
};

export default connect(mapStateToProps)(withStyles(styles)(App));

