
function editarTexto(Postid) {
    var div = document.getElementById(`post-${Postid}`);// div dos elementos que devem aparecer e desaparecer
    var p = document.getElementById(`${Postid}`); //campo de texto a ser substituido

    var textoAntigo = p.innerHTML;
    
    p.innerHTML = `
      <textarea id=${Postid} style="width:100%;"> ${textoAntigo} </textarea>
      <button id="change-${Postid}" class="btn btn-success" type="submit" style="width:30%;Display: block;">Change</button>
      <button id="cancel-${Postid}" class="btn btn-danger"  type="cancel"style="width:30%;Display: block;">Cancel</button>
    `;
    div.append(p);


}

function retornaTexto( ){
    escreveTexto( textoAntigo );
}

function confirmaTexto(Postid){
    var textArea = document.getElementById(`${Postid}`);
    texto = textArea.value;
    escreveTexto( texto );
}

function escreveTexto( texto ){
    var div = document.getElementById(`post-${Post.id}`);

    div.innerHTML = `<p id=${Postid}>"+ texto +"</p>
    <button id="change-${Postid}" class="btn btn-success" type="submit" style="width:30%;Display: block;">Change</button>
    <button id="cancel-${Postid}" class="btn btn-danger" type="cancel" style="width:30%;Display: block;">Cancel</button>
    `;
    window.stop() ;
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
