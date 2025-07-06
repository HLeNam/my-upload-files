# **FIRST-ORDER LOGIC (FOL) - BỘ TÀI LIỆU HỌC TẬP HOÀN CHỈNH**

---

## **📚 MỤC LỤC**

**PHẦN I: CƠ SỞ LÝ THUYẾT**
1. Giới thiệu First-Order Logic
2. Syntax và Semantics
3. Objects, Relations, Functions
4. Models và Interpretation
5. Quantifiers và Equality

**PHẦN II: VIẾT CÂU FOL**
6. Case Studies: Kinship Domain
7. Set Domain và Wumpus World
8. Bài tập viết câu FOL

**PHẦN III: SỬY LUẬN FOL**
9. Universal/Existential Instantiation
10. Unification và Lifting
11. Forward Chaining
12. Backward Chaining
13. Resolution

**PHẦN IV: BÀI TẬP TỔNG HỢP**
14. Bài tập từ cơ bản đến nâng cao

---

# **PHẦN I: CƠ SỞ LÝ THUYẾT**

## **1. Giới thiệu First-Order Logic**

### **So sánh Propositional Logic vs First-Order Logic**

| Khía cạnh | Propositional Logic | First-Order Logic |
|-----------|-------------------|------------------|
| **Ontological Commitment** | Facts | Facts, Objects, Relations |
| **Epistemological Commitment** | True/False/Unknown | True/False/Unknown |
| **Expressive Power** | Hạn chế | Mạnh mẽ |
| **Example** | P₁,₁, P₁,₂ | Pit(x,y), Adjacent(x,y) |

### **Vấn đề của Propositional Logic**

**Ví dụ:** "Pits cause breezes in adjacent squares"

**Propositional Logic:**
```
B₁,₁ ⇔ P₁,₂ ∨ P₂,₁
B₁,₂ ⇔ P₁,₁ ∨ P₁,₃ ∨ P₂,₂
B₂,₁ ⇔ P₁,₁ ∨ P₂,₂ ∨ P₃,₁
...
```
**→ Phải viết từng câu cho mỗi ô!**

**First-Order Logic:**
```
∀s Breezy(s) ⇔ ∃r Adjacent(r,s) ∧ Pit(r)
```
**→ Một câu duy nhất cho toàn bộ thế giới!**

---

## **2. Syntax và Semantics**

### **Các thành phần cơ bản**

#### **A. Constant Symbols (Ký hiệu hằng)**
- Đại diện cho các objects cụ thể
- **Ví dụ:** Richard, John, VietNam, 5

#### **B. Predicate Symbols (Ký hiệu vị từ)**  
- Đại diện cho relations
- **Unary:** Person(x), King(x)
- **Binary:** Brother(x,y), Loves(x,y)
- **n-ary:** Between(x,y,z)

#### **C. Function Symbols (Ký hiệu hàm)**
- Đại diện cho functions
- **Ví dụ:** Father(x), LeftLeg(x), Plus(x,y)

#### **D. Variables (Biến)**
- **Ví dụ:** x, y, z

### **Terms (Hạng từ)**

**Định nghĩa:**
```
Term = Constant | Variable | Function(term₁,...,termₙ)
```

**Ví dụ:**
- **Simple terms:** John, x
- **Complex terms:** Father(John), LeftLeg(Richard)
- **Ground terms:** Father(John) (không có biến)

### **Atomic Sentences (Câu nguyên tử)**

**Cú pháp:**
```
Atomic sentence = Predicate(term₁,...,termₙ)
```

**Ví dụ:**
- Brother(Richard, John)
- Married(Father(Richard), Mother(John))

### **Complex Sentences (Câu phức)**

**Sử dụng logical connectives:**
- ¬Brother(LeftLeg(Richard), John)
- Brother(Richard,John) ∧ Brother(John,Richard)
- King(Richard) ∨ King(John)

---

## **3. Models và Interpretation**

### **Model cho FOL**

**Một model bao gồm:**
1. **Domain** - Tập hợp các objects
2. **Relations** - Quan hệ giữa các objects  
3. **Functions** - Ánh xạ từ objects đến objects

### **Ví dụ concrete**

**Domain:** 5 objects
- Richard the Lionheart
- King John  
- Richard's left leg
- John's left leg
- A crown

**Relations:**
- **Brother:** {⟨Richard, John⟩, ⟨John, Richard⟩}
- **OnHead:** {⟨Crown, John⟩}

