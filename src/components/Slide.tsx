interface Props {
  src: string;
}

export function Slide({ src }: Props) {
  return (
    <img
      src={src}
      style={{
        width: '100vw',
      }}
    />
  );
}
