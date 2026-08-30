# 公開前チェックリスト対応状況

参考記事: [Webサービス公開前のチェックリスト (catnose99)](https://zenn.dev/catnose99/articles/547cbf57e5ad28)

認証・課金・メール送信などアカウント機能を前提とした項目は、このサイトには機能自体が無いため対象外としている。

## 未対応(要対応)

- [ ] **アバター画像が本番でHTTP 402** — `/_next/image?url=%2Favatar.png` がVercelの画像最適化枠上限と思われるエラーで壊れている。Vercel側のプラン/使用量を確認するか、コード側で該当画像を`unoptimized`にする。
- [ ] **サーバーエラー通知の仕組みが無い** — Sentry等未導入。Vercelの標準ログ以外で気づく手段が無い。
- [ ] **検索エンジンへのサイトマップ登録** — Google Search Console等への登録状況は未確認。未登録なら要対応。
- [ ] **CSP未設定** — 影響範囲が広いため別途調査してから対応する。

## 対応不要(該当なし)

- 認証Cookie属性・ログイン関連 — アカウント機能が無いため対象外
- 入力値バリデーション・SQLインジェクション対策 — ユーザー入力を受け付ける機能が無いため対象外
- メール送信関連(SPF/DKIM/DMARC等) — メール送信機能が無いため対象外
- 決済機能関連 — 決済機能が無いため対象外

## 対応済み

- alt属性、アイコンボタンの `aria-label`(`Change language` 等)
- `<html lang>` のロケールごとの動的切り替え
- アクセス解析(Vercel Analytics / Speed Insights)
- canonical URL、`sitemap.ts`(hreflang alternates付き)、`robots.ts`(host付き)
- 全ページのtitle/description、OGP画像(全ルートで生成)、`openGraph.url`のロケール対応
- 構造化データ(WebSite / Article / BreadcrumbList / Person)
- 404ページ(適切なステータスコード、ホームへの導線)
- セキュリティヘッダ: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control
- 画像のレイアウトシフト対策(width/height明示)、`scrollbar-gutter: stable`
- ファビコン/アイコンを`icons`メタデータで明示的に紐付け(favicon 16x16/32x32, apple-touch-icon)
- bundle-analyzer導入済み(`pnpm run analyze`)
- 本番ドメインをapex(`solclarus.me`)に統一(www→apexへ308リダイレクト)
- CI: lint/format/typecheck/vitest + Playwright e2e(navigation + axe-core a11y)+ Lighthouse CI
- 依存関係更新はDependabotからRenovateへ移行中(`renovate.json`設定済み)
- 未使用ファイルの削除(create-next-app既定のSVG群、未参照の`avatar.jpeg`)
- `work-card.tsx`の内部URL/外部URL分岐に対する回帰テスト追加
