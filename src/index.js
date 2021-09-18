import shuffle from './module/shuffle.js';
import PlayAudio from './module/PlayAudio.js';

PlayAudio()

const english = $('#english');
const vietnamese = $('#vietnamese');


const englishData = [
    {key: 0, value: "theory"},
    {key: 1, value: "literature"},
    {key: 2, value: "knowledge"},
    {key: 3, value: "library"},
    {key: 4, value: "temperature"},
    {key: 5, value: "investment"},
    {key: 6, value: "society"},
    {key: 7, value: "community"},
    {key: 8, value: "development"},
    {key: 9, value: "security"},
    {key: 10, value: "organization"},
    {key: 11, value: "equipment"},
    {key: 12, value: "direction"},
    {key: 13, value: "instance"},
    {key: 14, value: "university"},
    {key: 15, value: "news"},
    {key: 16, value: "user"},
    {key: 17, value: "philosophy"},
    {key: 18, value: "communication"},
    {key: 19, value: "advertising"},
    {key: 20, value: "decision"},
];

const vietnameseData = [
    {key: 0, value: "Lý thuyết"},
    {key: 1, value: "Văn chương"},
    {key: 2, value: "Kiến thức"},
    {key: 3, value: "Thư viện"},
    {key: 4, value: "Nhiệt độ"},
    {key: 5, value: "Đầu tư"},
    {key: 6, value: "Xã hội"},
    {key: 7, value: "Cộng đồng"},
    {key: 8, value: "Phát triển"},
    {key: 9, value: "An ninh"},
    {key: 10, value: "Cơ quan"},
    {key: 11, value: "Thiết bị"},
    {key: 12, value: "Phương hướng"},
    {key: 13, value: "Trường hợp"},
    {key: 14, value: "Trường đại học"},
    {key: 15, value: "Tin tức"},
    {key: 16, value: "Người sử dụng"},
    {key: 17, value: "Triết học"},
    {key: 18, value: "Liên lạc"},
    {key: 19, value: "Quảng cáo"},
    {key: 20, value: "Phán quyết"},
];

const state = {
    active1: '', //lưu giá trị ô tiếng anh được check
    active2: '',
    valueEnglish: '', //lưu value ô được click
    valueVietnamese: '',
    keyActive1: '', //lưu vị trí của ô tiếng anh được chọn
    keyActive2: '',
    elementEnglish: [], // lưu list DS hiển thị các data trên màn hình TA
    elementVietnamese: [],
    newEnglishData: [], //lưu data đã tiếng anh đã được cắt
    newVietnameseData: [],
    inputValue: 0,//lưu input người dùng nhập
    wonCheck: 0, //lưu số các cặp từ đã click đúng 
    check: false, // biến kiểm tra hai từ đồng nghĩa
}

const times = {
    minute: 0, 
    seconds: 0,
}
var setTimes; // khởi tạo biến setInterval

const EnglishDataShuffle = shuffle(englishData);
const VietnameseDataShuffle = shuffle(vietnameseData);

const input = $('input')  
input[0].addEventListener('change', (e) => {
    let valueInput = parseInt(e.target.value)  //giá trị người dùng nhập
    state.inputValue = valueInput
    if (valueInput < 4 || valueInput > 20) {
        $('.error')[0].innerHTML = 'Min: 4; Max: 20';
    } else {
        $('.error')[0].innerHTML = '';
    }
})

$('.startGame')[0].addEventListener('click',() => {
    let newEnglishData = EnglishDataShuffle.splice(1,state.inputValue);
    state.newEnglishData = newEnglishData;
    console.log(newEnglishData)
    let getVietnameseDataLikeEnglish = []; // tìm kiếm các key tiếng việt dựa trên key tiếng anh đã lấy
    for (let i in newEnglishData) {
        for (let j in VietnameseDataShuffle) {
            if (newEnglishData[i].key == VietnameseDataShuffle[j].key) {
                getVietnameseDataLikeEnglish.push(VietnameseDataShuffle[j])
            }
        }
    }
    let newVietnameseData = shuffle(getVietnameseDataLikeEnglish);
    state.newVietnameseData = newVietnameseData;
    start();
})

