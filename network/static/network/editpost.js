document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#EditPost').addEventListener('click', function(e) {
        e.preventDefault();
        //Get data from form
        postid = document.querySelector('#post_id').value;
        page = document.querySelector('#pagename').value;
        oldpost = document.querySelector('#oldpost').value;
        alert('EditPost clicked!',postid,page ,oldpost );

        document.querySelector('#newtext').innerHTML = `
            <form>
                <textarea class="form-control" id="newpost" ></textarea>
                <input id="submit" type="submit" class="btn btn-primary" name="Edit" onclick="changepost( ${page}, ${postid}, ${text})">
            </form>


        `
        newtext = document.querySelector('#newpost').value;





});
});


function changepost( page, postid, newtext){
  const url = `/${page}/${postid}`;
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
