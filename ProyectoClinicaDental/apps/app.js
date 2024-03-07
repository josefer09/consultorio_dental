
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjo1LCJlbWFpbCI6ImNvcnJlb0Bjb3JyZW8iLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNjk5ODYxMzkzLCJleHAiOjE2OTk4NjQ5OTN9.FSDxZ94piyTPdpztZzNzj6AtY3N4LdbehP4199S-dK8'; // Reemplaza 'tu_token_aqui' con el token real que posees

const url = 'http://localhost:3000/users';
fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    response.json()
  }).then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.log(error);
  });
