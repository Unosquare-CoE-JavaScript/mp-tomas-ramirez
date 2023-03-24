import * as React from "react";
import { Drawer } from "@mui/material";
import { ReactNode } from "react";
type Props = {
  isOpen: boolean;
  children?: ReactNode;
  onClose: () => void;
};

export const CartDrawer: React.FC<Props> = ({ isOpen, children, onClose }) => {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { margin: "auto", width: "25%" },
      }}
    >
      {children}
    </Drawer>
  );
};
