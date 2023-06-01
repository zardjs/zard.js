function handleError(message) {
  if (Zard.debug) {
    console.error(message);
  } else {
    console.error(message);
  }
}

function handleSuccess(message) {
  console.log(message);
}

module.exports = { handleError, handleSuccess };