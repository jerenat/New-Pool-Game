import server from "./app.js"

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server started.........[OK]`);
});
