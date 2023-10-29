// 検索tipsの表示
(function () {
    const url = location.href; // href:全体、host:ドメイン名、pathname:ディレクトリ、search:検索パラメータ

    let searchButton = document.querySelector('button[aria-label = "検索"]');
    if (searchButton == null) {
        // 英語版googleの場合
        searchButton = document.querySelector('button[aria-label = "Search"]');
    }

    // 検索ヒント表示ボタンのコード挿入
    let addcode =
        '<div id="google_tips"><p class="tip_p"><span>"検索内容" </span> 完全一致で検索</p><p class="tip_p"><span>-検索内容 </span> 特定の単語を除外</p><p class="tip_p"><span>~検索内容 </span> 類義語も検索</p><p class="tip_p"><span>allintext:検索内容</span> 全単語を検索結果に含める</p><p class="tip_p"><span>検索内容 26..28 </span> 任意の数値範囲を指定する</p><p class="tip_p"><br></p><p class="tip_p"><span>...not work</span> うまく動かない</p><p class="tip_p"><span>... not show</span> 表示されない</p><p class="tip_p"><span>... not execute</span> 実行されない</p><p class="tip_p"><span>A vs B</span> 違いを知りたい</p><p class="tip_p"><span>How can I implement ...</span> 実装方法を知りたい</p></div>';
    searchButton.insertAdjacentHTML('afterend', addcode);

    // 日本語英語検索切り替えボタンのコード挿入
    let addcode2 = '<div id="google_lang_toggle"></div>';
    if (url.indexOf('&hl=en') !== -1) {
        // 日本語版googleの場合、enクラスを追加
        addcode2 = '<div id="google_lang_toggle" class="en"></div>';
    }
    searchButton.insertAdjacentHTML('afterend', addcode2);

    // 検索ヒント表示ボタンのクリックイベント
    let tipsBotton = document.getElementById('google_tips');
    document.addEventListener('click', (point) => {
        if (!point.target.closest('#google_tips')) {
            if (tipsBotton.classList.contains('open')) {
                tipsBotton.classList.remove('open');
            }
        } else {
            if (!tipsBotton.classList.contains('open')) {
                tipsBotton.classList.add('open');
            }
        }
    });

    // 日本語英語検索切り替えボタンのクリックイベント
    let tipsLangToggle = document.getElementById('google_lang_toggle');
    tipsLangToggle.addEventListener('click', () => {
        if (url.indexOf('&hl=en') == -1) {
            // 日本語版googleの場合
            location = url + '&hl=en';
        } else {
            // 英語版googleの場合
            location = url.replace('&hl=en', '');
        }
    });
})();

// 検索結果スポンサー欄の表示非表示
(function () {
    try {
        // 検索結果スポンサー欄（上にある方）の表示非表示
        const sponsorTopEle = document.querySelector('#taw');

        // 検索結果スポンサー欄がない場合はボタンを表示しない
        if (sponsorTopEle.textContent == null) {
            const addcode = '<button id="sponsorToggle">スポンサー表示</button>';
            sponsorTopEle.insertAdjacentHTML('beforebegin', addcode);

            const sponsorToggleEle = document.querySelector('#sponsorToggle');
            sponsorToggleEle.addEventListener('click', () => {
                sponsorTopEle.classList.toggle('appear');
            });
        }

        // 検索結果スポンサー欄（下にある方）の表示非表示
        const sponsorBottomEle = document.querySelector('#bottomads');

        // 検索結果スポンサー欄がない場合はボタンを表示しない
        if (sponsorBottomEle.textContent == null) {
            const addcode = '<button id="sponsorToggleBottom">スポンサー表示</button>';
            sponsorBottomEle.insertAdjacentHTML('beforebegin', addcode);

            const sponsorToggleEle = document.querySelector('#sponsorToggleBottom');
            sponsorToggleEle.addEventListener('click', () => {
                sponsorBottomEle.classList.toggle('appear');
            });
        }
    } catch (error) {
        console.log(error);
    }
})();

