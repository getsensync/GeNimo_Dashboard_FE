export const HighlightSpan = ({color, text}) => (
  <span
    style={{
      color: color,
      fontWeight: 'bold',
    }}
  >
    {text}
  </span>
);