import Box from "@mui/material/Box";
import { PaperContext } from "../context/PaperContext";
import { useContext } from "react";

export default function Home() {
  const papers = useContext(PaperContext);

  return (
    <Box>
      {papers.map((paper) => (
        <div key={paper.id}>{paper.paperName}</div>
      ))}
    </Box>
  );
}
