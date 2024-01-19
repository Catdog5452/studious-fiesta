import Box from "@mui/material/Box";
import { PaperConext } from "../context/PaperContext";
import { useContext } from "react";

export default function Home() {
  const papers = useContext(PaperConext);
  console.log(papers);

  return (
    <Box>
      {papers.map((paper) => (
        <div key={paper.id}>{paper.paperName}</div>
      ))}
    </Box>
  );
}
