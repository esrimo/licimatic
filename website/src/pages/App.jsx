import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GrantView from "./GrantView";
import Main from "./Main";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Licimatic
          </Typography>
          <a href="/#grants" className="white" style={{ marginRight: 40 }}>
            GRANTS
          </a>
          <a href="/#t" className="white">
            STATS
          </a>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/grant">
            <GrantView />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
