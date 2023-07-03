let looms = []
const errorDisplay = document.getElementById('errorDisplay')

const loomInput = document.getElementById('loomInput')
const saveBtn = document.getElementById('saveBtn')
const gptBtn = document.getElementById('gptBtn')
const promptList = document.getElementById('promptList')

const createdList = document.createElement('ul')

const getLooms = async() => {

    try{
        if(localStorage.getItem('looms')){
            looms = JSON.parse(localStorage.getItem('looms'))
        }
        else{
            const res = await fetch('https://6316ccc682797be77feae222.mockapi.io/api/notes')
            const data = await res.json()
            localStorage.setItem('looms',JSON.stringify(data))
            looms = data
        }
        populateLooms()
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const copyPrompt = (e) => {
    const textToBeCopied = e.target.innerText;
    e.target.style.transition = 'all 1s ease-in-out'
    e.target.style.backgroundColor = 'rgb(0 175 185 / var(--tw-bg-opacity))'
    e.target.style.color = '#ffffff'
    navigator.clipboard.writeText(textToBeCopied)
    .then(() => {
        // showNotification('Content copied to clipboard.');
        setTimeout(()=> {
            e.target.style.backgroundColor = '#ffffff'
            e.target.style.color = '#000000'
        },1200)
    })
    .catch((error) => {
      showNotification('Failed to copy content:', error);
    });
}

const showNotification = (message) => {
    errorDisplay.style.display = 'block'
    errorDisplay.innerText = message
    setTimeout(()=>{
        errorDisplay.style.display = 'none'
        errorDisplay.innerText = ''
    },2000)
}

const populateLooms = () => {
    promptList.innerHTML = ''
    looms.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'bg-white text-black rounded-md p-2 cursor-pointer';
        listItem.innerText = item.note;
        listItem.addEventListener('click',copyPrompt)
        promptList.appendChild(listItem)
    })
}

const gotoGPT = () => {
    var newURL = "https://chat.openai.com/";
    chrome.tabs.create({ url: newURL });
}

const addNewLoom = (e) => {
    e.preventDefault()
    looms.push({id:looms.length+1, note:loomInput.value})
    populateLooms()
    loomInput.value = ''
}

saveBtn.addEventListener('click', addNewLoom)
gptBtn.addEventListener('click', gotoGPT)

getLooms()

