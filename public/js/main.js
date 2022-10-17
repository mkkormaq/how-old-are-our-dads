// const dateIn = document.querySelector('#date');
// const nameIn = document.querySelector('#name');
// const btn = document.querySelector('button');
// const a = document.querySelector('a');
// const section = document.querySelector('#input');
// const h2 = document.querySelector('#display');
// btn.addEventListener('click', getBDay);
// a.addEventListener('click', reset)


const deleteBtn = document.querySelectorAll('.fa-trash-can')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteEntry)
})

async function deleteEntry(){
    const dadName = this.parentNode.childNodes[1].innerText.split(' ')[2]
    console.log(dadName)
    try{
        const res = await fetch('deleteItem',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS':dadName
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.error(err)
    }
}



// if(localStorage.getItem('bday')){
//     display();
// }else{
//     reset();
// }
// function calcAge(bday){

//     let today = new Date();
//     let age = today.getFullYear() - bday.getFullYear();;
//     let m = today.getMonth() - bday.getMonth();

//     if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
//         age--;
//     }
//     return age;
// }

// function getBDay(){

//     const dadBDay = new Date(dateIn.value + 'T12:00:00');
//     const dadName = nameIn.value;
//     if(dadBDay == "Invalid Date" || !dadName){

//         h2.innerText = 'Try again, dummy.';
//         return null;
//     }
//     localStorage.setItem('bday', dadBDay);
//     localStorage.setItem('name', dadName);

//     display();
    
// }

// function display(){

//     const age = calcAge(new Date(localStorage.getItem('bday')));
//     const dadName = localStorage.getItem('name');
//     h2.innerText = `${dadName} is ${age}`;
//     // nameIn.classList.add('hidden');
//     // btn.classList.add('hidden');
//     // dateIn.classList.add('hidden');
//     section.classList.add('hidden');

// }

// function reset(){
//     nameIn.classList.remove('hidden');
//     btn.classList.remove('hidden');
//     dateIn.classList.remove('hidden');
//     section.classList.remove('hidden');
// }