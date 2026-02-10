# 📚 TÀI LIỆU VẤN ĐÁP - MARKET SERVICE

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Công nghệ sử dụng](#2-công-nghệ-sử-dụng)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Khởi tạo ứng dụng (main.ts)](#4-khởi-tạo-ứng-dụng-maints)
5. [Module gốc (AppModule)](#5-module-gốc-appmodule)
6. [Cấu hình (Config)](#6-cấu-hình-config)
7. [Module Binance](#7-module-binance)
8. [Module Market](#8-module-market)
9. [Module Cache (Redis)](#9-module-cache-redis)
10. [Module Indicators (Chỉ báo kỹ thuật)](#10-module-indicators)
11. [Module Health Check](#11-module-health-check)
12. [Common (Pipes, Filters, Interceptors)](#12-common)
13. [WebSocket Gateway](#13-websocket-gateway)
14. [Redis IO Adapter](#14-redis-io-adapter)
15. [Docker & Deployment](#15-docker--deployment)
16. [Luồng dữ liệu chính](#16-luồng-dữ-liệu-chính)
17. [Câu hỏi vấn đáp thường gặp](#17-câu-hỏi-vấn-đáp-thường-gặp)

---

## 1. Tổng quan dự án

### Dự án là gì?
**Market Service** là một microservice thuộc hệ thống **Crypto Market**, chịu trách nhiệm:
- Lấy dữ liệu giá cryptocurrency **real-time** từ Binance API
- Phát dữ liệu real-time qua **WebSocket** (Socket.IO) tới frontend
- Cung cấp **REST API** để truy vấn dữ liệu lịch sử (candles/nến)
- Tính toán **chỉ báo kỹ thuật** (Technical Indicators): SMA, EMA, RSI, MACD, Bollinger Bands, Stochastic, ATR
- **Cache** dữ liệu bằng Redis để tối ưu hiệu năng
- Lưu trữ dữ liệu lịch sử vào **PostgreSQL** cho phân tích dài hạn

### Kiến trúc tổng thể
```
Frontend (Next.js) ←→ Market Service (NestJS) ←→ Binance API
                            ↕                         ↕
                     PostgreSQL + Redis         WebSocket Streams
```

---

## 2. Công nghệ sử dụng

| Công nghệ | Mục đích | Giải thích |
|---|---|---|
| **NestJS 11** | Framework backend | Framework Node.js dựa trên TypeScript, kiến trúc module hóa, hỗ trợ DI (Dependency Injection) |
| **TypeORM** | ORM cho database | Mapping object → table, hỗ trợ migration, query builder |
| **PostgreSQL 16** | Database chính | Lưu trữ dữ liệu candle (nến) lịch sử |
| **Redis 7** | Cache + Message Queue | Cache dữ liệu nóng, hỗ trợ Pub/Sub cho WebSocket scaling |
| **Bull** | Job Queue | Xử lý bất đồng bộ (lưu candle vào DB qua queue) |
| **Socket.IO** | WebSocket | Giao tiếp real-time giữa server và client |
| **Swagger** | API Documentation | Tự động tạo tài liệu API |
| **Docker** | Containerization | Đóng gói ứng dụng để deploy |
| **Terminus** | Health Check | Kiểm tra sức khỏe hệ thống |
| **Throttler** | Rate Limiting | Giới hạn số request/phút |

---

## 3. Cấu trúc thư mục

```
src/
├── main.ts                          # Entry point - khởi tạo app
├── app.module.ts                    # Module gốc, import tất cả module con
├── app.controller.ts                # Controller mặc định
├── app.service.ts                   # Service mặc định
│
├── adapters/
│   └── redis-io.adapter.ts          # Adapter kết nối Redis cho Socket.IO scaling
│
├── config/
│   ├── config.module.ts             # Module validation ENV variables bằng Joi
│   ├── database.config.ts           # Cấu hình TypeORM + PostgreSQL
│   └── redis.config.ts              # Cấu hình Redis cho Bull Queue
│
├── common/
│   ├── exceptions/
│   │   └── custom.exceptions.ts     # Custom exceptions (ValidationException, DuplicateException...)
│   ├── filters/
│   │   ├── all-exceptions.filter.ts      # Bắt MỌI lỗi không xác định
│   │   ├── http-exception.filter.ts      # Bắt lỗi HTTP (401, 403, 404...)
│   │   └── validation-exception.filter.ts # Bắt lỗi validation (400)
│   ├── interceptors/
│   │   └── response.interceptor.ts  # Chuẩn hóa response format
│   ├── interfaces/
│   │   └── api-response.interface.ts # Interface cho response chuẩn
│   └── pipes/
│       └── validation.pipe.ts       # Pipe tự động validate DTO
│
├── health/
│   └── health/
│       ├── health.controller.ts     # Endpoint kiểm tra sức khỏe hệ thống
│       └── health.module.ts         # Module health check
│
└── modules/
    ├── binance/
    │   ├── binance.module.ts             # Module Binance
    │   ├── binance.service.ts            # Gọi REST API Binance (HTTP)
    │   └── binance-websocket.service.ts  # Kết nối WebSocket Binance (real-time)
    │
    ├── cache/
    │   ├── cache.module.ts          # Module Cache
    │   └── cache.service.ts         # Service thao tác Redis
    │
    ├── market/
    │   ├── market.module.ts         # Module Market
    │   ├── market.controller.ts     # REST API endpoints
    │   ├── market.service.ts        # Business logic chính
    │   ├── market.gateway.ts        # WebSocket Gateway (Socket.IO)
    │   ├── entities/
    │   │   └── candle.entity.ts     # Entity TypeORM cho bảng candles
    │   └── processors/
    │       └── candle-storage.processor.ts  # Bull queue processor
    │
    └── indicators/
        ├── indicators.module.ts     # Module Indicators
        ├── indicators.controller.ts # REST API endpoints cho chỉ báo
        ├── indicators.service.ts    # Logic tính toán chỉ báo kỹ thuật
        ├── index.ts                 # Barrel export
        ├── dto/
        │   └── get-indicators.dto.ts # DTO validation cho request
        └── interfaces/
            └── indicator.interface.ts # TypeScript interfaces
```

---

## 4. Khởi tạo ứng dụng (main.ts)

**File: `src/main.ts`**

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Bật CORS cho frontend
  // 2. Kết nối Redis Adapter cho WebSocket
  // 3. Đăng ký Global Pipes, Interceptors, Filters
  // 4. Thiết lập Swagger
  // 5. Đặt global prefix: /api/v1
  // 6. Lắng nghe port từ ENV
}
```

### Giải thích chi tiết:

**CORS (Cross-Origin Resource Sharing):**
```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
```
- Cho phép frontend (chạy ở domain khác) gọi API
- `credentials: true` → cho phép gửi cookie/token

**Global Pipes, Interceptors, Filters (thứ tự xử lý):**
```
Request → Pipe (validate) → Controller → Interceptor (format response)
                                            ↓ (nếu lỗi)
                                         Filter (format error)
```
- **Pipe**: `CustomValidationPipe` → validate input trước khi vào controller
- **Interceptor**: `ResponseInterceptor` → bọc response thành format chuẩn `{ success, message, data, timestamp, path }`
- **Filters** (thứ tự ưu tiên quan trọng):
  1. `AllExceptionsFilter` → bắt mọi lỗi ngoại lệ (fallback cuối cùng)
  2. `HttpExceptionFilter` → bắt lỗi HTTP cụ thể
  3. `ValidationExceptionFilter` → bắt lỗi validation (BadRequestException) - **ưu tiên cao nhất**

> **LƯU Ý**: Trong NestJS, filter đăng ký SAU thì có ưu tiên CAO hơn. Vì vậy `ValidationExceptionFilter` sẽ bắt `BadRequestException` trước `HttpExceptionFilter`.

**Redis IO Adapter:**
```typescript
const redisIoAdapter = new RedisIoAdapter(app);
await redisIoAdapter.connectToRedis();
app.useWebSocketAdapter(redisIoAdapter);
```
- Cho phép scale WebSocket trên nhiều instance server (horizontal scaling)
- Sử dụng Redis Pub/Sub để đồng bộ message giữa các instance

---

## 5. Module gốc (AppModule)

**File: `src/app.module.ts`**

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),   // Biến ENV global
    TypeOrmModule.forRootAsync({ ... }),          // Kết nối PostgreSQL
    BullModule.forRootAsync({ ... }),             // Kết nối Redis cho Queue
    ScheduleModule.forRoot(),                     // Cron jobs
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]), // Rate limiting
    CacheModule,    // Redis cache
    HealthModule,   // Health check
    BinanceModule,  // Binance API
    MarketModule,   // Market logic
    IndicatorsModule, // Technical indicators
  ],
})
```

### Tại sao dùng `forRootAsync` thay vì `forRoot`?
- `forRootAsync` cho phép **inject** `ConfigService` để đọc biến ENV **tại runtime**
- `forRoot` chỉ nhận config **tĩnh** tại compile time

### ThrottlerModule là gì?
- **Rate Limiting**: giới hạn 100 request / 60 giây / client
- Bảo vệ API khỏi bị spam hoặc DDoS

### ScheduleModule là gì?
- Cho phép chạy **Cron Job** (tác vụ định kỳ)
- Ví dụ: tự động xóa candle cũ hơn 90 ngày mỗi ngày lúc 3h sáng

---

## 6. Cấu hình (Config)

### 6.1. database.config.ts

```typescript
export const databaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  // ... các config khác
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],  // Tự scan entity
  synchronize: configService.get('DATABASE_SYNC') && !isProduction, // Chỉ sync schema khi dev
  extra: {
    max: 20,    // Connection pool tối đa 20 kết nối
    min: 5,     // Tối thiểu 5 kết nối
  },
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
```

**Connection Pool** là gì?
- Thay vì tạo/đóng kết nối DB mỗi lần query → duy trì sẵn một "pool" kết nối
- `max: 20` → tối đa 20 kết nối đồng thời
- Giúp tăng hiệu năng, giảm overhead

**Tại sao `synchronize` chỉ bật khi dev?**
- `synchronize: true` → TypeORM tự động ALTER TABLE theo entity
- Ở production → có thể GÂY MẤT DỮ LIỆU, phải dùng migration thủ công

### 6.2. redis.config.ts

```typescript
export const redisConfig = (configService: ConfigService): BullModuleOptions => {
  const redisUrl = configService.get('REDIS_URL');
  if (redisUrl) return { url: redisUrl }; // Ưu tiên URL
  return {
    redis: {
      host: configService.get('REDIS_HOST') || 'localhost',
      port: configService.get('REDIS_PORT') || 6379,
      retryStrategy: (times) => Math.min(times * 50, 2000), // Exponential backoff
    },
  };
};
```

**retryStrategy** là gì?
- Khi Redis mất kết nối → tự động retry
- Delay tăng dần: 50ms, 100ms, 150ms... tối đa 2000ms
- Tránh DDoS Redis khi đang recovery

### 6.3. config.module.ts - Validation bằng Joi

```typescript
validationSchema: Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DATABASE_USERNAME: Joi.string().required(),
  // ...
})
```
- **Joi** validate tất cả biến ENV khi khởi động
- Nếu thiếu biến bắt buộc → app sẽ CỂ FAIL NGAY khi start
- Giúp phát hiện lỗi cấu hình sớm

---

## 7. Module Binance

### 7.1. BinanceService (REST API)

**File: `src/modules/binance/binance.service.ts`**

Chịu trách nhiệm gọi **Binance REST API** qua HTTP:

| Method | Chức năng | Binance Endpoint |
|---|---|---|
| `getSymbols()` | Lấy danh sách cặp giao dịch | `/exchangeInfo` |
| `getAllTickers()` | Lấy giá 24h tất cả cặp | `/ticker/24hr` |
| `get24hrTicker(symbol)` | Lấy giá 24h 1 cặp | `/ticker/24hr?symbol=` |
| `getHistoricalCandles(symbol, interval, limit)` | Lấy dữ liệu nến lịch sử | `/klines` |
| `fetchIcon(symbol)` | Lấy icon coin | Binance CDN |

**Cơ chế hoạt động:**
```typescript
const response = await firstValueFrom(
  this.httpService.get(url).pipe(
    map((res) => res.data),
    catchError((err) => {
      throw new HttpException('Failed...', HttpStatus.SERVICE_UNAVAILABLE);
    }),
  ),
);
```

- Sử dụng `@nestjs/axios` (HttpModule) để gọi HTTP
- `firstValueFrom()` → chuyển Observable (RxJS) thành Promise
- `pipe(map(), catchError())` → xử lý pipeline: map response → bắt lỗi

**Quote Assets:**
```typescript
this.quoteAssets = configService.get('QUOTE_ASSETS')?.split(',') || ['USDT'];
```
- Lọc cặp giao dịch theo quote asset (mặc định USDT)
- VD: chỉ lấy BTCUSDT, ETHUSDT... không lấy BTCBUSD

**fetchIcon - Cơ chế Cache Icon:**
1. Kiểm tra file icon đã cache trong thư mục `public/icons/`
2. Nếu có → trả về từ cache (nhanh)
3. Nếu chưa → tải từ Binance CDN → lưu vào disk → trả về

### 7.2. BinanceWebsocketService (WebSocket real-time)

**File: `src/modules/binance/binance-websocket.service.ts`** (660 dòng - file phức tạp nhất)

Chịu trách nhiệm kết nối **WebSocket** tới Binance để nhận dữ liệu real-time.

#### Các interface quan trọng:

```typescript
interface ConnectionState {
  ws: WebSocket;          // Instance WebSocket
  retryCount: number;     // Số lần retry
  reconnectTimer?: NodeJS.Timeout;  // Timer reconnect
  pingInterval?: NodeJS.Timeout;    // Timer ping
  isReconnecting: boolean; // Đang reconnect?
  lastPongTime: number;   // Thời điểm nhận pong cuối
}
```

#### Subscription Pattern:

```
subscriptions = Map<"BTCUSDT:1h", Map<clientId, callback>>
```
- **Key**: `symbol:interval` (VD: `BTCUSDT:1h`)
- **Value**: Map các client đang subscribe với callback tương ứng
- Khi có dữ liệu mới → broadcast tới TẤT CẢ client đang subscribe

#### Luồng subscribe:
```
1. Client gọi subscribe("BTCUSDT", "1h", clientId, onCandle, onTicker)
2. Thêm callback vào subscriptions Map
3. Nếu chưa có connection cho "BTCUSDT:1h" → tạo mới
4. Kết nối WebSocket Binance: wss://stream.binance.com:9443/stream?streams=btcusdt@kline_1h/btcusdt@ticker
5. Khi nhận message → parse → broadcast tới tất cả client
```

#### Exponential Backoff Reconnection:
```typescript
const delay = Math.min(
  INITIAL_RETRY_DELAY * Math.pow(2, retryCount - 1),
  MAX_RETRY_DELAY,
);
// Retry 1: 1s, Retry 2: 2s, Retry 3: 4s, Retry 4: 8s... max 60s
```
- Khi mất kết nối → không retry ngay mà đợi tăng dần
- Tránh tình trạng "thundering herd" (đổ xô reconnect cùng lúc)
- Tối đa 10 lần retry rồi bỏ cuộc

#### Ping/Pong Heartbeat:
```
Mỗi 30 giây:
  1. Gửi ping tới Binance
  2. Kiểm tra lastPongTime
  3. Nếu quá (30s + 10s) không nhận pong → connection dead → terminate → reconnect
```
- Phát hiện "zombie connection" (kết nối tồn tại nhưng không hoạt động)

#### All Tickers Stream:
```typescript
subscribeAllTickers(clientId, callback)
// Kết nối: wss://stream.binance.com:9443/ws/!ticker@arr
```
- Nhận giá mọi cặp tiền cùng lúc
- Dùng cho trang danh sách tổng quan

#### Lifecycle Hook - `onModuleDestroy`:
```typescript
onModuleDestroy() {
  // Cleanup TẤT CẢ kết nối khi app tắt
  this.connections.forEach((state, key) => this.cleanupConnection(key, state));
}
```
- Implements `OnModuleDestroy` interface
- NestJS tự gọi khi app shutdown → đảm bảo đóng hết WebSocket

---

## 8. Module Market

### 8.1. CandleEntity (Database Schema)

```typescript
@Entity('candles')
@Index(['symbol', 'interval', 'time'], { unique: true }) // Composite unique index
@Index(['symbol', 'time'])                                 // Index cho query
export class CandleEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', length: 20 }) symbol: string;  // VD: BTCUSDT
  @Column({ type: 'varchar', length: 10 }) interval: string; // VD: 1h
  @Column({ type: 'timestamp' }) time: Date;
  @Column({ type: 'decimal', precision: 20, scale: 8 }) open: number;
  @Column({ type: 'decimal', precision: 20, scale: 8 }) high: number;
  @Column({ type: 'decimal', precision: 20, scale: 8 }) low: number;
  @Column({ type: 'decimal', precision: 20, scale: 8 }) close: number;
  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true }) volume: number;
}
```

**Tại sao dùng `decimal(20,8)`?**
- Tiền mã hóa có giá rất nhỏ (VD: 0.00000001 BTC) hoặc rất lớn
- `decimal` lưu chính xác, không bị lỗi floating point như `float`

**Tại sao cần Composite Unique Index `['symbol', 'interval', 'time']`?**
- Đảm bảo không trùng: cùng 1 symbol + interval + time chỉ có 1 record
- Hỗ trợ `orIgnore()` khi INSERT (bỏ qua nếu đã tồn tại)

### 8.2. MarketService (Business Logic)

**Chiến lược Cache-aside pattern:**
```
1. Kiểm tra Redis cache → có → trả về
2. Không có → gọi BinanceService lấy từ API
3. Lưu kết quả vào Redis cache
4. Trả về cho client
```

```typescript
async getSymbols() {
  const cached = await this.cacheService.get('symbols:all');
  if (cached) return JSON.parse(cached);               // Cache hit
  const symbols = await this.binanceService.getSymbols(); // Cache miss
  await this.cacheService.set('symbols:all', JSON.stringify(symbols), 3600); // TTL 1h
  return symbols;
}
```

**TTL (Time-to-Live) cho từng loại dữ liệu:**
- Symbols: 3600s (1 giờ) - ít thay đổi
- All Tickers: 5s - thay đổi liên tục
- Single Ticker: 5s
- Candle History: 3600s (1 giờ) - trong Redis Sorted Set

**Cron Job - Dọn dẹp dữ liệu:**
```typescript
@Cron('0 3 * * *')  // Chạy lúc 3h sáng mỗi ngày
async cleanupOldCandles() {
  // Xóa candle cũ hơn 90 ngày
  await this.candleRepo.createQueryBuilder()
    .delete().from(CandleEntity)
    .where('time < :cutoffDate', { cutoffDate })
    .execute();
}
```

**storeFinalCandle - Lưu qua Bull Queue:**
```typescript
async storeFinalCandle(symbol, interval, candle) {
  await this.candleStorageQueue.add('store-candle', { symbol, interval, candle });
}
```
- **Không lưu trực tiếp** vào DB → đẩy vào queue
- Queue xử lý **bất đồng bộ** → không block WebSocket
- Có cơ chế **retry 3 lần** với exponential backoff nếu lỗi

### 8.3. MarketController (REST API Endpoints)

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/v1/market/symbols` | Danh sách cặp giao dịch |
| GET | `/api/v1/market/tickers` | Giá 24h tất cả cặp |
| GET | `/api/v1/market/ticker/:symbol` | Giá 24h 1 cặp |
| GET | `/api/v1/market/candles/:symbol` | Dữ liệu nến (từ cache/Binance API) |
| GET | `/api/v1/market/candles/:symbol/history` | Dữ liệu nến từ DB (cho AI) |
| GET | `/api/v1/market/icon/:symbol` | Icon coin |

**Rate Limiting trên Controller:**
```typescript
@UseGuards(ThrottlerGuard) // Áp dụng rate limit cho mọi endpoint
```

### 8.4. CandleStorageProcessor (Bull Queue Worker)

```typescript
@Processor('candle-storage')
export class CandleStorageProcessor {
  @Process('store-candle')
  async handleStorageCandle(job: Job<CandleStorageJob>) {
    // 1. Lưu vào Redis Sorted Set (cache)
    await this.cacheService.addSingleCandle(symbol, interval, candle);
    // 2. Lưu vào PostgreSQL (persistent)
    await this.candleRepo.createQueryBuilder().insert().orIgnore().execute();
  }
}
```

**Tại sao dùng Bull Queue thay vì lưu trực tiếp?**
1. **Non-blocking**: WebSocket message handler không bị chậm
2. **Retry**: Nếu DB lỗi → auto retry 3 lần
3. **Backpressure**: Không overload DB khi có nhiều candle đồng thời

---

## 9. Module Cache (Redis)

**File: `src/modules/cache/cache.service.ts`**

### Các phương thức chính:

| Method | Chức năng |
|---|---|
| `get(key)` | Lấy giá trị từ cache |
| `set(key, value, ttl)` | Ghi cache với TTL (mặc định 300s) |
| `delete(key)` | Xóa 1 key |
| `deletePattern(pattern)` | Xóa nhiều key theo pattern |
| `storeCandleHistory(symbol, interval, candles)` | Lưu nhiều candle vào Sorted Set |
| `getCandleHistory(symbol, interval, limit)` | Lấy candle từ Sorted Set |
| `addSingleCandle(symbol, interval, candle)` | Thêm 1 candle (từ WebSocket) |
| `publish(channel, message)` | Publish Pub/Sub |
| `subscribe(channel, callback)` | Subscribe Pub/Sub |
| `increment(key, ttl)` | Tăng counter (rate limiting) |

### Cơ chế lưu Candle trong Redis:

Sử dụng **Redis Sorted Set** + **Individual Keys**:

```
Sorted Set:  candles:BTCUSDT:1h → { score: timestamp, member: "timestamp" }
Individual:  candle:BTCUSDT:1h:1706745600000 → { time, open, high, low, close, volume }
```

**Tại sao dùng Sorted Set thay vì List?**
- Sorted Set giữ thứ tự theo score (timestamp)
- Hỗ trợ `ZREVRANGE` → lấy N candle mới nhất hiệu quả
- Timestamp là unique → không trùng lặp
- Hỗ trợ `ZREMRANGEBYRANK` → tự động trim candle cũ

**Pipeline:**
```typescript
const pipeline = this.redis.pipeline();
candles.forEach((candle) => {
  pipeline.set(candleKey, JSON.stringify(candle), 'EX', 3600, 'NX');
  pipeline.zadd(key, candle.time, candle.time.toString());
});
await pipeline.exec();
```
- **Pipeline** gộp nhiều command Redis gửi 1 lần → giảm round-trip, tăng hiệu năng

---

## 10. Module Indicators

### 10.1. IndicatorsService - Thuật toán tính toán

#### SMA (Simple Moving Average)
```
SMA = Tổng giá đóng cửa N phiên / N
VD: SMA(20) = (Close[0] + Close[1] + ... + Close[19]) / 20
```
- **Ý nghĩa**: Xu hướng trung bình, làm mượt biến động giá

#### EMA (Exponential Moving Average)
```
Multiplier = 2 / (Period + 1)
EMA = (Close - EMA_trước) × Multiplier + EMA_trước
```
- **Khác SMA**: EMA cho **trọng số cao hơn** với giá gần đây → phản ứng nhanh hơn
- EMA đầu tiên = SMA (dùng SMA làm seed)

#### RSI (Relative Strength Index)
```
RS = Average Gain / Average Loss  (trong N phiên)
RSI = 100 - (100 / (1 + RS))
```
- **Ý nghĩa**: Đo sức mạnh xu hướng (0-100)
- RSI < 30 → **Oversold** (quá bán, có thể tăng)
- RSI > 70 → **Overbought** (quá mua, có thể giảm)
- Dùng **smoothed average** (Wilder's method) cho các giá trị tiếp theo

#### MACD (Moving Average Convergence Divergence)
```
MACD Line = EMA(12) - EMA(26)       // Đường MACD
Signal Line = EMA(9) của MACD Line  // Đường tín hiệu
Histogram = MACD - Signal            // Biểu đồ
```
- MACD > Signal → **Bullish** (xu hướng tăng)
- MACD < Signal → **Bearish** (xu hướng giảm)

#### Bollinger Bands
```
Middle = SMA(20)
Upper = Middle + 2 × Standard Deviation
Lower = Middle - 2 × Standard Deviation
```
- Giá chạm Upper → có thể **quá mua**
- Giá chạm Lower → có thể **quá bán**

#### Stochastic Oscillator
```
%K = (Close - Lowest Low) / (Highest High - Lowest Low) × 100
%D = SMA(%K, 3)
```
- %K < 20 → Oversold, %K > 80 → Overbought

#### ATR (Average True Range)
```
True Range = Max(High-Low, |High-PrevClose|, |Low-PrevClose|)
ATR = SMA(True Range, 14)
```
- Đo **độ biến động** (volatility) của thị trường

### 10.2. IndicatorsController - API Endpoints

| Endpoint | Chỉ báo |
|---|---|
| `GET /api/v1/indicators/:symbol/ma` | SMA |
| `GET /api/v1/indicators/:symbol/ema` | EMA |
| `GET /api/v1/indicators/:symbol/rsi` | RSI |
| `GET /api/v1/indicators/:symbol/macd` | MACD |
| `GET /api/v1/indicators/:symbol/bollinger` | Bollinger Bands |
| `GET /api/v1/indicators/:symbol/stochastic` | Stochastic |
| `GET /api/v1/indicators/:symbol/atr` | ATR |
| `GET /api/v1/indicators/:symbol/multi` | Nhiều chỉ báo cùng lúc |
| `GET /api/v1/indicators/:symbol/summary` | Tổng hợp phân tích |

### 10.3. Summary Endpoint - Phân tích tổng hợp

Endpoint `/summary` tính toán tất cả chỉ báo và đưa ra tín hiệu:
```
Bullish signals > Bearish signals + 1 → BULLISH
Bearish signals > Bullish signals + 1 → BEARISH
Còn lại → NEUTRAL
```

### 10.4. DTO Validation

Sử dụng `class-validator` + `class-transformer`:
```typescript
export class GetMADto {
  @IsIn(VALID_INTERVALS) interval: ValidInterval;  // Phải nằm trong danh sách
  @Min(2) @Max(200) period?: number = 20;           // Giới hạn 2-200
  @Min(10) @Max(1000) limit?: number = 500;         // Giới hạn 10-1000
}
```

---

## 11. Module Health Check

```typescript
@Get()        // GET /api/v1/health     → Kiểm tra DB, Redis, Binance, Memory
@Get('ready') // GET /api/v1/health/ready → Sẵn sàng nhận traffic?
@Get('live')  // GET /api/v1/health/live  → App còn sống?
@Get('websocket') // Kiểm tra WebSocket connections
```

**Tại sao cần Health Check?**
- Docker/Kubernetes dùng để **tự restart** container nếu không healthy
- Load Balancer dùng để **loại bỏ** instance lỗi

---

## 12. Common

### 12.1. CustomValidationPipe
- Tự động validate DTO bằng `class-validator`
- Chỉ validate body và class có tên kết thúc bằng "Dto"
- Hỗ trợ nested validation
- `whitelist: true` → loại bỏ field không khai báo trong DTO
- `forbidNonWhitelisted: true` → báo lỗi nếu gửi field lạ

### 12.2. ResponseInterceptor
Bọc mọi response thành format chuẩn:
```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "timestamp": "2026-02-10T...",
  "path": "/api/v1/market/symbols"
}
```

### 12.3. Exception Filters
Bọc mọi error thành format chuẩn:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": { "interval": ["interval must be one of: 1m, 5m, 1h..."] },
  "timestamp": "2026-02-10T...",
  "path": "/api/v1/indicators/BTCUSDT/ma"
}
```

**AllExceptionsFilter** xử lý thêm lỗi database:
- `23505` → Unique violation (trùng dữ liệu)
- `23503` → Foreign key violation
- `23502` → Not null violation

---

## 13. WebSocket Gateway

**File: `src/modules/market/market.gateway.ts`**

```typescript
@WebSocketGateway({ namespace: '/market' })
export class MarketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // Events:
  // 'subscribe'           → Client muốn theo dõi 1 cặp
  // 'unsubscribe'         → Client ngừng theo dõi
  // 'subscribe-all-tickers' → Client muốn xem tất cả giá
  // 'candle-update'       → Server gửi data nến mới
  // 'ticker-update'       → Server gửi giá mới
  // 'all-tickers-update'  → Server gửi tất cả giá
  // 'historical-data'     → Server gửi data lịch sử khi subscribe
}
```

**Luồng hoạt động:**
```
1. Client connect → lưu clientId vào Map
2. Client emit 'subscribe' { symbol: 'BTCUSDT', interval: '1h' }
3. Gateway gọi BinanceWebsocketService.subscribe()
4. Khi có data mới → callback → client.emit('candle-update', data)
5. Client disconnect → cleanup tất cả subscription
```

**Tính năng interval switching:**
```typescript
const existingInterval = subscriptions?.get(symbol);
if (existingInterval && existingInterval !== interval) {
  await this.binanceWs.unsubscribe(symbol, client.id, existingInterval);
}
```
- Nếu client đã subscribe `BTCUSDT:1h` rồi subscribe `BTCUSDT:4h` → tự unsubscribe cũ trước

---

## 14. Redis IO Adapter

```typescript
export class RedisIoAdapter extends IoAdapter {
  async connectToRedis() {
    const pubClient = createClient({ url: 'redis://...' });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }
}
```

**Tại sao cần Redis Adapter cho Socket.IO?**
- Khi chạy **nhiều instance** server (scale horizontally)
- Mỗi instance chỉ biết client kết nối với nó
- Redis Pub/Sub → đồng bộ message giữa TẤT CẢ instance
- Client A ở instance 1, Client B ở instance 2 → cả hai đều nhận data

---

## 15. Docker & Deployment

### Dockerfile (Multi-stage build)
```dockerfile
# Stage 1: Build - cài dependencies + compile TypeScript
FROM node:22-alpine AS builder
RUN npm ci && npm run build && npm prune --production

# Stage 2: Production - chỉ copy file cần thiết
FROM node:22-alpine AS production
RUN adduser -S nestjs  # Non-root user (bảo mật)
COPY --from=builder /app/dist /app/node_modules /app/package.json
USER nestjs
CMD ["node", "dist/main"]
```

**Tại sao dùng Multi-stage build?**
- Stage 1 có devDependencies (TypeScript, ESLint...) → image lớn
- Stage 2 chỉ có production files → image **nhỏ hơn nhiều**
- Không lộ source code TypeScript trong production image

### Docker Compose Production
3 containers:
1. **market-service** → NestJS app
2. **market-service-postgres** → PostgreSQL 16
3. **market-service-redis** → Redis 7

**Health check** đảm bảo containers khởi động đúng thứ tự:
```yaml
depends_on:
  market-service-postgres:
    condition: service_healthy  # Chờ DB healthy rồi mới start app
```

---

## 16. Luồng dữ liệu chính

### Luồng 1: Client xem biểu đồ real-time

```
1. Frontend connect WebSocket → MarketGateway.handleConnection()
2. Frontend emit 'subscribe' { symbol: 'BTCUSDT', interval: '1h' }
3. MarketGateway → BinanceWebsocketService.subscribe()
4. BinanceWS kết nối Binance: wss://stream.binance.com:9443/stream?streams=btcusdt@kline_1h/btcusdt@ticker
5. Binance gửi data mới ↓
6. BinanceWebsocketService parse & broadcast → callback
7. Gateway emit 'candle-update' tới client
8. Nếu candle final (k.x === true):
   a. MarketService.storeFinalCandle() → đẩy vào Bull Queue
   b. CandleStorageProcessor xử lý:
      - Lưu vào Redis Sorted Set (cache)
      - Lưu vào PostgreSQL (persistent)
```

### Luồng 2: Client xem danh sách giá

```
1. Frontend gọi GET /api/v1/market/tickers
2. MarketController → MarketService.getAllTickers()
3. Kiểm tra Redis cache (TTL 5s):
   - Cache hit → trả về ngay
   - Cache miss → gọi BinanceService.getAllTickers() → lưu cache → trả về
```

### Luồng 3: Client xem chỉ báo kỹ thuật

```
1. Frontend gọi GET /api/v1/indicators/BTCUSDT/rsi?interval=1h&period=14
2. IndicatorsController.getRSI()
3. Lấy candles: MarketService.getHistoricalCandles() (cache-first)
4. Tính toán: IndicatorsService.calculateRSI(candles, 14)
5. Trả về kết quả
```

---

## 17. Câu hỏi vấn đáp thường gặp

### Q1: Tại sao dùng NestJS thay vì Express thuần?
**A:** NestJS có kiến trúc module hóa, hỗ trợ DI (Dependency Injection), decorator, guard, pipe, interceptor... giúp code có cấu trúc rõ ràng, dễ maintain, dễ test. Express thuần không có những tính năng này built-in.

### Q2: Dependency Injection (DI) là gì? Tại sao cần?
**A:** DI là design pattern giúp inject dependency từ bên ngoài thay vì tạo bên trong class. NestJS container tự quản lý lifecycle. Lợi ích: loose coupling, dễ test (mock), dễ swap implementation.

### Q3: Tại sao dùng cả Redis và PostgreSQL?
**A:** 
- **Redis**: Cache tốc độ cao (in-memory), TTL tự động, Sorted Set cho candle data, Pub/Sub cho WebSocket scaling
- **PostgreSQL**: Lưu trữ bền vững (persistent), query phức tạp, phân tích lịch sử dài hạn

### Q4: forwardRef() là gì? Tại sao cần?
**A:** Giải quyết **circular dependency** giữa BinanceModule ↔ MarketModule. BinanceWebsocketService cần MarketService (lưu candle), MarketService cần BinanceService (lấy data). `forwardRef()` cho phép NestJS resolve dependency này.

### Q5: Tại sao dùng Bull Queue thay vì lưu trực tiếp vào DB?
**A:** WebSocket nhận hàng nghìn message/giây. Nếu lưu trực tiếp → block WebSocket handler → mất data. Queue cho phép: xử lý async, retry khi lỗi, không overload DB.

### Q6: Exponential Backoff là gì?
**A:** Chiến lược retry với delay tăng dần (1s, 2s, 4s, 8s...). Tránh DDoS server khi đang lỗi. Có max delay (60s) để không chờ quá lâu.

### Q7: Tại sao cần Redis Adapter cho Socket.IO?
**A:** Khi chạy nhiều instance (horizontal scaling), mỗi instance chỉ biết client của nó. Redis Pub/Sub đồng bộ message giữa tất cả instance → client ở bất kỳ instance nào cũng nhận được data.

### Q8: Pipe, Interceptor, Filter khác nhau thế nào?
**A:**
- **Pipe**: Chạy TRƯỚC controller, validate/transform input
- **Interceptor**: Chạy SAU controller (hoặc trước+sau), transform output
- **Filter**: Chạy khi có EXCEPTION, format error response

### Q9: Giải thích cơ chế Health Check?
**A:** Kiểm tra 4 thành phần: Database (ping), Redis (set/get test), Binance API (ping), Memory (heap < 150MB). Docker/K8s dùng endpoint này để tự restart container nếu unhealthy.

### Q10: Tại sao Dockerfile dùng Multi-stage build?
**A:** Giảm kích thước image production (không chứa devDependencies, source .ts). Tăng bảo mật (không lộ source code). Stage build riêng → production image chỉ chứa compiled JS và runtime dependencies.

### Q11: `orIgnore()` trong TypeORM làm gì?
**A:** Khi INSERT nếu gặp conflict (unique violation) → bỏ qua thay vì throw error. Dùng cho candle data vì có thể nhận cùng 1 candle nhiều lần từ WebSocket.

### Q12: Tại sao cần Swagger?
**A:** Tự động tạo API documentation từ decorators. Giúp frontend developer biết endpoints, parameters, response format mà không cần đọc code backend.

### Q13: Giải thích `firstValueFrom()` trong RxJS?
**A:** `HttpModule` của NestJS trả về Observable (RxJS). `firstValueFrom()` chuyển Observable thành Promise, lấy giá trị đầu tiên emit. Giúp dùng async/await thay vì subscribe.

### Q14: Connection Pool hoạt động thế nào?
**A:** Duy trì sẵn 5-20 kết nối mở tới PostgreSQL. Khi cần query → lấy 1 connection từ pool → thực hiện → trả về pool. Tránh overhead tạo/đóng kết nối mỗi request.

### Q15: `class-transformer` và `class-validator` dùng để làm gì?
**A:**
- `class-transformer`: Chuyển plain object (JSON request) thành class instance (DTO)
- `class-validator`: Validate dữ liệu dựa trên decorators (@IsNumber, @Min, @Max...)
- Kết hợp: request JSON → transform thành DTO → validate → reject nếu lỗi

---

> **Lưu ý cuối**: Tài liệu này bao quát toàn bộ source code. Khi vấn đáp, hãy tập trung vào **WHY** (tại sao chọn giải pháp này) thay vì chỉ mô tả **WHAT** (code làm gì). Giảng viên thường đánh giá cao khả năng giải thích lý do đằng sau quyết định thiết kế.
