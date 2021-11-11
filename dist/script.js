const bankSounds = [
{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];




class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
  }

  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    if (this.props.power) {
      sound.play();
      this.props.updateDisplayName(this.props.clipId.replace(/-/g, ' '));
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("button", {
        class: "drum-pad",
        id: this.props.clipId,
        onClick: this.playSound }, /*#__PURE__*/
      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),

      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let padbank = this.props.currentBankSounds.map((Obj, i, padBankArr) => {
      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          clip: padBankArr[i].url,
          clipId: padBankArr[i].id,
          keyCode: padBankArr[i].keyCode,
          keyTrigger: padBankArr[i].keyTrigger,
          power: this.props.power,
          updateDisplayName: this.props.updateDisplay }));


    });
    return /*#__PURE__*/React.createElement("div", { className: "pad-bank" }, padbank);
  }}



class DrumControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const powerSlider = this.props.power ? { float: "right" } : { float: "left" };
    return /*#__PURE__*/(
      React.createElement("div", { className: "drum-controls" }, /*#__PURE__*/
      React.createElement("div", { id: "power" }, "Power"), /*#__PURE__*/
      React.createElement("div", { className: "power-control", onClick: this.props.onClick }, /*#__PURE__*/
      React.createElement("div", { className: "inner", style: powerSlider })), /*#__PURE__*/

      React.createElement("div", { id: "display" }, /*#__PURE__*/React.createElement("p", null, this.props.display))));


  }}





class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      powerOn: true };

    this.setDisplay = this.setDisplay.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }

  powerControl() {
    this.setState({
      powerOn: !this.state.powerOn,
      display: '' });

  }

  setDisplay(soundName) {
    if (this.state.powerOn) {
      this.setState({
        display: soundName });

    }
  }

  clearDisplay() {
    this.setState({
      display: '' });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement(PadBank, {
        currentBankSounds: bankSounds,
        updateDisplay: this.setDisplay,
        power: this.state.powerOn }), /*#__PURE__*/
      React.createElement(DrumControls, {
        power: this.state.powerOn,
        display: this.state.display,
        onClick: this.powerControl })));


  }}



ReactDOM.render( /*#__PURE__*/React.createElement(DrumMachine, null), document.getElementById("root"));