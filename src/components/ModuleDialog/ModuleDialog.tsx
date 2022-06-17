import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ModuleDialogProps {
  open: boolean;
  title: string;
  handleStart: () => void;
  handleClose: () => void;
}
export default function ModuleDialog({
  open,
  title,
  handleStart,
  handleClose,
}: ModuleDialogProps) {  
	const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xs');

  return (
    <div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Iniciar o módulo`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você realmente deseja iniciar o módulo {title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="text" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleStart} variant="contained" autoFocus>
            Iniciar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
