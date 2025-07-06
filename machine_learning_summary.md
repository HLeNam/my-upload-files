# MACHINE LEARNING – BASIC ALGORITHMS

**GV: Bùi Duy Đăng**  
bddang@fit.hcmus.edu.vn

---

## Outline
- Introduction to Machine learning
- ID3 Decision tree
- Naïve Bayesian classification

---

## 1. Introduction to Machine Learning

### **Định nghĩa**
- Machine learning là các cơ chế thích nghi để máy tính có thể học từ kinh nghiệm, học từ ví dụ, và học bằng phép tương tự (analogy).

### **Các loại machine learning:**
- **Supervised learning:** Học từ cặp dữ liệu (input-output).
- **Unsupervised learning:** Học từ dữ liệu không gán nhãn.
- **Semi-supervised learning:** Kết hợp dữ liệu có nhãn và không nhãn.
- **Reinforcement learning:** Học thông qua phần thưởng/phạt khi tương tác với môi trường.

---

## 2. Supervised Learning

### **Định nghĩa:**
- Học một hàm số ánh xạ input thành output dựa trên các ví dụ được gán nhãn.

### **Ví dụ:**
- Phân loại spam email, nhận diện chữ viết tay, dự đoán thời tiết, dự đoán giá cổ phiếu...

### **Classification vs Regression**
- **Classification:** Dự đoán biến rời rạc (ví dụ: loại bệnh, nhãn ảnh)
    - Binary, Multiclass, Multilabel
- **Regression:** Dự đoán biến liên tục (ví dụ: giá nhà, nhiệt độ)

---

## 3. Unsupervised Learning

### **Định nghĩa:**
- Tìm hiểu cấu trúc ẩn trong tập dữ liệu không gán nhãn.

### **Ví dụ:**
- Phân nhóm người dùng mạng xã hội, phân tích cộng đồng

---

## 4. Semi-supervised & Reinforcement Learning

- **Semi-supervised:** Dùng ít dữ liệu gán nhãn + nhiều dữ liệu không nhãn.
- **Reinforcement:** Tác nhân học bằng tương tác, nhận thưởng/phạt từ môi trường.

---

## 5. ID3 Decision Tree

### **Bài toán điển hình:**  
Dự đoán một người có đợi ở nhà hàng không, dựa vào các thuộc tính như: Có lựa chọn khác, có quầy bar, hôm nay thứ sáu, số lượng khách, giá, trời mưa, đã đặt bàn, loại nhà hàng, ước lượng thời gian chờ...

### **Nguyên lý:**
- Chia nhỏ dữ liệu (divide and conquer) bằng cách chọn thuộc tính tốt nhất để phân nhánh, tiếp tục lặp lại cho từng nhánh con.

### **Thuật toán ID3:**
- Nếu các ví dụ cùng nhãn: node lá.
- Nếu hết thuộc tính: node lá theo đa số nhãn.
- Nếu vẫn còn thuộc tính: chọn thuộc tính có **Information Gain** lớn nhất để chia.

### **Entropy và Information Gain:**
- **Entropy:** Đo độ hỗn tạp của tập dữ liệu.
- **Information Gain:** Độ giảm entropy khi chia theo thuộc tính A.

#### **Công thức Entropy:**
```
H(S) = - Σ p(v_k) * log2( p(v_k) )
```
Trong đó, v_k là từng giá trị nhãn.

#### **Công thức Information Gain:**
```
IG(A, S) = H(S) - AE(A)
```
Với AE(A) là entropy trung bình của thuộc tính A.

### **Ví dụ thực hành:**
- Cho bảng dữ liệu, tính entropy tổng, entropy từng thuộc tính, chọn thuộc tính chia đầu tiên.

---

## 6. Naïve Bayesian Classification

### **Nguyên lý:**
- Áp dụng định lý Bayes:  
```
P(H|X) = P(X|H) * P(H) / P(X)
```
- Với giả định các thuộc tính độc lập có điều kiện.

### **Công thức phân loại Naïve Bayes:**
```
P(Ci|X) = P(Ci) * Π P(xk|Ci)
```
- Chọn class có xác suất lớn nhất.
- P(Ci) là xác suất tiên nghiệm của class.
- P(xk|Ci) là xác suất thuộc tính xk xuất hiện trong class Ci.

### **Ví dụ thực hành:**
- Tính xác suất file nhiễm virus dựa trên bảng thuộc tính (Writable, Updated, Size, Class).
- Xử lý trường hợp xác suất bằng 0 bằng Laplacian correction.

---

## 7. Quiz & Practice

### **Quiz 01: ID3 Decision Tree**
- Cho bảng thuộc tính file (Writable, Updated, Size, Class), hãy xây dựng cây quyết định phân loại file “Infected” hoặc “Clean”.

### **Quiz 02: Naïve Bayesian Classification**
- Cho bảng thuộc tính file, hãy tính xác suất file bị nhiễm hoặc sạch bằng công thức Naïve Bayes, với và không với Laplacian correction.

---

## 8. Đánh giá, Ưu nhược điểm

### **Naïve Bayes**
- **Ưu:** Dễ thực hiện, kết quả tốt với nhiều bài toán thực tế.
- **Nhược:** Giả định các thuộc tính độc lập – thường không đúng với thực tế.

### **Decision Tree**
- **Ưu:** Dễ hiểu, trực quan, không yêu cầu giả định thuộc tính độc lập.
- **Nhược:** Dễ overfit nếu cây quá sâu, nhạy cảm với nhiễu/thiếu dữ liệu.

---

**Tham khảo:**  
- Russell & Norvig, Artificial Intelligence: A Modern Approach (AIMA, 3rd edition)
- Maria-Florina Balcan, Introduction to Machine Learning, CMU
- Ryan Urbanowicz, University of Pennsylvania

---