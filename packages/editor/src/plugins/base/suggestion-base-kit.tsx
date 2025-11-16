import { BaseSuggestionPlugin } from "@platejs/suggestion";

import { SuggestionLeafStatic } from "../../components/staticNode/suggestion-node-static";

export const BaseSuggestionKit = [
  BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
];
