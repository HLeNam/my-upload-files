# 📊 Hướng Dẫn Các Chỉ Báo Kỹ Thuật (Technical Indicators)

Tài liệu này giải thích ý nghĩa và cách sử dụng các chỉ báo kỹ thuật trong hệ thống biểu đồ giá crypto.

---

## 📌 Mục Lục

1. [Overlay Indicators (Chỉ báo trên biểu đồ)](#overlay-indicators)
   - [MA - Moving Average](#1-ma---moving-average-đường-trung-bình-động)
   - [EMA - Exponential Moving Average](#2-ema---exponential-moving-average-đường-trung-bình-động-hàm-mũ)
   - [Bollinger Bands](#3-bollinger-bands-dải-bollinger)
2. [Oscillators (Chỉ báo dao động)](#oscillators)
   - [RSI - Relative Strength Index](#4-rsi---relative-strength-index-chỉ-số-sức-mạnh-tương-đối)
   - [MACD](#5-macd---moving-average-convergence-divergence)
   - [Stochastic](#6-stochastic-oscillator-dao-động-ngẫu-nhiên)
   - [ATR - Average True Range](#7-atr---average-true-range-biên-độ-thực-trung-bình)

---

## Overlay Indicators

Các chỉ báo này được hiển thị **trực tiếp trên biểu đồ giá**, giúp bạn nhìn thấy mối quan hệ giữa giá và chỉ báo.

### 1. MA - Moving Average (Đường Trung Bình Động)

#### 📖 Định nghĩa
**MA (Simple Moving Average - SMA)** là trung bình cộng của giá đóng cửa trong một khoảng thời gian nhất định.

#### 📐 Công thức
```
MA = (Giá₁ + Giá₂ + ... + Giáₙ) / n
```
Trong đó `n` là số kỳ (period), mặc định là **20**.

#### 🎯 Cách sử dụng

| Tín hiệu | Ý nghĩa |
|----------|---------|
| Giá **cắt lên** MA | Tín hiệu **MUA** (Bullish) |
| Giá **cắt xuống** MA | Tín hiệu **BÁN** (Bearish) |
| Giá **trên** MA | Xu hướng **tăng** |
| Giá **dưới** MA | Xu hướng **giảm** |

#### 💡 Mẹo
- MA20 phổ biến cho xu hướng ngắn hạn
- MA50 cho xu hướng trung hạn
- MA200 cho xu hướng dài hạn

---

### 2. EMA - Exponential Moving Average (Đường Trung Bình Động Hàm Mũ)

#### 📖 Định nghĩa
**EMA** tương tự MA nhưng **ưu tiên giá gần đây hơn**, phản ứng nhanh hơn với biến động giá.

#### 📐 Công thức
```
EMA = Giá_hôm_nay × k + EMA_hôm_qua × (1 - k)
k = 2 / (n + 1)
```

#### 🎯 Cách sử dụng

| Tín hiệu | Ý nghĩa |
|----------|---------|
| EMA ngắn **cắt lên** EMA dài | **Golden Cross** - Tín hiệu MUA mạnh |
| EMA ngắn **cắt xuống** EMA dài | **Death Cross** - Tín hiệu BÁN mạnh |

#### 💡 So sánh MA vs EMA
| Đặc điểm | MA | EMA |
|----------|-----|-----|
| Phản ứng | Chậm | Nhanh |
| Độ trễ | Cao | Thấp |
| Nhiễu | Ít | Nhiều hơn |

---

### 3. Bollinger Bands (Dải Bollinger)

#### 📖 Định nghĩa
**Bollinger Bands** gồm 3 đường:
- **Dải giữa**: MA20 (đường trung bình)
- **Dải trên**: MA20 + 2 × Độ lệch chuẩn
- **Dải dưới**: MA20 - 2 × Độ lệch chuẩn

#### 🎯 Cách sử dụng

| Tín hiệu | Ý nghĩa |
|----------|---------|
| Giá chạm **dải trên** | Có thể **quá mua** (Overbought) |
| Giá chạm **dải dưới** | Có thể **quá bán** (Oversold) |
| Dải **thu hẹp** | Sắp có biến động lớn (Squeeze) |
| Dải **mở rộng** | Đang có xu hướng mạnh |

#### 💡 Chiến lược phổ biến
- **Bounce Trading**: Mua khi giá chạm dải dưới, bán khi chạm dải trên
- **Breakout Trading**: Theo dõi khi giá vượt ra ngoài dải

---

## Oscillators

Các chỉ báo này được hiển thị **trong panel riêng bên dưới biểu đồ**, dao động trong một phạm vi cố định.

### 4. RSI - Relative Strength Index (Chỉ Số Sức Mạnh Tương Đối)

#### 📖 Định nghĩa
**RSI** đo tốc độ và mức độ biến động giá, dao động từ **0 đến 100**.

#### 📐 Công thức
```
RSI = 100 - (100 / (1 + RS))
RS = Trung bình tăng / Trung bình giảm
```
Kỳ mặc định: **14**

#### 🎯 Cách sử dụng

| Giá trị RSI | Ý nghĩa |
|-------------|---------|
| RSI > **70** | **Quá mua** - Có thể đảo chiều giảm |
| RSI < **30** | **Quá bán** - Có thể đảo chiều tăng |
| RSI = **50** | Vùng trung lập |

#### 💡 Tín hiệu nâng cao
- **Phân kỳ dương (Bullish Divergence)**: Giá tạo đáy thấp hơn, RSI tạo đáy cao hơn → Tín hiệu tăng
- **Phân kỳ âm (Bearish Divergence)**: Giá tạo đỉnh cao hơn, RSI tạo đỉnh thấp hơn → Tín hiệu giảm

---

### 5. MACD - Moving Average Convergence Divergence

#### 📖 Định nghĩa
**MACD** đo momentum bằng cách so sánh hai đường EMA với nhau.

#### 📐 Thành phần
| Thành phần | Công thức | Màu mặc định |
|------------|-----------|--------------|
| **MACD Line** | EMA(12) - EMA(26) | Xanh dương |
| **Signal Line** | EMA(9) của MACD Line | Cam |
| **Histogram** | MACD Line - Signal Line | Xanh/Đỏ |

#### 🎯 Cách sử dụng

| Tín hiệu | Ý nghĩa |
|----------|---------|
| MACD **cắt lên** Signal | Tín hiệu **MUA** |
| MACD **cắt xuống** Signal | Tín hiệu **BÁN** |
| Histogram **dương** (xanh) | Momentum **tăng** |
| Histogram **âm** (đỏ) | Momentum **giảm** |
| Histogram **thu nhỏ** | Momentum **yếu dần** |

#### 💡 Mẹo
- MACD hoạt động tốt nhất trong thị trường có xu hướng rõ ràng
- Kết hợp với RSI để xác nhận tín hiệu

---

### 6. Stochastic Oscillator (Dao Động Ngẫu Nhiên)

#### 📖 Định nghĩa
**Stochastic** so sánh giá đóng cửa với phạm vi giá trong một khoảng thời gian.

#### 📐 Thành phần
| Thành phần | Ý nghĩa | Màu mặc định |
|------------|---------|--------------|
| **%K** | Đường nhanh | Xanh dương |
| **%D** | Đường chậm (MA của %K) | Cam |

#### 📐 Công thức
```
%K = (Giá đóng cửa - Giá thấp nhất) / (Giá cao nhất - Giá thấp nhất) × 100
%D = SMA(3) của %K
```

#### 🎯 Cách sử dụng

| Giá trị | Ý nghĩa |
|---------|---------|
| Stochastic > **80** | **Quá mua** |
| Stochastic < **20** | **Quá bán** |
| %K **cắt lên** %D (dưới 20) | Tín hiệu **MUA** |
| %K **cắt xuống** %D (trên 80) | Tín hiệu **BÁN** |

#### 💡 So sánh với RSI
| Đặc điểm | RSI | Stochastic |
|----------|-----|------------|
| Nhạy cảm | Thấp hơn | Cao hơn |
| Tín hiệu | Ít hơn | Nhiều hơn |
| Phù hợp | Xu hướng mạnh | Thị trường đi ngang |

---

### 7. ATR - Average True Range (Biên Độ Thực Trung Bình)

#### 📖 Định nghĩa
**ATR** đo **độ biến động** (volatility) của giá, KHÔNG cho biết hướng đi.

#### 📐 Công thức
```
True Range = MAX(
  Giá cao - Giá thấp,
  |Giá cao - Giá đóng cửa hôm qua|,
  |Giá thấp - Giá đóng cửa hôm qua|
)
ATR = SMA(14) của True Range
```

#### 🎯 Cách sử dụng

| ATR | Ý nghĩa |
|-----|---------|
| ATR **cao** | Biến động **mạnh**, rủi ro cao |
| ATR **thấp** | Biến động **yếu**, thị trường ổn định |
| ATR **tăng** | Biến động đang **gia tăng** |
| ATR **giảm** | Biến động đang **giảm dần** |

#### 💡 Ứng dụng thực tế
1. **Đặt Stop Loss**: Stop Loss = Giá vào - (ATR × 2)
2. **Xác định kích thước vị thế**: ATR cao → giảm kích thước
3. **Phát hiện breakout**: ATR tăng đột ngột có thể báo hiệu breakout

---

## 🔧 Cài Đặt Mặc Định

| Indicator | Tham số | Giá trị mặc định |
|-----------|---------|------------------|
| MA | Period | 20 |
| EMA | Period | 12 |
| Bollinger | Period, StdDev | 20, 2 |
| RSI | Period | 14 |
| MACD | Fast, Slow, Signal | 12, 26, 9 |
| Stochastic | K Period, D Period | 14, 3 |
| ATR | Period | 14 |

---

## 📈 Kết Hợp Chỉ Báo

### Combo phổ biến:

1. **Trend Following**
   - EMA + MACD
   - Xác nhận xu hướng và điểm vào

2. **Mean Reversion**
   - Bollinger Bands + RSI
   - Tìm điểm đảo chiều

3. **Breakout**
   - ATR + Bollinger Bands
   - Phát hiện và xác nhận breakout

### ⚠️ Lưu ý quan trọng

> **Không có chỉ báo nào đúng 100%!**
> 
> - Luôn kết hợp nhiều chỉ báo
> - Sử dụng stop loss
> - Xem xét bối cảnh thị trường
> - Practice trên demo trước khi trade thật

---

## 📚 Thuật Ngữ

| Thuật ngữ | Tiếng Anh | Ý nghĩa |
|-----------|-----------|---------|
| Quá mua | Overbought | Giá tăng quá nhiều, có thể giảm |
| Quá bán | Oversold | Giá giảm quá nhiều, có thể tăng |
| Phân kỳ | Divergence | Giá và chỉ báo đi ngược nhau |
| Momentum | Momentum | Động lượng, sức mạnh của xu hướng |
| Biến động | Volatility | Mức độ dao động của giá |
| Đường cắt | Crossover | Hai đường giao nhau |

---

*Tài liệu được tạo cho hệ thống Crypto Market Chart*
