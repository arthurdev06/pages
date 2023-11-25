const getUserInput = () => {
  const result = document.querySelector(".result");
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.start();

  recognition.onresult = function (event) {
    let input = event.results[0][0].transcript
      .replace(/,/g, "")
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    console.log(Math.round(input));
    result.innerText = `Calculado "${input}"`;
    setTimeout(function () {
      evaluate(input);
    }, 2000);
  };
};
function evaluate(input) {
  try {
    var result = eval(input);
    document.querySelector(".result").innerText = `O resultado é: "${result}"`;
  } catch (e) {
    window.alert("Operação Inválida, tente novamente.");
    document.querySelector(".result").innerText = "";
  }
}
