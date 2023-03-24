import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import MaskedInput from "react-text-mask";
import { Controller, FormProvider, useForm } from "react-hook-form";
import VISA_ICON from "../assets/visa.png";

import MASTERCARD_ICON from "../assets/masterCard.png";
import InvalidCardNumber from "../errors/InvalidCardNumber";
import { useState } from "react";
import { ErrorModal } from "./ErrorModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;

  cartItems: ICartItem[];
};
type paymentForm = {
  cardNumber: string;
};

export const CheckoutModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cartItems,
  onSuccess,
}) => {
  const methods = useForm<paymentForm>();
  const { handleSubmit, watch, control } = methods;
  const [isError, setIsError] = useState(false);

  const onSubmit = (data: paymentForm) => {
    try {
      const exp = "^0";
      const regexp = new RegExp(exp);

      if (cardNumber?.replace(/[^\d]/g, "").match(regexp)) {
        throw new InvalidCardNumber(400, "INVALID CARD NUMBER");
      } else {
        onSuccess();
        onClose();
      }
    } catch (e) {
      setIsError(true);
    }
  };

  const quantitySum = cartItems.reduce(
    (partialSum, a) => partialSum + a.quantity,
    0
  );
  const totalSum = cartItems.reduce(
    (partialSum, a) => partialSum + a.product.price * a.quantity,
    0
  );
  const cardNumber = watch("cardNumber");

  function getCardType() {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
    };
    if (cardNumber?.replace(/[^\d]/g, "").match(regexPattern["MASTERCARD"]))
      return "MASTERCARD";
    if (cardNumber?.replace(/[^\d]/g, "").match(regexPattern["VISA"]))
      return "VISA";
    for (const card in regexPattern) {
      if (
        cardNumber?.replace(/[^\d]/g, "").match(regexPattern["MASTERCARD"]) ||
        cardNumber?.replace(/[^\d]/g, "").match(regexPattern["VISA"])
      )
        return card;
    }
    return "";
  }
  const cardFormat = [
    /[0-9]/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  const cardType = getCardType();

  const getIcon = () => {
    if (cardType === "VISA") {
      return VISA_ICON;
    } else if (cardType === "MASTERCARD") {
      return MASTERCARD_ICON;
    }
  };
  const getDiscount = () => {
    if (cardType === "VISA") {
      if (quantitySum >= 10) {
        return 15;
      } else if (quantitySum >= 7 && quantitySum <= 9) {
        return 10;
      } else {
        return 5;
      }
    } else if (cardType === "MASTERCARD") {
      if (totalSum >= 100) {
        return 17;
      } else if (totalSum >= 75 && totalSum <= 99) {
        return 12;
      } else {
        return 8;
      }
    } else {
      return 0;
    }
  };
  const discount = getDiscount();
  const newTotal = totalSum - totalSum * (discount / 100);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...style, minWidth: 200 }}>
        <Box>
          <Typography variant={"h6"} display="inline">
            {`You have ${quantitySum} items in your cart`}
          </Typography>
          <Box>
            <Typography> {`Total: $${totalSum} `}</Typography>
          </Box>
        </Box>
        <Typography>Payment method:</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <MaskedInput
                  mask={cardFormat}
                  guide={false}
                  placeholderChar={"\u2000"}
                  placeholder="Card Number"
                  required
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {cardType && (
              <img
                style={{
                  float: "right",
                  position: "relative",
                }}
                src={getIcon()}
                alt="card"
                width="50px"
                height="33px"
              />
            )}

            {discount > 0 && (
              <Box>
                <Typography>
                  {`You order has a ${discount}% discount!`}{" "}
                </Typography>
                <Typography> {`New Total: $${newTotal.toFixed(2)}`}</Typography>
              </Box>
            )}
            <Button
              type="submit"
              disabled={!cardNumber || cardNumber?.length < 19}
            >
              Pay
            </Button>
          </form>
        </FormProvider>
        <ErrorModal
          isOpen={isError}
          onClose={() => {
            setIsError(false);
          }}
        />
      </Box>
    </Modal>
  );
};
