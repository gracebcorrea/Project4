document.querySelector('#followme').addEventListener('click', function() {
        console.log('Follow / UnFollow clicked!');
        //profile id in view
        profile_id = document.getElementById('profile_id').value;
        //profile name in view
        profile_Searcher = document.getElementById('profile_Searcher').value;
        //action
        profile_ForN = document.getElementById('follow_me').value;
        followme(`${profile_id}`, `${profile_Searcher}`,`${profile_ForN}`);

        });

function followme(profile_id,profile_Searcher,profile_ForN) {

  const url = "/followme";
  console.log("Follow me:");

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
