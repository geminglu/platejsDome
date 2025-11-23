/**
 * mermaid 组件
 */

"use client";

import { useRef, useState, useEffect, useId } from "react";
import { useTheme } from "next-themes";

export function MermaidElement({ code }: { code: string }) {
  const mermaidRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const currentThemeRef = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const id = useId();

  // 根据系统主题选择 mermaid 主题
  const mermaidTheme = resolvedTheme === "dark" ? "dark" : "default";

  useEffect(() => {
    // 标记组件已挂载
    isMountedRef.current = true;

    return () => {
      // 组件卸载时标记
      isMountedRef.current = false;
      // 取消正在进行的异步操作
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (!code) {
      setIsLoading(false);
      setError(null);
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = "";
      }
      return;
    }

    // 取消之前的渲染操作
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const renderMermaid = async () => {
      // 检查是否已取消
      if (abortController.signal.aborted || !isMountedRef.current) {
        return;
      }

      try {
        setError(null);
        setIsLoading(true);

        // 等待 DOM 准备好
        if (!mermaidRef.current) {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
          return;
        }

        // 动态导入 mermaid
        const mermaid = (await import("mermaid")).default;

        // 再次检查是否已取消
        if (abortController.signal.aborted || !isMountedRef.current) {
          return;
        }

        // 如果主题变化了，需要重新初始化
        const needsReinit = currentThemeRef.current !== mermaidTheme;
        if (needsReinit || !currentThemeRef.current) {
          mermaid.initialize({
            startOnLoad: false,
            theme: mermaidTheme,
            securityLevel: "loose",
            suppressErrorRendering: true,
          });
          currentThemeRef.current = mermaidTheme;
        }

        // 再次检查是否已取消（初始化后）
        if (abortController.signal.aborted || !isMountedRef.current) {
          return;
        }

        // 清空容器
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = "";
        }

        // 渲染 mermaid 图表
        const { svg, bindFunctions } = await mermaid.render(id, code);

        // 检查是否已取消或组件已卸载
        if (abortController.signal.aborted || !isMountedRef.current) {
          return;
        }

        // 确保 ref 仍然存在
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
          // 绑定交互函数（如果有）
          if (bindFunctions) {
            bindFunctions(mermaidRef.current);
          }
        }

        if (isMountedRef.current) {
          setIsLoading(false);
        }
      } catch (err) {
        // 如果操作已取消，不更新状态
        if (abortController.signal.aborted || !isMountedRef.current) {
          return;
        }

        const errorMessage = err instanceof Error ? err.message : "渲染失败";
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    // 使用 requestAnimationFrame 确保 DOM 已挂载
    const rafId = requestAnimationFrame(() => {
      void renderMermaid();
    });

    return () => {
      cancelAnimationFrame(rafId);
      abortController.abort();
    };
  }, [code, mermaidTheme, id]);

  if (!code) {
    return null;
  }

  return (
    <div
      className="w-full overflow-auto p-4 relative"
      contentEditable={false}
      role="img"
      aria-label="Mermaid 图表"
      aria-busy={isLoading}
    >
      {/* ref 的 div 必须始终存在，即使在加载状态 */}
      <div
        ref={mermaidRef}
        className="flex justify-center items-center [&>svg]:max-w-full [&>svg]:h-auto"
      />
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground pointer-events-none bg-background/50"
          role="status"
          aria-live="polite"
        >
          加载中...
        </div>
      )}
      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
          role="alert"
          aria-live="assertive"
        >
          <div className="font-semibold">渲染错误</div>
          <div className="mt-1 text-xs">{error}</div>
        </div>
      )}
    </div>
  );
}
