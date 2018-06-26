(() => {
    let player1 = new Tone.Player("./audio/01.ogg").toMaster();
    let player2 = new Tone.Player("./audio/02.ogg").toMaster();
    let player3 = new Tone.Player("./audio/03.ogg").toMaster();

    // TODO: 音量変更してみる
    // player1.volume.value = -6;
    // player2.volume.value = -6;
    // player3.volume.value = -6;

    console.log(player3.volume)

    //マウスが押された際の関数
    function mdown(e) {

        //クラス名に .drag を追加
        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収
        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        //要素内の相対座標を取得
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        //ムーブイベントにコールバック
        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {

        //ドラッグしている要素を取得
        var drag = document.getElementsByClassName("drag")[0];

        //同様にマウスとタッチの差異を吸収
        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        //マウスボタンが離されたとき、またはカーソルが外れたとき発火
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);

    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        //ムーブベントハンドラの消去
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

    function sound(n)
    {
        if (n === 1){
            player1.autostart = true;
            player1.start();
        }

        if (n === 2){
            player2.autostart = true;
            player2.start();
        }

        if (n === 3){
            player3.autostart = true;
            player3.start();
        }
    }



    // 指定ms待つ
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 非同期処理の結果を用いた処理（async/await）
    async function testAsync(cnt) {
        try {
            $('#dialog01').css('display', 'none')

            if (cnt <= 3) {
                await sleep(800)
                $('#dialog01').css('display', 'block')
                sound(1)

            } else if (cnt === 4) {
                await sleep(800)
                $('#dialog02').css('display', 'block')
                sound(2)
                await sleep(2000)
                $('#dialog02').css('display', 'none')
                $('#fear-box').css('display', 'block')
                sound(3)
            }
        } catch(err) {
            return console.error(`error: ${err}`);
        }
    }

    let x
    let y
    let cnt = 1

    // 画面の読み込みが終わった時点で発火するイベント
    window.onload = function()
    {
        //要素の取得
        var elements = document.getElementsByClassName("drag-and-drop");

        //マウスが要素内で押されたとき、又はタッチされたとき発火
        for(var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mousedown", mdown, false);
            elements[i].addEventListener("touchstart", mdown, false);
        }

        // 開いたときにまず１かい鳴らす
        // INFO: iOSではユーザーがなにかアクションを起こさない限り音がならない仕様なので鳴りません
        sound(cnt)
    };

    // うむ
    $('#close-btn').click(function(){
        cnt++

        // async関数の実行
        testAsync(cnt).catch(
            err => console.error(`error: ${err}`)
        );
    })
})()