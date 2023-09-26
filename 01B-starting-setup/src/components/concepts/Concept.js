const Concept = ({content}) => {
  return (
    <li className="concept">
      <img src={content.image} alt={content.title} />
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </li>
  );
};

export default Concept;
