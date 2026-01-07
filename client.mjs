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
const response = await fetch("http://localhost:3000/aulas", {
    method: 'POST', 
     headers: {
          'Content-Type': 'application/json'
      },
      //body: JSON.stringify({ username: 'phelipe', password: '123456' })
      body: JSON.stringify({
        curso_id: 3,
        slug: 'component',
        nome: 'Criando componentes e reutilizando.',
      })
});

// 3 - ROTA (GET /cursos)
// const response = await fetch("http://localhost:3000/cursos");

// 4 - ROTA (GET /curso?slug=slug_curso)
//const response = await fetch("http://localhost:3000/curso?slug=typescript"); 

// 5 - ROTA (GET /aulas?curso=slug_curso)
 const response2 = await fetch("http://localhost:3000/aulas?curso=react"); 
 
console.log(response2); 
   
const body = await response2.json();           
console.log(body);    