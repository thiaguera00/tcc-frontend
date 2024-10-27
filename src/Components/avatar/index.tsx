import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import chatIcon from '/NixHead.svg';

export const AvatarFeedback = () => {
    const [openModal, setOpenModal] = useState(false);
  
    const handleToggleModal = () => {
      setOpenModal(!openModal);
    };
  
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            flexDirection: 'row',
          }}
          onClick={handleToggleModal}
        >
          <Typography variant="body1" color="primary" marginBottom={'15px'}>
            Verificar com a IA
          </Typography>
          <Avatar src={chatIcon} alt="Nix Avatar" sx={{ width: '60px', height: 'auto', marginRight: '10px' }} />
        </Box>
  
        {/* Modal para mostrar o feedback da IA */}
        <Dialog
          open={openModal}
          onClose={handleToggleModal}
          aria-labelledby="feedback-dialog-title"
          aria-describedby="feedback-dialog-description"
        >
          <DialogTitle id="feedback-dialog-title">Muito bem!</DialogTitle>
          <DialogContent>
            <Typography variant="body2" id="feedback-dialog-description">
              Sua resposta está relacionada a uma das categorias do AI: o aprendizado de máquina, que usa dados para treinar modelos. As duas grandes categorias do AI são o aprendizado de máquina e a inteligência artificial simbólica.
            </Typography>
          </DialogContent>
          <DialogActions >
            <Button onClick={handleToggleModal} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };