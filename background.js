// 01_searchResult.jsと02_searchResultPage.jsの間でメッセージをやり取りする
// 01_searchResult.jsから値を受け取る
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // 受け取った値にテキストを追加する。
    responseMessage = 'recieve message\n' + message.text;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 02_searchResultPage.jsに値を返す
        chrome.tabs.sendMessage(tabs[0].id, { message: responseMessage });
    });
});
