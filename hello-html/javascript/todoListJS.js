// 입력 버튼 클릭 시 호출되는 함수
function onClickInputButton() {
  // 입력 박스 요소를 선택
  const inputBoxElem = document.querySelector("#input-box");
  // 입력 박스의 현재 값
  const inputBoxValue = inputBoxElem.value;

  // "to-do-list" 클래스를 가진 요소에 새 항목 추가
  document.querySelector(".to-do-list").innerHTML += `
    <li>
      <input
        type="checkbox"
        class="checkbox"
        onclick="onClickCheckbox(this)"
      />
      <span>${inputBoxValue}</span>
      <img
        src="trashcan.png"
        width="20"
        height="20"
        alt="trashcan"
        onclick="onClickDeleteButton(this)"
      />
    </li>
  `;

  // 입력 박스 비우기
  inputBoxElem.value = "";
}

// Enter 키를 누를 때 호출되는 함수
function enterKey() {
  // Enter 키(키 코드 13)가 눌렸는지 확인
  if (window.event.keyCode == 13) {
    // 입력 버튼 클릭 함수 호출
    onClickInputButton();
  }
}

// 삭제 버튼 클릭 시 호출되는 함수
function onClickDeleteButton(deleteElem) {
  // 삭제 버튼의 부모 요소(li)를 제거
  deleteElem.parentElement.remove();
}

// 체크박스 클릭 시 호출되는 함수
function onClickCheckbox(checkboxElem) {
  // 체크박스의 부모 요소(li)를 선택
  const liElem = checkboxElem.parentElement;
  // li 요소 내의 span 요소를 선택
  const spanElem = liElem.querySelector("span");

  // 체크박스가 체크된 상태인지 확인
  if (checkboxElem.checked) {
    // 체크된 경우, 텍스트에 취소선 추가
    spanElem.innerHTML = `<s>${spanElem.innerText}</s>`;
  } else {
    // 체크 해제된 경우, 원래 텍스트로 되돌리기
    spanElem.innerHTML = `${spanElem.innerText}`;
  }
}
