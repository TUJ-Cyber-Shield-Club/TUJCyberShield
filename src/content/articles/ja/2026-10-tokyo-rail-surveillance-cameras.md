---
title: "東京の鉄道の監視カメラ：プライバシーとセキュリティに関する報告"
description: "次に東急線に乗ったら、天井を見上げてみてほしい。天井の照明のいくつかは、ただの照明ではない。"
showDescription: false
pubDate: 2026-10-31
authors: ["Carl Masters"]
tags: ["privacy"]
issue: "2026-10"
order: 1
featured: true
draft: false
---

## はじめに

次に東急線に乗ったら、天井を見上げてみてほしい。天井の照明のいくつかは、ただの照明ではない。LED蛍光灯の中には、端に小さなカメラユニットが付いたものがあり、同じ筐体の中にはメモリーカードと4Gモデムが収められている。同じ装置の新しいモデルには、マイク、スピーカー、そしてほかにもいくつかのセンサーが加わっている。この装置は「IoTube」と呼ばれ、東京の企業MOYAIが製造したものだ。そして、首都圏の通勤客の多くが、いまや通勤中にカメラに映っている理由のひとつでもある。

この10年ほどで、車内カメラは首都圏の多くの路線で当たり前のものになった。JR東日本は2019年3月までに首都圏の在来線約8,500両すべてに、2021年10月までに新幹線約1,300両すべてに設置を終えた [\[5\]](https://www.jreast.co.jp/press/2023/20231010_ho03.pdf)。東急は2020年7月、こどもの国線を除く全1,247両へのIoTubeの設置を完了した [\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。2023年10月からは、国土交通省の規則により、利用者の多い路線の新造車両にカメラの設置が義務付けられている [\[10\]](https://www.arabnews.jp/en/japan/security-cameras-become-mandatory-for-new-trains-in-japan-106035)。

本稿では、これらのカメラに実際に何ができるのか、AIがどのように組み込まれつつあるのか、アメリカで激しい論争の的になっている監視技術であるFlockのナンバープレート読み取りカメラと同じ部類に入るのか、日本の法律は何を認めているのか、そして攻撃者に対してどれほど無防備なのかを検証する。私の主張はシンプルだ。ハードウェアは、鉄道会社が「この用途に使っている」と説明する範囲を超える能力を持っている。日本はすでに駅での本人追跡を試み、そこから手を引いた経緯がある。そしてより大きなセキュリティ上の弱点は、おそらくレンズの向こう側にあるすべてのもの、つまりモバイルネットワーク、クラウドの管理画面、そして職員用のアプリである。

最初にひとつ断っておく。MOYAIも鉄道各社も、自社のシステムをどのように保護しているかの詳細を公表していない。そのため、セキュリティに関する節は、製品の仕様と、ネットワークカメラ全般について知られていることをもとに書いている。これらの特定の機器に既知の欠陥があることを述べるものではない。

## どの会社がどのカメラを運用しているのか

「東京の地下鉄のカメラ」というひとつのものは存在しない。鉄道会社はそれぞれ独自のシステムを導入しており、列車は会社をまたいで頻繁に直通運転しているため、1回の通勤で複数のシステムの前を通ることもある。

蛍光灯型カメラは、主に東急の話である。東急は2019年、ソフトバンクの4Gデータ通信サービスとセットで販売されるIoTubeを、2020年7月までに全車両に設置すると発表した。基本は1両あたり4台で、規模の小さい路線では2台または3台である。映像は4Gで送信され、東急はこれらの機器にWi-Fiは使っていないとしている [\[1\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)。東急の車両は東京メトロなど他社の路線に乗り入れており、カメラはそこでも録画を続けているため [\[9\]](https://tetsudo-ch.com/10577025.html)、自分を地下鉄の利用者だと思っている人の多くも、このカメラに撮影されてきた。京王は2022年、第2世代モデル「IoTube Pro.4G」のうち、カメラ部分を蛍光灯から切り離した天井取り付け型を全車両に採用した [\[12\]](https://prtimes.jp/main/html/rd/p/000000007.000069371.html)。京急はさらに後から、「IoTube Pro.4G」を、NTTコミュニケーションズを通じて「THEASIGHT for IoTube」として導入した。2027年3月までに全790両に設置される予定で、地上からのリアルタイム映像確認とAI解析機能を備えている [\[2\]](https://digitalpr.jp/r/70474)。

地下鉄の事業者は、より従来型の方式を選んだ。東京メトロは2017年、2018年度以降に全車両の乗降ドアの上部にカメラを設置すると発表したが、メーカーは明らかにしていない。録画を見られるのは限られた社員だけで、映像は警察や、同社の路線に乗り入れる鉄道会社と連携して管理するとしている [\[3\]](https://trafficnews.jp/post/66275)。2021年には、新型車両の導入や大規模改修に合わせて車内カメラの設置を続けているとしていた [\[22\]](https://www.tokyometro.jp/corporate/newsletter/metroNews20210706_l85.pdf)。都営地下鉄も同じ時期に、車両の更新に合わせて全車両の天井にカメラを設置すると発表した [\[4\]](https://www.kotsu.metro.tokyo.jp/pickup_information/news/subway/2017/sub_p_201703146072_h.html)。JR東日本は首都圏の在来線と新幹線の全車両への設置を完了しており、新幹線の大半の車両では指令所などから車内の映像をリアルタイムで確認できる [\[5\]](https://www.jreast.co.jp/press/2023/20231010_ho03.pdf)。同じ仕組みは2023年度末までに山手線の1編成で試験導入する計画で、2024年後半の時点では、2025年度から山手線への導入を目指すとしていた [\[5\]](https://www.jreast.co.jp/press/2023/20231010_ho03.pdf)[\[63\]](https://www.jreast.co.jp/press/2024/20241106_ho02.pdf)。

MOYAIは2018年に設立された東京・港区の会社で、2026年9月に破産を申し立てた [\[6\]](https://www.tsr-net.co.jp/news/tsr/detail/1203297_1521.html)。出資者の一社は2024年、IoTubeが首都圏の主要鉄道会社の車両カメラでNo.1の導入実績を持つと述べており [\[7\]](https://kyodonewsprwire.jp/release/202402096416)、MOYAI自身の製品ページでは、放火犯の逮捕に貢献したことや、ある鉄道会社の顧客から痴漢と痴漢冤罪がともにゼロになったと報告を受けたことが、IoTubeの実績として挙げられている [\[8\]](https://moyai-net.com/iot-ai/)。これらは各社自身による主張である。

東急が蛍光灯型を選んだのは、より早く、より安く設置するためだった [\[13\]](https://news.mynavi.jp/article/20200727-iotube/)。IoTubeは標準的な蛍光灯のソケットにそのまま取り付けられるため、ほとんどの車両では車内に新たな配線を通す必要がない。2020年の東急のメディア説明会では、設置費用は従来の監視カメラのおよそ4分の1とされた [\[9\]](https://tetsudo-ch.com/10577025.html)。設置にかかる時間は1両あたり約30分で、東急の従来型の配線式カメラでは1両あたり2週間の工事が必要だった [\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。照明に組み込まれたカメラは、一般的なドーム型カメラより目立ちにくい。法律に関する節で説明するように、この点は法的に重要な意味を持つ。

その後、政府はカメラの設置を義務化した。2021年に小田急線と京王線の車内で起きた刺傷事件を受けて、国土交通省は技術基準を改正した。2023年10月以降、新幹線の路線と、1日1キロあたりの利用者が10万人以上の路線の新造車両には、録画できるカメラの設置が義務付けられている。指令所へのリアルタイム映像の送信は、費用の問題から任意とされており、システムの運用方法は各鉄道会社が決める [\[10\]](https://www.arabnews.jp/en/japan/security-cameras-become-mandatory-for-new-trains-in-japan-106035)。

## カメラは何を見て、何ができるのか

MOYAIによる新型の「IoTube Pro」シリーズの発表資料には、魚眼レンズの奥にある800万画素の4Kセンサー、録画用のSDカード、ライブ配信が可能な4G LTEモデム、そして機器上でAIを動かすためのクアッドコア1.5GHzのチップが記載されている [\[11\]](https://prtimes.jp/main/html/rd/p/000000004.000069371.html)[\[12\]](https://prtimes.jp/main/html/rd/p/000000007.000069371.html)。さらに、双方向通話のためのマイクとスピーカーも搭載されており、MOYAIはこれらを、サーマル、温度・湿度、3軸加速度、煙、CO2、Bluetooth Low Energyビーコンとあわせて、標準搭載の8つのセンサーに数えている [\[11\]](https://prtimes.jp/main/html/rd/p/000000004.000069371.html)。前のモデルは200万画素・画角160度のカメラで、毎秒15フレームでSDカードに上書きしながら録画しており、AI解析はオプションの追加機能だった [\[13\]](https://news.mynavi.jp/article/20200727-iotube/)[\[14\]](https://www.mcpc-jp.org/jirei/pdf/2103_mcpc_p16_moyai.pdf)[\[15\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20190530_01)[\[16\]](https://mono.ipros.com/product/detail/2000488671/)。

鉄道会社のほとんどは、これらの機能のうちどれを使っているかを明らかにしていない。

まず考えるべきは魚眼レンズだ。4Kの広角映像があれば、オペレーターは後から車内のどの隅でも切り出して拡大できる。そのため、誰もリアルタイムで見ていなかったとしても、確認の際に人の顔やスマートフォンの画面、書類が読み取れてしまう可能性がある。2つ目は音声だ。マイクを搭載したモデルでは、IoTubeのマイクは緊急時の双方向通話のためのものとされているが [\[18\]](https://cloud.watch.impress.co.jp/docs/news/1368250.html)、少なくとも日本の鉄道会社1社は、音声を録音していることを公にしている。阪神電鉄の指令所は車内の音声をリアルタイムで聞くことができ、映像と音声を約1週間保存している [\[17\]](https://www.hanshin.co.jp/company/press/pdf/20230724-syaryou-bouhankamera.pdf)。東京の列車でIoTubeの音声が録音されているかどうかは、本稿で確認した資料には示されていない。3つ目はBluetoothビーコンである。この種のビーコンは、一般に近くのスマートフォンを検知したり、コンテンツを送ったりするために使われる。車内でビーコンが有効になっているかどうかも示されていない。

機器上でAIを動かすことには、良い面と悪い面がある。生の映像が車外に出る量が減るという意味にもなり得るし、MOYAIはエッジAIによって個人情報の秘匿性が高まるとしている [\[11\]](https://prtimes.jp/main/html/rd/p/000000004.000069371.html)。一方で、属性の推定、人数のカウント、自動アラートといった、以前は存在しなかった新しい種類のデータをシステムが生み出すという意味にもなり得る。アクセスの方法も変わった。IoTube以前、東急の職員はメモリーカードを取り外し、オフィスの専用PCで確認しなければならなかった。いまでは、権限を持つ利用者がどこからでもリアルタイム映像や録画映像を見ることができる [\[1\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)。その後、NTTドコモと伊藤忠テクノソリューションズとともに開発されたバージョンでは、スマートフォンやタブレットでの閲覧やダウンロードも可能になった [\[18\]](https://cloud.watch.impress.co.jp/docs/news/1368250.html)。

東急が公表しているプライバシー保護策は、車内のステッカーと、録画を閲覧できる人を制限する社内規則である [\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。東京の地下鉄2社は2017年、映像を閲覧できるのは限られた職員だけだと述べており [\[20\]](https://www.tokyometro.jp/news/images_h/metroNews170314_28.pdf)[\[4\]](https://www.kotsu.metro.tokyo.jp/pickup_information/news/subway/2017/sub_p_201703146072_h.html)、当時の英語のニュース要約では、映像は約1週間保存され、問題が報告されたときにのみ確認されると伝えられていた [\[21\]](https://www.rarejob.com/dna/2017/05/14/security-cameras-to-be-installed-in-tokyo-subway-cars)。京急の発表には、映像の保存期間は示されていない [\[2\]](https://digitalpr.jp/r/70474)。東急は2019年の試験導入の際、映像は約3日で上書きされると説明していたが [\[15\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20190530_01)、2020年の全車両導入時には、各機器のSDカードに168時間分、運行日にして7〜10日分ほどの映像を保存でき、それを超えると古いものから上書きされると説明している [\[9\]](https://tetsudo-ch.com/10577025.html)[\[13\]](https://news.mynavi.jp/article/20200727-iotube/)。

## AIはどこで使われているのか

東京の鉄道のカメラでは、すでにAIが動いている。いまのところ、AIが探しているのは主に物、混雑、危険であり、あなたが誰なのかではない。

東京メトロは2021年7月、駅のカメラで画像認識を使った不審物や危険物の検知を始め、大会後も続けるとしていた [\[22\]](https://www.tokyometro.jp/corporate/newsletter/metroNews20210706_l85.pdf)。小田急は2024年10月から2025年1月にかけて、2駅の既存カメラ20台の映像を「AI Security asilla」という行動認識システムで解析し、線路への転落、車いすや白杖の利用者、長時間ホームにとどまる人、利用者同士のトラブル、不審物を検知できるかを試した [\[23\]](https://www.watch.impress.co.jp/docs/news/1629496.html)。JR東日本は2026年4月、相模線の一部の編成で車両の側面カメラのAIを使い始め、ワンマン運転の列車で、人が車両に近づきすぎたときに運転士に警告するようにした [\[24\]](https://www.jreast.co.jp/press/2025/20251118_ho01.pdf)[\[25\]](https://www.jreast.co.jp/press/2026/20260416_ho02.pdf)。東京メトロと三菱電機は、2026年8月頃から10月頃にかけて、銀座線で前方の障害物を検知するカメラの研究のための撮影を予定した。東京メトロの告知は、ホームにいる人が映り込む可能性があるとしたうえで、データは暗号化され、AIの学習など研究の目的以外には使われないと説明している [\[26\]](https://www.tokyometro.jp/info/files/20260717_train_ffcctv.pdf)。

車内では、京急がIoTubeを将来的に異常検知や混雑度の測定に使うとしている [\[2\]](https://digitalpr.jp/r/70474)。つくばエクスプレスは、混雑度についてすでにこれを実現している。2026年10月7日、同社のアプリは、車内の防犯カメラの映像をAIで解析した号車ごとの混雑度を、5分遅れの6段階で表示し始めた [\[27\]](https://www.watch.impress.co.jp/docs/news/2145945.html)。利用者にとっては便利な機能である。同時に、防犯カメラの映像が別の役割に転用されているということでもある。

これらのシステムのいくつかは行動認識を使っている。たとえばasillaは、映像内の人物がどんな行動をとっているかを認識し、設定された特定の行動を検知すると通知する [\[23\]](https://www.watch.impress.co.jp/docs/news/1629496.html)。この方式は誰であるかではなく何をしているかを見るものだが、どの行動を検知の対象とするかは、システムに組み込まれた判断である。個人情報保護委員会は、顔識別の照合用データベースに「不審な」行動を理由に人を登録すると、障害のために動きが違って見える人まで巻き込みかねないと警告している [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。

防犯カメラを別の目的に使う検証の最も明確な例は、JR東海から出てきた。同社は、東海道新幹線の車内防犯カメラをマーケティングに使えるかどうかを検証する試験を、2026年1月10日から16日にかけて、東京〜新大阪間のN700S車両の1号車・6号車・8号車で行う予定とした。カメラで顔を含む全身の画像を撮影し、AIが服装や所持品を抽出して、乗客の年代、性別、利用目的を推定するというものだ。JR東海は試験を事前に公表し、これらの号車を避ければ検証には使われないこと、推定データには個人を特定できる情報は含まれないこと、データは検証のためだけに三菱電機に提供され、終了後に速やかに削除されることを説明した [\[29\]](https://jr-central.co.jp/news/release/_pdf/000044788.pdf)[\[30\]](https://aismiley.co.jp/ai_news/jr-central-ai-camera/)。こうした制限があるとはいえ、乗客の安全のために設置されたカメラの映像が、別の用途に使えるかどうか検討されたことを示している。参考までに、個人情報保護委員会の2023年の報告書は、通常の防犯カメラの映像から事後的に顔特徴データを抽出し、照合や分析を行うことは目的外利用にあたり、原則として本人の同意か法令上の例外が必要だとしている [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。

機器を手がける企業は、この技術を防犯以外の用途にも売り込んできた。NTTドコモ、伊藤忠テクノソリューションズ、MOYAIは、マーケティング、人流解析、監視を明確な目的として、IoTubeでの協業を始めた [\[31\]](https://www.docomo.ne.jp/info/news_release/2021/11/22_00.html)。MOYAIのデジタルサイネージ製品は、AIで通行人の人数、年齢、性別を解析し、時間帯ごとに表示内容を変える [\[32\]](https://moyai-net.com/digital-media/)。IoTubeは、列車の車内に取り付けられているものと同じ製品群である。列車でどの機能を使うかは、各鉄道会社次第である。

## JR東日本は顔認識を試みたが、長くは続かなかった

2021年7月、JR東日本は東京オリンピックの警備の一環として、首都圏の一部の駅で顔認識カメラの運用を始めた。このシステムは、3種類の人物を検知するように作られていた。指名手配中の容疑者、うろつきなどを理由に職員が不審と判断した人、そしてJR東日本の施設内で起きた重大犯罪で服役した人である。最後のグループについては、被害者等通知制度を通じて検察から出所の情報を得て、その顔をウォッチリストに加える計画だった。カメラが誰かを検知すれば、警備員が声をかけ、手荷物検査を求めることもできた [\[33\]](https://www.bengo4.com/c_1009/n_13598/)。

JR東日本は、出所者を対象に含めていることを公表していなかった。2021年9月の新聞報道でそれが明るみに出ると、同社は同日中にこの対象を取りやめ [\[33\]](https://www.bengo4.com/c_1009/n_13598/)[\[34\]](https://president.jp/articles/-/51210)、実際に登録された人はいなかったと説明した [\[35\]](https://web.archive.org/web/20220309032511/https://www.jiji.com/jc/article?k=2021092200784&g=soc)。

指名手配中の容疑者を検知する部分は、その後4年間運用が続いた。検知されると警備員が目視で確認し、必要に応じて警察に通報する仕組みだった。「不審者」の区分も想定には残っていたが、JR東日本は後に、実際に登録したケースはなかったと説明している [\[38\]](https://web.archive.org/web/20251024100124/https://www.sakigake.jp/news/article/20251024CO0088/)。日本弁護士連合会はシステムの運用の中止を求めていた [\[36\]](https://www.nichibenren.or.jp/document/statement/year/2021/211125.html)。JR東日本は2025年7月に運用を停止し、それは同年10月に報道機関の取材で明らかになった。同社は停止の理由を外部企業との契約期間の満了と効果の検証とし、個人情報保護委員会や国土交通省から助言を得て進めてきたと説明した [\[37\]](https://newsdig.tbs.co.jp/articles/-/2250909)[\[38\]](https://web.archive.org/web/20251024100124/https://www.sakigake.jp/news/article/20251024CO0088/)。設置していた駅や台数、実際に通報した事案の有無は明らかにしていない [\[38\]](https://web.archive.org/web/20251024100124/https://www.sakigake.jp/news/article/20251024CO0088/)。

出所者の検知が明るみに出た後、成城大学の指宿信教授は、日本には公共空間での顔認識を規制する法令がなく、通常の防犯カメラについても自治体レベルの規制はあっても全国的な規制はないこと、そして海外ではすでに顔認識の誤りが誤認逮捕を引き起こしていることを指摘した [\[34\]](https://president.jp/articles/-/51210)。後述する2026年の個人情報保護法の改正は、この種の顔データを対象とする日本で初めての専用のルールを設けるものだ [\[47\]](https://www.businesslawyers.jp/practices/1495)。批判は情報開示にも向けられていた。出所者を対象に含めていたことやその情報源を、人々は報道によって初めて知った [\[33\]](https://www.bengo4.com/c_1009/n_13598/)[\[34\]](https://president.jp/articles/-/51210)。そして運用を停止した際にも、JR東日本はこのシステムが何を成し遂げたのかを明らかにしなかった [\[38\]](https://web.archive.org/web/20251024100124/https://www.sakigake.jp/news/article/20251024CO0088/)。

ここでは、しばしば混同される2つの異なる技術がある。顔識別は、通りかかるすべての人をウォッチリストと照合するものだ。顔認証は、空港のゲートのように、本人であることを機械に確認させることを自分で選ぶものだ。個人情報保護委員会の2023年の報告書は顔識別を対象としており、2026年の改正法は、本人の同意を得て取得した顔データを新たな利用停止請求権の対象から除いている [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)[\[47\]](https://www.businesslawyers.jp/practices/1495)。JR東日本の新しい取り組みは顔認証を使うものだ。同社は2025年11月から2026年3月にかけて、新潟駅と長岡駅の新幹線改札で、NECとパナソニック コネクトとともに、希望者が参加する顔認証改札の実証実験を行った。参加したのは、モニターに応募した約500人の新幹線定期券の利用者だった。同社は10年以内にウォークスルー改札を実現したいとしている [\[39\]](https://newswitch.jp/p/45332)[\[40\]](https://paymentnavi.com/?p=167402)。本人が自ら登録する仕組みであるため、ウォッチリストとの照合とは異なる問題を伴うが、それでもSuicaの定期券に紐づいた顔テンプレートのデータベースができることになり、その厳重な保護が求められる。

## これは日本版のFlockなのか

現時点で得られる情報からは、違うと言える。その理由は、Flockの仕組みにある。

Flock Safetyは、ナンバープレート自動読み取り装置をアメリカの警察署や民間組織に販売している [\[41\]](https://san.com/cc/ice-illegally-gains-informal-access-to-nationwide-license-plate-camera-network/)[\[43\]](https://jsis.washington.edu/humanrights/2025/10/21/leaving-the-door-wide-open/)。Straight Arrow Newsの2025年の記事によれば、同社は当時、5,000以上の地域で4万台以上のカメラを運用していた。通過する車はすべて記録される。ナンバー、メーカー、色、さらに場合によってはバンパーステッカーのような細部まで記録されるため、警察官はしばしば令状なしで、車の動きを長期間にわたって追跡できる [\[41\]](https://san.com/cc/ice-illegally-gains-informal-access-to-nationwide-license-plate-camera-network/)。本当の問題は、個々のカメラというよりも、その背後にある共有された検索可能なネットワークにあり、これまでの記録がその理由を示している。情報公開請求で入手された監査ログからは、2024年6月から2025年5月の間に、移民取り締まりを理由とする検索が4,000件以上行われていたことが判明した。その多くは、イリノイ州法とFlock自身の方針がその用途を禁じていたにもかかわらず、地元や州の警察が連邦機関からの非公式な依頼を受けて行っていたものだった。一部の警察署は、この区分の入力は誤りだった、あるいは刑事事件の捜査のための検索だったと説明しているが、監査データは、州法による禁止とFlock自身の方針がありながら、ICEが地元や州の警察を通じて間接的にこのネットワークを利用できていたことを示している [\[41\]](https://san.com/cc/ice-illegally-gains-informal-access-to-nationwide-license-plate-camera-network/)[\[42\]](https://atlpresscollective.com/2025/06/03/flock-metro-atlanta-ice/)。ワシントン州では、データの共有に同意したことのない少なくとも10の警察署のデータに、国境警備隊が「裏口」からアクセスしていたとみられることを研究者が突き止めた [\[43\]](https://jsis.washington.edu/humanrights/2025/10/21/leaving-the-door-wide-open/)。2026年4月、米国自由人権協会（ACLU）、ACLUバージニア支部、電子フロンティア財団は、連邦控訴裁判所に意見書を提出し、下級審の判断を覆して、こうしたナンバープレート読み取りシステムは合衆国憲法修正第4条に違反すると判断するよう求めた [\[44\]](https://www.aclu.org/cases/schmidt-v-norfolk)。

東京の列車のカメラは、ナンバープレート読み取り装置よりも多くの情報を一人ひとりから取得している。しかし、Flockを市民的自由の問題にしている2つの要素、つまり検索可能な身元の索引と共有ネットワークを欠いている。ナンバープレートは、もともとコンピューターが読み取れる固有のIDだ。通常の映像に映った顔はそうではない。誰かがそこから顔認識用のテンプレートを作るまでは。そしてそれこそが、JR東日本が駅で踏み出し、その後に断念した一歩である。公開されている情報から判断する限り、各鉄道会社は自社の映像を短期間だけ保存し、何かが起きたときに呼び出している。警察は要請に応じて映像を入手でき、地下鉄の事業者は、映像を警察や自社の路線に乗り入れる鉄道会社と連携して管理するとしている [\[3\]](https://trafficnews.jp/post/66275)[\[4\]](https://www.kotsu.metro.tokyo.jp/pickup_information/news/subway/2017/sub_p_201703146072_h.html)。列車は直通運転しているため、切符を買ったこともない会社のカメラに映ることもあり得る。本稿で確認した資料には、鉄道会社をまたいで検索できる共有データベースの存在を示すものはない。

両者が似ているのは、データが新たな用途へと流れていく点だ。Flockのデータは、規則があったにもかかわらず移民取り締まりに使われるようになった。JR東海の防犯カメラは、マーケティングの検証に使われる予定になった。規模も事の重大さもまったく違うが、どちらの場合も、ある目的のために集められたデータが、別の目的に使われたり、その検討の対象になったりした。

日本でFlockに最も近いものは、線路ではなく道路にある。警察のNシステムは、全国の約2,000か所に設置されたナンバー読み取り装置のネットワークで、通過するすべての車を撮影し、手配車両や盗難車両のリストと照合している [\[45\]](https://bestcarweb.jp/news/business/2642)。警察は裁判で、記録しているのはナンバーだけで、運転者の顔は記録していないと主張しているが、メディア法学者の田島泰彦氏ら批判する人々は、それに疑問を呈している [\[45\]](https://bestcarweb.jp/news/business/2642)。2001年にこのシステムが裁判で争われたとき、東京地裁はシステムを合法と認めたうえで、ひとつの警告を付け加えた。読み取り装置が道路網を覆い、データが蓄積されていけば、人々の私生活の詳細が明らかになりかねず、本物の監視の問題になり得る、というものだ [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。それから20年後、日本のプライバシー規制当局は、ネットワーク化された顔認識について同じ論理を用い、一人の人物を多くの場所にわたって追跡できることを、主要なリスクのひとつに挙げた [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。日本の裁判所と規制当局は、Flockをめぐって指摘されているのと似た懸念を、すでに示している。鉄道のカメラがいつかその方向に進むかどうかは、まだわからない。

## 法律は何を認めているのか

日本の主要なプライバシー法である個人情報保護法は、特定の個人を識別できる映像を個人情報として扱う。ソフトウェアで照合できるほど精密な顔のデータは「個人識別符号」にあたり、これも個人情報である [\[46\]](https://www.nishimura.com/sites/default/files/images/newsletter_220511_data_protection.pdf)。

だからといって、鉄道会社があなたを撮影するのにあなたの許可が必要なわけではない。通常の防犯カメラの場合、利用目的は自明だとされるため、事業者はそれを公表する必要はないが、カメラが作動中であることを掲示するのが望ましいとされている [\[46\]](https://www.nishimura.com/sites/default/files/images/newsletter_220511_data_protection.pdf)。顔識別システムを扱った個人情報保護委員会の2023年の報告書は、より強い表現を用いている。特定の個人を識別できる顔画像をカメラで取得する場合、掲示などによってカメラが作動中であることを容易に認識できるようにしなければならないとしたうえで、ごく小さなカメラや、ほかの機器に組み込まれたカメラは、明確な告知がなければ、偽りその他不正の手段による取得にあたり得ると指摘している [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。蛍光灯に組み込まれたカメラはこれに当てはまると考えられ、IoTubeが設置された車両には、防犯カメラが設置されていることを知らせるステッカーが貼られている [\[1\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)[\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。

法律は、撮影後の映像の扱いも制限している。個人情報保護委員会によれば、通常の防犯カメラの映像から後になって顔のデータを取り出したり、ほかのデータベースと照合したりすることは新たな利用にあたり、本人の同意か法令上の例外が必要である。警察からの要請は、そうした例外のひとつだ。令状や警察による正式な照会は「法令に基づく」要請にあたるため、鉄道会社はあなたに尋ねることなく映像を提供できる。ただし、個人情報保護委員会は事業者に対し、照会と関係のない情報を提供していないかを確認するよう求めている。また、法第23条は、顔のデータベースのような個人データについて安全管理措置を義務付けている。データベース化されていない通常の映像はこの義務の直接の対象ではないが、個人情報保護委員会は同様に保護することが望ましいとしており、ネットワークカメラについては、アクセス制御、漏えい防止、アクセスログの監視を特に挙げている [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。

裁判所の判断も、もうひとつの層を加えている。1969年と2005年の最高裁判決にさかのぼる日本の判例は、正当な理由なく撮影されない権利を認めている。近隣住民や客が防犯カメラをめぐって訴えたとき、裁判官は、カメラがどこにあったのか、なぜそこにあったのか、どのように撮影していたのか、必要だったのか、そして映像がどのように扱われていたのかを比較衡量してきた。カメラに有利に働いた要素には、固定されていること、目に見え、表示があること、映像の保存期間が限られていること（個人情報保護委員会が検討した事例では90時間から45日）、閲覧できる人が限られていることなどがあった。2015年の東京の事例では、所有者が同じ結果を得るためのほかの手段を持っていたことも理由のひとつとして、裁判所がカメラの撤去を命じた [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。

顔認識は、それ自体として注目を集めてきた。2023年3月、列車内や駅での襲撃事件も一因となって設けられた個人情報保護委員会の有識者検討会が、駅や空港のような大規模な公共空間での顔認識の利用についての指針をまとめた。事業者は、顔識別を利用していることとその理由を公表し、入口にはより詳しい情報につながる掲示を出すべきだとされた。ウォッチリストは、明文化された基準によって、対象となる犯罪を実際に行うおそれが高い人に限定すべきだとされた。照合に該当しなかった人のデータは速やかに消去し、すべての検知結果を人が確認し、AIには性別や肌の色による偏りがないかを検証すべきだとされた。差別的な結果は、不適正な利用を禁じる法律の規定に反し得るからだ。検討会はさらに、運用開始前のプライバシー影響評価と試行運用を求め、大規模な駅では警察からの要請に関する透明性レポートを公表することも提案した [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。

こうした考え方の一部は、いま法律になりつつある。個人情報保護法の改正案は2026年7月10日に国会で成立し、その1週間後に公布された。改正法は「特定生体個人情報」という新たな区分を設ける。本人が気づかないうちに低コストで取得できる身体的特徴を対象としたもので、実際にはカメラの映像から抽出された顔のテンプレートがその大半を占める [\[47\]](https://www.businesslawyers.jp/practices/1495)。このデータを取り扱う者は、誰がシステムを運用しているのか、顔のデータが処理されていること、その目的、どの身体的特徴が使われているのか、そして開示をどのように請求できるのかを、人々に知らせなければならなくなる。改正法についての法律解説は、単に「顔認証使用中」と掲示するだけでは足りないと考えられるとしている。このデータは、日本のオプトアウト制度による第三者提供ができなくなる。そして人々は、何か不正があったことを証明しなくても、自分の顔のデータの利用停止を求める新たな権利を得る。ただし、法令上の義務や生命・財産の保護などについては例外がある。顔のテンプレートに変換されることのない通常の映像や、個人を識別しようとしない人数のカウントは、これまでの規律のもとにとどまる。

衆参両院は、告知を機器の周辺に掲示するよう求める附帯決議を付け、参議院はさらに、検知される人が実際に目にできる場所に掲示することも求めた。改正の大部分は2年以内に施行され、個人情報保護委員会は現在、詳細な規則を作成している。審議の中では、批判する人々が実務上の落とし穴を指摘した。事業者に自分の顔のデータの利用をやめさせるには、データを探してもらうために、まず自分の顔のデータを提供しなければならないかもしれない、というものだ [\[47\]](https://www.businesslawyers.jp/practices/1495)。もうひとつ知っておくべき規則がある。新造車両に録画カメラを求める国土交通省の2023年の規則は、細部を各鉄道会社に委ねている [\[10\]](https://www.arabnews.jp/en/japan/security-cameras-become-mandatory-for-new-trains-in-japan-106035)。報道によれば、規則が求めているのは録画できるカメラの設置であり、映像の保存期間、暗号化、AIの利用について定めた内容は伝えられていない。

## 誰かが侵入することはできるのか

本稿で確認した資料には、これらのカメラに関する脆弱性や侵害を報告したものはない。とはいえ、関係するどの企業もセキュリティに関する詳しい情報を公表していない以上、これで何かが証明されるわけではない。かつての車内カメラは密閉された箱で、映像を見るには誰かが車両に乗り込み、カードを抜き取らなければならなかった。新しいカメラは、クラウドのプラットフォームやスマートフォンのアプリにつながった携帯回線のIoT機器であり、以下の事例が示すように、ネットワークカメラは攻撃の標的になることが多い。

まず、天井にある本体から見ていこう。本体には、直近の映像（東急の機器では約1週間分）に加え、ファームウェアとSIMが収められている。そのため、盗まれたり改ざんされたりするおそれがあり、メモリーカードが暗号化されていなければ中身を読まれ、バグがあればファームウェアを悪用される。通常の対策は、ストレージの暗号化、署名付きのファームウェア更新、そして改ざん検知である。4G回線は、映像を車外へと運ぶ。ここでの危険は、機器がオープンなインターネットから到達可能な状態になってしまうことや、通信が適切に暗号化されていないことだ。外部からの接続を受け付けない閉域のモバイルネットワークを使えば、これはおおむね解決する。ソフトバンクのSecuLightや伊藤忠テクノソリューションズのTHEASIGHTといったクラウドのプラットフォームは、車両全体の映像を保存し、機器を管理できるため [\[12\]](https://prtimes.jp/main/html/rd/p/000000007.000069371.html)[\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)、最も価値の高い標的になる。ログイン情報がひとつ盗まれたり、設定がひとつ誤っていたりするだけで、何千台ものカメラが一度にさらされかねない。多要素認証、厳格な権限管理、監査ログが、基本的な防御策である。さらに、職員のノートパソコン、スマートフォン、タブレットに入った閲覧用のアプリがある。端末は紛失することもあれば、フィッシングの標的になることもある。そして、JR東海や東京メトロの取り組みにおける三菱電機のように、試験の間に映像を受け取る外部のAI企業がある。そのどれもが、データを持つ人の輪を広げる。マイクとスピーカーを搭載したモデルでは双方向の音声チャネルも加わり、悪意のある者の手に渡れば、盗聴や偽の車内放送にもつながりかねない。

鉄道会社は、こうしたことの詳細についてほとんど語っていない。東京メトロのAIの試験に関する告知では、データは保存時も通信時も暗号化され、セキュリティが確保された機器の間でのみやり取りされるとしている [\[26\]](https://www.tokyometro.jp/info/files/20260717_train_ffcctv.pdf)。東急は、IoTubeを設置した車両ではWi-Fiを使っていないとしている。また東急と関係各社は、映像はSDカード上でも4Gでの送信時にも暗号化され、外部から閲覧できないよう難読化されていると説明している [\[9\]](https://tetsudo-ch.com/10577025.html)[\[14\]](https://www.mcpc-jp.org/jirei/pdf/2103_mcpc_p16_moyai.pdf)[\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。東急は、保守もネットワーク経由で遠隔から行えるとしている [\[14\]](https://www.mcpc-jp.org/jirei/pdf/2103_mcpc_p16_moyai.pdf)。しかし、どの方式で暗号化し、誰が鍵を管理し、ログインをどう保護し、遠隔保守やファームウェアの更新をどう安全に行うのかについて、本稿で確認した資料には技術的な詳細は示されていない。本稿で参照したMOYAIの発表資料も、これらの点には触れていない。

ネットワーク機器に関する日本のデータは、こうした詳細が重要である理由を示している。政府が後押しする「NOTICE」の取り組みのもと、情報通信研究機構（NICT）は、推測されやすいパスワード、脆弱なファームウェア、あるいはすでに感染している状態のネットワーク機器がないか、参加するインターネットサービスプロバイダーのIPアドレスを調査している。2025年4月だけで、ファームウェアに高リスクの欠陥を抱えた機器が約4,119台検知され、すでにMiraiボットネットに感染していると推定される機器は1日あたり最大1,011台にのぼった [\[48\]](https://www.soumu.go.jp/main_content/001016609.pdf)。2023年には、NICTが不審な通信の急増をたどったところ、国土交通省自身が運営する一般向けの河川監視システムのネットワークカメラに行き着いた。同じ年には、誰でも見ることができる状態になっていた保育園の保護者向けカメラの映像も偶然見つけている [\[49\]](https://toyokeizai.net/articles/-/923528)。2025年後半には、読売新聞の調査で、日本のネットワークカメラのライブ映像が海外のウェブサイトに流出していることが明らかになった。パスワードが設定されていなかったことが原因のケースもあり、総務省はカメラの管理者に設定を確認するよう注意を呼びかけた [\[50\]](https://asianews.network/security-camera-live-footage-from-japan-leaked-to-overseas-websites/)[\[51\]](https://www.soumu.go.jp/menu_kyotsuu/important/kinkyu02_000627.html)。日本の外では、2021年に見つかったHikvisionのカメラのコマンドインジェクションの脆弱性がMiraiをベースにしたボットネットに悪用され、1年後になっても、研究者が修正されていない機器を約8万台数えていた [\[52\]](https://www.cyfirma.com/news/news-coverage-from-bleeping-computer-over-80000-hikvision-cameras-exposed-online/)。2025年には、米国のCISAが、すでに複数のボットネットに悪用されていたEdimaxのカメラのゼロデイ脆弱性を公表した。対象機種は旧製品で、メーカーのサポートが終了している可能性が高いものだった [\[53\]](https://www.securityweek.com/edimax-camera-zero-day-disclosed-by-cisa-exploited-by-botnets/)。総務省の注意喚起は、カメラの管理者に、製品のサポートが継続しているかを確認するよう求めている [\[51\]](https://www.soumu.go.jp/menu_kyotsuu/important/kinkyu02_000627.html)。MOYAIの破産は、IoTubeについても同じ問いを投げかける。東急が利用するソフトバンクのサービスには保守・運用が含まれているが [\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)、機器そのものはMOYAIが開発したものであり [\[1\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)、破産の報道は、すでに設置されている機器のサポートを誰が担うのかに触れていない [\[6\]](https://www.tsr-net.co.jp/news/tsr/detail/1203297_1521.html)。

では、東京の列車のカメラへの攻撃は、どのような形を取る可能性が高いのだろうか。おそらく、カメラに対する巧妙なエクスプロイトではない。より簡単な道は、フィッシングで盗まれた職員のアカウントや、設定を誤ったクラウドの管理画面であり、どちらも車両全体の映像をさらしかねない。仮にインターネットから直接到達できる機器があり、既知のファームウェアのバグを抱えていれば、ボットネットの自動スキャンがそれを見つけ出すだろう。ただし、閉域の携帯回線網にある機器は、一般に家庭用のウェブカメラよりもはるかに到達しにくい。最も深刻なのは、特定の人物を狙ったシナリオだ。内部の人間や、盗んだログイン情報を持つ侵入者が、閲覧ツールを使ってある通勤客の行動パターンを突き止めるというものである。だからこそ、映像を見られる人の制限と、誰が見たのかの記録は、暗号化と同じくらい重要なのだ。

証拠をまとめると、これらのカメラのリスクは、実証されたものというより、主に潜在的なものである。本稿で確認した資料には、これらのカメラに関する脆弱性や侵害の報告はない。東急の機器はWi-Fiを使わず、映像をカード上でも送信時にも暗号化し、閲覧権限を利用者ごとに設定できる [\[1\]](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)[\[9\]](https://tetsudo-ch.com/10577025.html)[\[14\]](https://www.mcpc-jp.org/jirei/pdf/2103_mcpc_p16_moyai.pdf)[\[19\]](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)。東京メトロも、AIの試験のデータは暗号化され、セキュリティで保護された機器の間でのみやり取りされるとしている [\[26\]](https://www.tokyometro.jp/info/files/20260717_train_ffcctv.pdf)。これらの措置は、個人情報保護委員会がネットワークカメラについて求めている対策のうち、アクセス制御と漏えい防止にあたる。一方、国土交通省の鉄道向けガイドラインはシステム全般について主体認証ログの取得と管理を求めているが [\[55\]](https://www.mlit.go.jp/tetudo/content/001998630.pdf)、同委員会が挙げるもうひとつの対策であるアクセスログの監視を、鉄道会社がカメラ映像について行っているかどうかは、本稿で確認した資料のいずれにも書かれていない [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。鉄道会社が公表している映像の保存期間は約1週間で、個人情報保護委員会が検討した裁判例の90時間から45日という範囲の中では短い方にあたる [\[13\]](https://news.mynavi.jp/article/20200727-iotube/)[\[17\]](https://www.hanshin.co.jp/company/press/pdf/20230724-syaryou-bouhankamera.pdf)[\[21\]](https://www.rarejob.com/dna/2017/05/14/security-cameras-to-be-installed-in-tokyo-subway-cars)[\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。残る疑問は、公表されていない部分にある。暗号化とログインの仕組みはどうなっているのか、クラウドに保存された映像はどれくらい残るのか、IoTubeの音声は録音されているのか、ビーコンは有効になっているのか、そしてMOYAIの破産後、IoTubeのファームウェアを誰が保守するのか、である。

列車を止めることはできるのだろうか。それは最も起こりにくい結果だと考えられる。日本の鉄道のサイバーセキュリティの枠組みでは、列車運行管理、座席予約、電力管理が重要システムに指定されており、運行制御システムはクローズドなネットワークと専用の装置で構築されている [\[54\]](https://www.iee.jp/pes/wp-content/uploads/sites/3/2025/10/fcfea06745edf8d115c2a6447e0b5e33.pdf)。車内の防犯カメラは、指定された重要システムに含まれていない。国土交通省のガイドラインの概要版は、防犯カメラについて直接触れている。鉄道のネットワーク化が進む理由のひとつとして防犯カメラの普及を挙げ、防犯カメラなどの完全性・可用性が損なわれることが鉄道事故に直結することはまれと考えられるとしつつ、物理的な攻撃と組み合わせたテロ・犯罪の一環として行われる可能性もあり、新たなリスクとして注視する必要があるとしている [\[55\]](https://www.mlit.go.jp/tetudo/content/001998630.pdf)。そうした複合的な攻撃を別にすれば、カメラのネットワークが侵害された場合、それは主にプライバシー上の問題であり、足がかりにもなり得る。ただし、鉄道会社がそれをもっと重要なものと同じネットワークに置くという過ちを犯していれば、話は別である。

## 政府は何を求めているのか

日本では鉄道は重要インフラに位置づけられており、サイバーセキュリティに関する何層もの規則の対象となっている。本稿で確認した文書のいずれも、車内カメラに特定して触れてはいない。ただし、前述のとおり、国土交通省のガイドラインの概要版は防犯カメラ全般について触れている。

最も関係が深いのは、国土交通省の鉄道分野のサイバーセキュリティに関するガイドラインで、その第6版は2026年4月22日に公表された。ガバナンス、リスク管理、サプライチェーンのセキュリティ、監視、ITの障害に備えたバックアップ計画、そして定期的な訓練を扱っている。今回の改定の柱はネットワーク機器に関するもので、重要インフラサービスの提供に必要なIoT機器を調達する際には、セキュリティラベル「JC-STAR」を選定基準に含めるよう求めている [\[55\]](https://www.mlit.go.jp/tetudo/content/001998630.pdf)。公表された概要版には、車内カメラがこうした機器に当たるかどうかは示されていない。それ以外の点では、カメラのシステムとそのクラウド事業者は、ほかの鉄道ITと同様に、サプライチェーンと監視の部分に含まれる。国土交通省は2026年5月にも、はるかに高度になったAIの時代における交通分野のサイバーセキュリティについて話し合うため、企業と担当者を集めた [\[56\]](https://www.mlit.go.jp/sogoseisaku/jouhouka/sosei_jouhouka9999.html)。

より大きな変化は、2025年5月16日に成立した日本の新しい「能動的サイバー防御」関連法からもたらされる。新しい制度を運営するため、2025年7月に国家サイバー統括室が発足し、関連法の大部分は2026年中に施行される予定である [\[57\]](https://www.splunk.com/ja_jp/blog/industries/preparing-for-active-cyber-defense.html)。鉄道を含む15業種の約257社は、特定の重要なコンピューターシステムを導入する際に届け出て、重大なインシデントを報告しなければならなくなり、政府は影響を受ける製品のメーカーに脆弱性の情報を提供し、被害防止の措置を要請できるようになる [\[58\]](https://www.pwc.com/jp/ja/knowledge/column/awareness-cyber-security/economic-security/economic-security11.html)[\[59\]](https://www.businesslawyers.jp/articles/1465)。列車のカメラが対象になるのは、おそらく、その障害が運行に支障をきたしかねないシステムにつながっている場合に限られるだろう。

カメラを直接扱う取り組みは、任意のものである。総務省、NICT、インターネットサービスプロバイダーが運営するNOTICEは、2024年4月に調査の対象を弱いパスワードから脆弱なファームウェアや活動中のマルウェアにまで広げ、プロバイダーを通じて所有者に注意を促している [\[60\]](https://businessnetwork.jp/article/19763/)。列車のカメラがこの調査で見つかるのは、そのアドレスが参加しているプロバイダーのものである場合に限られる。ネットワーク機器向けのセキュリティラベル「JC-STAR」は2025年3月から運用されており、東京都は防犯カメラの補助金に関する案内でこれに言及している [\[61\]](https://www.city.minato.tokyo.jp/documents/12041/20260422125819.pdf)。ただし、法的拘束力のない国土交通省のガイドラインを除けば、鉄道会社にその利用を求めるものはない。情報処理推進機構（IPA）も、ネットワークカメラシステムのセキュリティのチェックリストを公開しており、MOYAIのようなベンダーを評価する際の物差しのひとつになり得る [\[62\]](https://www.ipa.go.jp/security/jisec/choutatsu/nwcs/index.html)。鉄道総合技術研究所によれば、これまでのところ、日本の鉄道へのサイバー攻撃は事務系のシステムやウェブサイトに被害を与えたものであり、列車の運行には及んでいない [\[54\]](https://www.iee.jp/pes/wp-content/uploads/sites/3/2025/10/fcfea06745edf8d115c2a6447e0b5e33.pdf)。

## これからどこへ向かうのか

カメラは増え、リアルタイム映像も増え、AIも増える。車内のリアルタイム映像は新幹線から山手線へと広がりつつあり、京急の全車両にも2027年3月までに導入される予定だ。車内の混雑度の推定はすでに始まっており、京急は異常検知も計画している。JR東日本は、希望者が参加する顔認証改札を、より多くの利用者や首都圏へと広げることを検討しており [\[39\]](https://newswitch.jp/p/45332)、首都圏の主要路線では、運転士を支援するカメラシステムとともにワンマン運転を拡大している [\[63\]](https://www.jreast.co.jp/press/2024/20241106_ho02.pdf)。最新のIoTubeはすでにエッジAI、サーマルセンサー、ビーコンを搭載しており [\[11\]](https://prtimes.jp/main/html/rd/p/000000004.000069371.html)、MOYAIは5GやWi-Fi 6への対応を検討していると述べていた [\[64\]](https://k-tai.watch.impress.co.jp/docs/news/1368745.html)。法律の面では、個人情報保護委員会が顔のデータに関する詳細な規則を作成しており、改正の大部分は2028年半ばまでに施行される予定である [\[47\]](https://www.businesslawyers.jp/practices/1495)。

大きな問題は、法的な枠組みができたいま、今度は表示、情報開示、利用停止の請求権を伴う形で、顔認識が日本の鉄道に戻ってくるかどうかだ。

それまでの間、基本的な事実の多くは、いまだにわかっていない。IoTubeの音声は録音されているのか、誰がリアルタイムで聞くことができるのか。車内のBluetoothビーコンは有効になっているのか。京急は映像をどれくらいの期間保存しているのか。クラウドに保存された映像はどれくらい残るのか。映像はどのように暗号化され、誰が鍵を管理し、そのクラウドはどこにあるのか。どのAI機能が有効になっていて、どの企業がそれを運用しているのか。鉄道会社は毎年、警察からどれくらいの要請を受けているのか。社外の誰かが、これらのシステムのセキュリティホールを検証したことはあるのか。これらの質問はすべて、鉄道会社に直接尋ねることができる。個人情報保護法のもとでは、事業者に対して自分に関する個人データの開示を請求することもできる。ただし、検索可能なデータベースになっていない通常の映像は、その対象外となる場合がある [\[28\]](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)。鉄道会社がその請求にどう対応し、どれくらいの時間がかかるかは、日本のプライバシー保護が法律の条文の外でも機能しているのかどうかを、多くの点で物語っている。

Flockの検索可能な全国ネットワークに比べれば、公開されている情報から見る限り、東京の列車の監視はまだ断片的で、短期的なものであり、たいていは何かが起きた後に使われている。日本の裁判所と規制当局は、カメラに一定の限度を示し、追跡の危険について警告してきた。そして日弁連のような団体は、カメラが個人の識別に向かったときに異を唱えてきた。一方で、天井のハードウェアは鉄道会社が説明する用途以上のことができ、それを手がける企業は防犯だけでなく分析の用途にも売り込んできた。そして、カメラを携帯回線のネットワークに載せたことで、プライバシーの問題はセキュリティの問題にもなった。鉄道会社が何を有効にし、どこまで開示するのかが、この先の行方を左右することになる。

## 参考文献

1. SoftBank Corp. and Tokyu Corporation. "Tokyu to Install 4G-Enabled LED Tube Security Cameras in All Cars by July 2020." November 2019. [softbank.jp](https://www.softbank.jp/corp/news/press/sbkk/2019/20191106_01)
2. Keikyu Corporation. "Introduction of In-Car Security Camera System." 2023. [digitalpr.jp](https://digitalpr.jp/r/70474)
3. Trafficnews. "Tokyo Metro to Install Security Cameras Above Doors in All Cars." March 2017. [trafficnews.jp](https://trafficnews.jp/post/66275)
4. Tokyo Metropolitan Bureau of Transportation (Toei). "Security Cameras to Be Installed Inside All Toei Subway Cars." March 2017. [kotsu.metro.tokyo.jp](https://www.kotsu.metro.tokyo.jp/pickup_information/news/subway/2017/sub_p_201703146072_h.html)
5. JR East. "Initiatives to Improve In-Train Security." October 2023. [jreast.co.jp](https://www.jreast.co.jp/press/2023/20231010_ho03.pdf)
6. Tokyo Shoko Research (TSR). "MOYAI (Tokyo), Developer of Security Cameras, Placed in Bankruptcy Proceedings." October 2026. [tsr-net.co.jp](https://www.tsr-net.co.jp/news/tsr/detail/1203297_1521.html)
7. JA Mitsui Leasing. "Investment in MOYAI, Provider of AI Camera Solutions via IoTube." February 2024. [kyodonewsprwire.jp](https://kyodonewsprwire.jp/release/202402096416)
8. MOYAI Inc. "IoT Sensing & AI" (IoTube product page). [moyai-net.com](https://moyai-net.com/iot-ai/)
9. Tetsudo Channel. Tokyu IoTube media briefing. July 2020. [tetsudo-ch.com](https://tetsudo-ch.com/10577025.html)
10. JIJI Press (via Arab News Japan). "Security Cameras Become Mandatory for New Trains in Japan." October 2023. [arabnews.jp](https://www.arabnews.jp/en/japan/security-cameras-become-mandatory-for-new-trains-in-japan-106035)
11. MOYAI Inc. (via PR TIMES). "MOYAI Develops Edge AI for Real-Time Monitoring of Railway Cars: Strengthening Rail Security and Safety with IoTube x AI." November 2021. [prtimes.jp](https://prtimes.jp/main/html/rd/p/000000004.000069371.html)
12. MOYAI Inc. (via PR TIMES). "MOYAI Supplies Keio Corporation with Security Cameras Using 4G/LTE." October 2022. [prtimes.jp](https://prtimes.jp/main/html/rd/p/000000007.000069371.html)
13. Mynavi News. "Tokyu Completes Installation of 'IoTube' LED Tube Security Cameras in All Cars." July 2020. [news.mynavi.jp](https://news.mynavi.jp/article/20200727-iotube/)
14. Mobile Computing Promotion Consortium (MCPC). MCPC Award 2021 Excellence Award case study: MOYAI and SoftBank, "IoTube"/"SecuLight." March 2021. [mcpc-jp.org](https://www.mcpc-jp.org/jirei/pdf/2103_mcpc_p16_moyai.pdf)
15. SoftBank Corp. and Tokyu Corporation. "Tokyu and SoftBank Begin Railway-Industry-First Trial of 4G LED Tube Security Cameras on the Oimachi Line." May 2019. [softbank.jp](https://www.softbank.jp/corp/news/press/sbkk/2019/20190530_01)
16. MOYAI Inc. (via IPROS). Product listing: Network Camera "IoTube." [ipros.com](https://mono.ipros.com/product/detail/2000488671/)
17. Hanshin Electric Railway. "Installation of In-Car Security Cameras." July 2023. [hanshin.co.jp](https://www.hanshin.co.jp/company/press/pdf/20230724-syaryou-bouhankamera.pdf)
18. Impress Cloud Watch. "NTT Docomo, CTC and MOYAI to Offer Wiring-Free IoT Camera Solution." November 2021. [cloud.watch.impress.co.jp](https://cloud.watch.impress.co.jp/docs/news/1368250.html)
19. Tokyu Corporation. "Railway-Industry First: LED Tube Security Cameras with SoftBank 4G Data Service Installed in All Tokyu Cars." July 2020. [tokyu.co.jp](https://www.tokyu.co.jp/company/news/pdf/20200727-1.pdf)
20. Tokyo Metro. "Promoting the Installation of Security Cameras in All Tokyo Metro Cars" (release attachment). March 2017. [tokyometro.jp](https://www.tokyometro.jp/news/images_h/metroNews170314_28.pdf)
21. RareJob (English-learning news summary). "Security Cameras to Be Installed in Tokyo Subway Cars." May 2017. [rarejob.com](https://www.rarejob.com/dna/2017/05/14/security-cameras-to-be-installed-in-tokyo-subway-cars)
22. Tokyo Metro. Tokyo Metro News Letter No. 85, "Efforts Toward the Tokyo 2020 Olympic and Paralympic Games, Vol. 4: Security." July 2021. [tokyometro.jp](https://www.tokyometro.jp/corporate/newsletter/metroNews20210706_l85.pdf)
23. Impress Watch. "Odakyu Applies Behaviour-Recognition AI to Station Camera Footage." October 2024. [watch.impress.co.jp](https://www.watch.impress.co.jp/docs/news/1629496.html)
24. JR East. "Introducing a System to Detect Passengers Approaching Trains." November 2025. [jreast.co.jp](https://www.jreast.co.jp/press/2025/20251118_ho01.pdf)
25. Seibu Railway and JR East. "Seibu Railway Introduces a System to Detect Passengers Approaching Trains Through Technical Cooperation with JR East." April 2026. [jreast.co.jp](https://www.jreast.co.jp/press/2026/20260416_ho02.pdf)
26. Tokyo Metro. "Acquisition and Analysis of Data from Forward-Monitoring Cameras." July 2026. [tokyometro.jp](https://www.tokyometro.jp/info/files/20260717_train_ffcctv.pdf)
27. Impress Watch. "TX App Shows Per-Car Crowding Using AI Analysis of In-Car Security Cameras." October 2026. [watch.impress.co.jp](https://www.watch.impress.co.jp/docs/news/2145945.html)
28. Personal Information Protection Commission (PPC). Report of the Expert Panel on the Use of Camera Images for Crime Prevention and Safety. March 2023. [ppc.go.jp](https://www.ppc.go.jp/files/pdf/230329_shiryou-2-1.pdf)
29. JR Central. "On Conducting a Test Using Tokaido Shinkansen In-Car Security Cameras to Improve Convenience and Comfort." December 2025. [jr-central.co.jp](https://jr-central.co.jp/news/release/_pdf/000044788.pdf)
30. AIsmiley. "JR Central Begins Verifying Use of AI with Shinkansen In-Car Security Cameras." December 2025. [aismiley.co.jp](https://aismiley.co.jp/ai_news/jr-central-ai-camera/)
31. NTT Docomo. "Docomo, CTC and MOYAI Begin Collaboration on Wiring-Free IoT Camera Solution." November 2021. [docomo.ne.jp](https://www.docomo.ne.jp/info/news_release/2021/11/22_00.html)
32. MOYAI Inc. "Digital Media" (INFODIA digital signage with edge-AI analysis of passers-by). [moyai-net.com](https://moyai-net.com/digital-media/)
33. Bengo4.com. Interview on JR East's facial-recognition cameras. September 2021. [bengo4.com](https://www.bengo4.com/c_1009/n_13598/)
34. President Online. Ibusuki Makoto on JR East's facial-recognition system. 2021. [president.jp](https://president.jp/articles/-/51210)
35. JIJI Press. "JR East Drops Detection of Released Prisoners by Security Cameras After Being Told It Was Inappropriate." September 2021. [jiji.com](https://web.archive.org/web/20220309032511/https://www.jiji.com/jc/article?k=2021092200784&g=soc) (archived copy)
36. Japan Federation of Bar Associations (JFBA). "President's Statement Calling on Railway Operators to Stop Using Facial Recognition Systems." November 2021. [nichibenren.or.jp](https://www.nichibenren.or.jp/document/statement/year/2021/211125.html)
37. TBS NEWS DIG. "JR East Stops Operating Face-Recognition Security Cameras Introduced for the Tokyo Olympics." October 2025. [newsdig.tbs.co.jp](https://newsdig.tbs.co.jp/articles/-/2250909)
38. Sakigake Shimpo / Kyodo News. "JR East Stops Face-Recognition Cameras at Stations Meant to Detect Wanted Suspects." October 2025. [sakigake.jp](https://web.archive.org/web/20251024100124/https://www.sakigake.jp/news/article/20251024CO0088/) (archived copy)
39. Newswitch. "JR East Trials Walk-Through Face-Authentication Gates." April 2025. [newswitch.jp](https://newswitch.jp/p/45332)
40. Payment Navi. "Why JR East Is Testing Face-Authentication Gates at Niigata and Nagaoka." November 2025. [paymentnavi.com](https://paymentnavi.com/?p=167402)
41. Straight Arrow News (reporting by 404 Media). "ICE Illegally Gains Informal Access to Nationwide License Plate Camera Network." May 2025. [san.com](https://san.com/cc/ice-illegally-gains-informal-access-to-nationwide-license-plate-camera-network/)
42. Atlanta Press Collective. "Flock Safety's License Plate Readers Used for Immigration Enforcement by Metro Atlanta Police Departments." June 2025. [atlpresscollective.com](https://atlpresscollective.com/2025/06/03/flock-metro-atlanta-ice/)
43. University of Washington Center for Human Rights. "Leaving the Door Wide Open: Flock Surveillance Systems Expose Washington Data to Immigration Enforcement." October 2025. [jsis.washington.edu](https://jsis.washington.edu/humanrights/2025/10/21/leaving-the-door-wide-open/)
44. American Civil Liberties Union (ACLU). "Schmidt v. Norfolk" (case page and amicus brief, U.S. Court of Appeals for the Fourth Circuit, No. 26-1227). April 2026. [aclu.org](https://www.aclu.org/cases/schmidt-v-norfolk)
45. Best Car Web. "Is the N-System Legal?" [bestcarweb.jp](https://bestcarweb.jp/news/business/2642)
46. Nishimura & Asahi. Data Protection Newsletter on camera images and the APPI. May 2022. [nishimura.com](https://www.nishimura.com/sites/default/files/images/newsletter_220511_data_protection.pdf)
47. Business Lawyers. "What Is Specific Biometric Personal Information?" September 2026. [businesslawyers.jp](https://www.businesslawyers.jp/practices/1495)
48. National Institute of Information and Communications Technology (NICT). "Security Status of IoT Devices Seen Through IoT Device Surveys." Presentation to the Information and Communications Council, June 2025. [soumu.go.jp](https://www.soumu.go.jp/main_content/001016609.pdf)
49. Toyo Keizai Online. Tsubata Takehiro (NICT), "Even Nursery School Security Cameras Have Leaked Footage: Network Cameras at Offices and Homes Are Being Hijacked." December 2025. [toyokeizai.net](https://toyokeizai.net/articles/-/923528)
50. The Yomiuri Shimbun (via Asia News Network). "Security Camera Live Footage from Japan Leaked to Overseas Websites." November 2025. [asianews.network](https://asianews.network/security-camera-live-footage-from-japan-leaked-to-overseas-websites/)
51. Ministry of Internal Affairs and Communications (MIC). "Caution on Network Camera Security Settings: To Camera Administrators." December 2025. [soumu.go.jp](https://www.soumu.go.jp/menu_kyotsuu/important/kinkyu02_000627.html)
52. CYFIRMA. "Over 80,000 Hikvision Cameras Exposed Online." August 2022. [cyfirma.com](https://www.cyfirma.com/news/news-coverage-from-bleeping-computer-over-80000-hikvision-cameras-exposed-online/)
53. SecurityWeek. "Edimax Camera Zero-Day Disclosed by CISA Exploited by Botnets." March 2025. [securityweek.com](https://www.securityweek.com/edimax-camera-zero-day-disclosed-by-cisa-exploited-by-botnets/)
54. Railway Technical Research Institute (Kawasaki Kunihiro). "Cyber Threats and Countermeasure Approaches for Railway Operation Control Systems." Presentation at the IEEJ Power and Energy Society Conference, 2025. [iee.jp](https://www.iee.jp/pes/wp-content/uploads/sites/3/2025/10/fcfea06745edf8d115c2a6447e0b5e33.pdf)
55. Ministry of Land, Infrastructure, Transport and Tourism (MLIT). Safety Guideline for Information Security in the Railway Sector, 6th Edition (Summary). April 2026. [mlit.go.jp](https://www.mlit.go.jp/tetudo/content/001998630.pdf)
56. MLIT. Cybersecurity policy page. 2026. [mlit.go.jp](https://www.mlit.go.jp/sogoseisaku/jouhouka/sosei_jouhouka9999.html)
57. Splunk Japan. "Preparing for Active Cyber Defense." [splunk.com](https://www.splunk.com/ja_jp/blog/industries/preparing-for-active-cyber-defense.html)
58. PwC Japan. "Legislating the Security Clearance System and How Japanese Companies Should Respond, Part 5: What the Active Cyber Defense Laws Require of Core Infrastructure Operators." October 2025. [pwc.com](https://www.pwc.com/jp/ja/knowledge/column/awareness-cyber-security/economic-security/economic-security11.html)
59. Business Lawyers. "Overview of the Active Cyber Defense Laws and Their Impact on Private Companies." May 2025. [businesslawyers.jp](https://www.businesslawyers.jp/articles/1465)
60. Business Network. "MIC, NICT and ICT-ISAC Launch New NOTICE." April 2024. [businessnetwork.jp](https://businessnetwork.jp/article/19763/)
61. Minato City. "Information Security for Security Cameras" (notice by the Tokyo Metropolitan Government, posted with the ward's security camera subsidy guidance; covers JC-STAR). April 2026. [city.minato.tokyo.jp](https://www.city.minato.tokyo.jp/documents/12041/20260422125819.pdf)
62. Information-technology Promotion Agency (IPA). Security Requirements Checklist for Network Camera Systems. [ipa.go.jp](https://www.ipa.go.jp/security/jisec/choutatsu/nwcs/index.html)
63. JR East. "Safety and Transport Stability Measures for One-Person Operation on Major Tokyo-Area Lines." November 2024. [jreast.co.jp](https://www.jreast.co.jp/press/2024/20241106_ho02.pdf)
64. Impress K-tai Watch. "Docomo Partners with CTC and MOYAI." November 2021. [k-tai.watch.impress.co.jp](https://k-tai.watch.impress.co.jp/docs/news/1368745.html)
