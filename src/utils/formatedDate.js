const formatedDate = () => {
  let date = new Date().toString().split(" ").splice(1, 4)
  return `${date[0]} ${date[1]}, ${date[2]} at: ${date[3]}`;
}

module.exports = formatedDate