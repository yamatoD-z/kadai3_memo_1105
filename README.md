# 課題　 --

買い物、やることリスト

## ① 課題内容（どんな作品か）

- 事前にセットされたボタンを使って、買うもの、やることを選ぶ
- 事前にセットされたボタンに該当がなければ入力
- 選択、追加した内容は、画面右側に反映。
- 済んだものは、右側のボタンを押すことで、済に移行し、消しこめる
- 最後に、保存ボタンを押せば、追加内容がローカルストレージに保存される。保存された内容は、ブラウザ更新後に、事前セットボタンとして反映される

## ② 工夫した点・こだわった点

- 画面遷移とか、ブラウザ更新をせずに、ボタンを押すだけで、リストが出来る。また、済に移すことも出来る。買うものリスト自体は、メモだけで事足りるが、簡単に消しこめるという点にこだわった。
- ローカルストレージを読み込んで、事前セットのボタンに反映される
- 過去に買ったものをローカルストレージに保存し、履歴が確認できる

## ③ 難しかった点・次回トライしたいこと(又は機能)

- 欲張って、データの持ち方をオブジェクトの中に配列があるような構造にしたら、かなり彷徨った。
- 実際にはスマホで使うが、スマホから見ると、かなり小さくなった。
-

## ④ 質問・疑問・感想、シェアしたいこと等なんでも

- [質問]
- [疑問]
- [感想]見た目にはこだわらず、どう動くかにはこだわると割り切ることにした
事前にどういう設計にするか考えるようにしているものの、細かい部分まで考えておいたほうがコードを書く際、スムーズ。それが出来ておらず、かなり試行錯誤となった
- [tips]
- [参考記事]
jQueryで動かせない場合の処理
 https://qumeru.com/magazine/401
