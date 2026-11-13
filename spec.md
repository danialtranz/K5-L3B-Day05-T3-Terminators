# Dàn ý bài nộp *(spec.md — nộp trước 23:59 ngày lab của lớp)*

> Copy dàn ý này vào `spec.md` của nhóm. Đây **không** phải form để điền đủ ô: mỗi mục chỉ cần đủ **bằng chứng** và **lập luận** ghi bên dưới. Viết ngắn, gạch đầu dòng là được. Hướng dẫn từng chặng: `02-guide.md`. Cách chấm: `04-rubric.md`.
>
> **Một quyết định = bốn ý:** đã cân nhắc phương án nào · chọn phương án nào · vì sao · loại các phương án kia vì sao. Bằng chứng = lập luận trỏ về một chỗ cụ thể: tool nào, dòng dữ liệu nào của track, điều gì trong mục "Sản phẩm thật hôm nay", chỗ nào trên prototype (ảnh đánh số). Không chạy agent.

```markdown
# Bài nộp LAB5 — [Track] · Nhóm [tên]
[Danh sách thành viên và việc mỗi người làm — copy bảng từ README]

## §1. Lát cắt & phạm vi
1.1 Lát cắt: Trong Đặt chỗ của tôi, khi hành khách vừa nhận tin chuyến bay bị huỷ và nhắn hỏi, AI đề xuất và giữ chỗ chuyến thay thế, hỏi lại cho rõ, đổi vé, hay chuyển nhân viên, để khách tới nơi kịp mà không mất vé hay tiền vì một thao tác không đảo lại được.
1.2 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao:
- Không tự ý đổi chuyến bay khi hành khách chưa xác nhận rõ chuyến bay và danh sách hành khách cần đổi, vì thao tác này có thể làm mất lần đổi miễn phí duy nhất và khó khôi phục trạng thái đặt chỗ ban đầu.

- Không tự động hoàn tác hoặc đổi lại vé khi phát hiện AI đã đổi nhầm chuyến, vì hệ thống không có công cụ hoàn tác và việc đổi tiếp có thể phát sinh chi phí hoặc làm mất thêm quyền lợi của hành khách.

- Không tự ý gửi yêu cầu hoàn vé khi hành khách chưa xác nhận rõ quyết định và các hậu quả liên quan, vì yêu cầu đã gửi không thể huỷ và quá trình hoàn tiền có thể kéo dài đến 90 ngày.

## §2. Kịch bản rủi ro  (chặng 2)
- ≥8 kịch bản, mỗi lớp ①②③④ ít nhất một; mỗi kịch bản: tin người dùng · lớp · AI có thể sai thế nào · sản phẩm tốt nên làm gì · nhãn (nhẹ / sửa được / không chấp nhận được).
- Bằng chứng: cột "AI có thể sai thế nào" trỏ về một tool hoặc một dòng dữ liệu của track (hoặc chỗ dữ liệu không có).
- Quyết định: 2 kịch bản đắt nhất — vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

## §3. Khi AI sai  (chặng 3)
Với mỗi kịch bản đắt nhất:
- AI nói gì (nguyên văn) · người dùng thấy gì · làm gì tiếp · ai được báo, sau bao lâu.
- Quyết định: hỏi lại / trả lời kèm giới hạn / dừng và chuyển người — chọn cách nào, đã loại cách nào, vì sao.
- Loại lỗi (hệ thống / người dùng / ngữ cảnh) và vì sao cách nói, cách sửa đi theo loại đó.
- 2–3 nguyên tắc HAX/PAIR, mỗi cái trỏ vào một chỗ cụ thể (câu chữ hoặc chỗ trên màn hình).
- Lỗi nào sửa câu chữ không cứu được (nếu có), và thiết kế cứu nó thế nào.

## §4. Mức tự chủ  (chặng 4)
Với mỗi tool:
- Mức của nhóm (tự làm / cần người duyệt / cấm). Nếu cần người duyệt: ai duyệt · người duyệt thấy gì · quá hạn thì sao.
- Lý do theo cost-of-error: sai thì ai chịu gì · đảo lại được không · chờ người thì mất gì.
- Phương án đã cân nhắc và vì sao loại.
Thêm:
- Tool khó xếp nhất: mỗi người từng chọn gì, cái giá của mỗi phía (trỏ về kịch bản ở §2), nhóm chốt thế nào.
- Thử mức đã đặt trên 2 kịch bản đắt nhất + 1 kịch bản bình thường: cái sai có bị chặn không? còn việc nào làm khi lẽ ra phải hỏi? người dùng bình thường có phải chờ vô ích không?
- Luật thêm hoặc tool tách bước (nếu có), và vì sao.
- Một mức tự chủ đã đổi lời hứa nào với người dùng.

## §5. Prototype  (chặng 5)

**Bộ file theo mô tả prototype:** `prototype/index.html`, `prototype/app.js`. HTML/CSS/JavaScript chạy cục bộ bằng trình duyệt; không có lời gọi AI thật, API hãng hàng không, hệ thống đặt vé hoặc nhân viên thật. Chat trả lời bằng quy tắc từ khóa; hồ sơ hỗ trợ là nội dung dựng ở trình duyệt và có thể tải `.txt`.

**Ba ca demo:**
1. **KS9 — Đổi nhầm chuyến:** khởi động mặc định. BM 201 07:00 là chuyến hiện tại, BM 205 09:30 chỉ là nguyện vọng; trạng thái `CHƯA ĐỔI LẠI`; thông báo không đổi tiếp và có hồ sơ hỗ trợ mô phỏng.
2. **KS10 — Hoàn nhầm cả đặt chỗ (sau lỗi):** chuyển tab “02”; thấy `ĐÃ GỬI HOÀN CẢ BOOKING`, cả hai người chịu ảnh hưởng, không tự rút hoàn, có hồ sơ lịch sử. Đây là trạng thái lỗi **được nạp sẵn**, không phải lỗi do người dùng thao tác phát sinh trong demo.
3. **KS10 — Yêu cầu hoàn riêng bé (phòng ngừa):** chuyển tab “03”; thấy `CHƯA GỬI YÊU CẦU HOÀN`, yêu cầu chỉ bé Bình và dừng hoàn cả booking, chuyển người để xem xét tách hành khách.

**Thao tác demo:** đổi tab ở thanh “Kịch bản trải nghiệm” → xem các vùng **[1], [3], [2]** → bấm “Theo dõi hỗ trợ” → mở “Xem hồ sơ đã chuyển” → bấm “Tải hồ sơ .txt” → mở “Xem dữ liệu nguồn” ở cột trái. Có thể “Bắt đầu lại” từng ca. Tất cả chỉ là mô phỏng tại trình duyệt.

**Bằng chứng HAX/PAIR và mức tự chủ trên màn hình:**

| Vùng | Chứng minh | Mức tự chủ có thể quan sát |
|---|---|---|
| **[1]** | G11: trạng thái thực tế và trạng thái khách mong muốn/đã yêu cầu | Thông tin chỉ đọc; **không có tra cứu backend thật** |
| **[2]** | G9: hồ sơ chuyển nhân viên mô phỏng, xem/tải được | Chuyển người là bước tự động **được mô phỏng**, không có kết nối nhân viên |
| **[3]** | G10: chặn thao tác khi không chắc quyền hoặc phạm vi | Không có nút đổi lần hai, tách Pax hay rút hoàn không được hỗ trợ |

**Mức tự chủ theo thiết kế §4 nhưng chưa được thể hiện bằng tương tác:** `giu_cho_chuyen_moi` được xếp *tự làm*, `doi_chuyen_bay` *khách duyệt*, `gui_yeu_cau_hoan_ve` *khách duyệt và tích ô*. **Prototype không có màn giữ chỗ 20 phút, duyệt đổi vé hoặc xác nhận gửi hoàn toàn bộ**; không nhận là đã kiểm thử các hàng rào đó. Các mức này cần được đối chiếu khi hoàn thiện §4.

**Ảnh minh chứng:** cần chụp và đưa vào `prototype/` ít nhất hai ảnh từ **KS9** và **KS10 phòng ngừa**, bảo đảm nhìn rõ [1], [2], [3]. Chưa xác minh ảnh đính kèm nên chưa ghi đường dẫn ảnh.

**Quyết định thiết kế:** đã cân nhắc hiện trạng thái đặt chỗ và nguồn fixture hoặc gán tỷ lệ “AI tự tin X%”; chọn trạng thái và nguồn vì độ tin cậy ngôn ngữ không chứng minh vé đã được đổi. Khi chưa có khả năng sửa tự động được xác nhận, chọn chặn thao tác và chuyển người có hồ sơ; loại nút “Hoàn tác” giả và lời xin lỗi không có bước tiếp. Phạm vi prototype ưu tiên hai kịch bản sai khó cứu; luồng đổi/hoàn thường mới được mô tả như **quy tắc sản phẩm**, chưa triển khai.

**Giới hạn nguồn và việc cần hoàn thiện trước nộp:** theo nội dung được cung cấp, `app.js` và `README.md` còn các câu “cửa sổ hoàn tác đã hết”, “tiền về phương thức gốc / có thể tới 90 ngày”. Đây là **nội dung dựng chưa được fixture Bay Mẫu xác nhận**, không được diễn giải là chính sách thật hoặc kết quả tool; cần sửa trong prototype để thống nhất. Tại thời điểm cập nhật mục này, chưa tìm thấy bộ file `prototype/` trong workspace để đối chiếu mã nguồn; mô tả trên chưa phải kết quả kiểm thử trực tiếp.

## §6. Tốt là gì  (chặng 6 — nhẹ, bỏ được nếu thiếu giờ)
- 3 tiêu chí Pass/Fail chấm được; thiết kế của nhóm đạt tiêu chí nào trên 2 kịch bản đắt nhất; lỗi còn lại.

## §7. Demo
- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
```
