document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#followme').addEventListener('click', () => followme());
});

function followme() {
  const url = "/followme";
  console.log("Follow me:");
//  profile_id = document.querySelector('#profile_id').value;
//  profile_user = document.querySelector('#profile_user').value;
profile_id = document.getElementById('profile_id').value;
profile_user = document.getElementById('profile_user').value;
profile_ForN = document.getElementById('follow_me').value;

  console.log("Values are:", `${profile_id}`,`${profile_user}`, `${profile_ForN}`);

  fetch(url, {
           method: "PUT",
           body: JSON.stringify({
           id: `${profile_id}`,
           follower: `${profile_user}`,
           fornot: `${profile_ForN}`,
        })
  })
  .then((response) => response.json())
  .then((res) => {
      if (res.status == 201) {
        console.log("adicionar novo seguidor no total")
      }
  })
}


function following(){
}




//chrome.exe --user-data-dir="D:\CS50"
