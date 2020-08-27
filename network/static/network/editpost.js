document.addEventListener('DOMContentLoaded', function () {
   const showold = document.querySelectorAll(".hideold");
   const shownew = document.querySelectorAll(".hidenew");

   showold.forEach((so)=> {
     document.querySelector(".hideold").style.display = 'block';
   })

   shownew.forEach((sn)=> {
      document.querySelector(".hidenew").style.display = 'none';
   })


   // If edit post link is clicked, hide old post and open to edit
     document.addEventListener('click', event => {

    // Find what was clicked on
    const element = event.target;
    openedit(Postid);

});
})


function openedit(Postid){
  document.querySelector(`#oldtext-${Post.id}`).style.display = 'none';
  document.querySelector(`#newtext-${Post.id}`).style.display = 'block';
  document.querySelector(`#fnewtext-${Postid}`).style.display = 'block';
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
