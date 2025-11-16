import { BaseAlignKit } from "../plugins/base/align-base-kit";
import { BaseBasicBlocksKit } from "../plugins/base/basic-blocks-base-kit";
import { BaseBasicMarksKit } from "../plugins/base/basic-marks-base-kit";
import { BaseCalloutKit } from "../plugins/base/callout-base-kit";
import { BaseCodeBlockKit } from "../plugins/base/code-block-base-kit";
import { BaseColumnKit } from "../plugins/base/column-base-kit";
import { BaseCommentKit } from "../plugins/base/comment-base-kit";
import { BaseDateKit } from "../plugins/base/date-base-kit";
import { BaseFontKit } from "../plugins/base/font-base-kit";
import { BaseLineHeightKit } from "../plugins/base/line-height-base-kit";
import { BaseLinkKit } from "../plugins/base/link-base-kit";
import { BaseListKit } from "../plugins/base/list-base-kit";
import { MarkdownKit } from "../plugins/markdown-kit";
import { BaseMathKit } from "../plugins/base/math-base-kit";
import { BaseMediaKit } from "../plugins/base/media-base-kit";
import { BaseMentionKit } from "../plugins/base/mention-base-kit";
import { BaseSuggestionKit } from "../plugins/base/suggestion-base-kit";
import { BaseTableKit } from "../plugins/base/table-base-kit";
import { BaseTocKit } from "../plugins/base/toc-base-kit";
import { BaseToggleKit } from "../plugins/base/toggle-base-kit";
import { ListClassicKit } from "../plugins/list-classic.kit";

export const BaseEditorKit = [
  ...BaseBasicBlocksKit,
  ...BaseCodeBlockKit,
  ...BaseTableKit,
  ...BaseToggleKit,
  ...BaseTocKit,
  ...BaseMediaKit,
  ...BaseCalloutKit,
  ...BaseColumnKit,
  ...BaseMathKit,
  ...BaseDateKit,
  ...BaseLinkKit,
  ...BaseMentionKit,
  ...BaseBasicMarksKit,
  ...BaseFontKit,
  ...BaseListKit,
  ...BaseAlignKit,
  ...BaseLineHeightKit,
  ...BaseCommentKit,
  ...BaseSuggestionKit,
  ...MarkdownKit,
  ...ListClassicKit,
];
