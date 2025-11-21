import * as React from "react";

import type { SlateElementProps } from "platejs/static";

import { WorkflowIcon } from "lucide-react";
import { SlateElement } from "platejs/static";

import { cn } from "@workspace/editor/lib/utils";
import type { MyMermaidElement } from "../../plate-types";

export function MermaidElementStatic(
  props: SlateElementProps<MyMermaidElement>,
) {
  const { element } = props;
  const mermaidRef = React.useRef<HTMLDivElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const code = element.code || "";

  React.useEffect(() => {
    if (!mermaidRef.current || !code) {
      setIsLoading(false);
      return;
    }

    const renderMermaid = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const mermaid = (await import("mermaid")).default;
        
        // 初始化 mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });

        // 清空容器
        mermaidRef.current!.innerHTML = "";
        
        // 生成唯一 ID
        const id = `mermaid-static-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // 渲染 mermaid 图表
        const { svg } = await mermaid.render(id, code);
        mermaidRef.current!.innerHTML = svg;
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "渲染失败");
        setIsLoading(false);
        console.error("Mermaid 渲染错误:", err);
      }
    };

    void renderMermaid();
  }, [code]);

  return (
    <SlateElement className="my-1" {...props}>
      <div
        className={cn(
          "group flex items-center justify-center rounded-sm select-none",
          code.length === 0
            ? "bg-muted p-3 pr-9"
            : "px-2 py-1",
        )}
      >
        {code.length > 0 ? (
          <div className="w-full overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                加载中...
              </div>
            ) : error ? (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <div className="font-semibold">渲染错误</div>
                <div className="mt-1 text-xs">{error}</div>
              </div>
            ) : (
              <div ref={mermaidRef} className="flex justify-center" />
            )}
          </div>
        ) : (
          <div className="flex h-7 w-full items-center gap-2 text-sm whitespace-nowrap text-muted-foreground">
            <WorkflowIcon className="size-6 text-muted-foreground/80" />
            <div>添加 Mermaid 图表</div>
          </div>
        )}
      </div>
      {props.children}
    </SlateElement>
  );
}

