import { TripData } from './types';

export const japan2026: TripData = {
  id: "tokyo-2026",
  title: "🇯🇵 2026 日本東京與近郊 4人行",
  dates: "2026/01/10 (六) - 2026/01/18 (日)",
  coverImage: "https://picsum.photos/800/400", 
  summary: [
    { label: "3人組", text: "虎航/華航 (羽田進/成田T2出)" },
    { label: "Yui", text: "長榮 (成田T1進出)" }
  ],
  notices: [
    {
      type: "warning",
      content: "租車嚴重提醒：4位成人 + 4件大行李，普通轎車絕對放不下！租車時請務必指定 Wish / Sienta / Noah / Voxy / Serena 等 7-8 人座箱型車 (Minivan)。"
    }
  ],
  preparation: [
    {
      id: "docs",
      title: "證件文件",
      icon: "passport",
      items: [
        { id: "p1", name: "VJW (Visit Japan Web)", note: "4人皆需填寫並截圖QR Code (入境+海關)" },
        { id: "p2", name: "護照", note: "有效期需6個月以上" },
        { id: "p3", name: "機票 (電子行程單)", note: "存手機 (IT216/CI101/BR184/BR197)" },
        { id: "p4", name: "台灣駕照正本", note: "租車必備 (正本一定要帶)" },
        { id: "p5", name: "駕照日文譯本", note: "監理所申請，期限內" },
        { id: "p6", name: "日幣現金", note: "老店/寺廟/停車費使用" },
        { id: "p7", name: "住宿證明", note: "地址印出或存手機 (填入境卡用)" },
        { id: "p8", name: "Suica (西瓜卡)", note: "每人一張 (實體卡或手機綁定)" }
      ]
    },
    {
      id: "wear",
      title: "衣物鞋 (1月極冷)",
      icon: "shirt",
      items: [
        { id: "c1", name: "內褲", note: "足量或確認飯店洗衣" },
        { id: "c2", name: "襪子", note: "建議多帶厚襪" },
        { id: "c3", name: "衣服 (洋蔥式)", note: "發熱衣 + 一般長袖" },
        { id: "c4", name: "褲子", note: "舒適好走為主" },
        { id: "c5", name: "外套 (防風保暖)", note: "河口湖/箱根氣溫近0度" },
        { id: "c6", name: "好走的鞋", note: "每日步數約 2 萬步" },
        { id: "c7", name: "公會布條", note: "團體拍照紀念用 (別忘了!)" }
      ]
    },
    {
      id: "tech",
      title: "電子設備",
      icon: "zap",
      items: [
        { id: "t1", name: "手機", note: "確認國際漫遊/網卡設定" },
        { id: "t2", name: "充電器 / 線", note: "日本電壓100V (台灣插頭通用)" },
        { id: "t3", name: "行動電源", note: "務必放隨身行李，不可託運" },
        { id: "t4", name: "自拍棒 / 腳架", note: "拍逆富士/合照用" },
        { id: "t5", name: "手電筒", note: "郊區(箱根)晚上較暗" },
        { id: "t6", name: "行李秤", note: "避免回程超重 (LCC嚴格)" },
        { id: "t7", name: "SIM卡 / 網卡", note: "確認 4 人網路皆開通" }
      ]
    },
    {
      id: "life",
      title: "生活用品",
      icon: "medkit",
      items: [
        { id: "l1", name: "個人藥品", note: "感冒、腸胃、止痛藥、暈車藥" },
        { id: "l2", name: "雨傘 / 摺疊傘", note: "1月可能有雨雪" },
        { id: "l3", name: "輕便雨衣", note: "備用" },
        { id: "l4", name: "購物袋 (環保袋)", note: "日本塑膠袋皆收費" },
        { id: "l5", name: "保溫杯", note: "隨時喝熱水暖身" },
        { id: "l6", name: "衛生紙 / 濕紙巾", note: "隨身備用" },
        { id: "l7", name: "口罩", note: "人多處或搭機建議配戴" },
        { id: "l8", name: "刮鬍刀", note: "注意電池與託運規定" },
        { id: "l9", name: "洗面乳 / 保養品", note: ">100ml 液體需託運" }
      ]
    }
  ],
  itinerary: [
    {
      dayNum: 1,
      date: "1/10 (六)",
      title: "分批抵達 & 淺草夜遊",
      hotel: "Super Hotel 淺草 (4人同住)",
      weather: { condition: 'Sunny', tempHigh: 9, tempLow: 2, precipChance: 10 },
      events: [
        {
          id: "d1-e1",
          time: "04:00",
          title: "抵達羽田機場 (HND)",
          category: "flight",
          tags: [{ label: "3人組", color: "blue" }],
          transport: { mode: "flight", code: "IT216", arr: "T3" },
          description: [
            "辦理入境、領行李 (預計 1 小時)。"
          ]
        },
        {
          id: "d1-e2",
          time: "05:26",
          title: "前往淺草",
          category: "transport",
          transport: { mode: "train", code: "京急電鐵", dep: "羽田T3", arr: "淺草站" },
          description: [
            "搭乘首班車 (往成田/印旛日本醫大)。",
            "無需轉乘：該班次直通都營淺草線。",
            "06:05 抵達：淺草站 (走 A1 電梯出口)。"
          ]
        },
        {
          id: "d1-e3",
          time: "06:30",
          title: "淺草早鳥行程",
          category: "spot",
          tags: [{ label: "3人組", color: "blue" }],
          place: { name: "淺草寺雷門", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sens%C5%8D-ji+Temple" },
          description: [
            "前往飯店寄放行李。",
            "清晨無人空景拍照。",
            "09:00 早餐：Ginza Brazil (推薦：炸雞三明治)。",
            "11:00 觀光：皇居二重橋、銀座散步。"
          ]
        },
        {
          id: "d1-e4",
          time: "12:00",
          title: "抵達成田機場 (NRT)",
          category: "flight",
          tags: [{ label: "Yui", color: "green" }],
          transport: { mode: "flight", code: "BR184", arr: "T1" },
          description: [
            "降落 第一航廈 (Terminal 1)，辦理入境。"
          ]
        },
        {
          id: "d1-e5",
          time: "13:05",
          title: "前往淺草 (Yui)",
          category: "transport",
          transport: { mode: "train", code: "京成電鐵 Access 特急", dep: "成田T1", arr: "淺草站" },
          description: [
            "往羽田空港方向。",
            "無需轉乘：約 60 分鐘直達淺草站。",
            "14:15 抵達：淺草站。"
          ]
        },
        {
          id: "d1-e6",
          time: "15:00",
          title: "飯店 Check-in & 補眠",
          category: "stay",
          tags: [{ label: "全員會合", color: "yellow" }],
          place: { name: "Super Hotel 淺草", address: "淺草寺旁", mapUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Asakusa" },
          description: [
            "重點：全員進房補眠休息 (恢復紅眼航班體力，為晚上行程充電)。"
          ]
        },
        {
          id: "d1-e7",
          time: "17:30",
          title: "淺草文化觀光中心 & 夜遊",
          category: "spot",
          place: { name: "淺草文化觀光中心", address: "8F 免費展望台", mapUrl: "https://www.google.com/maps/search/?api=1&query=Asakusa+Culture+Tourist+Information+Center" },
          description: [
            "步行至雷門對面。",
            "18:30 夜遊點燈後的淺草寺 (本堂/五重塔)，避開白天人潮。"
          ]
        },
        {
          id: "d1-e8",
          time: "19:00",
          title: "鳥貴族 淺草店",
          category: "food",
          place: { name: "鳥貴族 淺草店", mapUrl: "https://www.google.com/maps/search/?api=1&query=Torikizoku+Asakusa" },
          cost: "¥3,500/人",
          description: [
            "[已訂位4人] 享受吃到飽居酒屋。",
            "注意：請勿遲到。"
          ]
        }
      ]
    },
    {
      dayNum: 2,
      date: "1/11 (日)",
      title: "上野、龜有與敘敘苑",
      hotel: "Super Hotel 淺草",
      weather: { condition: 'Cloudy', tempHigh: 10, tempLow: 3, precipChance: 20 },
      events: [
        {
          id: "d2-e1",
          time: "09:00",
          title: "上野恩賜公園 & 二木菓子",
          category: "spot",
          place: { name: "上野公園 / 阿美橫丁", mapUrl: "https://www.google.com/maps/search/?api=1&query=Ueno+Park" },
          description: [
            "上野動物園 (看熊貓)、不忍池。",
            "二木菓子：採買零食伴手禮 (可退稅)。"
          ]
        },
        {
          id: "d2-e2",
          time: "12:30",
          title: "上野美食推薦",
          category: "food",
          place: { name: "とんかつ山家 / 伊豆榮", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tonkatsu+Yamabe+Ueno" },
          description: [
            "とんかつ山家 (Yamabe)：高 CP 值炸豬排。",
            "伊豆榮 (Izuei)：老字號鰻魚飯。"
          ]
        },
        {
          id: "d2-e3",
          time: "14:30",
          title: "龜有巡禮 (兩津勘吉)",
          category: "spot",
          transport: { mode: "train", code: "JR 常磐線", arr: "龜有站" },
          place: { name: "龜有公園前派出所", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kameari+Park+Police+Box" },
          description: [
            "拿地圖尋找烏龍派出所銅像。"
          ]
        },
        {
          id: "d2-e4",
          time: "17:00",
          title: "東京晴空塔 (Skytree)",
          category: "spot",
          place: { name: "Tokyo Skytree", address: "墨田區", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tokyo+Skytree" },
          description: [
            "逛 Solamachi 商場。"
          ]
        },
        {
          id: "d2-e5",
          time: "20:30",
          title: "敘敘苑 晴空塔店",
          category: "food",
          place: { name: "敘敘苑 (30F)", mapUrl: "https://www.google.com/maps/search/?api=1&query=Jojoen+Skytree" },
          cost: "預約確認",
          description: [
            "[已訂位4人] 享受 30 樓高空景觀燒肉。",
            "注意：請勿遲到。"
          ]
        }
      ]
    },
    {
      dayNum: 3,
      date: "1/12 (一)",
      title: "箱根溫泉自駕",
      hotel: "箱根強羅溫泉 季之湯 雪月花",
      weather: { condition: 'Snow', tempHigh: 4, tempLow: -2, precipChance: 60 },
      events: [
        {
          id: "d3-e1",
          time: "08:30",
          title: "取車出發",
          category: "transport",
          tags: [{ label: "租車", color: "red" }],
          transport: { mode: "car", code: "TOYOTA Rent a Car", dep: "吾妻橋店" },
          place: { name: "トヨタレンタカー 吾妻橋店", address: "墨田區吾妻橋3-8-2", mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyota+Rent+a+Car+Azumabashi" },
          description: [
            "車型確認：WISH / SIENTA / NOAH (7人座)。",
            "備註：成人之日連假，請儘速出發往箱根。"
          ]
        },
        {
          id: "d3-e2",
          time: "11:00",
          title: "箱根景點巡禮",
          category: "spot",
          place: { name: "箱根蘆之湖", mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Ashi+Hakone" },
          description: [
            "箱根神社：拍攝水上平和鳥居 (需排隊)。",
            "元箱根港：搭乘海賊船遊蘆之湖。",
            "大涌谷：觀賞地熱、吃長壽黑蛋。"
          ]
        },
        {
          id: "d3-e3",
          time: "午餐",
          title: "田むら銀かつ亭",
          category: "food",
          place: { name: "田むら銀かつ亭", address: "強羅", mapUrl: "https://www.google.com/maps/search/?api=1&query=Tamura+Ginkatsutei" },
          description: ["強羅知名的「炸豆腐排」老店。"]
        },
        {
          id: "d3-e4",
          time: "16:30",
          title: "入住雪月花",
          category: "stay",
          place: { name: "季之湯 雪月花", address: "強羅站旁", mapUrl: "https://www.google.com/maps/search/?api=1&query=Setsugetsuka+Hakone" },
          description: ["Check-in，享受全客室露天風呂與一泊二食晚餐。"]
        }
      ]
    },
    {
      dayNum: 4,
      date: "1/13 (二)",
      title: "御殿場 Outlet & 河口湖",
      hotel: "秀峰閣湖月 (富士山第一排)",
      weather: { condition: 'Sunny', tempHigh: 5, tempLow: -3, precipChance: 0 },
      events: [
        {
          id: "d4-e1",
          time: "09:30",
          title: "御殿場 Outlet",
          category: "shopping",
          place: { name: "Gotemba Premium Outlets", mapUrl: "https://www.google.com/maps/search/?api=1&query=Gotemba+Premium+Outlets" },
          description: [
            "開門即抵達，趁人少時購物。",
            "推薦拍攝點：夢之大橋 (富士山背景)。"
          ]
        },
        {
          id: "d4-e2",
          time: "13:30",
          title: "河口湖周邊探索",
          category: "spot",
          place: { name: "河口湖 / 大石公園", mapUrl: "https://www.google.com/maps/search/?api=1&query=Oishi+Park" },
          description: [
            "富岳風穴：探索地底冰穴 (注意防滑)。",
            "大石公園：拍攝富士山全景與蘆葦/花海。",
            "天上山公園：搭乘纜車俯瞰河口湖。"
          ]
        },
        {
          id: "d4-e3",
          time: "16:30",
          title: "飯店 Check-in",
          category: "stay",
          place: { name: "秀峰閣湖月", mapUrl: "https://www.google.com/maps/search/?api=1&query=Shuhoukaku+Kogetsu" },
          description: ["務必在夕陽前抵達，房內即可觀賞富士山絕景與逆富士。"]
        }
      ]
    },
    {
      dayNum: 5,
      date: "1/14 (三)",
      title: "富士攝影 & 還車",
      hotel: "Super Hotel Lohas 池袋北口",
      weather: { condition: 'Sunny', tempHigh: 6, tempLow: -2, precipChance: 0 },
      events: [
        {
          id: "d5-e1",
          time: "07:00",
          title: "新倉富士淺間神社",
          category: "spot",
          place: { name: "新倉山淺間公園", mapUrl: "https://www.google.com/maps/search/?api=1&query=Arakurayama+Sengen+Park" },
          description: ["爬 398 階梯，拍攝「五重塔+富士山」經典明信片照。"]
        },
        {
          id: "d5-e2",
          time: "上午",
          title: "富士吉田市區",
          category: "spot",
          place: { name: "本町通 / 金鳥居", mapUrl: "https://www.google.com/maps/search/?api=1&query=Fuji+Honcho+Street" },
          description: [
            "金鳥居：拍攝鳥居包框富士山。",
            "天空鳥居：河口淺間神社遙拜所。"
          ]
        },
        {
          id: "d5-e3",
          time: "14:00",
          title: "返回東京",
          category: "transport",
          transport: { mode: "car" },
          description: ["提早出發避開傍晚進城的塞車潮。"]
        },
        {
          id: "d5-e4",
          time: "20:00",
          title: "還車",
          category: "transport",
          tags: [{ label: "還車", color: "red" }],
          transport: { mode: "car", code: "TOYOTA Rent a Car", dep: "池袋西口店" },
          place: { name: "池袋西口店", address: "豊島區西池袋1-29-7", mapUrl: "https://www.google.com/maps/search/?api=1&query=Toyota+Rent+a+Car+Ikebukuro+West" },
          description: [
            "還車後步行 8 分鐘至 Super Hotel Lohas Check-in。"
          ]
        }
      ]
    },
    {
      dayNum: 6,
      date: "1/15 (四)",
      title: "鎌倉江之島一日遊",
      hotel: "Super Hotel Lohas 池袋北口",
      weather: { condition: 'Windy', tempHigh: 11, tempLow: 4, precipChance: 10 },
      events: [
        {
          id: "d6-e1",
          time: "08:31",
          title: "前往鎌倉",
          category: "transport",
          tags: [{ label: "去程", color: "red" }],
          transport: { mode: "train", code: "JR 湘南新宿線", dep: "池袋站", arr: "藤澤站" },
          description: [
            "往逗子方向。",
            "09:24 抵達：藤澤站。轉乘江之電 (買一日券)。"
          ]
        },
        {
          id: "d6-e2",
          time: "全日",
          title: "鎌倉江之島巡禮",
          category: "spot",
          place: { name: "江之島 / 鎌倉高校前 / 長谷寺", mapUrl: "https://www.google.com/maps/search/?api=1&query=Enoshima+Kamakura" },
          description: [
            "江之島：江島神社、海蠟燭展望台。",
            "鎌倉高校前：灌籃高手平交道。",
            "長谷：高德院鎌倉大佛。",
            "小町通：商店街逛街、鶴岡八幡宮。"
          ]
        },
        {
          id: "d6-e3",
          time: "美食",
          title: "鎌倉美食",
          category: "food",
          description: ["Shirasuya (魩仔魚丼)、Giraffa (咖哩麵包)、豐島屋 (鴿子餅乾)、鎌倉紅谷 (小松鼠焦糖核桃糕)。"]
        },
        {
          id: "d6-e4",
          time: "回程",
          title: "JR 綠色車廂 (Green Car)",
          category: "transport",
          transport: { mode: "train", code: "JR Green Car" },
          description: ["回程若疲憊，建議在月台販賣機加購 Green Car 券，有舒適座位直達池袋。"]
        }
      ]
    },
    {
      dayNum: 7,
      date: "1/16 (五)",
      title: "Yui返台 & 澀谷購物",
      hotel: "Super Hotel Lohas 池袋北口 (3人)",
      weather: { condition: 'Cloudy', tempHigh: 9, tempLow: 3, precipChance: 30 },
      events: [
        {
          id: "d7-e1",
          time: "10:45",
          title: "前往成田機場 T1",
          category: "flight",
          tags: [{ label: "Yui", color: "green" }],
          transport: { mode: "train", code: "Skyliner 23", dep: "日暮里", arr: "成田 T1" },
          description: [
            "10:45 與大家道別，搭 JR 山手線至日暮里。",
            "11:05 發車：Skyliner 23號。",
            "14:00 起飛：BR197 返回台北。"
          ]
        },
        {
          id: "d7-e2",
          time: "12:00",
          title: "澀谷潮流購物",
          category: "shopping",
          tags: [{ label: "3人組", color: "blue" }],
          place: { name: "Shibuya Parco / 表參道", mapUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya+Parco" },
          description: [
            "午餐：牛かつもと村 (炸牛排)。",
            "下午：逛澀谷、青山、表參道。"
          ]
        },
        {
          id: "d7-e3",
          time: "16:00",
          title: "澀谷 SKY (SHIBUYA SKY)",
          category: "spot",
          place: { name: "SHIBUYA SKY Scramble Square", mapUrl: "https://www.google.com/maps/search/?api=1&query=Shibuya+Sky" },
          cost: "需預約",
          description: ["欣賞東京最美夕陽與 360 度夜景。"]
        },
        {
          id: "d7-e4",
          time: "20:00",
          title: "Meat 矢澤 (五反田本店)",
          category: "food",
          place: { name: "Meat Yazawa", mapUrl: "https://www.google.com/maps/search/?api=1&query=Meat+Yazawa" },
          transport: { mode: "train", dep: "澀谷", arr: "五反田" },
          description: ["享用頂級和牛漢堡排。"]
        }
      ]
    },
    {
      dayNum: 8,
      date: "1/17 (六)",
      title: "池袋主場深度遊 (3人)",
      hotel: "Super Hotel Lohas 池袋北口",
      weather: { condition: 'Sunny', tempHigh: 10, tempLow: 2, precipChance: 0 },
      events: [
        {
          id: "d8-e1",
          time: "10:00",
          title: "飯糰名店巡禮",
          category: "food",
          place: { name: "ぼんご (Bongo) / 山太郎", address: "大塚站", mapUrl: "https://www.google.com/maps/search/?api=1&query=Onigiri+Bongo" },
          description: [
            "ぼんご (Bongo)：排隊名店 (建議 09:30 前去排)。",
            "山太郎：美味備案，風格相似。"
          ]
        },
        {
          id: "d8-e2",
          time: "11:30",
          title: "巢鴨 & 荒川線",
          category: "spot",
          place: { name: "巢鴨地藏通", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sugamo+Jizo+Dori" },
          description: ["巢鴨地藏通商店街 (洗觀音)、拍攝都電荒川線路面電車。"]
        },
        {
          id: "d8-e3",
          time: "14:00",
          title: "池袋太陽城 (Sunshine City)",
          category: "shopping",
          place: { name: "Sunshine City", mapUrl: "https://www.google.com/maps/search/?api=1&query=Sunshine+City+Ikebukuro" },
          description: [
            "Pokemon Center Mega Tokyo (2F)。",
            "陽光水族館 (頂樓看天空企鵝)。",
            "Animate 池袋本店 (動漫迷必去)。"
          ]
        },
        {
          id: "d8-e4",
          time: "19:00",
          title: "極致放鬆",
          category: "stay",
          place: { name: "Super Hotel Lohas", mapUrl: "https://www.google.com/maps/search/?api=1&query=Super+Hotel+Lohas+Ikebukuro" },
          description: ["享用飯店 Welcome Bar 免費暢飲，並泡炭酸泉消除 8 天疲勞。"]
        },
        {
          id: "d8-e5",
          time: "20:30",
          title: "慶功宴",
          category: "food",
          place: { name: "池袋西口居酒屋", mapUrl: "https://www.google.com/maps/search/?api=1&query=Ikebukuro+Izakaya" },
          description: ["如：鳥貴族、磯丸水產。"]
        }
      ]
    },
    {
      dayNum: 9,
      date: "1/18 (日)",
      title: "3人組返台",
      weather: { condition: 'Sunny', tempHigh: 10, tempLow: 3, precipChance: 0 },
      events: [
        {
          id: "d9-e1",
          time: "10:45",
          title: "退房出發",
          category: "general",
          description: ["步行至 JR 池袋站。"]
        },
        {
          id: "d9-e2",
          time: "11:00",
          title: "前往機場",
          category: "transport",
          tags: [{ label: "JR", color: "red" }],
          transport: { mode: "train", code: "JR 山手線", dep: "池袋", arr: "日暮里" },
          description: ["往上野/日暮里方向。"]
        },
        {
          id: "d9-e3",
          time: "11:25",
          title: "Skyliner 返台",
          category: "transport",
          tags: [{ label: "Skyliner", color: "red" }],
          transport: { mode: "train", code: "Skyliner 25", dep: "日暮里", arr: "成田 T2" },
          description: [
            "12:04 抵達：成田機場 (NRT) 第 2 航廈 (Terminal 2)。"
          ]
        },
        {
          id: "d9-e4",
          time: "12:04",
          title: "機場報到 & 免稅店",
          category: "flight",
          place: { name: "成田機場 T2", mapUrl: "https://www.google.com/maps/search/?api=1&query=Narita+Airport+Terminal+2" },
          description: ["華航 CI101 報到，最後免稅店採買。"]
        },
        {
          id: "d9-e5",
          time: "14:35",
          title: "起飛返台",
          category: "flight",
          transport: { mode: "flight", code: "CI101", dep: "NRT", arr: "TPE" },
          description: ["搭機返回台北。"]
        }
      ]
    }
  ]
};

export const trips: TripData[] = [japan2026];
