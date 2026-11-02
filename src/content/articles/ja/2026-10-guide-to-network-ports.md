---
title: "番号を守る：初心者のためのネットワークポート入門"
description: "機械はどのようにデータを送受信しているのでしょうか。"
showDescription: false
pubDate: 2026-10-15
authors: ["James Tablang"]
tags: ["networking"]
issue: "2026-10"
order: 2
draft: false
---

## はじめに

機械はどのようにデータを送受信しているのでしょうか。物理的には、私たちのコンピューターや端末のハードウェアにはソケットが組み込まれていて、USBやHDMIなどで接続できます。パソコンにUSBメモリを差し込めば、その中のデータにアクセスできます。予備のディスプレイにHDMIケーブルをつなげば、画面をそこに映し出せます。ほかにも、まだまだあります。では、これはデジタルの世界ではどのように行われているのでしょうか。ウェブサイトから画像をダウンロードするたびに、誰かがあなたの端末にケーブルを差し込んでいるわけではありません。その答えが、ネットワークポートです。

ネットワークポートは、IANA（Internet Assigned Numbers Authority）によって管理されており、0から65535までの番号で表されます [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/)。そして、端末同士がデータをやり取りできるようにしています。つまりネットワークポートは、情報が端末の間を行き来できるようにする港のような役割を果たし、私たちが「インターネット」と呼んでいるものを支えているのです。もう少し技術的に言えば、ネットワークポートは、あなたのノートパソコンや、この記事を書いているパソコンを含む端末が、送受信するデータを処理するための仕組みです。端末にはデータの届け先を見つけるためのIPアドレスがありますが、データが向けられた特定のネットワークポートが、そのデータを正しい場所に届ける役割を担います [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/)。ネットワークポートがあるからこそ、端末はウェブを閲覧したり、ダウンロードを完了したり、そのほか数多くのことを、情報の断片が混ざり合うことなく行えるのです [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/)。とはいえ、こんな疑問を持つ人もいるでしょう。これらのポートは、どのように整理されているのでしょうか。

## よく使われるポート

ポートは、システムポート、登録済みポート、動的ポートの3つのカテゴリーに分けられます [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/)。システムポート（0〜1023）は、システムレベルの処理や日常的な用途に使われるポートです。

<div class="indent">

たとえば、ファイルのダウンロードやアップロードといった日常的な作業を考えてみてください。これはファイル転送プロトコル（FTP）で行うことができ、FTPはポート20と21を、それぞれ認証とデータの移動に使います。

</div>

登録済みポート（1024〜49151）は、エンジニアや企業が自社のサービスのために予約しているもので、よく知られた名前が次のようなポートに結びついています。

