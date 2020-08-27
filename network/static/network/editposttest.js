document.addEventListener('DOMContentLoaded', function () {
   const showold = document.querySelectorAll(".hideold");
   const shownew = document.querySelectorAll(".hidenew");

   showold.forEach((so)=> {
     postold = so.getAttribute("data-postid");
     document.querySelector(`#oldtext-${postold}`).style.display = 'block';
   })

   shownew.forEach((sn)=> {
      postnew= sn.getAttribute("data-postid");
      document.querySelector(`#newtext-${postnew}`).style.display = 'none';
   })


   // If hide button is clicked, delete the post
 document.addEventListener('click', event => {

     // Find what was clicked on
     const element = event.target;

     // Check if the user clicked on a hide button
     if (element.className === 'hide') {
         element.parentElement.hide()
     }

 });

})


function openedit(Postid){

  document.querySelector(`#oldtext-${Postid}`).style.display = 'none';
  document.querySelector(`#newtext-${Postid}`).style.display = 'block';
  document.querySelector(`#fnewtext-${Postid}`).style.display = 'block';
  <form class="form-control" id="fnewtext-{{Post.id}}" data-postid="{{post.id}}">
      <textarea class="form-control" id="newpost-{{Post.id}}" >{{Post.Post}}</textarea>
      <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( {{Post.id}}, 'profile');">
      <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
  </form>
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
