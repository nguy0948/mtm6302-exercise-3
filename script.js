const $form = document.getElementById('listForm')
const $saveInfo = document.getElementById('saveInfo')
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const $save = document.getElementById('saveButton')
const $submit = document.getElementById('submitButton')
const $acceptTerms = document.getElementById('acceptLine')

loadingData()
handleSaveButton()
handleSubmitButton()

function handleSaveButton() {
  $save.addEventListener('click',()=>{
    const name = document.getElementById('fullName').value
    const status = document.getElementById('emStatus').value
    const qualifications = document.getElementById('qual').value
    const isAccept = document.getElementById('formCheck').checked
    localStorage.setItem('name',name)
    localStorage.setItem('status',status)
    localStorage.setItem('qualifications',qualifications)
    localStorage.setItem('isAccept',isAccept)

    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()

    let ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12
    hour = hour ? hour : 12 
    minute = minute<10? '0'+minute:minute 

    const dateString = months[month]+' '+day+', '+year+', '+hour+':'+minute+' '+ampm

    localStorage.setItem('date', dateString)
    showSaveInfo()
  })
}

function handleSubmitButton() {
  $form.addEventListener('submit',(e)=>{
    e.preventDefault()
    showPopup()
    hideSaveInfo()
    $form.reset()
    localStorage.clear()
  })
}

function loadingData() {
  if (localStorage.length !== 0) {
    document.getElementById('fullName').value = localStorage.getItem('name')
    document.getElementById('emStatus').value = localStorage.getItem('status')
    document.getElementById('qual').value = localStorage.getItem('qualifications')
    document.getElementById('formCheck').checked = (localStorage.getItem('isAccept')=='true')
    showSaveInfo()
  }
}

function showSaveInfo() {
  $saveInfo.classList.remove('hide')
  $saveInfo.textContent = 'Last Saved on: '+ localStorage.date
}

function hideSaveInfo() {
    $saveInfo.classList.add('hide')
    $saveInfo.textContent = ''
  }

function showPopup() {
  const $popup = document.getElementById('popup')
  const $btnClose = $popup.querySelector('#btnClose')
  $popup.classList.remove('hide')

  $btnClose.addEventListener('click', ()=>{
    $popup.classList.add('hide')
  })
}