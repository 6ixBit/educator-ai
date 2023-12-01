import * as Separator from "@radix-ui/react-separator";
import "./styles.css";

export default function HorizontalSeparator({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const separatorStyle = {
    margin: "0.5rem 0",
    ...style,
  };

  return <Separator.Root className="SeparatorRoot" style={separatorStyle} />;
}
