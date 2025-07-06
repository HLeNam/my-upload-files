# Artificial Intelligence - CONSTRAINT SATISFACTION PROBLEMS (CSP)
**Chi tiết từng mục, từng ví dụ, từng thuật toán, từng kỹ thuật theo bài giảng**

---

## 1. Định nghĩa CSP

- **CSP (Constraint Satisfaction Problem)** là bài toán xác định giá trị cho tập các biến sao cho thỏa mãn toàn bộ ràng buộc đã cho.
- **Thành phần**:
  - **Biến (Variables):** X₁, X₂, ..., Xₙ
  - **Miền giá trị (Domains):** D₁, D₂, ..., Dₙ (cho từng biến)
  - **Ràng buộc (Constraints):** C₁, ..., Cₖ (giữa các biến)

---

## 2. Ví dụ chi tiết: Tô màu bản đồ (Map coloring)

- **Yêu cầu:**  
  Tô màu các vùng của bản đồ Úc bằng 3 màu (red, green, blue), các vùng kề nhau không cùng màu.
- **Các biến:**  
  WA, NT, Q, NSW, V, SA, T
- **Miền giá trị:**  
  {red, green, blue}
- **Ràng buộc:**  
  - (SA, WA): SA ≠ WA
  - (SA, NT): SA ≠ NT
  - (SA, Q): SA ≠ Q
  - (SA, NSW): SA ≠ NSW
  - (SA, V): SA ≠ V
  - (WA, NT): WA ≠ NT
  - (NT, Q): NT ≠ Q
  - (Q, NSW): Q ≠ NSW
  - (NSW, V): NSW ≠ V
- **Một lời giải:**  
  {WA=red, NT=green, Q=red, NSW=green, V=red, SA=blue, T=red}

---

## 3. Biểu diễn constraint graph

- **Đỉnh:** Mỗi vùng là một biến.
- **Cạnh:** Nối giữa hai vùng kề nhau (tức là có ràng buộc ≠).

---

## 4. Ví dụ chi tiết: Lập lịch xưởng (Job-shop scheduling)

- **Biến:**  
  - Axle1, Axle2, Wheel1, Wheel2, Wheel3, Wheel4, Nuts1...Nuts4, Cap1...Cap4, Inspect
- **Miền:**  
  - Thời điểm bắt đầu (giả sử 1..27)
- **Ràng buộc:**  
  - **Thứ tự:** Axle1 + 10 ≤ Wheel1 (gắn trục xong mới lắp bánh)
  - **Tiếp nối:** Wheel1 + 1 ≤ Nuts1, Nuts1 + 2 ≤ Cap1, Cap1 + 1 ≤ Inspect
  - **Không chồng lấn:** Nếu chỉ có 1 dụng cụ, Axle1 + 10 ≤ Axle2 hoặc ngược lại.
  - **Giới hạn tổng:** Mọi công việc phải xong trước phút 30.

---

## 5. Các loại ràng buộc

- **Unary constraint:** Ràng buộc trên một biến (vd: SA ≠ green)
- **Binary constraint:** Hai biến (vd: WA ≠ NT)
- **Higher-order constraint:** Từ ba biến trở lên
- **Global constraint:** Tập biến bất kỳ (vd: AllDiff)

---

## 6. Giải thuật AC-3 (Arc Consistency)

**Thuật toán AC-3:** Đảm bảo mọi giá trị của một biến đều có giá trị hợp lệ ở các biến liên quan (theo constraint binary).

### **Pseudo code:**
```python
function AC-3(csp):
    queue = all arcs in CSP
    while queue not empty:
        (Xi, Xj) = queue.pop()
        if REVISE(csp, Xi, Xj):
            if Di is empty: return False
            for Xk in neighbors[Xi] except Xj:
                queue.add((Xk, Xi))
    return True

function REVISE(csp, Xi, Xj):
    revised = False
    for x in Di:
        if no y in Dj makes (x,y) satisfy constraint(Xi, Xj):
            remove x from Di
            revised = True
    return revised
```

### **Ý nghĩa:**
- Nếu một giá trị của Xi không thể kết hợp với bất kỳ giá trị nào của Xj (theo ràng buộc), loại giá trị đó khỏi miền Di.
- Cứ mỗi lần miền của Xi bị loại mất một giá trị, phải kiểm tra lại các biến kề Xi.