- ポート1433：MicrosoftのSQL Serverデータベース
- ポート3689：AppleのiTunesのオーディオアクセス
- ポート4195：Amazonが音声・動画のストリーミングに使うポート
- ほかにも、まだまだあります [\[2\]](https://www.iana.org/assignments/service-names-port-numbers)。

最後に、動的ポート（49152〜65535）はクライアント側のポートで、ユーザーであるあなたが、自分のパソコン上で自由に使うことができます。

<div class="indent">

この最後のカテゴリーはクライアント側、つまり処理があなたのパソコン上で行われるため、これらのポートは通常、システムポートや登録済みポート（サーバー側）に接続するために使われます。つまり、ウェブページに接続しようとすると、あなたのパソコンは一時的に動的ポートのひとつを割り当てて、サーバー側のポートに接続するのです [\[1\]](https://www.geeksforgeeks.org/computer-networks/what-is-network-port/)。

</div>

このようにポートは端末をより大きなネットワークにつなぐ手助けをしていますが、リスクがないわけではありません。

## 攻撃対象領域

2021年4月、米国最大の石油パイプライン網を所有するColonial Pipeline社が、ロシアのハッカー集団DarkSideによって侵害されました。このハッカー集団は、VPN接続に紐づいた古いアカウントの流出したパスワードを使って、Colonial社のシステムに侵入していました。DarkSideは気づかれないまま侵入し、Colonial社のデータを100ギガバイト余り持ち出しました。そして同年5月、DarkSideは同社の請求・会計システムを暗号化し、Colonial社はパイプラインの全面停止に追い込まれ、東海岸一帯で燃料価格が急騰しました。最終的に、このハッカー集団は復号ツールと引き換えに、同社から約440万ドルの身代金を手に入れました。[\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident)

攻撃の全期間を通じて、DarkSideは「環境寄生型（LOTL：living-off-the-land）」の手法を使っていました。これは、信頼されているサービスを狙い、システムに組み込まれたツールを悪用してシステムを侵害する手法です [\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident)。たとえば攻撃者は、ネットワークポートを利用して身を隠し、データの持ち出しや乗っ取りに使うツールの通信を、暗号化されたウェブ通信の標準であるポート443経由で流すことで、検知を逃れていました [\[3\]](https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident)。外部にさらされ、適切に管理されていないポートは、よくある根深いサイバーセキュリティ上のリスクです。その理由は、ネットワークポートそのものが問題なのではないからです。問題は、ポートを通じて待ち受けているものと、私たちがみすみす持ち出させてしまうものなのです。では、どうすればポートを安全に保ち、システムが乗っ取られないようにできるのでしょうか。

## 番号を守る

日常的な一般の利用において、最善のセキュリティ対策の中心となるのは、（1）ネットワーク通信の見通しをよく保つこと、そして（2）外部にさらされているポートを最小限にすることです [\[4\]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure)。

1つ目のポイントについて、見通しをよく保つことで、自分のパソコンで何が起きているかをはっきりと確認し、監視できるようになります。そのためには、自分のパソコン用にシンプルなログ記録・監査の仕組みを作ることを検討してみてください [\[5\]](https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations)。家の点検のための段取りを作るようなものだと考えてください。ただし、配管や壁を見る代わりに、ポートと、それを使っているサービス、そしてログからわかるパターンを見ていくのです。やり方はたくさんあるので、まずは次の一般的なガイドラインに従ってみてください。

- 記録しておく価値があるものを決めましょう。パソコンやセキュリティを危険にさらすような重要なイベント（サインインの失敗、システムの権限に関する問い合わせなど）を考えてみてください。
- システムを守るための対策を取りましょう。システムの設定を見直し、セキュリティを高められる項目がないか確認してください（システムに組み込まれたファイアウォール、IPアドレスのポリシー、パブリック／プライベートネットワークの使い分けなどが含まれます）。
- 標準で用意されている監査とログ記録を設定しましょう。方法はOSによって異なります。
  - Windowsの場合：
    - 上位エディションでは、`secpol.msc` を使って、監査ポリシーを画面上で編集できます [\[6\]](https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging)。`secpol.msc` を実行し、「ローカル ポリシー」の下にある項目を開けば、監査を編集できます [\[6\]](https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging)。
    - 標準的なエディションでは、ターミナルで `auditpol` コマンドを実行して、ポリシーを確認できます [\[7\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol)。`auditpol` コマンドの後に `/get` を付ければポリシーを確認でき、`/set` を付ければ設定できます [\[7\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol)。また、これを行うには、使用するターミナルを管理者として実行する必要がある場合があります。
  - macOSの場合：
    - ログは、「コンソール」アプリケーションの左側のサイドバーで確認できます [\[8\]](https://support.apple.com/guide/console/welcome/mac)。
    - さらに、ターミナルで `log` コマンドを使えば、統合ログ（Unified Logging）からログを確認できます [\[9\]](https://education.apple.com/story/250014802)。一般的には、`log show --last {さかのぼって確認したい期間}` でログを確認できます [\[9\]](https://education.apple.com/story/250014802)。`log` について詳しくは、`man log` を実行すると確認できます。
- これらのログは、定期的に監視・確認する必要があります [\[5\]](https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations)。週に1日を決めてパソコンのログを見直し、怪しいと感じたものを書き留めておきましょう。

これらのガイドラインを使えば、端末の内部で何が起きているかを把握しやすくなります。では、ユーザーであるあなたは、どのように手を入れて、ポートに関する設定を変えていけばよいのでしょうか。それが2つ目のポイント、外部にさらされているポートや、必要もなく開いているポートを閉じて、脆弱性を最小限にすることです。次の手順で行えます。

- ネットワークポートを直接確認する方法を覚えましょう。方法はOSによって異なります。
  - Windowsの場合：
    - ターミナルで `netstat` コマンドを使うと、ポートを確認できます [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat)。
    - `netstat -ano | findstr LISTENING` を使うと、現在待ち受け中、つまり通信を待っているポートの一覧を取得できます [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat)。
    - `netstat -ano` を使うと、実際に使われていて、現在開いているポートの一覧を表示できます [\[10\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat)。
  - macOSの場合：
    - ターミナルで `lsof` コマンドを使うと、ポートを確認できます [\[11\]](https://man.archlinux.org/man/lsof.8)。このコマンドのオプションは、`man lsof` を実行すると確認できます。
    - `sudo lsof -i -P -n -sTCP:LISTEN` コマンドを実行すると、現在待ち受け中のポート、つまりネットワーク通信を待っているポートが絞り込まれて表示されます [\[11\]](https://man.archlinux.org/man/lsof.8)。
    - `sudo lsof -i -P -n` を実行すると、開いているネットワークポートがすべて表示されます [\[11\]](https://man.archlinux.org/man/lsof.8)。
- 自分に必要で、実際に使っているサービスやアプリケーションを見直しましょう。ネットワークポートは、サービスがデータをやり取りするために使われます。動作中のポートに見覚えのないサービスや不要なサービスが表示されていたら、そのPIDを控えておきましょう。
- 怪しいポートの一覧ができたら、それらを閉じていきます。方法はOSによって異なります。
  - Windowsの場合：`taskkill /PID {} /F` を実行します。「{}」の部分を、停止したい怪しいタスクのPIDに置き換えると、そのタスクが停止し、関連するポートが閉じられます [\[12\]](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill)。
  - macOSの場合：`sudo kill -9 {}` を実行します。`{}` の部分を、停止したいサービスのPIDに置き換えると、そのサービスが停止し、使っていたポートが閉じられます [\[13\]](https://man.archlinux.org/man/kill.1)。

まとめると、ネットワークポートは、私たちがネットワーク全体とどのように関わるかを支える、現代のコンピューティングの驚くべき仕組みです。その一方で、ハッカーや脅威アクターが悪用できる、かなり大きな攻撃対象領域にもなっています。絶えず変化するデジタルの世界で自分の安全を守るための対策を講じるかどうかは、ユーザーであるあなた次第なのです。

## 参考文献

1. GeeksForGeeks. "What is Network Port?" July 2025. https://www.geeksforgeeks.org/computer-networks/what-is-network-port/
2. Internet Assigned Numbers Authority (IANA). "Service Name and Transport Protocol Port Number Registry." October 2026. https://www.iana.org/assignments/service-names-port-numbers
3. Bellamkonda, Srikanth. "Ransomware Attacks on Critical Infrastructure: A Study of the Colonial Pipeline Incident." December 2024. https://www.researchgate.net/publication/386014193_Ransomware_Attacks_On_Critical_Infrastructure_A_Study_Of_The_Colonial_Pipeline_Incident
4. Cybersecurity and Infrastructure Security Agency (CISA). "Enhanced Visibility and Hardening Guidance for Communications Infrastructure." December 2024. https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure
5. Australian Cyber Security Centre (ACSC). "Identifying and Mitigating Living Off the Land Techniques." February 2024. https://www.cyber.gov.au/advisory/identifying-and-mitigating-living-off-the-land-techniques#best-practice-recommendations
6. Microsoft Learn. "Auditing." August 2023. https://learn.microsoft.com/en-us/windows/win32/fwp/auditing-and-logging
7. Microsoft Learn. "auditpol." February 2023. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/auditpol
8. Apple. "Console User Guide." https://support.apple.com/guide/console/welcome/mac
9. Apple EDU. "Unified Logging on Apple Devices: A Guide for Education IT." October 2025. https://education.apple.com/story/250014802
10. Microsoft Learn. "netstat." September 2026. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netstat
11. Arch Linux. "lsof - list open files." Revision 4.99.7. https://man.archlinux.org/man/lsof.8
12. Microsoft Learn. "taskkill." November 2024. https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill
13. Arch Linux. "kill - terminate a process." September 2026. https://man.archlinux.org/man/kill.1
