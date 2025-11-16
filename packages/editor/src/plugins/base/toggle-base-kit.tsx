import { BaseTogglePlugin } from "@platejs/toggle";

import { ToggleElementStatic } from "../../components/toolbar/toggle-node-static";

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
