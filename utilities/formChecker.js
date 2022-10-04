const checkingValidation = (data) => {
  let err = "";
  const multiError = (key) => {
    err = "Please input " + key 
  }
  const singleError =  (key) => {
    err = err + "\n" + "Please input " + key 
  }
  Object.keys(data).forEach(function(key, index) {
      if(data[key]) return null
      return (
        (err === "") 
        ? multiError(key) 
        : singleError(key)
      )
  })
  console.log(err);
  return err;
}

module.exports = { checkingValidation }