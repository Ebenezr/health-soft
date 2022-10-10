import React from "react";
import { styled } from "@stitches/react";
import { violet } from "@radix-ui/colors";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const StyledSeparator = styled(SeparatorPrimitive.Root, {
  backgroundColor: violet.violet6,
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

export const Separator = StyledSeparator;
