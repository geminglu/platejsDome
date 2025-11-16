import { BaseCommentPlugin } from "@platejs/comment";

import { CommentLeafStatic } from "../../components/staticNode/comment-node-static";

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
];
