"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Step = "ante" | "betting" | "raise" | "showdown" | "result" | "underwater";

const steps: {
  id: Step;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "ante",
    title: "アンティ",
    description: "各プレイヤーが参加料を場に出す",
    icon: "💰",
  },
  {
    id: "betting",
    title: "ベッティング",
    description: "ファーストベット権を持つ側がアクション",
    icon: "🎯",
  },
  {
    id: "raise",
    title: "レイズ／コール",
    description: "相手がレイズ、コール、フォールドを選択",
    icon: "⬆️",
  },
  {
    id: "showdown",
    title: "ショーダウン",
    description: "手札を公開し、役の強さを比較",
    icon: "🃏",
  },
  {
    id: "result",
    title: "結果",
    description: "勝者が場のビオスを獲得",
    icon: "🏆",
  },
  {
    id: "underwater",
    title: "水中時間",
    description: "ラウンド中の経過時間で酸素を消費",
    icon: "⏱️",
  },
];

export function AirPokerRoundFlow() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [pot, setPot] = useState(2);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (steps[currentStep + 1].id === "raise") {
        setPot(pot + 2);
      }
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setPot(2);
  };

  const step = steps[currentStep];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">1回戦の流れ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="mb-2 flex justify-between">
            {steps.map((s, index) => (
              <div
                key={s.id}
                className={`flex flex-1 flex-col items-center ${index < steps.length - 1 ? "relative" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-1/2 h-0.5 w-full ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                    style={{ transform: "translateY(-50%)" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            {steps.map((s) => (
              <div key={s.id} className="flex-1 text-center">
                {s.title}
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-48 rounded-lg border border-primary/20 bg-primary/10 p-6">
          <div className="mb-4 text-center">
            <div className="mb-2 text-4xl">{step.icon}</div>
            <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>

          <div className="mt-4 space-y-3">
            {step.id === "ante" && (
              <div className="rounded bg-card p-3 text-sm">
                <p>
                  第1回戦のアンティ: <strong>1ビオス</strong> ずつ
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  回戦が進むごとにアンティは増加（2回戦=2ビオス、3回戦=3ビオス...）
                </p>
                <div className="mt-2 rounded bg-muted p-2 text-xs">場のビオス: {pot} 個</div>
              </div>
            )}

            {step.id === "betting" && (
              <div className="rounded bg-card p-3 text-sm">
                <p className="mb-2">ファーストベット権を持つ側の選択肢：</p>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>
                    <strong>ベット:</strong> 追加のビオスを賭ける
                  </li>
                  <li>
                    <strong>チェック:</strong> 様子見
                  </li>
                  <li>
                    <strong>フォールド:</strong> 降りる（場のビオスを放棄）
                  </li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">制限時間: 30秒</p>
              </div>
            )}

            {step.id === "raise" && (
              <div className="rounded bg-card p-3 text-sm">
                <p className="mb-2">相手の選択肢：</p>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>
                    <strong>レイズ:</strong> さらに上乗せ（場の総額の半分まで）
                  </li>
                  <li>
                    <strong>コール:</strong> 同額を出して勝負
                  </li>
                  <li>
                    <strong>フォールド:</strong> 降りる
                  </li>
                </ul>
                <div className="mt-2 rounded bg-muted p-2 text-xs">
                  場のビオス: {pot} 個（レイズ後）
                </div>
              </div>
            )}

            {step.id === "showdown" && (
              <div className="rounded bg-card p-3 text-sm">
                <p className="mb-2">双方が手札を公開し、ポーカーの役で勝敗を決定</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-primary/10 p-2">
                    <p className="font-semibold">プレイヤー</p>
                    <p className="text-muted-foreground">例: ツーペア</p>
                  </div>
                  <div className="rounded bg-destructive/10 p-2">
                    <p className="font-semibold">相手</p>
                    <p className="text-muted-foreground">例: ワンペア</p>
                  </div>
                </div>
              </div>
            )}

            {step.id === "result" && (
              <div className="rounded bg-card p-3 text-sm">
                <p className="mb-2">勝者が場の全ビオスを獲得</p>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="rounded bg-primary/10 p-2">
                    プレイヤー勝利 → 場の{pot}ビオスを獲得
                  </div>
                  <p className="text-muted-foreground">
                    使用したカードは記録され、以降の回戦では使用不可
                  </p>
                </div>
              </div>
            )}

            {step.id === "underwater" && (
              <div className="rounded bg-card p-3 text-sm">
                <p className="mb-2">水中での時間経過により、プレイヤーは酸素を消費</p>
                <ul className="ml-4 list-disc space-y-1 text-xs">
                  <li>1ラウンド約1〜2分程度の水中時間</li>
                  <li>時間稼ぎも有効な戦術（相手の空気切れを狙う）</li>
                  <li>ベッティングの30秒制限がプレッシャーに</li>
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  💡 5回戦全体で最低5分、実際はもっと長い時間水中にいる
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={nextStep} disabled={currentStep >= steps.length - 1} className="flex-1">
            {currentStep < steps.length - 1 ? "次へ" : "完了"}
          </Button>
          <Button onClick={reset} variant="outline">
            リセット
          </Button>
        </div>

        <div className="rounded bg-muted p-3 text-xs">
          <p className="mb-1 font-semibold">💡 重要ポイント</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• これを5回戦繰り返す（アンティは回戦ごとに増加）</li>
            <li>• ビオスが0になった方が敗北</li>
            <li>• カード管理と空気管理の両方が重要</li>
            <li>• 時間稼ぎと心理戦が勝敗を分ける</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
