let slide = (oPosX, cIdx, cPosX) => {
    if(btn_lifeCycle) {
        btn_lifeCycle = false;

        // 인디케이터 active 변경
        // 현재 active 있는거 빼고
        indi[idx].classList.remove('active')
        // 들어올 번째꺼에 active 주기
        indi[cIdx].classList.add('active')


        let posX = 0;
        interval = setInterval(()=>{ 
            // 내보낼 판
            banner[idx].style.left = `${oPosX*posX}%`
        
            // 들어올 판
            banner[cIdx].style.left = `${cPosX*(100-posX)}%`

            posX+=1;
            if(posX > 100) {
                console.log("다 왔음")
                clearInterval(interval)
                idx = cIdx;
                btn_lifeCycle = true;
            }
        }, 10)
    }
}
 

let banner = document.getElementsByClassName('bg_banner');
let banner_count = banner.length;
let btn_slide_L = document.getElementById('btn_slide_L');
let btn_slide_R = document.getElementById('btn_slide_R');

let idx = 0; // 현재 가운데에 들어있는 방번호 저장 하는 변수
let interval = ""; 
let btn_lifeCycle = true;

btn_slide_R.addEventListener('click', function(){
    slide(-1, (idx+1) % banner_count, 1) 
})

btn_slide_L.addEventListener('click', function(){
    slide(1, (idx-1+banner_count) % banner_count, -1) 
})

/////////////////////////////////////////////////////////////
// 인디케이터 초기화 - bg_banner 의 개수를 따라서 생성. 0번째 indi 한테는 색칠되어 있게 하기
let indi_box = document.getElementsByClassName('indi_box')[0];
for(let i=0; i<banner_count; i++) {
    // if(i == 0) {
    //     indi_box.innerHTML += `<div class="indi active"></div>`
    // }
    // else {
    //     indi_box.innerHTML += `<div class="indi"></div>`
    // }
    
    indi_box.innerHTML += `<div class="indi ${i==0?'active':''}" data-idx=${i}></div>`;
    
    // indi_box.innerHTML += `<div class="indi ${i==0&&'active'}" data-idx=${i}></div>`;

}
     

let indi = document.getElementsByClassName('indi');
for(let i=0; i<indi.length; i++) {
    indi[i].addEventListener('click', function(){
        console.log(this.getAttribute('data-idx'))
        // console.log(event.target.getAttribute('data-idx'))
        let curr_clicked = this.getAttribute('data-idx');

        if(idx < curr_clicked) {// 현재꺼보다 우측꺼 눌렀다는 뜻
            slide(-1, curr_clicked, 1) 
        }
        else if(idx > curr_clicked) {// 현재꺼보다 좌측꺼 눌렀다는 뜻
            slide(1, curr_clicked, -1) 
        }
    })
}


let auto_interval = ""
function auto_slide() {
    auto_interval = setInterval(() => {
        slide(-1, (idx+1) % banner_count, 1) 
    }, (10*100) + 1000);
}
auto_slide();

let mb2 = document.getElementsByClassName('main_banner2')[0];
mb2.addEventListener('mouseenter', function(){
    clearInterval( auto_interval )
})
mb2.addEventListener('mouseleave', function(){
    auto_slide();
})
