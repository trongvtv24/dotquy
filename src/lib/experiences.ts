import { ReactNode } from 'react'

export interface ExperiencePost {
    slug: string
    title: string
    date: string
    keywords: string[]
    summary: string
    content?: ReactNode | string
}

export const experiences: ExperiencePost[] = [
    {
        slug: 'hanh-trinh-phat-hien-va-dieu-tri-dot-quy-cua-ba-noi',
        title: 'Hành trình phát hiện và điều trị đột quỵ của bà nội tại mốc "Thời gian vàng"',
        date: '24/02/2026',
        keywords: ['Dấu hiệu sớm', 'Thời gian vàng', 'Bệnh viện Bạch Mai', 'Cấp cứu'],
        summary: 'Chia sẻ về khoảnh khắc phát hiện bà nội có những dấu hiệu lạ, phản ứng của gia đình và hành trình điều trị tại Trung tâm Đột quỵ - Bệnh viện Bạch Mai, cùng những quan sát thực tế về tầm quan trọng của việc cấp cứu kịp thời.',
        content: `Mình làm website này chỉ muốn giúp mọi người nhận thức rõ hơn về đột quỵ và có những phản ứng nhanh nhạy hơn, tránh để lỡ mất **thời điểm cứu chữa VÀNG**, quan trọng nhất là giảm nguy cơ bị liệt và các tai biến sau đột quỵ. 

Sơ qua về trường hợp của bà nội mình thì bà mình năm nay 82 tuổi, có bệnh huyết áp cao từ lâu. 

Chiều ngày 16/12/2025 bà mình có những triệu chứng đầu tiên là cảm thấy mệt, chóng mặt và hơi tê các đầu ngón tay. Bác mình có cạo gió cho bà và tay chân vẫn giơ cao được nên cô Trạm trưởng y tế xã bảo không vấn đề gì. Sau này mình mới biết **dấu hiệu tê đầu ngón tay là 1 trong những dấu hiệu cần đi cấp cứu sớm**. 

Hôm sau bố mình thấy không đỡ mới đưa thẳng lên bệnh viện đa khoa tỉnh cấp cứu. 

Có 1 vấn đề là trước đây bà mình cũng hay từng bị mệt mệt chóng mặt kiểu này do bệnh lý huyết áp. Thường những lần như vậy bà sẽ xuống bệnh viện huyện nằm vài ngày là khỏi. Có lẽ có tiền sử như vậy nên mọi người không ai nghĩ ra vụ đột quỵ. Mặc dù trước đó 1 tuần mình đã có nhắc bà là nếu có dấu hiệu tê bì tay chân, mặt, hoặc bất cứ bộ phận nào thì phải đi cấp cứu ngay. Nhưng mình đoán bà không nhớ. 

Đến 23/12 thì mình thấy bà không ổn, có dấu hiệu đi lại và nói khó hơn. Mình vội vàng gọi hỏi bạn mình thì bạn mình bảo đưa bà ra ngay Bạch Mai để bạn khám. 

Sáng 24/12 thì mình đưa bà ra, bạn mình bận nhiều bệnh nhân nên bà đợi 1 lúc mình thấy không ổn lắm nên bảo bạn thì bạn bảo nhập viện cấp cứu luôn. 

Ở trung tâm 1 tuần thì bà mình được chuyển sang bên Phục hồi chức năng vẫn của Bạch Mai. 

Ở đây khoảng 1 tuần mình mới thấy có rất nhiều bệnh nhân đột quỵ ở nhiều lứa tuổi: có 1 thầy giáo mới 46 tuổi đang ăn sáng thì bị ngất. Lên đây phát hiện ra vỡ mạch máu não, phải mổ và may mắn kịp thời. Sau đó anh ấy mất khả năng nói và liệt 1 nửa bên trái và phải tập nói lại từ đầu. 

1 trường hợp khác mình thấy khá thương cảm là cô bé 16 tuổi ở Thanh Hóa đang học bị ngã ra ngất. Lúc đầu em bị liệt nửa người nằm im bất động, chị gái ra chăm sóc thay rửa hàng ngày. Sau đến khi mình rời Bạch Mai thì em gái ấy cũng đã bắt đầu tập đi lại chứ không nằm 1 chỗ nữa. Mừng thật. 

Rồi còn 1 ông 72 tuổi, đang tiếp khách, đi pha ấm nước thì đánh rơi cái tích xuống sàn và ngã, may người nhà đỡ kịp và cấp cứu kịp thời nên cơ bản nhẹ hơn bà mình. Sau khi xuất viện ở trung tâm Đột Quỵ là ông cũng đã đi lại khá ổn. 

Có rất nhiều hoàn cảnh đột quỵ khác nhau ở trong này. Cũng nhiều câu chuyện đáng buồn xảy ra mà mình chứng kiến trong viện khiến mình phải suy nghĩ nhiều về tình người và câu chuyện ốm đau, bệnh tật. 

*Bài sau mình sẽ chia sẻ 1 kinh nghiệm đến từ 1 sự cố nhỏ khiến bà mình bị tang huyết áp đột ngột suýt phải đi cấp cứu. Lúc ấy bà mình ở nhà tự phục hồi đợi ngày lên viện.*`
    },
    {
        slug: 'bai-hoc-ve-thoi-gian-vang-trong-cap-cuu-dot-quy',
        title: 'Bài học về "Thời gian vàng" trong cấp cứu đột quỵ',
        date: '05/01/2026',
        keywords: ['4.5 giờ', 'Cấp cứu', 'Não bộ'],
        summary: 'Tại sao thời gian lại quyết định sự sống còn và khả năng phục hồi của người bệnh sau đột quỵ.',
        content: '(Bài viết đang được cập nhật...)'
    },
    {
        slug: 'chuan-bi-tam-ly-va-do-dung-cho-nguoi-nha-benh-nhan',
        title: 'Chuẩn bị tâm lý và đồ dùng cho người nhà bệnh nhân',
        date: '10/01/2026',
        keywords: ['Tâm lý', 'Chuẩn bị', 'Kinh nghiệm'],
        summary: 'Kinh nghiệm chuẩn bị đồ đạc và giữ vững tinh thần để đồng hành cùng người thân trong chặng đường dài.',
        content: '(Bài viết đang được cập nhật...)'
    }
]
