// URLS
USERS_URL = "http://localhost:3000/api/v1/users";
STORIES_URL = "http://localhost:3000/api/v1/stories";
TEMPLATES_URL = "http://localhost:3000/api/v1/templates";
RECAPS_URL = "http://localhost:3000/api/v1/recaps";

const answers = {
  2: ["sleeping", "", "partying", "gate", "tree", "wall", "otters"],
  3: [""],
  4: [""],
  5: [""]
};
const recapId = {}
console.log(recapId);

// HTML Variable
const frontPage = document.querySelector("#front-page");
const welcomeOttLibsCont = document.querySelector("#welcome-ott-libs-container");
const signIn = document.querySelector("#signin");
const userName = document.querySelector("#uname");
const userRecaps = document.querySelector("#user-recaps");
const newGameBtn = document.getElementsByName("new-game");
const levelCounter = document.getElementsByName("level-counter");
const submitLevelWords = document.querySelectorAll(".submit-level-words");
const ottLibsCont = document.querySelector("#ott-libs-container");
const gamePlayDiv = document.querySelector('#game-play')

let levels = 1;
let continueLevel = 0;
let recapView = false;

frontPage.addEventListener("click", e => {
  console.log(e.target.name);
  console.log(e.target.id);
  switch (e.target.name) {
    // SIGN IN
    case "signin":
      userFunc();
      welcomeOttLibsCont.style.display = "none";
      ottLibsCont.style.display = "block";
      newGameBtn[0].style.display = "block";
      break;
    // VIEW RECAPS
    case "viewRecap":
      var idNum = e.target.id.replace( /^\D+/g, '');
      let reCnt = document.querySelector(`#full-recap${idNum}`)
      for (var i in recapId) {
        if (idNum !== i) {
          document.querySelector(`#view${i}`).style.display = 'none';
        }
      }
      reCnt.style.display = "block";
      if (reCnt.childElementCount < 6) {
        document.querySelector(`#cont${idNum}`).style.display = "block";
      }
      document.querySelector(`#hide${idNum}`).style.display = "block";
      break;
    // HIDE RECAPS
    case "hideRecap":
      var idNum = e.target.id.replace( /^\D+/g, '');
      e.target.style.display = "none";
      for (var i in recapId) {
        if (idNum !== i) {
          document.querySelector(`#view${i}`).style.display = "block";
        }
      }
      document.querySelector(`#full-recap${idNum}`).style.display = "none";
      document.querySelector(`#view${idNum}`).style.display = "block";
      break;
    // CONTINUE FROM RECAP VIEW
    case 'continue':
      var idNum = e.target.id.replace( /^\D+/g, '');
      levels = document.querySelector(`#full-recap${idNum}`).childElementCount;
      userRecaps.style.display = "none";
      newGameBtn[0].style.display = "none";
      gamePlayDiv.style.display = "block";
      document.querySelector(`#template-${levels}`).style.display = "block";
      break;
    // BEGIN NEW GAME - HIDE SIGN IN, RECAPS, NEW GAME BUTTON - SHOW LEVEL COUNTER BUTTON, FIRST TEMPLATE (INTRO)
    case "new-game":
      userRecaps.style.display = "none";
      newGameBtn[0].style.display = "none";
      gamePlayDiv.style.display = "block";
      document.querySelector(`#template-${levels}`).style.display = "block";
      levelCounter[0].style.display = "block";
      break;
    // GO TO NEXT LEVEL - HIDE PREVIOUS LEVEL - SHOW CURRENT LEVEL - POPULATE INPUT FIELDS BASED ON SPANS INSIDE STORY
    case "level-counter":
      document.querySelector(`#template-${levels}`).style.display = "none";
      levelCounter[0].style.display = "none";
      levels++;
      document.querySelector(`#template-${levels}`).style.display = "block";
      break;
    // SUBMIT WORDS TO STORY - DETERMINE PASS/FAIL - POST STORY TO USER
    case "submit-level":
      e.preventDefault();
      let spans = document.querySelector(`#temp${levels}-story`).children
      let eStory = document.querySelector(`#temp${levels}-story`);
      document.querySelector(`#temp${levels}-form`).style.display = 'none';
      eStory.style.display = ''
      let storyArr = [];
      let failScore = 0;

      for (var i=0; i<spans.length; i++) {
        let uValue = document.querySelector(`#${spans[i].accessKey}`)
        if (answers[levels].includes(uValue.value)) {
          failScore++
        }
        spans[i].innerText = uValue.value
      }

      storyArr.push(eStory.innerText);

      if (failScore == 0) {
        const passSpan = document.querySelector(`#pass-level${levels}`);
        for (var i=0; i<passSpan.childElementCount; i++) {
          let uValue = document.querySelector(`#${passSpan.children[i].accessKey}`)
          passSpan.children[i].innerText = uValue.value
        }
        passSpan.style.display = ''
        levelCounter[0].style.display = ''
        storyArr.push(passSpan.innerText)

        // Save Answers to User's Stories
        fetch(STORIES_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            user_id: e.target.accessKey,
            full_story: storyArr,
            recap: e.target.id
          })
        });
      } else {
        eStory.style.display = "block";
        const failSpan = document.querySelector(`#fail-level${levels}`);
        for (var i=0; i<failSpan.childElementCount; i++) {
          let uValue = document.querySelector(`#${failSpan.children[i].accessKey}`)
          failSpan.children[i].innerText = uValue.value
        }
        failSpan.style.display = "block";
        const retryLevel = document.getElementsByName(`retry-level${levels}`);
        retryLevel[0].style.display = "block";
      }
      break;
    // RETRY FAILED LEVEL
    case `retry-level${levels}`:
      e.target.style.display = "none";
      document.querySelector(`#temp${levels}-form`).style.display = "block";
      document.querySelector(`#temp${levels}-story`).style.display = "none";
      document.querySelector(`#fail-level${levels}`).style.display = "none";
      break;
    default:
  }
});

