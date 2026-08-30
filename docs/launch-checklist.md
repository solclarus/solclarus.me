# 公開前チェックリスト対応状況

参考記事: [Webサービス公開前のチェックリスト (catnose99)](https://zenn.dev/catnose99/articles/547cbf57e5ad28)

認証・課金・メール送信などアカウント機能を前提とした項目は、このサイトには機能自体が無いため対象外としている。

## 未対応(要対応)

- [ ] **og:urlのロケール不整合** — `src/app/[locale]/layout.tsx` の `openGraph.url` が `siteConfig.baseUrl` 固定になっており、`alternates.canonical`(`${baseUrl}/${locale}`)とズレている。シェア時のog:urlが常にロケール無しURLを指してしまう。
- [ ] **HSTSヘッダ未設定** — `next.config.ts` の `securityHeaders` に `Strict-Transport-Security` が無い。X-Frame-Options等は設定済み。
- [ ] **CSP未設定** — 影響範囲が広いため別途調査してから対応する。
- [ ] **未使用のファビコン資産** — `public/favicon-16x16.png` / `favicon-32x32.png` / `favicons/` が存在するが、`icons` メタデータや `<link>` からどこにも参照されていない。Next.jsが自動認識するのは `src/app/favicon.ico` のみ。整理 or メタデータ追加が必要。
- [ ] **サーバーエラー通知の仕組みが無い** — Sentry等未導入。Vercelの標準ログ以外で気づく手段が無い。
- [ ] **`scrollbar-gutter` 未設定** — 縦スクロールの有無でレイアウトが左右にガタつく可能性(特にpost詳細ページ)。
- [ ] **検索エンジンへのサイトマップ登録** — Google Search Console等への登録状況は未確認。未登録なら要対応。

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
- 全ページのtitle/description、OGP画像(全ルートで生成)
- 構造化データ(WebSite / Article / BreadcrumbList / Person)
- 404ページ(適切なステータスコード、ホームへの導線)
- セキュリティヘッダ(HSTS以外): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control
- 画像のレイアウトシフト対策(width/height明示)
- bundle-analyzer導入済み(`pnpm run analyze`)
