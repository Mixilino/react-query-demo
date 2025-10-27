import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import type { PresentationModalProps } from "../types/presentation";

const PresentationModal: React.FC<PresentationModalProps> = ({
  open,
  onClose,
  presentationData,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { slides } = presentationData;
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  // Reset to first slide when modal opens
  useEffect(() => {
    if (open) {
      setCurrentSlideIndex(0);
    }
  }, [open]);

  const handlePreviousSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handlePreviousSlide();
    } else if (event.key === "ArrowRight") {
      handleNextSlide();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={24}
          onKeyDown={handleKeyPress}
          tabIndex={0}
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 3,
            outline: "none",
            minHeight: "550px",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              {/* Previous Arrow */}
              <IconButton
                onClick={handlePreviousSlide}
                disabled={currentSlideIndex === 0}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:disabled": {
                    opacity: 0.3,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                  zIndex: 1,
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              {/* Next Arrow */}
              <IconButton
                onClick={handleNextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&:disabled": {
                    opacity: 0.3,
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                  },
                  zIndex: 1,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          {/* Content Container */}
          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              pr: { xs: 6, sm: 7, md: 9 },
              pl:
                totalSlides > 1
                  ? { xs: 6, sm: 7, md: 9 }
                  : { xs: 3, sm: 4, md: 6 },
            }}
          >
            {/* Title Section */}
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: currentSlide.subtitle ? 2 : 0,
                  fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {currentSlide.subtitle}
              </Typography>
            </Box>

            {/* Bullet Points Section */}
            <Box sx={{ mt: 4 }}>
              <List sx={{ py: 0 }}>
                {currentSlide.bulletPoints.map((point, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      py: { xs: 1, sm: 1.5 },
                      px: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                      <CircleIcon
                        sx={{
                          fontSize: 12,
                          color: "rgba(255, 255, 255, 0.8)",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={point}
                      primaryTypographyProps={{
                        variant: "h6",
                        component: "div",
                        sx: {
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                          fontWeight: 400,
                          lineHeight: 1.4,
                          color: "rgba(255, 255, 255, 0.95)",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Slide Indicator at Bottom */}
            {totalSlides > 1 && (
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.3)", mb: 2 }} />
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.7,
                    fontSize: "0.9rem",
                  }}
                >
                  {currentSlideIndex + 1} / {totalSlides}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PresentationModal;
