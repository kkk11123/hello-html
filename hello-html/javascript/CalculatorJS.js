'use strict';  // 엄격 모드: 에러를 더 엄격하게 체크하고, 일부 비표준 기능을 비활성화함

// ELEMENTS
const labelInput = document.querySelector('.input');  // 결과를 표시할 요소를 선택

const keyClear = document.querySelector('.key--clear');  // 'C' 버튼을 선택
const keyDelete = document.querySelector('.key--delete');  // '←' 버튼을 선택
const keyFunctions = document.querySelectorAll('.key--function');  // 연산자 버튼들을 선택
const keyEquals = document.querySelector('.key--equals');  // '=' 버튼을 선택
const keypads = document.querySelectorAll('.keypads');  // 숫자 버튼들을 선택
const keyDot = document.querySelector('.key--dot');  // '.' 버튼을 선택

(function () {  // 즉시 실행 함수 표현식 (IIFE)
  // 계산에 필요한 데이터
  let value = 0;  // 현재 계산된 결과값
  let inputValue = '';  // 현재 입력된 값
  let operatorPre = '';  // 이전 연산자
  let operator = '';  // 현재 연산자

  // 계산 실행 함수
  const operate = function (operator) {
    value = Number(value) || 0;  // value를 숫자로 변환, false일 경우 0
    inputValue = Number(inputValue) || 0;  // inputValue를 숫자로 변환, false일 경우 0

    switch (operator) {  // 연산자에 따라 계산 수행
      case '/':
        value /= inputValue;  // 나누기
        break;
      case '*':
        value *= inputValue;  // 곱하기
        break;
      case '-':
        value -= inputValue;  // 빼기
        break;
      case '+':
        value += inputValue;  // 더하기
        break;
    }

    // 출력값의 자릿수 제한
    if (value.toString().length > 12) {  // 자릿수가 12를 초과하면
      value = value.toString().slice(0, 13);  // 자릿수를 13자리로 제한
    }
    return value.toLocaleString();  // 숫자를 지역화된 문자열로 변환하여 반환
  };

  // equals, clear, deleteOne, addDot
  const equals = function () {
    value = labelInput.textContent = operate(operator);  // 연산을 수행하고 결과를 화면에 표시
    operator = '';  // 연산자 초기화
  };
  
  const clear = function () {
    value = 0;  // 값 초기화
    inputValue = '';  // 입력값 초기화
    operator = '';  // 연산자 초기화
    labelInput.textContent = value;  // 화면에 0 표시
  };
  
  const deleteOne = function () {
    inputValue = inputValue.slice(0, -1);  // 입력값의 마지막 문자 제거
    labelInput.textContent = inputValue || 0;  // 입력값이 비어있다면 0 표시
  };
  
  const addDot = function () {
    inputValue += '.';  // 입력값에 소수점 추가
    labelInput.textContent = inputValue;  // 화면에 입력값 표시
  };

  // 숫자 입력값 생성
  const setNumber = function (num) {
    if (!isNaN(num) && inputValue.length < 12) {  // 숫자일 때만 처리하고 입력값의 길이가 12보다 작으면
      inputValue += num;  // 입력값에 숫자 추가
      labelInput.textContent = inputValue;  // 화면에 입력값 표시
    }
  };

  // 연산자 셋팅
  const setOperator = function (key) {
    operatorPre = operator;  // 현재 연산자를 이전 연산자로 저장
    operator = key;  // 현재 연산자 업데이트
    if (value && inputValue) {  // value와 inputValue가 모두 있으면
      value = labelInput.textContent = operate(operatorPre);  // 이전 연산자로 연산 수행
    }
    value = value || inputValue;  // value가 없으면 inputValue를 사용
    inputValue = '';  // 입력값 초기화
  };

  // 이벤트 리스너
  // 숫자 클릭 이벤트 감지
  keypads.forEach((key) => {
    key.addEventListener('click', (e) => {
      let num = e.currentTarget.textContent.trim();  // 클릭된 버튼의 텍스트를 가져와서 공백 제거
      setNumber(num);  // 숫자 처리 함수 호출
    });
  });

  // 연산자 클릭 이벤트 감지
  keyFunctions.forEach((key) =>
    key.addEventListener('click', (e) => {
      let key = e.target.textContent.trim();  // 클릭된 연산자의 텍스트를 가져와서 공백 제거
      setOperator(key);  // 연산자 처리 함수 호출
    })
  );

  // equals, clear, deleteOne 클릭 감지
  keyEquals.addEventListener('click', () => {
    equals();  // equals 함수 호출
  });
  keyClear.addEventListener('click', () => {
    clear();  // clear 함수 호출
  });
  keyDelete.addEventListener('click', () => {
    deleteOne();  // deleteOne 함수 호출
  });

  keyDot.addEventListener('click', () => {
    addDot();  // '.' 버튼 클릭 시 addDot 함수 호출
  });
})();
