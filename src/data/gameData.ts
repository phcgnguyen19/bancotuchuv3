// ============================
// HÀNH TRÌNH ĐỔI MỚI v2 — Game Data
// ============================

export type Advisor = {
  name: string;
  emoji: string;
  role: string;
  stance: 'hawk' | 'dove' | 'bamboo';
};

export type DebateMessage = {
  speaker: 'hawk' | 'dove' | 'bamboo';
  text: string;
};

export type Decision = {
  id: string;
  label: string;
  text: string;
  effects: {
    independence: number;
    development: number;
    diplomacy: number;
  };
  alignmentScore: number;
  isHistorical: boolean;
};

export type SubEvent = {
  context: string;
  question: string;
  decisions: Decision[];
};

export type Era = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
  introContext: string;
  advisors: Advisor[];
  debate: DebateMessage[];
  events: SubEvent[];
  historicalOutcome: string;
  partyAnalysis: string;
  lesson: string;
};

export const INITIAL_STATS = {
  independence: 60,
  development: 30,
  diplomacy: 40,
};

export const CRISIS_THRESHOLD = 20;

export const advisors: Advisor[] = [
  { name: 'Ông Cương', emoji: '🦅', role: 'Tướng quân Diều hâu', stance: 'hawk' },
  { name: 'Bà Hòa', emoji: '🕊️', role: 'Nhà ngoại giao Bồ câu', stance: 'dove' },
  { name: 'Ông Trung', emoji: '🎋', role: 'Chiến lược gia Cây tre', stance: 'bamboo' },
];

