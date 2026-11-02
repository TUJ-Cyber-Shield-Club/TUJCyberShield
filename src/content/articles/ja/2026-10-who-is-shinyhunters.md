---
title: "ShinyHuntersとは何者か"
description: "IT担当者を名乗る人物からの、もっともらしい一本の電話が、大規模なデータ侵害への扉を開くことがあります。"
showDescription: false
pubDate: 2026-10-26
authors: ["Cassady Mead"]
tags: ["social-engineering", "phishing"]
issue: "2026-10"
order: 3
draft: false
---

IT担当者を名乗る人物からの、もっともらしい一本の電話が、大規模なデータ侵害への扉を開くことがあります。成功したサイバー攻撃の90%以上がフィッシングメールから始まっていることを知っていましたか [\[3\]](https://www.cisa.gov/audiences/individuals-and-families)。これがソーシャルエンジニアリング、つまり人間の行動につけ込むことで技術的なセキュリティシステムをすり抜ける手口です。ShinyHuntersの攻撃は、犯罪者がソーシャルエンジニアリングを使って企業の情報を盗み、金銭を要求するやり方を示しています。FBIはShinyHuntersを、大規模なデータ侵害と恐喝を専門とするサイバー犯罪グループだと説明しています [\[1\]](https://www.ic3.gov/PSA/2026/PSA260515)。

ShinyHuntersの活動は、2020年から現在まで続いています。米司法省によると、ShinyHuntersは2020年4月から2021年7月にかけて、60社以上から盗んだデータを売りに出していました [\[2\]](https://www.justice.gov/usao-wdwa/pr/member-notorious-international-hacking-crew-sentenced-prison)。彼らは数億件もの顧客記録を盗み、被害企業に推定600万ドル以上の損失を与えました [\[2\]](https://www.justice.gov/usao-wdwa/pr/member-notorious-international-hacking-crew-sentenced-prison)。2024年1月には、22歳のフランス国籍のセバスチャン・ラウル（Sebastien Raoult）に、禁錮3年と500万ドル以上の賠償が言い渡されました [\[2\]](https://www.justice.gov/usao-wdwa/pr/member-notorious-international-hacking-crew-sentenced-prison)。それにもかかわらず、ShinyHuntersは今も活動を続けており、最近では2026年6月にOracleのデータ侵害を起こしています [\[5\]](https://cloud.google.com/blog/topics/threat-intelligence/shinyhunters-renewed-mass-exploitation-campaign-targeting-oracle-peoplesoft)。

ともあれ、調査からは、こうした攻撃がいかに信頼を悪用しているかがわかります。2026年1月、Mandiantは、攻撃者がIT担当者になりすまして従業員に電話をかけ、偽の企業ログインページにサインインさせていた手口を報告しました [\[4\]](https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft)。これらのページはパスワードや認証コードを盗み取り、攻撃者はそれを使って情報を盗み出します。これは、ベンダーのインフラの脆弱性ではなく、ソーシャルエンジニアリングによるものです [\[4\]](https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft)。彼らの手口の詳細については、こちらで確認できます：\
https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft

だからこそ、機密情報を扱うときは、メールや電話、さらには人から直接受け取ったものにも、細心の注意を払う必要があります。

## 出典

1. Federal Bureau of Investigation (FBI) / IC3. "ShinyHunters: Cyber Criminal Group Attacks Learning Management System." May 15, 2026. https://www.ic3.gov/PSA/2026/PSA260515
2. U.S. Attorney's Office, Western District of Washington. "Member of notorious international hacking crew sentenced to prison." January 9, 2024. https://www.justice.gov/usao-wdwa/pr/member-notorious-international-hacking-crew-sentenced-prison
3. Cybersecurity and Infrastructure Security Agency (CISA). "Individuals and Families." https://www.cisa.gov/audiences/individuals-and-families
4. Mandiant and Google Threat Intelligence Group (GTIG). "Vishing for Access: Tracking the Expansion of ShinyHunters-Branded SaaS Data Theft." January 31, 2026. https://cloud.google.com/blog/topics/threat-intelligence/expansion-shinyhunters-saas-data-theft
5. Mandiant and Google Threat Intelligence Group (GTIG). "ShinyHunters Renewed Mass Exploitation Campaign Targeting Oracle PeopleSoft." September 26, 2026. https://cloud.google.com/blog/topics/threat-intelligence/shinyhunters-renewed-mass-exploitation-campaign-targeting-oracle-peoplesoft
