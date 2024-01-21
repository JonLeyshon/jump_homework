//dom refs
const formRef = document.getElementById("firstForm");
const pRefs = document.getElementsByTagName("p");

// schema
const schema = {
  name: Joi.string().min(2).max(18),
  email: Joi.string().min(5).max(230),
  age: Joi.number().min(0).max(140),
};

// validate remove errors and write errors
const userInput = {};
formRef.addEventListener("input", (e) => {
  userInput[e.target.name] = e.target.value;

  Joi.validate(userInput, schema, { abortEarly: false }, (errors, results) => {
    const errorsMod = {};
    if (errors) {
      errors.details.forEach((error) => {
        errorsMod[error.context.key] = error.message;
      });
    }
    Array.from(pRefs).forEach((error) => {
      error.innerHTML = "";
    });
    for (const error in errorsMod) {
      document.getElementById(`${error}Error`).innerHTML = errorsMod[error];
    }
  });
});
