import { Link } from "react-router-dom"


export const Home: React.FC = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Seja bem-vindo ao Atmoseer!</p>
      <p>Para acessar a previsão do tempo, clique <Link to="/forecast">aqui</Link>.
      </p>
    </>
  )
}