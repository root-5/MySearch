window.onload = async function () {
    // 直前にいたサイトのアドレスを取得して、それがGoogle検索結果ページであるか判定する。
    if (document.referrer.indexOf('google') != -1) {
        // 検索終了のフラグを宣言
        let searchEndFlag = false;

        // 検索対象とするタグの配列
        const targetTagArr = ['p', 'li'];

        // ローカルストレージからディスクリプションを取得する
        const storageResponse2 = await chrome.storage.local.get(['discriptionText']);
        const searchWord2 = storageResponse2.discriptionText;
        console.log('searchWord2 is ' + searchWord2);

        // 検索フォーマットの指定、"gi"は該当したワード全てかつ大文字小文字を区別しないという意味
        let reg2 = new RegExp(searchWord2, 'gi');

        for (let i = 0; i < targetTagArr.length; i++) {
            // 検索対象とするタグの要素を取得
            const targetTagEleArr = document.querySelectorAll(targetTagArr[i]);

            // emタグのテキストを検索して、黄色の背景をつける
            for (let i = 0; i < targetTagEleArr.length; i++) {
                let elementText = targetTagEleArr[i].textContent;

                // pタグのテキストにemタグのテキストがある場合にのみ処理を行う
                if (elementText.indexOf(searchWord2) !== -1) {
                    // emタグのテキストを検索して、背景をつける
                    targetTagEleArr[i].innerHTML = await elementText.replace(
                        reg2,
                        function (match_word) {
                            return (
                                '<em style="background-color: yellow;" id="searchResultPosition">' +
                                match_word +
                                '</em>'
                            );
                        }
                    );

                    // 検索結果の位置までスクロールする
                    const searchResultPositionEle = document.querySelector('#searchResultPosition');
                    searchResultPositionEle.scrollIntoView({
                        // behavior: 'smooth',
                        block: 'center',
                    });

                    // 検索終了のフラグを立てる
                    searchEndFlag = true;

                    break;
                }
            }

            // 検索終了のフラグが立っていたら処理を終了する
            if (searchEndFlag) {
                break;
            }
        }
    }
};

// adsbygoogleクラスを持つ要素の削除
(function () {
    const adsbygoogleEles = document.querySelectorAll('.adsbygoogle');

    for (let i = 0; i < adsbygoogleEles.length; i++) {
        adsbygoogleEles[i].remove();
    }
})();
