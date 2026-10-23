# Faxtech Design — Bước 1

Giao diện HTML/CSS/JavaScript, chạy bằng Node.js >=22, không có dependency runtime.

## Chạy

Trong `/workspace/Duanbtl8`, chạy `npm start`. Cổng mặc định 3000; có thể đổi bằng biến `PORT`.
Kiểm tra cú pháp: `npm run check`.

## Trải nghiệm

Nhập email hợp lệ và mật khẩu bất kỳ từ 6 ký tự để vào giao diện mẫu. Đây không phải xác thực thật. Mật khẩu không được lưu hoặc gửi về máy chủ; tùy chọn nhớ email chỉ lưu email trên trình duyệt.

Có 6 công việc minh họa, 5 tab trạng thái, tìm kiếm, bộ lọc nhiều lựa chọn và sắp xếp thời gian. Nút tạo mới, quên mật khẩu, chi tiết và hỗ trợ mở thông tin về chức năng dự kiến; chưa kết nối backend.

Bố cục thích ứng điện thoại, tablet và desktop. Hình minh họa đăng nhập là SVG nội bộ, không cần tài nguyên bên ngoài.

Bước 2: tài khoản, xác thực và phân quyền; sau đó triển khai dữ liệu và luồng công việc thật.

## Website công khai

- `/`: trang chủ Faxtech Design; dịch vụ, sản phẩm minh họa có bộ lọc, quy trình, bài hướng dẫn dạng hộp thoại, FAQ.
- `/signin`: giao diện đăng nhập và dashboard mẫu.
- Menu thu gọn trên điện thoại; tài nguyên chạy nội bộ, không phụ thuộc font, ảnh hoặc CDN bên ngoài.
- Mẫu sản phẩm là SVG minh họa tự tạo. Không dùng đánh giá khách hàng, cam kết giao hàng hoặc ưu đãi chưa xác nhận.
- Kiểm tra trên Chromium: trang chủ, lọc sản phẩm, hộp thoại, FAQ, menu mobile, chuyển sang đăng nhập; dashboard: đăng nhập mẫu, tìm kiếm, trạng thái, bộ lọc, sắp xếp, trạng thái rỗng và đăng xuất.

Bước 1 không bao gồm tài khoản thật, tiếp nhận đơn, tải tệp, thanh toán hoặc chat trực tiếp. Không dùng thông tin đăng nhập thật trong bản demo.
