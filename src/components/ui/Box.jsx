export function Box({ feature, className }) {
  return (
    <div className={className}>
      {feature.svg && <div className="icon">{feature.svg}</div>}
      <div className="text">
        <h2>{feature.title}</h2>
        <p>{feature.desc}</p>
      </div>
    </div>
  );
}
