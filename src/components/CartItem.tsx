import * as React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  cartItem: ICartItem;
};
export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  const { image, description, title, price } = product;
  return (
    <Card sx={{ minWidth: 200, p: 1, m: 1 }}>
      <Box
        flexDirection="row"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          borderRadius: 1,
          alignItems: "center",
        }}
      >
        <CardMedia
          sx={{ minWidth: 70, height: 70, width: 70, borderRadius: 1 }}
          image={image}
          title={description}
        />
        <CardContent>
          <Box>
            <Typography
              display="inline"
              gutterBottom
              variant="h6"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </Typography>
            <Typography display="inline" variant="body2" color="text.secondary">
              {`Price: ${price}$ Quantity: ${quantity}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`total: ${(price * quantity).toFixed(2)} $`}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
