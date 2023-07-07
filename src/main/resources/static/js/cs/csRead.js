// // 사용자가 입력한 내용을 서버에 전송하고 응답을 받아와서 내용을 업데이트하는 함수
// function updateContent() {
//     // 사용자가 입력한 값들을 받아온다고 가정
//     var userNameInput = "";
//     var questionTitleInput = "";
//
//     // AJAX 요청 설정
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/updateQuestionContent', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//
//     // 요청 데이터 설정
//     var requestData = {
//         userName: userNameInput,
//         questionTitle: questionTitleInput
//     };
//
//     // 요청 전송
//     xhr.send(JSON.stringify(requestData));
//
//     // 요청에 대한 응답 처리
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);
//             var questionContent = response.questionContent;
//
//             // 응답 받은 내용으로 내용을 업데이트
//             document.getElementById("questionContent").innerText = questionContent;
//         }
//     };
// }

// 페이지 로드 시 내용 업데이트 함수 호출
// window.onload = updateContent;

function fn_modify(csNumber){
    if(confirm("정말 수정하시겠습니까?")){
        location.href = "/cs/modify?csNumber="+csNumber;
    }
}

function fn_remove(csNumber) {
    if (confirm("정말 삭제하시겠습니까?")) {
        location.href = "/cs/remove?csNumber="+csNumber;
    }
}





// 리플 작성 완료 처리

// const csNumber = $('.cs-num').val();

$('.commentBtn').on('click', function(){
    let content = $('.comment1').val().trim();

    if(content == ''){
        return;
    }

    let commentObj = {
        commentContent : content,
        csNumber : csNumber
    }

    register(commentObj, function(){
        getList(csNumber, showComment, showError);
        // getView(commentNumber, findComment, findError);
    }, showError);

    $('.comment1').val('');
});


function register(commentObj, callback, error){
    $.ajax({
        url : "/replies/reply",
        type : "post",
        data : JSON.stringify(commentObj),
        contentType : 'application/json; charset=utf-8',
        success : function (){
            if(callback){
                callback();
            }
        },
        error: error
    });
}

function getList(csNumber, callback, error){

    $.ajax({
        url : `/replies/list${csNumber}`,
        type : 'get',
        dataType : 'json',
        success : function (result){

            if (callback){
                callback(result);
            }
        },
        error : error
    });
}

function getView(csNumber, callback, error){
    $.ajax({
        url : `/replies/list/${csNumber}`,
        type : 'get',
        dataType : 'json',
        success : function (result){
            if(callback){
                callback(result);
            }
        },
        error : error
    });
}


function showComment(replies) {
    console.log(replies);
    let text = '';
// ↓ html 코드 가져옴

 replies.forEach(r => {
     text +=  `<div class="commentAi" data-num="${r.commentNumber}">
            <input type="hidden" class="comment-num" th:value="${r.commentNumber}">
        <div class="profil">
            <img src="../img/corgi-g5894d3ae3_1920.jpg" height="50px" width="50px">
                <div class="Commento"><p>코멘토 AI 봇</p></div>
                <div class="dropdown2">
                    <button class="dropbtn2">
                        <span class="dropbtn_icon2"> <svg data-v-bd9f2bcc="" data-v-3035bc76="" width="24" height="24" fill="black" xmlns="http://www.w3.org/2000/svg" className="c-Applicatio c-icon" style="fill: rgb(148, 155, 160);"><circle data-v-bd9f2bcc="" cx="12" cy="5.5" r="1.5"></circle><circle data-v-bd9f2bcc="" cx="12" cy="12" r="1.5"></circle><circle data-v-bd9f2bcc="" cx="12" cy="18.5" r="1.5"></circle></svg></span>
                    </button> `;

                    if(r.userNumber == loginNumber) {
                        text += `
                    <div class="dropdown-content2">
                    
                        <a href="#">신고</a>
                        <a href="#" class="btn-modify">수정</a>
                        <a href="#" class="btn=remote">삭제</a>
                
                        
                        </div> `;
                    }
                    text +=`
               
                </div>
        </div>
        <div class="description"><p>${r.userId}</p></div>
        <div class="Aicontent">${r.commentContent}</div>`;
                    if(r.userNumber == loginNumber) {
                        text += `
            <div class="answer">
            <div class="answer-box"></div>
            <div class="answer-box-comment"><p>답변이 도움이 되었나요?</p></div>
            <div class="goodorbad">
                <button class="good" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-hand-thumbs-up-fill hide" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                    </svg>
                </button>추천
                <div class="empty-box3"></div>
                <button class="bad" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill hide" viewBox="0 0 16 16">
                        <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                    </svg>
                </button>비추천
            </div>
        </div> `;
                    }
               text +=`         
        <div class="parent">
            <div class="icon2">
                <div class="date1">${timeForToday(r.commentDate)}</div>
            </div>
        </div> `;

        });
    console.log("333");
    console.log(text);
    $('#csCommentList').html(text);

}

