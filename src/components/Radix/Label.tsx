import React from "react";
import { styled } from "@stitches/react";
import { blackA } from "@radix-ui/colors";
import * as LabelPrimitive from "@radix-ui/react-label";

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  color: "#5D7285",
  userSelect: "none",
});

// Exports
export const Label = StyledLabel;
