const limit = 10;
const docStyles = document.documentElement.style;
const actionBtn = document.querySelector("#action-btn");
const ratesDisp = document.querySelector("#count");
const message = document.querySelector("#message");

let rates = sessionStorage.getItem("rates");
let totalrates = localStorage.getItem("totalrates");
let height = ratesDisp.children[ratesDisp.children.length - 1].clientHeight;
let tx = 0;

const checkStorage = ()=>{
    if( sessionStorage.getItem("rates") == null){
        sessionStorage.setItem("rates", 0);
    };
    if( localStorage.getItem("totalrates") == null || localStorage.getItem("totalrates") == 0){
        localStorage.setItem("totalrates", 0);
        sessionStorage.setItem("rates", 0);
    };
    totalrates = localStorage.getItem("totalrates");
    rates = sessionStorage.getItem("rates");

    rated();
};

const setDisp = ()=>{
    ratesDisp.firstElementChild.textContent = totalrates;
    if(rates >= limit) actionBtn.classList.add("rated");
    height = ratesDisp.children[ratesDisp.children.length - 1].clientHeight;
    tx += height;

    var newVal = document.createElement("span");
    newVal.textContent = totalrates;
    ratesDisp.appendChild(newVal);

    docStyles.setProperty("--tx", `-${tx}px`);
    docStyles.setProperty("--height", `${height}px`);
}

const rate = ()=>{
    checkStorage();
    if(parseInt(rates) >= limit){
        limitReached();
        return false
    }
    rateFunc();
    console.log({rates: rates, total: totalrates});
    sessionStorage.setItem("rates", rates);
    localStorage.setItem("totalrates", totalrates);
};

const rated = ()=>{
    if(rates >= limit){
        actionBtn.classList.add("rated");
        actionBtn.querySelector("#val").textContent = "Rated!";
    } else{
        actionBtn.classList.remove("rated");  
    }
}

const limitReached = ()=>{
    rated();
    message.textContent = `Alright! You can't rate more than ${limit}`;
    message.parentElement.classList.add("show");
    actionBtn.classList.add("rated");
    setTimeout(()=>{
        message.parentElement.classList.remove("show");
    }, 3000);
}

const rateFunc = ()=>{
    rates++;

    totalrates++;
    setDisp();
    console.log({translateX : tx});


}

window.addEventListener("load", checkStorage);
window.addEventListener("load", setDisp);
actionBtn.addEventListener("click", rate);