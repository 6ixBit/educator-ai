import "./styles.css";

import * as Dialog from "@radix-ui/react-dialog";

import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  actionButtons,
  hideCloseButton,
  preventOutsideClick,
  icon,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string | React.ReactNode;
  actionButtons?: React.ReactNode;
  hideCloseButton?: boolean;
  preventOutsideClick?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!preventOutsideClick) {
          onOpenChange(open);
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {icon && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {icon}
            </div>
          )}
          <Dialog.Title
            className="DialogTitle"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {title}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {description}
          </Dialog.Description>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>{actionButtons}</Dialog.Close>
          </div>

          {!hideCloseButton && (
            <div onClick={(e) => e.stopPropagation()}>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
