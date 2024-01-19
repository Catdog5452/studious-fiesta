import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useContext } from "react";

// components
import { PaperConext } from "../context/PaperContext";

export default function Paper() {
  const papers = useContext(PaperConext);
  const params = useParams();
  const paperId = params.id;
  const paper = papers.find((paper) => paper.id === paperId);

  return (
    <Box>
      <h1>Paper</h1>
      {paperId}
      {paper.paperName}
    </Box>
  );
}
