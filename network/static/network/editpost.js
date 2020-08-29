function editpost(postid, page){
   const oldtext = document.getElementById(`${postid}`).innerHTML;
   const newtext = document.getElementById(`${postid}`);
   document.getElementById(`edit-${postid}`).disabled = 'true';

   newtext.innerHTML = `
     <textarea id=${postid} style="width:100% ;"> ${oldtext} </textarea>
     <form class="form-inline">
        <button id="change-${postid}" class="btn btn-success"   style="width:30%;Display: block;">Change</button>
        <button id="cancel-${postid}" class="btn btn-danger"  onclick="window.location.reload(true);"  style="width:30%;Display: block;">Cancel</button>
     </form>
   `;
   document.querySelector(`#change-${postid}`).addEventListener('click', () =>
  // newpost = document.getElementById(`${postid}`).innerHTML);
   changepost(`${postid}`, `${page}`));
}


function changepost(postid, page){
  newpost = document.getElementById(`${postid}`).innerHTML;
  alert('Inside changepost');
  const url = `/${page}/${postid}`;

  alert(`${newpost}`);
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