**Functions:**
- **LeftLeg:** Richard → Richard's left leg, John → John's left leg

### **Interpretation (Diễn giải)**

**Cách hiểu các symbols:**
- **Richard** → Richard the Lionheart
- **John** → King John
- **Brother(x,y)** → brotherhood relation
- **LeftLeg(x)** → left leg function

---

## **4. Quantifiers (Lượng từ)**

### **Universal Quantification (∀)**

**Syntax:** ∀x P(x)

**Ý nghĩa:** P(x) đúng với mọi object x trong domain

**Ví dụ:**
```
∀x King(x) ⇒ Person(x)    "All kings are persons"
∀x Student(x,FIT) ⇒ Smart(x)    "Students of FIT are smart"
```

**Tương đương với conjunction:**
```
Student(Lan,FIT) ⇒ Smart(Lan) ∧
Student(Tuan,FIT) ⇒ Smart(Tuan) ∧ ...
```

### **Existential Quantification (∃)**

**Syntax:** ∃x P(x)

**Ý nghĩa:** P(x) đúng với ít nhất một object x trong domain

**Ví dụ:**
```
∃x Student(x,FIT) ∧ Smart(x)    "Some FIT students are smart"
```

**Tương đương với disjunction:**
```
Student(Lan,FIT) ∧ Smart(Lan) ∨
Student(Tuan,FIT) ∧ Smart(Tuan) ∨ ...
```

### **Lỗi thường gặp**

#### **Lỗi 1: Dùng ∧ với ∀**
```
❌ ∀x Student(x,FIT) ∧ Smart(x)
```
**Nghĩa:** "Everyone is a FIT student AND everyone is smart"

#### **Lỗi 2: Dùng ⇒ với ∃**
```
❌ ∃x Student(x,FIT) ⇒ Smart(x)  
```
**Nghĩa:** Đúng ngay cả khi có người không phải sinh viên FIT

### **Nested Quantifiers**

**Thứ tự quantifiers rất quan trọng:**

```
∀x∃y Loves(x,y)    "Everybody loves somebody"
∃x∀y Loves(y,x)    "There is someone loved by everyone"
```

### **Duality Rules**

```
∀x Likes(x,IceCream) ≡ ¬∃x ¬Likes(x,IceCream)
∃x Likes(x,Broccoli) ≡ ¬∀x ¬Likes(x,Broccoli)
```

---

## **5. Equality Symbol (=)**

### **Ý nghĩa**
```
term₁ = term₂
```
**Đúng khi term₁ và term₂ tham chiếu đến cùng một object**

### **Ví dụ**
```
Father(John) = Henry    "Cha của John là Henry"
∃x,y Brother(x,Richard) ∧ Brother(y,Richard) ∧ ¬(x = y)
```
**Nghĩa:** "Richard có ít nhất hai anh em"

---

# **PHẦN II: VIẾT CÂU FOL**

## **6. Case Study: Kinship Domain**

### **Predicates và Functions**

**Unary predicates:** Male(x), Female(x)
**Binary predicates:** Parent(x,y), Sibling(x,y), Spouse(x,y)
**Functions:** Mother(x), Father(x)

### **Axioms (Tiên đề)**

#### **Axiom 1: Mother definition**
```
∀m,c Mother(c) = m ⇔ Female(m) ∧ Parent(m,c)
```

#### **Axiom 2: Husband definition**
```
∀w,h Husband(h,w) ⇔ Male(h) ∧ Spouse(h,w)
```

#### **Axiom 3: Gender exclusivity**
```
∀x Male(x) ⇔ ¬Female(x)
```

#### **Axiom 4: Parent-Child inverse**
```
∀p,c Parent(p,c) ⇔ Child(c,p)
```

#### **Axiom 5: Grandparent definition**
```
∀g,c Grandparent(g,c) ⇔ ∃p Parent(g,p) ∧ Parent(p,c)
```

#### **Axiom 6: Sibling definition**
```
∀x,y Sibling(x,y) ⇔ ¬(x = y) ∧ ∃p Parent(p,x) ∧ Parent(p,y)
```

### **Theorems (Định lý)**

```
∀x,y Sibling(x,y) ⇔ Sibling(y,x)    "Sibling relation is symmetric"
```

---

## **7. Wumpus World Example**

### **Input-Output**

**Percept sentence:**
```
Percept([Stench, Breeze, Glitter, None, None], 5)
```

