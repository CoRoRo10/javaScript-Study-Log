let randomNum = [];

// Generate a random 3-digit number
function getRandomNum() {
    let arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    randomNum = [];
    for(let i = 0; i < 3; i++){
        let random = Math.floor(Math.random() * arrNum.length);
        randomNum.push(arrNum[random]);
        arrNum.splice(random, 1);
    }
    return randomNum;
        
}

// Warning if the value i not 3-digit number
function checkValidation(num) {
    if(num.length !== 3){
        alert('세자리의 숫자를 입력해주세요.');
        document.querySelector('#answer').value = '';
    }
}

// Check strike & ball
function getResult(num) {
    console.log('------->', randomNum);
    let userNum = num.split('');
    let result = {
        strike: 0,
        ball: 0,
    };

    for(let i = 0; i < randomNum.length; i++){
        if(randomNum[i] === Number(userNum[i])){
            result.strike++;
        }else if(userNum.indexOf(randomNum[i].toString()) > -1){
            result.ball++;
        }
    }
    return result;
}

// game start
const button = document.querySelector('.start');
const info = document.querySelector('#info');
button.addEventListener('click', ()=>{
    button.style.display = 'none';
    info.style.display = 'none';
    document.querySelector('#round').value = '1';
    getRandomNum();
});

// game restart
document.querySelector('.restart').addEventListener('click', ()=>{
    reset();
    getRandomNum();
});

// submit
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    if(randomNum.length === 0){
        alert('게임 시작 버튼을 누르세요');
        return;
    }
    if(Number(document.querySelector('#round').value) === 11){
        alert('10회 모두 도전하셨습니다.');
        reset();
        return;
    }
    let userNum = document.querySelector('#answer').value;
    checkValidation(userNum);
    let result;
    if(randomNum.length !== 0){
        result = getResult(userNum);
    }else{
        getRandomNum();
        result = getResult(userNum);
    }
    createTableTexts(userNum, result);
    if(result.strike === 3){
        alert(`게임에서 승리하셨습니다. 정답 : ${userNum}`);
        reset();
        return;
    }
});

// Create text to be entered into table
function createTableTexts(userNum, result) {
    let round = document.querySelector('#round').value;

    let trs = document.getElementById('tbody').getElementsByTagName('tr');
    let tr = trs[round-1];
    tr.getElementsByTagName('td')[1].innerHTML = userNum;
    tr.getElementsByTagName('td')[2].innerHTML = result.strike;
    tr.getElementsByTagName('td')[3].innerHTML = result.ball;

    document.querySelector('#round').value = Number(round)+1;
    document.querySelector('#answer').value = '';
}

// reset
function reset() {
    document.querySelector('#round').value = '1';

    let trs = document.getElementById('tbody').getElementsByTagName('tr');
    for ( let x = 0; x < trs.length; x++ ) { 
        var tr = trs[x]; 
        var tds = tr.getElementsByTagName('td'); 
        tds[ 1 ].innerHTML = ''; 
        tds[ 2 ].innerHTML = '';
        tds[ 3 ].innerHTML = '';
    }
    let input = document.querySelector('#answer');
    input.value = '';
    input.focus();
}