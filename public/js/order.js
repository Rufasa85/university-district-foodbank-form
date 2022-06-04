

const submitBtn = document.querySelector('#submit-btn')
const futureSubmitBtn = document.querySelector('#future-submit')
const datePicker = document.querySelector("#date-select")
const timeBtns = document.querySelector(".timeBtns")
const showFutureBtn = document.querySelector("#show-future")
const cancelFutureBtn = document.querySelector("#cancel-future")
const nowDiv = document.querySelector(".now");
const futureDiv = document.querySelector(".future");
const SLOTS_PER_HOUR = 4
let chosenTime;
//hack for using getDay() uses 0 indexed week sun-sat, so array indexes match.
const availableSlots = [
    null,
    {
        '9:00': SLOTS_PER_HOUR,
        '10:00': SLOTS_PER_HOUR,
        '11:00': SLOTS_PER_HOUR,
        "12:00": SLOTS_PER_HOUR,
        '13:00': SLOTS_PER_HOUR,
        '14:00': SLOTS_PER_HOUR
    },
    {
        '11:00': SLOTS_PER_HOUR,
        "12:00": SLOTS_PER_HOUR,
        '13:00': SLOTS_PER_HOUR,
        '14:00': SLOTS_PER_HOUR,
        '15:00': SLOTS_PER_HOUR,
        '16:00': SLOTS_PER_HOUR,
        '17:00': SLOTS_PER_HOUR,
        '18:00': SLOTS_PER_HOUR,
        '19:00': SLOTS_PER_HOUR,
    },
    null,
    {
        '11:00': SLOTS_PER_HOUR,
        "12:00": SLOTS_PER_HOUR,
        '13:00': SLOTS_PER_HOUR,
        '14:00': SLOTS_PER_HOUR,
        '15:00': SLOTS_PER_HOUR,
        '16:00': SLOTS_PER_HOUR,
        '17:00': SLOTS_PER_HOUR,
        '18:00': SLOTS_PER_HOUR,
        '19:00': SLOTS_PER_HOUR,
    },
    {
        '11:00':SLOTS_PER_HOUR,
        "12:00":SLOTS_PER_HOUR,
        '13:00':SLOTS_PER_HOUR,
        '14:00':SLOTS_PER_HOUR,
        '15:00':SLOTS_PER_HOUR,
    },
    null
]
datePicker.addEventListener("change", e => {
    const chosenDate = e.target.value
    document.querySelector(".no-slots-left").classList.add("hide")
    document.querySelector(".timeBtns").innerHTML = ""
    console.log(chosenDate)
    const chosenSlots = availableSlots[new Date(`${chosenDate} 12:00`).getDay()]
    console.log(chosenSlots)
    if(!chosenSlots){
        document.querySelector(".no-slots-left").classList.remove("hide")
        return;
    }
    fetch(`/api/order/day/${chosenDate}`).then(res => res.json()).then(data => {
        if(chosenSlots) {
        console.log(data)
        const takenSlots = data.orders
        console.log(data.orders);
        const blocks = [];
            for (const time in takenSlots) {
                const filledSlotNum = takenSlots[time];
                chosenSlots[time]-= filledSlotNum
            }
            for (const time in chosenSlots) {
                console.log(time)
                if(chosenSlots[time]>0){
                    blocks.push(time)
                }
            }
            console.log(blocks)
            if(!blocks.length) {
                document.querySelector(".no-slots-left").classList.remove("hide")
                return;
            }
           blocks.forEach(block=>{
               const newTimeBtn = document.createElement("button")
               newTimeBtn.setAttribute("class","btn btn-primary m-3 time-block-btn");
               newTimeBtn.setAttribute("data-hour",block)
               newTimeBtn.textContent = dateFns.format(`01-01-01 ${block}`,"h a")
               document.querySelector(".timeBtns").append(newTimeBtn)
           })   
        } 

    })
})

timeBtns.addEventListener("click",e=>{
    e.preventDefault()
    if(e.target.matches(".time-block-btn")){
        e.preventDefault()
        chosenTime = e.target.getAttribute("data-hour")
        let dateInfo = `${datePicker.value} ${e.target.getAttribute("data-hour")}`;
        console.log("time",dateInfo);
        console.log("as date",new Date(dateInfo));
        document.querySelector(".selected-slot-span").textContent = `you selected ${dateFns.format(dateInfo,"dddd, MMMM Do [at] h:mm a")}`
        document.querySelector(".selected-slot").classList.remove("hide")
        document.querySelector(".change-time-btn").classList.remove("hide")
        document.querySelector(".timeBtns").classList.add("hide")
        document.querySelector("#date-select").classList.add("hide")
    }
})

document.querySelector(".change-time-btn").addEventListener("click",e=>{
    e.preventDefault()
    document.querySelector(".selected-slot").classList.add("hide")
    document.querySelector(".change-time-btn").classList.add("hide")
    document.querySelector(".timeBtns").classList.remove("hide")
    document.querySelector("#date-select").classList.remove("hide")
})

const orderFormSubmit = async function (event) {
    event.preventDefault();

    const wantedItems = document.querySelectorAll('input[type="checkbox"]:checked')
    const preferences = document.querySelectorAll('.form-control')


    // document.querySelectorAll('.form-control').forEach(element => {
    //       if(element.value) {
    //           console.log(`${element.id}: ${element.value}`)
    //   }})

    // }
    console.log("THIS IS WORKING")
    const bodyObj = {}
    if(chosenTime){
        bodyObj.futureOrder=true;
        bodyObj.pickupTime = `${datePicker.value} ${chosenTime}`
    }
    wantedItems.forEach(element => {
        bodyObj[element.id] = true
    })
    preferences.forEach(element => {

        bodyObj[element.id] = element.value

    })
    console.log(bodyObj)
    console.log(chosenTime)
    const response = await fetch('/api/order/', {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/processing');
    } else {
        alert('Failed to send Order');
    }
};

showFutureBtn.addEventListener("click",e=>{
    e.preventDefault();
    nowDiv.classList.add("hide")
    futureDiv.classList.remove("hide")
})
cancelFutureBtn.addEventListener("click",e=>{
    nowDiv.classList.remove("hide")
    futureDiv.classList.add("hide")
})

submitBtn.addEventListener("click", orderFormSubmit);
futureSubmitBtn.addEventListener("click", orderFormSubmit);