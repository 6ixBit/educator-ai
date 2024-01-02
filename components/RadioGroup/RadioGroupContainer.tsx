import "./styles.css";

import * as RadioGroup from "@radix-ui/react-radio-group";

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
          className="RadioGroupRoot ml-5"
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

              <p className="leading-2  sm:px-5 text-black">{option}</p>
            </div>
          ))}
          {children}
        </RadioGroup.Root>
      </form>
    </>
  );
}
