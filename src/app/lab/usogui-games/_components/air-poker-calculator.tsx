"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

interface PlayingCard {
  rank: string;
  suit: string;
  value: number;
  display: string;
  id: string;
}

interface HandResult {
  cards: PlayingCard[];
  total: number;
  handType: string;
  rank: number;
}

const suits = {
  spade: "♠",
  heart: "♥",
  diamond: "♦",
  club: "♣",
};

const ranks = [
  { rank: "A", value: 1 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "J", value: 11 },
  { rank: "Q", value: 12 },
  { rank: "K", value: 13 },
];

const getSuitColor = (suit: string): string => {
  switch (suit) {
    case "♠":
      return "text-gray-900 dark:text-gray-100";
    case "♥":
      return "text-red-500";
    case "♦":
      return "text-blue-500";
    case "♣":
      return "text-green-600";
    default:
      return "text-foreground";
  }
};

const getSuitBorderColor = (suit: string): string => {
  switch (suit) {
    case "♠":
      return "border-gray-900 dark:border-gray-100";
    case "♥":
      return "border-red-500";
    case "♦":
      return "border-blue-500";
    case "♣":
      return "border-green-600";
    default:
      return "border-foreground";
  }
};

const createDeck = (): PlayingCard[] => {
  const deck: PlayingCard[] = [];
  for (const [suitName, suitSymbol] of Object.entries(suits)) {
    for (const { rank, value } of ranks) {
      deck.push({
        rank,
        suit: suitSymbol,
        value,
        display: `${rank}${suitSymbol}`,
        id: `${rank}-${suitName}`,
      });
    }
  }
  return deck;
};

