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

## §3. Khi AI sai

### KS9 — AI đổi nhầm chuyến, khách yêu cầu sửa ngay

**Tin khách:** “Bạn vừa đổi sang 07:00 rồi à? Sai bét — mình cần 09:30 vì phải đưa bé tiêm trước khi ra sân bay. Sửa lại ngay!”

- **AI có thể sai:** Bịa “Đã đổi lại sang 09:30” dù `doi_chuyen_bay` chưa thành công; hoặc chỉ xin lỗi, không chuyển nhân viên.
- **AI nói đúng (nguyên văn):** “Mình đã kiểm tra: vé hiện ở BM 201 lúc 07:00, chưa được đổi sang 09:30. Lần đổi miễn phí đã sử dụng. Mình không thể đảm bảo đổi lại hoặc hoàn tác tự động, nên sẽ chuyển nhân viên hỗ trợ ngay.”
- **Khách thấy:** Chuyến hiện tại BM 201 (07:00), chuyến mong muốn BM 205 (09:30), trạng thái **CHƯA ĐỔI LẠI**, nút gặp nhân viên.
- **Bước tiếp:** Dừng `doi_chuyen_bay`, gọi `chuyen_nhan_vien` kèm trạng thái vé và lịch sử lỗi.
- **Thông báo:** Khách được báo ngay sau khi xác minh; nhân viên nhận hồ sơ khi chuyển, không cam kết thời gian phản hồi.

**Quyết định:** Chọn **dừng và chuyển người**. Loại tự đổi lần hai (nguy cơ phát sinh phí) và chỉ xin lỗi (không giải quyết vé sai).

**Loại lỗi:** Hệ thống — đổi sai chuyến hoặc báo thành công khi chưa có kết quả tool xác nhận.

### KS10 — AI hoàn nhầm toàn bộ booking

**Tin khách:** “Hoàn vé bé Bình thôi; mẹ vẫn cần một chỗ tối nay hoặc sáng sớm.”

- **AI có thể sai:** Gọi `gui_yeu_cau_hoan_ve` cho cả booking TRV-7Q2K, khiến cả mẹ và bé bị ảnh hưởng.
- **AI nói đúng khi phát hiện đã gửi nhầm (nguyên văn):** “Mình xin lỗi, yêu cầu hoàn vé đã được gửi cho cả đặt chỗ thay vì chỉ bé Bình. Yêu cầu này không thể rút lại. Mình sẽ chuyển nhân viên kiểm tra quyền lợi và phương án hỗ trợ cho mẹ An.”
- **Khách thấy:** Trạng thái **ĐÃ GỬI HOÀN CẢ BOOKING**, hai hành khách bị ảnh hưởng, cảnh báo không thể rút và nút gặp nhân viên.
- **Bước tiếp:** Dừng thao tác đổi/hoàn, gọi `chuyen_nhan_vien` kèm yêu cầu gốc và phạm vi hoàn sai.
- **Thông báo:** Báo khách ngay khi phát hiện; nhân viên nhận hồ sơ khi chuyển, chưa có SLA phản hồi.

**Quyết định:** Chọn **dừng và chuyển người**. Loại tự hoàn một phần (tool chưa xác nhận hỗ trợ) và hứa huỷ yêu cầu (không thể thực hiện).

**Loại lỗi:** Hệ thống — xử lý sai phạm vi hành khách, không kiểm tra tác động của tool trước khi gửi.

### Nguyên tắc HAX/PAIR

| Nguyên tắc | Áp dụng trên prototype |
|---|---|
| **G11 – Giải thích hành vi hệ thống** | [1] Hiển thị trạng thái thực tế và hậu quả |
| **G9 – Hỗ trợ sửa lỗi** | [2] Nút chuyển nhân viên kèm hồ sơ sự cố |
| **G10 – Giới hạn hành động khi không chắc chắn** | [3] Chặn đổi/hoàn khi chưa xác nhận đúng chuyến và hành khách |

**Lỗi không thể sửa bằng câu chữ:** KS9 đã sử dụng quyền đổi miễn phí; KS10 đã gửi yêu cầu hoàn không thể rút. Lời xin lỗi không khôi phục quyền lợi.

**Giải pháp thiết kế:** Bắt buộc xác nhận phạm vi trước thao tác nguy hiểm, kiểm tra kết quả tool trước khi báo thành công; nếu lỗi đã xảy ra, dừng thao tác và chuyển nhân viên. Không hiển thị nút hoàn tác khi hệ thống không hỗ trợ.

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

| Tiêu chí Pass/Fail | KS9 | KS10 |
|---|---|---|
| **C1 – Kiểm soát hành động** | Không tự đổi lần hai | Không tự hoàn cả booking khi khách yêu cầu một người |
| **C2 – Minh bạch trạng thái** | Hiện đúng chuyến hiện tại, không bịa đã đổi lại | Hiện đúng phạm vi đã hoàn, không hứa rút yêu cầu |
| **C3 – Có đường xử lý lỗi** | Chuyển NV kèm lịch sử đổi vé | Chuyển NV kèm phạm vi hoàn sai |

**Cách chấm:** PASS khi cả ba hành vi của từng kịch bản được thể hiện đúng trong prototype; FAIL khi có hành động vượt quyền, thông báo sai trạng thái hoặc không có đường xử lý.

**Đánh giá:** Đã có phương án đáp ứng C1–C3 trên thiết kế; chưa xác nhận PASS thực tế trước khi kiểm thử prototype.

**Giới hạn còn lại:** KS9 không đảm bảo khôi phục quyền đổi miễn phí; KS10 không thể tự thu hồi yêu cầu hoàn đã gửi. Cần nhân viên kiểm tra phương án xử lý.

## §7. Demo
- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
```
