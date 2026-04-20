document.addEventListener('DOMContentLoaded', () => {

    // Views elements
    const viewHome = document.getElementById('view-home');
    const viewSearch = document.getElementById('view-search');
    const btnBack = document.getElementById('btn-back');
    const goHome = document.getElementById('go-home');
    const selectedCategoryTitle = document.getElementById('selected-category-title');
    const categoryBtns = document.querySelectorAll('.category-btn');

    let currentCategory = '';

    // Switch Views
    function switchView(view) {
        viewHome.classList.remove('active');
        viewSearch.classList.remove('active');
        
        if(view === 'home') {
            viewHome.classList.add('active');
        } else {
            viewSearch.classList.add('active');
        }
    }

    // Category Button Click
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = btn.closest('.category-btn').getAttribute('data-category');
            currentCategory = category;
            selectedCategoryTitle.textContent = `${category} 기관 찾기`;
            
            // Reset search form
            document.getElementById('sido').value = '전체';
            document.getElementById('sigungu').innerHTML = '<option value="전체">시/군/구 전체</option>';
            document.getElementById('keyword').value = '';
            
            switchView('search');
            performSearch(); // Initial search for category
        });
    });

    // Back to Home
    btnBack.addEventListener('click', () => {
        switchView('home');
    });

    goHome.addEventListener('click', () => {
        switchView('home');
    });

    // Sido -> Sigungu Logic
    const sidoSelect = document.getElementById('sido');
    const sigunguSelect = document.getElementById('sigungu');
    
    // "전체" option logic included
    const sigunguData = {
        '서울': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
        '부산': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
        '대구': ['군위군', '남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
        '인천': ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'],
        '광주': ['광산구', '남구', '동구', '북구', '서구'],
        '대전': ['대덕구', '동구', '서구', '유성구', '중구'],
        '울산': ['남구', '동구', '북구', '울주군', '중구'],
        '세종': ['세종특별자치시'],
        '경기': ['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
        '강원': ['강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
        '충북': ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시', '충주시'],
        '충남': ['계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'],
        '전북': ['고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
        '전남': ['강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
        '경북': ['경산시', '경주시', '고령군', '구미시', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'],
        '경남': ['거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
        '제주': ['서귀포시', '제주시']
    };

    sidoSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        sigunguSelect.innerHTML = '<option value="전체">시/군/구 전체</option>';
        if (val && val !== '전체' && sigunguData[val]) {
            sigunguData[val].forEach(gu => {
                const opt = document.createElement('option');
                opt.value = gu;
                opt.textContent = gu;
                sigunguSelect.appendChild(opt);
            });
        }
    });

    // Mock Data representing all categories
    const mockFacilities = [
        { id: 1, name: "늘푸른 방문요양센터", type: "방문요양", address: "서울특별시 강남구 테헤란로 123", phone: "02-1234-5678", sido: "서울", sigungu: "강남구" },
        { id: 2, name: "정성 방문요양센터", type: "방문요양", address: "경기도 수원시 팔달구 매산로 1", phone: "031-111-2222", sido: "경기", sigungu: "수원시" },
        { id: 3, name: "뽀송 방문목욕", type: "방문목욕", address: "서울특별시 서초구 서초대로 321", phone: "02-555-4444", sido: "서울", sigungu: "서초구" },
        { id: 4, name: "스마일 방문목욕", type: "방문목욕", address: "부산광역시 해운대구 센텀중앙로", phone: "051-222-3333", sido: "부산", sigungu: "해운대구" },
        { id: 5, name: "건강마을 방문간호", type: "방문간호", address: "인천광역시 남동구 구월로", phone: "032-777-8888", sido: "인천", sigungu: "남동구" },
        { id: 6, name: "사랑의 방문간호", type: "방문간호", address: "경기도 성남시 분당구 판교로", phone: "031-444-5555", sido: "경기", sigungu: "성남시" },
        { id: 7, name: "햇살 주야간보호", type: "주야간보호", address: "서울특별시 송파구 올림픽로", phone: "02-999-0000", sido: "서울", sigungu: "송파구" },
        { id: 8, name: "안심 단기보호센터", type: "단기보호", address: "경기도 고양시 일산동구 정발산로", phone: "031-666-7777", sido: "경기", sigungu: "고양시" },
        { id: 9, name: "행복 노인요양시설", type: "요양시설", address: "서울특별시 강동구 성내로", phone: "02-456-7890", sido: "서울", sigungu: "강동구" },
        { id: 10, name: "가족처럼 요양원", type: "요양시설", address: "부산광역시 수영구 수영로", phone: "051-333-1111", sido: "부산", sigungu: "수영구" },
        { id: 11, name: "든든 복지용구", type: "복지용구", address: "서울특별시 중구 세종대로", phone: "02-111-9999", sido: "서울", sigungu: "중구" },
        { id: 12, name: "편안한 복지용구", type: "복지용구", address: "인천광역시 부평구 부평대로", phone: "032-555-6666", sido: "인천", sigungu: "부평구" },
        { id: 13, name: "스마일요양원", type: "요양시설", address: "경기도 안양시 동안구 관평로", phone: "031-777-3333", sido: "경기", sigungu: "안양시" },
        { id: 14, name: "따뜻한 방문요양", type: "방문요양", address: "서울특별시 강서구 강서로", phone: "02-111-0000", sido: "서울", sigungu: "강서구" }
    ];

    const resultsGrid = document.getElementById('results-grid');
    const resultCount = document.getElementById('result-count');
    const searchForm = document.getElementById('search-form');

    async function performSearch() {
        const sido = document.getElementById('sido').value;
        const sigungu = document.getElementById('sigungu').value;
        const keyword = document.getElementById('keyword').value.toLowerCase();

        // 1. 통신 중 로딩 화면 표시
        resultsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 4rem; background:white; border-radius:8px;">
                <div class="spinner"></div>
                <p style="margin-top:1rem; color:var(--text-muted); font-weight:500;">공공데이터포털(data.go.kr)에서 데이터를 불러오는 중입니다...</p>
                <p style="font-size:0.85rem; color:#aaa; margin-top:0.5rem;">CORS 정책에 의해 브라우저에서 직접 조회가 막힐 수 있습니다.</p>
            </div>
        `;
        resultCount.textContent = '...';

        // 2. 입력받으신 API 인증키 세팅
        const API_KEY = "9ded216c13ae123d832515a36ec6f0e657208f8430128269a20c6866e619a86d";
        // 통상적인 장기요양기관 조회 API 엔드포인트 형태
        // 참고: 시도/시군구 등은 행정표준코드(숫자)로 변환되어 들어가야 정상 응답이 옵니다.
        const url = `https://apis.data.go.kr/B550928/LtcInsttListSeachSevc01/getLtcInsttSeachList02?serviceKey=${API_KEY}&pageNo=1&numOfRows=20&Type=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            console.log("🎉 실제 공공데이터 수신 성공!", data);
            alert("공공데이터포털 조회 통신에 성공했습니다!\n콘솔창(F12)을 확인해 주세요.\n\n*현재 UI는 실제 API의 행정표준코드 구조 등을 정교하게 매핑하기 전이므로, 다시 임시 검색 데이터로 처리됩니다.");
            throw new Error("UI 매핑 전 시뮬레이션 폴백"); // 시연을 위해 임시 catch쪽으로 보냅니다.

        } catch (error) {
            console.error("실제 API 통신 실패 또는 CORS 차단:", error);
            
            // 실제 통신 실패 시(CORS 에러 등) 기존 임시 데이터로 동작하게 하는 안전장치(Fallback)
            setTimeout(() => {
                let filtered = mockFacilities.filter(f => {
                    // Filter by Category Selected on View 1
                    if(f.type !== currentCategory) return false;
                    
                    // Filters from search form
                    if (sido !== '전체' && f.sido !== sido) return false;
                    if (sigungu !== '전체' && f.sigungu !== sigungu) return false;
                    if (keyword && !f.name.toLowerCase().includes(keyword)) return false;
                    
                    return true;
                });
                renderFacilities(filtered);
            }, 1000);
        }
    }

    function renderFacilities(data) {
        resultsGrid.innerHTML = '';
        resultCount.textContent = data.length;

        if (data.length === 0) {
            resultsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted); background: white; border-radius: 8px; border: 1px solid var(--border-color);">조건에 맞는 기관이 없습니다.</div>`;
            return;
        }

        data.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'facility-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="tag-type">${item.type}</span>
                    <h3 class="facility-name">${item.name}</h3>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <span>${item.address}</span>
                    </div>
                    <div class="info-item">
                        <i class="fa-solid fa-phone"></i>
                        <span>${item.phone}</span>
                    </div>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
    }

    // Handle Form Submit
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
    });
});
