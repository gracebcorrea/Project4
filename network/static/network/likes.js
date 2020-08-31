likepost(postid){
  var post_id = postid;
  alert("likepost",post_id);
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
      alert("New Like saved!");
   })
   .catch((error) => {
       console.error(error);
      alert(error);

}

unlikepost(postid){
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
        alert("New unLike saved!");
     })
     .catch((error) => {
        console.error(error);
        alert(error);



}
