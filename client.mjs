const response = await fetch("http://localhost:3000/cursos", {
    method: 'POST', 
     headers: {
          'Content-Type': 'application/json'
      },
      //body: JSON.stringify({ username: 'phelipe', password: '123456' })
      body: JSON.stringify({
        slug: 'react',
        nome: 'ReactJS',
        descricao: 'Curso voltado para front end com vários exercícios.'
      })
});

console.log(response);
 
const body = await response.text();

console.log(body);  