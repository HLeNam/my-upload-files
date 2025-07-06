# TRÍ TUỆ NHÂN TẠO  
## TÁC NHÂN LOGIC  
**Bùi Duy Đăng**  
bddang@fit.hcmus.edu.vn

---

## Đề cương

- Tác nhân dựa trên tri thức
- Thế giới Wumpus
- Logic mệnh đề: Một loại logic rất đơn giản
- Chứng minh định lý logic mệnh đề
- Kiểm tra mô hình hiệu quả cho logic mệnh đề

---

## Tác nhân dựa trên tri thức

### Tác nhân giải quyết vấn đề

- Những tác nhân này chỉ biết một cách rất hạn chế, thiếu linh hoạt.
- Ví dụ: Tác nhân giải 8-puzzle không thể suy luận hai trạng thái không thể giải được từ tính chẵn lẻ của chúng.
- CSP cho phép một số phần của tác nhân hoạt động độc lập với miền bài toán.
- Trạng thái = một gán giá trị cho các biến.
- Cho phép các thuật toán hiệu quả hơn.

---

### Tác nhân dựa trên tri thức

- Được hỗ trợ bởi logic – một lớp biểu diễn tổng quát.
- Kết hợp và tái kết hợp thông tin để phục vụ vô vàn mục đích.
- Nhận nhiệm vụ mới dưới dạng mục tiêu được mô tả tường minh.
- Đạt được năng lực bằng cách học tri thức mới về môi trường.
- Thích ứng với thay đổi bằng cách cập nhật tri thức liên quan.

---

