import { h, Component } from 'preact';

import './Item.scss';

import tick from '../../assets/tick.png';

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
      controls: false
    };
  }

  _toggle() {
    this.setState({ status: !this.state.status });
  }

  _delete(e) {
    console.log(e);
    this.buttonPressTimer = setTimeout(() => this.setState({ controls: true }), 1000);

  }

  _deleteRelease(e) {
    console.log(e);

    clearTimeout(this.buttonPressTimer);
  }

  _close() {
    this.setState({ controls: false });
  }

  render() {
    const { title } = this.props;
    const { status, controls } = this.state;

    return (
      <div class="Item">
        <div
          class="Item__container"
          //onClick={e => this._delete(e)}
          onTouchStart={e => this._delete(e)}
          onTouchEnd={e => this._deleteRelease(e)}
        >
          <div class="Item__text">{title}</div>
          <div class="Item__tickBox">
            <div onClick={() => this._toggle()} class="Item__tickBoxContainer">
              {status ? <img class="Item__tick" src={tick} alt="tick" /> : null}
            </div>
          </div>
        </div>

        <div
          class={
            controls
              ? 'Item__controls Item__controls--active'
              : 'Item__controls'
          }
        >
          <div class="Item__delete">Delete</div>
          <div class="Item__close" onClick={() => this._close()}>
            Close
          </div>
        </div>
      </div>
    );
  }
}
