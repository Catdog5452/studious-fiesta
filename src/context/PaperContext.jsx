import { useEffect, useState, createContext } from "react";
import { getPapers } from "../database/getPapers";
import PropTypes from "prop-types";

export const PaperConext = createContext();

export const PaperUpdateContext = createContext((paperList) => paperList);

export function PapersProvider({ children }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    getPapers().then((papers) => setPapers(papers));
  }, []);

  useEffect(() => {}, [papers]);

  return (
    <PaperConext.Provider value={papers}>
      <PaperUpdateContext.Provider value={setPapers}>
        {children}
      </PaperUpdateContext.Provider>
    </PaperConext.Provider>
  );
}

PapersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
