document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#EditPost').addEventListener('click', function(e) {
        e.preventDefault();

        console.log('EditPost clicked!');
        //Get data from form
        postid = document.getElementById('post_id').value;
        page = document.getElementById('pagename').value;
        oldpost = document.getElementById('oldtext').value;
        console.log(page,postid)
        document.querySelector('#newtext').innerHTML = `
                <form>
                    <textarea class="form-control">oldpost</textarea>
                    <input id="submit" type="submit" class="btn btn-primary"/>

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
