function openedit(postid) {
  var x = document.getElementById(`oldtext-${postid}`);
  var y = document.getElementById(`newtext-${postid}`);
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
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
