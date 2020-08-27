function openedit(postid){
  var oldtext = document.getElementById(`oldtext-${postid}`).innerHTML;
  document.querySelector(`#oldtext-${postid}`).remove();
  document.querySelector(`#newtext-${postid}`).style.display = 'block';

  const newtext = document.querySelector(`#newtext-${postid}`);
  const detailpart = document.createElement('form');
  detailpart.innerHTML= `
      <textarea class="form-control" id="newpost-${postid}" >${oldtext}</textarea>
      <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${postid}, 'profile');">
      <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
      `;
  newtext.append(detailpart);
  alert("Está voando aqui");
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
