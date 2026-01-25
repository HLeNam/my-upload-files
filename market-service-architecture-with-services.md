# Kiến trúc theo cấp độ — Market Service (có các Service khác)

Bản này mô tả 4 cấp kiến trúc (từ đơn giản → production microservices) nhưng khác với bản trước là ở mỗi cấp ta hiển thị toàn bộ hệ thống gồm nhiều service liên quan (Auth, API Gateway, Crawler, AI, Binance Connector, Notification, v.v.) và kèm ước lượng số user/connection.

---

## Mức 0 — PoC (hệ thống nhiều service nhưng simple)

Mục tiêu: demo chức năng cơ bản, service nhỏ, chưa scale.

Sơ đồ (Mermaid):

```mermaid
flowchart LR
  Client["Client<br/>(Browser)"]
  APISrv["Single API Service\n(Nest/Express)"]
  BinanceAPI["Binance REST"]
  Crawler["Crawler (simple)"]
  DB["DB (SQLite/Postgres)"]

  Client -->|HTTP| APISrv
  APISrv -->|REST| BinanceAPI
  APISrv -->|persist| DB
  Crawler -->|store news| DB
```

Giải thích & sizing (ước lượng):

- Số user: 1 - 50 (dev/demo)
- Concurrent WS: nếu có, < 50
- Subscriptions/user: 1-2
- Outbound streams: trực tiếp REST calls, low RPS (< 10)

Khi đủ yêu cầu: nâng lên Mức 1 để có realtime và persistence tốt hơn.

---

## Mức 1 — Ứng dụng đơn tiến trình với các service phụ tối thiểu

Mục tiêu: cung cấp realtime cơ bản, có Auth & basic Crawler.

Sơ đồ (Mermaid):

```mermaid
flowchart LR
  Client["Client<br/>(Browser)"]
  APIGW["API Gateway\n(light)"]
  Market["Market Service\n(API + WS)"]
  Auth["Auth Service"]
  DB["Postgres"]
  Crawler["Crawler Service\n(light)"]
  BinanceWS["Binance WebSocket/REST"]

  Client --> APIGW
  APIGW -->|auth| Auth
  APIGW --> Market
  Market --> BinanceWS
  Market --> DB
  Crawler --> DB
```

Giải thích & sizing (ước lượng):

- Số user: 10 - 200 active
- Concurrent WS: 10 - 200
- Subscriptions/user: 1 - 3 → tổng subs ~10 - 600
- Outbound connections: nếu server mở per-subscription, outbound ~subscriptions (risk of explosion).

Vấn đề: khi users tăng, outbound connections và DB blocking sẽ là bottleneck.

---

## Mức 2 — Cache + Queue + Service phân vai (Auth, Market, Crawler, AI (sớm))

Mục tiêu: giảm latency, không block, tách concerns cơ bản.

Sơ đồ (Mermaid):

```mermaid
flowchart LR
  Client["Client"]
  APIGW["API Gateway"]
  Auth["Auth Service"]
  Market["Market Service\n(API + WS)"]
  BinanceConn["Binance Connector\n(simple)"]
  Cache["Redis (cache)"]
  Queue["Bull (Redis)"]
  Worker["Worker (storage)"]
  Crawler["Crawler Service"]
  AI["AI Service (offline)"]
  Postgres["Postgres (time-series)"]

  Client --> APIGW
  APIGW --> Auth
  APIGW --> Market
  Market -->|cache read/write| Cache
  Market -->|enqueue| Queue
  Market --> BinanceConn
  BinanceConn --> BinanceAPI["Binance WS/REST"]
  Queue --> Worker
  Worker --> Postgres
  Crawler -->|news| Postgres
  Crawler -->|normalized| AI
```

Giải thích & sizing (ước lượng):

- Số user: 200 - 2,000 active
- Concurrent WS: 200 - 2,000
- Subscriptions total: 200 - 10,000
- Outbound streams: aim to multiplex; with caching most reads served from Redis (cache hit target >70%)

Đặc điểm: có Queue/Worker để tránh blocking, Crawler chuẩn bị dữ liệu cho AI offline.

---

## Mức 3 — Multiplexing + Socket Clustering + Event Bus (hiện tại / production-ready)

Mục tiêu: đáp ứng hàng nghìn → hàng chục nghìn users, resilient WS, scale ngang.

Sơ đồ (Mermaid):

