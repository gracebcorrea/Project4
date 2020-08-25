document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#EditPost').addEventListener('click', function(e) {
        e.preventDefault();
        //Get data from form
        postid = document.querySelectorall('#post_id').value;
        page = document.querySelectorall('#pagename').value;
        oldpost = document.querySelectorall('#oldpost').value;
        console.log('EditPost clicked!' );
        console.log(`${page}`, `${postid}`);

        document.querySelector('#newtext').innerHTML = `
            <form>
                <textarea class="form-control" id="newpost" ></textarea>
                <input type="submit" value="Change" class="btn btn-success" style="width:45%;" onclick="changepost( ${page}, ${postid})">
                <input type="cancel" value="Cancel" class="btn btn-danger"  style="width:45%;" onclick="window.location.reload(true);">
            </form>


        `
        newtext = document.querySelector('#newpost').value;

        console.log(`${newtext}`);



});
});


function changepost( page, postid){
  const url = `/${page}/${postid}`;
  newtext=document.querySelector('#newpost').value;
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