// HELPER FETCHES

function userFunc() {
  welcomeOttLibsCont.addEventListener("submit", e => {
    e.preventDefault();
    fetch(USERS_URL)
      .then(r => r.json())
      .then(users => {
        let user = users.find(user => user.name === userName.value);
        userRecaps.innerHTML += `
        <div class="container"><h1>${userName.value}</h1></div>`;
        if (user) {
          for (var i = user.stories.length; i > 0; i--) {
            const fullStory = [];
            user.stories.forEach(story => {
              if (story.recap == i) {
                recapId[story.recap] = true
                // debugger
                fullStory.push(story.full_story);
              }
            });
            // debugger
            if (fullStory.length > 0) {
              let recapContDiv = document.createElement('div')
              recapContDiv.id = `rc${i}`
              recapContDiv.classList.add('container')
              recapContDiv.classList.add('recapCont')
              let recapJumboDiv = document.createElement('div')
              recapJumboDiv.id = `rj${i}`
              recapJumboDiv.classList.add('jumbotron')
              recapJumboDiv.classList.add('imageDiv')
              userRecaps.appendChild(recapContDiv)
              recapContDiv.appendChild(recapJumboDiv)
              let otterImgTag = document.createElement('img')
              otterImgTag.src = "https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_north-american-river-otter_600x300.ashx"
              otterImgTag.classList.add('otterRecapImage')
              otterImgTag.name = "viewRecap"
              otterImgTag.id = `view${i}`
              otterImgTag.accessKey = `${user.id}`

              recapJumboDiv.appendChild(otterImgTag)

              userRecaps.innerHTML += `
              <ul style="display:none;" id="full-recap${i}"> ${fullStory.map(story=>`<li>${story}</li>`)}
              <button style="display:none" type="button" name="continue" id="cont${i}" accessKey=${user.id} value="Continue">Continue</button>
              <button style="display:none" type="button" name="hideRecap" id="hide${i}" accessKey=${user.id} value="Hide">Hide</button>
              </ul>
              <br>`
            }
          }
          let recapNum = parseInt(userRecaps.children[1].innerText);
          recapNum++;
          submitLevelWords.forEach(btn => {
            btn.id = recapNum;
            btn.accessKey = user.id;
          });
        } else {
          newUser();
        }
      });
  });
}

function newUser() {
  fetch(USERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: userName.value
    })
  });
}