export const eras: Era[] = [
  // ============ ERA 1: 1945-1946 ============
  {
    id: 'era-1',
    year: '1945–1946',
    title: 'Giành Độc Lập',
    subtitle: 'Vạn dặm khởi đầu',
    color: 'from-amber-900 via-orange-900 to-red-950',
    accentColor: 'text-amber-400',
    introContext: 'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Nhưng non sông chưa kịp vui mừng thì 20 vạn quân Trung Hoa Dân Quốc đã tràn vào miền Bắc, còn thực dân Pháp lăm le quay trở lại miền Nam.',
    advisors,
    debate: [
      { speaker: 'hawk', text: 'Phải cầm súng ngay! Dân ta vừa đổ máu giành độc lập, giờ lại nhượng bộ thì còn gì là cách mạng?' },
      { speaker: 'dove', text: 'Ông Cương ơi, tỉnh lại đi! Quân ta chỉ có giáo mác, đánh cả Pháp lẫn Tưởng thì chết hết!' },
      { speaker: 'hawk', text: 'Bà Hòa nhu nhược! Nhượng bộ Pháp là phản bội xương máu đồng bào! Có chết cũng phải đánh!' },
      { speaker: 'bamboo', text: 'Hai vị bình tĩnh. Bác Hồ từng nói: "Dĩ bất biến, ứng vạn biến". Mục tiêu KHÔNG đổi — nhưng cách làm phải uyển chuyển theo tình thế.' },
      { speaker: 'dove', text: 'Vậy theo ông Trung, ta nên làm gì khi kẹt giữa hai gọng kìm?' },
      { speaker: 'bamboo', text: 'Đuổi một kẻ thù để dồn sức đối phó kẻ còn lại. Đó là sách lược, không phải đầu hàng.' },
    ],
    events: [
      {
        context: 'Quân Tưởng Giới Thạch chiếm đóng miền Bắc, quân Pháp áp sát miền Nam. Đất nước non trẻ kẹp giữa hai gọng kìm.',
        question: 'Đối mặt hai kẻ thù cùng lúc, bạn sẽ xử lý thế nào?',
        decisions: [
          {
            id: 'A', label: 'Kháng chiến trên mọi mặt trận',
            text: 'Phát động chiến tranh chống cả Pháp lẫn Tưởng đồng thời. Kêu gọi toàn dân cầm vũ khí.',
            effects: { independence: 10, development: -35, diplomacy: -25 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'B', label: 'Chấp nhận mọi yêu sách của Pháp',
            text: 'Đầu hàng ngoại giao: Để Pháp toàn quyền quay lại cai trị, đổi lấy hòa bình.',
            effects: { independence: -50, development: 15, diplomacy: 10 },
            alignmentScore: 1, isHistorical: false
          },
          {
            id: 'C', label: 'Hòa để tiến — Ký Hiệp định Sơ bộ 6/3',
            text: 'Cho 15.000 quân Pháp vào thay quân Tưởng ở miền Bắc. Đổi lại, Pháp công nhận VN là quốc gia tự do. Lùi một bước để tiến hai bước.',
            effects: { independence: 5, development: 15, diplomacy: 20 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      },
      {
        context: 'Sau Hiệp định Sơ bộ, phái đoàn Việt Nam sang Pháp dự Hội nghị Fontainebleau (1946). Pháp tỏ ra lật lọng, không muốn công nhận nền độc lập thực sự.',
        question: 'Pháp lật lọng tại bàn đàm phán. Bạn phản ứng thế nào?',
        decisions: [
          {
            id: 'A', label: 'Bỏ về, tuyên chiến ngay',
            text: 'Rút phái đoàn về nước, phát động kháng chiến toàn quốc ngay lập tức.',
            effects: { independence: 15, development: -25, diplomacy: -20 },
            alignmentScore: 4, isHistorical: false
          },
          {
            id: 'B', label: 'Nhượng bộ thêm để giữ hòa bình',
            text: 'Chấp nhận những điều khoản bất lợi hơn, miễn sao tránh được chiến tranh.',
            effects: { independence: -30, development: 10, diplomacy: 5 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Ký Tạm ước 14/9, tranh thủ thời gian chuẩn bị',
            text: 'Ký một hiệp ước tạm thời để duy trì đình chiến, đồng thời bí mật gấp rút xây dựng lực lượng vũ trang và củng cố hậu phương.',
            effects: { independence: 10, development: 10, diplomacy: 10 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      }
    ],
    historicalOutcome: 'Bác Hồ ký Hiệp định Sơ bộ (6/3/1946) rồi Tạm ước (14/9/1946). Nhờ sách lược ngoại giao thiên tài, Người đuổi được 20 vạn quân Tưởng không tốn một viên đạn và tranh thủ thời gian xây dựng lực lượng kháng chiến.',
    partyAnalysis: 'Mềm dẻo trong sách lược, kiên định trong chiến lược. "Lùi một bước để tiến hai bước." Giữ vững mục tiêu độc lập dân tộc nhưng biết nhân nhượng có nguyên tắc.',
    lesson: 'Độc lập tự chủ đòi hỏi sự uyển chuyển trong sách lược. Biết tạm nhượng bộ có nguyên tắc để bảo toàn lực lượng — đó là trí tuệ, không phải yếu đuối.'
  },

  // ============ ERA 2: 1975-1985 ============
  {
    id: 'era-2',
    year: '1975–1985',
    title: 'Thống Nhất & Thử Thách',
    subtitle: 'Gian nan sau chiến thắng',
    color: 'from-slate-800 via-slate-900 to-gray-950',
    accentColor: 'text-slate-300',
    introContext: 'Chiến thắng 30/4/1975, đất nước thống nhất. Nhưng Hoa Kỳ áp đặt cấm vận toàn diện, Trung Quốc gây chiến tranh biên giới 1979. Nền kinh tế kiệt quệ, Việt Nam phụ thuộc nặng nề vào viện trợ Liên Xô.',
    advisors,
    debate: [
      { speaker: 'hawk', text: 'Ta đã thắng Mỹ! Tự lực cánh sinh là truyền thống cách mạng. Cấm vận ư? Kệ họ!' },
      { speaker: 'dove', text: 'Ông Cương ơi, dân đang đói! Phải mở cửa với phương Tây ngay, bằng mọi giá!' },
      { speaker: 'bamboo', text: 'Cả hai cực đoan quá. Tự lực là cần thiết, nhưng không phải tự cô lập. Phụ thuộc hoàn toàn vào Liên Xô cũng là một dạng mất tự chủ.' },
      { speaker: 'hawk', text: 'Liên Xô là đồng minh! Sao lại nói mất tự chủ?' },
      { speaker: 'bamboo', text: 'Đồng minh hôm nay có thể đổi ý ngày mai. Viện trợ không phải vĩnh viễn. Nội lực mới là nền tảng.' },
    ],
    events: [
      {
        context: 'Đất nước thống nhất nhưng bị cấm vận quốc tế. Kinh tế kế hoạch hóa tập trung, bao cấp đang bộc lộ yếu kém nghiêm trọng. Liên Xô viện trợ gần 2 tỷ USD/năm.',
        question: 'Đất nước bị cô lập, phụ thuộc viện trợ. Bạn chọn con đường nào?',
        decisions: [
          {
            id: 'A', label: 'Tự lực tuyệt đối, đóng cửa',
            text: 'Từ chối mọi viện trợ có điều kiện. Tự cung tự cấp hoàn toàn.',
            effects: { independence: 15, development: -35, diplomacy: -30 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'B', label: 'Mở cửa với Mỹ bằng mọi giá',
            text: 'Chấp nhận toàn bộ điều kiện của phương Tây, kể cả nhượng bộ chính trị, để dỡ bỏ cấm vận.',
            effects: { independence: -40, development: 25, diplomacy: 20 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Tự cường nội lực, mở cửa có chọn lọc',
            text: 'Duy trì hợp tác với Liên Xô nhưng bắt đầu đa dạng hóa. Từng bước cải thiện quan hệ với ASEAN.',
            effects: { independence: 10, development: 10, diplomacy: 15 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      },
      {
        context: 'Chế độ Khmer Đỏ tàn sát hàng triệu người Cambodia và liên tục gây hấn biên giới Tây Nam. Cộng đồng quốc tế im lặng trước nạn diệt chủng.',
        question: 'Nạn diệt chủng ở Cambodia. Đất nước vừa ra khỏi chiến tranh, có nên can thiệp?',
        decisions: [
          {
            id: 'A', label: 'Không can thiệp, lo nội bộ trước',
            text: 'Đất nước còn quá yếu, không nên dính vào chuyện nước khác. Tập trung khôi phục kinh tế.',
            effects: { independence: 5, development: 10, diplomacy: -15 },
            alignmentScore: 4, isHistorical: false
          },
          {
            id: 'B', label: 'Can thiệp nhưng chiếm đóng lâu dài',
            text: 'Đưa quân sang lật đổ Khmer Đỏ và duy trì quân đội chiếm đóng vô thời hạn.',
            effects: { independence: -5, development: -30, diplomacy: -25 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'C', label: 'Giúp Cambodia tự giải phóng, rút quân có lộ trình',
            text: 'Đưa quân giúp nhân dân Cambodia lật đổ Pol Pot, hỗ trợ xây dựng chính quyền mới, sau đó rút quân theo lộ trình.',
            effects: { independence: 5, development: -10, diplomacy: 10 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      }
    ],
    historicalOutcome: 'Việt Nam đưa quân giúp Cambodia lật đổ Khmer Đỏ (1979), cứu hàng triệu sinh mạng. Dù bị quốc tế phản đối, lịch sử đã chứng minh đây là hành động chính nghĩa. Giai đoạn này cũng cho thấy bài học xương máu về sự phụ thuộc kinh tế.',
    partyAnalysis: 'Tự lực tự cường phải đi đôi với mở rộng hợp tác quốc tế. Phụ thuộc vào một nguồn duy nhất cũng là mất tự chủ. Nghĩa vụ quốc tế cao cả nhưng phải đi đôi với bảo vệ lợi ích quốc gia.',
    lesson: 'Độc lập tự chủ không phải tự cô lập. Lệ thuộc bất kỳ ai, dù là đồng minh, đều tiềm ẩn rủi ro. Đồng thời, trách nhiệm quốc tế là một phần của vị thế quốc gia.'
  },

  // ============ ERA 3: 1986 ============
  {
    id: 'era-3',
    year: '1986',
    title: 'Đổi Mới',
    subtitle: 'Bình minh trên đường cách mạng',
    color: 'from-yellow-800 via-amber-700 to-orange-800',
    accentColor: 'text-yellow-300',
    introContext: 'Kinh tế rơi vào khủng hoảng trầm trọng: lạm phát gần 800%/năm, hàng triệu người thiếu đói. Liên Xô — chỗ dựa chính — bắt đầu lung lay. Đại hội VI của Đảng (12/1986) đứng trước quyết định sống còn.',
    advisors,
    debate: [
      { speaker: 'hawk', text: 'Giữ nguyên! Khó khăn là tạm thời. Đổi mới kinh tế sẽ kéo theo đổi mới chính trị, rồi mất chế độ như Liên Xô!' },
      { speaker: 'dove', text: 'Liên Xô sắp sụp rồi! Phải cải cách triệt để theo phương Tây: kinh tế tự do, đa nguyên chính trị, bỏ hết!' },
      { speaker: 'bamboo', text: 'Ông Cương muốn giữ cái đã thất bại. Bà Hòa muốn vứt luôn cả nền tảng. Cả hai đều sai.' },
      { speaker: 'hawk', text: 'Vậy ông Trung có cao kiến gì?' },
      { speaker: 'bamboo', text: 'Đổi mới PHƯƠNG THỨC, giữ vững MỤC TIÊU. Kinh tế thị trường — vâng. Nhưng định hướng XHCN — phải giữ. Đổi Mới chứ không Đổi Màu.' },
      { speaker: 'dove', text: 'Kinh tế thị trường mà XHCN? Đó là mâu thuẫn!' },
      { speaker: 'bamboo', text: 'Không mâu thuẫn. Đó là sáng tạo. Trung Quốc cũng đang đi con đường tương tự.' },
    ],
    events: [
      {
        context: 'Lạm phát phi mã gần 800%. Hàng triệu người thiếu ăn. Mô hình kinh tế kế hoạch hóa tập trung đã bế tắc hoàn toàn.',
        question: 'Đại hội VI sắp diễn ra. Bạn chọn đường lối nào?',
        decisions: [
          {
            id: 'A', label: 'Giữ nguyên mô hình kế hoạch hóa',
            text: 'Duy trì kinh tế bao cấp, siết chặt quản lý. Tin rằng khủng hoảng sẽ qua.',
            effects: { independence: 5, development: -40, diplomacy: -15 },
            alignmentScore: 1, isHistorical: false
          },
          {
            id: 'B', label: 'Cải cách triệt để theo phương Tây',
            text: 'Kinh tế thị trường tự do hoàn toàn, tư nhân hóa, đa nguyên đa đảng.',
            effects: { independence: -45, development: 30, diplomacy: 20 },
            alignmentScore: 1, isHistorical: false
          },
          {
            id: 'C', label: 'Đổi Mới — Kinh tế thị trường định hướng XHCN',
            text: 'Xóa bỏ bao cấp, chuyển sang kinh tế thị trường nhưng dưới sự lãnh đạo của Đảng. Giữ vững định hướng XHCN.',
            effects: { independence: 10, development: 30, diplomacy: 15 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      },
      {
        context: 'Đổi Mới bắt đầu triển khai. Nhưng câu hỏi đặt ra: Đổi mới kinh tế có cần đổi mới chính trị theo kiểu phương Tây không? Liên Xô dưới thời Gorbachev đang "Perestroika + Glasnost" — cải cách cả kinh tế lẫn chính trị.',
        question: 'Liên Xô vừa cải cách cả chính trị lẫn kinh tế. Việt Nam có nên làm theo?',
        decisions: [
          {
            id: 'A', label: 'Làm theo Liên Xô: Cải cách toàn diện',
            text: 'Đổi mới cả kinh tế lẫn chính trị theo mô hình Perestroika + Glasnost.',
            effects: { independence: -35, development: 10, diplomacy: 10 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'B', label: 'Dừng Đổi Mới, quay lại mô hình cũ',
            text: 'Lo sợ mất kiểm soát như Liên Xô, quyết định dừng cải cách kinh tế.',
            effects: { independence: 5, development: -30, diplomacy: -10 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Đổi mới kinh tế mạnh mẽ, giữ ổn định chính trị',
            text: 'Kiên trì cải cách kinh tế nhưng giữ vững sự lãnh đạo của Đảng và ổn định chính trị. Không copy mô hình của bất kỳ nước nào.',
            effects: { independence: 15, development: 20, diplomacy: 10 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      }
    ],
    historicalOutcome: 'Việt Nam kiên trì Đổi Mới kinh tế nhưng giữ ổn định chính trị. Liên Xô làm ngược lại (Glasnost trước Perestroika) và sụp đổ năm 1991. Sự đúng đắn của Việt Nam được lịch sử chứng minh.',
    partyAnalysis: '"Đổi Mới chứ không Đổi Màu." Kiên định mục tiêu CNXH nhưng sáng tạo, đổi mới phương thức thực hiện. Không copy mô hình nào — tự tìm con đường riêng phù hợp thực tiễn Việt Nam.',
    lesson: 'Kiên định con đường cách mạng nhưng dũng cảm đổi mới phương thức. Đổi Mới không phải từ bỏ mục tiêu, mà là tìm cách tốt hơn để đạt mục tiêu.'
  },

  // ============ ERA 4: 1995-2007 ============
  {
    id: 'era-4',
    year: '1995–2007',
    title: 'Hội Nhập Quốc Tế',
    subtitle: 'Bước ra sân chơi toàn cầu',
    color: 'from-emerald-800 via-teal-800 to-cyan-900',
    accentColor: 'text-emerald-300',
    introContext: 'Đổi Mới mang lại kết quả. Năm 1995, Việt Nam bình thường hóa quan hệ với Hoa Kỳ và gia nhập ASEAN. Triển vọng gia nhập WTO đang mở ra. Câu hỏi lớn: Mở cửa đến đâu và giữ gì cho mình?',
    advisors,
    debate: [
      { speaker: 'dove', text: 'Mở toang cánh cửa! Xóa bỏ mọi hàng rào thuế quan, cho tự do đầu tư 100%. Tốc độ là tất cả!' },
      { speaker: 'hawk', text: 'Bà Hòa! WTO sẽ nghiền nát doanh nghiệp nhỏ của ta! Nông dân sẽ phá sản hàng loạt!' },
      { speaker: 'dove', text: 'Nhưng không vào WTO thì mãi mãi nghèo! Thế giới đang bỏ xa ta rồi!' },
      { speaker: 'bamboo', text: 'Cả hai đều đúng một phần. Vào WTO — nhưng theo lộ trình. Mở cửa — nhưng giữ quyền kiểm soát ở lĩnh vực trọng yếu.' },
      { speaker: 'hawk', text: 'Lộ trình gì? Họ sẽ ép ta mở hết!' },
      { speaker: 'bamboo', text: '11 năm đàm phán, ông Cương ạ. Ta sẽ đàm phán từng điều khoản. Đó là chủ động hội nhập.' },
    ],
    events: [
      {
        context: 'Cánh cửa WTO đang mở. Các hiệp định thương mại tự do song phương và đa phương đang chờ Việt Nam.',
        question: 'Hội nhập kinh tế quốc tế: Bạn chọn mức độ nào?',
        decisions: [
          {
            id: 'A', label: 'Bảo hộ, chỉ hội nhập hạn chế',
            text: 'Duy trì hàng rào thuế quan cao, từ chối WTO, chỉ hợp tác ở mức tối thiểu.',
            effects: { independence: 10, development: -30, diplomacy: -25 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'B', label: 'Mở toang, tự do hóa hoàn toàn',
            text: 'Xóa bỏ mọi rào cản, cho phép sở hữu nước ngoài 100% ở mọi lĩnh vực kể cả an ninh.',
            effects: { independence: -40, development: 30, diplomacy: 25 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Chủ động hội nhập, giữ nguyên tắc',
            text: 'Gia nhập WTO theo lộ trình 11 năm đàm phán. Mở cửa nhưng giữ kiểm soát lĩnh vực trọng yếu (an ninh, quốc phòng, tài chính).',
            effects: { independence: 10, development: 25, diplomacy: 20 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      },
      {
        context: 'Dòng vốn FDI đổ vào ào ạt. Nhiều doanh nghiệp nhà nước thua lỗ nặng, kém cạnh tranh. Áp lực tư nhân hóa toàn bộ khu vực nhà nước rất lớn.',
        question: 'Doanh nghiệp nhà nước yếu kém, áp lực tư nhân hóa rất lớn. Bạn xử lý thế nào?',
        decisions: [
          {
            id: 'A', label: 'Giữ nguyên tất cả doanh nghiệp nhà nước',
            text: 'Bảo vệ mọi doanh nghiệp nhà nước dù thua lỗ. Dùng ngân sách bù lỗ vô thời hạn.',
            effects: { independence: 5, development: -25, diplomacy: -10 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'B', label: 'Tư nhân hóa toàn bộ',
            text: 'Bán hết doanh nghiệp nhà nước cho tư nhân và nước ngoài, kể cả các ngành chiến lược.',
            effects: { independence: -35, development: 20, diplomacy: 15 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Cổ phần hóa có chọn lọc',
            text: 'Cổ phần hóa các doanh nghiệp kém hiệu quả nhưng giữ Nhà nước nắm chi phối ở ngành then chốt (điện, dầu khí, viễn thông). Nâng cao năng lực quản trị.',
            effects: { independence: 10, development: 20, diplomacy: 10 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      }
    ],
    historicalOutcome: 'Việt Nam gia nhập WTO (2007) sau 11 năm đàm phán kiên trì, giảm thuế dần dần, giữ danh mục ngành cấm đầu tư nước ngoài. Cổ phần hóa DNNN có chọn lọc nhưng giữ Nhà nước chi phối ngành then chốt. GDP tăng 7-8%/năm.',
    partyAnalysis: '"Chủ động hội nhập kinh tế quốc tế" nhưng "giữ vững độc lập, tự chủ." Kinh tế Nhà nước giữ vai trò chủ đạo ở các lĩnh vực then chốt. Hội nhập là phương tiện, không phải mục đích.',
    lesson: 'Hội nhập quốc tế phải chủ động, tích cực và có nguyên tắc. Không hy sinh an ninh và chủ quyền kinh tế để đổi lấy tốc độ tăng trưởng.'
  },

  // ============ ERA 5: 2010s-Nay ============
  {
    id: 'era-5',
    year: '2010s–Nay',
    title: 'Ngoại Giao Cây Tre',
    subtitle: 'Gốc vững, cành uyển chuyển',
    color: 'from-indigo-900 via-blue-900 to-purple-950',
    accentColor: 'text-blue-300',
    introContext: 'Thế giới bước vào kỷ nguyên cạnh tranh quyền lực. Mỹ-Trung đối đầu, Biển Đông căng thẳng, các nước lớn ép Việt Nam "chọn phe." Đồng thời, CPTPP, RCEP, EVFTA mở ra cơ hội chưa từng có.',
    advisors,
    debate: [
      { speaker: 'hawk', text: 'Biển Đông bị xâm phạm! Phải liên minh quân sự ngay với một siêu cường!' },
      { speaker: 'dove', text: 'Liên minh là mất độc lập! Hãy nhượng bộ một phần để giữ hòa bình và kinh tế.' },
      { speaker: 'hawk', text: 'Nhượng bộ chủ quyền?! Bà nói gì vậy?' },
      { speaker: 'bamboo', text: 'Không liên minh, không nhượng bộ. Gốc phải VỮNG — kiên quyết chủ quyền. Cành phải UYỂN CHUYỂN — làm bạn với tất cả.' },
      { speaker: 'dove', text: 'Làm bạn với tất cả nghe hay, nhưng khi bị ép chọn phe thì sao?' },
      { speaker: 'bamboo', text: 'Đa phương hóa. Khi bạn là đối tác của TẤT CẢ, không ai dám ép bạn chọn phe. Đó là sức mạnh của cây tre — bão to cành uốn nhưng gốc không bao giờ đổ.' },
    ],
    events: [
      {
        context: 'Biển Đông ngày càng căng thẳng. Các siêu cường gây sức ép buộc Việt Nam phải "chọn phe" trong cuộc cạnh tranh Mỹ-Trung.',
        question: 'Áp lực chọn phe từ các siêu cường. Bạn quyết sách thế nào?',
        decisions: [
          {
            id: 'A', label: 'Gia nhập liên minh quân sự',
            text: 'Ký hiệp ước quân sự với một siêu cường, cho đặt căn cứ quân sự trên lãnh thổ.',
            effects: { independence: -50, development: 15, diplomacy: -20 },
            alignmentScore: 1, isHistorical: false
          },
          {
            id: 'B', label: 'Nhượng bộ chủ quyền Biển Đông',
            text: 'Im lặng trước xâm phạm chủ quyền, ưu tiên kinh tế ổn định.',
            effects: { independence: -35, development: 10, diplomacy: -15 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'C', label: 'Ngoại giao Cây tre — "4 Không"',
            text: 'Kiên quyết bảo vệ chủ quyền bằng biện pháp hòa bình + luật pháp quốc tế. Thực hiện "4 Không" nhưng nâng cấp quan hệ với TẤT CẢ các nước lớn.',
            effects: { independence: 20, development: 15, diplomacy: 25 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      },
      {
        context: 'Các hiệp định thương mại thế hệ mới (CPTPP, EVFTA, RCEP) đều đặt ra tiêu chuẩn rất cao về lao động, sở hữu trí tuệ, môi trường. Nhiều ý kiến lo ngại doanh nghiệp Việt Nam chưa đủ sức đáp ứng.',
        question: 'CPTPP, EVFTA, RCEP đặt tiêu chuẩn rất cao. Chiến lược của bạn?',
        decisions: [
          {
            id: 'A', label: 'Từ chối tham gia',
            text: 'Không ký bất kỳ hiệp định nào. Doanh nghiệp ta chưa đủ sức cạnh tranh.',
            effects: { independence: 5, development: -30, diplomacy: -30 },
            alignmentScore: 2, isHistorical: false
          },
          {
            id: 'B', label: 'Ký hết, chấp nhận mọi điều khoản',
            text: 'Ký tất cả hiệp định mà không đàm phán điều khoản bảo vệ, hy vọng thị trường tự điều chỉnh.',
            effects: { independence: -20, development: 15, diplomacy: 20 },
            alignmentScore: 3, isHistorical: false
          },
          {
            id: 'C', label: 'Ký có lộ trình, cải cách nội bộ song song',
            text: 'Tham gia CPTPP, EVFTA, RCEP nhưng đàm phán lộ trình chuyển đổi. Song song cải cách thể chế, nâng cao năng lực doanh nghiệp nội địa.',
            effects: { independence: 15, development: 25, diplomacy: 20 },
            alignmentScore: 10, isHistorical: true
          },
        ]
      }
    ],
    historicalOutcome: 'Việt Nam thực hiện "Ngoại giao Cây tre": Nâng cấp Đối tác Chiến lược Toàn diện với Mỹ, Trung Quốc, Nhật, Hàn, Úc; Ký CPTPP (2018), EVFTA (2020), RCEP (2020) với lộ trình chuyển đổi phù hợp; Kiên quyết bảo vệ chủ quyền Biển Đông bằng luật pháp quốc tế.',
    partyAnalysis: 'Chính sách "4 Không" (Đại hội XIII): Không tham gia liên minh quân sự; không liên kết chống nước nào; không cho đặt căn cứ; không dùng vũ lực. "Gốc vững, thân chắc, cành uyển chuyển" — Ngoại giao Cây tre Việt Nam.',
    lesson: 'Đa phương hóa, đa dạng hóa quan hệ quốc tế là chìa khóa bảo vệ độc lập tự chủ. Khi bạn là đối tác tin cậy của tất cả, không ai có thể ép bạn chọn phe.'
  }
];
