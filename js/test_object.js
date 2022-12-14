//基本セットを作っておく
// オブジェクトでデータを持つ->配列に変更。配列内にオブジェクト
//https://webdrawer.net/javascript/array-object.html
let shopping_master = {
    'oksuper':['beer','pork','wine','kinoko'],
    'matsukiyo':['kanpoyaku','yunkel']

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
};

// console.log(shopping_master);



// それをローカルストレージに入れておく
let master_json = JSON.stringify(shopping_master);
localStorage.setItem('shopping_master', master_json);
// localStorage.getItem('shopping_master');
// console.log(shopping_master);
let master_back = JSON.parse(localStorage.getItem('shopping_master'));
// console.log(master_back);

// 実際の買い物リストは別のオブジェクトで管理。空のオブジェクトを作成
let shopping_list ={};

// 基本セットの店名と商品一覧を表示。ボタンで表示されるようにする。

Object.keys(master_back).forEach((cnt) => {
    console.log(master_back[cnt]);
});

console.log(Object.entries(master_back)[0][1].length);

let shop_name_html ='';
for(let i=0; i<Object.keys(master_back).length;i++){
    let shop_name = Object.entries(master_back)[i][0];

    shop_name_html +=`
        <p id=shops>
        ${shop_name}                
        </p>
        `
    Object.keys(master_back).forEach(key => {
        master_back[key].forEach(cnt =>{
            shop_name_html +=`
            <button id=goods>
            ${cnt}
            </button>      
            <br>  
            `
            });
            });
    $('#pickup').html(shop_name_html);
}

// オブジェクトのキーをボタン名にしておく
// ボタンを押すと、それが実際の買い物リストに追加されていく。
// 基本セットにない追加商品があれば、インプット欄に入力。
// 追加商品は、基本セットにも追加される
// 念のため、ローカルストレージに保存。




// ボタンを押したら、同時に、実際の買い物リストも更新して表示させる。
// 実際の買い物リストも、ボタンで表示。買ったら、クリック。
// クリックされたら、ボタンの色を変えるまたはボタンを消す。







//1.Save クリックイベント
$("#save").on("click",function(){
    const key = $("#key").val();
    const value = $("#memo").val();
    localStorage.setItem(key,value);
    const html = '<tr><th>'+key+'</th><td>'+value+'</td></tr>';
    $("#list").append(html);
    $('#key').val('');
    $('#memo').val('');
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