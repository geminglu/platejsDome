import { BaseMentionPlugin } from "@platejs/mention";

import { MentionElementStatic } from "../../components/staticNode/mention-node-static";

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
