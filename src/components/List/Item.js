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
    this.buttonPressTimer = setTimeout(() => this.setState({ controls: true }), 1000);
  }

  _deleteRelease(e) {
    clearTimeout(this.buttonPressTimer);
  }

  _deleteItem (e) {
    this.setState({ controls: false });
    this.props.remove(this.props);
  }

  _close() {
    this.setState({ controls: false });
  }

  render() {
    const { title } = this.props;
    const { status, controls } = this.state;

    return (
      <div class={controls ? "Item Item--controls" : "Item"}>
        <div
          class="Item__container"
          onClick={() => this._toggle()}
          onTouchStart={e => this._delete(e)}
          onTouchEnd={e => this._deleteRelease(e)}
        >
          <div class="Item__text">{title}</div>
          <div class="Item__tickBox">
            <div class="Item__tickBoxContainer">
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
          <div class="Item__delete" onClick={() => this._deleteItem()}>Delete</div>
          <div class="Item__close" onClick={() => this._close()}>
            Close
          </div>
        </div>
      </div>
    );
  }
}
