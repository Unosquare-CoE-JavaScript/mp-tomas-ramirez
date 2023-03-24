import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../store/actionCreators";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  product: IProduct;
};

export const Product: React.FC<Props> = ({ product }) => {
  const { title, description, image, price } = product;
  const dispatch: Dispatch<any> = useDispatch();
  return (
    <Card
      sx={{
        minWidth: 345,
        maxWidth: "30%",
        p: 1,
        m: 1,
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <CardContent>
        <CardMedia
          sx={{
            margin: "auto",
            height: 140,
            width: 140,
            alignContent: "center",
          }}
          image={image}
          title={description}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          textAlign="center"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {description}
        </Typography>
        <Typography>{`${price} $`}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => dispatch(addProductToCart(product))}
          size="medium"
        >
          <Typography sx={{ paddingTop: "2px" }}>Add To Cart</Typography>
          <AddShoppingCartIcon sx={{ paddingLeft: "4px" }} />
        </Button>
      </CardActions>
    </Card>
  );
};
