// 過去の購入数、日付も持たせようかと思ったが、操作に詰まったので、見送り
// [
// {'beer':[8,'2022/9/10','2022/8/25']},
// {'pork':[2,'2022/9/10','2022/9/2']},
// {'wine':[1,'2022/9/2']},
// {'kinoko':[3,'2022/9/10','2022/9/2']}
// ],    
// [
// {'kanpoyaku':[2,'2022/9/10','2022/8/25']},
// {'yunkel':[3,'2022/9/10','2022/8/25']}
// ]
// オブジェクトでデータを持つ->配列に変更。配列内に配列
//https://webdrawer.net/javascript/array-object.html

// １．マスターデータの用意
//基本セットを作っておく
let shopping_default =[
    ['supermarket','卵','米','ネギ','チーズ','ごみ袋','キャベツ','トマト','魚','ジュース','牛','豚','鳥','きゅうり','パン','牛乳','豆腐','納豆','ドレッシング'],
    ['other_shop','薬局で漢方','薬局で洗顔','地下で夕飯','地下で手土産','本屋で本','塾のノート','古着屋'],
    ['other_ToDo','クリーニング受取','図書館返却','髪を切る','ユニクロ受取','メルカリ発送']
];

//過去に基本セットに追加をして、ローカルストレージに保存していれば、ローカルストレージに保存されているものをマスターとする
//ローカルストレージに保存しなければ、基本セットをマスターとする。
let shopping_master = [];
if(localStorage.getItem('shopping_master')){
    shopping_master=JSON.parse(localStorage.getItem('shopping_master'));
}else{
    shopping_master = shopping_default;
}

// ２．JSON化してローカルストレージに保存
// shopping_masterのまま送ると、配列内配列が反映されなかった。なので、配列でもJSON化は必要みたい
localStorage.setItem('listNoJSON',shopping_master);
// JSONにして、それをローカルストレージに入れておく
let master_json = JSON.stringify(shopping_master);
localStorage.setItem('shopping_master', master_json);
// ローカルストレージのものを取り出して、それを使う
let master_back = JSON.parse(localStorage.getItem('shopping_master'));


// 出力のテスト
// master_back.forEach(elem => {
//     console.log(elem);
// });

// console.log(Object.entries(master_back)[0][1].length);
// console.log(Object.entries(master_back)[1][1].length);
// console.log((master_back)[0][1].length);
// console.log((master_back)[1][1].length);
// console.log((master_back)[1][1].length);


// ３．マスターから、買うものリストの候補を表示

// マスターの店名と商品一覧を表示。商品はボタンで表示されるようにする。
// そのために、店名を配列から取り出してきて、次の店名に行く前に、
// 商品名をボタン化するhtmlを繰り返し処理で書く。
// マスターの商品名が追加されても、ページ更新時に、ボタンが追加される
let shop_name_html ='';
master_back.forEach(elem => {
    let shop_name = elem[0]; // master_back[elem][0]とすると、0に対してエラーがでる
    shop_name_html +=`
        <p id=shops name=${shop_name} >
        ${shop_name}                
        </p>
        <input id=new_item_${shop_name}>
        
        <button id=add_${shop_name} name=add>
        追加
        </button>
        <br>
        `;

    for(let i=1;i<elem.length;i++){
        shop_name_html +=`
            <button class=goods_${shop_name} name=${elem[i]}>
            ${elem[i]}
            </button>  
            `
            };
            // 複数ボタンで同じ処理をさせるなら、idじゃなくてclassを目印にする。idだと、1つ目のボタンしか反応しなかった
    });
// 左側にボタンが発生。画面表示時点で処理は済んでいる。
$('#pickup').html(shop_name_html);

// ４．買うものリストの作成

// ボタンを押すと、それが右の買い物リストに追加されていく。
// マスターにない追加商品があれば、インプット欄に入力。
// 追加商品は、ローカルストレージを通じて、マスターにも追加される

// 買うものリストは別の配列で管理。空の配列を作成
// この配列を使って、右側に表示させようかと思い、用意。ただ、個別ボタンで対応。
// せっかくなので、買い物履歴を日時をキーにしてローカルストレージを使って残すことにする。
let shopping_list =[[],[],[]];

const youbi = ["日","月","火","水","木","金","土"];

let date1 = new Date();
let date2 = date1.getFullYear() + "年" + 
            (date1.getMonth() + 1)  + "月" + 
            date1.getDate() + "日" + 
            date1.getHours() + "時" + 
            date1.getMinutes() + "分" + 
            date1.getSeconds() + "秒" + 
            date1.getMilliseconds() + "ミリ秒" + 
            youbi[date1.getDay()] + "曜日" // 0は日曜日～6は土曜日
console.log(date2); 

// ４－１．追加アイテムの処理