### Phân rã tác nhân: Offline và online  
*(Tham khảo: https://artint.info/html/ArtInt_40.html)*

#### Mô tả chi tiết giao diện giữa tác nhân và thế giới  
*(Tham khảo: https://artint.info/html/ArtInt_40.html)*

---

### Tác nhân dựa trên tri thức

- **Cơ sở tri thức (KB):** Một tập các câu hoặc sự kiện.
- Mỗi câu biểu diễn một khẳng định về thế giới.
- **Tiên đề (Axiom):** Một câu không được suy ra từ các câu khác.
- **Suy diễn (Inference):** Suy ra các câu mới từ các câu cũ.
- Thêm câu mới vào KB và truy vấn những gì đã biết.

---

### Mô hình suy luận: Ví dụ

- Một mô hình suy luận đơn giản:

    - A ⇒ (B hoặc C)
    - A, Không C
    - SUY RA B

- KB  
  A, Không C,  
  SUY DIỄN  
  B

---

### Thuật toán tổng quát cho tác nhân dựa trên tri thức

```python
function KB-AGENT(percept) returns an action
  persistent: KB, a knowledge base
              t, a counter, initially 0, indicating time
  TELL(KB, MAKE-PERCEPT-SENTENCE(percept, t))
  action ← ASK(KB, MAKE-ACTION-QUERY(t))
  TELL(KB, MAKE-ACTION-SENTENCE(action, t))
  t ← t + 1
  return action
```
> Cơ chế suy diễn ẩn bên trong TELL và ASK

---

### Các tiếp cận xây dựng tác nhân dựa trên tri thức

- **Cách tiếp cận khai báo (Declarative):**
    - KB rỗng → TELL cho tác nhân từng sự kiện cho đến khi nó biết cách vận hành.
- **Cách tiếp cận thủ tục (Procedural):**
    - Mã hóa hành vi mong muốn trực tiếp vào mã chương trình.
- **Kết hợp:** Một phần tự động.
- **Học (Learning):** (Chương 18) – Tự động hoàn toàn.
    - Cung cấp cho tác nhân các cơ chế tự học.

---

## Thế giới Wumpus

### Mô tả PEAS

- **Môi trường:**
    - Lưới 4×4 ô, tác nhân bắt đầu ở ô [1,1], hướng sang phải.
    - Vị trí của Vàng và Wumpus là ngẫu nhiên.
    - Mỗi ô có thể có hố, xác suất 0.2.
- **Chỉ số hiệu suất:**
    - +1000 nếu mang vàng ra khỏi hang, -1000 nếu chết.
    - -1 mỗi bước, -10 khi dùng cung tên.
    - Kết thúc khi tác nhân chết hoặc trèo ra ngoài.
- **Bộ phận chấp hành:** Tiến, Quay trái/phải 90 độ, Nhặt, Bắn, Leo.
- **Cảm biến:** Mùi hôi, Gió lùa, Lấp lánh, Đụng tường, Tiếng thét.
- **Nhận biết (Percept):** [Mùi, Gió lùa, Không có, Không có, Không có]

---

### Đặc trưng thế giới Wumpus

- Quan sát đầy đủ: KHÔNG – chỉ cảm nhận tại chỗ.
- Xác định: CÓ – kết quả xác định rõ.
- Tập: KHÔNG – theo chuỗi hành động.
- Tĩnh: CÓ – Wumpus và hố không di chuyển.
- Rời rạc: CÓ
- Đơn tác nhân: CÓ – Wumpus chỉ như một đặc điểm tự nhiên.

---

### Khám phá thế giới Wumpus  
(Trang 14-17: Hình minh họa quá trình khám phá, bạn xem trực tiếp slide.)

---

## Logic mệnh đề

### Logic nói chung

- **Mô hình (model/possible world):** Trừu tượng toán học xác định đúng/sai mọi câu liên quan.
    - Ví dụ: tất cả gán giá trị thực cho x và y.
- m thỏa mãn α nếu α đúng trong m.
- M(α): Tập các mô hình của α.

---

### Hệ quả logic (Entailment)

- Một câu suy ra logic từ câu khác: α ⊨ β
    - α ⊨ β nếu và chỉ nếu, trong mọi mô hình mà α đúng, β cũng đúng.
    - Ví dụ:
        - x = 0 ⇒ xy = 0
        - KB: “Táo đỏ”, “Cà chua đỏ” ⇒ “Hoặc táo hoặc cà chua đỏ”
- Hệ quả là quan hệ giữa các câu dựa trên ngữ nghĩa.

---

### Hệ quả logic: Thế giới Wumpus

- Xem xét hai kết luận có thể:
    - α1: “Không có hố ở [2,2].”
    - α2: “Không có hố ở [1,2].”

- KB ⊨ α1  
- KB ⊭ α2

---

### Suy diễn logic

- KB ⊨ₖ α nghĩa là α có thể được suy từ KB bằng thủ tục i.
- **Tính đúng:** Thuật toán suy diễn chỉ ra các câu là hệ quả thực sự của KB.
- **Tính đầy đủ:** Nếu có thể suy ra mọi hệ quả từ KB.
- Nếu KB đúng với thế giới thật, mọi câu α suy từ KB bằng thủ tục đúng cũng đúng với thế giới thật.

---

### Thế giới và biểu diễn

- (Trang 23: Hình vẽ Socrates là người → Socrates là người phàm → Mọi người là người phàm.)

---

### Không truy cập độc lập vào thế giới

- Tác nhân chỉ biết các sự kiện dưới dạng các câu logic.
- Kết luận chỉ dựa trên những gì đã biết – không có truy cập độc lập vào thế giới.
- Do đó, đảm bảo suy luận luôn đúng là rất quan trọng!

---

### Logic mệnh đề: Cú pháp

- **Hằng:** TRUE, FALSE
- **Ký hiệu:** P, Q, P1, W12, ...
- **Kết nối logic:** (xem bảng dưới)
- **Literal:** Câu nguyên tử (P) hoặc phủ định của nó (¬P)

| Tên | Ký hiệu | Nghĩa |
|-----|---------|-------|
| Phủ định | ¬ | NOT |
| Hội | ∧ | AND |
| Tuyển | ∨ | OR |
| Kéo theo | ⇒ | IMPLIES (nếu...thì...) |
| Tương đương | ⇔ | IFF |

---

### Logic mệnh đề: Ngữ nghĩa

- Mỗi mô hình xác định đúng/sai cho từng ký hiệu.
- Ví dụ: m1 = {P12 = false, P21 = false, P31 = true}, có 8 mô hình với 3 biến.
- Quy tắc xác định giá trị đúng/sai cho biểu thức: Quy trình đệ quy đơn giản.
    - Ví dụ: ¬P12 ∧ P21 ∨ P31 = true ∧ true ∨ false = true ∧ true = true.

---

### Một cơ sở tri thức đơn giản (Wumpus)

- Ký hiệu cho từng vị trí [i, j]:
    - Pij: có hố ở [i, j]
    - Wij: có Wumpus ở [i, j]
    - Bij: có gió lùa ở [i, j]
    - Sij: có mùi ở [i, j]
- Một số câu trong KB:
    - R1: ¬P11
    - R2: B11 ⇔ (P12 ∨ P21)
    - R3: B21 ⇔ (P11 ∨ P22 ∨ P31)
    - R4: ¬B11
    - R5: B21

---

### Thủ tục suy luận đơn giản

- Cho: tập các câu KB, và câu α.
- Mục tiêu: trả lời KB ⊨ α?  
    “Có phải KB về mặt ngữ nghĩa kéo theo α không?”
- Trong mọi diễn giải mà các câu KB đúng, α có đúng không?
- Ví dụ: KB ⊨ P12?  
    “Có hố ở [1,2] không?”

---

### Suy luận bằng kiểm tra mô hình (Model checking: liệt kê)

- Kiểm tra α đúng trong mọi mô hình mà KB đúng.
- Ví dụ: KB của Wumpus có 7 ký hiệu → 2⁷ = 128 mô hình.
- Vẽ bảng chân trị để kiểm tra.

---

### Thuật toán kiểm tra mô hình TT-ENTAILS

```python
function TT-ENTAILS?(KB,α) returns true or false
  inputs: KB, knowledge base, a sentence in propositional logic
          α, the query, a sentence in propositional logic
  symbols ← danh sách các ký hiệu xuất hiện trong KB và α
  return TT-CHECK-ALL(KB,α,symbols,{})
function TT-CHECK-ALL(KB,α,symbols,model) returns true or false
  if EMPTY?(symbols) then
    if PL-TRUE?(KB,model) then return PL-TRUE?(α,model)
    else return true // khi KB sai, luôn trả về true
  else do
    P ← FIRST(symbols)
    rest ← REST(symbols)
    return (TT-CHECK-ALL(KB,α,rest,model ∪ {P = true})
            and TT-CHECK-ALL(KB,α,rest,model ∪ {P = false}))
```
> Thuật toán đúng và đầy đủ  
> Độ phức tạp thời gian: O(2ⁿ), bộ nhớ: O(n)

---

### Ví dụ kiểm tra mô hình (Quiz 01)

- Cho KB các luật và sự kiện:
    - R1: Nếu nóng và có khói thì có lửa.
    - R2: Nếu chuông báo động kêu thì có khói.
    - R3: Nếu có lửa thì phun nước.
    - F1: Chuông báo động kêu.
    - F2: Nóng.
- Biểu diễn bằng ký hiệu:
    - H = hot, S = smoky, F = fire, A = alarm_beeps, R = sprinklers_on
- Trả lời câu hỏi “Có phun nước không?” bằng kiểm tra mô hình.

---

## Chứng minh định lý logic mệnh đề

### Chứng minh bằng Resolution  
- Suy diễn tiến (Forward chaining)  
- Suy diễn lùi (Backward chaining)

---

### Phương pháp luật suy luận (Inference rules approach)

- Chứng minh định lý: Áp dụng trực tiếp các luật suy luận lên các câu trong KB để xây dựng chứng minh cho câu mong muốn mà không cần duyệt mô hình.
- Thường hiệu quả hơn kiểm tra mô hình khi số mô hình lớn mà độ dài chứng minh ngắn.

---

### Tương đương logic

- Hai câu α và β tương đương logic nếu chúng đúng trong cùng tập mô hình.
    - α ≡ β khi và chỉ khi α ⊨ β và β ⊨ α

---

### Tính hợp lý (Validity)

- Một câu hợp lý nếu nó đúng trong mọi mô hình (tautology).
    - Ví dụ: P ∨ ¬P, ¬P ⇒ ¬P, (P ∧ P ⇒ Q) ⇒ Q
- Kết nối với suy diễn qua Định lý suy luận: α ⊨ β ⇔ α ⇒ β là hợp lý.

---

### Tính khả thỏa (Satisfiability)

- Một câu khả thỏa nếu nó đúng trong một số mô hình.
    - Ví dụ: P ∨ Q, P
- Không khả thỏa nếu không đúng trong mô hình nào.
    - Ví dụ: P ∧ ¬P
- Kết nối với suy diễn: α ⊨ β ⇔ α ∧ ¬β không khả thỏa  
  (Chứng minh bằng phản chứng)
- Bài toán SAT xác định tính khả thỏa của các câu logic mệnh đề (NP-đầy đủ).

---

### Quiz 02: Kiểm tra hợp lý và khả thỏa

- Kiểm tra hợp lý và khả thỏa các câu sau bằng bảng chân trị:
    1. A ∨ B ⇒ A ∧ C
    2. A ∧ B ⇒ A ∨ C
    3. (A ∨ B) ∧ (¬B ∨ C) ⇒ A ∨ C
    4. (A ∨ ¬B) ⇒ A ∧ B

---

### Suy diễn và chứng minh

- **Chứng minh (Proof):** Một chuỗi kết luận dẫn đến mục tiêu cần chứng minh.
- **Một số luật suy luận đúng:**
    - Modus Ponens:      α ⇒ β, α   →   β
    - Modus Tollens:     α ⇒ β, ¬β  →   ¬α
    - AND-Introduction:  α, β      →   α ∧ β
    - AND-Elimination:   α ∧ β     →   α

---

### Ví dụ luật suy luận

| STT | Câu                                    | Giải thích           |
|-----|----------------------------------------|----------------------|
| 1   | P ∧ Q                                  | Từ KB                |
| 2   | P ⇒ R                                  | Từ KB                |
| 3   | Q ∧ R ⇒ S                              | Từ KB                |
| 4   | P                                      | AND-Elim từ 1        |
| 5   | R                                      | Modus Ponens 4,2     |
| 6   | Q                                      | AND-Elim từ 1        |
| 7   | Q ∧ R                                  | AND-Intro 5,6        |
| 8   | S                                      | Modus Ponens 3,7     |

- KB: P ∧ Q, P ⇒ R, Q ∧ R ⇒ S
- S?

---

### Suy luận trong thế giới Wumpus

- Loại bỏ tương đương (bi-conditional elimination):  
    - B21 ⇔ (P12 ∨ P22 ∨ P31) → (B21 ⇒ P12 ∨ P22 ∨ P31) ∧ (P12 ∨ P22 ∨ P31 ⇒ B21)
- AND-Elimination, De Morgan, Modus Ponens, v.v.

- Ví dụ chứng minh:  
    - ¬P12 từ các luật và cảm nhận.

---

### Chứng minh bằng tìm kiếm

- Có thể dùng thuật toán tìm kiếm để tìm chuỗi bước chứng minh.
- Trạng thái đầu: KB ban đầu.
- Hành động: áp dụng các luật suy luận lên các câu phù hợp.
- Kết quả: thêm câu mới vào KB.
- Mục tiêu: trạng thái chứa câu cần chứng minh.
- Có thể bỏ qua các mệnh đề không liên quan → hiệu quả hơn.

---

### Đơn điệu (Monotonicity)

- Tập các câu hệ quả chỉ tăng khi thêm thông tin vào KB.
    - Nếu KB ⊨ α thì KB ∧ β ⊨ α
- Có thể rút ra thêm kết luận mà không làm mất tính đúng của các kết luận cũ.

---

### Chứng minh bằng Resolution

- Chứng minh bằng luật suy luận: đúng nhưng không đầy đủ.
- Resolution: đúng và đầy đủ, một luật duy nhất.
- Thuật toán đầy đủ khi kết hợp với thuật toán tìm kiếm đầy đủ.
- Luật unit resolution, full resolution.

---

### Dạng chuẩn hội tắc (CNF)

- Resolution chỉ áp dụng cho các mệnh đề dạng OR các literal (clause).
- Convert mọi câu của KB về dạng CNF.
    - Ví dụ: B11 ⇔ (P12 ∨ P21)  
      → (¬B11 ∨ P12 ∨ P21) ∧ (¬P12 ∨ B11) ∧ (¬P21 ∨ B11)

#### **Các bước chuyển về CNF:**
1. Bỏ ⇔: α ⇔ β ≡ (α ⇒ β) ∧ (β ⇒ α)
2. Bỏ ⇒: α ⇒ β ≡ ¬α ∨ β
3. Đưa ¬ vào sâu nhất (luật De Morgan, loại phủ định kép)
4. Phân phối ∨ qua ∧ nếu cần (α ∧ β) ∨ γ ≡ (α ∨ γ) ∧ (β ∨ γ)

---

### Thuật toán Resolution (bằng phản chứng)

- Để chứng minh KB ⊨ α, hãy chứng minh KB ∧ ¬α là không khả thỏa.

```python
function PL-RESOLUTION(KB,α) returns true or false
  clauses ← tập các clause trong CNF của KB ∧ ¬α
  new ← {}
  loop:
    for mỗi cặp clause Ci, Cj trong clauses:
      resolvents ← PL-RESOLVE(Ci, Cj)
      if resolvents chứa mệnh đề rỗng then return true
      new ← new ∪ resolvents
    if new ⊆ clauses then return false
    clauses ← clauses ∪ new
```
- Có thể bỏ những clause luôn đúng.

---

### Quiz 04: Thuật toán Resolution

- Giả thuyết:
    - Nếu mưa, Joe mang dù.
    - Nếu Joe mang dù, Joe không bị ướt.
    - Nếu không mưa, Joe không bị ướt.
- Chứng minh: Joe không bị ướt.

- KB:  
  R ⇒ U  
  U ⇒ ¬W  
  ¬R ⇒ ¬W

- Chuyển về CNF, phủ định mục tiêu W, áp dụng resolution cho đến khi ra mệnh đề rỗng.

---

### Horn clause và Definite clause

- **Definite clause:** OR các literal, chỉ đúng một literal dương.
    - VD: ¬P ∨ ¬Q ∨ R là definite clause; ¬P ∨ Q ∨ R thì không.
- **Horn clause:** OR các literal, nhiều nhất một literal dương.
    - Mọi definite clause đều là Horn clause.
- **Goal clause:** Không có literal dương.
- Horn clause đóng dưới resolution.

---

### Dạng chuẩn Backus (BNF)

- (Trang 56: Không có nội dung cụ thể.)

---

### KB chỉ gồm definite clause

- Mỗi definite clause có thể viết dưới dạng kéo theo.
    - Tiền đề (body): hội các literal dương.
    - Kết luận (head): một literal dương.
    - VD: ¬P ∨ ¬Q ∨ R ≡ P ∧ Q ⇒ R
- Có thể suy luận bằng forward chaining và backward chaining.
- Kiểu inference này là nền tảng của lập trình logic.
- Quyết định hệ quả có thể thực hiện trong thời gian tuyến tính.

---

### So sánh KB: Horn clause vs. CNF clause

- CNF: OR các literal, nhiều literal dương.
- Horn: OR các literal, nhiều nhất một literal dương.

---

## Suy diễn tiến (Forward chaining)

- Ý tưởng: Bắn bất kỳ luật nào mà tiền đề đã thỏa mãn, thêm kết luận vào KB, lặp lại cho đến khi tìm thấy truy vấn.

---

### Thuật toán forward chaining

```python
function PL-FC-ENTAILS?(KB, q) returns true or false
  inputs: KB, tập các definite clause
          q, truy vấn
  count ← bảng đếm số literal trong tiền đề mỗi clause
  inferred ← bảng các biến đã được suy ra hay chưa
  agenda ← hàng đợi các biến đúng (facts)
  while agenda không rỗng:
    p ← POP(agenda)
    if p = q then return true
    if inferred[p] = false then:
      inferred[p] ← true
      for mỗi clause c chứa p trong tiền đề:
        giảm count[c]
        if count[c] = 0 thì thêm kết luận c vào agenda
  return false
```
> Thuật toán đúng và đầy đủ.

---

### Ví dụ forward chaining

- KB:  
    1. A ∧ B ⇒ C  
    2. C ∧ D ⇒ E  
    3. C ∧ F ⇒ G  
    4. A  
    5. B  
    6. D  
    - Suy ra C (1,4,5), E (2,6,7)

---

## Suy diễn lùi (Backward chaining)

- Ý tưởng: Làm ngược lại từ mục tiêu q.
    - Kiểm tra q đã biết chưa, hoặc
    - Đệ quy chứng minh các tiền đề của một luật nào đó mà kết luận là q.
    - Tránh vòng lặp: Một subgoal mới đã nằm trong stack mục tiêu?
    - Tránh lặp lại: Subgoal đã chứng minh hay đã thất bại?

---

### Ví dụ backward chaining  
*(Trang 71-80: Chuỗi ví dụ truy vấn Q? P ⇒ Q, P?, ... v.v. Bạn có thể xem chi tiết trong slide.)*

---

### So sánh forward vs. backward chaining

- **Forward chaining:** Dẫn dắt bởi dữ liệu, tự động, xử lý vô thức.  
    - Nhận diện đối tượng, quyết định thường ngày.
    - Có thể làm nhiều việc không liên quan mục tiêu.
- **Backward chaining:** Dẫn dắt bởi mục tiêu, tốt cho giải quyết vấn đề.
    - Tìm đồ vật bị mất, lập kế hoạch học tiếp.
    - Độ phức tạp có thể nhỏ hơn nhiều so với KB.

---

### Quiz 05: So sánh forward/backward chaining

- KB:  
    - R1: Nếu nóng và có khói thì có lửa
    - R2: Nếu chuông báo động kêu thì có khói
    - R3: Nếu có lửa thì phun nước
    - F1: Chuông báo động kêu
    - F2: Nóng
    - Ký hiệu: H = hot, S = smoky, F = fire, A = alarms_beeps, R = sprinklers_on
- Trả lời “Có phun nước không?” bằng cả hai phương pháp.

---

### Quiz 06: DPLL và DP

- KB:
    - A ⇒ B ∨ C
    - A ⇒ D
    - C ∧ D ⇒ ¬F
    - B ⇒ F
    - A
- Dùng DPLL hoặc DP để kiểm tra KB kéo theo:
    - C?
    - B ⇒ ¬C?

---

## HẾT

---

**Bạn có thể hỏi mình dịch/giải thích từng đoạn nhỏ hơn, hoặc giải bài tập trong slide này bất cứ lúc nào!**