**Query:**
```
ASKVARS(∃a BestAction(a,5))    Returns: {a/Grab}
```

### **KB Rules**

#### **Perception rules**
```
∀t,s,g,m,c Percept([s,Breeze,g,m,c],t) ⇒ Breeze(t)
∀t,s,b,m,c Percept([s,b,Glitter,m,c],t) ⇒ Glitter(t)
```

#### **Reflex rules**
```
∀t Glitter(t) ⇒ BestAction(Grab,t)
```

#### **Environment definition**
```
∀x,y,a,b Adjacent([x,y],[a,b]) ⇔ 
    (x=a ∧ (y=b-1 ∨ y=b+1)) ∨ (y=b ∧ (x=a-1 ∨ x=a+1))
```

#### **Hidden properties**
```
∀s,t At(Agent,s,t) ∧ Breeze(t) ⇒ Breezy(s)
∀s Breezy(s) ⇔ ∃r Adjacent(r,s) ∧ Pit(r)
```

---

## **8. Bài tập viết câu FOL**

### **🎯 Quiz 1: Basic FOL Writing**

**Predicates:**
- Student(x): "x is student"
- Smart(x): "x is smart"  
- Loves(x,y): "x loves y"

**Viết các câu sau bằng FOL:**

1. **All students are smart**
2. **There exists a smart student**
3. **Every student loves some students**
4. **Every student loves some other students**
5. **There is a student who is loved by every other student**

### **💡 Đáp án Quiz 1:**

1. `∀x Student(x) ⇒ Smart(x)`
2. `∃x Student(x) ∧ Smart(x)`
3. `∀x Student(x) ⇒ ∃y Student(y) ∧ Loves(x,y)`
4. `∀x Student(x) ⇒ ∃y Student(y) ∧ ¬(x=y) ∧ Loves(x,y)`
5. `∃x Student(x) ∧ ∀y (Student(y) ∧ ¬(x=y)) ⇒ Loves(y,x)`

---

# **PHẦN III: SUY LUẬN FOL**

## **9. Universal/Existential Instantiation**

### **Universal Instantiation (UI)**

**Rule:**
```
∀v α
─────────
SUBST({v/g}, α)
```

**Ví dụ:**
```
∀x King(x) ∧ Greedy(x) ⇒ Evil(x)
────────────────────────────────────
King(John) ∧ Greedy(John) ⇒ Evil(John)    {x/John}
King(Richard) ∧ Greedy(Richard) ⇒ Evil(Richard)    {x/Richard}
```

### **Existential Instantiation (EI)**

**Rule:**
```
∃v α
─────────
SUBST({v/k}, α)
```
**Với k là Skolem constant chưa xuất hiện trong KB**

**Ví dụ:**
```
∃x Crown(x) ∧ OnHead(x,John)
────────────────────────────
Crown(C₁) ∧ OnHead(C₁,John)
```

**Lưu ý:**
- **UI:** Có thể áp dụng nhiều lần
- **EI:** Chỉ áp dụng một lần, sau đó loại bỏ câu gốc

---

## **10. Unification và Lifting**

### **Unification Problem**

**Mục tiêu:** Tìm substitution θ sao cho SUBST(θ,p) = SUBST(θ,q)

**Ký hiệu:** UNIFY(p,q) = θ

### **Ví dụ Unification**

| p | q | θ |
|---|---|---|
| Knows(John,x) | Knows(John,Jane) | {x/Jane} |
| Knows(John,x) | Knows(y,Steve) | {x/Steve, y/John} |
| Knows(John,x) | Knows(y,Mother(y)) | {x/Mother(John), y/John} |
| Knows(John,x) | Knows(x,Steve) | **fail** |

### **Most General Unifier (MGU)**

**Ví dụ:**
```
UNIFY(Knows(John,x), Knows(y,z))
```

**Possible unifiers:**
1. θ₁ = {y/John, x/z}
2. θ₂ = {y/John, x/John, z/John}

**MGU = θ₁** (general hơn)

### **🎯 Quiz 2: Find MGU**

| ω₁ | ω₂ | MGU |
|----|----|-----|
| P(f(A),g(x)) | P(y,y) | ? |
| P(A,x,h(g(z))) | P(z,h(y),h(y)) | ? |
| P(x,f(x),z) | P(g(y),f(g(b)),y) | ? |
| P(x,f(x)) | P(f(y),y) | ? |

### **💡 Đáp án Quiz 2:**

