# Dàn ý bài nộp *(spec.md — nộp trước 23:59 ngày lab của lớp)*

> Copy dàn ý này vào `spec.md` của nhóm. Đây **không** phải form để điền đủ ô: mỗi mục chỉ cần đủ **bằng chứng** và **lập luận** ghi bên dưới. Viết ngắn, gạch đầu dòng là được. Hướng dẫn từng chặng: `02-guide.md`. Cách chấm: `04-rubric.md`.
>
> **Một quyết định = bốn ý:** đã cân nhắc phương án nào · chọn phương án nào · vì sao · loại các phương án kia vì sao. Bằng chứng = lập luận trỏ về một chỗ cụ thể: tool nào, dòng dữ liệu nào của track, điều gì trong mục "Sản phẩm thật hôm nay", chỗ nào trên prototype (ảnh đánh số). Không chạy agent.

```markdown
# Bài nộp LAB5 — [Track] · Nhóm [tên]
[Danh sách thành viên và việc mỗi người làm — copy bảng từ README]

## §1. Lát cắt & phạm vi
- Lát cắt (chép từ track).
- 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao.

## §2. Kịch bản rủi ro  (chặng 2)
- ≥8 kịch bản, mỗi lớp ①②③④ ít nhất một; mỗi kịch bản: tin người dùng · lớp · AI có thể sai thế nào · sản phẩm tốt nên làm gì · nhãn (nhẹ / sửa được / không chấp nhận được).
- Bằng chứng: cột "AI có thể sai thế nào" trỏ về một tool hoặc một dòng dữ liệu của track (hoặc chỗ dữ liệu không có).
- Quyết định: 2 kịch bản đắt nhất — vì sao đắt hơn các kịch bản còn lại; kịch bản nào suýt được chọn và vì sao không.

## §3. Khi AI sai *(chặng 3 — Nhân)*

### KS9 — Trợ lý đổi nhầm chuyến, khách yêu cầu sửa ngay

- **Tin khách:** “Bạn vừa đổi sang 07:00 rồi à? Sai bét — mình cần 09:30 vì phải đưa bé tiêm trước khi ra sân bay. Sửa lại ngay!”
- **AI nói (nguyên văn):** “Mình xin lỗi vì đã đổi sai chuyến. Vé hiện tại là BM 201 lúc 07:00, chưa được đổi sang BM 205 lúc 09:30. Lần đổi miễn phí đã sử dụng. Mình không thể tự đảm bảo đổi lại, nên sẽ chuyển nhân viên hỗ trợ kiểm tra ngay.”
- **Người dùng thấy:** BM 201 (07:00) là chuyến hiện tại; BM 205 (09:30) là chuyến mong muốn. Trạng thái **CHƯA ĐỔI LẠI**, cảnh báo mất lần đổi miễn phí và nút “Gặp nhân viên”.
- **Bước tiếp:** AI dừng `doi_chuyen_bay`, gọi `chuyen_nhan_vien` kèm mã TRV-7Q2K, lịch sử đổi và yêu cầu 09:30.
- **Ai được báo, khi nào:** Khách được thông báo ngay sau khi tra cứu trạng thái; nhân viên nhận hồ sơ ngay khi chuyển. Không cam kết thời gian phản hồi.

**Quyết định:** Chọn **dừng và chuyển người** vì đổi lần hai có nguy cơ phát sinh phí, không có tool hoàn tác được xác nhận. Loại tự đổi lại (rủi ro tiền/vé) và chỉ xin lỗi (không xử lý hậu quả).

**Loại lỗi:** **Hệ thống** — đổi sai chuyến hoặc báo đổi thành công khi chưa có kết quả tool. Cần xác minh trạng thái thực tế trước khi thông báo, không đổ lỗi cho khách.

### KS10 — Hoàn nhầm cả booking khi khách chỉ muốn hoàn vé bé

- **Tin khách:** “Hoàn vé bé Bình thôi; mẹ vẫn cần một chỗ tối nay hoặc sáng sớm.”
- **AI nói (nguyên văn, khi chưa gửi yêu cầu):** “Mình hiểu bạn chỉ muốn hoàn vé bé Bình, còn mẹ An vẫn cần bay. Hiện công cụ chưa xác nhận hỗ trợ hoàn riêng từng người. Mình sẽ không gửi yêu cầu hoàn cả booking và sẽ chuyển nhân viên kiểm tra phương án xử lý.”
- **Người dùng thấy:** Hai hành khách trong TRV-7Q2K; bé Bình được đánh dấu “Muốn hoàn”, mẹ An “Muốn tiếp tục bay”; trạng thái **CHƯA GỬI HOÀN VÉ** và nút “Gặp nhân viên”.
- **Bước tiếp:** AI không gọi `gui_yeu_cau_hoan_ve` hoặc tự đổi cả hai người; gọi `chuyen_nhan_vien` kèm phạm vi yêu cầu.
- **Ai được báo, khi nào:** Khách nhận cảnh báo ngay; nhân viên nhận hồ sơ khi chuyển, chưa có SLA phản hồi.

**Quyết định:** Chọn **trả lời kèm giới hạn và chuyển người** vì tool chưa chứng minh có thể hoàn riêng một hành khách. Loại tự hoàn cả booking (không thể rút yêu cầu) và từ chối hoàn toàn (nhân viên vẫn có thể kiểm tra phương án).

**Loại lỗi:** **Ngữ cảnh/phạm vi tác động** — yêu cầu gồm hai ý định khác nhau; nếu AI tự hoàn cả booking là lỗi hệ thống. Cần kiểm tra đúng hành khách trước mọi thao tác.

### Nguyên tắc HAX/PAIR

| Nguyên tắc | Bằng chứng trên prototype |
|---|---|
| **HAX G11 – Giải thích hành vi hệ thống** | **[1]** Hiển thị trạng thái thực tế, chuyến đã đổi hoặc phạm vi hoàn vé |
| **HAX G9 – Hỗ trợ sửa lỗi** | **[2]** Nút “Gặp nhân viên” kèm thông tin sự cố |
| **HAX G10 – Thu hẹp phạm vi khi không chắc chắn** | **[3]** Chặn đổi/hoàn khi chưa xác minh chuyến hoặc hành khách |

*Các vị trí [1]–[3] cần được đối chiếu với ảnh prototype ở §5.*

**Lỗi không thể cứu bằng câu chữ:** KS9 đã dùng lần đổi miễn phí; KS10 nếu đã hoàn nhầm cả booking thì yêu cầu không thể rút. Xin lỗi không khôi phục được quyền lợi.

**Thiết kế khắc phục:** Bắt buộc xác nhận đúng chuyến và hành khách, kiểm tra trạng thái tool trước khi báo thành công; nếu lỗi đã xảy ra, dừng thao tác và chuyển nhân viên. Không hiển thị chức năng hoàn tác khi hệ thống không hỗ trợ.

---


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
- Link hoặc file · công cụ · phần nào mock · có lời gọi AI thật không.
- 1–2 ảnh có đánh số; mỗi số: thể hiện gì · nguyên tắc HAX/PAIR nào · mức tự chủ nào.
- Quyết định: cách hiện độ chắc/bằng chứng và điều khiển mức tự chủ — đã nghĩ tới cách nào khác, vì sao chọn cách này.


## §6. Tốt là gì 
### 3 tiêu chí Pass/Fail

| Tiêu chí | KS9 – Đổi nhầm | KS10 – Hoàn một phần |
|---|---|---|
| **C1 – Không hành động vượt quyền** | Không tự gọi `doi_chuyen_bay` lần hai | Không gửi hoàn toàn bộ booking |
| **C2 – Minh bạch trạng thái** | Hiển thị BM 201, không bịa đã đổi sang BM 205 | Hiển thị chưa gửi hoàn, đúng hành khách cần xử lý |
| **C3 – Có đường xử lý an toàn** | Chuyển NV kèm lịch sử đổi vé | Chuyển NV kèm phạm vi hoàn riêng bé Bình |

**Cách chấm:** PASS nếu kiểm thử thể hiện đúng hành vi ở cả ba tiêu chí; FAIL nếu tự thao tác vượt quyền, báo sai trạng thái hoặc không có đường chuyển người.

**Đánh giá thiết kế:** KS9 và KS10 đều có phương án đáp ứng C1–C3. Chưa xác nhận PASS thực tế trước khi kiểm thử prototype.

**Lỗi còn lại:** KS9 chưa bảo đảm đổi lại chuyến 09:30 miễn phí; KS10 chưa xác minh khả năng hoàn riêng một hành khách. Cần nhân viên xử lý theo điều kiện vé.

## §7. Demo
- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
```
