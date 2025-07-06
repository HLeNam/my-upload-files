Dưới đây là phần **tóm tắt lý thuyết về Informed search (Heuristic search) và các điểm chính trong slide của bạn**, giúp bạn nắm chắc nội dung.

---

## **Informed (Heuristic) Search Strategies – Tổng quan**

### **1. Định nghĩa**
- **Informed search** (tìm kiếm có thông tin, hay còn gọi là heuristic search) là kỹ thuật tìm kiếm trong AI tận dụng **thông tin đặc thù của bài toán** (heuristic) để dẫn đường tìm ra lời giải nhanh hơn so với các thuật toán tìm kiếm mù (uninformed search).
- **Heuristic** = mẹo, quy tắc kinh nghiệm, kiến thức bổ sung giúp đánh giá nhanh trạng thái nào có khả năng gần với đích.

### **2. Lợi ích**
- Giúp **giảm số lượng trạng thái cần duyệt**.
- **Tìm lời giải nhanh hơn, tốn ít tài nguyên hơn**.
- Có thể giải được các bài toán lớn mà tìm kiếm mù không khả thi.

---

## **Các chiến lược Informed search chính**

### **A. Best-first Search**
- Duyệt node dựa trên một **hàm đánh giá f(n)** (evaluation function).
- Luôn mở rộng node có giá trị f(n) nhỏ nhất trước.
- **Heuristic function h(n)** là một thành phần quan trọng của f(n).

### **B. Greedy Best-first Search (GBFS)**
- Chọn node có **giá trị heuristic nhỏ nhất**: f(n) = h(n).
- **Chỉ quan tâm đến chi phí từ node hiện tại đến goal, không quan tâm chi phí đã đi qua**.
- Nhanh, nhưng không đảm bảo tối ưu.

### **C. A\* Search**
- Hàm đánh giá: f(n) = g(n) + h(n)
    - **g(n):** chi phí từ đầu đến n
    - **h(n):** ước lượng chi phí từ n đến goal
- **Vừa dùng heuristic, vừa tính chi phí thực**
- **Đảm bảo tối ưu nếu heuristic là admissible và consistent**

---

## **Heuristic function (h(n))**

- **h(n):** hàm ước lượng chi phí từ trạng thái n đến goal.
- **Yêu cầu:** h(goal) = 0; h(n) ≥ 0 với mọi n
- **Admissible:** Không vượt quá chi phí thực tế (lạc quan)
- **Consistent:** Đảm bảo tam giác (h(n) ≤ c(n, n') + h(n'))

---

## **So sánh các thuật toán**

| Thuật toán     | Đảm bảo tìm thấy | Đảm bảo tối ưu | Cần heuristic | Tốc độ            |
|----------------|------------------|---------------|---------------|-------------------|
| BFS, UCS       | Có               | Có            | Không         | Chậm              |
| Greedy Best-First | Có (hữu hạn)  | Không         | Có            | Nhanh, không tối ưu|
| A*             | Có               | Có (nếu h tốt)| Có            | Nhanh, tối ưu     |

---

## **Các biến thể khác**
- **RBFS, SMA\***: Dùng cho các trường hợp cần tiết kiệm bộ nhớ, vẫn sử dụng heuristic.
- **IDA\***: Kết hợp iterative deepening với A*, dùng threshold theo f(n).

---

## **Về các heuristic nổi bật**
- **8-puzzle:**  
    - Số quân cờ sai vị trí (misplaced tiles)  
    - Tổng khoảng cách Manhattan của các quân cờ đến vị trí đích  
    - Pattern database

- **Heuristic dominance:** Nên chọn heuristic có giá trị lớn hơn, miễn là vẫn admissible.

---

Bạn muốn mình giải thích chi tiết từng thuật toán (ví dụ A*), hoặc làm ví dụ cụ thể về cách dùng heuristic, hoặc bài tập mẫu? Nếu có, hãy hỏi tiếp nhé!