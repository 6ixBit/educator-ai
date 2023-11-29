// @ts-nocheck
import * as Select from "@radix-ui/react-select";
import React from "react";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

import "./styles.css";

interface IDropDownMenu {
  onValueChange?: (value: any) => void;
  options: { value: string; label: string }[];
}

const SelectItem = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default function DropDownMenu({
  onValueChange = () => {},
  options = [],
}: IDropDownMenu) {
  const handleValueChange = (value: string) => {
    onValueChange(value);
  };

  return (
    <Select.Root
      className="selectRoot"
      onValueChange={handleValueChange}
      style={{ width: "188px" }}
    >
      <Select.Trigger
        className="SelectTrigger"
        aria-label="Level"
        style={{ width: "188px" }}
      >
        <Select.Value placeholder="High school" />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <Select.Group>
                  <SelectItem value={option.value}>{option.label}</SelectItem>
                </Select.Group>
                {index < options.length - 1 && (
                  <Select.Separator className="SelectSeparator" />
                )}
              </React.Fragment>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
