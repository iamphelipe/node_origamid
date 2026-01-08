// 1 - ROTA (POST /cursos)
// const response = await fetch("http://localhost:3000/cursos", {
//     method: 'POST', 
//      headers: {
//           'Content-Type': 'application/json'
//       },
//       //body: JSON.stringify({ username: 'phelipe', password: '123456' })
//       body: JSON.stringify({
//         slug: 'java',
//         nome: 'Java',
//         descricao: 'Criando APIs e consumindo com o sistema puro e nativo.'  
//       })
// });
 
// 2 - ROTA (POST /aulas)
//  const response = await fetch("http://localhost:3000/aulas", {
//      method: 'POST', 
//       headers: {
//            'Content-Type': 'application/json'
//        },
//        //body: JSON.stringify({ username: 'phelipe', password: '123456' })
//        body: JSON.stringify({
//          curso_id: 7,
//          slug: 'responsividade',
//          nome: 'Deixando a landing page adaptada para mobile, desktop e tablet.',
//        })
//  });

// 3 - ROTA (GET /cursos)
// const response = await fetch("http://localhost:3000/cursos");

// 4 - ROTA (GET /curso?slug=slug_curso)
//const response = await fetch("http://localhost:3000/curso?slug=typescript"); 

// 5 - ROTA (GET /aulas?curso=slug_curso)
//const response = await fetch("http://localhost:3000/aulas?curso=react");

// 6 - ROTA (GET /aula?curso=slug_curso&slug=slug_aula)
const response = await fetch("http://localhost:3000/aula?curso=react&slug=hooks-usestate");
console.log(response);
   
const body = await response.json();           
console.log(body);      