const start = () => {  //khơi chạy
    setTimes = setInterval(startTime, 1000) // khởi chạy bộ đếm thời gian
    $('.inputGame')[0].setAttribute('style','display: none;');
    $('.startGame')[0].setAttribute('style','display: none;');
    for (let i in state.newEnglishData) {  //render cac nut
        console.log("index", i)
        const createBtn = document.createElement('button');
        createBtn.setAttribute('type', 'button')
        createBtn.classList.add('Data__item--btn','getElementEnglish')
        createBtn.innerHTML = state.newEnglishData[i].value
        english[0].appendChild(createBtn);
    }
    
    for (let i in state.newVietnameseData) {
        const createBtn = document.createElement('button');
        createBtn.setAttribute('type', 'button')
        createBtn.classList.add('Data__item--btn','getElementVietnamese')
        createBtn.innerHTML = state.newVietnameseData[i].value
        vietnamese[0].appendChild(createBtn);
    }
    getElement();
}

const getElement = () => { // lấy các element đã được tạo
    state.elementEnglish = $('.getElementEnglish')
    state.elementVietnamese = $('.getElementVietnamese')
    ListenerEvent();
}

const ListenerEvent = () => { // lắng nghe sự kiện người dùng chọn các ô data
    for (let i in state.newEnglishData) {
        state.elementEnglish[i].addEventListener ('click', () => {
            state.keyActive1 = i;
            state.valueEnglish = state.newEnglishData[i].value
            for (let j in state.newEnglishData) {
                state.elementEnglish[j].classList.remove('active');
                if (i == j) state.elementEnglish[j].classList.add('active');
            }
            state.active1 = state.newEnglishData[i].key
            checking()
        })
    }
    
    for (let i in state.newVietnameseData) {
        state.elementVietnamese[i].addEventListener ('click', () => {
            state.keyActive2 = i;
            state.valueVietnamese = state.newVietnameseData[i].value
            for (let j in state.newVietnameseData) {
                state.elementVietnamese[j].classList.remove('active');
                if (i == j) state.elementVietnamese[j].classList.add('active');
            }
            state.active2 = state.newVietnameseData[i].key
            checking()
        })
    }
}

function checking() {
    if (state.active1 === state.active2) {
        state.check = true
        state.wonCheck++
    } else {
        state.check = false
    }
    remove();
}

function remove() {
    if (state.check) {
        state.elementEnglish[state.keyActive1].innerHTML = `<i class="fad fa-check checkTrue"></i>${state.valueEnglish}`;
        state.elementVietnamese[state.keyActive2].innerHTML = `<i class="fad fa-check checkTrue"></i>${state.valueVietnamese}`;
        state.elementEnglish[state.keyActive1].setAttribute('disabled','true')
        state.elementVietnamese[state.keyActive2].setAttribute('disabled','true')
        if (state.wonCheck == state.inputValue) { // WIN GAME
            clearInterval(setTimes)
            $('body').fireworks({
                sound: true,
                opacity: 0.8,
                width: '100%',
                height: '100%'
            })

           setTimeout(() => {
                $('.actions__won')[0].innerHTML = `WON <div> <span id="minute_win">${times.minute}m</span>:<span id="second_win">${times.seconds}s</span> <div> <button id="btn__reload">Play Again<i class="fad fa-undo" style="margin-left: 8px;"></i></button>`
           },2000)   

           setTimeout (() => {
                $('.actions__won')[0].setAttribute('style','opacity: 1;')
           },2500)

           setTimeout (() => {
                playAgain();
           },2001)
        }
    }
}

const playAgain = () => {
    $('#btn__reload')[0].addEventListener ('click', () => {
        location.reload();
    })
}


const startTime = () => {
    times.seconds++
        if (times.seconds < 9) $('#second')[0].innerHTML = '0' + times.seconds
        if (times.seconds > 9) $('#second')[0].innerHTML = times.seconds
        if (times.seconds > 59) {
            times.minute++
            $('#minute')[0].innerHTML = '0' + times.minute
            times.seconds = 0
            $('#second')[0].innerHTML = '0' + 0
        }
        if (times.minute > 9) $('#minute')[0].innerHTML = times.seconds
}











