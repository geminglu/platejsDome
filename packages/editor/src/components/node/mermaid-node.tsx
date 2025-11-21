"use client";

import * as React from "react";

import type { PlateElementProps } from "platejs/react";

import { NodeApi, TCodeBlockElement } from "platejs";

export function MermaidElement(props: PlateElementProps<TCodeBlockElement>) {
  const mermaidRef = React.useRef<HTMLDivElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const isInitializedRef = React.useRef(false);

  const code = NodeApi.string(props.element);

  React.useEffect(() => {
    if (!code.trim()) {
      setIsLoading(false);
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = "";
      }
      return;
    }

    const renderMermaid = async () => {
      try {
        setError(null);
        setIsLoading(true);

        // 等待 DOM 准备好
        if (!mermaidRef.current) {
          setIsLoading(false);
          return;
        }

        // 动态导入 mermaid
        const mermaid = (await import("mermaid")).default;

        // 初始化 mermaid（只初始化一次）
        if (!isInitializedRef.current) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
          });
          isInitializedRef.current = true;
        }

        // 清空容器
        mermaidRef.current.innerHTML = "";

        // 生成唯一 ID
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        // 渲染 mermaid 图表
        const { svg, bindFunctions } = await mermaid.render(id, code);

        // 确保 ref 仍然存在
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          // 绑定交互函数（如果有）
          if (bindFunctions && mermaidRef.current) {
            bindFunctions(mermaidRef.current);
          }
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "渲染失败");
        setIsLoading(false);
        console.error("Mermaid 渲染错误:", err);
      }
    };

    // 使用 requestAnimationFrame 确保 DOM 已挂载
    const rafId = requestAnimationFrame(() => {
      void renderMermaid();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [code]);

  if (code.trim().length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-auto py-4 relative" contentEditable={false}>
      {/* ref 的 div 必须始终存在，即使在加载状态 */}
      <div
        ref={mermaidRef}
        className="flex justify-center items-center [&>svg]:max-w-full [&>svg]:h-auto"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground pointer-events-none bg-background/50">
          加载中...
        </div>
      )}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <div className="font-semibold">渲染错误</div>
          <div className="mt-1 text-xs">{error}</div>
        </div>
      )}
    </div>
  );
}