// まずはベタ打ち。
// $('#add_supermarket').on('click',function(){
//     let add_item =$('#new_item_supermarket').val();
//     shopping_list[0].push(add_item);
//     shopping_master[0].push(add_item);
//     shopping_list_html +=`
//     <button class='shopping_item' name=${add_item}>
//             ${add_item}
//             </button>      
//             <br>  
//             `;
//     $('#shopping').html(shopping_list_html);
// });

// 動いたので、一般化。iは配列内のどの配列に追加するか。
let shopping_list_html ='';
function add_item(add_button,i,add_input){
    $(add_button).on('click',function(){
    let add_item =$(add_input).val();
    shopping_list[i].push(add_item);
    shopping_master[i].push(add_item);
    shopping_list_html +=`
    <button class='shopping_item' name=${add_item}>
            ${add_item}
            </button>      
            <br>  
            `;
    $('#shopping').html(shopping_list_html);
    
});
}

// それぞれのボタンに応じて設定。jQueryの場合は''も付けておく
add_item('#add_supermarket',0,'#new_item_supermarket');
add_item('#add_other_shop',1,'#new_item_other_shop');
add_item('#add_other_ToDo',2,'#new_item_other_ToDo');



// ４－２．表示されている商品毎のボタンを押して、買うものリストへ移す処理

// まずはベタ打ち。
// $('.goods_supermarket').on('click',function(){
//     let shopping_item = $(this).attr('name');
//     shopping_list[0].push(shopping_item);
//     console.log(shopping_list,'list');
//     localStorage.setItem('shopping_list', shopping_list);
//     shopping_list_html +=`
//     <button class='shopping_item' name=${shopping_item}>
//             ${shopping_item}
//             </button>      
//             <br>  
//             `;
//     $('#shopping').html(shopping_list_html);
//         });

// 動いたので、一般化
function listing(goods,i){
    $(goods).on('click',function(){
    let shopping_item = $(this).attr('name');
    shopping_list[i].push(shopping_item);
    console.log(shopping_list,'list');
    localStorage.setItem('shopping_list', shopping_list);
    shopping_list_html +=`
    <button class='shopping_item' name=${shopping_item}>
            ${shopping_item}
            </button>      
            <br>  
            `;
    $('#shopping').html(shopping_list_html);
    let shopping_list_JSON= JSON.stringify(shopping_list);
    localStorage.setItem(date2,shopping_list_JSON);
});
}

// それぞれのボタンに応じて設定。jQueryの場合は''も付けておく
// 店名毎にクラス名を分けたので、クラスごとに実行。
// ただ、右側の買うものリスト上、細かく店を分ける必要はなかったので、区別せず。
// もしやるなら、listingのタグを分けて、htmlを加える場所も引数で変える
// でも、やっぱり、どの配列に保存するかを設定しないと、ローカルストレージから呼び出したときに、左側の配置が変になるので、配列位置を指定
listing('.goods_supermarket',0);
listing('.goods_other_shop',1);
listing('.goods_other_ToDo',2);





// ５．買ったら、右側のボタンを押して、済に移していく

let completed_html ='';
$(document).on('click','.shopping_item',function(){
    let completed_item = $(this).attr('name');
    console.log(completed_item);
    $(this).remove();
    completed_html +=`
    <button class='completed_item' name=${completed_item}>
            ${completed_item}
            </button>
            `;
    $('#completed').html(completed_html);
});

// jQueryであとから追加した要素には単純にクリックメソッドは動かない。
// なので、documentを使った操作。これが出来なかったら、リロードさせるしかないのか、と思案していた。
// https://qumeru.com/magazine/401
// $('.shopping_item').on('click',function(){
//     let completed_item = $(this).attr('name');
//     console.log(completed_item);
//     $(this).hide();
//     completed_html +=`
//     <button class='completed_item' name=${completed_item}>
//             ${completed_item}
//             </button>
//             `;
//     $('#completed').html(completed_html);

// });


// 関連ボタン
// 元々あったボタンを引き継ぎつつ、元データが配列である点などを修正。
//1.Save クリックイベント
$("#save").on("click",function(){
    master_json = JSON.stringify(shopping_master);
    localStorage.setItem('shopping_master', master_json);
    const html = '<tr><th>shopping_master</th><td>'+master_json+'</td></tr>';
    $("#list").append(html);
});

//2.clear クリックイベント
$("#clear").on("click",function(){
    localStorage.clear();
    $("#list").empty();
});

//3.ページ読み込み：保存データ取得表示
for(let i=0; i<localStorage.length; i++){
    const key   = localStorage.key(i);
    const value = localStorage.getItem(key);
    const html = '<tr><th>'+key+'</th><td>'+value+'</td></tr>';
    $("#list").append(html);
}