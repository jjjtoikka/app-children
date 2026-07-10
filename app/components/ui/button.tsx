import { ark } from "@ark-ui/react/factory";
import { forwardRef, type ComponentProps } from "react";
import { styled } from "styled-system/jsx";
import { button } from "styled-system/recipes";

const BaseButton = styled(ark.button, button);

export interface ButtonProps extends ComponentProps<typeof BaseButton> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, ...props }, ref) {
    return (
      <BaseButton ref={ref} type="button" {...props}>
        {children}
      </BaseButton>
    );
  },
);
