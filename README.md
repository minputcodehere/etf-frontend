# ETF Dashboard Frontend

## 📊 項目概述

台股 ETF 即時監控儀表板 - 一個現代化的 Web 應用程式，專為台股 ETF 投資者設計，提供即時股價追蹤、歷史數據分析和視覺化圖表展示。

## 🚀 核心功能

### ETF 覆蓋範圍
- **高股息 ETF**：元大高股息 (0056)、國泰永續高股息 (00878)、群益台灣精選高息 (00919)
- **市值型 ETF**：元大台灣50 (0050)、富邦台50 (006208)

### 主要特性
- **📈 即時股價追蹤**：與後端 API 整合獲取最新 Yahoo Finance 數據
- **📊 多時段平均價格**：3天、1週、1月、3月、6月、1年的平均價格計算
- **📉 互動式圖表**：使用 Recharts 提供精美的價格走勢視覺化
- **🔄 自動刷新**：定期更新數據確保資訊時效性
- **📱 響應式設計**：支援桌面和移動設備

## 🏗️ 技術架構

### 核心技術棧
- **React 19** - 最新的 React 框架
- **TypeScript** - 型別安全的 JavaScript
- **Ant Design** - 企業級 UI 設計語言
- **Recharts** - React 圖表庫
- **Axios** - HTTP 客戶端
- **Day.js** - 輕量級日期處理庫

### 項目結構
```
src/
├── components/           # 核心組件
│   ├── Dashboard.tsx    # 主儀表板
│   ├── ETFSelector.tsx  # ETF 選擇器
│   ├── PriceDisplay.tsx # 價格顯示組件
│   ├── AveragePrices.tsx # 平均價格計算
│   └── PriceChart.tsx   # 圖表組件
├── hooks/               # 自定義 Hooks
│   └── useETFData.ts    # ETF 數據管理
├── services/            # API 服務
│   └── etfApiService.ts # ETF API 調用
├── types/               # TypeScript 類型定義
│   └── index.ts         # 主要類型定義
└── utils/               # 工具函數
    ├── constants.ts     # 常量定義
    └── dataProcessing.ts # 數據處理工具
```

## 🛠️ 安裝與運行

### 環境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安裝步驟
```bash
# 克隆項目
git clone git@github.com:minputcodehere/etf-frontend.git
cd etf-frontend

# 安裝依賴
npm install

# 啟動開發服務器
npm start
```

### 可用腳本
```bash
npm start        # 啟動開發服務器 (http://localhost:3000)
npm run build    # 構建生產版本
npm test         # 運行測試
npm run eject    # 彈出 Create React App 配置
```

## 🔗 API 整合

本項目與 ETF Backend API 服務整合，通過以下端點獲取數據：
- `GET /api/stock/{symbol}?range={period}` - 獲取股票歷史數據
- 支援的時間範圍：`3d`, `1wk`, `1mo`, `3mo`, `6mo`, `1y`

### 開發環境配置
在 `src/middleware/setupProxy.js` 中配置了開發代理：
```javascript
// 代理 API 請求到後端服務 (默認 http://localhost:3001)
```

## 📦 主要依賴

| 依賴包 | 版本 | 用途 |
|--------|------|------|
| react | ^19.1.1 | 核心框架 |
| antd | ^5.26.7 | UI 組件庫 |
| recharts | ^3.1.1 | 圖表組件 |
| axios | ^1.11.0 | HTTP 請求 |
| typescript | ^4.9.5 | 類型支持 |
| dayjs | ^1.11.13 | 日期處理 |

## 🎯 使用說明

1. **選擇 ETF**：使用雙層選單選擇 ETF 類型和具體代號
2. **查看即時價格**：主界面顯示當前股價和漲跌幅
3. **分析平均價格**：查看不同時間段的平均價格趨勢
4. **互動圖表**：通過圖表深入分析價格走勢

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進項目。在提交代碼前，請確保：
- 遵循項目的代碼風格
- 添加適當的 TypeScript 類型
- 測試新功能

## 📄 授權

MIT License