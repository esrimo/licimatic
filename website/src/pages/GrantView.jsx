import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchGrant } from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const GrantView = (props) => {
  const history = useHistory();
  const { fetchGrantDispatch, grantId, grant } = props;
  useEffect(() => {
    fetchGrantDispatch(grantId);
  }, [fetchGrantDispatch, grantId]);
  const classes = useStyles();

  if (grant === null) {
    history.push("/");
  }

  const synopsis = !grant || !grant.synopsis ? null : (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography component="h4">{grant.synopsis.agencyName}</Typography>
        <Typography variant="body2" component="p">
          {grant.synopsis.synopsisDesc}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    grant && (
      <div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography component="h4">{grant.opportunityTitle}</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              variant="h5"
              gutterBottom
            >
              opportunityNumber: {grant.opportunityNumber}
              <br />
              owningAgencyCode: {grant.owningAgencyCode} <br />
              publisherUid: {grant.publisherUid} <br />
              modifiedComments: {grant.modifiedComments}
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
        </Card>

        {synopsis}
      </div>
    )
  ); 
};

const s2p = (s) => {
  return {
    grant: s.data.grant,
    grantId: s.data.grantId,
  };
};

const d2p = (d) => {
  return {
    fetchGrantDispatch: (id) => d(fetchGrant(id)),
  };
};

export default connect(s2p, d2p)(GrantView);
