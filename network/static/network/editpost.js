var textoAntigo;

function editarTexto(Postid)
{
    var p = document.getElementById(`${Postid}`);
    var div = document.getElementById(`post-${Postid}`);
    textoAntigo = p.innerText;

    div.innerHTML = `<textarea id=${Postid}> ${textoAntigo} </textarea>`;
    document.getElementById(`change-${Postid}` ).style.display = "block";
    document.getElementById(`cancel-${Postid}`).style.display = "block";
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

    div.innerHTML = `<p id=${Postid}>"+ texto +"</p>`;
    document.getElementById(`change-${Postid}` ).style.display = "none";
    document.getElementById(`cancel-${Postid}`).style.display = "none";
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
