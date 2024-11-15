import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Tamagotchi } from './components/Tamagotchi';

function App() {
return (
<div className="bg-background-tibidabo min-h-screen flex justify-center itemscenter">
<Tamagotchi className="bg-gray-100" />
</div>
);
}

export default App
