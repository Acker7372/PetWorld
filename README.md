# Pet World

**Pet World**是個流浪動物領養和走失寵物協尋的平台
  - 也是我的第一個涵蓋了前後端與資料庫並佈署至託管平臺的作品。
  - 這個作品的發想是因爲發現全臺灣的收容所正在面臨超收過多流浪動物，造成動物生活空間擁擠、環境難以維持的情況，
  希望在製作出作品的同時也能提高浪浪們的曝光度，讓牠們能有個歸屬也減緩收容所的壓力。

## 功能

- **會員註冊與登入**：可以註冊成為會員，並透過登入來存取更多功能。
- **流浪動物資料卡片**：串接政府公開 API，顯示全臺灣公立流浪動物收容所的動物資料。用戶可以搜尋特定縣市、動物種類或性別。
- **走失協尋**：會員可以為走失的寵物創建走失協尋卡片，並公開刊登於網站上。
- **會員中心**：會員可以查看和編輯自己的個人資料。

## 技術棧

- **前端**：Vue 3, Pinia, Bootstrap 5, Element Plus, Vite
- **後端**：Node.js, Express
- **資料庫**：MySQL
- **託管平臺**：Zeabur

## 一些挑戰

- **照片儲存**：由於部署後無法使用後端資料夾儲存照片，暫時改用將照片轉換為 base64 格式後存入資料庫。
- **Bug**：在公立領養頁面資料加載時切換到走失協尋頁面，會導致雙方卡片都消失的問題。
- **網站風格**：想要營造溫馨的氛圍，選擇淡色系和米色系的顏色配合日系風格的插圖。然而最終讓網站給人一種很過時的感覺...
- 想將作品Po上Facebook或Dcard的工程師社群平臺尋求建議或使用反饋，但發現佈署網頁的開銷，對現在沒有工作的窮光蛋如我來說是一個不小的挑戰。


## 未來目標

- **寵物送別頁面**：計劃新增一個頁面，提供全臺灣寵物送別服務業者的資訊，並整合 Google 地圖服務。
- **捐贈現金或飼料頁面**：主要是想要練習怎麼串接金流。
- **第三方登入**：也是沒有嘗試過的功能，想試試看。
- **驗證訊息** ： 想在會員註冊、登入頁面製作發送Email驗證信的功能。

## 檢討與改進

- **網站架構**：
  開發前沒有先把網站整體功能以及需要什麼頁面先嚴謹的規劃好，造成開發到一半發現某些功能不合理或是不應該這樣設計頁面之類的問題發生。
  

- **通用性** : 
  - 開發初期沒有想到要讓component或變數有通用性，明明是類似的功能卻要從新寫一次代碼造成開發很緩慢。
  - 中期發現問題後重新設計component以及使用Pinia來增加通用性。
  - 後期發現太着重於通用性導致有些變數或是函數不應該共用卻共同使用，造成切換頁面時資料被污染的情況，第一次遇到這種情況所以又花了不少時間修正錯誤。


  以上兩個問題應該要結合在一起探討，應該要先製作網站架構圖並且每個功能、頁面想達到什麼效果或是目標要先進行合理性與可行性評估以減少時間浪費。

