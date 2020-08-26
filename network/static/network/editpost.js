document.addEventListener('DOMContentLoaded', function () {
  document.querySelector(`#EditPost-${Post.id}`).addEventListener('click', function(e) {
        e.preventDefault();
        //Get data from form
        postid = document.querySelector(`#post_id-${Post.id}`).value;
        page = document.querySelector(`#pagename-${Post.id}`).value;
        oldpost = document.querySelector(`#oldpost-${Post.id}`).value;
        console.log('EditPost clicked!' );
        console.log(`${page}`, `${postid}`, `${oldpost}`);

        document.querySelector(`#newtext-${Post.id}`).innerHTML = `
            <form>
                <textarea class="form-control" id="newpost-${Post.id}" ></textarea>
                <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${page}, ${postid});">
                <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
            </form> `


        console.log(newtext});

});
});


function changepost( page, postid){
  const url = `/${page}/${postid}`;
  newtext = document.querySelector(`#newpost-${Post.id}`).value;
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
