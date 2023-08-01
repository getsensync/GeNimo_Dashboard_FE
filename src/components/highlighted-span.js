export const HighlightSpan = ({color, text, style}) => (
  <span
    style={{
      color: color,
      fontWeight: 'bold',
      ...style
    }}
  >
    {text}
  </span>
);