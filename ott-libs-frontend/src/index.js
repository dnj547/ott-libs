// URLS
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"
// HTML Variable
const frontPage = document.querySelector('#front-page')
const userForm = document.querySelector('#user-form')
const signIn = document.querySelector('#signin')
const userName = document.querySelector('#uname')
const userRecaps = document.querySelector('#user-recaps')
const template1 = document.querySelector('#template-1')
const temp1Form = document.querySelector('#temp1-form')
const playGame = document.querySelector('#play-game')
// Initial Page View
template1.style.display = 'none'
playGame.style.display = 'none'

// Create New User or Show Old User's Recaps
userForm.addEventListener('submit',e=>{
  e.preventDefault()
  fetch(USERS_URL)
  .then(r=>r.json())
  .then(users=>{
    let user = users.find(user => user.name === userName.value)
    if (user) {
      userRecaps.innerHTML +=`
      <h5>Save Slot 1</h5>
        <p>${user.stories.map(story=>{
          if (story.recap_id == 1) {
            return story.full_story
          } else {
            return "blah"
          }
        })}</p>
      `
    } else {
      newUser()
    }
    playGame.style.display = ''
  })
})
// Start Game
playGame.addEventListener('click', e=>{
  userName.style.display = 'none'
  playGame.style.display = 'none'
  signIn.style.display = 'none'
  template1.style.display = ''
})
// Save Answers to User's Stories
temp1Form.addEventListener('submit',e=>{
  let eChild = e.target.children
  e.preventDefault()
  temp1Form.style.color = "black"
  // Create Array to Easily Save to User's Stories
  let storyArr = []
  // forEach() cannot be used with e.target.children
  // innerText of <p> will not be empty but
  // innerText of <input> will be empty
  // Need to call .value on <input>
  for (var i = 0; i < eChild.length - 1; i++) {
    if (eChild[i].innerText !== "") {
      storyArr.push(eChild[i].innerText)
    } else {
      storyArr.push(eChild[i].value)
    }
  }
  fetch(STORIES_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'full_story': storyArr.join(" ")
    })
  })
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
      'name': userName.value
    })
  })
  playGame.style.display = ''
}
