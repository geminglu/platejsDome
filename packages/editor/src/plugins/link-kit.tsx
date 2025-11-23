"use client";

import { LinkPlugin } from "@platejs/link/react";
import { LinkElement } from "../components/node/link-node";
import { LinkFloatingToolbar } from "../components/toolbar/link-toolbar";

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