---

## 7. Thuật toán Backtracking

**Ý tưởng:**  
- Gán giá trị cho biến, nếu dẫn đến xung đột thì quay lui, thử giá trị khác.
- Thường kết hợp heuristic để tối ưu tốc độ.

**Pseudo code:**
```python
function BACKTRACKING-SEARCH(csp):
    return BACKTRACK({}, csp)

function BACKTRACK(assignment, csp):
    if assignment is complete: return assignment
    var = select-unassigned-variable(csp)
    for value in order-domain-values(var, assignment, csp):
        if value is consistent:
            add {var=value} to assignment
            inferences = inference(csp, var, value)
            if inferences != failure:
                add inferences to assignment
                result = BACKTRACK(assignment, csp)
                if result != failure: return result
            remove {var=value} and inferences from assignment
    return failure
```
---

## 8. Các heuristic thường dùng trong CSP

- **MRV (Minimum Remaining Values):** Chọn biến có ít giá trị hợp lệ nhất.
- **Degree heuristic:** Chọn biến có nhiều ràng buộc nhất với biến chưa gán.
- **LCV (Least Constraining Value):** Với mỗi biến, thử giá trị ít hạn chế các biến khác nhất trước.

---

## 9. Forward Checking

- Sau khi gán giá trị cho một biến, loại ngay các giá trị không thể dùng ở các biến kề (theo constraint).
- Nếu biến nào hết giá trị hợp lệ, backtrack ngay (giảm lãng phí).

---

## 10. So sánh Forward Checking & Arc Consistency

- **Forward Checking:**  
  - Chỉ kiểm tra và loại giá trị ở các biến trực tiếp kề với biến vừa gán giá trị.
- **Arc Consistency (AC-3):**  
  - Kiểm tra hai chiều, loại giá trị sâu hơn và phát hiện xung đột sớm hơn.

---

## 11. Local Search và Min-Conflicts

- **Min-Conflicts:**  
  - Khởi tạo một gán đầy đủ ngẫu nhiên.
  - Lặp lại: Chọn biến đang xung đột, đổi sang giá trị gây ít xung đột nhất.
  - Thường giải được các bài toán lớn (n-Queens) rất nhanh.

  **Pseudo code:**
  ```python
  function MIN-CONFLICTS(csp, max_steps):
      current = initial complete assignment
      for i in 1..max_steps:
          if current is solution: return current
          var = random conflicted variable
          value = value for var that minimizes conflicts
          set var = value in current
      return failure
  ```

---

## 12. Cấu trúc bài toán CSP và tối ưu hóa

- **Independent subproblems:**  
  Nếu đồ thị constraint rời rạc thành các nhóm không liên thông, giải từng nhóm riêng.
- **Tree-structured CSP:**  
  Nếu graph là cây, giải được trong O(nd²) (n: số biến, d: cỡ miền).
- **Tree decomposition:**  
  Chọn một số biến, gán giá trị để phần còn lại thành cây, giải từng phần rồi ghép lại.

---

## 13. Ứng dụng thực tế CSP

- Lập lịch, xếp thời khoá biểu, Sudoku, giải mã, nhận dạng ảnh, lập kế hoạch tuyến tính, ...

---

## 14. Quiz mẫu (theo slide)

**Quiz 1: Map coloring**
- Viết rõ các biến, miền, ràng buộc, vẽ constraint graph.
- Đưa ra ít nhất 1 lời giải hợp lệ.

**Quiz 2: AC vs. Forward checking**
- Cho 1 đồ thị ràng buộc, hỏi: Nếu gán giá trị cho A, những biến nào có thể bị ảnh hưởng miền khi dùng forward checking/arc consistency?

**Quiz 3: Timetable scheduling**
- Biến: Mỗi lớp là 1 biến.
- Miền: Giáo viên nào có thể dạy lớp đó.
- Ràng buộc:  
  - Giáo viên không dạy 2 lớp trùng giờ.
  - Giáo viên chỉ dạy lớp hợp lệ.
- Vẽ graph, mô tả miền sau khi lan truyền ràng buộc, đưa ra một lời giải.

---

**Nếu bạn cần ví dụ giải chi tiết 1 quiz nào, hoặc muốn mình trình bày thêm về thuật toán nào, hãy nói rõ nhé!**