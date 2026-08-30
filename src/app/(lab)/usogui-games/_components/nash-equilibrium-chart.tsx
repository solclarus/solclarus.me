"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NashEquilibriumChart() {
  const points = 60;
  const maxValue = Math.E;

  const dropPoints = Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    const value = Math.exp(t - 1);
    return {
      x: (i / points) * 100,
      y: 100 - (value / maxValue) * 100,
      time: t * 60,
      probability: (value * 100).toFixed(1),
    };
  });

  const checkPoints = Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    const value = Math.exp(-t);
    return {
      x: (i / points) * 100,
      y: 100 - (value / maxValue) * 100,
      time: t * 60,
      probability: (value * 100).toFixed(1),
    };
  });

  const dropPath = dropPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const checkPath = checkPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ナッシュ均衡：最適戦略曲線</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video w-full rounded-lg border bg-muted/30 p-4">
          <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
            <polyline
              points={dropPath}
              fill="none"
              stroke="var(--color-blue-500, #3b82f6)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points={checkPath}
              fill="none"
              stroke="var(--color-orange-500, #f97316)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-blue-500" />
            ドロップ確率（時間とともに増加）
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-orange-500" />
            チェック確率（時間とともに減少）
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          両者が最適戦略を取ると、指数関数的な確率分布に収束する
        </p>
      </CardContent>
    </Card>
  );
}
