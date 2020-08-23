document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#Follow').addEventListener('click', function(e) {
        e.preventDefault();

        console.log('Follow / UnFollow clicked!');
        //profile id in view
        profid = document.getElementById('profile_id').value;
        profusername= document.getElementById('profile_username').value;
        //profile name in view
        searchid = document.getElementById('search_id').value;
        searchname = document.getElementById('search_username').value;
        //action
        profile_ForN = document.getElementById('follow_me').value;
        followme(`${profid}`, `${profusername}`,`${searchid}`, `${searchname}`,`${profile_ForN}`);

        });
});

function followme(profid, profusername, searchid, searchname, profForN) {

  fetch("/followme", {
          method: "PUT",
          body: JSON.stringify({
                id: `${profid}`,
                username:`${profusername}`,
                follower: `${searchid}`,
                followername: `${searchname}`,
                fornot: `${profForN}`,
          })
  })
  .then((response) => response.json())
  .then((response) => {
      console.log(response.status);
      console.log(response.text());
      if (response.status == 201) {
        console.log("Get Profile New Data");

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
