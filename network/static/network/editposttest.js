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

function openedit(postid){
  //var oldtext = document.getElementById(`oldtext-${postid}`).innerHTML;
  var oldtext = document.getElementById(`oldtext-${postid}`).value;
  document.querySelector(`#oldtext-${postid}`).style.display = 'none';
  document.querySelector(`#newtext-${postid}`).style.display = 'block';

  const newtext = document.querySelector(`#newtext-${postid}`);
  const detailpart = document.createElement('form');
  detailpart.innerHTML= `
      <textarea class="form-control" id="newpost-${postid}" >${oldtext}</textarea>
      <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${postid}, 'profile');">
      <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
      `;
  newtext.append(detailpart);

  alert(`${oldtext}`);
}
TENTATIVA 2
function openedit(postid, oldtext) {
  var x = document.getElementById(`#oldtext-${postid}`);
  var y = document.getElementById(`#newtext-${postid}`);

  alert(x);
  alert(y);


  if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
  }
  else {
      x.style.display = "none";
      y.style.display = "block";
  }

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
