-- =============================================
-- SEED DATA: Initial data for DOTQUY.NHANH
-- =============================================

-- =============================================
-- PROVINCES: 63 tỉnh/thành phố Việt Nam
-- =============================================
INSERT INTO provinces (slug, name) VALUES
  ('an-giang', 'An Giang'),
  ('ba-ria-vung-tau', 'Bà Rịa - Vũng Tàu'),
  ('bac-giang', 'Bắc Giang'),
  ('bac-kan', 'Bắc Kạn'),
  ('bac-lieu', 'Bạc Liêu'),
  ('bac-ninh', 'Bắc Ninh'),
  ('ben-tre', 'Bến Tre'),
  ('binh-dinh', 'Bình Định'),
  ('binh-duong', 'Bình Dương'),
  ('binh-phuoc', 'Bình Phước'),
  ('binh-thuan', 'Bình Thuận'),
  ('ca-mau', 'Cà Mau'),
  ('can-tho', 'Cần Thơ'),
  ('cao-bang', 'Cao Bằng'),
  ('da-nang', 'Đà Nẵng'),
  ('dak-lak', 'Đắk Lắk'),
  ('dak-nong', 'Đắk Nông'),
  ('dien-bien', 'Điện Biên'),
  ('dong-nai', 'Đồng Nai'),
  ('dong-thap', 'Đồng Tháp'),
  ('gia-lai', 'Gia Lai'),
  ('ha-giang', 'Hà Giang'),
  ('ha-nam', 'Hà Nam'),
  ('ha-noi', 'Hà Nội'),
  ('ha-tinh', 'Hà Tĩnh'),
  ('hai-duong', 'Hải Dương'),
  ('hai-phong', 'Hải Phòng'),
  ('hau-giang', 'Hậu Giang'),
  ('hoa-binh', 'Hòa Bình'),
  ('ho-chi-minh', 'Hồ Chí Minh'),
  ('hung-yen', 'Hưng Yên'),
  ('khanh-hoa', 'Khánh Hòa'),
  ('kien-giang', 'Kiên Giang'),
  ('kon-tum', 'Kon Tum'),
  ('lai-chau', 'Lai Châu'),
  ('lam-dong', 'Lâm Đồng'),
  ('lang-son', 'Lạng Sơn'),
  ('lao-cai', 'Lào Cai'),
  ('long-an', 'Long An'),
  ('nam-dinh', 'Nam Định'),
  ('nghe-an', 'Nghệ An'),
  ('ninh-binh', 'Ninh Bình'),
  ('ninh-thuan', 'Ninh Thuận'),
  ('phu-tho', 'Phú Thọ'),
  ('phu-yen', 'Phú Yên'),
  ('quang-binh', 'Quảng Bình'),
  ('quang-nam', 'Quảng Nam'),
  ('quang-ngai', 'Quảng Ngãi'),
  ('quang-ninh', 'Quảng Ninh'),
  ('quang-tri', 'Quảng Trị'),
  ('soc-trang', 'Sóc Trăng'),
  ('son-la', 'Sơn La'),
  ('tay-ninh', 'Tây Ninh'),
  ('thai-binh', 'Thái Bình'),
  ('thai-nguyen', 'Thái Nguyên'),
  ('thanh-hoa', 'Thanh Hóa'),
  ('thua-thien-hue', 'Thừa Thiên Huế'),
  ('tien-giang', 'Tiền Giang'),
  ('tra-vinh', 'Trà Vinh'),
  ('tuyen-quang', 'Tuyên Quang'),
  ('vinh-long', 'Vĩnh Long'),
  ('vinh-phuc', 'Vĩnh Phúc'),
  ('yen-bai', 'Yên Bái')
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- EMERGENCY CONTACTS: Placeholder (needs verification)
-- Lưu ý: Số điện thoại là placeholder, cần xác minh từ BVĐK tỉnh thực tế
-- =============================================
INSERT INTO emergency_contacts (province_id, hospital_name, emergency_phone, address, source_name, status, note)
SELECT 
  p.id,
  'Bệnh viện Đa khoa ' || p.name,
  '115',
  'Địa chỉ cần cập nhật',
  'Placeholder - Cần xác minh',
  'needs_verify',
  'Số điện thoại placeholder. Cần xác minh số thật từ BVĐK tỉnh. Hiện tại fallback 115.'
FROM provinces p
ON CONFLICT DO NOTHING;

