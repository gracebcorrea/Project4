document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('#followme').addEventListener('click', () => followme());

}

function followme(){
  const url = "followme";
  console.log("Follow me:");
  profile_id = document.querySelector('#profile_id').value;
  profile_user = document.querySelector('#profile_user').value;
  alert(profile_id,profile_user);
  console.log(`${profile_id}`,`${profile_user}`);
  fetch(url, {
      method: "PUT",
      body: JSON.stringify({
      profileid: `${profile_id}`,
      follower: `${user}`,
      }),
  });
}

function following(){





}
//chrome.exe --user-data-dir="D:\CS50"