const evaluateHand = (cards: PlayingCard[]): { type: string; rank: number } => {
  if (cards.length !== 5) return { type: "不正な手札", rank: 0 };

  const values = cards.map((c) => c.value).sort((a, b) => b - a);
  const suitCounts = cards.reduce(
    (acc, card) => {
      acc[card.suit] = (acc[card.suit] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const valueCounts = cards.reduce(
    (acc, card) => {
      acc[card.value] = (acc[card.value] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );

  const isFlush = Object.values(suitCounts).some((count) => count === 5);
  const counts = Object.values(valueCounts).sort((a, b) => b - a);

  const sortedValues = [...values].sort((a, b) => a - b);
  const isNormalStraight =
    sortedValues[4] - sortedValues[0] === 4 && new Set(sortedValues).size === 5;
  const isLowAceStraight =
    sortedValues[0] === 1 &&
    sortedValues[1] === 2 &&
    sortedValues[2] === 3 &&
    sortedValues[3] === 4 &&
    sortedValues[4] === 5;
  const isHighAceStraight =
    sortedValues[0] === 1 &&
    sortedValues[1] === 10 &&
    sortedValues[2] === 11 &&
    sortedValues[3] === 12 &&
    sortedValues[4] === 13;
  const isStraight = isNormalStraight || isLowAceStraight || isHighAceStraight;

  if (isFlush && isHighAceStraight) {
    return { type: "ロイヤルストレートフラッシュ", rank: 10 };
  }
  if (isFlush && isStraight) {
    return { type: "ストレートフラッシュ", rank: 9 };
  }
  if (counts[0] === 4) {
    return { type: "フォーカード", rank: 8 };
  }
  if (counts[0] === 3 && counts[1] === 2) {
    return { type: "フルハウス", rank: 7 };
  }
  if (isFlush) {
    return { type: "フラッシュ", rank: 6 };
  }
  if (isStraight) {
    return { type: "ストレート", rank: 5 };
  }
  if (counts[0] === 3) {
    return { type: "スリーカード", rank: 4 };
  }
  if (counts[0] === 2 && counts[1] === 2) {
    return { type: "ツーペア", rank: 3 };
  }
  if (counts[0] === 2) {
    return { type: "ワンペア", rank: 2 };
  }
  return { type: "ハイカード", rank: 1 };
};

const findCombinations = (
  availableCards: PlayingCard[],
  target: number,
  maxResults: number = 100,
): HandResult[] => {
  const results: HandResult[] = [];
  const resultsByRank = new Map<number, HandResult[]>();
  const n = availableCards.length;

  for (let a = 0; a < n - 4; a++) {
    for (let b = a + 1; b < n - 3; b++) {
      for (let c = b + 1; c < n - 2; c++) {
        for (let d = c + 1; d < n - 1; d++) {
          for (let e = d + 1; e < n; e++) {
            const combination = [
              availableCards[a],
              availableCards[b],
              availableCards[c],
              availableCards[d],
              availableCards[e],
            ];
            const total = combination.reduce((sum, card) => sum + card.value, 0);

            if (total === target) {
              const evaluation = evaluateHand(combination);
              const result: HandResult = {
                cards: combination,
                total,
                handType: evaluation.type,
                rank: evaluation.rank,
              };

              if (!resultsByRank.has(evaluation.rank)) {
                resultsByRank.set(evaluation.rank, []);
              }
              const rankResults = resultsByRank.get(evaluation.rank)!;
              if (rankResults.length < 3) {
                rankResults.push(result);
              }
            }
          }
        }
      }
    }
  }

  const sortedRanks = Array.from(resultsByRank.keys()).sort((a, b) => b - a);
  for (const rank of sortedRanks) {
    results.push(...(resultsByRank.get(rank) || []));
    if (results.length >= maxResults) break;
  }

  return results;
};

export function AirPokerCalculator() {
  const fullDeck = useMemo(() => createDeck(), []);
  const [usedCardIds, setUsedCardIds] = useState<Set<string>>(new Set());
  const [targetNumber, setTargetNumber] = useState<string>("");
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const availableCards = fullDeck.filter((card) => !usedCardIds.has(card.id));

  const toggleCard = (cardId: string) => {
    const newUsedCards = new Set(usedCardIds);
    if (newUsedCards.has(cardId)) {
      newUsedCards.delete(cardId);
    } else {
      newUsedCards.add(cardId);
    }
    setUsedCardIds(newUsedCards);
  };

  const resetUsedCards = () => {
    setUsedCardIds(new Set());
  };

  const parsedTarget = parseInt(targetNumber, 10);
  const combinations =
    !Number.isNaN(parsedTarget) && showResults && availableCards.length >= 5
      ? findCombinations(availableCards, parsedTarget, 10)
      : [];

  const groupedByHand = useMemo(() => {
    const groups = new Map<string, HandResult[]>();
    for (const combo of combinations) {
      if (!groups.has(combo.handType)) {
        groups.set(combo.handType, []);
      }
      groups.get(combo.handType)!.push(combo);
    }
    return Array.from(groups.entries())
      .sort((a, b) => {
        const rankA = a[1][0]?.rank || 0;
        const rankB = b[1][0]?.rank || 0;
        return rankB - rankA;
      })
      .map(([handType, combos]) => ({
        handType,
        rank: combos[0].rank,
        combinations: combos.slice(0, 3),
      }));
  }, [combinations]);

  return (
    <div className="space-y-4">
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="text-xl">🎴 エアポーカー役計算機（完全版）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-sm font-medium">使用済みカード: {usedCardIds.size}/52枚</Label>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowCardSelector(!showCardSelector)}
                  variant="outline"
                  size="sm"
                >
                  {showCardSelector ? "カード選択を閉じる" : "カードを選択"}
                </Button>
                {usedCardIds.size > 0 && (
                  <Button onClick={resetUsedCards} variant="outline" size="sm">
                    リセット
                  </Button>
                )}
              </div>
            </div>

            {showCardSelector && (
              <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">クリックで使用済み/未使用を切り替え</p>
                {Object.entries(suits).map(([suitName, suitSymbol]) => (
                  <div key={suitName}>
                    <div className="mb-2 flex items-center gap-1 text-xs font-semibold">
                      <span className={`text-lg ${getSuitColor(suitSymbol)}`}>{suitSymbol}</span>
                      <span>
                        {suitName === "spade"
                          ? "スペード"
                          : suitName === "heart"
                            ? "ハート"
                            : suitName === "diamond"
                              ? "ダイヤ"
                              : "クラブ"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {ranks.map(({ rank }) => {
                        const cardId = `${rank}-${suitName}`;
                        const isUsed = usedCardIds.has(cardId);
                        const colorClass = getSuitColor(suitSymbol);
                        const borderClass = getSuitBorderColor(suitSymbol);
                        return (
                          <button
                            key={cardId}
                            type="button"
                            onClick={() => toggleCard(cardId)}
                            className={`h-12 w-10 rounded border-2 text-xs font-semibold transition-all ${
                              isUsed
                                ? "border-muted-foreground/50 bg-muted text-muted-foreground line-through opacity-50"
                                : `bg-background ${borderClass} ${colorClass} hover:bg-accent`
                            }`}
                          >
                            <div>{rank}</div>
                            <div className="text-base">{suitSymbol}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {usedCardIds.size > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                残り{availableCards.length}枚のカードから計算します
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="target-number" className="mb-2 block text-sm font-medium">
              目標数字を入力
            </Label>
            <input
              id="target-number"
              type="number"
              min="15"
              max="55"
              value={targetNumber}
              onChange={(e) => {
                setTargetNumber(e.target.value);
                setShowResults(false);
              }}
              className="w-full rounded-md border-2 bg-background px-4 py-3 text-lg focus:border-primary"
              placeholder="15〜55の数字を入力"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              カードの合計値（最小15: A-2-3-4-5、最大55: 9-10-J-Q-K）
              <br />
              ロイヤルストレートフラッシュ: 10-J-Q-K-A = 47
            </p>
          </div>

          {parsedTarget && availableCards.length >= 5 && (
            <Button onClick={() => setShowResults(true)} className="w-full" disabled={showResults}>
              {showResults ? "計算完了" : "組み合わせを計算"}
            </Button>
          )}

          {availableCards.length < 5 && (
            <div className="rounded border border-destructive/20 bg-destructive/10 p-3 text-sm">
              ⚠️ 残りカードが5枚未満です。使用済みカードをリセットしてください。
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && parsedTarget && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <span className="text-2xl font-bold text-primary">{parsedTarget}</span>
              <span>で作成可能な役（強い順）</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              残り{availableCards.length}枚から{combinations.length}通りの組み合わせが見つかりました
            </p>
          </CardHeader>
          <CardContent>
            {groupedByHand.length > 0 ? (
              <div className="space-y-4">
                {groupedByHand.map((group, groupIndex) => (
                  <div key={group.handType}>
                    <div
                      className={`rounded-lg border-2 p-4 ${
                        groupIndex === 0
                          ? "border-primary bg-primary/10"
                          : groupIndex === 1
                            ? "border-secondary bg-secondary/10"
                            : "border-muted bg-muted"
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-2xl">
                          {groupIndex === 0
                            ? "🥇"
                            : groupIndex === 1
                              ? "🥈"
                              : groupIndex === 2
                                ? "🥉"
                                : ""}
                        </span>
                        <div>
                          <p className="text-lg font-bold">{group.handType}</p>
                          <p className="text-xs text-muted-foreground">
                            強さランク: {group.rank}/10 | {group.combinations.length}
                            通りの組み合わせ
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {group.combinations.map((combo, comboIndex) => (
                          <div
                            key={comboIndex}
                            className="flex items-center gap-2 rounded bg-background p-2"
                          >
                            {combo.cards.map((card, cardIndex) => (
                              <div
                                key={cardIndex}
                                className={`min-w-12 rounded border-2 bg-card px-2 py-1 text-center font-mono text-sm font-semibold ${getSuitBorderColor(card.suit)} ${getSuitColor(card.suit)}`}
                              >
                                {card.display}
                              </div>
                            ))}
                            <span className="ml-auto text-xs text-muted-foreground">
                              = {combo.total}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="mb-2 text-lg text-muted-foreground">
                  この数字で作成可能な組み合わせはありません
                </p>
                <p className="text-xs text-muted-foreground">
                  残りカード: {availableCards.length}枚
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <h4 className="mb-3 text-sm font-semibold">💡 使い方</h4>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              1. <strong>使用済みカードを選択</strong>: 過去の回戦で使ったカードをクリックして灰色に
            </p>
            <p>
              2. <strong>目標数字を入力</strong>: 作りたい役の合計値を入力（15〜55）
            </p>
            <p>
              3. <strong>計算実行</strong>: 残りカードから実際に作れる組み合わせを表示
            </p>
            <p className="border-t pt-2">
              <strong>重要:</strong>{" "}
              スート（♠♥♦♣）も考慮するため、フラッシュやストレートフラッシュも正確に判定されます
            </p>
            <p className="border-t pt-2">
              <strong>カードの値:</strong> A=1, 2〜10=額面通り, J=11, Q=12, K=13
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
