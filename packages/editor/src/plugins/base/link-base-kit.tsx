import { BaseLinkPlugin } from "@platejs/link";

import { LinkElementStatic } from "../../components/staticNode/link-node-static";

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];
