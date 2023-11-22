import * as RadioGroup from "@radix-ui/react-radio-group";
import "./styles.css";

export default function RadioGroupContainer({
  children,
  handleValueChange,
  value,
  options,
}: {
  children?: React.ReactNode;
  handleValueChange: (value: string) => void;
  value: string;
  options: string[];
}) {
  return (
    <>
      <form>
        <RadioGroup.Root
          className="RadioGroupRoot"
          defaultValue="default"
          aria-label="View density"
          onValueChange={handleValueChange}
          value={value}
        >
          {options.map((option, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value={option}
                id={`r${index}`}
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label
                className="Label"
                htmlFor={`r${index}`}
                style={{
                  width: "100%",
                  textOverflow: "clip",
                  whiteSpace: "normal",
                  fontSize: ".9rem",
                  marginTop: "0rem",
                }}
              >
                {option}
              </label>
            </div>
          ))}
          {children}
        </RadioGroup.Root>
      </form>
    </>
  );
}
