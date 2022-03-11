import { h, Component } from 'preact';

import './Login.scss';

import logo from '../../assets/login.png';

export default class Login extends Component {  
  render() {
    return (
      <div class="Login">
        <h1 class="Login__title">Leftovers</h1>
  
        <button onClick={() => console.log('login')} class="Login__btn">
          <div class="Login__btn-text">Login to Leftovers</div>
          <div class="Login__btn-logo">
            <img src={logo} alt="Logo" />
          </div>
        </button>
  
        <div class="Login__name">
          Made by{' '}
          <a href="https://github.com/SamuelHornsey" target="_blank" rel="noopener noreferrer">
            Samuel Hornsey
          </a>
        </div>
      </div>
    );
  }
  
}

// const Login = () => {
//   // if (isAuthenticated()) {
//   //   return route('/', true);
//   // }

//   const login = e => {
//     e.preventDefault();
//     signInWithGoogle()
//   };

//   return (
//     <div class="Login">
//       <h1 class="Login__title">Leftovers</h1>

//       <button onClick={e => login(e)} class="Login__btn">
//         <div class="Login__btn-text">Login to Leftovers</div>
//         <div class="Login__btn-logo">
//           <img src={logo} alt="Logo" />
//         </div>
//       </button>

//       <div class="Login__name">
//         Made by{' '}
//         <a href="https://github.com/SamuelHornsey" target="_blank" rel="noopener noreferrer">
//           Samuel Hornsey
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;
