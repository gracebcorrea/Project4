document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#oldtext').style.display = 'block';
  document.querySelector('#newtext').style.display = 'none';
});

function query_post(postid, page, oldpost){
  document.querySelector('#oldtext').style.display = 'none';
  document.querySelector('#newtext').style.display = 'block';

  //Get data from form
  const spostid = postid;
  const spage = page;
  const soldpost = oldpost;
  console.log('EditPost clicked!' );
  console.log(`${spostid}`, `${spage}`, `${soldpost}`);

  document.querySelector(`#newtext-${postid}`).innerHTML = `
      <form>
          <textarea class="form-control" id="newpost-${postid}" >${oldpost}</textarea>
          <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${page}, ${postid},${oldpost});">
          <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
      </form> `

}


function changepost( page, postid, newpost){
  const url = `/${page}/${postid}`;
  newtext = document.querySelector(`#newpost-${id}`).value;
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
