function default(Postid){
  document.querySelector('#oldtext').style.display = 'block';
  document.querySelector('#newtext').style.display = 'none';
}

function openedit(Postid){
  document.querySelector('#oldtext').style.display = 'none';
  document.querySelector('#newtext').style.display = 'block';
  document.querySelector('#newtext-`${Postid}`').style.display = 'block';
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
