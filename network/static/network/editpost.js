function openedit(postid){
  //var oldtext = document.getElementById(`oldtext-${postid}`).innerHTML;
  var oldtext = document.getElementById(`oldtext-${postid}`).value;
  document.querySelector(`#oldtext-${postid}`).style.display = 'none';
  document.querySelector(`#newtext-${postid}`).style.display = 'block';
}



function changepost(postid, page){
  console.log('Inside changepost');
  const url = `/${page}/${postid}`;
  newtext = document.querySelector(`#newpost-${spostid}`).value;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
       postid:`${postid}`,
       page: `${page}`,
       newtext:`${newpost}`,
    })
  })
  .then(response => response.json())
  .then(result => {
       console.log(result);
   })
   .catch((error) => {
       console.error('Error:', error);
   });
}
