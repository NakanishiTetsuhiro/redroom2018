(() => {
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

    // スレッドを引数の時間だけ停止
    function sleep(time) {
        const d1 = new Date();
        while (true) {
            const d2 = new Date();
            if (d2 - d1 > time) {
                return;
            }
        }
    }

    function sound(n)
    {
        //音源を生成
        var synth = new Tone.Synth().toMaster();
        //「C5」の音を「2分音符」で発音
        synth.triggerAttackRelease('C5', '2n');

        // var player = new Tone.Player("./audio/01.ogg").toMaster();
        // player.autostart = true;
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

                // TODO: ここsound鳴らすところ同期処理にしたい
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




    //要素の取得
    var elements = document.getElementsByClassName("drag-and-drop");

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    var x;
    var y;

    //マウスが要素内で押されたとき、又はタッチされたとき発火
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }

    // 開いたときにまず１かい鳴らす
    sound(1)

    let cnt = 0

    // うむ
    $('#close-btn').click(function(){
        cnt++

        // async関数の実行
        testAsync(cnt).catch(
            err => console.error(`error: ${err}`)
        );
    })
})()