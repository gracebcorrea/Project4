function likepost(postid){
  var post_id = postid;
  url = "/liked";
  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
       postid:`${post_id}`,
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result.status);
    window.location.reload(true);
   })
   .catch((error) => {
      console.error(error);
      alert(error);
    });
}

function unlikepost(postid){
    var post_id = postid;
    url = "/unliked";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
         postid:`${post_id}`,
      })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.status);
        window.location.reload(true);
     })
     .catch((error) => {
        console.error(error);
        alert(error);
     });
}


//chrome.exe --user-data-dir="D:\CS50"
//virtualenv virtual
//source virtual/Scripts/activate
//pip install requests    (verifica se tem atualizaçoes)
//virtualenv deactivate