1. **P(f(A),g(x)), P(y,y):** {y/f(A), x/A}
2. **P(A,x,h(g(z))), P(z,h(y),h(y)):** {z/A, x/h(g(A)), y/g(A)}
3. **P(x,f(x),z), P(g(y),f(g(b)),y):** {x/g(b), y/b, z/b}
4. **P(x,f(x)), P(f(y),y):** **No MGU** (occur check fails)

### **Generalized Modus Ponens (GMP)**

**Rule:**
```
p₁', p₂', ..., pₙ', (p₁ ∧ p₂ ∧ ... ∧ pₙ ⇒ q)
─────────────────────────────────────────────
SUBST(θ, q)
```

**Với θ sao cho SUBST(θ,pᵢ') = SUBST(θ,pᵢ) cho mọi i**

---

## **11. Forward Chaining**

### **First-Order Definite Clause**

**Định nghĩa:** Clause có đúng một literal positive

**Dạng:**
- **Atomic:** King(John)
- **Implication:** King(x) ∧ Greedy(x) ⇒ Evil(x)

### **Forward Chaining Algorithm**

```
function FOL-FC-ASK(KB, α) returns substitution or false
    repeat until new is empty
        new ← {}
        for each rule in KB do
            (p₁ ∧ ... ∧ pₙ ⇒ q) ← STANDARDIZE-VARIABLES(rule)
            for each θ such that SUBST(θ, p₁ ∧ ... ∧ pₙ) = 
                                SUBST(θ, p₁' ∧ ... ∧ pₙ') for some p₁',...,pₙ' in KB
                q' ← SUBST(θ, q)
                if q' does not unify with some sentence in KB or new then
                    add q' to new
                    φ ← UNIFY(q', α)
                    if φ is not fail then return φ
        add new to KB
    return false
```

### **Ví dụ Forward Chaining**

**KB:**
```
American(x) ∧ Weapon(y) ∧ Sells(x,y,z) ∧ Hostile(z) ⇒ Criminal(x)
Missile(x) ∧ Owns(Nono,x) ⇒ Sells(West,x,Nono)  
Missile(x) ⇒ Weapon(x)
Enemy(x,America) ⇒ Hostile(x)
American(West)
Owns(Nono,M₁)
Missile(M₁)
Enemy(Nono,America)
```

**Query:** Criminal(West)

**Forward Chaining Process:**

**Iteration 1:**
- From Missile(M₁) + Rule3: **Weapon(M₁)**
- From Enemy(Nono,America) + Rule4: **Hostile(Nono)**
- From Missile(M₁) ∧ Owns(Nono,M₁) + Rule2: **Sells(West,M₁,Nono)**

**Iteration 2:**
- From American(West) ∧ Weapon(M₁) ∧ Sells(West,M₁,Nono) ∧ Hostile(Nono) + Rule1: **Criminal(West)** ✅

### **🎯 Quiz 3: Forward Chaining**

**KB:**
```
1. Parent(x,y) ∧ Male(x) ⇒ Father(x,y)
2. Father(x,y) ∧ Father(x,z) ⇒ Sibling(y,z)  
3. Parent(Tom,John)
4. Male(Tom)
5. Parent(Tom,Fred)
```

**Thực hiện Forward Chaining đến fixed point**

### **💡 Đáp án Quiz 3:**

**Iteration 1:**
- Rule1 + Facts 3,4: **Father(Tom,John)** (θ = {x/Tom, y/John})
- Rule1 + Facts 4,5: **Father(Tom,Fred)** (θ = {x/Tom, y/Fred})

**Iteration 2:**  
- Rule2 + Father(Tom,John) + Father(Tom,Fred): **Sibling(John,Fred)** (θ = {x/Tom, y/John, z/Fred})
- Rule2 + Father(Tom,Fred) + Father(Tom,John): **Sibling(Fred,John)** (θ = {x/Tom, y/Fred, z/John})

**Fixed point reached:** {Father(Tom,John), Father(Tom,Fred), Sibling(John,Fred), Sibling(Fred,John)}

---

## **12. Backward Chaining**

### **Backward Chaining Algorithm**

```
function FOL-BC-ASK(KB, query) returns generator of substitutions
    return FOL-BC-OR(KB, query, {})

generator FOL-BC-OR(KB, goal, θ) yields substitution
    for each rule (lhs ⇒ rhs) in FETCH-RULES-FOR-GOAL(KB, goal) do
        (lhs, rhs) ← STANDARDIZE-VARIABLES((lhs, rhs))
        for each θ' in FOL-BC-AND(KB, lhs, UNIFY(rhs, goal, θ)) do
            yield θ'

generator FOL-BC-AND(KB, goals, θ) yields substitution
    if θ = failure then return
    else if LENGTH(goals) = 0 then yield θ
    else do
        first, rest ← FIRST(goals), REST(goals)
        for each θ' in FOL-BC-OR(KB, SUBST(θ, first), θ) do
            for each θ'' in FOL-BC-AND(KB, rest, θ') do
                yield θ''
```

### **Ví dụ Backward Chaining**

**KB:** (Same as Forward Chaining example)
**Query:** Criminal(x)

**Backward Chaining Tree:**

```
Criminal(x)
    ↓ (Rule1)
American(x) ∧ Weapon(y) ∧ Sells(x,y,z) ∧ Hostile(z)
    ↓ (Unify x/West)
American(West) ∧ Weapon(y) ∧ Sells(West,y,z) ∧ Hostile(z)
    ↓ (American(West) ✓)
Weapon(y) ∧ Sells(West,y,z) ∧ Hostile(z)
    ↓ (Rule3: Missile(y) ⇒ Weapon(y))
Missile(y) ∧ Sells(West,y,z) ∧ Hostile(z)
    ↓ (Unify y/M₁)
Missile(M₁) ∧ Sells(West,M₁,z) ∧ Hostile(z)
    ↓ (Missile(M₁) ✓)
Sells(West,M₁,z) ∧ Hostile(z)
    ↓ (Rule2: Missile(M₁) ∧ Owns(Nono,M₁) ⇒ Sells(West,M₁,Nono))
Missile(M₁) ∧ Owns(Nono,M₁) ∧ Hostile(Nono)
    ↓ (Missile(M₁) ✓, Owns(Nono,M₁) ✓)
Hostile(Nono)
    ↓ (Rule4: Enemy(Nono,America) ⇒ Hostile(Nono))
Enemy(Nono,America)
    ↓ (Enemy(Nono,America) ✓)
SUCCESS: θ = {x/West}
```

### **🎯 Quiz 4: Backward Chaining**

**KB:** (Same as Quiz 3)

**Queries:**
1. Parent(Tom,x)
2. Father(Tom,s)  
3. Father(f,s)
4. Sibling(a,b)

### **💡 Đáp án Quiz 4:**

**Query 1: Parent(Tom,x)**
- Direct facts: Parent(Tom,John), Parent(Tom,Fred)
- **Answers:** {x/John}, {x/Fred}

**Query 2: Father(Tom,s)**
- Goal: Parent(Tom,s) ∧ Male(Tom)
- Parent(Tom,s): {s/John}, {s/Fred}
- Male(Tom): ✓
- **Answers:** {s/John}, {s/Fred}

**Query 3: Father(f,s)**
- Goal: Parent(f,s) ∧ Male(f)
- Only facts: Parent(Tom,John), Parent(Tom,Fred), Male(Tom)
- **Answer:** {f/Tom, s/John}, {f/Tom, s/Fred}

**Query 4: Sibling(a,b)**
- Goal: Father(x,a) ∧ Father(x,b)
- Need to derive Father facts first
- **Answer:** {a/John, b/Fred}, {a/Fred, b/John}

---

## **13. Resolution**

### **CNF Conversion Process**

**Bước 1:** Eliminate implications
```
∀x (Animal(y) ⇒ Loves(x,y)) ⇒ ∃y Loves(y,x)
↓
∀x ¬∀y (¬Animal(y) ∨ Loves(x,y)) ∨ ∃y Loves(y,x)
```

**Bước 2:** Move ¬ inwards
```
∀x ∃y ¬(¬Animal(y) ∨ Loves(x,y)) ∨ ∃z Loves(z,x)
↓
∀x ∃y (Animal(y) ∧ ¬Loves(x,y)) ∨ ∃z Loves(z,x)
```

**Bước 3:** Standardize variables
```
∀x ∃y (Animal(y) ∧ ¬Loves(x,y)) ∨ ∃z Loves(z,x)
```

**Bước 4:** Skolemize
```
∀x (Animal(F(x)) ∧ ¬Loves(x,F(x))) ∨ Loves(G(x),x)
```

**Bước 5:** Drop universal quantifiers
```
(Animal(F(x)) ∧ ¬Loves(x,F(x))) ∨ Loves(G(x),x)
```

**Bước 6:** Distribute ∨ over ∧
```
(Animal(F(x)) ∨ Loves(G(x),x)) ∧ (¬Loves(x,F(x)) ∨ Loves(G(x),x))
```

### **Resolution Rule**

```
l₁ ∨ ... ∨ lₖ    m₁ ∨ ... ∨ mₙ
─────────────────────────────────
SUBST(θ, l₁ ∨ ... ∨ lₖ₋₁ ∨ lₖ₊₁ ∨ ... ∨ lₖ ∨ m₁ ∨ ... ∨ mⱼ₋₁ ∨ mⱼ₊₁ ∨ ... ∨ mₙ)
```

**Với UNIFY(lₖ, ¬mⱼ) = θ**

### **Ví dụ Resolution**

```
Animal(F(x)) ∨ Loves(G(x),x)
¬Loves(u,v) ∨ ¬Kills(u,v)
─────────────────────────────────
Animal(F(x)) ∨ ¬Kills(G(x),x)
```

**Với θ = {u/G(x), v/x}**

### **🎯 Quiz 5: Resolution**

**KB:**
```
Anyone whom Mary loves is a football star.
Any student who does not pass does not play.
John is a student.
Any student who does not study does not pass.
Anyone who does not play is not a football star.
```

**Prove:** If John does not study, Mary does not love John.

**Predicates:**
- Loves(x,y), Star(x), Student(x), Pass(x), Play(x), Study(x)

### **💡 Đáp án Quiz 5:**

**Bước 1: Viết KB bằng FOL**
```
1. ∀x Loves(Mary,x) ⇒ Star(x)
2. ∀x Student(x) ∧ ¬Pass(x) ⇒ ¬Play(x)  
3. Student(John)
4. ∀x Student(x) ∧ ¬Study(x) ⇒ ¬Pass(x)
5. ∀x ¬Play(x) ⇒ ¬Star(x)
```

**Goal:** ¬Study(John) ⇒ ¬Loves(Mary,John)

**Bước 2: Chuyển về CNF**
```
1. ¬Loves(Mary,x) ∨ Star(x)
2. ¬Student(x) ∨ Pass(x) ∨ ¬Play(x)
3. Student(John)  
4. ¬Student(x) ∨ Study(x) ∨ ¬Pass(x)
5. Play(x) ∨ ¬Star(x)
```

**Bước 3: Thêm phủ định goal**
```
6. ¬Study(John)        (assumption)
7. Loves(Mary,John)    (negation of conclusion)
```

**Bước 4: Resolution**
```
Resolution 1: (3) + (4) + (6)
Student(John) + ¬Student(John) ∨ Study(John) ∨ ¬Pass(John) + ¬Study(John)
→ ¬Pass(John)

Resolution 2: ¬Pass(John) + (2) + (3)  
¬Pass(John) + ¬Student(John) ∨ Pass(John) ∨ ¬Play(John) + Student(John)
→ ¬Play(John)

Resolution 3: ¬Play(John) + (5)
¬Play(John) + Play(John) ∨ ¬Star(John)  
→ ¬Star(John)

Resolution 4: ¬Star(John) + (1) + (7)
¬Star(John) + ¬Loves(Mary,John) ∨ Star(John) + Loves(Mary,John)
→ ⊥
```

**Kết luận:** Có mâu thuẫn → KB ∪ {¬Study(John), Loves(Mary,John)} không thỏa mãn
**→ KB ⊨ (¬Study(John) ⇒ ¬Loves(Mary,John))** ✅

---

# **PHẦN IV: BÀI TẬP TỔNG HỢP**

## **Bài 1: Viết câu FOL cơ bản**

### **Predicates:**
- Person(x), Student(x), Professor(x), Course(x)
- Teaches(x,y), Takes(x,y), Likes(x,y)

### **Viết các câu sau:**

1. Every professor teaches some course
2. Some student takes every course  
3. No student likes all professors
4. Every professor likes some student who takes their course
5. If a student takes a course, then some professor teaches that course

### **Đáp án Bài 1:**

1. `∀x Professor(x) ⇒ ∃y Course(y) ∧ Teaches(x,y)`
2. `∃x Student(x) ∧ ∀y Course(y) ⇒ Takes(x,y)`
3. `¬∃x Student(x) ∧ ∀y Professor(y) ⇒ Likes(x,y)`
4. `∀x Professor(x) ⇒ ∃y Student(y) ∧ ∃z Course(z) ∧ Teaches(x,z) ∧ Takes(y,z) ∧ Likes(x,y)`
5. `∀x,y Student(x) ∧ Course(y) ∧ Takes(x,y) ⇒ ∃z Professor(z) ∧ Teaches(z,y)`

---

## **Bài 2: Unification nâng cao**

### **Tìm MGU cho các cặp sau:**

1. P(x, f(y), g(x,a)) và P(f(z), f(f(w)), g(f(z),a))
2. Q(x, f(x,y), z) và Q(f(a), f(f(a),b), b)  
3. R(x, y, f(x)) và R(f(y), x, z)
4. S(f(x,g(y)), z) và S(w, f(a,b))

### **Đáp án Bài 2:**

1. **{x/f(z), y/f(w), z/f(w)}**
2. **{x/f(a), y/b, z/b}**  
3. **{x/f(f(z)), y/f(z)}**
4. **{w/f(x,g(y)), z/f(a,b), x/a, y/b}**

---

## **Bài 3: Forward vs Backward Chaining**

### **KB:**
```
1. Mammal(x) ∧ Carnivore(x) ⇒ Predator(x)
2. Mammal(x) ∧ HasHair(x) ⇒ WarmBlooded(x)
3. Predator(x) ∧ Fast(x) ⇒ Dangerous(x)
4. Mammal(Lion)
5. Carnivore(Lion)  
6. HasHair(Lion)
7. Fast(Lion)
```

### **Câu hỏi:**
1. Thực hiện Forward Chaining đến fixed point
2. Dùng Backward Chaining chứng minh Dangerous(Lion)
3. Dùng Backward Chaining tìm tất cả x sao cho WarmBlooded(x)

### **Đáp án Bài 3:**

#### **Forward Chaining:**

**Iteration 1:**
- Rule1 + Facts 4,5: **Predator(Lion)**
- Rule2 + Facts 4,6: **WarmBlooded(Lion)**

**Iteration 2:**
- Rule3 + Predator(Lion) + Fact 7: **Dangerous(Lion)**

**Fixed point:** {Predator(Lion), WarmBlooded(Lion), Dangerous(Lion)}

#### **Backward Chaining - Dangerous(Lion):**

```
Dangerous(Lion)
    ↓ (Rule3)
Predator(Lion) ∧ Fast(Lion)
    ↓ (Fast(Lion) ✓)
Predator(Lion)
    ↓ (Rule1)
Mammal(Lion) ∧ Carnivore(Lion)
    ↓ (Both facts ✓)
SUCCESS
```

#### **Backward Chaining - WarmBlooded(x):**

```
WarmBlooded(x)
    ↓ (Rule2)
Mammal(x) ∧ HasHair(x)
    ↓ (Facts)
x = Lion ✓
```

**Answer:** {x/Lion}

---

## **Bài 4: Resolution tổng hợp**

### **Problem:**
```
Everyone who is a student and studies hard passes their exams.
Anyone who passes their exams and is smart gets good grades.
John is a student.
John studies hard.
John is smart.
All students who get good grades are happy.
```

**Prove:** John is happy.

### **Predicates:**
- Student(x), StudiesHard(x), Passes(x), Smart(x), GoodGrades(x), Happy(x)

### **Đáp án Bài 4:**

**Bước 1: KB trong CNF**
```
1. ¬Student(x) ∨ ¬StudiesHard(x) ∨ Passes(x)
2. ¬Passes(x) ∨ ¬Smart(x) ∨ GoodGrades(x)  
3. Student(John)
4. StudiesHard(John)
5. Smart(John)
6. ¬Student(x) ∨ ¬GoodGrades(x) ∨ Happy(x)
7. ¬Happy(John)    (negation of goal)
```

**Bước 2: Resolution**
```
Resolution 1: (3) + (4) + (1)
→ Passes(John)

Resolution 2: Passes(John) + (5) + (2)  
→ GoodGrades(John)

Resolution 3: (3) + GoodGrades(John) + (6)
→ Happy(John)

Resolution 4: Happy(John) + (7)
→ ⊥
```

**Kết luận:** KB ⊨ Happy(John) ✅

---

## **Bài 5: Tổng hợp tất cả kỹ thuật**

### **Domain: Family Relations**

**KB:**
```
1. ∀x,y Parent(x,y) ⇒ Older(x,y)
2. ∀x,y,z Parent(x,y) ∧ Parent(y,z) ⇒ Grandparent(x,z)
3. ∀x,y Parent(x,y) ∧ Male(x) ⇒ Father(x,y)
4. ∀x,y,z Father(x,y) ∧ Father(x,z) ∧ ¬(y=z) ⇒ Sibling(y,z)
5. ∀x,y Sibling(x,y) ⇒ Sibling(y,x)
6. Parent(Tom,John)
7. Parent(John,Mary)  
8. Parent(Tom,Alice)
9. Male(Tom)
10. Male(John)
```

### **Câu hỏi:**
1. **Forward Chaining:** Tìm tất cả facts có thể suy ra
2. **Backward Chaining:** Chứng minh Grandparent(Tom,Mary)
3. **Resolution:** Chứng minh ∃x Sibling(John,x)
4. **Unification:** Tìm tất cả x sao cho Older(Tom,x)

### **Đáp án Bài 5:**

#### **1. Forward Chaining:**

**Iteration 1:**
- Rule1 + Fact6: **Older(Tom,John)**
- Rule1 + Fact7: **Older(John,Mary)**  
- Rule1 + Fact8: **Older(Tom,Alice)**
- Rule3 + Fact6,9: **Father(Tom,John)**
- Rule3 + Fact7,10: **Father(John,Mary)**
- Rule3 + Fact8,9: **Father(Tom,Alice)**

**Iteration 2:**
- Rule2 + Fact6,7: **Grandparent(Tom,Mary)**
- Rule4 + Father(Tom,John) + Father(Tom,Alice): **Sibling(John,Alice)**

**Iteration 3:**
- Rule5 + Sibling(John,Alice): **Sibling(Alice,John)**

**All derived facts:** {Older(Tom,John), Older(John,Mary), Older(Tom,Alice), Father(Tom,John), Father(John,Mary), Father(Tom,Alice), Grandparent(Tom,Mary), Sibling(John,Alice), Sibling(Alice,John)}

#### **2. Backward Chaining - Grandparent(Tom,Mary):**

```
Grandparent(Tom,Mary)
    ↓ (Rule2)
Parent(Tom,y) ∧ Parent(y,Mary)
    ↓ (Parent(John,Mary) ✓)
Parent(Tom,John)
    ↓ (Fact6 ✓)
SUCCESS: θ = {y/John}
```

#### **3. Resolution - ∃x Sibling(John,x):**

**CNF + Negation:**
```
...all rules in CNF...
¬Sibling(John,x) for all x    (negation of goal)
```

**Resolution derives Sibling(John,Alice), leading to contradiction**

#### **4. Unification - Older(Tom,x):**

**From Forward Chaining results:**
- Older(Tom,John): {x/John}
- Older(Tom,Alice): {x/Alice}

**Answers:** {x/John}, {x/Alice}

---

## **📝 TÓM TẮT CHÍNH**

### **🎯 So sánh các phương pháp suy luận:**

| Phương pháp | Ưu điểm | Nhược điểm | Ứng dụng |
|-------------|---------|------------|----------|
| **Forward Chaining** | Tìm tất cả kết luận | Có thể lãng phí | Data mining, Expert systems |
| **Backward Chaining** | Tập trung vào goal | Có thể bỏ sót | Logic programming, Theorem proving |
| **Resolution** | Hoàn chỉnh và đúng | Phức tạp với quantifiers | Automated theorem proving |

### **🔑 Những điểm quan trọng:**

1. **FOL mạnh hơn Propositional Logic** về khả năng biểu diễn
2. **Unification** là cốt lõi của suy luận FOL  
3. **Quantifiers** phải được sử dụng cẩn thận
4. **CNF conversion** cần thiết cho Resolution
5. **Skolemization** loại bỏ existential quantifiers

### **🚀 Lộ trình học:**

1. **Nắm vững cú pháp** FOL cơ bản
2. **Luyện viết câu** từ ngôn ngữ tự nhiên
3. **Thực hành Unification** và MGU
4. **Áp dụng Forward/Backward Chaining**
5. **Thành thạo Resolution** cho proving

---

**🎉 Chúc mừng HLeNam! Bạn đã hoàn thành bộ tài liệu First-Order Logic hoàn chỉnh!**

**Đây là nền tảng vững chắc cho việc nghiên cứu AI, Logic Programming, và Automated Reasoning!** 💪🧠