function openedit(postid){
  var oldtext = document.getelementbyid(`oldpost-${postid}`).value;
  document.querySelector(`#oldtext-${postid}`).style.display = 'none';
  document.querySelector(`#newtext-${postid}`).style.display = 'block';

  const newtext = document.querySelector(`#newtext-${postid}`);
  newtest.innerHTML= "";
  const ediv = document.createElement('div');
  ediv.innerHTML = `
      <form class="form-control" id="fnewtext-${postid}" >
         <textarea class="form-control" id="newpost-${postid}" >{{oldtext}}</textarea>
         <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${postid}, 'profile');">
         <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
      </form>`;
  newtext.append(ediv);

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
