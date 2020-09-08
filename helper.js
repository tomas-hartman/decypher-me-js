(() => {
  const textToEncode = document.querySelector("#encode-input").value;
  const encodeButton = document.querySelector("#encode-submit");

  console.log(textToEncode);

  const encodedOutput = document.querySelector("#encode .output");

  encodeButton.addEventListener("click", () => {
    const encodedTextCnstructor = new DecypherMe({
      returnTable: true,
    });
    const encodedText = encodedTextCnstructor.run();

    encodedOutput.innerText = encodedText.encoded;

    console.log(encodedTextCnstructor);
    console.log(encodedText);
  });
})();
