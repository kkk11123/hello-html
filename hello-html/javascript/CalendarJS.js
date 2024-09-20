// 전역 변수로 현재 월과 연도를 저장
let currentMonth = new Date().getMonth(); // 현재 월 (0~11)
let currentYear = new Date().getFullYear(); // 현재 연도

// 월 이름과 요일 이름 배열
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 달력을 생성하는 함수
function createCalendar(month, year) {
    // 달력의 DOM 요소를 선택
    const monthName = document.querySelector('.month-name'); // 월과 연도를 표시하는 요소
    const weekdays = document.querySelector('.weekdays'); // 요일을 표시하는 요소
    const days = document.querySelector('.days'); // 날짜를 표시하는 요소

    // 이전 달력 내용을 지우기
    weekdays.innerHTML = '';
    days.innerHTML = '';

    // 월과 연도를 업데이트
    monthName.innerHTML = `${monthNames[month]} ${year}`; // 'March 2024' 형식으로 출력

    // 요일을 생성
    for (let i = 0; i < daysOfWeek.length; i++) {
        const weekday = document.createElement('div'); // 요일을 담을 div 요소 생성
        weekday.innerHTML = daysOfWeek[i]; // 요일 이름 설정
        weekdays.appendChild(weekday); // 요일 요소를 요일 컨테이너에 추가
    }

    // 달력 날짜 생성
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 월의 첫째 날의 요일 (0~6)
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // 월의 마지막 날짜

    // 첫 주의 빈 칸 생성
    for (let i = 0; i < firstDayOfMonth; i++) {
        const blank = document.createElement('div'); // 빈 칸을 담을 div 요소 생성
        blank.classList.add('blank'); // 빈 칸 클래스 추가
        days.appendChild(blank); // 빈 칸 요소를 날짜 컨테이너에 추가
    }

    // 해당 월의 날짜 생성
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const day = document.createElement('div'); // 날짜를 담을 div 요소 생성
        day.innerHTML = i; // 날짜 설정
        day.classList.add('day'); // 날짜 클래스 추가
        days.appendChild(day); // 날짜 요소를 날짜 컨테이너에 추가
    }
}

// 달력을 업데이트하는 함수
function updateCalendar(direction) {
    if (direction === 'next') { // 다음 월로 이동
        currentMonth++;
        if (currentMonth > 11) { // 12월 이후에는 1월로 이동
            currentMonth = 0;
            currentYear++;
        }
    } else if (direction === 'prev') { // 이전 월로 이동
        currentMonth--;
        if (currentMonth < 0) { // 1월 이전에는 12월로 이동
            currentMonth = 11;
            currentYear--;
        }
    }
    createCalendar(currentMonth, currentYear); // 업데이트된 월과 연도로 달력 생성
}

// 버튼에 이벤트 리스너 추가
document.getElementById('prev-month').addEventListener('click', () => updateCalendar('prev')); // 이전 월 버튼 클릭 시 이전 월로 이동
document.getElementById('next-month').addEventListener('click', () => updateCalendar('next')); // 다음 월 버튼 클릭 시 다음 월로 이동

// 초기 달력 생성
createCalendar(currentMonth, currentYear); // 페이지 로드 시 현재 월과 연도로 달력 생성
