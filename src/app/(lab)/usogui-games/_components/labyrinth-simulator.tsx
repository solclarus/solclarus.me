"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Direction = "up" | "down" | "left" | "right";
type PlayerColor = "blue" | "red" | "green" | "purple";

interface Player {
  id: number;
  name: string;
  color: PlayerColor;
  row: number;
  col: number;
  mPoints: number;
  isActive: boolean;
}

interface Room {
  visited: boolean;
  visitedBy: number[];
}

const GRID_SIZE = 6;
const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = ["1", "2", "3", "4", "5", "6"];

const PLAYER_COLOR_CLASSES: Record<PlayerColor, string> = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
};

export function LabyrinthSimulator() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "貘", color: "blue", row: 0, col: 0, mPoints: 0, isActive: true },
    { id: 2, name: "天真", color: "red", row: 5, col: 5, mPoints: 0, isActive: false },
  ]);

  const [currentPlayer] = useState(0);
  const [rooms, setRooms] = useState<Room[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ({ visited: false, visitedBy: [] })),
      ),
  );

  const [selectedDoor, setSelectedDoor] = useState<Direction | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [gameLog, setGameLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setGameLog((prev) => [...prev, message].slice(-5));
  };

  const canMoveTo = (fromRow: number, fromCol: number, direction: Direction): boolean => {
    switch (direction) {
      case "up":
        return fromRow > 0;
      case "down":
        return fromRow < GRID_SIZE - 1;
      case "left":
        return fromCol > 0;
      case "right":
        return fromCol < GRID_SIZE - 1;
      default:
        return false;
    }
  };

  const selectDoor = (direction: Direction) => {
    const player = players[currentPlayer];

    if (!canMoveTo(player.row, player.col, direction)) {
      addLog(`${player.name}: 範囲外の扉を選択できません`);
      return;
    }

    setSelectedDoor(direction);
    addLog(`${player.name}: ${direction}の扉を選択`);
  };

  const openDoor = () => {
    if (!selectedDoor) return;

    const player = players[currentPlayer];
    let newRow = player.row;
    let newCol = player.col;

    switch (selectedDoor) {
      case "up":
        newRow--;
        break;
      case "down":
        newRow++;
        break;
      case "left":
        newCol--;
        break;
      case "right":
        newCol++;
        break;
    }

    const newPlayers = [...players];
    newPlayers[currentPlayer] = {
      ...player,
      row: newRow,
      col: newCol,
      mPoints: player.mPoints + 1,
    };

    const newRooms = rooms.map((row) => row.map((room) => ({ ...room })));
    newRooms[newRow][newCol].visited = true;
    newRooms[newRow][newCol].visitedBy.push(player.id);

    setPlayers(newPlayers);
    setRooms(newRooms);
    addLog(
      `${player.name}: ${ROWS[newRow]}${COLS[newCol]}に移動。+1M (合計${player.mPoints + 1}M)`,
    );

    const otherPlayer = newPlayers.find(
      (p) => p.id !== player.id && p.row === newRow && p.col === newCol,
    );

    if (otherPlayer) {
      addLog(`💥 ${player.name}と${otherPlayer.name}が遭遇！`);
    }

    setSelectedDoor(null);
    setTimeRemaining(300);
  };

  const getRoomLabel = (row: number, col: number) => {
    return `${ROWS[row]}${COLS[col]}`;
  };

  const getRoomColor = (row: number, col: number) => {
    const room = rooms[row][col];
    const playersHere = players.filter((p) => p.row === row && p.col === col);

    if (playersHere.length > 0) {
      return playersHere.length > 1 ? "bg-yellow-500" : PLAYER_COLOR_CLASSES[playersHere[0].color];
    } else if (room.visited) {
      return "bg-gray-300 dark:bg-gray-700";
    }
    return "bg-gray-100 dark:bg-gray-900";
  };

  const player = players[currentPlayer];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">迷宮のミノタウロス シミュレーター</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 rounded border p-3">
            <p className="text-sm font-semibold">{player.name}（あなた）</p>
            <p className="text-xs text-muted-foreground">
              位置: {getRoomLabel(player.row, player.col)}
            </p>
            <p className="text-xs text-muted-foreground">Mポイント: {player.mPoints}M</p>
            <p className="text-xs text-muted-foreground">残り時間: {timeRemaining}秒</p>
          </div>

          {players.slice(1).map((p) => (
            <div key={p.id} className="space-y-1 rounded border p-3">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted-foreground">Mポイント: {p.mPoints}M</p>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-2 ml-8 flex gap-1">
            {COLS.map((col) => (
              <div key={col} className="w-12 text-center text-xs font-semibold">
                {col}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              {ROWS.map((row) => (
                <div
                  key={row}
                  className="flex h-12 w-6 items-center justify-center text-xs font-semibold"
                >
                  {row}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-1">
              {rooms.map((row, rowIndex) =>
                row.map((_room, colIndex) => {
                  const playersHere = players.filter(
                    (p) => p.row === rowIndex && p.col === colIndex,
                  );

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`flex h-12 w-12 items-center justify-center rounded border-2 border-gray-400 text-xs font-semibold transition-colors duration-200 dark:border-gray-600 ${getRoomColor(rowIndex, colIndex)}`}
                    >
                      {playersHere.map((p) => (
                        <span key={p.id} className="text-lg">
                          {p.name[0]}
                        </span>
                      ))}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">扉を選択してください：</p>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => selectDoor("up")}
              disabled={!canMoveTo(player.row, player.col, "up")}
              variant={selectedDoor === "up" ? "default" : "outline"}
              className="w-20"
              size="sm"
            >
              ↑ 上
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => selectDoor("left")}
                disabled={!canMoveTo(player.row, player.col, "left")}
                variant={selectedDoor === "left" ? "default" : "outline"}
                className="w-20"
                size="sm"
              >
                ← 左
              </Button>
              <Button
                onClick={() => selectDoor("right")}
                disabled={!canMoveTo(player.row, player.col, "right")}
                variant={selectedDoor === "right" ? "default" : "outline"}
                className="w-20"
                size="sm"
              >
                右 →
              </Button>
            </div>
            <Button
              onClick={() => selectDoor("down")}
              disabled={!canMoveTo(player.row, player.col, "down")}
              variant={selectedDoor === "down" ? "default" : "outline"}
              className="w-20"
              size="sm"
            >
              ↓ 下
            </Button>
          </div>

          <div className="text-center">
            <Button onClick={openDoor} disabled={!selectedDoor} className="w-40">
              扉を開ける
            </Button>
          </div>
        </div>

        <div className="h-24 space-y-1 overflow-y-auto rounded bg-muted p-3 text-xs">
          <p className="mb-1 font-semibold">ゲームログ:</p>
          {gameLog.map((log, index) => (
            <p key={index} className="text-muted-foreground">
              {log}
            </p>
          ))}
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
          <h4 className="mb-2 text-sm font-semibold">🎮 迷宮のミノタウロス</h4>
          <p className="mb-2 text-xs text-muted-foreground">
            門倉雄大立会人によって作られた、警視庁地下の実物大迷宮を使ったギャンブル。
            パズルゲーム「Black」をベースにした、6×6（36部屋）の迷宮を舞台に繰り広げられる。
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <strong>• Mポイント:</strong> 部屋に進入する度に1M獲得
            </p>
            <p>
              <strong>• 制限時間:</strong> 扉選択に5分/部屋
            </p>
            <p>
              <strong>• M-time:</strong> プレイヤーが遭遇時、Mポイントを賭けて対決
            </p>
            <p>
              <strong>• ルール:</strong> 一筆書きで全部屋を最短経路で通るパターン
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
