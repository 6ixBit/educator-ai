import * as RadioGroup from "@radix-ui/react-radio-group";
import "./styles.css";

export default function RadioGroupContainer({
  children,
  handleValueChange,
  value,
  question,
  options,
}: {
  children?: React.ReactNode;
  handleValueChange: (value: string) => void;
  value: string;
  question: string;
  options: string[];
}) {
  return (
    <>
      <h2 className="text-white text-left mb-3">{question}</h2>
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
                  maxWidth: "250px",
                  textOverflow: "clip",
                  whiteSpace: "normal",
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
