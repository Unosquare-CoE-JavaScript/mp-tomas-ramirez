import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/ProductV2";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CartDrawer } from "./components/CartDrawer";
import { CartItem } from "./components/CartItem";
import { CheckoutModal } from "./components/CheckoutModal";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Dispatch } from "redux";
import { clearCart } from "./store/actionCreators";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://fakestoreapi.com/products`);
      const json = await result.json();
      setData(json);
    };
    fetchData().catch((error) => {
      setError(error);
    });
  }, []);

  const cartItems: ICartItem[] = useSelector(
    (state: CartState) => Object.values(state.cartItemsByProductId),
    shallowEqual
  );
  if (error) {
    return (
      <div>
        <Typography> OOPS! Something went wrong</Typography>
      </div>
    );
  }

  const productCount = cartItems.reduce(
    (partialSum, a) => partialSum + a.quantity,
    0
  );

  return (
    <div className="App">
      <AppBar position="sticky">
        <IconButton
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
        >
          <Badge badgeContent={productCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </AppBar>
      <CartDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
      >
        {cartItems.length > 0 ? (
          <Box>
            {cartItems.map((product) => (
              <CartItem key={`carItem${product.id}`} cartItem={product} />
            ))}
            <footer>
              <Button onClick={() => setIsCheckoutModalOpen(true)}>
                proceed to checkout
                <PointOfSaleIcon sx={{ paddingLeft: "8px" }} />
              </Button>
            </footer>
          </Box>
        ) : (
          <Box sx={{ margin: "auto", padding: "10px" }}>
            <SentimentVeryDissatisfiedIcon />
            <Typography>
              Your cart is empty. add some products and come back
            </Typography>
          </Box>
        )}
      </CartDrawer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
        flexDirection="row"
        flexWrap="wrap"
        p={1}
      >
        {data.map((product: IProduct) => (
          <Product key={`product${product.id}`} product={product} />
        ))}
      </Box>
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          setIsCheckoutModalOpen(false);
        }}
        cartItems={cartItems}
        onSuccess={() => {
          dispatch(clearCart());
          setIsDrawerOpen(false);
          setIsSuccess(true);
        }}
      />
      <Snackbar
        autoHideDuration={3000}
        open={isSuccess}
        message="Thank you for your purchase, Come back soon!"
        onClose={() => {
          setIsSuccess(false);
        }}
      />
    </div>
  );
}

export default App;
