document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#Follow').addEventListener('click', function(e) {
        e.preventDefault();

        console.log('Follow / UnFollow clicked!');
        //profile id in view
        profile_id = document.getElementById('profile_id').value;
        //profile name in view
        profile_Searcher = document.getElementById('profile_Searcher').value;
        //action
        profile_ForN = document.getElementById('follow_me').value;
        followme(`${profile_id}`, `${profile_Searcher}`,`${profile_ForN}`);

        });
});

function followme(profid, profSearcher, profForN) {
  console.log("Values are:",`${profid}`, `${profSearcher}`,`${profForN}`);

  fetch("/followme", {
          method: "PUT",
          body: JSON.stringify({
                id: `${profid}`,
                follower: `${profSearcher}`,
                fornot: `${profForN}`,
          })
  })
  .then((response) => response.json())
  .then((response) => {
      console.log(response.status);
      console.log(response.text());
      if (response.status == 201) {
        console.log("Total followers changed");
        location.reload();
      }
      else{
         throw 'Error';
      }
      return response.json()}
  )
}



function following(){
}




//chrome.exe --user-data-dir="D:\CS50"
