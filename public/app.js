const $ = (s) => document.querySelector(s);
const statuses = ['Danh sách công việc', 'Đang xử lý', 'Cần review', 'Cần sửa', 'Đã hoàn thành'];
const tasks = [
 { id: 'FX-006', title: 'Summer vibes — Bộ sưu tập mùa hè', product: 'T-Shirt 2D', design: 'Redesign', count: '2', status: 1, date: '2026-10-23', icon: '👕' },
 { id: 'FX-005', title: 'Adventure awaits', product: 'T-Shirt 3D', design: 'Clone', count: '1', status: 2, date: '2026-10-22', icon: '👕' },
 { id: 'FX-004', title: 'Christmas cozy collection', product: '2D ugly Sweater', design: 'Redesign', count: '2', status: 3, date: '2026-10-21', icon: '🧥' },
 { id: 'FX-003', title: 'Magic moments — Family edition', product: 'Disney T-Shirt', design: 'Clone', count: '1', status: 4, date: '2026-10-20', icon: '👚' },
 { id: 'FX-002', title: 'Botanical stories', product: 'T-Shirt 2D', design: 'Redesign', count: '1', status: 2, date: '2026-10-19', icon: '👕' },
 { id: 'FX-001', title: 'Weekend escape', product: 'T-Shirt 3D', design: 'Clone', count: '2', status: 4, date: '2026-10-18', icon: '👚' }
];
let active = 0;
let filters = { design: [], product: [], count: [] };
let toastTimer;
function notify(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4500); }
function dialog(title, message) { $('#dialog-title').textContent = title; $('#dialog-body').replaceChildren(); const p = document.createElement('p'); p.textContent = message; $('#dialog-body').append(p); $('#task-dialog').showModal(); }
function render() {
 const query = $('#search').value.trim().toLocaleLowerCase('vi');
 const rows = tasks.filter(t => (!active || t.status === active) && `${t.title} ${t.id} ${t.product}`.toLocaleLowerCase('vi').includes(query) && Object.entries(filters).every(([key, values]) => !values.length || values.includes(t[key]))).sort((a,b) => $('#sort').value === 'new' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date));
 $('#page-title').textContent = statuses[active];
 $('#result-count').textContent = `${rows.length} công việc`;
 $('#empty').hidden = rows.length > 0;
 const hasFilters = Object.values(filters).some(v => v.length);
 $('#clear-all').hidden = !hasFilters && !query;
 $('#filter-toggle').classList.toggle('active', hasFilters);
 $('#task-list').replaceChildren();
 rows.forEach(t => { const card = document.createElement('button'); card.className = 'task-card'; card.innerHTML = `<div class="task-cover cover-${t.status}"><span class="shirt" aria-hidden="true">${t.icon}</span></div><div class="task-body"><div class="task-meta"><span>${t.id}</span><span class="status s${t.status}">${statuses[t.status]}</span></div><h2>${t.title}</h2><p>${t.product} · ${t.design}</p><div class="task-bottom"><span>▧ ${t.count} mẫu thiết kế</span><time datetime="${t.date}">${t.date.split('-').reverse().join('/')}</time></div></div>`; card.addEventListener('click', () => dialog(t.title, `${t.id} · ${t.product} · ${t.design} · ${t.count} mẫu. Trạng thái: ${statuses[t.status]}. Đây là dữ liệu minh họa; chức năng quản lý chi tiết sẽ được triển khai ở bước tiếp theo.`)); $('#task-list').append(card); });
}
statuses.forEach((name, i) => { const button = document.createElement('button'); button.className = `tab${i === active ? ' active' : ''}`; button.textContent = name; button.setAttribute('aria-current', i === active ? 'page' : 'false'); button.onclick = () => { active = i; document.querySelectorAll('.tab').forEach((el, index) => { el.classList.toggle('active', index === i); el.setAttribute('aria-current', index === i ? 'page' : 'false'); }); render(); }; $('#tabs').append(button); });
try { $('#email').value = localStorage.getItem('faxtech-email') || ''; } catch {}
$('#login-form').onsubmit = e => { e.preventDefault(); try { if ($('#remember').checked) localStorage.setItem('faxtech-email', $('#email').value); else localStorage.removeItem('faxtech-email'); } catch {} $('#password').value = ''; $('#signin').hidden = true; $('#workspace').hidden = false; render(); $('#search').focus(); };
$('#show-password').onclick = () => { const shown = $('#password').type === 'password'; $('#password').type = shown ? 'text' : 'password'; $('#show-password').setAttribute('aria-label', shown ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'); };
$('#forgot').onclick = () => dialog('Quên mật khẩu', 'Khôi phục mật khẩu sẽ được kết nối với hệ thống tài khoản ở bước 2. Bản giao diện mẫu không tạo hoặc lưu mật khẩu.');
$('#logout').onclick = () => { $('#workspace').hidden = true; $('#signin').hidden = false; $('#email').focus(); };
function closeFilters() { $('#filters').hidden = true; $('#filter-toggle').setAttribute('aria-expanded', 'false'); }
$('#filter-toggle').onclick = () => { $('#filters').hidden = !$('#filters').hidden; $('#filter-toggle').setAttribute('aria-expanded', String(!$('#filters').hidden)); };
$('#filters').onsubmit = e => { e.preventDefault(); const data = new FormData(e.currentTarget); Object.keys(filters).forEach(key => { filters[key] = data.getAll(key); }); closeFilters(); render(); };
function resetFilters() { filters = {design:[],product:[],count:[]}; $('#filters').reset(); render(); }
$('#reset-filter').onclick = resetFilters;
$('#clear-all').onclick = () => { $('#search').value = ''; resetFilters(); };
$('#search').oninput = render;
$('#sort').onchange = render;
document.addEventListener('click', e => { if (!e.target.closest('.filter-anchor')) closeFilters(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeFilters(); });
$('#create').onclick = () => dialog('Tạo yêu cầu thiết kế', 'Ở bước tiếp theo, bạn sẽ nhập tên công việc, mô tả, loại sản phẩm và tải ảnh tham khảo tại đây. Hiện tại đây là bản giao diện minh họa.');
$('#notifications').onclick = () => notify('Bạn chưa có thông báo mới.');
$('#chat').onclick = () => dialog('Hỗ trợ Faxtech Design', 'Kênh hỗ trợ sẽ được kết nối sau khi bạn cung cấp email hoặc phương thức liên hệ cho dự án.');
