"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function LeapSecondVisualizer() {
  const [showLeapSecond, setShowLeapSecond] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">閏秒作戦の視覚化</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* トグルスイッチ */}
        <div className="flex items-center justify-center gap-4 rounded-lg bg-muted p-4">
          <span className="text-sm font-medium">通常の1分間</span>
          <button
            onClick={() => setShowLeapSecond(!showLeapSecond)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showLeapSecond ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                showLeapSecond ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-medium">閏秒挿入後</span>
        </div>

        <div className="flex justify-center gap-1">
          {Array.from({ length: showLeapSecond ? 61 : 60 }, (_, i) => (
            <div
              key={i}
              className={`h-8 w-1 rounded-full ${
                i === 60 ? "bg-primary" : "bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {showLeapSecond ? "23時59分60秒が挿入され、1分間が61秒になる" : "通常は1分間が60秒"}
        </p>
      </CardContent>
    </Card>
  );
}
