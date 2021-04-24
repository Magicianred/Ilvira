import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../../api";
import SearchTwoTone from "@material-ui/icons/SearchTwoTone";
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(8),
  },
  listItemText:{
    textAlign: "center"
  }
}));

export default function SearchDessertItems() {
  const [dessertItems, setDessertItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.DESSERTITEM)
      .fetchAll()
      .then((res) => {
        setDessertItems(res.data);
        setSearchList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    let dList = [...dessertItems];
    dList = dList.filter((item) => {
      return item.dessertName
        .toLocaleLowerCase()
        .includes(searchKey.toLocaleLowerCase());
    });
    setSearchList(dList);
  }, [searchKey]);

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          placeholder="Search desserts"
          className={classes.searchInput}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton>
          <SearchTwoTone />
        </IconButton>
      </Paper>
      <List>
        {searchList.map((item, index) => (
          <ListItem key={index}>
               <ListItemAvatar>
              <Avatar className={classes.largeAvatar} variant="square"
                alt={item.dessertName}
                src={item.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
            className={classes.listItemText}
              primary={item.dessertName}
              secondary={item.price + "₺"}
            />
            <ListItemSecondaryAction>
                <IconButton>
                    <PlusOneIcon />
                    <ArrowForwardIcon />
                </IconButton>
            </ListItemSecondaryAction>
       
          </ListItem>
        ))}
      </List>
    </>
  );
}
