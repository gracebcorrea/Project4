document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#followme').addEventListener('click', () => followme());
});

function followme() {

  const url = "/followme";
  console.log("Follow me:");
  //profile id in view
  profile_id = document.getElementById('profile_id').value;
  //profile name in view
  profile_Searcher = document.getElementById('profile_Searcher').value;
  //action
  profile_ForN = document.getElementById('follow_me').value;

  console.log("Values are:", `${profile_id}`,`${profile_user}`, `${profile_ForN}`);

  fetch(url, {
          method: "PUT",
          body: JSON.stringify({
                id: `${profile_id}`,
                follower: `${profile_Searcher}`,
                fornot: `${profile_ForN}`,
          })
  })
  .then((response) => response.json())
  .then((response) => {
      if (response.status == 201) {
        console.log("adicionar novo seguidor no total")
      }
  })
}


function following(){
}




//chrome.exe --user-data-dir="D:\CS50"
