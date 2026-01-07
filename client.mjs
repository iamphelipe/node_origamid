// 1 - ROTA (POST /cursos)
// const response = await fetch("http://localhost:3000/cursos", {
//     method: 'POST', 
//      headers: {
//           'Content-Type': 'application/json'
//       },
//       //body: JSON.stringify({ username: 'phelipe', password: '123456' })
//       body: JSON.stringify({
//         slug: 'node-iniciante',
//         nome: 'Node Iniciante',
//         descricao: 'Aprendendo NodeJS puro, sem nenhuma biblioteca.'
//       })
// });

// 2 - ROTA (POST /aulas)
// const response = await fetch("http://localhost:3000/aulas", {
//     method: 'POST', 
//      headers: {
//           'Content-Type': 'application/json'
//       },
//       //body: JSON.stringify({ username: 'phelipe', password: '123456' })
//       body: JSON.stringify({
//         curso_id: 5,
//         slug: 'create-server',
//         nome: 'Criando um servidor',
//       })
// });

// 3 - ROTA (GET /cursos)
// const response = await fetch("http://localhost:3000/cursos");

// 4 - ROTA (GET /curso?slug=slug_curso)
 const response = await fetch("http://localhost:3000/curso?slug=typescript"); 
 
console.log(response);
 
const body = await response.json();       
console.log(body);              