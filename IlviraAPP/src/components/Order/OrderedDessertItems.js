import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { roundTo2DecimalPoint } from "../../utils";
const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#D4389A",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function OrderedDessertItems(props) {

  const { values, setValues } = props;
  const classes = useStyles();

  let orderedDessertItems = values.orderDetails;

  const removeDessertItem = (index, id) => {
    let dItem = { ...values };
    dItem.orderDetails = dItem.orderDetails.filter((_, i) => i !== index);
    setValues({ ...dItem });
};

  const updateQuantity = (index, value) => {
    let dItemDetails = { ...values };
    let dItem = dItemDetails.orderDetails[index];
    if (dItem.quantity + value > 0) {
      dItem.quantity += value;
      setValues({ ...dItemDetails });
    }
  };

  return (
    <List className={classes.listRoot}>
      {orderedDessertItems.map((item, index) => (
        <Paper key={index}>
          <ListItem>
            <ListItemText
              primary={item.dessertItemName}
              primaryTypographyProps={{
                component: "h1",
                style: {
                  fontWeight: "500",
                  fontSize: "1.2em",
                },
              }}
              secondary={
                <>
                  <ButtonGroup size="small">
                    <Button onClick={(e) => updateQuantity(index, -1)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(index, +1)}>
                      +
                    </Button>
                  </ButtonGroup>

                  <span>
                    {" " +
                      roundTo2DecimalPoint(
                        item.quantity * item.dessertItemPrice
                      ) +
                      " ₺ "}
                  </span>
                </>
              }
              secondaryTypographyProps={{
                component:'div'
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                disableRipple
                onClick={(e) => removeDessertItem(index, item.orderDetailsId)}
              >
                <DeleteTwoToneIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
