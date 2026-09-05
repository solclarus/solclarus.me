import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AirPokerBiosSimulator } from "./_components/air-poker-bios-simulator";
import { AirPokerCalculator } from "./_components/air-poker-calculator";
import { AirPokerCardStrategy } from "./_components/air-poker-card-strategy";
import { AirPokerRoundFlow } from "./_components/air-poker-round-flow";
import { HandkerchiefSimulator } from "./_components/handkerchief-simulator";
import { LabyrinthSimulator } from "./_components/labyrinth-simulator";
import { LeapSecondVisualizer } from "./_components/leap-second-visualizer";
import { NashEquilibriumChart } from "./_components/nash-equilibrium-chart";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "嘘喰いゲーム解説",
  description: "漫画『嘘喰い』に登場するギャンブルの解説・シミュレーター。",
};

export default function UsoguiGamesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">嘘喰いゲーム解説</h1>

      <div className="prose max-w-none prose-neutral dark:prose-invert">
        <p className="lead mb-8 text-muted-foreground">
          漫画「嘘喰い」に登場するギャンブルゲームの解説ページです。
        </p>

        <Tabs defaultValue="air-poker" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="air-poker">エアポーカー</TabsTrigger>
            <TabsTrigger value="handkerchief">ハンカチ落とし</TabsTrigger>
            <TabsTrigger value="labyrinth">ラビリンス</TabsTrigger>
            <TabsTrigger value="tower">業の櫓</TabsTrigger>
          </TabsList>

          {/* エアポーカー */}
          <TabsContent value="air-poker" className="space-y-8">
            <h2 className="mb-6 text-3xl font-bold">エアポーカー（Air Poker）</h2>

            <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span>⚠️</span>
                <span>概要</span>
              </h3>
              <p className="mb-4 text-muted-foreground">
                <strong className="text-foreground">水中で命を賭けて行われる極限のポーカー</strong>
                <br />
                プレイヤーは水中に沈められた椅子に座り、足枷をつけられた状態でゲームを行う。
                ベットに使用するのは「ビオス」と呼ばれる空気入りチップ。
                空気が尽きて溺れた方が負けという、文字通り命懸けのギャンブル。
              </p>
              <div className="mt-4 rounded bg-card p-4">
                <p className="text-sm">
                  <strong>プレイヤー数:</strong> 2人
                  <br />
                  <strong>初期ビオス:</strong> 各25枚（1ビオス = 約80L = 約5分の呼吸）
                  <br />
                  <strong>勝敗:</strong> 空気が尽きて溺れた方が負け
                  <br />
                  <strong>ゲーム形式:</strong> 5回戦制
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <AirPokerCalculator />

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold">基本ルール</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="mb-2 font-semibold">💰 ビオス</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 空気入りチップ</li>
                      <li>• 初期: 各25枚</li>
                      <li>• 1ビオス = 約5分の呼吸</li>
                      <li>• 0になると溺死</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="mb-2 font-semibold">🃏 カード</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 通常のトランプ52枚</li>
                      <li>• 5枚でポーカーの役</li>
                      <li>
                        • <strong>一度使用したカードは使えない</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-destructive pl-4">
                    <h4 className="mb-2 font-semibold">🎲 ゲーム形式</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 5回戦制</li>
                      <li>• アンティは回戦数と同じ</li>
                      <li>• 水中で足枷つき</li>
                      <li>• ビオスが多い方が勝利</li>
                    </ul>
                  </div>
                </div>
              </div>

              <AirPokerRoundFlow />
              <AirPokerCardStrategy />
              <AirPokerBiosSimulator />
            </div>
          </TabsContent>

          {/* ハンカチ落とし */}
          <TabsContent value="handkerchief" className="space-y-8">
            <h2 className="mb-6 text-3xl font-bold">ハンカチ落とし（臨死ゲーム）</h2>

            <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span>⚠️</span>
                <span>概要</span>
              </h3>
              <p className="mb-4 text-muted-foreground">
                <strong className="text-foreground">
                  「屋形越え編」のクライマックスを飾る究極の心理戦
                </strong>
                <br />
                斑目貘とお屋形様による一対一の命を賭けた勝負。
                子供の遊び「ハンカチ落とし」をベースに、臨死薬という致死性の要素を組み合わせた、
                1分間の中で繰り広げられる極限の読み合い。
              </p>
              <div className="mt-4 rounded bg-card p-4">
                <p className="text-sm">
                  <strong>プレイヤー数:</strong> 2人（D:ドロップ側、C:チェック側）
                  <br />
                  <strong>時間:</strong> 1ゲーム1分間
                  <br />
                  <strong>勝敗:</strong> 臨死薬により死亡した方が敗北
                  <br />
                  <strong>別名:</strong> 臨死ゲーム
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold">基本ルール</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="mb-2 font-semibold">🎯 ゲームの仕組み</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • <strong>D（ドロップ）:</strong> ハンカチを落とす側
                      </li>
                      <li>
                        • <strong>C（チェック）:</strong> 振り向いて確認する側
                      </li>
                      <li>• 1ゲーム1分間、お互い1度だけアクション</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-destructive pl-4">
                    <h4 className="mb-2 font-semibold">💉 臨死薬システム</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>
                        • <strong>座視の際:</strong> ドロップ〜チェックの時間差
                      </li>
                      <li>
                        • <strong>成功:</strong> 座視の際の時間分蓄積
                      </li>
                      <li>
                        • <strong>失敗:</strong> 蓄積分+60秒分を即座に注射
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <HandkerchiefSimulator />
              <NashEquilibriumChart />
              <LeapSecondVisualizer />
            </div>
          </TabsContent>

          {/* ラビリンス */}
          <TabsContent value="labyrinth" className="space-y-8">
            <h2 className="mb-6 text-3xl font-bold">ラビリンス（迷宮のミノタウロス）</h2>

            <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <span>⚠️</span>
                <span>概要</span>
              </h3>
              <p className="mb-4 text-muted-foreground">
                <strong className="text-foreground">
                  警視庁地下に作られた実物大の迷宮ギャンブル
                </strong>
                <br />
                門倉雄大立会人が考案した、パズルゲーム「Black」をベースにした迷宮ゲーム。
                6×6（36部屋）の実物大迷宮を舞台に、4人のプレイヤーが同時にスタートし、
                扉を選択しながら進む中で他プレイヤーと遭遇、Mポイントを賭けた戦いが繰り広げられる。
              </p>
              <div className="mt-4 rounded bg-card p-4">
                <p className="text-sm">
                  <strong>プレイヤー:</strong> 4人（斑目貘、マルコ、天真征一、箕輪勢一）
                  <br />
                  <strong>立会人:</strong> 門倉雄大
                  <br />
                  <strong>場所:</strong> 警視庁地下の実物大迷宮（6×6の部屋）
                  <br />
                  <strong>目的:</strong> Lファイルの獲得
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-xl font-semibold">基本ルール</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="mb-2 font-semibold">🏛️ 迷宮の構造</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 6×6グリッド（36部屋）の実物大迷宮</li>
                      <li>• 部屋は横1〜6、縦A〜Fで表記</li>
                      <li>• 各部屋に4つの扉（上下左右）</li>
                      <li>• 扉は外部から電子鍵で制御</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="mb-2 font-semibold">⏱️ 行動ルール</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 扉選択の制限時間: 5分/部屋</li>
                      <li>• 部屋に進入すると1M獲得</li>
                      <li>• プレイヤー同士が遭遇したら対決</li>
                      <li>• 賭郎スタッフへの接触禁止</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-destructive pl-4">
                    <h4 className="mb-2 font-semibold">💥 M-time（対決ルール）</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 遭遇時、Mポイントを秘密裏に申告</li>
                      <li>• 多く申告した方が勝利</li>
                      <li>• 勝者は30秒のM-timeを獲得</li>
                      <li>• 敗者は反撃不可、防御・逃走のみ</li>
                      <li>• 双方とも申告したMポイントを失う</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-destructive pl-4">
                    <h4 className="mb-2 font-semibold">🎲 Blackゲームとは</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 一筆書きパズルゲーム</li>
                      <li>• 全ての部屋を最短経路で通る</li>
                      <li>• 最初は直進、その後は曲がる</li>
                      <li>• 各プレイヤーに異なるルートが設定</li>
                    </ul>
                  </div>
                </div>
              </div>

              <LabyrinthSimulator />
            </div>
          </TabsContent>

          {/* 業の櫓 */}
          <TabsContent value="tower" className="space-y-8">
            <h2 className="mb-6 text-3xl font-bold">業の櫓（ごうのやぐら）</h2>

            <div className="rounded-lg border bg-muted p-6 text-center">
              <p className="text-muted-foreground">準備中... 間もなく追加されます</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
