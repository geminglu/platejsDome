/**
 * 自定义低亮库
 */

import { type LanguageFn } from "lowlight";

export const customLowlight = (
  register: (name: string, grammar: LanguageFn) => void,
) => {
  register("mermaid", () => ({
    name: "mermaid",
    aliases: ["mmd"],
    contains: [
      // 注释（行注释）
      {
        className: "comment",
        begin: /%%/,
        end: /$/,
      },
      // 字符串（单引号和双引号）
      {
        className: "string",
        begin: /["']/,
        end: /["']/,
      },
      // 图表类型关键字
      {
        className: "keyword",
        begin:
          /\b(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|gitgraph|journey|requirement|mindmap|timeline|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment|quadrantChart|user-journey|sankey-beta|xychart-beta|treemap-beta|kanban)\b/,
      },
      // 方向关键字
      {
        className: "keyword",
        begin: /\b(TD|TB|BT|RL|LR|DOWN|UP|LEFT|RIGHT)\b/,
      },
      // 样式和类定义关键字
      {
        className: "keyword",
        begin:
          /\b(classDef|class|style|linkStyle|interpolate|subgraph|direction|config)\b/,
      },
      // 节点形状：双圆括号（圆形节点）
      {
        className: "string",
        begin: /\(\(/,
        end: /\)\)/,
      },
      // 节点形状：方括号（矩形节点）
      {
        className: "string",
        begin: /\[/,
        end: /\]/,
      },
      // 节点形状：花括号（菱形节点）
      {
        className: "string",
        begin: /\{/,
        end: /\}/,
      },
      // 节点形状：圆括号（圆角矩形节点）
      {
        className: "string",
        begin: /\(/,
        end: /\)/,
      },
      // 节点形状：梯形（以 > 开始，以 ] 结束）
      {
        className: "string",
        begin: />/,
        end: /\]/,
      },
      // 箭头和连接线（按长度排序，先匹配长的）
      {
        className: "operator",
        begin: /(==>|-->|\.\.->|\.->|--o|--x|==|--|---)/,
      },
      // 数字（包括小数）
      {
        className: "number",
        begin: /\b\d+\.?\d*\b/,
      },
      // 节点ID和标识符（字母数字下划线，但排除关键字）
      {
        className: "title",
        begin: /\b[A-Za-z_][A-Za-z0-9_]*\b/,
      },
    ],
  }));
};
