"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Strategy = "conservative" | "aggressive" | "balanced";

const strategies = {
  conservative: {
    name: "保守的戦略",
    description: "序盤は温存、終盤で勝負",
    rounds: [
      { cards: 10, target: "ワンペア〜ツーペア", strength: "低" },
      { cards: 10, target: "ツーペア", strength: "低〜中" },
      { cards: 11, target: "スリーカード", strength: "中" },
      { cards: 11, target: "ストレート", strength: "中〜高" },
      { cards: 10, target: "フラッシュ", strength: "高" },
    ],
  },
  aggressive: {
    name: "攻撃的戦略",
    description: "序盤で大きく奪う",
    rounds: [
      { cards: 11, target: "フラッシュ・ストレート", strength: "高" },
      { cards: 11, target: "ストレート", strength: "中〜高" },
      { cards: 10, target: "ツーペア", strength: "中" },
      { cards: 10, target: "ワンペア", strength: "低〜中" },
      { cards: 10, target: "ハイカード", strength: "低" },
    ],
  },
  balanced: {
    name: "バランス型戦略",
    description: "各回戦で安定した強さ",
    rounds: [
      { cards: 10, target: "ツーペア", strength: "低〜中" },
      { cards: 11, target: "スリーカード", strength: "中" },
      { cards: 10, target: "ストレート", strength: "中〜高" },
      { cards: 11, target: "フラッシュ", strength: "中〜高" },
      { cards: 10, target: "フルハウス", strength: "高" },
    ],
  },
};

export function AirPokerCardStrategy() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>("conservative");

  const currentStrategy = strategies[selectedStrategy];
  const totalCards = currentStrategy.rounds.reduce((sum, round) => sum + round.cards, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">カード配分戦略</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(strategies) as Strategy[]).map((strategy) => (
            <Button
              key={strategy}
              onClick={() => setSelectedStrategy(strategy)}
              className={`h-auto flex-col items-start rounded-lg border-2 p-3 whitespace-normal ${
                selectedStrategy === strategy
                  ? "border-primary bg-primary/10"
                  : "border-muted bg-transparent hover:border-primary/50"
              }`}
              variant="ghost"
            >
              <div className="text-sm font-semibold">{strategies[strategy].name}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {strategies[strategy].description}
              </div>
            </Button>
          ))}
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium">{currentStrategy.name}</span>
            <span className="text-sm text-muted-foreground">合計: {totalCards}/52枚</span>
          </div>

          <div className="space-y-2">
            {currentStrategy.rounds.map((round, index) => (
              <div key={`${index}-${round.target}`} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium">第{index + 1}回戦</span>
                  <span className="text-muted-foreground">
                    {round.cards}枚 - {round.target}
                  </span>
                </div>
                <div className="relative h-6 overflow-hidden rounded bg-muted">
                  <div
                    className={`h-full transition-all ${
                      round.strength === "高"
                        ? "bg-green-500"
                        : round.strength === "中〜高"
                          ? "bg-green-400"
                          : round.strength === "中"
                            ? "bg-yellow-500"
                            : round.strength === "低〜中"
                              ? "bg-orange-400"
                              : "bg-red-400"
                    }`}
                    style={{ width: `${(round.cards / 52) * 100}%` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white mix-blend-difference">
                      {round.strength}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {selectedStrategy === "conservative" && (
            <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
              <h4 className="mb-2 text-sm font-semibold">💎 保守的戦略の特徴</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 序盤: 低い札でリスクを抑える</li>
                <li>• 中盤: 徐々に役の強さを上げる</li>
                <li>• 終盤: 高い札で強い役を作り勝負</li>
                <li>
                  • <strong>メリット:</strong> 終盤に確実に強い手を作れる
                </li>
                <li>
                  • <strong>デメリット:</strong> 序盤でビオスを奪われるリスク
                </li>
              </ul>
            </div>
          )}

          {selectedStrategy === "aggressive" && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
              <h4 className="mb-2 text-sm font-semibold">⚔️ 攻撃的戦略の特徴</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 序盤: 高い札で強い役を作る</li>
                <li>• 中盤: 中堅の札で凌ぐ</li>
                <li>• 終盤: 弱い手でも時間稼ぎで勝つ</li>
                <li>
                  • <strong>メリット:</strong> 序盤でビオスを大きく奪える
                </li>
                <li>
                  • <strong>デメリット:</strong> 終盤に弱い手しか作れない
                </li>
              </ul>
            </div>
          )}

          {selectedStrategy === "balanced" && (
            <div className="rounded-lg border border-secondary/20 bg-secondary/10 p-4">
              <h4 className="mb-2 text-sm font-semibold">⚖️ バランス型戦略の特徴</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>• 全回戦で一定の強さを維持</li>
                <li>• 中盤から徐々に強い役を狙う</li>
                <li>• 安定した勝率を目指す</li>
                <li>
                  • <strong>メリット:</strong> 全回戦で戦える
                </li>
                <li>
                  • <strong>デメリット:</strong> 決定打に欠ける
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="rounded bg-muted p-3 text-xs">
          <p className="mb-1 font-semibold">🃏 重要ポイント</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• 一度使ったカードは二度と使えない（52枚を5回戦で分割）</li>
            <li>• 高いカード（A, K, Q, J, 10）の配分が特に重要</li>
            <li>• 相手の戦略を読んで柔軟に対応することが勝利の鍵</li>
            <li>• ビオスの残量と合わせて総合的に判断</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
