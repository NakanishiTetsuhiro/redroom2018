// せっかくだしES2015でかいてみましょう
// TODO: use strict;ってかく必要あるのかな？

(() => {
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
        switch ( n ) {
            case 1:
                let audio01 = new Audio('audio/01.mp3')
                audio01.play()
                break
            case 2:
                let audio02 = new Audio('audio/02.mp3')
                audio02.play()
                break
            case 3:
                let audio03 = new Audio('audio/03.mp3')
                audio03.play()
                break
            default:
                throw new Error("Unexpected value")
        }
    }
    // 開いたときにまず１かい鳴らす
    sound(1)

    let cnt = 0

    // うむ
    $('#close-btn').click(function(){
        cnt++
        console.log(cnt)

        $('#dialog01').css('display', 'none')

        setTimeout(() => {
            if (cnt <= 3) {
                $('#dialog01').css('display', 'block')
                sound(1)
            } else if (cnt === 4) {
                $('#dialog02').css('display', 'block')
                sound(2)
                setTimeout(() => {
                    $('#dialog02').css('display', 'none')
                    $('#fear-box').css('display', 'block')
                    sound(3)
                }, 2000)
            }
        }, 800)
    })
})()