import { h } from 'preact';

import './Tile.scss';

import plus from '../../assets/plus.png';

const Tile = (props) => {
  const remove = (e) => {
    e.preventDefault();
    props.remove(props.tile);
  };

  return (
    <div class="Tile">
      <div class="Tile__container">
        <div class="Tile__col">
          {
            props.title
          }
        </div>

        <div class="Tile__col">
          <a onClick={e => remove(e)} href="#" class="Tile__btn">
            <img src={plus} alt="Plus" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tile;