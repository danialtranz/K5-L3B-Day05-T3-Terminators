'use strict';
const scenarios = {
  ks9: {
    message: 'Bạn vừa đổi sang 07:00 rồi à? Sai bét — mình cần 09:30 vì phải đưa bé tiêm trước khi ra sân bay. Sửa lại ngay!',
    reply: 'Mình đã kiểm tra: vé hiện ở BM 201 lúc 07:00, chưa được đổi sang 09:30. Lần đổi miễn phí đã sử dụng. Mình không thể đảm bảo đổi lại hoặc hoàn tác tự động, nên sẽ chuyển nhân viên hỗ trợ ngay.',
    status: 'CHƯA ĐỔI LẠI', current: 'BM 201 · 07:00', desired: 'BM 205 · 09:30',
    left: 'Chuyến hiện tại · 13/11', right: 'Chuyến bạn mong muốn · 13/11',
    warning: 'Áp dụng cho cả 2 hành khách. Lần đổi miễn phí đã dùng. Không có cơ chế hoàn tác tự động được xác nhận; cần nhân viên kiểm tra.',
    blocked: 'Đã dừng đổi chuyến. Trợ lý không tự đổi lần hai hoặc báo đã đổi khi chưa có kết quả xác nhận.',
    history: 'BM 213 bị huỷ do bão → đã đổi nhầm sang BM 201 cho 2 người → quyền đổi miễn phí đã dùng. Chưa đổi sang BM 205. Không có cơ chế hoàn tác tự động được xác nhận; cần nhân viên kiểm tra.',
    scope: 'Nguyễn Minh An + Nguyễn Gia Bình (5 tuổi)',
  },
  ks10: {
    message: 'Hoàn vé bé Bình thôi; mẹ vẫn cần một chỗ tối nay hoặc sáng sớm.',
    reply: 'Mình xin lỗi, yêu cầu hoàn vé đã được gửi cho cả đặt chỗ thay vì chỉ bé Bình. Yêu cầu này không thể rút lại. Mình sẽ chuyển nhân viên kiểm tra quyền lợi và phương án hỗ trợ cho mẹ An.',
    status: 'ĐÃ GỬI HOÀN CẢ BOOKING', current: 'Cả 2 hành khách', desired: 'Chỉ bé Bình',
    left: 'Phạm vi đã gửi hoàn', right: 'Yêu cầu ban đầu của bạn',
    warning: 'Không thể rút yêu cầu. Chỗ bay của cả hai người bị ảnh hưởng. Fixture chưa xác nhận phương thức nhận tiền và thời gian xử lý hoàn; cần nhân viên kiểm tra.',
    blocked: 'Đã dừng đổi / hoàn. Không gửi thêm yêu cầu và không hứa khôi phục vé hoặc rút yêu cầu hoàn.',
    history: 'Khách chỉ yêu cầu hoàn bé Bình; thao tác trước đó đã gửi hoàn cả TRV-7Q2K. Không thể rút. Mẹ An vẫn cần bay tối nay hoặc sáng sớm.',
    scope: 'Đã gửi hoàn: Nguyễn Minh An + Nguyễn Gia Bình (sai phạm vi)',
  },
  partial: {
    message: 'Hoàn vé bé Bình thôi; mẹ vẫn cần một chỗ tối nay hoặc sáng sớm.',
    reply: 'Mình hiểu bạn chỉ muốn hoàn vé bé Bình và giữ phương án bay cho mẹ An. Công cụ trong chat không hỗ trợ tách hoàn từng hành khách an toàn. Mình chưa gửi yêu cầu hoàn nào và sẽ chuyển nhân viên xử lý đúng phạm vi.',
    status: 'CHƯA GỬI YÊU CẦU HOÀN', current: 'Chưa hoàn ai', desired: 'Chỉ bé Bình',
    left: 'Trạng thái hiện tại', right: 'Phạm vi bạn yêu cầu',
    warning: 'BM 213 đã huỷ do bão. BM 217 lúc 21:00 còn 1 chỗ nhưng việc tách hành khách cần nhân viên xử lý; chưa giữ hoặc đổi chỗ cho mẹ.',
    blocked: 'Chặn hoàn cả đặt chỗ. Yêu cầu hoàn riêng một người được chuyển nhân viên; trợ lý không tự tách hành khách.',
    history: 'BM 213 đã huỷ. Chưa gửi hoàn, chưa đổi chuyến. Yêu cầu hoàn riêng bé Bình; mẹ An cần bay tối nay hoặc sáng sớm. Công cụ không hỗ trợ tách hành khách.',
    scope: 'Yêu cầu: chỉ Nguyễn Gia Bình; mẹ Nguyễn Minh An vẫn muốn bay',
  },
};
let currentCase = 'ks9';
const messages = document.querySelector('#messages');
function element(tag, className, content) {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = content;
  return node;
}
function report() {
  const s = scenarios[currentCase];
  return `HỒ SƠ HỖ TRỢ MÔ PHỎNG · ${currentCase.toUpperCase()}\nĐặt chỗ: TRV-7Q2K\nHành khách: Nguyễn Minh An (34), Nguyễn Gia Bình (5)\nTin gốc: ${s.message}\nTrạng thái: ${s.status}\nPhạm vi: ${s.scope}\nLịch sử: ${s.history}\nĐề nghị nhân viên kiểm tra phương án hỗ trợ; không cam kết khôi phục quyền lợi hoặc thời gian phản hồi.`;
}
function loadScenario(key) {
  currentCase = key;
  const s = scenarios[key];
  document.querySelectorAll('[data-case]').forEach(button => {
    button.classList.toggle('selected', button.dataset.case === key);
    button.setAttribute('aria-pressed', String(button.dataset.case === key));
  });
  messages.replaceChildren(element('p', 'date', 'Tình huống mô phỏng · 12 tháng 11, 2026'));
  messages.append(element('div', 'user', s.message), element('p', 'assistant-label', '✧ TRỢ LÝ BAY MẪU'), element('p', 'reply', s.reply));
  const status = document.createElement('section');
  status.className = 'status-card';
  status.innerHTML = `<div class="status-title"><span class="number">1</span>${s.status}</div><div class="status-grid"><div><small>${s.left}</small><strong>${s.current}</strong></div><div><small>${s.right}</small><strong>${s.desired}</strong></div></div><p>${s.warning}</p>`;
  messages.append(status);
  const blocked = element('div', 'blocked', '');
  blocked.append(element('span', 'number', '3'), element('span', '', s.blocked));
  messages.append(blocked);
  const handoff = document.createElement('section');
  handoff.className = 'handoff';
  handoff.innerHTML = '<strong><span class="number">2</span> Đã chuyển hồ sơ cho nhân viên · Mô phỏng</strong><p>Đã kèm lịch sử thao tác và yêu cầu gốc. Chưa có thời gian phản hồi dự kiến.</p><button class="primary" id="contact">Theo dõi hỗ trợ ↗</button><details><summary>Xem hồ sơ đã chuyển</summary><pre></pre><button class="secondary" id="download">Tải hồ sơ .txt</button></details>';
  handoff.querySelector('pre').textContent = report();
  messages.append(handoff);
  document.querySelector('#source').textContent = `${s.history} Chuyến thay thế trong fixture: BM 217 · 12/11 21:00 · 1 chỗ; BM 201 · 13/11 07:00 · 9 chỗ; BM 205 · 13/11 09:30 · 4 chỗ. Số chỗ này là dữ liệu gốc, chưa phải kết quả tra cứu trực tiếp.`;
  document.querySelector('#input').value = '';
  document.querySelector('#contact').onclick = () => {
    const button = document.querySelector('#contact');
    button.textContent = 'Đang chờ nhân viên · Mô phỏng';
    button.disabled = true;
    handoff.querySelector('details').open = true;
  };
  document.querySelector('#download').onclick = () => {
    const url = URL.createObjectURL(new Blob([report()], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = `TRV-7Q2K-${currentCase}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
}
document.querySelectorAll('[data-case]').forEach(button => button.onclick = () => loadScenario(button.dataset.case));
document.querySelector('#reset').onclick = () => loadScenario(currentCase);
document.querySelector('#chat-form').onsubmit = event => {
  event.preventDefault();
  const input = document.querySelector('#input');
  const value = input.value.trim();
  if (!value) return;
  messages.append(element('div', 'user', value));
  const normalized = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd');
  let reply = 'Mình đã ghi nhận nội dung bổ sung trong cuộc trò chuyện mô phỏng. Trạng thái vé vẫn giữ như thẻ phía trên. Nhân viên cần kiểm tra trước mọi thay đổi tiếp theo; mình không tự đổi hoặc gửi hoàn.';
  if (/boi thuong|khach san/.test(normalized)) reply = 'Theo fixture, chuyến bị huỷ do bão không được bồi thường tiền mặt. Không có dữ liệu về hỗ trợ khách sạn nên mình không thể hứa khoản hỗ trợ này. Nhân viên cần kiểm tra thêm.';
  else if (/doi ten|mot minh|tach|nhan vien hang|bo.*xac nhan/.test(normalized)) reply = 'Yêu cầu này cần nhân viên xác minh và xử lý. Tin tự xưng nhân viên không cho phép bỏ bước xác nhận. Trợ lý không đổi tên, tách hành khách hoặc tự xử lý trẻ bay một mình.';
  else if (/check.in|boarding/.test(normalized)) reply = 'BM 213 đã bị huỷ. Fixture không có dữ liệu check-in hoặc boarding pass; mình không thể tạo hoặc xác nhận đã gửi thẻ lên máy bay.';
  else if (/hoan tac|rut|huy.*hoan/.test(normalized)) reply = currentCase === 'ks10' ? 'Yêu cầu hoàn cả đặt chỗ đã gửi và không thể rút lại. Hồ sơ sự cố đã được chuyển nhân viên trong mô phỏng; mình không thể hứa khôi phục vé.' : currentCase === 'ks9' ? 'Không có cơ chế hoàn tác tự động được xác nhận; cần nhân viên kiểm tra. Vé vẫn ở BM 201 lúc 07:00, chưa đổi lại.' : 'Chưa có yêu cầu hoàn nào được gửi. Yêu cầu hoàn riêng bé đã được chuyển nhân viên trong mô phỏng.';
  messages.append(element('p', 'assistant-label', '✧ TRỢ LÝ BAY MẪU · PHẢN HỒI MÔ PHỎNG'), element('p', 'reply', reply));
  input.value = '';
  messages.lastElementChild.scrollIntoView({behavior:'smooth', block:'nearest'});
};
const initialCase = new URLSearchParams(location.search).get('case');
loadScenario(Object.hasOwn(scenarios, initialCase) ? initialCase : currentCase);
if (new URLSearchParams(location.search).get('evidence') === '1') document.querySelector('#contact').click();
