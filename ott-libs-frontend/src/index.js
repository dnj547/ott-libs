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
const newGameBtn = document.querySelector('.new-game-btn')
const levelCounter = document.querySelector('#level-counter')
let levels = 1
let recapView = false

frontPage.addEventListener('click',e=>{
  console.log(e.target.name);
  switch (e.target.name) {
    case "signin":
      userFunc()
      userForm.style.display = 'none'
      newGameBtn.style.display = ''
      break;
    case "viewRecap":
      let show = document.querySelector(`#full-recap${e.target.id}`)
      recapView = !recapView
      if (recapView) {
        show.style.display = ''
      } else {
        show.style.display = 'none'
      }
      break;
    case "new-game":
      let userId = parseInt(e.target.accessKey)
      let saveSlot = parseInt(e.target.attributes[1].value)
      userForm.style.display = 'none'
      userRecaps.style.display = 'none'
      newGameBtn.style.display = 'none'
      document.querySelector(`#template-${levels}`).style.display = ''
      document.querySelector(`#temp${levels}-form`).accessKey = userId
      document.querySelector(`#temp${levels}-form`).id = saveSlot
      levelCounter.style.display = ''
      break;
    case "level":
      document.querySelector(`#template-${levels}`).style.display = 'none'
      levels++
      document.querySelector(`#template-${levels}`).style.display = ''
      break;
    case "submit-level":
      e.preventDefault()
      document.querySelector(`#temp${levels}-form`).style.color = 'black'
      debugger
      break;
    default:

  }
})

// Save Answers to User's Stories
// temp1Form.addEventListener('submit',e=>{
//   let eChild = e.target.children
//   e.preventDefault()
//   temp1Form.style.color = "black"
//   // Create Array to Easily Save to User's Stories
//   let storyArr = []
//   // forEach() cannot be used with e.target.children
//   // innerText of <p> will not be empty but
//   // innerText of <input> will be empty
//   // Need to call .value on <input>
//   for (var i = 0; i < eChild.length - 1; i++) {
//     if (eChild[i].innerText !== "") {
//       storyArr.push(eChild[i].innerText)
//     } else {
//       storyArr.push(eChild[i].value)
//     }
//   }
//   fetch(STORIES_URL,{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       'user_id': e.target.lastChild.accessKey,
//       'full_story': storyArr.join(" "),
//       'recap': e.target.lastChild.name
//     })
//   })
// })

// HELPER FETCHES
// Create New User or Show Old User's Recaps
function userFunc() {
  userForm.addEventListener('submit',e=>{
    e.preventDefault()
    fetch(USERS_URL)
    .then(r=>r.json())
    .then(users=>{
      let user = users.find(user => user.name === userName.value)
      if (user) {
        userRecaps.innerHTML +=`
        <h1>${user.name}</h1>`
        for (var i = user.stories.length; i > 0; i--) {
          const fullStory = []
          user.stories.forEach(story=>{
            if (story.recap == i) {
              fullStory.push(story.full_story)
            }
          })
          if (fullStory.length > 0) {
            userRecaps.innerHTML +=`
            <label>${i} - Recap</label>
            <p style="display:none;" id="full-recap${i}">${fullStory.join(" ")}</p>
            <input type="submit" name="viewRecap" id=${i} accessKey=${user.id} value="View"/>
            <br>
            <br>
            `
          }
        }
        let recapNum = parseInt(userRecaps.children[1].innerText)
        recapNum++
        newGameBtn.id = recapNum
        newGameBtn.accessKey = user.id
        console.log(newGameBtn);
      } else {
        newUser()
      }
    })
  })
}

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
}
