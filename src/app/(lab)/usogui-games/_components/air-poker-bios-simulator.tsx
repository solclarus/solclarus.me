"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface RoundResult {
  round: number;
  playerBet: number;
  opponentBet: number;
  playerWins: boolean;
  playerBios: number;
  opponentBios: number;
}

export function AirPokerBiosSimulator() {
  const [currentRound, setCurrentRound] = useState(1);
  const [playerBios, setPlayerBios] = useState(25);
  const [opponentBios, setOpponentBios] = useState(25);
  const [history, setHistory] = useState<RoundResult[]>([]);
  const [playerBet, setPlayerBet] = useState(1);
  const [opponentBet, setOpponentBet] = useState(1);

  const anteAmount = currentRound;

  const simulateRound = (playerWins: boolean) => {
    const totalPot = playerBet + opponentBet;

    let newPlayerBios = playerBios;
    let newOpponentBios = opponentBios;

    if (playerWins) {
      newPlayerBios = playerBios - playerBet + totalPot;
      newOpponentBios = opponentBios - opponentBet;
    } else {
      newPlayerBios = playerBios - playerBet;
      newOpponentBios = opponentBios - opponentBet + totalPot;
    }

    const result: RoundResult = {
      round: currentRound,
      playerBet,
      opponentBet,
      playerWins,
      playerBios: newPlayerBios,
      opponentBios: newOpponentBios,
    };

    setHistory([...history, result]);
    setPlayerBios(newPlayerBios);
    setOpponentBios(newOpponentBios);

    if (currentRound < 5 && newPlayerBios > 0 && newOpponentBios > 0) {
      setCurrentRound(currentRound + 1);
      setPlayerBet(currentRound + 1);
      setOpponentBet(currentRound + 1);
    }
  };

  const reset = () => {
    setCurrentRound(1);
    setPlayerBios(25);
    setOpponentBios(25);
    setHistory([]);
    setPlayerBet(1);
    setOpponentBet(1);
  };

  const isGameOver = playerBios <= 0 || opponentBios <= 0 || currentRound > 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ビオス管理シミュレーター</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">プレイヤー</span>
              <span className="text-sm font-semibold text-primary">{playerBios} ビオス</span>
            </div>
            <div className="relative h-8 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(playerBios / 50) * 100}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {Math.floor(playerBios * 5)} 分の呼吸
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">相手</span>
              <span className="text-sm font-semibold text-destructive">{opponentBios} ビオス</span>
            </div>
            <div className="relative h-8 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-destructive transition-all duration-500"
                style={{ width: `${(opponentBios / 50) * 100}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {Math.floor(opponentBios * 5)} 分の呼吸
              </div>
            </div>
          </div>
        </div>

        {!isGameOver && (
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-3 font-semibold">第{currentRound}回戦</h4>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="mb-2 text-muted-foreground">アンティ: {anteAmount} ビオス（各自）</p>
              </div>

              <div>
                <Label htmlFor="player-bet" className="mb-2 block text-sm font-medium">
                  プレイヤーのベット: {playerBet} ビオス
                </Label>
                <input
                  id="player-bet"
                  type="range"
                  min={anteAmount}
                  max={Math.min(playerBios, 10)}
                  value={playerBet}
                  onChange={(e) => setPlayerBet(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="opponent-bet" className="mb-2 block text-sm font-medium">
                  相手のベット: {opponentBet} ビオス
                </Label>
                <input
                  id="opponent-bet"
                  type="range"
                  min={anteAmount}
                  max={Math.min(opponentBios, 10)}
                  value={opponentBet}
                  onChange={(e) => setOpponentBet(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button onClick={() => simulateRound(true)} className="bg-primary">
                  プレイヤー勝利
                </Button>
                <Button onClick={() => simulateRound(false)} variant="destructive">
                  相手勝利
                </Button>
              </div>
            </div>
          </div>
        )}

        {isGameOver && (
          <div className="rounded-lg bg-accent p-4">
            <h4 className="mb-2 font-semibold">ゲーム終了</h4>
            <p className="text-sm">
              {playerBios <= 0
                ? "プレイヤーのビオスが尽きました"
                : opponentBios <= 0
                  ? "相手のビオスが尽きました"
                  : playerBios > opponentBios
                    ? "プレイヤーの勝利！"
                    : opponentBios > playerBios
                      ? "相手の勝利"
                      : "引き分け"}
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">対戦履歴</h4>
            <div className="space-y-1">
              {history.map((result, index) => (
                <div
                  key={`${index}-${result.round}`}
                  className={`rounded p-2 text-xs ${result.playerWins ? "bg-primary/10" : "bg-destructive/10"}`}
                >
                  <span className="font-semibold">第{result.round}回戦:</span> P {result.playerBet}
                  vs
                  {result.opponentBet} O → {result.playerWins ? "P勝利" : "O勝利"} (P:
                  {result.playerBios} O:
                  {result.opponentBios})
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={reset} variant="outline" className="w-full">
          リセット
        </Button>

        <div className="rounded bg-muted p-3 text-xs">
          <p className="mb-1 font-semibold">💡 使い方</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• 各回戦のベット額を調整して勝敗を決定</li>
            <li>• アンティは回戦数と同じ（1回戦=1ビオス）</li>
            <li>• ビオスが0になるか、5回戦終了で勝敗が決まる</li>
            <li>• 1ビオス = 約5分の呼吸に相当</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
