function editpost(postid){
   const oldtext = document.getElementById(`${postid}`).innerHTML;
   const newtext = document.getElementById(`${postid}`);
   document.getElementById(`edit-${postid}`).disabled = 'true';

   newtext.innerHTML = `
     <textarea id="post-${postid}"  style="width:100% ;"> ${oldtext} </textarea>
     <form id="form-${postid}" class="form-inline">
        <button id="change-${postid}" class="btn btn-success" style="width:35%;Display: block;">
        Change</button>
        <button id="cancel-${postid}" class="btn btn-danger" onclick="window.location.reload(true);" style="width:35%;Display: block;">
        Cancel</button>
     </form>
   `;

   document.querySelector(`#change-${postid}`).addEventListener('click', () =>
      savenewpost(`${postid}`));
}


function savenewpost(postid){
  var post_id = postid
  const url = "/editpost";

  var textarea = document.querySelector(`#post-${post_id}`);
  newpost = textarea.value;

  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
       postid:`${post_id}`,
       newtext:`${newpost}`,
    })
  })
  .then(response => response.json())
  .then(result => {
         console.log(result.status);
      alert("Post edit saved!");
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
