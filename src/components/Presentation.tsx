import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import PresentationModal from "./PresentationModal";
import type { PresentationData } from "../types/presentation";

const Presentation: React.FC<{
  presentationData: PresentationData;
}> = ({ presentationData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
            },
          }}
        >
          View Slides
        </Button>
      </Stack>
      <PresentationModal 
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        presentationData={presentationData}
      />
    </>
  );
};

export { Presentation };
