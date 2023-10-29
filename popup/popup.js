// ================================================================
// カスタム検索用データ
const customSearchData = [
    // ドキュメント一覧
    {
        name: 'JavaScript',
        link: 'https://developer.mozilla.org/ja/docs/Web/JavaScript',
        isLang: true,
    },
    {
        name: 'TypeScript',
        link: 'https://www.typescriptlang.org/docs/',
        isLang: true,
    },
    {
        name: 'Python',
        link: 'https://docs.python.org/ja/3/',
        isLang: true,
    },
    {
        name: 'Go',
        link: 'https://go.dev/doc/',
        isLang: true,
    },
    {
        name: 'HTML',
        link: 'https://developer.mozilla.org/ja/docs/Web/HTML',
        isLang: true,
    },
    {
        name: 'CSS',
        link: 'https://developer.mozilla.org/ja/docs/Web/CSS',
        isLang: true,
    },
    {
        name: 'PHP',
        link: 'https://www.php.net/manual/ja/index.php',
        isLang: true,
    },
    {
        name: 'Ruby',
        link: 'https://www.ruby-lang.org/ja/documentation/',
        isLang: true,
    },
    {
        name: 'VBA',
        link: 'https://learn.microsoft.com/ja-jp/office/vba/api/overview/excel',
        isLang: true,
    },
    {
        name: 'Tailwindcss',
        link: 'https://tailwindcss.com/docs/installation',
        isLang: false,
    },
    {
        name: 'React',
        link: 'https://ja.react.dev/learn',
        isLang: false,
    },
    {
        name: 'Next.js',
        link: 'https://nextjs.org/docs',
        isLang: false,
    },
    {
        name: 'LangChain',
        link: 'https://js.langchain.com/docs/get_started/introduction/',
        isLang: false,
    },
    {
        name: 'YouTube',
        link: 'https://www.youtube.com/',
        isLang: false,
    },
    {
        name: 'Gmail',
        link: 'https://mail.google.com/mail/u/0/#inbox',
        isLang: false,
    },
    {
        name: 'Gkeep',
        link: 'https://keep.google.com/u/0/',
        isLang: false,
    },
    {
        name: 'Gdrive',
        link: 'https://drive.google.com/drive/my-drive',
        isLang: false,
    },
    {
        name: 'TradingView',
        link: 'https://jp.tradingview.com/chart/',
        isLang: false,
    },
    {
        name: 'GitHub',
        link: 'https://github.com/',
        isLang: false,
    },
    {
        name: 'Vercel',
        link: 'https://vercel.com/dashboard',
        isLang: false,
    },
    {
        name: 'DockerHub',
        link: 'https://hub.docker.com/',
        isLang: false,
    },
    {
        name: 'Notion',
        link: 'https://www.notion.so/',
        isLang: false,
    },
    {
        name: 'MyApp',
        link: './',
        isLang: false,
    },
];

// ================================================================
// DOM読み込み後に実行
document.addEventListener('DOMContentLoaded', function () {
    // ポップアップから開いたのか判定、true:ポップアップから開いた、false:新しいタブページから開いた
    let popupFlag = false;
    const htmlName = location.pathname; // href:全体、host:ドメイン名、pathname:ディレクトリ、search:検索パラメータ
    if (htmlName.startsWith('/popup')) {
        popupFlag = true;
    }

    // フォームタグを取得
    const form = document.querySelector('form');
    const search = document.querySelector('#search');

    // 検索画面をクリックしたときはフォームにフォーカスを当てる
    document.addEventListener('click', function (e) {
        search.focus();
    });

    // カスタム検索モードの変数宣言と見た目の変更
    let privateMode = false;
    document.addEventListener('keydown', function (e) {
        if (e.key === ' ' && search.value.length == 0) {
            e.preventDefault();
            search.value = '';
            privateMode = !privateMode;
            search.focus();
            if (privateMode) {
                search.style.backgroundColor = '#000000';
                search.style.color = '#ffffff';
                search.placeholder = 'Custom Search...';
            } else {
                search.style.backgroundColor = '#ffffff';
                search.style.color = '#000000';
                search.placeholder = 'Search...';
            }
        }
    });

    // フォームタグにchangeイベントを設定
    search.addEventListener('input', function () {
        if (privateMode && search.value.length > 1) {
            // searchHitCount、targetLinkを初期化
            let searchHitCount = 0;
            let targetLink = '';

            for (let i = 0; i < customSearchData.length; i++) {
                // customSearchDataと入力データを小文字に変換
                const customSearchDataLowerCase = customSearchData[i].name.toLocaleLowerCase();
                const searchValueLowerCase = search.value.toLocaleLowerCase();

                // customSearchDataのデータと照合し、前方一致した場合はカウントを増やす
                if (customSearchDataLowerCase.startsWith(searchValueLowerCase)) {
                    searchHitCount++;
                    targetLink = customSearchData[i].link;
                }
            }

            // データに合致した検索結果が一つに絞られたらcustomSearchDataのリンクを開く
            if (searchHitCount === 1) {
                if (popupFlag) {
                    window.open(targetLink);
                } else {
                    window.open(targetLink, '_self');
                }
            }
        }
    });

    // フォームタグにsubmitイベントを設定
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // カスタム検索モードの場合は何もしない
        if (privateMode) return;

        // もし入力内容がURLだった場合はURL開く
        if (popupFlag) {
            isValidUrl(search.value)
                ? window.open(search.value)
                : window.open('https://www.google.com/search?q=' + search.value);
        } else {
            isValidUrl(search.value)
                ? window.open(search.value)
                : window.open('https://www.google.com/search?q=' + search.value, '_self');
        }
    });
});

// ================================================================
// URLかどうか判定する関数
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}
