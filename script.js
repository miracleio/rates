
const docStyles = document.documentElement.style;
const actionBtn = document.querySelector("#action-btn");
const ratesDisp = document.querySelector("#count");
const limit = 15;
let rates = sessionStorage.getItem("rates");
let height = ratesDisp.children[ratesDisp.children.length - 1].clientHeight;
const message = document.querySelector("#message");

let tx = 0;

const checkSession = ()=>{
    if( sessionStorage.getItem("rates") == null){
        sessionStorage.setItem("rates", 0);
    };
    rated();
    setDisp();
};

const checkLocal = ()=>{
    if( localStorage.getItem("totalrates") == null){
        localStorage.setItem("totalrates", 0);
    };
};

const setDisp = ()=>{
    ratesDisp.firstElementChild.textContent = rates;
}

const rate = ()=>{
    if(parseInt(rates) >= limit){
        limitReached();
        return false
    }
    rateFunc();
    console.log(rates);
    sessionStorage.setItem("rates", rates);
    let totalrates = parseInt(localStorage.getItem("totalrates"));
    totalrates ++;
    console.log(totalrates);
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
    message.textContent = `Alright! You can't rate more than ${limit}`;
    message.parentElement.classList.add("show");
    actionBtn.classList.add("rated");
    setTimeout(()=>{
        message.parentElement.classList.remove("show");
    }, 3000);
}

const rateFunc = ()=>{
    rates++;
    if(rates >= limit) actionBtn.classList.add("rated");
    height = ratesDisp.children[ratesDisp.children.length - 1].clientHeight;
    tx += height;

    console.log(rates, tx);

    var newVal = document.createElement("span");
    newVal.textContent = rates;
    ratesDisp.appendChild(newVal);

    docStyles.setProperty("--tx", `-${tx}px`);
    docStyles.setProperty("--height", `${height}px`);
}

window.addEventListener("load", checkSession);
window.addEventListener("load", checkLocal);
actionBtn.addEventListener("click", rate);