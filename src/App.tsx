// import {useState} from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import {Footer} from "./components/footer.tsx";
import {Formulario} from "./components/formulario.tsx";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>

            <Formulario/>
            <Footer/>
        </>
    )
}

export default App
