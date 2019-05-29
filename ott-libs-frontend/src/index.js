// URLS
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"
// HTML Variable
const answers = {
  2: ['sleeping','','partying', 'gate', 'tree', 'wall', 'otters'],
  3: [],
  4: [],
  5: []
}
const frontPage = document.querySelector('#front-page')
const userForm = document.querySelector('#user-form')
const signIn = document.querySelector('#signin')
const userName = document.querySelector('#uname')
const userRecaps = document.querySelector('#user-recaps')
const newGameBtn = document.getElementsByName('new-game')
const levelCounter = document.getElementsByName('level-counter')
const retryLevel = document.getElementsByName('retry-level')
const submitLevelWords = document.querySelectorAll('.submit-level-words')
let levels = 1
let recapView = false


frontPage.addEventListener('click',e=>{
  console.log(e.target.name);
  switch (e.target.name) {
    // SIGN IN
    case "signin":
      userFunc()
      userForm.style.display = 'none'
      newGameBtn[0].style.display = ''
      break;
    // VIEW RECAPS
    case "viewRecap":
      let show = document.querySelector(`#full-recap${e.target.id}`)
      show.style.display = ''
      e.target.style.display = 'none'
      let hideBtn = document.querySelector(`#hide${e.target.id}`)
      hideBtn.style.display = ''
      break;
    // HIDE RECAPS
    case "hideRecap":
      e.target.nextElementSibling.style.display = 'none'
      e.target.style.display = 'none'
      e.target.nextElementSibling.nextElementSibling.style.display = ''
      break;
    // BEGIN NEW GAME - HIDE SIGN IN, RECAPS, NEW GAME BUTTON - SHOW LEVEL COUNTER BUTTON, FIRST TEMPLATE (INTRO)
    case "new-game":
      userForm.style.display = 'none'
      userRecaps.style.display = 'none'
      newGameBtn[0].style.display = 'none'
      document.querySelector(`#template-${levels}`).style.display = ''
      levelCounter[0].style.display = ''
      break;
    // GO TO NEXT LEVEL - HIDE PREVIOUS LEVEL - SHOW CURRENT LEVEL - POPULATE INPUT FIELDS BASED ON SPANS INSIDE STORY
    case "level-counter":
      document.querySelector(`#template-${levels}`).style.display = 'none'
      levelCounter[0].style.display = 'none'
      levels++
      showLevel()
      break;
    // SUBMIT WORDS TO STORY - DETERMINE PASS/FAIL - POST STORY TO USER
    case "submit-level":
      let eChild = e.target.parentElement.children
      var spans = eChild[0].children
      e.preventDefault()
      var temp = document.querySelector(`#temp${levels}-form`)
      temp.style.color = 'black'
      // Create Array to Easily Save to User's Stories
      let storyArr = []
      let failScore = 0
      for (var i=0; i < spans.length; i++) {
        if (answers[levels].includes(eChild[i].value)) {
          failScore++
        }
        spans[i].innerText = `<b style="color: blue;">${document.querySelector(`#span${i+1}`).value}</b>`
      }
      storyArr.push(eChild[0].innerText)
      e.target.parentElement.innerHTML = `
      ${storyArr.join(" ")}
      `
      if (failScore == 0) {
        const passSpan = document.querySelector(`#pass-level${levels}`)
        levelCounter[0].style.display = ''
        passSpan.style.display = ''
        // Story Variables
        const lvl2Color = eChild[4].innerText
        const lvl2FillSpan = passSpan.children[0].children[0]
        lvl2FillSpan.innerText = lvl2Color
        // Save Answers to User's Stories
        fetch(STORIES_URL,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            'user_id': e.target.accessKey,
            'full_story': storyArr.join(" "),
            'recap': e.target.id
          })
        })
      } else {
        const failSpan = document.querySelector(`#fail-level${levels}`)
        failSpan.style.display = ''
        retryLevel[0].style.display = ''
      }
      break;
    // RETRY FAILED LEVEL
    case 'retry-level':
      var temp = document.querySelector(`#template-${levels}`)
      var tempKids = temp.firstElementChild.children
      for (var i = 0; i < tempKids.length; i++) {
        tempKids[i].innerText = ""
      }
      e.target.parentElement.innerHTML = ''
      showLevel()
      break;
    default:
  }
})

// HELPER FETCHES
// Create New User or Show Old User's Recaps
function showLevel() {
  var temp = document.querySelector(`#template-${levels}`)
  temp.style.display = ''
  let mySpans = temp.firstElementChild.firstElementChild.children
  for (var i = 0; i < mySpans.length; i++) {
    let spanner = temp.firstElementChild
    let x = document.createElement('input')
    x.type = 'text'
    x.id = `span${i+1}`
    x.placeholder = mySpans[i].accessKey
    spanner.append(x)
  }
}

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
            <button style="display:none" type="button" name="hideRecap" id="hide${i}" accessKey=${user.id} value="Hide">Hide</button>
            <ul style="display:none;" id="full-recap${i}">${fullStory.join(" ")}</ul>
            <input type="button" name="viewRecap" id=${i} accessKey=${user.id} value="View"/>
            <br>
            <br>
            `
          }
        }
        let recapNum = parseInt(userRecaps.children[1].innerText)
        recapNum++
        submitLevelWords.forEach(btn=>{
          btn.id = recapNum
          btn.accessKey = user.id
        })
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
