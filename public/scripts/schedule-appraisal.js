// valid date
const dateInput = document.getElementById('date')
const minDate = new Date();

minDate.setDate(minDate.getDate() + 1);

const maxDate = new Date();

maxDate.setDate(minDate.getDate() + 30);

dateInput.max = maxDate.toISOString().split('T')[0];
dateInput.min = minDate.toISOString().split('T')[0];

// date validation end;

function closeElement(element) {
    element.style.display = 'none';
}

function openElement(element) {
    element.style.display = 'block';
}

// form submit

const form1 = document.forms[0];
const form2 = document.forms[1];
const successPage = document.getElementById('success-page')
const errorPage = document.getElementById('error-page');
const loadingPage = document.getElementById('loading-page');

function closeAllElements(){
    [form1, form2, successPage, errorPage, loadingPage].forEach(element=>{
        element.style.display ='none';
    })
}

closeElement(form2);
closeElement(successPage);
closeElement(errorPage)
closeElement(loadingPage)

function openStep2() {
    form1.style.display = 'none';
    loadingPage.style.display = 'block'
    setTimeout(() => {
        loadingPage.style.display = 'none';
        form2.style.display = 'block';
    }, 1000)
}

form1.addEventListener('submit', (event) => {
    event.preventDefault();

    openStep2();

})

form2.addEventListener('submit', (event) => {
    event.preventDefault();

    closeElement(form2);
    openElement(loadingPage);

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const date = new Date(document.getElementById('date').value);
    date.setHours(...(document.getElementById('time').value).split(':'));

    const data = JSON.stringify({
        name, email, phone, address, date, time: date
    })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch("/home-valuation/appointment", requestOptions)
        .then(response => {
            if (response.ok) { 
                closeElement(loadingPage);
                openElement(successPage);
            } else {
                closeElement(loadingPage);
                openElement(errorPage);
             }
            
        })
        .catch(error => {
            closeAllElements();

            openElement(errorPage);
            console.log(error)
        });

})