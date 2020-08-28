var textoAntigo;

function editarTexto(Postid)
{
    var p = document.getElementById(`${Postid}`);
    var div = document.getElementById(`post-${Postid}`);
    textoAntigo = p.innerText;

    div.innerHTML = `<textarea id=${Postid}> ${textoAntigo} </textarea>
    <button id="change-${Postid}"  class="btn btn-success" style="width:35%;Display: block;">Change</button>
    <button id="cancel-${Postid}"  class="btn btn-danger" style="width:35%;Display: block;">Cancel</button>
    `;

}

function retornaTexto( )
{
    escreveTexto( textoAntigo );
}

function confirmaTexto(Postid)
{
    var textArea = document.getElementById(`${Postid}`);
    texto = textArea.value;
    escreveTexto( texto );
}

function escreveTexto( texto )
{
    var div = document.getElementById(`post-${Post.id}`);

    div.innerHTML = `<p id=${Postid}>"+ texto +"</p>
    <button id="change-${Postid}"   class="btn btn-success" style="width:35%;Display: block;">Change</button>
    <button id="cancel-${Postid}"  class="btn btn-danger" style="width:35%;Display: block;">Cancel</button>
    `;

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
