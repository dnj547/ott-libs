USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"

const frontPage = document.querySelector('#front-page')
const userForm = document.querySelector('#user-form')
const signIn = document.querySelector('#signin')
const user = document.querySelector('#uname')
const userRecaps = document.querySelector('#user-recaps')
const template1 = document.querySelector('#template-1')
const temp1Form = document.querySelector('#temp1-form')
const playGame = document.querySelector('#play-game')
let allUsers = []

fetch(USERS_URL)
  .then(r=>r.json())
  .then(users=>{
    users.forEach(user=>{
      allUsers.push(user.name)
    })
  })


template1.style.display = 'none'
playGame.style.display = 'none'

userForm.addEventListener('submit',e=>{
  e.preventDefault()
  if (allUsers.includes(user.value)) {
    listUserRecaps()
  } else {
    newUser()
  }
})

playGame.addEventListener('click', e=>{
  user.style.display = 'none'
  playGame.style.display = 'none'
  signIn.style.display = 'none'
  template1.style.display = ''

})

temp1Form.addEventListener('submit',e=>{
  e.preventDefault()
  temp1Form.style.color = "black"
  console.log(e.target.children[0].children[0].value);
})

// HELPER FETCHES
function newUser() {
  fetch(USERS_URL,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': user.value
    })
  })
  playGame.style.display = ''
}

function listUserRecaps() {
  fetch(RECAPS_URL)
    .then(r=>r.json())
    .then(recaps=>{
      recaps.forEach(recap=>{
        if (recap.users[0].name === user.value) {
          userRecaps.innerHTML +=`
          <ul>
          <li>${recap.users[0].name}</li>
          <li>${recap.stories.map(story=>{
            return story.words}).join(" ")}
            </li>
            </ul>
            `
          }
          playGame.style.display = ''
        })
    })
}
