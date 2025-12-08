// DOM 요소 선택
const blogForm = document.getElementById('blogForm');
const mainKeywordInput = document.getElementById('mainKeyword');
const itemCountSelect = document.getElementById('itemCount');
const copyBtn = document.getElementById('copyBtn');
const downloadWordBtn = document.getElementById('downloadWordBtn');

// 미리보기 요소
const previewSection = document.getElementById('previewSection');
const generatedContent = document.getElementById('generatedContent');

// 로컬 스토리지 키
const STORAGE_KEY = 'naver_blog_seo_draft';

// 생성된 콘텐츠 저장 변수
let currentContent = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 초기화 완료
});

// 폼 제출 처리
blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const keyword = mainKeywordInput.value.trim();
    const count = parseInt(itemCountSelect.value);
    
    // SEO 콘텐츠 생성
    const content = generateSEOContent(keyword, count);
    currentContent = content;
    
    // 미리보기 표시
    showGeneratedContent(content);
    
    // Word 다운로드 버튼 표시
    downloadWordBtn.style.display = 'inline-block';
    
    // 성공 메시지
    alert('SEO 콘텐츠가 생성되었습니다!');
});

// 복사 버튼
copyBtn.addEventListener('click', () => {
    const content = generatedContent.innerText;
    
    navigator.clipboard.writeText(content).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '복사 완료!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('복사에 실패했습니다. 수동으로 복사해주세요.');
    });
});

// Word 파일 다운로드 버튼
downloadWordBtn.addEventListener('click', () => {
    if (!currentContent) {
        alert('먼저 콘텐츠를 생성해주세요.');
        return;
    }
    
    downloadAsWord(currentContent, mainKeywordInput.value.trim());
});

// SEO 콘텐츠 생성 함수
function generateSEOContent(keyword, count) {
    const blogTitle = generateBlogTitle(keyword);
    const metaDescription = generateMetaDescription(keyword);
    const items = [];
    
    for (let i = 1; i <= count; i++) {
        items.push(generateItem(keyword, i));
    }
    
    const closingText = generateClosingText(keyword);
    
    return {
        blogTitle,
        metaDescription,
        items,
        closingText
    };
}

