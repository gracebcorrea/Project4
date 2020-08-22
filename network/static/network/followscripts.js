
function followme(profile_id,user){
  const url = "followme";
  console.log("Followme:");
  console.log(`${profile_id}`,`${user}`);
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