function  showError(a, b, c) {
}

function timeForToday(value){
    // new Date() 현재 날짜와 시간
    const today = new Date();
    const timeValue = new Date(value);

    console.log(today);
    console.log(timeValue);

    // Math.floor()는 소수점을 내림 처리 해준다.
    // getTime()은 1970년 01/01 을 기준으로 지금까지 몇 ms가 지났는지 알려준다.
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

    console.log(betweenTime);

    if(betweenTime < 1) { return "방금 전"; }
    if(betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if(betweenTimeHour < 24){
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if(betweenTimeDay < 365){
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
}
// 댓글 작성 버튼 처리 끝 ↑


// 신고하기  ↓

// 병구가 확인한 질문하기 모달창 처리
$('.police-btn').on('click', function (e) {
    e.preventDefault();
    let userNumber = $('.police-btn').data('userNumber');
    console.log(userNumber);
    if(userNumber){
        window.location.href = '/cs/write';
    }else {
        $('.login-move').trigger('click');
    }
});


// 신고하기 페이지 이동
let reportModal = document.querySelector(".reportModal");
let reportBtn = document.querySelector(".police-btn");

reportBtn.addEventListener("click", function (){
    reportModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

reportModal.addEventListener("click", function (e){
    if ($(e.target).hasClass("reportModal")){
        reportModal.style.display = "none";
        document.body.style.overflow = "unset";
    }
});

// 신고하기 버튼 클릭 시 컨펌 및 신고처리
let $reportButton = $('.report-btn');
$reportButton.on("click", function (){
    console.log($('.report-list input:checked').val());

    let result = confirm("정말 신고하시겠습니까?");


    if(result){
        reportAjax();
    }
});

// 신고하기 처리
function reportAjax(){
    let csNumber = $('.cs-num').val();
    let policeCategory = $('.report-list input:checked').val();

    $.ajax({
        url:'/police/cs',
        type: 'post',
        data: JSON.stringify({boardNumber: csNumber, policeCategory:policeCategory}),
        contentType : 'application/json; charset=utf-8',
        success : function (){
            alert("정상적으로 신고처리 되었습니다.")
            location.href = "/cs/main";
        }

    })
}


// 리플 수정 버튼 처리
$('#csCommentList').on('click', '.btn-modify', function (){
    let $content = $(this).closest('.commentAi').find('.Aicontent');
    $content.replaceWith(`
   <div class= 'modify-box'>
   <textarea class='modify-content'>${$content.text()}</textarea>
   <button type='button' class='modify-content-btn'>수정 완료</button>
   </div>
    `);
    $('.dropdown-content2').addClass('none');
});

// 리플 수정 완료 처리
const csNumber = $('.cs-num').val();

$('#csCommentList').on('click', '.modify-content-btn', function (){
    console.log('modify!!!');
    let commentNumber = $(this).closest('.commentAi').data('num');
    let commentContent = $(this).closest('modify-box').find('.modify-content').val();

    let commentObj = {
        commentNumber : commentNumber,
        commentContent : commentContent
    }
    console.log(commentObj);
    modify(commentObj, function(){
        getList(csNumber, showComment, showError);
    }, showError);

});




function modify(commentObj, callback, error){
    console.log("7777777777777777")
    $.ajax({
        url : `/replies/${commentObj.commentNumber}`,
        type : 'patch',
        data : JSON.stringify(commentObj),
        contentType : 'application/json; charset=utf-8',
        success : function (result){
            if(callback){
                callback(result);
            }
        },
        error : error
    });
    console.log("88888888888888888888888")
}



