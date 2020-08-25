document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#EditPost').addEventListener('click', function(e) {
        e.preventDefault();

        console.log('EditPost clicked!');
        //Get data from form
        postid = document.querySelector('#post_id').value;
        page = document.querySelector('#pagename').value;
        oldpost = document.querySelector('#oldtext').value;

        document.querySelector('#newtext').innerHTML = `
                <form>
                    <textarea class="form-control" initial=${oldpost} ></textarea>
                    <input id="submitchange" type="submit" class="btn btn-primary"/>

                </form>









        `
        //newtext = document.querySelector('#newtext').value;





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
