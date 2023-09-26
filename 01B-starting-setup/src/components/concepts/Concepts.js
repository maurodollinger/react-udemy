import Concept from "./Concept";

const Concepts = ({ concepts }) => {
  return (
    <ul id="concepts">
      <Concept content={concepts[0]}/>
      <Concept content={concepts[1]}/>
      <Concept content={concepts[2]}/>
    </ul>
  );
};

export default Concepts;
