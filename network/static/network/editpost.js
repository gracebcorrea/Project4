function openedit(postid, oldtext) {
  var x = document.getElementById(`oldtext-${postid}`);
  var y = document.getElementById(`newtext-${postid}`);

  const oldpost = document.getElementById(`oldtext-${postid}`);
  oldpost.innerHTML= `<p> ${oldtext} </p> `;
  x.append(oldpost);

  const newpost = document.createElement('form');
  newpost.innerHTML= `
      <textarea class="form-control" id="newpost-${postid}" >${oldtext}</textarea>
      <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${postid}, 'profile');">
      <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
      `;
  y.append(newpost);

  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "block";
  } else {
    x.style.display = "block";
    y.style.display = "none";
  }
}



function changepost(postid, page){
  alert('Inside changepost');
  const url = `/${page}/${postid}`;
  const newtext = document.getElementById(`#newpost-${postid}`).innerHTML;
  alert(`${newtext}`);
  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
       postid:`${postid}`,
       page: `${page}`,
       newtext:`${newtext}`,
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
