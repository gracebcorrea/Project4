function editpost(postid, page){
   alert("edit link clicked");
   const oldtext = document.getElementById(`${postid}`).innerHTML;
   const newtext = document.getElementById(`${postid}`);

   newtext.innerHTML = `
     <textarea id=${postid} > ${oldtext} </textarea>
     <button id="change-${postid}" class="btn btn-success" onclick="changepost(${postid}, ${page})" type="submit" style="width:30%;Display: block;">Change</button>
     <button id="cancel-${postid}" class="btn btn-danger"  onclick="cancel()" type="cancel"style="width:30%;Display: block;">Cancel</button>
   `;

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