-- =============================================
-- CONTENT ARTICLES: Bài viết mẫu Level 1-3
-- =============================================
INSERT INTO content_articles (slug, title, category, level, summary_30s, body_md, faq_md, sources, status, published_at) VALUES
(
  'be-fast-dau-hieu-som-dot-quy',
  'BE FAST: Dấu hiệu sớm để nhận biết đột quỵ',
  'learn',
  1,
  'Chỉ cần 1 dấu hiệu BE FAST xuất hiện đột ngột: hãy gọi cấp cứu ngay. Đừng chờ tự hết.',
  E'## BE FAST là gì?\nBE FAST là cách nhớ nhanh các dấu hiệu sớm thường gặp của đột quỵ. Điểm quan trọng nhất: **triệu chứng thường xuất hiện ĐỘT NGỘT**.\n\n## B – Balance (thăng bằng)\n- Đột ngột chóng mặt, đi loạng choạng, mất phối hợp.\n\n## E – Eyes (mắt)\n- Đột ngột mờ mắt, nhìn đôi, mất thị lực một bên.\n\n## F – Face (mặt)\n- Méo miệng, mặt lệch khi cười.\n\n## A – Arm (tay/chân)\n- Yếu hoặc tê một bên tay/chân. Không nâng nổi hai tay cùng lúc.\n\n## S – Speech (lời nói)\n- Nói khó, nói ngọng, nói không rõ, không hiểu lời.\n\n## T – Time (thời gian)\n- **Nếu có bất kỳ dấu hiệu nào ở trên: GỌI CẤP CỨU NGAY.**\n- **Ghi lại "giờ khởi phát" hoặc "giờ lần cuối bình thường".**\n\n> Gợi ý nhanh: Nếu bạn phân vân, hãy ưu tiên gọi 115 để được hướng dẫn.',
  E'### Nếu triệu chứng tự hết thì sao?\nVẫn cần đi cấp cứu sớm. Triệu chứng thoáng qua có thể là dấu hiệu cảnh báo.\n\n### Nếu chỉ chóng mặt thôi có đáng lo?\nNếu chóng mặt xuất hiện **đột ngột**, kèm mất thăng bằng/mờ mắt/nói khó/yếu một bên, hãy gọi cấp cứu ngay.',
  '[{"name": "WHO / CDC / Hiệp hội đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
),
(
  'tia-dot-quy-thoang-qua',
  'TIA (đột quỵ thoáng qua): Triệu chứng hết rồi vẫn nguy hiểm',
  'learn',
  1,
  'TIA là tình huống triệu chứng giống đột quỵ nhưng có thể tự hết. Đây là cảnh báo mạnh: cần đi cấp cứu ngay.',
  E'## TIA là gì?\nTIA là cơn thiếu máu não thoáng qua. Triệu chứng có thể tự hết trong thời gian ngắn, nhưng **không có nghĩa là an toàn**.\n\n## Dấu hiệu giống đột quỵ\n- Méo miệng, yếu/tê một bên\n- Nói khó/nói ngọng\n- Mờ mắt/nhìn đôi\n- Mất thăng bằng\n\n## Bạn cần làm gì?\n1) **Gọi cấp cứu / đến cơ sở y tế ngay.**\n2) **Ghi lại thời điểm bắt đầu và thời điểm hết triệu chứng.**\n3) Chuẩn bị thông tin bệnh nền/thuốc đang dùng.\n\n> Nguyên tắc an toàn: Nếu triệu chứng giống đột quỵ, hãy xử trí như đột quỵ cho đến khi bác sĩ loại trừ.',
  E'### Tôi thấy ổn rồi, có cần đi viện không?\nCó. Vì TIA có thể là dấu hiệu cảnh báo một cơn đột quỵ nặng hơn.',
  '[{"name": "WHO / CDC / tổ chức đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
),
(
  '10-phut-dau-khi-nghi-dot-quy',
  '10 phút đầu khi nghi đột quỵ: Làm gì ngay để giảm hậu quả',
  'learn',
  2,
  'Ưu tiên: gọi cấp cứu, ghi giờ, không cho ăn/uống, theo dõi thở/ý thức và chuẩn bị thông tin cho nhân viên y tế.',
  E'## Mục tiêu trong 10 phút đầu\n**Gọi đúng – ghi đúng – không làm sai.**\n\n## 1) GỌI CẤP CỨU NGAY\n- Bấm gọi số cấp cứu (ưu tiên 115 hoặc số cấp cứu địa phương nếu có).\n\n## 2) GHI LẠI THỜI GIAN\n- Ghi **giờ khởi phát** hoặc **giờ lần cuối bình thường**.\n\n## 3) KHÔNG CHO ĂN/UỐNG\n- Tránh nguy cơ sặc khi người bệnh rối loạn nuốt.\n\n## 4) GIỮ AN TOÀN\n- Để người bệnh nằm yên.\n- Nếu nôn/đờ đẫn: đặt **nằm nghiêng an toàn**.\n\n## 5) CHUẨN BỊ THÔNG TIN\n- Triệu chứng chính (BE FAST)\n- Thời gian\n- Bệnh nền/thuốc đang dùng (nếu biết)\n\n> Quy tắc: Nếu đang phân vân, gọi 115 trước rồi làm các bước còn lại.',
  E'### Có nên tự lái xe đưa đi?\nNếu có thể gọi cấp cứu, hãy ưu tiên vì xe cấp cứu giúp xử trí sớm.',
  '[{"name": "Khuyến nghị xử trí cấp cứu đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
),
(
  'gio-khoi-phat-last-known-well',
  'Giờ khởi phát / "Giờ lần cuối bình thường": Vì sao bác sĩ cần biết?',
  'learn',
  2,
  'Thời gian bắt đầu triệu chứng ảnh hưởng đến quyết định xử trí. Nếu không chắc, hãy ghi "giờ lần cuối bình thường".',
  E'## 1) Vì sao thời gian quan trọng?\nTrong đột quỵ, **đến sớm** giúp bác sĩ đánh giá và chọn phương án phù hợp.\n\n## 2) Nếu bạn không chắc "bắt đầu lúc nào"?\nHãy dùng **GIỜ LẦN CUỐI BÌNH THƯỜNG**:\n- Lần cuối bạn thấy người bệnh hoàn toàn bình thường là khi nào?\n\n## 3) Ghi như thế nào cho đúng?\n- Ghi mốc giờ cụ thể (VD: 14:10)\n- Nếu triệu chứng thay đổi, ghi thêm: "nặng lên lúc…"\n\n## 4) Mẹo cho người nhà\n- Nếu người bệnh ngủ dậy mới phát hiện: ghi **giờ đi ngủ** là "lần cuối bình thường".\n\n> Bạn không cần tự kết luận. Chỉ cần ghi mốc thời gian rõ ràng và gọi cấp cứu.',
  E'### Tôi chỉ ước lượng được khoảng thời gian?\nVẫn ghi lại: "khoảng 2 giờ trước", và ghi thêm mốc giờ hiện tại.',
  '[{"name": "Hướng dẫn truyền thông đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
),
(
  'dot-quy-la-gi-tac-mach-xuat-huyet',
  'Đột quỵ là gì? Tắc mạch vs xuất huyết (hiểu nhanh)',
  'learn',
  3,
  'Đột quỵ thường là tắc mạch hoặc xuất huyết. Triệu chứng có thể giống nhau nên không tự kết luận: hãy gọi cấp cứu ngay.',
  E'## Đột quỵ là gì?\nĐột quỵ xảy ra khi não bị tổn thương do **thiếu máu nuôi** hoặc **chảy máu**.\n\n## 2 nhóm chính\n### 1) Đột quỵ do tắc mạch (thiếu máu não)\n- Dòng máu bị tắc → vùng não thiếu oxy.\n\n### 2) Đột quỵ do xuất huyết\n- Mạch máu vỡ → chảy máu trong não.\n\n## Vì sao người nhà không nên tự đoán?\n- Dấu hiệu ban đầu có thể giống nhau.\n- Việc quan trọng nhất vẫn là: **gọi cấp cứu + ghi thời gian**.\n\n> Website này ưu tiên giúp bạn nhận diện và hành động nhanh, không thay thế chẩn đoán.',
  E'### Có cách nào phân biệt tắc mạch hay xuất huyết tại nhà?\nKhông đáng tin. Cần cơ sở y tế và chẩn đoán hình ảnh.',
  '[{"name": "WHO / tổ chức đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
),
(
  'thoi-gian-vang-cap-cuu-som',
  '"Thời gian vàng" là gì? Vì sao đi cấp cứu càng sớm càng tốt',
  'learn',
  3,
  'Trong đột quỵ, trì hoãn làm tăng nguy cơ tổn thương não. Đến sớm giúp mở ra nhiều lựa chọn xử trí hơn.',
  E'## Vì sao gọi là "thời gian vàng"?\nVì trong những giờ đầu, bác sĩ có thể đánh giá và lựa chọn hướng xử trí phù hợp hơn. Mỗi phút chậm trễ có thể làm tăng tổn thương.\n\n## Bạn cần nhớ 2 điều\n1) **Đừng chờ tự hết.**\n2) **Giờ khởi phát/giờ lần cuối bình thường** là thông tin cực quan trọng.\n\n## Hành động đúng = tăng cơ hội hồi phục\n- Gọi cấp cứu.\n- Ghi giờ.\n- Không cho ăn/uống.\n- Chuẩn bị thông tin.\n\n> Nếu bạn chỉ nhớ 1 câu: **Nghi đột quỵ → gọi cấp cứu ngay.**',
  E'### Tôi ở xa bệnh viện thì sao?\nGọi cấp cứu để được hướng dẫn và điều phối phù hợp.',
  '[{"name": "WHO / hướng dẫn truyền thông đột quỵ (tổng hợp)"}]'::jsonb,
  'published',
  now()
)
ON CONFLICT (slug) DO NOTHING;