```mermaid
flowchart LR
  subgraph Edge
    ClientPool["Clients (browsers)"]
    APIGW["API Gateway\n+ RateLimit\n+ Auth"]
  end

  subgraph Core
    MarketCluster["Market Service Replicas"]
    BConnector["Binance Connector\n(multiplex)"]
    Redis["Redis Cluster\n(cache + adapter)"]
    Bull["Bull Queue"]
    Workers["Worker Pool"]
    Postgres["Postgres/TimescaleDB"]
    Kafka["Kafka (event bus)"]
    Crawler["Crawler Service"]
    AI["AI Service (inference)"]
  end

  ClientPool --> APIGW
  APIGW --> MarketCluster
  MarketCluster -->|socket adapter| Redis
  MarketCluster -->|publish events| Kafka
  BConnector -->|streams| Kafka
  Kafka --> Workers
  Workers --> Postgres
  Crawler --> Kafka
  AI -->|inference| MarketCluster
```

Giải thích & sizing (ước lượng):

- Số user: 2,000 - 100,000 active (tùy infra)
- Concurrent WS: 2k - 100k (chia trên replicas)
- Subscriptions/user: 1 - 10 → total subscriptions 2k - 1M
- Unique streams (symbol, interval) U: vài trăm → vài ngàn (điều quan trọng để multiplex)
- Fanout: internal messages/sec ≈ total_subs \* update_rate; ticker fanout có thể lớn (use delta/aggregation)

Lý do dừng ở mức này: nó cung cấp

- multiplexing để giảm outbound sockets,
- socket.io Redis adapter để scale ngang,
- queue & worker cho persistence, và
- event bus để tách concerns mà không phải tách toàn bộ codebase ngay lập tức.

---

## Mức 4 — Microservices hoàn chỉnh (tách rõ Market, Connector, Crawler, AI, Auth, Notification, Billing)

Mục tiêu: scale cho hàng trăm nghìn → triệu user, tách trách nhiệm, enable MLOps.

Sơ đồ (Mermaid):

```mermaid
flowchart LR
  Client["Clients (browsers / mobile)"]
  APIGW["API Gateway\n(rate limit, auth)"]
  Auth["Auth/Account Service"]
  MarketAPI["Market API Service"]
  MarketWS["Market WS Service(s)"]
  Connector["Binance Connector Service\n(connection pool)"]
  Crawler["Crawler Cluster"]
  Ingestion["Ingestion/ETL"]
  VectorDB["Vector DB (Pinecone/Milvus)"]
  AI["AI/Inference Service\n(GPU nodes)"]
  Kafka["Kafka Cluster"]
  Redis["Redis Cluster"]
  Postgres["Postgres/TimescaleDB"]
  Billing["Billing Service"]
  Notification["Notification/Push"]

  Client --> APIGW
  APIGW --> Auth
  APIGW --> MarketAPI
  MarketAPI --> MarketWS
  MarketWS --> Redis
  Connector -->|streams| Kafka
  Kafka --> MarketWS
  Kafka --> Ingestion
  Ingestion --> VectorDB
  VectorDB --> AI
  AI -->|results| MarketAPI
  Crawler --> Ingestion
  MarketAPI --> Billing
  MarketAPI --> Notification
  MarketAPI --> Postgres
```

Giải thích & sizing (ước lượng):

- Số user: 50k - 1M+ active
- Concurrent WS: 50k - 1M
- Subscriptions: tens/hundreds of thousands → millions
- Unique outbound streams: vẫn hàng nghìn; Connector service tối ưu quản lý connection pool
- Event bus (Kafka) handle fanout và persist events; VectorDB phục vụ embedding queries

Lý do chuyển lên mức này: cần cho các yêu cầu phân tích nâng cao (AI realtime), tenant isolation, billing & quota, và để hệ thống có thể scale đến hàng trăm nghìn user với SLA cao.

---

## Phần kết

Tài liệu này mở rộng các sơ đồ trên bằng việc thêm các service liên quan ở từng cấp độ, giúp team thấy rõ đường đi khi mở rộng hệ thống từ PoC tới microservices hoàn chỉnh. Nếu bạn muốn, tôi có thể:

- Xuất từng sơ đồ Mermaid sang PNG/SVG;
- Tổng hợp bảng sizing (CSV/Markdown) cho từng kịch bản (moderate/large/huge);
- Sinh kịch bản load-test (k6 hoặc locust) theo thông số sizing mẫu.

Bạn chọn bước tiếp theo nào?
