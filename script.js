//button styles
const clearStyle = {
  width: "270px",
  background: "#666666",
  color: "black" };


const operatorStyle = {
  background: "#FFA500",
  color: "white" };


//regex definitions
const isOperator = /[x/+-]/;

const endsOperator = /[x+-/]$/;

const endsNegative = /\d[x+-/]{1}-$/;


//components
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      previousValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "" };

    //bindings
    this.onClear = this.onClear.bind(this);
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.onEquals = this.onEquals.bind(this);
  }
  //functions
  onClear() {
    this.setState({
      currentValue: "0",
      previousValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false });

  }

  maxDigitWarning() {
    this.setState({
      currentValue: "Digit Limit Met",
      previousValue: this.state.currentValue });

    setTimeout(() => this.setState({ currentValue: this.state.previousValue }), 1000);
  }

  handleOperators(e) {
    if (!this.state.currentValue.includes('Met')) {
      const value = e.target.value;
      const { formula, previousValue, evaluated } = this.state;
      this.setState({ currentValue: value, evaluated: false });
      if (evaluated) {
        this.setState({ formula: previousValue + value });
      } else if (!endsOperator.test(formula)) {
        this.setState({ previousValue: formula, formula: formula + value });
      } else if (!endsNegative.test(formula)) {
        this.setState({ formula: (endsNegative.test(formula + value) ? formula : previousValue) + value });
      } else if (value !== "-") {
        this.setState({ formula: previousValue + value });
      }
    }
  }

  handleNumbers(e) {
    if (!this.state.currentValue.includes("Met")) {
      const value = e.target.value;
      const { currentValue, formula, evaluated } = this.state;
      this.setState({ evaluated: false });
      if (currentValue > 1000) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({ currentValue: value, formula: value !== "0" ? value : "" });
      } else {
        this.setState({
          currentValue: currentValue === "0" || isOperator.test(currentValue) ? value : currentValue + value,
          formula: currentValue === "0" && value === "0" ?
          formula === "" ?
          value :
          formula :
          /([^.0-9]0|^0)$/.test(formula) ?
          formula.slice(0, -1) + value :
          formula + value });

      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentValue: "0.",
        formula: "0.",
        evaluated: false });

    } else if (!this.state.currentValue.includes(".") && !this.state.currentValue.includes("Met")) {
      this.setState({ evaluated: false });
      if (this.state.currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (endsOperator.test(this.state.formula) || this.state.currentValue === "0" && this.state.formula === "") {
        this.setState({
          currentValue: "0.",
          formula: this.state.formula + "0." });

      } else {
        this.setState({
          currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: this.state.formula + "." });

      }
    }
  }

  onEquals() {
    if (!this.state.currentValue.includes("Met")) {
      let expression = this.state.formula;
      while (endsOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression.
      replace(/x/g, "*").
      replace(/-/g, "-").
      replace("--", "+0+0+0+0+0+0+");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentValue: answer.toString(),
        formula: expression.
        replace(/\*/g, ".").
        replace(/-/g, "-").
        replace("+0+0+0+0+0+0+", "--").
        replace(/(x|\/|\+)-/, "$1-").
        replace(/^-/, "-") +
        "=" + answer,
        previousValue: answer,
        evaluated: true });

    }
  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement(Formula, { formula: this.state.formula.replace(/x/g, ".") }), /*#__PURE__*/
      React.createElement(Output, { currentValue: this.state.currentValue }), /*#__PURE__*/
      React.createElement(Buttons, {
        decimal: this.handleDecimal,
        evaluate: this.onEquals,
        initialize: this.onClear,
        numbers: this.handleNumbers,
        operators: this.handleOperators })), /*#__PURE__*/



      React.createElement("hr", null), /*#__PURE__*/
      React.createElement("div", { id: "contact-section" }, "\xA0 \xA0 \xA0 ", /*#__PURE__*/
      React.createElement("section", { id: "contact", class: "container" }, /*#__PURE__*/
      React.createElement("h2", { id: "contact-title" }, "Designed & Coded by Cole Crum"), /*#__PURE__*/
      React.createElement("div", { class: "contact-links" }, /*#__PURE__*/
      React.createElement("div", { class: "link-cont", id: "git-cont" }, /*#__PURE__*/
      React.createElement("a", { id: "profile-link", href: "https://github.com/colecrum?tab=repositories", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { id: "git-logo", class: "contact-img", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXk1n8mQe3sbaaMDgiqtSeSC8QySxLfgkaA&usqp=CAU", title: "GitHub" }))), /*#__PURE__*/
      React.createElement("div", { class: "link-cont", id: "pen-cont" }, /*#__PURE__*/
      React.createElement("a", { href: "https://codepen.io/colecrum", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png", title: "CodePen" }))), /*#__PURE__*/
      React.createElement("div", { class: "link-cont", id: "mail-cont" }, /*#__PURE__*/
      React.createElement("a", { href: "mailto:colemcrum@gmail.com", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://lh3.googleusercontent.com/VS3B_qhOFTYsdyNfnlr98zg3HNjB_Gcs9bxVnaQO9MysAoBOXMHATClhRviImKKJV8RV-0s7hl8KeVQcij5Iagb1exHzt40x679l8Q=w0", title: "Email" }))), /*#__PURE__*/
      React.createElement("div", { class: "link-cont", id: "phone-cont" }, /*#__PURE__*/
      React.createElement("a", { href: "tel:512-517-8503", target: "_blank", class: "btn contact-details" }, /*#__PURE__*/React.createElement("img", { class: "contact-img", src: "https://cdn4.iconfinder.com/data/icons/phones-colored/48/JD-32-512.png", title: "Phone" })))), "\xA0 \xA0 \xA0 "), "\xA0 \xA0 ")));







  }}


class Buttons extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { id: "clear", onClick: this.props.initialize, value: "AC", style: clearStyle }, "AC"), /*#__PURE__*/
      React.createElement("button", { id: "divide", onClick: this.props.operators, value: "/", style: operatorStyle }, "/"), /*#__PURE__*/

      React.createElement("button", { id: "seven", onClick: this.props.numbers, value: "7" }, "7"), /*#__PURE__*/
      React.createElement("button", { id: "eight", onClick: this.props.numbers, value: "8" }, "8"), /*#__PURE__*/
      React.createElement("button", { id: "nine", onClick: this.props.numbers, value: "9" }, "9"), /*#__PURE__*/
      React.createElement("button", { id: "multiply", onClick: this.props.operators, value: "x", style: operatorStyle }, "x"), /*#__PURE__*/

      React.createElement("button", { id: "four", onClick: this.props.numbers, value: "4" }, "4"), /*#__PURE__*/
      React.createElement("button", { id: "five", onClick: this.props.numbers, value: "5" }, "5"), /*#__PURE__*/
      React.createElement("button", { id: "six", onClick: this.props.numbers, value: "6" }, "6"), /*#__PURE__*/
      React.createElement("button", { id: "subtract", onClick: this.props.operators, value: "-", style: operatorStyle }, "-"), /*#__PURE__*/

      React.createElement("button", { id: "one", onClick: this.props.numbers, value: "1" }, "1"), /*#__PURE__*/
      React.createElement("button", { id: "two", onClick: this.props.numbers, value: "2" }, "2"), /*#__PURE__*/
      React.createElement("button", { id: "three", onClick: this.props.numbers, value: "3" }, "3"), /*#__PURE__*/
      React.createElement("button", { id: "add", onClick: this.props.operators, value: "+", style: operatorStyle }, "+"), /*#__PURE__*/

      React.createElement("button", { id: "zero", onClick: this.props.numbers, value: "0", className: "midSize" }, "0"), /*#__PURE__*/
      React.createElement("button", { id: "decimal", onClick: this.props.decimal, value: "." }, "."), /*#__PURE__*/
      React.createElement("button", { id: "equals", onClick: this.props.evaluate, value: "=", style: operatorStyle }, "=")));


  }}


class Output extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "outputScreen", id: "display" },
      this.props.currentValue)));



  }}


class Formula extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "formulaScreen" },
      this.props.formula)));



  }}



ReactDOM.render( /*#__PURE__*/
React.createElement(Calculator, null),
document.getElementById("root"));