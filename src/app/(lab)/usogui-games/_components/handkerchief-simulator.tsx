"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function HandkerchiefSimulator() {
  const [dropTime, setDropTime] = useState<number>(30);
  const [checkTime, setCheckTime] = useState<number>(40);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying && currentTime < 60) {
      const timer = setTimeout(() => {
        setCurrentTime((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (currentTime >= 60) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentTime]);

  const handlePlay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const isCheckSuccess = checkTime >= dropTime;
  const zashiNoKiwa = isCheckSuccess ? checkTime - dropTime : 0;

  const hasDropped = currentTime >= dropTime;
  const hasChecked = currentTime >= checkTime;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ハンカチ落としシミュレーター</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="relative h-24 overflow-hidden rounded-lg bg-muted">
            {isCheckSuccess && (
              <div
                className="absolute top-0 h-full bg-destructive/20"
                style={{
                  left: `${(dropTime / 60) * 100}%`,
                  width: `${(zashiNoKiwa / 60) * 100}%`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold">座視の際</span>
                </div>
              </div>
            )}

            {isPlaying && (
              <div
                className="absolute top-0 h-full w-0.5 bg-primary transition-all"
                style={{ left: `${(currentTime / 60) * 100}%` }}
              >
                <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-primary" />
              </div>
            )}

            <div
              className="absolute top-0 flex h-full w-1 items-center justify-center bg-blue-500"
              style={{ left: `${(dropTime / 60) * 100}%` }}
            >
              <div className="absolute -top-3 -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                D
              </div>
              {hasDropped && isPlaying && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                  ハンカチ落下
                </div>
              )}
            </div>

            <div
              className="absolute top-0 flex h-full w-1 items-center justify-center bg-orange-500"
              style={{ left: `${(checkTime / 60) * 100}%` }}
            >
              <div className="absolute -top-3 -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                C
              </div>
              {hasChecked && isPlaying && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                  振り向き
                </div>
              )}
            </div>

            <div className="absolute right-0 bottom-2 left-0 flex justify-between px-2 text-xs text-muted-foreground">
              <span>0:00</span>
              <span>0:15</span>
              <span>0:30</span>
              <span>0:45</span>
              <span>1:00</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="drop-time" className="mb-2 flex justify-between text-sm font-medium">
              <span>ドロップタイミング (D)</span>
              <span className="text-primary">{dropTime}秒</span>
            </label>
            <input
              id="drop-time"
              type="range"
              min="0"
              max="60"
              value={dropTime}
              onChange={(e) => setDropTime(parseInt(e.target.value, 10))}
              disabled={isPlaying}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="check-time" className="mb-2 flex justify-between text-sm font-medium">
              <span>チェックタイミング (C)</span>
              <span className="text-primary">{checkTime}秒</span>
            </label>
            <input
              id="check-time"
              type="range"
              min="0"
              max="60"
              value={checkTime}
              onChange={(e) => setCheckTime(parseInt(e.target.value, 10))}
              disabled={isPlaying}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handlePlay} disabled={isPlaying} className="flex-1">
              {isPlaying ? "再生中..." : "シミュレーション開始"}
            </Button>
            <Button onClick={handleReset} variant="outline">
              リセット
            </Button>
          </div>
        </div>

        <div
          className={`rounded-lg p-4 ${
            isCheckSuccess
              ? "border border-primary/20 bg-primary/10"
              : "border border-destructive/20 bg-destructive/10"
          }`}
        >
          <h4 className="mb-2 font-semibold">
            {isCheckSuccess ? "✅ チェック成功" : "❌ チェック失敗"}
          </h4>
          <div className="space-y-1 text-sm">
            {isCheckSuccess ? (
              <>
                <p>
                  座視の際: <strong>{zashiNoKiwa}秒</strong>
                </p>
                <p>
                  臨死薬蓄積: <strong>{zashiNoKiwa}秒分</strong>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  ハンカチが落ちてから{zashiNoKiwa}秒後に振り向いたため、
                  その時間分の臨死薬がシリンダーに蓄積されます。
                </p>
              </>
            ) : (
              <>
                <p>
                  ペナルティ: <strong>蓄積分 + 60秒分 即座に注射</strong>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  ハンカチが落ちる前に振り向いたため、チェック失敗。
                  シリンダーに蓄積されていた臨死薬に60秒分が追加され、即座に注射されます。
                </p>
              </>
            )}
          </div>
        </div>

        <div className="rounded bg-muted p-3 text-xs">
          <p className="mb-1 font-semibold">💡 使い方</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• スライダーでドロップ（D）とチェック（C）のタイミングを設定</li>
            <li>• シミュレーション開始ボタンで時間経過を視覚化</li>
            <li>• チェックがドロップより後なら成功、前なら失敗</li>
            <li>• 成功時は「座視の際」（時間差）が臨死薬として蓄積</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
