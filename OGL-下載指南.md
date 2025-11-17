# OGL 庫下載指南

## 方法 1：從 GitHub 直接下載（推薦）

### 步驟 1：訪問 GitHub 倉庫
前往：https://github.com/oframe/ogl

### 步驟 2：下載 ZIP 檔案
1. 點擊綠色按鈕 "Code"
2. 選擇 "Download ZIP"
3. 解壓縮下載的檔案

### 步驟 3：複製需要的檔案到專案

下載解壓後，您需要從 `ogl-master/src` 資料夾中複製以下檔案：

#### 必需的核心檔案：
1. **core/Renderer.js** - WebGL 渲染器
2. **core/Program.js** - Shader 程式
3. **core/Mesh.js** - 網格物件
4. **extras/Triangle.js** - 三角形幾何體

#### 檔案結構：
將這些檔案放到您的專案中，建議創建一個 `js/lib/ogl/` 資料夾：

```
new-1/
├── js/
│   ├── lib/
│   │   └── ogl/
│   │       ├── core/
│   │       │   ├── Renderer.js
│   │       │   ├── Program.js
│   │       │   └── Mesh.js
│   │       └── extras/
│   │           └── Triangle.js
│   ├── balatro-background.js
│   └── script.js
```

## 方法 2：使用 Git（如果您有安裝 Git）

在專案根目錄執行：
```bash
git clone https://github.com/oframe/ogl.git
```

然後複製需要的檔案到 `js/lib/ogl/` 資料夾

## 方法 3：直接從 CDN 下載檔案（最簡單）

### 步驟：
1. 訪問以下 URL，分別下載每個檔案：
   - https://raw.githubusercontent.com/oframe/ogl/master/src/core/Renderer.js
   - https://raw.githubusercontent.com/oframe/ogl/master/src/core/Program.js
   - https://raw.githubusercontent.com/oframe/ogl/master/src/core/Mesh.js
   - https://raw.githubusercontent.com/oframe/ogl/master/src/extras/Triangle.js

2. 在專案中創建資料夾結構 `js/lib/ogl/core/` 和 `js/lib/ogl/extras/`

3. 將下載的檔案放入對應資料夾

4. 下載時：
   - 在瀏覽器中打開上述 URL
   - 右鍵點擊頁面 → "另存新檔" 或 "Save As"
   - 儲存到對應的資料夾

## 安裝完成後的使用方式

完成下載後，修改 `index.html`，將 CDN 連結改為本地檔案：

```html
<!-- 原本的 CDN 連結 -->
<!-- <script src="https://unpkg.com/ogl@0.0.89/src/index.js" defer></script> -->

<!-- 改為本地檔案（按照上述資料夾結構） -->
<script src="js/lib/ogl/core/Renderer.js"></script>
<script src="js/lib/ogl/core/Program.js"></script>
<script src="js/lib/ogl/core/Mesh.js"></script>
<script src="js/lib/ogl/extras/Triangle.js"></script>
```

## 注意事項

- OGL 的檔案之間有依賴關係，載入順序很重要
- 確保所有檔案都正確放置在對應資料夾
- 如果檔案無法載入，檢查瀏覽器開發者工具的 Console 看看錯誤訊息










