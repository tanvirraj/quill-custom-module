const log = console.log.bind(console);
import Quill from "quill";

class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on("text-change", this.update.bind(this));
    this.update();
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit === "word") {
      text = text.trim();
      // Splitting empty text returns a non-empty array
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    var length = this.calculate();
    var label = this.options.unit;
    if (length !== 1) {
      label += "s";
    }
    this.container.innerText = length + " " + label;
  }
}

//registar new moudles
Quill.register("modules/counter", Counter);

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    counter: {
      container: "#counter",
      wordLength: 10,
      unit: "word",
    },
  },
});
