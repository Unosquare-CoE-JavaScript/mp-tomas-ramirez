import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

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
};

export const ErrorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ ...style, minWidth: 200 }}>
        <SentimentVeryDissatisfiedIcon color="error" />
        <Typography>Something went wrong, please try again</Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};