// 블로그 제목 생성
function generateBlogTitle(keyword) {
    const templates = [
        `아이폰17배경화면 4K 고화질 ${keyword} BEST 12선 완벽 가이드`,
        `아이폰17배경화면 4K 고화질 ${keyword} 추천 컬렉션`,
        `아이폰17배경화면 4K 고화질 ${keyword} 트렌디한 스타일 모음`,
        `아이폰17배경화면 4K 고화질 ${keyword} 감성 가득 추천`,
        `아이폰17배경화면 4K 고화질 ${keyword} 최신 트렌드 총정리`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// 메타 설명 생성
function generateMetaDescription(keyword) {
    const templates = [
        `${keyword}을 찾고 계신가요? 2025년 최신 트렌드를 반영한 ${keyword} 완벽 가이드를 소개합니다. 트렌디하고 감성적인 디자인부터 미니멀하고 세련된 스타일까지, 다양한 취향과 스타일에 맞는 최고의 ${keyword}을 엄선했습니다. 각 디자인마다 고화질 4K 이미지로 제작되었으며, 감성적인 설명과 함께 상세하게 소개합니다. 각 테마별로 엄선된 고품질 이미지와 세심하게 작성된 설명을 통해 당신에게 꼭 맞는 스타일을 찾아보세요. 제공되는 해시태그를 활용하면 SNS 공유도 쉽게 할 수 있습니다. 지금 바로 당신의 취향에 맞는 특별한 ${keyword}을 만나보세요. 전문가가 큐레이션한 컬렉션으로 누구나 쉽게 마음에 드는 디자인을 선택할 수 있습니다.`,
        
        `${keyword} 추천 BEST 컬렉션을 한눈에 만나보세요! 자연의 아름다움부터 도시의 감성, 빈티지 레트로 스타일까지 모든 분위기를 아우르는 ${keyword}을 총정리했습니다. 각 이미지는 4K 초고화질로 제작되어 레티나 디스플레이에서도 선명하고 생생하게 감상할 수 있습니다. 모든 디자인에는 감성적이고 세심한 설명이 함께 제공되며, 각 테마가 가진 독특한 매력과 분위기를 상세히 소개합니다. 전문 디자이너가 엄선한 색감과 구도, 분위기까지 완벽하게 고려된 컬렉션으로 당신의 일상에 특별함을 더해보세요. 고품질 이미지와 풍부한 설명으로 구성된 이 가이드는 선택의 즐거움을 선사합니다.`,
        
        `2025년 가장 핫한 ${keyword} 트렌드를 지금 바로 확인하세요! 이번 컬렉션에서는 계절감 넘치는 디자인부터 시간을 초월한 클래식 스타일, 그리고 최신 트렌드를 반영한 모던한 감성까지 모두 담았습니다. 각각의 ${keyword}은 전문가의 손길을 거쳐 세심하게 기획되었으며, 고화질 4K, ultra HD 품질로 제작되어 어떤 디스플레이에서도 완벽한 화질을 자랑합니다. 단순히 이미지만 제공하는 것이 아니라, 각 디자인의 콘셉트와 감성을 담은 상세한 설명으로 이미지에 담긴 스토리를 전달합니다. 각 테마별로 엄선된 비주얼과 함께 세심한 해설이 더해져 완벽한 가이드를 제공합니다. 블로그, 인스타그램 등 다양한 SNS에서 활용할 수 있는 해시태그도 함께 제공되니 놓치지 마세요.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// 개별 항목 생성
function generateItem(keyword, index) {
    const themes = generateThemesByKeyword(keyword);
    const theme = themes[(index - 1) % themes.length];
    const hashtags = generateHashtags(keyword, theme.title);
    
    // 4K 고화질 키워드를 프롬프트 앞부분에 배치
    const qualityPrefix = '4K 고화질, 세로 배경';
    
    return {
        number: index,
        title: theme.title,
        description: theme.desc,
        hashtags: hashtags,
        koreanPrompt: `${qualityPrefix}, ${theme.ko}`,
        englishPrompt: `4K high resolution, vertical wallpaper, ${theme.en}`
    };
}

// 키워드에 따른 테마 생성
function generateThemesByKeyword(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    
    // 크리스마스 관련
    if (lowerKeyword.includes('크리스마스') || lowerKeyword.includes('christmas')) {
        return [
            { title: '화이트 크리스마스', desc: '소복이 쌓인 눈 위로 반짝이는 크리스마스 조명이 따뜻한 빛을 발하는 환상적인 겨울밤 풍경입니다. 깨끗한 하얀 눈이 내리는 고요한 밤, 거리의 가로등과 집집마다 장식된 트리의 불빛들이 하나둘 켜지며 마법 같은 분위기를 연출합니다. 겨울밤의 설렘과 포근함이 가득한 감성적인 장면으로, 마치 동화 속 한 장면처럼 아름답고 평화로운 크리스마스의 본질을 담아냈습니다. 차가운 공기 속에서도 따뜻함이 느껴지는 이 순간은 크리스마스만이 선사할 수 있는 특별한 감동을 전해줍니다.', ko: '미니멀리즘. 눈 내리는 크리스마스 밤 풍경, 흰 눈이 소복이 쌓인 거리, 따뜻한 황금빛 크리스마스 트리 조명이 어둠 속에서 부드럽게 빛나는 모습, 고요하고 평화로운 겨울 분위기, 명암의 섬세한 대비', en: 'minimalism. Snowing Christmas night scene, streets covered with white snow, warm golden Christmas tree lights glowing softly in the darkness, quiet and peaceful winter atmosphere, subtle contrast of light and shadow, cinematic composition' },
            { title: '크리스마스 트리의 향연', desc: '화려하게 장식된 크리스마스 트리가 방 안을 환하게 밝히며 축제의 중심이 됩니다. 금빛과 은빛 오너먼트들이 조명을 받아 반짝이고, 알록달록한 전구들이 리드미컬하게 깜빡이며 생동감을 더합니다. 트리 꼭대기의 별 장식부터 가장 아래 놓인 선물 상자들까지, 모든 디테일이 정성스럽게 꾸며져 있어 보는 이의 마음을 설레게 만듭니다. 전나무 향기가 은은하게 퍼지는 아늑한 실내에서 가족들과 함께 보내는 따뜻한 크리스마스 이브의 순간이 고스란히 담겨있으며, 축제 분위기를 한껏 고조시키는 완벽한 크리스마스의 상징입니다.', ko: '클로즈업, 매크로. 화려하게 장식된 크리스마스 트리의 세부 장식, 금색과 은색 오너먼트가 빛을 반사하는 모습, 반짝이는 전구들의 보케 효과, 따뜻한 실내 조명, 풍성한 전나무 가지의 질감', en: 'close-up, macro. Detailed decorations of lavishly decorated Christmas tree, gold and silver ornaments reflecting light, bokeh effect of sparkling lights, warm indoor lighting, texture of lush pine branches, festive atmosphere' },
            { title: '산타의 마을', desc: '동화 속에서나 볼 법한 산타마을의 환상적인 겨울 풍경이 눈앞에 펼쳐집니다. 빨간 지붕의 작은 집들이 눈으로 뒤덮여 있고, 각 집의 굴뚝에서는 하얀 연기가 피어오르며 포근한 온기를 전합니다. 가로등 불빛 아래 눈사람들이 줄지어 서있고, 멀리 산타의 작업장에서는 요정들이 바쁘게 움직이는 모습이 상상됩니다. 북극의 오로라가 은은하게 하늘을 수놓고, 루돌프와 썰매가 지나간 흔적이 눈 위에 남아있는 듯한 마법 같은 장면입니다. 크리스마스의 순수한 마법과 동심을 완벽하게 구현한 꿈같은 풍경으로, 모든 이의 가슴속에 간직된 크리스마스에 대한 환상을 현실로 만들어냅니다.', ko: '동화적 분위기. 눈 덮인 작은 산타 마을의 전경, 빨간 지붕에서 피어오르는 하얀 굴뚝 연기, 따뜻한 창문 불빛, 눈 쌓인 언덕과 소나무, 은은한 북극 오로라 배경, 마법 같은 겨울 밤', en: 'fairytale atmosphere. Panoramic view of small snow-covered Santa village, white chimney smoke rising from red roofs, warm window lights, snowy hills and pine trees, subtle northern lights in background, magical winter night, enchanting scene' },
            { title: '크리스마스 일루미네이션', desc: '거리를 가득 채운 화려한 크리스마스 조명이 밤하늘을 수놓으며 도시 전체를 거대한 크리스마스 선물로 변신시킵니다. 수백만 개의 LED 전구들이 만들어내는 빛의 향연은 마치 별이 땅으로 내려온 듯 환상적입니다. 건물 외벽을 따라 흐르는 빛의 물결, 나무마다 걸린 반짝이는 전구들, 그리고 거대한 조형물들이 어우러져 숨막히게 아름다운 야경을 완성합니다. 사람들의 얼굴에 비치는 형형색색의 불빛, 들뜬 웃음소리, 그리고 거리를 가득 채운 크리스마스 캐롤이 어우러져 축제의 절정을 이룹니다. 평범한 거리가 빛의 예술 작품으로 탈바꿈하는 이 순간은 크리스마스 시즌만의 특별한 선물입니다.', ko: '도시 야경. 화려한 크리스마스 일루미네이션으로 장식된 거리, 수많은 LED 전구가 만드는 빛의 물결, 건물 외벽의 빛 장식, 반짝이는 트리와 조형물, 깊은 밤하늘 대비, 축제적 분위기', en: 'urban night scene. Streets decorated with spectacular Christmas illumination, waves of light from countless LED bulbs, light decorations on building facades, sparkling trees and sculptures, contrast with deep night sky, festive atmosphere, vibrant colors' },
            { title: '눈꽃 장식', desc: '창문에 맺힌 서리와 눈꽃 결정이 만들어낸 자연의 놀라운 예술작품입니다. 영하의 추운 날씨가 만들어낸 섬세하고 복잡한 얼음 패턴은 마치 누군가 정교하게 그린 레이스 같은 아름다움을 자랑합니다. 각각의 눈꽃 결정은 독특한 형태를 가지고 있으며, 햇빛이나 실내 조명을 받아 크리스탈처럼 투명하고 영롱하게 반짝입니다. 창 밖으로 보이는 겨울 풍경과 어우러져 한 폭의 수채화 같은 장면을 연출하며, 자연이 선사하는 겨울의 기적을 고스란히 담아냅니다. 인공적인 장식으로는 절대 흉내낼 수 없는 자연의 섬세함과 완벽함이 돋보이는, 크리스마스 시즌의 숨겨진 보석 같은 순간입니다.', ko: '매크로, 텍스처. 창문 유리에 맺힌 섬세한 눈꽃 결정 패턴의 극사실적 클로즈업, 얼음 결정의 복잡한 기하학적 구조, 빛이 투과하며 만드는 영롱한 반사, 차갑고 투명한 질감', en: 'macro, texture. Ultra-realistic close-up of delicate frost pattern crystals on window glass, intricate geometric structure of ice crystals, ethereal reflections created by light passing through, cold and transparent texture, natural winter art' },
            { title: '따뜻한 벽난로', desc: '크리스마스 양말이 정성스럽게 걸린 벽난로에서 타오르는 따뜻한 불길이 온 집안을 포근하게 감싸 안습니다. 타닥타닥 소리를 내며 타오르는 장작의 불꽃은 오렌지빛 온기를 방 안 곳곳에 전하고, 벽난로 선반 위에는 크리스마스 장식품들이 사랑스럽게 놓여있습니다. 빨강과 하양의 줄무늬 양말 속에는 산타클로스가 넣어줄 선물을 기다리는 설렘이 가득하고, 난로 앞 러그 위에는 뜨거운 코코아 한 잔이 김을 내뿜고 있습니다. 가족들이 모여 앉아 이야기를 나누며 웃음꽃을 피우는 이 공간은 크리스마스의 진정한 의미인 사랑과 온기, 그리고 함께함의 소중함을 일깨워주는 완벽한 장면입니다.', ko: '따뜻한 실내. 크리스마스 양말이 걸린 전통적인 벽난로, 타오르는 장작불의 따뜻한 황금빛 빛, 벽난로 위 장식품들, 아늑한 거실 분위기, 부드러운 조명, 포근한 느낌', en: 'cozy interior. Traditional fireplace with Christmas stockings hanging, warm golden glow of burning logs, decorations on mantelpiece, snug living room atmosphere, soft lighting, comforting feeling, homey warmth' },
            { title: '진저브레드 하우스', desc: '달콤한 진저브레드 쿠키로 정성스럽게 만든 사탕의 집이 설탕가루 눈 위에 동화처럼 서있습니다. 초콜릿으로 만든 문과 창문, 사탕으로 장식한 지붕, 그리고 아이싱으로 그린 섬세한 디테일까지, 모든 부분이 먹음직스럽고 사랑스럽습니다. 알록달록한 젤리와 마시멜로우, 페퍼민트 캔디가 집 주변을 장식하고, 작은 진저브레드 사람들이 집 앞에서 크리스마스 파티를 즐기는 모습이 상상됩니다. 계피와 생강, 그리고 달콤한 향신료의 향기가 코끝을 자극하며, 어린 시절 동화책에서 보던 헨젤과 그레텔의 과자 집이 현실이 된 듯한 마법 같은 순간입니다. 크리스마스의 달콤함과 즐거움, 그리고 창의성이 모두 담긴 완벽한 크리스마스 디저트 작품입니다.', ko: '클로즈업, 푸드 포토그래피. 진저브레드 쿠키로 만든 사탕 집의 세밀한 디테일, 아이싱과 사탕 장식, 알록달록한 색상, 설탕가루 눈, 따뜻한 조명, 동화적이고 달콤한 분위기', en: 'close-up, food photography. Intricate details of gingerbread candy house, icing and candy decorations, colorful vibrant hues, powdered sugar snow, warm lighting, whimsical and sweet atmosphere, festive dessert' },
            { title: '크리스마스 별빛', desc: '밤하늘에 유독 밝게 빛나는 베들레헴의 별이 어둠을 밝히며 신성한 크리스마스 밤을 수놓습니다. 수많은 별들 사이에서도 유독 눈에 띄는 그 별은 희망과 기쁜 소식의 상징으로, 2000년 전 그날 밤처럼 오늘도 세상을 환하게 비춥니다. 고요하고 평화로운 밤, 교회의 종소리가 은은하게 울려 퍼지고, 사람들은 경건한 마음으로 하늘을 올려다봅니다. 별빛 아래 눈 덮인 들판과 작은 마을이 고요히 잠들어 있고, 어딘가에서 들려오는 찬송가 소리가 밤 공기를 타고 흐릅니다. 크리스마스의 본래 의미인 사랑과 평화, 그리고 구원의 메시지를 전하는 이 거룩한 순간은 마음을 정화시키고 영혼에 위안을 주는 특별한 장면입니다.', ko: '밤하늘, 천체. 어두운 밤하늘에 밝게 빛나는 베들레헴의 별, 수많은 별들 사이에서 유독 환한 별 하나, 눈 덮인 들판과 작은 마을 실루엣, 고요하고 신성한 분위기, 깊은 푸른색 톤', en: 'night sky, celestial. Bright Star of Bethlehem shining in dark night sky, one exceptionally bright star among countless stars, silhouette of snow-covered field and small village, quiet and sacred atmosphere, deep blue tones, spiritual scene' },
            { title: '레드 앤 골드', desc: '크리스마스의 가장 상징적인 색상인 빨강과 금색이 화려하게 어우러진 고급스럽고 우아한 디자인입니다. 깊고 진한 와인 레드의 벨벳 리본이 반짝이는 금색 오너먼트를 감싸고, 금박 장식이 입혀진 솔방울들이 풍성하게 배치되어 있습니다. 크리스탈 샹들리에 아래 우아하게 차려진 크리스마스 테이블, 금색 촛대에 켜진 붉은 양초, 그리고 세련되게 접힌 빨간 냅킨까지, 모든 디테일이 클래식하면서도 모던한 감각을 자아냅니다. 전통적인 크리스마스의 품격과 현대적인 럭셔리함이 완벽하게 조화를 이루며, 특별한 날을 더욱 특별하게 만들어주는 우아한 크리스마스 감성을 완벽하게 표현한 작품입니다.', ko: '럭셔리, 정물. 빨강과 금색의 크리스마스 장식 배열, 벨벳 리본과 금색 오너먼트, 반짝이는 표면, 우아한 구성, 풍부한 질감, 고급스러운 조명', en: 'luxury, still life. Arrangement of red and gold Christmas decorations, velvet ribbons and gold ornaments, shimmering surfaces, elegant composition, rich textures, sophisticated lighting, opulent holiday aesthetic' },
            { title: '눈사람 친구들', desc: '귀여운 눈사람들이 모여있는 즐겁고 화목한 겨울 놀이터의 풍경입니다. 크고 작은 눈사람들이 각자의 개성을 뽐내며 줄지어 서있고, 당근 코와 석탄으로 만든 눈, 알록달록한 목도리와 모자로 사랑스럽게 꾸며져 있습니다. 어떤 눈사람은 빗자루를 들고 있고, 어떤 눈사람은 양손을 활짝 펼쳐 포옹하는 듯한 자세를 취하고 있습니다. 아이들이 즐겁게 뛰어놀며 만든 이 사랑스러운 친구들 주변으로 눈송이가 하얗게 쌓여있고, 멀리서는 아이들의 웃음소리가 들려오는 듯합니다. 순수한 동심과 크리스마스의 기쁨, 그리고 함께 만들어가는 행복한 추억이 가득 담긴 따뜻하고 정겨운 장면으로, 누구나 한번쯤 경험했을 겨울날의 소중한 기억을 떠올리게 합니다.', ko: '겨울 풍경, 귀여운 분위기. 여러 개의 눈사람이 줄지어 서있는 눈 덮인 풍경, 알록달록한 목도리와 모자, 당근 코와 석탄 눈, 즐거운 겨울 놀이터, 부드러운 자연광', en: 'winter landscape, cute atmosphere. Snow-covered scene with multiple snowmen standing in a row, colorful scarves and hats, carrot noses and coal eyes, joyful winter playground, soft natural light, playful winter scene' },
            { title: '크리스마스 리스', desc: '신선한 전나무 가지와 빨간 리본으로 정성스럽게 만든 전통적인 크리스마스 리스가 문 앞을 장식하고 있습니다. 초록빛이 생생한 전나무 잎 사이로 빨간 홀리 베리가 알알이 박혀 있고, 솔방울과 계피 스틱, 말린 오렌지 조각들이 자연스럽게 어우러져 있습니다. 중앙에는 큼직한 빨간 벨벳 리본이 우아하게 묶여 있고, 작은 방울들이 바람에 살랑살랑 흔들리며 청아한 소리를 냅니다. 전나무의 상쾌한 향기가 현관 앞을 가득 채우고, 리스를 통해 들어오는 손님들을 따뜻하게 맞이합니다. 오랜 전통을 간직한 이 아름다운 장식은 단순한 장식품을 넘어 크리스마스의 환대와 축복, 그리고 영원한 생명의 순환을 상징하는 의미 깊은 크리스마스의 상징물입니다.', ko: '클로즈업, 자연 소재. 전나무 가지로 만든 크리스마스 리스, 빨간 홀리 베리와 리본, 솔방울 장식, 자연스러운 초록색 톤, 현관문 배경, 전통적이고 따뜻한 느낌', en: 'close-up, natural materials. Christmas wreath made of pine branches, red holly berries and ribbon, pinecone decorations, natural green tones, front door background, traditional and warm feeling, festive entrance decor' },
            { title: '선물 상자의 마법', desc: '형형색색의 예쁜 포장지로 감싼 선물 상자들이 크리스마스 트리 아래 가득 쌓여 있어 마치 보물창고 같은 풍경을 연출합니다. 반짝이는 금색 포장지, 우아한 은색 리본, 귀여운 패턴의 포장지들이 각각의 개성을 뽐내며 쌓여있고, 리본과 장식 태그들이 정성스럽게 달려있습니다. 크고 작은 상자들 사이로 호기심과 기대감이 가득하고, 어떤 선물이 들어있을지 상상만으로도 가슴이 설렙니다. 트리의 조명이 선물 상자들의 반짝이는 포장지에 반사되어 더욱 화려하고 환상적인 분위기를 만들어내며, 크리스마스 아침 가족들이 모여 선물을 열어보는 그 특별한 순간의 설렘과 기쁨이 고스란히 담겨있습니다. 주고받는 사랑과 감사의 마음이 담긴 이 아름다운 전통은 크리스마스를 더욱 의미있게 만들어줍니다.', ko: '풍성한 구성. 크리스마스 트리 아래 쌓인 화려한 선물 상자들, 다양한 포장지와 리본, 반짝이는 금색과 은색, 트리 조명의 반사, 축제적이고 풍요로운 분위기', en: 'abundant composition. Pile of colorful gift boxes under Christmas tree, various wrapping papers and ribbons, sparkling gold and silver, reflections of tree lights, festive and abundant atmosphere, joyful presents' }
        ];
    }
    
    // 아이폰 배경화면 관련
    if (lowerKeyword.includes('아이폰') || lowerKeyword.includes('iphone') || lowerKeyword.includes('배경화면') || lowerKeyword.includes('wallpaper')) {
        return [
            { title: '황금빛 노을', desc: '수평선 너머로 천천히 가라앉는 태양이 하늘과 바다를 온통 황금빛으로 물들이는 장엄한 순간입니다. 붉은 오렌지에서 부드러운 핑크, 그리고 깊은 보라색으로 이어지는 그라데이션이 완벽한 조화를 이루며 하늘을 수놓습니다. 잔잔한 파도가 태양빛을 반사하며 반짝이고, 물결마다 금빛 물감을 흩뿌린 듯 영롱하게 빛납니다. 실루엣으로 보이는 야자수나 작은 섬이 풍경에 깊이를 더하고, 새들이 노을을 배경으로 날아가는 모습이 한 폭의 그림처럼 아름답습니다. 하루를 마무리하는 이 평화롭고 경이로운 자연의 선물은 보는 이의 마음을 차분하게 가라앉히며, 내일에 대한 희망과 감사의 마음을 일깨워줍니다. 매일 다른 색채로 우리를 놀라게 하는 자연의 예술 작품입니다.', ko: '골든 아워, 황혼 풍경. 수평선 위로 지는 석양의 장엄한 그라데이션, 오렌지에서 보라색으로 변하는 하늘, 금빛으로 반짝이는 바다 물결, 실루엣으로 보이는 야자수나 섬, 따뜻하고 평화로운 색조, 영롱한 빛의 반사', en: 'golden hour, twilight landscape. Majestic gradient of sunset over horizon, sky transitioning from orange to purple, ocean waves shimmering in golden light, silhouette of palm trees or island, warm and peaceful tones, ethereal light reflections, contemplative mood' },
            { title: '도시의 밤', desc: '해가 진 후 도시가 진정한 생명력을 발휘하며 수천 개의 불빛으로 깨어나는 화려한 야경입니다. 고층 빌딩들의 창문에서 쏟아지는 빛, 거리를 달리는 자동차들의 헤드라이트가 만들어내는 빛의 궤적, 그리고 네온사인들이 어우러져 도시를 거대한 빛의 캔버스로 만들어냅니다. 높은 곳에서 내려다본 도시는 마치 별들이 땅으로 내려와 펼쳐진 듯한 환상적인 풍경을 선사합니다. 강을 가로지르는 다리의 조명이 물에 반사되어 두 배의 아름다움을 만들고, 멀리 보이는 랜드마크 건물들이 도시의 스카이라인을 완성합니다. 잠들지 않는 도시의 에너지와 역동성, 그리고 수백만 사람들의 삶이 빛으로 표현되는 이 장면은 현대 도시의 매력을 완벽하게 담아낸 작품입니다.', ko: '도시 야경, 롱 익스포저. 고층 빌딩의 창문 조명이 만드는 빛의 패턴, 자동차 헤드라이트의 라이트 트레일, 네온사인의 생생한 색상, 강물에 반사되는 도시 불빛, 깊은 푸른 밤하늘과의 대비, 도시 스카이라인의 웅장함', en: 'urban night scene, long exposure. Light patterns from high-rise building windows, light trails from car headlights, vivid colors of neon signs, city lights reflecting on river, contrast with deep blue night sky, majestic city skyline, dynamic composition' },
            { title: '푸른 숲속', desc: '빽빽하게 들어선 나무들이 만들어내는 초록빛 터널 속으로 부드러운 햇살이 스며듭니다. 오래된 나무들의 울창한 가지들이 하늘을 가리고, 그 사이로 들어오는 빛줄기가 신비로운 분위기를 연출합니다. 이끼가 낀 나무 기둥, 고사리와 양치식물이 무성한 숲 바닥, 그리고 공기 중에 떠다니는 작은 먼지 입자들이 빛을 받아 반짝입니다. 새들의 지저귐과 나뭇잎이 바람에 스치는 소리만이 들리는 고요한 숲 속에서, 자연의 생명력이 온몸으로 느껴집니다. 나무들 사이로 보이는 멀리 숲 길, 이끼 낀 바위, 그리고 작은 시냇물이 흐르는 소리까지, 모든 요소가 조화롭게 어우러져 완벽한 자연의 안식처를 만들어냅니다. 도시의 소음에서 벗어나 진정한 평화를 느낄 수 있는 치유의 공간입니다.', ko: '숲 속 풍경, 자연광. 울창한 나무들 사이로 들어오는 빛줄기, 이끼 낀 나무 기둥의 질감, 고사리와 양치식물의 풍성한 녹음, 공기 중 먼지 입자가 만드는 빛의 산란, 깊은 초록색 톤의 그라데이션, 신비롭고 고요한 분위기', en: 'forest landscape, natural lighting. Rays of light streaming through dense trees, texture of moss-covered tree trunks, lush ferns and foliage, light scattering from airborne particles, gradient of deep green tones, mysterious and serene atmosphere, peaceful nature' },
            { title: '은하수의 밤', desc: '칠흑 같은 밤하늘을 가로지르는 은하수의 찬란한 별빛이 우주의 신비를 고스란히 드러냅니다. 수백만 개의 별들이 빛의 강을 이루며 하늘을 가로지르고, 보라색과 파란색의 성운이 은은하게 빛나며 깊이감을 더합니다. 지상에서는 외로운 나무 한 그루나 산의 실루엣이 하늘과 대비를 이루며 장엄함을 더하고, 때때로 유성이 하늘을 가로지르며 소원을 빌 기회를 선사합니다. 광공해 없는 깨끗한 하늘에서만 볼 수 있는 이 우주쇼는 인간의 존재가 얼마나 작은지, 그러면서도 이 광대한 우주의 일부라는 사실이 얼마나 경이로운지 깨닫게 합니다. 별빛이 쏟아지는 밤하늘은 무한한 가능성과 꿈을 상징하며, 우리를 우주적 사색으로 이끕니다.', ko: '천체 사진, 밤하늘. 은하수의 밝은 별빛 띠가 가로지르는 하늘, 보라색과 파란색 성운의 섬세한 색감, 지상의 나무나 산 실루엣, 깊은 우주의 무한한 깊이감, 별들의 미세한 반짝임, 우주적이고 경이로운 분위기', en: 'astrophotography, night sky. Bright band of Milky Way crossing the sky, delicate colors of purple and blue nebulae, silhouette of tree or mountain on ground, infinite depth of deep space, subtle twinkling of stars, cosmic and awe-inspiring atmosphere, celestial wonder' },
            { title: '파스텔 하늘', desc: '새벽이나 황혼 무렵, 하늘이 부드러운 파스텔 색조로 물드는 꿈결같은 순간입니다. 연한 핑크, 라벤더, 피치, 그리고 민트색이 수채화 물감처럼 번져가며 하늘을 캔버스 삼아 추상화를 그립니다. 구름 한 점 없이 맑은 하늘이나, 솜사탕처럼 부드러운 구름이 떠다니며 색채의 조화를 더욱 풍부하게 만듭니다. 이 평화롭고 온화한 색감은 마음을 차분하게 하고 감성을 자극하며, SNS에서 가장 사랑받는 감성적인 배경이 됩니다. 하루의 시작이나 끝을 알리는 이 마법 같은 시간대는 잠깐 동안만 지속되지만, 그 순간의 아름다움은 영원히 기억에 남습니다. 자연이 선사하는 가장 부드럽고 로맨틱한 팔레트로, 보는 이의 감성을 깊이 울립니다.', ko: '소프트 그라데이션, 미니멀리즘. 연한 핑크, 라벤더, 피치 색상의 부드러운 하늘 그라데이션, 솜사탕 같은 구름의 섬세한 질감, 수채화 같은 색의 번짐 효과, 평화롭고 감성적인 톤, 깨끗하고 심플한 구성', en: 'soft gradient, minimalism. Gentle sky gradient in pale pink, lavender, and peach, delicate texture of cotton candy clouds, watercolor-like color bleeding effect, peaceful and emotional tones, clean and simple composition, dreamy aesthetic' },
            { title: '기하학적 패턴', desc: '정교하게 계산된 선과 도형들이 만들어내는 현대적이고 세련된 추상 패턴입니다. 삼각형, 육각형, 원 등 기본 도형들이 반복되고 겹치며 복잡하면서도 조화로운 디자인을 완성합니다. 단색이나 그라데이션, 또는 대비되는 색상들이 패턴에 깊이와 역동성을 부여하고, 3D 효과를 내는 음영 처리가 평면에 입체감을 더합니다. 미니멀하면서도 강렬한 이 디자인은 현대 디지털 아트의 정수를 보여주며, 깔끔하고 전문적인 느낌을 선사합니다. 대칭성과 비대칭성이 공존하는 이 패턴은 수학적 아름다움과 예술적 감각이 완벽하게 조화를 이루며, 보면 볼수록 새로운 디테일을 발견하게 되는 지적이고 세련된 배경입니다.', ko: '기하학적 추상, 미니멀 디자인. 정교한 선과 도형의 반복 패턴, 삼각형, 육각형, 원의 조화로운 배치, 그라데이션 또는 대비 색상, 3D 효과를 주는 음영 처리, 현대적이고 세련된 구성, 수학적 정밀함', en: 'geometric abstract, minimal design. Precise repeating patterns of lines and shapes, harmonious arrangement of triangles, hexagons, circles, gradient or contrasting colors, shading for 3D effect, modern and sophisticated composition, mathematical precision, clean aesthetic' },
            { title: '트로피컬 비치', desc: '크리스탈처럼 맑은 터콰이즈 빛 바닷물이 새하얀 모래사장과 만나는 천국 같은 해변 풍경입니다. 야자수가 바람에 부드럽게 흔들리고, 그 그늘 아래 햇빛이 모래에 무늬를 그립니다. 투명한 바닷물을 통해 산호초와 열대어들이 선명하게 보이고, 파도가 해변에 닿을 때마다 하얀 거품을 일으키며 속삭입니다. 수평선 너머로 펼쳐진 끝없는 푸른 바다와 하늘이 만나는 곳, 가끔 보이는 작은 섬이나 요트가 이국적인 느낌을 더합니다. 따뜻한 태양, 시원한 바닷바람, 그리고 야자수 잎이 부딪히는 소리가 완벽한 휴식을 약속하는 이곳은 일상에서 벗어나 꿈꾸는 휴가지의 모든 것을 담고 있습니다. 보기만 해도 힐링이 되는 완벽한 낙원의 모습입니다.', ko: '트로피컬 비치, 선명한 색상. 크리스탈처럼 맑은 터콰이즈 바다, 새하얀 모래사장의 섬세한 질감, 야자수 그늘이 만드는 패턴, 투명한 물 속 산호초, 햇빛의 밝고 생생한 반사, 열대의 생동감 넘치는 분위기', en: 'tropical beach, vivid colors. Crystal-clear turquoise ocean, delicate texture of white sand beach, patterns created by palm tree shadows, coral reefs visible through transparent water, bright and vivid sunlight reflections, vibrant tropical atmosphere, paradise scene' },
            { title: '추상적 색감', desc: '형태에 구애받지 않고 자유롭게 흐르는 색채들이 만들어내는 순수 예술적 표현입니다. 물감이 물 위에서 번지듯, 오일과 물이 섞이며 만들어내는 마블 패턴처럼, 예측 불가능하고 독특한 색의 조합이 탄생합니다. 대담한 원색부터 부드러운 중간색까지, 다양한 색상들이 충돌하고 융합하며 역동적인 에너지를 발산합니다. 번지기, 그라데이션, 텍스처의 변화가 끊임없이 이어지며 보는 이의 상상력을 자극하고, 각자 다른 의미와 감정을 투영할 수 있는 여백을 제공합니다. 어떤 구체적인 형태도 보이지 않지만, 그 자체로 완벽한 조화와 균형을 이루는 이 추상적 색감은 현대 미술의 자유로움과 창의성을 대변하며, 독창적이고 예술적인 배경을 원하는 이들에게 완벽한 선택입니다.', ko: '추상 예술, 유동적 형태. 자유롭게 흐르고 번지는 색채, 물감이 섞이는 마블 패턴, 원색과 중간색의 대담한 조합, 그라데이션과 텍스처 변화, 예측 불가능한 유기적 형태, 역동적이고 감각적인 구성', en: 'abstract art, fluid forms. Freely flowing and bleeding colors, marble patterns of mixing paints, bold combination of primary and intermediate colors, gradient and texture variations, unpredictable organic shapes, dynamic and sensual composition, artistic expression' },
            { title: '미니멀 모노톤', desc: '불필요한 모든 요소를 제거하고 본질만 남긴 극도로 절제된 아름다움입니다. 검은색과 흰색, 또는 회색 톤만을 사용하여 깊이와 대비를 만들어내고, 간결한 선과 면으로 강력한 시각적 임팩트를 전달합니다. 텅 빈 공간이 오히려 강조점이 되고, 단 하나의 요소가 전체 화면을 지배하는 이 미니멀리즘 철학은 적을수록 더 많다는 디자인의 진리를 증명합니다. 잡음 없는 깨끗함, 군더더기 없는 명확함, 그리고 세련된 단순함이 주는 고급스러움은 시대를 초월한 클래식한 매력을 발산합니다. 무채색이 주는 차분함과 집중력, 그리고 어떤 색상과도 조화를 이루는 범용성은 이 배경을 가장 실용적이면서도 스타일리시한 선택으로 만듭니다.', ko: '미니멀리즘, 모노크롬. 흑백 또는 회색조의 절제된 색상, 간결한 기하학적 형태, 텅 빈 여백의 활용, 섬세한 명암 대비, 깨끗하고 정돈된 구성, 현대적이고 세련된 감각, 차분한 분위기', en: 'minimalism, monochrome. Restrained black, white, or grayscale palette, clean geometric forms, utilization of empty space, subtle contrast of light and shadow, clean and organized composition, modern and sophisticated sense, calm atmosphere, timeless elegance' },
            { title: '꽃밭의 향연', desc: '형형색색의 꽃들이 만발한 들판이 마치 자연이 펼쳐놓은 거대한 캔버스처럼 눈앞에 펼쳐집니다. 튤립, 해바라기, 장미, 라벤더 등 각양각색의 꽃들이 저마다의 색깔로 피어나 무지개 같은 풍경을 만들어냅니다. 미풍에 살랑이는 꽃잎들, 꽃 사이를 날아다니는 나비와 벌들, 그리고 공기 중에 떠도는 달콤한 꽃향기까지 상상되는 완벽한 봄날의 풍경입니다. 가까이서 보면 이슬 맺힌 꽃잎의 섬세한 질감과 꽃술의 디테일이 보이고, 멀리서 보면 꽃들이 만들어내는 색의 물결이 장관을 이룹니다. 생명력 넘치고 활기찬 이 자연의 선물은 보는 이에게 즉각적인 행복감과 긍정적인 에너지를 전달하며, 사계절 중 가장 아름다운 봄의 정수를 완벽하게 포착한 작품입니다.', ko: '꽃밭 풍경, 매크로와 광각의 조화. 만발한 형형색색 꽃들의 생생한 색상, 꽃잎의 섬세한 질감과 이슬, 나비와 벌의 디테일, 미풍에 흔들리는 꽃들의 움직임, 밝고 따뜻한 자연광, 봄의 생명력 넘치는 분위기', en: 'flower field, macro and wide-angle harmony. Vivid colors of blooming flowers in full array, delicate texture and dew on petals, details of butterflies and bees, movement of flowers swaying in breeze, bright and warm natural light, vibrant spring atmosphere, joyful nature' },
            { title: '빗방울의 시', desc: '창문이나 유리에 맺힌 빗방울들이 도시의 불빛을 받아 보석처럼 반짝이는 로맨틱한 장면입니다. 각각의 물방울 속에는 뒤틀린 도시 풍경이 렌즈 효과로 담겨있고, 불빛이 물방울을 통과하며 만들어내는 보케 효과가 환상적인 분위기를 연출합니다. 빗방울이 유리를 타고 흘러내리며 만드는 자연스러운 궤적, 물방울끼리 합쳐지고 분리되는 역동적인 움직임, 그리고 비에 젖은 도시의 흐릿한 배경이 어우러져 감성적인 우울함과 낭만이 공존하는 독특한 정서를 자아냅니다. 비 오는 날의 고요함과 사색, 실내의 포근함과 안전함, 그리고 빗소리가 주는 ASMR 같은 위안이 시각적으로 표현된 이 장면은 감성적인 이들에게 특별히 사랑받는 배경입니다.', ko: '빗방울 매크로, 보케 효과. 유리창에 맺힌 빗방울의 극사실적 클로즈업, 물방울 속 왜곡된 도시 불빛, 보케로 흐려진 배경의 색상 번짐, 빗방울이 흘러내리는 궤적, 반사와 굴절의 빛 효과, 감성적이고 로맨틱한 분위기', en: 'raindrop macro, bokeh effect. Ultra-realistic close-up of raindrops on glass, distorted city lights within water droplets, color blur in bokeh background, trails of raindrops flowing down, light effects of reflection and refraction, emotional and romantic atmosphere, contemplative mood' },
            { title: '우주 성운', desc: '수십억 광년 떨어진 우주 공간에서 빛나는 거대한 성운의 경이로운 모습입니다. 보라색, 분홍색, 파란색, 그리고 주황색의 가스 구름들이 소용돌이치며 환상적인 색채의 향연을 펼칩니다. 별들이 탄생하는 우주의 요람인 이곳에서는 새로운 별들이 밝게 빛나며 주변 가스를 밝히고, 먼 은하들이 배경에 점점이 흩어져 있습니다. NASA의 허블 망원경이나 제임스 웹 망원경이 포착한 실제 우주 이미지에서 영감을 받은 이 장면은 인간의 상상을 초월하는 우주의 광대함과 아름다움을 보여줍니다. 추상적이면서도 실재하는, 환상적이면서도 과학적인 이 우주적 스케일의 예술 작품은 우리를 무한한 우주로 초대하며 경외감과 호기심을 불러일으킵니다.', ko: '우주 성운, 천체 사진. 소용돌이치는 보라색, 분홍색, 파란색 가스 구름, 밝게 빛나는 별들의 탄생, 먼 은하들의 미세한 점들, 우주 먼지의 섬세한 텍스처, 깊고 무한한 우주 공간, 경이롭고 신비로운 색감', en: 'cosmic nebula, astrophotography. Swirling purple, pink, blue gas clouds, bright birth of new stars, tiny dots of distant galaxies, delicate texture of cosmic dust, deep and infinite space, awe-inspiring and mysterious colors, celestial wonder, cosmic scale' }
        ];
    }
    
    // 기본 테마 (다른 키워드들)
    return [
        { 
            title: `${keyword} 클래식 스타일`, 
            desc: `${keyword}의 본질을 담아낸 클래식하고 정통적인 디자인입니다. 시간이 지나도 변하지 않는 아름다움과 품격을 담고 있으며, 전통적인 요소들을 현대적인 감각으로 재해석했습니다. 깊이 있는 색감과 균형잡힌 구도가 안정감을 주고, 세련된 디테일이 고급스러움을 더합니다. ${keyword}의 가장 기본적이면서도 완벽한 형태를 표현한 이 작품은 어떤 상황에서도 품위있고 우아한 분위기를 연출합니다. 클래식의 영원한 가치를 느낄 수 있는 타임리스한 디자인입니다.`, 
            ko: `${keyword}, 클래식 스타일, 전통적인 디자인, 우아한 색감, 정통 구도, 품격있는 분위기`, 
            en: `${keyword}, classic style, traditional design, elegant color scheme, authentic composition, sophisticated atmosphere, timeless beauty` 
        },
        { 
            title: `${keyword} 미니멀 감성`, 
            desc: `${keyword}를 가장 간결하고 깔끔하게 표현한 미니멀리즘의 정수입니다. 불필요한 장식을 모두 제거하고 핵심 요소만 남겨 강렬한 인상을 만들어냅니다. 여백의 미를 살린 구성과 단순한 선, 그리고 절제된 색상 팔레트가 현대적이고 세련된 느낌을 자아냅니다. 단순함 속에 담긴 깊이와 의미가 돋보이며, 모던하고 스타일리시한 감각이 돋보입니다. 복잡함에 지친 현대인에게 시각적 휴식을 선사하는 완벽한 미니멀 디자인으로, ${keyword}의 순수한 아름다움을 경험할 수 있습니다.`, 
            ko: `${keyword}, 미니멀 디자인, 깔끔한 구성, 단순한 형태, 여백의 미, 모던 스타일, 절제된 색상`, 
            en: `${keyword}, minimalist design, clean composition, simple forms, negative space, modern style, restrained color palette, pure aesthetic` 
        },
        { 
            title: `${keyword} 빈티지 무드`, 
            desc: `${keyword}를 따뜻하고 향수어린 빈티지 감성으로 재해석한 작품입니다. 세월의 흔적이 느껴지는 색감과 질감이 과거로의 여행을 떠나게 하며, 레트로한 분위기가 마음을 편안하게 만듭니다. 약간 바랜 듯한 톤과 필름 카메라의 따뜻한 색온도가 어우러져 옛 추억을 불러일으키고, 아날로그 시대의 감성이 고스란히 담겨있습니다. 현대적인 세련됨과 과거의 낭만이 완벽하게 조화를 이루며, ${keyword}에 깊이와 스토리를 더합니다. 시간을 거슬러 올라간 듯한 특별한 감동을 선사하는 빈티지 걸작입니다.`, 
            ko: `${keyword}, 빈티지 스타일, 레트로 감성, 따뜻한 색조, 필름 느낌, 향수를 자극하는 분위기, 아날로그 무드`, 
            en: `${keyword}, vintage style, retro aesthetic, warm color tone, film-like quality, nostalgic atmosphere, analog mood, timeworn texture` 
        },
        { 
            title: `${keyword} 추상 예술`, 
            desc: `${keyword}를 추상적이고 예술적으로 해석한 창의적이고 독창적인 작품입니다. 구체적인 형태를 넘어 감정과 느낌을 시각화하여 상상력을 자극하고, 보는 이에 따라 다양하게 해석될 수 있는 여지를 남깁니다. 자유로운 색채의 조합과 예측할 수 없는 형태의 배치가 역동적인 에너지를 발산하며, 현대 미술의 감각이 녹아있습니다. ${keyword}의 본질을 파괴하고 재구성하여 새로운 의미를 창조해내는 이 작품은 예술적 영감을 주는 비주얼 경험을 선사합니다. 틀에 박힌 것을 거부하는 자유로운 영혼을 위한 추상 걸작입니다.`, 
            ko: `${keyword}, 추상 디자인, 예술적 표현, 창의적 구성, 자유로운 형태, 현대 미술 감각, 독특한 색채`, 
            en: `${keyword}, abstract design, artistic expression, creative composition, freeform shapes, contemporary art sense, unique color palette, avant-garde` 
        },
        { 
            title: `${keyword} 자연의 조화`, 
            desc: `${keyword}와 자연이 완벽하게 조화를 이룬 평화롭고 힐링되는 장면입니다. 자연의 순수한 아름다움과 ${keyword}가 어우러져 마음의 안정을 가져다주며, 유기적인 곡선과 자연스러운 색감이 편안함을 선사합니다. 푸른 하늘, 싱그러운 녹음, 맑은 물 등 자연의 요소들이 ${keyword}를 더욱 빛나게 하고, 생명력 넘치는 에너지가 화면 가득 흐릅니다. 인위적이지 않은 자연스러움이 돋보이며, 자연이 주는 치유의 힘을 느낄 수 있습니다. 현대 문명에 지친 이들에게 자연의 품으로 돌아가는 듯한 평온함을 선사하는 힐링 작품입니다.`, 
            ko: `${keyword}, 자연과의 조화, 자연 풍경, 유기적 구성, 평화로운 분위기, 자연광, 싱그러운 색감, 힐링 무드`, 
            en: `${keyword}, harmony with nature, natural landscape, organic composition, peaceful atmosphere, natural lighting, fresh colors, healing mood, eco-friendly` 
        },
        { 
            title: `${keyword} 화려한 비주얼`, 
            desc: `${keyword}를 화려하고 생동감 넘치는 색상으로 표현한 에너지 넘치는 작품입니다. 강렬한 원색과 대담한 색상 대비가 시선을 사로잡고, 역동적인 구성이 생명력을 발산합니다. 밝고 선명한 톤들이 어우러져 축제 같은 분위기를 만들어내며, 보는 것만으로도 활력과 에너지를 느낄 수 있습니다. ${keyword}의 즐거움과 흥분, 그리고 긍정적인 에너지를 색채로 표현했으며, 모든 디테일이 화려함으로 가득합니다. 일상에 활기를 불어넣고 싶은 이들을 위한 비타민 같은 비주얼로, 언제 보아도 기분이 좋아지는 매력적인 작품입니다.`, 
            ko: `${keyword}, 화려한 색상, 생동감 있는 디자인, 밝은 톤, 강렬한 대비, 역동적 구성, 에너지 넘치는 분위기`, 
            en: `${keyword}, vibrant colors, dynamic design, bright tones, bold contrast, energetic composition, vivid atmosphere, colorful visual, eye-catching` 
        },
        { 
            title: `${keyword} 몽환적 분위기`, 
            desc: `${keyword}를 꿈결같고 환상적인 분위기로 담아낸 초현실적인 작품입니다. 부드럽고 몽롱한 색감이 현실과 꿈의 경계를 흐리게 하며, 신비롭고 마법 같은 느낌을 자아냅니다. 은은한 빛의 확산과 부드러운 그라데이션이 만들어내는 환상적인 분위기 속에서 ${keyword}는 더욱 신비롭고 매혹적으로 다가옵니다. 판타지 세계로 초대하는 듯한 이 작품은 상상력을 자극하고, 현실의 무게에서 벗어나 자유로운 공상의 세계로 안내합니다. 꿈같은 아름다움에 빠져들게 만드는 몽환적이고 서정적인 걸작입니다.`, 
            ko: `${keyword}, 몽환적 스타일, 꿈같은 분위기, 부드러운 색감, 신비로운 느낌, 판타지 무드, 초현실적 표현`, 
            en: `${keyword}, dreamy style, fantasy atmosphere, soft colors, ethereal mood, surreal expression, mystical feeling, otherworldly beauty, magical ambiance` 
        },
        { 
            title: `${keyword} 도시 감성`, 
            desc: `${keyword}를 현대적이고 도시적인 감성으로 재해석한 세련된 작품입니다. 고층 빌딩의 날렵한 라인과 네온사인의 화려함, 그리고 도시 특유의 역동성이 ${keyword}와 완벽하게 융합됩니다. 세련되고 모던한 디자인 요소들이 트렌디한 감각을 보여주며, 도시 생활의 스타일리시함과 편리함이 고스란히 담겨있습니다. 밤의 도시가 주는 신비로운 매력과 낮의 활기찬 에너지가 공존하며, ${keyword}를 통해 현대 도시인의 라이프스타일을 엿볼 수 있습니다. 세계 대도시의 감성을 담은 이 작품은 국제적이고 코스모폴리탄한 분위기를 완벽하게 표현합니다.`, 
            ko: `${keyword}, 도시 풍경, 현대적 디자인, 세련된 분위기, 모던 시티, 도시적 감성, 트렌디한 스타일`, 
            en: `${keyword}, urban landscape, modern design, sophisticated atmosphere, contemporary city vibe, metropolitan sense, trendy style, cosmopolitan aesthetic` 
        },
        { 
            title: `${keyword} 고요한 순간`, 
            desc: `${keyword}의 고요하고 평온한 순간을 섬세하게 포착한 명상적인 작품입니다. 조용하고 차분한 분위기 속에서 ${keyword}의 본질이 더욱 선명하게 드러나며, 잔잔한 감동이 마음 깊이 스며듭니다. 부드러운 색조와 안정적인 구도가 마음의 평화를 가져다주고, 복잡한 생각들을 내려놓게 만듭니다. 소음 없는 고요함 속에서 ${keyword}와 마주하는 이 순간은 명상과도 같은 경험을 선사하며, 내면의 평온을 찾게 해줍니다. 바쁜 일상에서 잠시 멈춰 서서 자신을 돌아보게 만드는, 치유와 회복의 시간을 담은 작품입니다.`, 
            ko: `${keyword}, 고요한 장면, 평온한 분위기, 차분한 색조, 명상적 느낌, 안정감, 조용한 순간`, 
            en: `${keyword}, tranquil scene, peaceful atmosphere, calm color palette, meditative mood, serene moment, quiet beauty, contemplative space` 
        },
        { 
            title: `${keyword} 럭셔리 스타일`, 
            desc: `${keyword}를 고급스럽고 우아하게 표현한 프리미엄 품격의 디자인입니다. 세련된 금빛 장식과 고급 소재의 질감이 느껴지며, 완벽한 디테일과 정교한 마감이 럭셔리함을 극대화합니다. 품위있는 색상 조합과 균형잡힌 구성이 우아함을 더하고, 모든 요소가 조화롭게 어우러져 최상급의 가치를 표현합니다. ${keyword}를 통해 느껴지는 이 고급스러움은 단순한 외형을 넘어 품격과 자존감을 높여줍니다. VIP만을 위한 특별한 경험처럼, 이 작품은 최고의 품질과 가치를 추구하는 이들에게 완벽한 선택입니다.`, 
            ko: `${keyword}, 럭셔리 스타일, 고급스러운 분위기, 우아한 디자인, 프리미엄 느낌, 품격있는 구성, 세련된 마감`, 
            en: `${keyword}, luxury style, premium atmosphere, elegant design, sophisticated elegance, high-end aesthetic, refined finish, opulent composition` 
        },
        { 
            title: `${keyword} 텍스처 디테일`, 
            desc: `${keyword}의 질감과 표면을 극도로 섬세하게 표현한 감각적인 작품입니다. 미세한 결, 부드러운 촉감, 거친 표면 등 다양한 텍스처가 살아 숨쉬며, 마치 손으로 만질 수 있을 것 같은 생생함을 전달합니다. 빛과 그림자의 미묘한 변화가 입체감을 극대화하고, 클로즈업된 디테일이 ${keyword}의 숨겨진 아름다움을 발견하게 합니다. 육안으로는 보기 힘든 미시적 세계를 확대하여 보여주는 이 작품은 새로운 시각적 경험을 선사하며, ${keyword}에 대한 이해를 한층 깊게 만듭니다. 질감이 주는 감각적 쾌감을 시각적으로 완벽하게 구현한 걸작입니다.`, 
            ko: `${keyword}, 질감 표현, 섬세한 디테일, 감각적 구성, 텍스처 강조, 클로즈업, 입체감`, 
            en: `${keyword}, texture expression, detailed close-up, sensory composition, tactile quality, fine details, three-dimensional depth, material focus` 
        },
        { 
            title: `${keyword} 시간의 흐름`, 
            desc: `${keyword}를 통해 시간의 흐름과 변화의 순간을 포착한 서정적이고 철학적인 작품입니다. 과거, 현재, 미래가 하나의 프레임 안에 공존하며, 덧없이 흘러가는 시간의 본질을 시각화합니다. 빛의 변화, 계절의 이동, 생명의 순환 등 시간이 남긴 흔적들이 ${keyword} 속에 고스란히 담겨있으며, 영원과 순간의 역설을 동시에 보여줍니다. 이 작품은 단순한 이미지를 넘어 시간에 대한 깊은 성찰을 이끌어내고, 현재를 소중히 여기게 만듭니다. 찰나의 아름다움을 영원히 간직하려는 예술가의 노력이 빛을 발하는 감동적인 작품입니다.`, 
            ko: `${keyword}, 시간의 흐름, 변화하는 순간, 서정적 분위기, 순간 포착, 시간성 표현, 철학적 깊이`, 
            en: `${keyword}, passage of time, changing moments, lyrical atmosphere, captured instant, temporal expression, philosophical depth, fleeting beauty` 
        }
    ];
}

// 해시태그 생성
function generateHashtags(keyword, title) {
    const baseHashtags = [
        keyword,
        '배경화면',
        '아이폰배경화면',
        '감성배경화면',
        '고화질배경화면',
        '휴대폰배경화면',
        '배경화면추천',
        '예쁜배경화면',
        '무료배경화면',
        '배경화면다운'
    ];
    
    const additionalHashtags = [
        '폰꾸',
        '폰꾸미기',
        '잠금화면',
        '홈화면',
        '배경사진',
        '감성사진',
        '트렌디',
        '인스타감성',
        '배경이미지',
        '디자인',
        '미니멀',
        '심플',
        '세련된',
        '모던',
        '힐링'
    ];
    
    // 랜덤하게 추가 해시태그 선택
    const selectedAdditional = additionalHashtags
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    return [...baseHashtags, ...selectedAdditional];
}

// 마무리 글 생성
function generateClosingText(keyword) {
    return `지금까지 ${keyword} 컬렉션을 소개해드렸습니다. 각각의 디자인은 서로 다른 감성과 분위기를 담고 있어, 여러분의 취향과 기분에 따라 선택하실 수 있습니다.

고화질 이미지로 제작된 이 배경화면들은 아이폰의 레티나 디스플레이에서 더욱 선명하고 아름답게 표현됩니다. 제공된 한글 및 영문 프롬프트를 활용하시면 AI 이미지 생성 도구를 통해 유사한 스타일의 배경화면을 직접 만들어보실 수도 있습니다.

배경화면 하나로도 스마트폰의 분위기가 완전히 달라질 수 있습니다. 오늘 소개해드린 다양한 스타일 중에서 마음에 드는 것을 선택하셔서 여러분만의 특별한 폰 꾸미기를 완성해보세요.

마음에 드는 배경화면이 있으셨다면 댓글로 알려주세요. 앞으로도 더 다양하고 감성적인 ${keyword}을 계속해서 소개해드리겠습니다. 이 글이 도움이 되셨다면 이웃 추가와 공감 부탁드립니다.

감사합니다.`;
}

// 생성된 콘텐츠 표시
function showGeneratedContent(content) {
    let html = '<div class="seo-content">';
    
    // 블로그 제목
    html += `<div class="blog-title-section">
        <h3 class="section-title">블로그 글 제목</h3>
        <p class="blog-title">${content.blogTitle}</p>
    </div>`;
    
    // 메타 설명
    html += `<div class="meta-section">
        <h3 class="section-title">메타설명</h3>
        <p class="meta-description">${content.metaDescription}</p>
    </div>`;
    
    // 각 항목
    content.items.forEach(item => {
        html += `<div class="item-section">
            <h3 class="item-title">${item.number}. ${item.title}</h3>
            <p class="item-description">${item.description}</p>
            
            <div class="hashtags-section">
                <strong>해시태그:</strong><br>
                ${item.hashtags.map(tag => `#${tag}`).join(' ')}
            </div>
            
            <div class="prompt-section">
                <div class="prompt-item">
                    <strong>한글 프롬프트:</strong><br>
                    ${item.koreanPrompt}
                </div>
                <div class="prompt-item">
                    <div class="prompt-header">
                        <strong>영문 프롬프트:</strong>
                        <button class="copy-prompt-btn" data-prompt="${item.englishPrompt.replace(/"/g, '&quot;')}">
                            복사
                        </button>
                    </div>
                    <div class="prompt-text">${item.englishPrompt}</div>
                </div>
            </div>
        </div>`;
    });
    
    // 마무리 글
    html += `<div class="closing-section">
        <h3 class="section-title">마무리글</h3>
        <p class="closing-text">${content.closingText.replace(/\n/g, '<br>')}</p>
    </div>`;
    
    html += '</div>';
    
    generatedContent.innerHTML = html;
    previewSection.style.display = 'block';
    
    // 개별 복사 버튼 이벤트 리스너 추가
    const copyPromptBtns = document.querySelectorAll('.copy-prompt-btn');
    copyPromptBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prompt = e.target.getAttribute('data-prompt');
            copyPromptToClipboard(prompt, e.target);
        });
    });
    
    // 미리보기로 스크롤
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 개별 프롬프트 복사 함수
function copyPromptToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '복사완료!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }).catch(err => {
        alert('복사에 실패했습니다.');
    });
}

// 폼 초기화 시 미리보기도 숨김
blogForm.addEventListener('reset', () => {
    previewSection.style.display = 'none';
    downloadWordBtn.style.display = 'none';
    currentContent = null;
});

// Word 파일 다운로드 함수
function downloadAsWord(content, keyword) {
    // HTML 문서 생성
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Malgun Gothic', sans-serif; line-height: 1.8; }
        h1 { color: #333; font-size: 18pt; margin-bottom: 20px; font-weight: bold; }
        h3 { color: #333; font-size: 14pt; margin-top: 20px; margin-bottom: 10px; font-weight: bold; }
        p { margin-bottom: 15px; color: #555; line-height: 1.8; }
        .blog-title { font-size: 16pt; color: #333; font-weight: bold; margin-bottom: 30px; }
        .meta-description { margin-bottom: 30px; color: #555; }
        .item-section { margin-bottom: 40px; }
        .description { margin-bottom: 15px; color: #555; }
        .hashtags { color: #4a5568; margin: 15px 0; line-height: 2; }
        .closing { margin-top: 30px; color: #555; }
    </style>
</head>
<body>
    <p class="blog-title">${content.blogTitle}</p>
    <p class="meta-description">${content.metaDescription}</p>
`;

    // 각 항목 추가
    content.items.forEach(item => {
        htmlContent += `
    <div class="item-section">
        <h3>${item.number}. ${item.title}</h3>
        <p class="description">${item.description}</p>
        <p class="hashtags">${item.hashtags.map(tag => `#${tag}`).join(' ')}</p>
    </div>
`;
    });

    // 마무리 글 추가
    htmlContent += `
    <p class="closing">${content.closingText.replace(/\n/g, '<br>')}</p>
</body>
</html>
`;

    // Blob 생성 및 다운로드
    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${keyword}_SEO콘텐츠_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // 성공 메시지
    const originalText = downloadWordBtn.textContent;
    downloadWordBtn.textContent = '다운로드 완료!';
    downloadWordBtn.style.background = '#28a745';
    
    setTimeout(() => {
        downloadWordBtn.textContent = originalText;
        downloadWordBtn.style.background = '';
    }, 2000);
}

console.log('네이버 블로그 SEO 콘텐츠 생성기 시작됨!');