// aタグのリストを作成する関数
function indexAtag() {
    let h3Tags = document.getElementsByTagName('h3');

    // 「関連する質問」の要素を取得（「関連する質問」の要素に含まれるh3タグはカーソル操作の対象から外す）
    let searchButton = document.querySelector('textarea[aria-label = "検索"]');
    // 英語版googleの場合
    if (searchButton == null) {
        searchButton = document.querySelector('textarea[aria-label = "Search"]');
    }
    let searchWord = searchButton.textContent;
    let twoFontOfsearchWord = searchWord.slice(0, 2);
    let relatedQuestionEle = document.querySelector('[data-initq^=' + twoFontOfsearchWord + ']');

    let aTags = [];
    for (let i = 0; i < h3Tags.length; i++) {
        if (relatedQuestionEle != null && relatedQuestionEle.contains(h3Tags[i])) {
            // 「関連する質問」の要素はaタグリストには含めない
        } else if (h3Tags[i].parentElement.hasAttribute('aria-label')) {
            // 「検索結果をもっと見る」の要素はaタグリストには含めない
        } else if (h3Tags[i].parentElement.hasAttribute('aria-live')) {
            // 「検索結果をもっと見る」の要素はaタグリストには含めない
        } else {
            aTags.push(h3Tags[i].parentElement);
        }
    }
    return aTags;
}

// 矢印で検索結果を操作する
(function () {
    aTags = indexAtag();
    let i = null;

    // キーボード操作で検索結果を操作する
    document.addEventListener('keydown', function (e) {
        // 検索テキストボックスがアクティブでない時のみ反応させる
        if (document.querySelector('[type = "search"]') != document.activeElement) {
            // ↑上矢印を押した際の処理
            if (e.key == 'ArrowUp' && i != null) {
                e.preventDefault();
                if (i == 0) {
                    aTags[i].focus();
                    aTags[i].classList.toggle('selectedSearchResult');
                    aTags[i].scrollIntoView({
                        block: 'center',
                        behavior: 'smooth',
                    });
                    return false;
                }
                if (i != 0) {
                    aTags[i - 1].focus();
                    aTags[i - 1].classList.toggle('selectedSearchResult');
                    aTags[i].classList.toggle('selectedSearchResult');
                    if (i != 1) {
                        aTags[i - 1].scrollIntoView({ block: 'center', behavior: 'smooth' });
                    } else {
                        scrollTo(0, 0);
                    }
                    i--;
                }
                return false;
            }

            // ↓下矢印を押した際の処理
            if (e.key == 'ArrowDown') {
                e.preventDefault();
                if (i == null) {
                    i = 0;
                    aTags[i].focus();
                    aTags[i].classList.toggle('selectedSearchResult');
                    aTags[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
                    return false;
                }
                if (i != aTags.length - 1) {
                    aTags[i + 1].focus();
                    aTags[i].classList.toggle('selectedSearchResult');
                    aTags[i + 1].classList.toggle('selectedSearchResult');
                    aTags[i + 1].scrollIntoView({ block: 'center', behavior: 'smooth' });
                    i++;
                } else {
                    aTags = indexAtag();
                    console.log('reload');
                    console.log(i);
                }
                return false;
            }
        }
    });
})();

// 音声入力などのショートカットキー追加
(function () {
    window.addEventListener('load', function () {
        const searchInputEle = document.querySelector('[type = "search"]');
        document.addEventListener('keydown', function (e) {
            // "_"入力で音声入力
            if (e.key == '_') {
                e.preventDefault();
                try {
                    const voiseInputEle = document.querySelector('[aria-label="音声で検索"]');
                    voiseInputEle.click();
                } catch (error) {
                    console.log('音声入力ボタンがありません。');
                }
            }

            // "."入力でフォームにフォーカスしつつ検索ワードを削除
            if (e.key == '.') {
                e.preventDefault();
                try {
                    searchInputEle.textContent = '';
                    searchInputEle.focus();
                } catch (error) {
                    console.log('検索ボックスがありません。');
                }
            }
        });
    });
})();
